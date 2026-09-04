import { setGlobalOptions } from 'firebase-functions/v2';
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import * as nodemailer from 'nodemailer';

setGlobalOptions({ region: 'us-central1', maxInstances: 5 });

initializeApp();
const db = getFirestore();

// Set with: firebase functions:secrets:set GMAIL_APP_PASSWORD
const GMAIL_APP_PASSWORD = defineSecret('GMAIL_APP_PASSWORD');

const GMAIL_USER = 'info@print2frame.xyz';
const LEAD_NOTIFICATION_EMAIL = 'info@print2frame.xyz';

// Mirrors the validation rules in src/components/ContactUs.tsx — the client
// checks are for UX only, this is the actual enforcement.
const NAME_PATTERN = /^[a-zA-Z\s.-]+$/;
const PHONE_PATTERN = /^[7][0-9]{8}$/;
const ALLOWED_INTENTS = [
  'I need a steel frame fabricated and my digital print fixed to it',
  'I am planning to get a banner done soon',
  'I want to become an Agent/Partner',
];

interface LeadPayload {
  name: string;
  phone: string;
  intent: string;
}

function validatePayload(data: unknown): LeadPayload {
  if (typeof data !== 'object' || data === null) {
    throw new HttpsError('invalid-argument', 'Missing form data.');
  }
  const { name, phone, intent } = data as Record<string, unknown>;

  if (typeof name !== 'string' || name.trim().length < 3 || !NAME_PATTERN.test(name.trim())) {
    throw new HttpsError('invalid-argument', 'Invalid name.');
  }
  if (typeof phone !== 'string' || !PHONE_PATTERN.test(phone)) {
    throw new HttpsError('invalid-argument', 'Invalid phone number.');
  }
  if (typeof intent !== 'string' || !ALLOWED_INTENTS.includes(intent)) {
    throw new HttpsError('invalid-argument', 'Invalid requirement selection.');
  }

  return { name: name.trim(), phone, intent };
}

export const submitLead = onCall({ secrets: [GMAIL_APP_PASSWORD] }, async (request) => {
  const lead = validatePayload(request.data);

  const docRef = await db.collection('leads').add({
    ...lead,
    status: 'new',
    createdAt: FieldValue.serverTimestamp(),
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD.value(),
    },
  });

  try {
    await transporter.sendMail({
      from: `"Print To Frame Website" <${GMAIL_USER}>`,
      to: LEAD_NOTIFICATION_EMAIL,
      subject: `New Call Back Request — ${lead.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2>New Contact Us Lead</h2>
          <p><strong>Name:</strong> ${lead.name}</p>
          <p><strong>Phone:</strong> +94 ${lead.phone}</p>
          <p><strong>Requirement:</strong> ${lead.intent}</p>
          <p style="color:#888;font-size:12px;">Lead ID: ${docRef.id}</p>
        </div>
      `,
    });
  } catch (err) {
    // The lead is already safely stored in Firestore even if the email
    // notification fails (e.g. transient SMTP issue) — don't fail the
    // caller's request over a notification-only step.
    console.error('Failed to send lead notification email', err);
  }

  return { id: docRef.id };
});
