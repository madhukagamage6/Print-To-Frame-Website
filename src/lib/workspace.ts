import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { Order } from '../types';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Add required Workspace scopes
provider.addScope('https://www.googleapis.com/auth/drive.file');
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/gmail.send');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Try to trigger sign in or just notify failure so user can sign in
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Google provider');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

// ==========================================
// GOOGLE DRIVE API HELPERS
// ==========================================

export async function findOrCreateDriveFolder(token: string, folderName: string): Promise<string> {
  // 1. Search for existing folder
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false&fields=files(id)`;
  const searchRes = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!searchRes.ok) throw new Error('Failed to search Google Drive folders');
  const searchData = await searchRes.json();
  
  if (searchData.files && searchData.files.length > 0) {
    return searchData.files[0].id;
  }

  // 2. Create folder if not found
  const createUrl = 'https://www.googleapis.com/drive/v3/files';
  const createRes = await fetch(createUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    }),
  });
  if (!createRes.ok) throw new Error('Failed to create folder in Google Drive');
  const createData = await createRes.json();
  return createData.id;
}

export async function uploadFileToDrive(
  token: string,
  folderId: string,
  file: File
): Promise<{ fileId: string; webViewLink: string }> {
  // Metadata for Drive file creation
  const metadata = {
    name: file.name,
    parents: [folderId],
  };

  // Construct multipart upload
  const boundary = 'foo_bar_boundary';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const reader = new FileReader();
  const fileDataPromise = new Promise<string>((resolve) => {
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      let binary = '';
      const bytes = new Uint8Array(arrayBuffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      resolve(btoa(binary));
    };
    reader.readAsArrayBuffer(file);
  });

  const base64Data = await fileDataPromise;

  const multipartBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${file.type || 'application/octet-stream'}\r\n` +
    'Content-Transfer-Encoding: base64\r\n\r\n' +
    base64Data +
    closeDelimiter;

  const uploadUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink';
  const uploadRes = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartBody,
  });

  if (!uploadRes.ok) {
    const errText = await uploadRes.text();
    console.error('File upload error response:', errText);
    throw new Error('Failed to upload file to Google Drive');
  }

  const uploadData = await uploadRes.json();
  
  // Make the file readable by anyone with link (optional, but nice for previewing)
  try {
    await fetch(`https://www.googleapis.com/drive/v3/files/${uploadData.id}/permissions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: 'reader',
        type: 'anyone',
      }),
    });
  } catch (permErr) {
    console.warn('Could not set permissions on drive file:', permErr);
  }

  return {
    fileId: uploadData.id,
    webViewLink: uploadData.webViewLink || `https://drive.google.com/file/d/${uploadData.id}/view`,
  };
}


// ==========================================
// GOOGLE SHEETS API HELPERS
// ==========================================

export async function findOrCreateSpreadsheet(token: string, sheetName: string): Promise<string> {
  // 1. Search for existing spreadsheet in Google Drive
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=name='${sheetName}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false&fields=files(id)`;
  const searchRes = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!searchRes.ok) throw new Error('Failed to search Google Sheets');
  const searchData = await searchRes.json();

  if (searchData.files && searchData.files.length > 0) {
    return searchData.files[0].id;
  }

  // 2. Create spreadsheet if not found
  const createUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
  const createRes = await fetch(createUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: { title: sheetName },
      sheets: [
        {
          properties: { title: 'Orders' },
        },
      ],
    }),
  });
  if (!createRes.ok) throw new Error('Failed to create Google Sheet');
  const createData = await createRes.json();
  const spreadsheetId = createData.spreadsheetId;

  // 3. Write Headers
  const headers = [
    'ID',
    'Customer Name',
    'Customer Email',
    'Banner Type',
    'Width (ft)',
    'Height (ft)',
    'Frame Material',
    'Current Act',
    'Payment Status',
    'Drive File ID',
    'Drive File URL',
    'Notes',
    'Created At',
    'Updated At',
  ];

  await writeSheetRows(token, spreadsheetId, 'Orders!A1:N1', [headers]);

  return spreadsheetId;
}

export async function writeSheetRows(
  token: string,
  spreadsheetId: string,
  range: string,
  values: any[][]
): Promise<any> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values }),
  });
  if (!res.ok) throw new Error('Failed to write rows to Google Sheet');
  return await res.json();
}

export async function appendSheetRow(
  token: string,
  spreadsheetId: string,
  range: string,
  row: any[]
): Promise<any> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [row] }),
  });
  if (!res.ok) throw new Error('Failed to append row to Google Sheet');
  return await res.json();
}

export async function readSheetRows(
  token: string,
  spreadsheetId: string,
  range: string
): Promise<any[][]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to read rows from Google Sheet');
  const data = await res.json();
  return data.values || [];
}

export async function syncOrdersFromSheet(token: string, spreadsheetId: string): Promise<Order[]> {
  const rows = await readSheetRows(token, spreadsheetId, 'Orders!A2:N1000');
  return rows.map((row) => ({
    id: row[0] || '',
    customerName: row[1] || '',
    customerEmail: row[2] || '',
    bannerType: row[3] || '',
    bannerWidth: Number(row[4]) || 0,
    bannerHeight: Number(row[5]) || 0,
    frameMaterial: row[6] || '',
    currentAct: Number(row[7]) || 0,
    paymentStatus: (row[8] as any) || 'Advance Pending',
    driveFileId: row[9] || '',
    driveFileUrl: row[10] || '',
    notes: row[11] || '',
    createdAt: row[12] || '',
    updatedAt: row[13] || '',
  }));
}

export async function updateOrderInSheet(
  token: string,
  spreadsheetId: string,
  order: Order
): Promise<void> {
  // First, fetch all rows to find the matching row index by order ID
  const rows = await readSheetRows(token, spreadsheetId, 'Orders!A2:A1000');
  const rowIndex = rows.findIndex((row) => row[0] === order.id);
  
  if (rowIndex === -1) {
    throw new Error(`Order with ID ${order.id} not found in Google Sheet`);
  }

  // Google Sheets index is 1-based, and row A1 is header, so row index in Range is rowIndex + 2
  const sheetRowNumber = rowIndex + 2;
  const range = `Orders!A${sheetRowNumber}:N${sheetRowNumber}`;

  const values = [
    [
      order.id,
      order.customerName,
      order.customerEmail,
      order.bannerType,
      order.bannerWidth,
      order.bannerHeight,
      order.frameMaterial,
      order.currentAct,
      order.paymentStatus,
      order.driveFileId || '',
      order.driveFileUrl || '',
      order.notes,
      order.createdAt,
      order.updatedAt,
    ],
  ];

  await writeSheetRows(token, spreadsheetId, range, values);
}


// ==========================================
// GMAIL API HELPERS
// ==========================================

export async function sendEmailViaGmail(
  token: string,
  to: string,
  subject: string,
  bodyHtml: string
): Promise<void> {
  const fromName = 'Print To Frame Operations';
  const emailLines = [
    `To: ${to}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${subject}`,
    `From: "${fromName}" <me>`,
    '',
    bodyHtml,
  ];

  const emailContent = emailLines.join('\n');
  
  // Base64Url encode
  const base64EncodedEmail = btoa(unescape(encodeURIComponent(emailContent)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const url = 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: base64EncodedEmail,
    }),
  });

  if (!res.ok) {
    const errMsg = await res.text();
    console.error('Gmail send error response:', errMsg);
    throw new Error('Failed to send email confirmation via Gmail');
  }
}
