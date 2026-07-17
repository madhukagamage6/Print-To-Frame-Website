import React, { useState, useEffect, useRef } from 'react';
import { Page, Order } from '../types';
import { 
  User as FirebaseUser
} from 'firebase/auth';
import { 
  findOrCreateSpreadsheet, 
  syncOrdersFromSheet, 
  appendSheetRow, 
  updateOrderInSheet, 
  findOrCreateDriveFolder, 
  uploadFileToDrive, 
  sendEmailViaGmail 
} from '../lib/workspace';
import { 
  FolderGit, 
  FileSpreadsheet, 
  Mail, 
  Plus, 
  FileUp, 
  ChevronRight, 
  Clock, 
  CreditCard, 
  Link as LinkIcon, 
  AlertCircle, 
  Loader2,
  Trash2,
  CheckCircle,
  TrendingUp,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AuthScreen from './AuthScreen';

interface PipelineDashboardProps {
  user: FirebaseUser | null;
  token: string | null;
  onLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
  isLoggingIn: boolean;
}

export default function PipelineDashboard({
  user,
  token,
  onLogin,
  onLogout,
  isLoggingIn,
}: PipelineDashboardProps) {
  // Sync state
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(null);
  const [driveFolderId, setDriveFolderId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // UI state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<{
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
  } | null>(null);

  // Create Order Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formType, setFormType] = useState('Business Billboard');
  const [formWidth, setFormWidth] = useState('10');
  const [formHeight, setFormHeight] = useState('5');
  const [formMaterial, setFormMaterial] = useState('Extruded Aluminum Alloy');
  const [formNotes, setFormNotes] = useState('');
  const [formFile, setFormFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File Upload drag states
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // List of Acts
  const acts = [
    { num: 0, act: 'ACT.01', name: 'Trigger' },
    { num: 1, act: 'ACT.02', name: 'Engagement', role: 'Biz Exec' },
    { num: 2, act: 'ACT.03', name: 'Pickup & 75%', role: 'Logistics Exec' },
    { num: 3, act: 'ACT.04', name: 'Warehouse Handover', role: 'Logistics Exec' },
    { num: 4, act: 'ACT.05', name: 'Fabrication', role: 'Workshop' },
    { num: 5, act: 'ACT.06', name: 'Delivery', role: 'Logistics Exec' },
    { num: 6, act: 'ACT.07', name: 'Hard Close', role: 'Biz Exec' },
  ];

  // Initialize and Sync Sheets + Drive on login
  useEffect(() => {
    if (token && user) {
      initializeWorkspace();
    }
  }, [token, user]);

  const initializeWorkspace = async () => {
    if (!token) return;
    setIsLoading(true);
    setErrorMessage(null);
    try {
      setStatusMessage('Locating order tracking ledger in Google Sheets...');
      const sheetId = await findOrCreateSpreadsheet(token, 'PrintToFrame_Orders');
      setSpreadsheetId(sheetId);

      setStatusMessage('Locating banner asset storage folder in Google Drive...');
      const folderId = await findOrCreateDriveFolder(token, 'Print2Frame_Uploads');
      setDriveFolderId(folderId);

      setStatusMessage('Syncing pipeline orders from Google Sheet...');
      const loadedOrders = await syncOrdersFromSheet(token, sheetId);
      setOrders(loadedOrders);
      
      if (loadedOrders.length > 0) {
        setSelectedOrder(loadedOrders[0]);
      }
      setStatusMessage('');
    } catch (err: any) {
      console.error('Workspace init error:', err);
      setErrorMessage(err.message || 'Failed to authenticate and synchronize Google Workspace.');
    } finally {
      setIsLoading(false);
    }
  };

  // Drag and Drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormFile(e.target.files[0]);
    }
  };

  // Submit Quote / Add Order Form
  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !spreadsheetId || !driveFolderId) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      let fileUrl = '';
      let fileId = '';

      // 1. Upload Layout to Drive if file selected
      if (formFile) {
        setStatusMessage(`Uploading physical asset "${formFile.name}" to Google Drive...`);
        const uploadResult = await uploadFileToDrive(token, driveFolderId, formFile);
        fileUrl = uploadResult.webViewLink;
        fileId = uploadResult.fileId;
      }

      // 2. Prepare Order object
      const nowString = new Date().toISOString().split('T')[0];
      const newOrder: Order = {
        id: `PTF-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName: formName,
        customerEmail: formEmail,
        bannerType: formType,
        bannerWidth: Number(formWidth),
        bannerHeight: Number(formHeight),
        frameMaterial: formMaterial,
        currentAct: 1, // Engagement stage is ACT.02 (0-indexed num: 1)
        paymentStatus: 'Advance Pending',
        driveFileId: fileId,
        driveFileUrl: fileUrl,
        notes: formNotes,
        createdAt: nowString,
        updatedAt: nowString,
      };

      // 3. Append to Sheets
      setStatusMessage('Logging order row to Google Sheets database...');
      const rowData = [
        newOrder.id,
        newOrder.customerName,
        newOrder.customerEmail,
        newOrder.bannerType,
        newOrder.bannerWidth,
        newOrder.bannerHeight,
        newOrder.frameMaterial,
        newOrder.currentAct,
        newOrder.paymentStatus,
        newOrder.driveFileId || '',
        newOrder.driveFileUrl || '',
        newOrder.notes,
        newOrder.createdAt,
        newOrder.updatedAt,
      ];

      await appendSheetRow(token, spreadsheetId, 'Orders!A:N', rowData);

      // 4. Send email notification via Gmail
      try {
        setStatusMessage('Sending automated email confirmation via Gmail...');
        const emailSubject = `Order Registered: ${newOrder.id} - ${newOrder.bannerType}`;
        const emailBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #d1d5db; border-radius: 8px;">
            <h2 style="color: #008fa0;">PRINT TO FRAME OPERATIONS</h2>
            <p>Hello <strong>${newOrder.customerName}</strong>,</p>
            <p>Your order request has been logged successfully in our system under reference <strong>${newOrder.id}</strong>.</p>
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <h3>Project Details</h3>
            <ul>
              <li><strong>Signage Type:</strong> ${newOrder.bannerType}</li>
              <li><strong>Dimensions:</strong> ${newOrder.bannerWidth}ft x ${newOrder.bannerHeight}ft</li>
              <li><strong>Frame Material:</strong> ${newOrder.frameMaterial}</li>
              <li><strong>Active Pipeline Stage:</strong> ACT.02 Customer Engagement</li>
            </ul>
            ${newOrder.driveFileUrl ? `<p><strong>Uploaded Asset Link:</strong> <a href="${newOrder.driveFileUrl}">View design blueprint</a></p>` : ''}
            <p>A Business Executive will contact you shortly to confirm advance invoicing and pickup.</p>
            <br>
            <p style="font-size: 11px; color: #9ca3af;">PRINT TO FRAME // Operational Excellence Protocol</p>
          </div>
        `;
        await sendEmailViaGmail(token, newOrder.customerEmail, emailSubject, emailBody);
      } catch (gmailErr) {
        console.warn('Could not send Gmail alert:', gmailErr);
      }

      // 5. Update local state
      setOrders(prev => [newOrder, ...prev]);
      setSelectedOrder(newOrder);
      setIsCreateOpen(false);
      
      // Reset form
      setFormName('');
      setFormEmail('');
      setFormType('Business Billboard');
      setFormWidth('10');
      setFormHeight('5');
      setFormMaterial('Extruded Aluminum Alloy');
      setFormNotes('');
      setFormFile(null);
      setStatusMessage('');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to submit order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pipeline Status Update with Confirmation (MANDATORY per skill guidelines)
  const triggerPipelineUpdate = (order: Order, nextActNum: number) => {
    const actName = acts.find(a => a.num === nextActNum)?.name || `Stage ${nextActNum + 1}`;
    const actCode = acts.find(a => a.num === nextActNum)?.act || `ACT.0${nextActNum + 1}`;
    
    setConfirmConfig({
      title: `Confirm Status Shift`,
      description: `Change ${order.customerName}'s order (${order.id}) from active stage to "${actCode} ${actName}"? This updates the Google Sheet row immutably.`,
      onConfirm: async () => {
        await executeStatusUpdate(order, nextActNum);
      }
    });
    setIsConfirmOpen(true);
  };

  const executeStatusUpdate = async (order: Order, nextActNum: number) => {
    if (!token || !spreadsheetId) return;
    setIsLoading(true);
    try {
      const nowString = new Date().toISOString().split('T')[0];
      const updatedOrder: Order = {
        ...order,
        currentAct: nextActNum,
        updatedAt: nowString,
      };

      // Auto update payment state for specific acts
      if (nextActNum === 2) {
        updatedOrder.paymentStatus = '75% Advance Paid';
      } else if (nextActNum === 6) {
        updatedOrder.paymentStatus = 'Fully Paid';
      }

      setStatusMessage('Updating order ledger row in Google Sheets...');
      await updateOrderInSheet(token, spreadsheetId, updatedOrder);

      // Email update
      try {
        setStatusMessage('Sending Gmail update to customer...');
        const actCode = acts.find(a => a.num === nextActNum)?.act || `ACT.0${nextActNum + 1}`;
        const actName = acts.find(a => a.num === nextActNum)?.name || `Stage ${nextActNum + 1}`;
        const emailSubject = `Order Status Update: ${order.id} - ${actCode} ${actName}`;
        const emailBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #d1d5db; border-radius: 8px;">
            <h2 style="color: #008fa0;">PRINT TO FRAME OPERATIONS</h2>
            <p>Dear <strong>${order.customerName}</strong>,</p>
            <p>This is to confirm that your order <strong>${order.id}</strong> has advanced to the next milestone in our operational protocol:</p>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #00daf3;">
              <h3 style="margin: 0; color: #1f2937;">${actCode} ${actName}</h3>
              <p style="margin: 5px 0 0 0; font-size: 13px; color: #4b5563;">Status verified and locked in the ERP ledger.</p>
            </div>
            <p>Active Payment Status: <strong>${updatedOrder.paymentStatus}</strong></p>
            <p>Thank you for choosing Print To Frame. We construct the physical bones of your high-impact print.</p>
            <br>
            <p style="font-size: 11px; color: #9ca3af;">PRINT TO FRAME // Operational Excellence</p>
          </div>
        `;
        await sendEmailViaGmail(token, order.customerEmail, emailSubject, emailBody);
      } catch (emailErr) {
        console.warn('Gmail notification failed:', emailErr);
      }

      // Update local state
      setOrders(prev => prev.map(o => o.id === order.id ? updatedOrder : o));
      setSelectedOrder(updatedOrder);
      setStatusMessage('');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to update status.');
    } finally {
      setIsLoading(false);
      setIsConfirmOpen(false);
    }
  };

  // Helper stats
  const activeOrders = orders.filter(o => o.currentAct < 6).length;
  const completedOrders = orders.filter(o => o.currentAct === 6).length;
  const fabricationPending = orders.filter(o => o.currentAct === 4).length;

  // Handle Login wrapper
  const handleLoginClick = async () => {
    try {
      await onLogin();
    } catch (err: any) {
      setErrorMessage(err.message || 'Google Auth Popup closed or cancelled.');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-24 relative">
      {/* Auth Guard Screen */}
      {!user ? (
        <AuthScreen 
          onGoogleSignIn={handleLoginClick} 
          isLoggingIn={isLoggingIn} 
          errorMessage={errorMessage} 
        />
      ) : (
        <div className="w-full relative z-10">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs text-primary-container uppercase tracking-wider">Workspace Sync Ledger: Connected</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-on-surface">
                ERP Order <span className="text-primary-container text-glow">Pipeline</span>
              </h1>
            </div>

            {/* Sync control bar */}
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
              <button 
                onClick={initializeWorkspace}
                disabled={isLoading}
                className="flex items-center gap-2 px-3 py-2 bg-surface-container border border-outline-variant/30 rounded text-on-surface-variant hover:text-primary hover:border-primary-container/40 transition-all duration-300 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Sync</span>
              </button>
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 px-3 py-2 bg-surface-container-high/40 hover:bg-error-container/10 border border-outline-variant/30 hover:border-error/30 rounded text-on-surface-variant hover:text-error transition-all duration-300"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </button>

              <button 
                onClick={() => setIsCreateOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary-container rounded font-semibold hover:bg-primary-fixed hover:shadow-[0_0_10px_rgba(0,218,243,0.3)] transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
                <span>Log Project</span>
              </button>
            </div>
          </div>

          {/* Sync status alert banner */}
          {(isLoading || statusMessage) && (
            <div className="mb-8 p-4 bg-surface-container border border-primary-container/25 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-primary-container" />
                <span className="font-mono text-xs text-on-surface-variant">{statusMessage || 'Loading Workspace ledger...'}</span>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mb-8 p-4 bg-error-container/20 border border-error/20 rounded-lg flex items-center gap-3 text-xs text-error">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* ERP Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <div className="glass-panel p-5">
              <span className="font-mono text-[10px] uppercase text-outline/60 block mb-1">Active Pipeline Leads</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-on-surface">{activeOrders}</span>
                <span className="font-mono text-xs text-primary-container tracking-wider">In Progress</span>
              </div>
            </div>
            <div className="glass-panel p-5">
              <span className="font-mono text-[10px] uppercase text-outline/60 block mb-1">Fabrication Queue</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-primary-container text-glow">{fabricationPending}</span>
                <span className="font-mono text-xs text-primary-container">ACT.05 active</span>
              </div>
            </div>
            <div className="glass-panel p-5">
              <span className="font-mono text-[10px] uppercase text-outline/60 block mb-1">Completed Transacted</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-emerald-400">{completedOrders}</span>
                <span className="font-mono text-xs text-emerald-400">Hard Closed</span>
              </div>
            </div>
          </div>

          {/* Main ERP Panels Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            
            {/* Left Panel: Ledger orders list */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="font-mono text-xs text-outline/60 uppercase tracking-widest px-1">Ledger Orders</h3>
              
              {orders.length === 0 ? (
                <div className="glass-panel p-12 text-center">
                  <span className="font-sans text-sm text-on-surface-variant block mb-4">No active project orders synchronized in Sheets.</span>
                  <button 
                    onClick={() => setIsCreateOpen(true)}
                    className="inline-flex items-center gap-1 bg-surface-container border border-outline-variant/30 px-4 py-2 rounded text-xs text-primary hover:text-primary-container transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Create First Order
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {orders.map(order => {
                    const activeAct = acts.find(a => a.num === order.currentAct);
                    const isSelected = selectedOrder?.id === order.id;

                    return (
                      <div 
                        key={order.id}
                        onClick={() => setSelectedOrder(order)}
                        className={`glass-panel p-4 cursor-pointer transition-all duration-300 ${
                          isSelected 
                            ? 'border-primary-container shadow-[0_0_15px_rgba(0,218,243,0.08)] bg-surface-container-high' 
                            : 'hover:border-outline-variant/50'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-mono text-xs font-semibold text-primary">{order.id}</span>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-outline/60">{order.createdAt}</span>
                        </div>
                        <h4 className="font-display text-sm font-semibold text-on-surface mb-1">{order.customerName}</h4>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-on-surface-variant">{order.bannerType}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase border ${
                            order.currentAct === 6 
                              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' 
                              : order.currentAct === 4 
                                ? 'border-primary-container/30 bg-primary-container/10 text-primary-container' 
                                : 'border-outline-variant/30 bg-surface-container-highest/40 text-on-surface-variant'
                          }`}>
                            {activeAct?.act} // {activeAct?.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Panel: Selected Order workflow detail */}
            <div className="lg:col-span-8">
              {selectedOrder ? (
                <div className="glass-panel p-6 md:p-8 space-y-8">
                  {/* Selected Header */}
                  <div className="flex justify-between items-start border-b border-outline-variant/10 pb-6">
                    <div>
                      <span className="font-mono text-xs font-bold text-primary block mb-1">{selectedOrder.id}</span>
                      <h2 className="font-display text-2xl font-bold text-on-surface">{selectedOrder.customerName}</h2>
                      <span className="text-sm font-sans text-on-surface-variant">{selectedOrder.customerEmail}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[9px] uppercase text-outline/60 block mb-1">Payment Status</span>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono border ${
                        selectedOrder.paymentStatus === 'Fully Paid' 
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' 
                          : selectedOrder.paymentStatus === '75% Advance Paid' 
                            ? 'border-primary-container/30 bg-primary-container/10 text-primary-container' 
                            : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                      }`}>
                        <CreditCard className="w-3.5 h-3.5" />
                        {selectedOrder.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {/* Structural Spec parameters */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-mono text-xs">
                    <div>
                      <span className="text-outline/60 block uppercase mb-1">Banner Type</span>
                      <span className="text-on-surface text-sm font-semibold">{selectedOrder.bannerType}</span>
                    </div>
                    <div>
                      <span className="text-outline/60 block uppercase mb-1">Sizing Specs</span>
                      <span className="text-on-surface text-sm font-semibold">{selectedOrder.bannerWidth}ft x {selectedOrder.bannerHeight}ft</span>
                    </div>
                    <div>
                      <span className="text-outline/60 block uppercase mb-1">Frame Exoskeleton</span>
                      <span className="text-on-surface text-sm font-semibold">{selectedOrder.frameMaterial}</span>
                    </div>
                  </div>

                  {/* Notes panel */}
                  {selectedOrder.notes && (
                    <div className="bg-surface-container/60 border border-outline-variant/10 rounded-lg p-4 font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      <strong>Design Specifications & Notes:</strong><br />
                      {selectedOrder.notes}
                    </div>
                  )}

                  {/* Google Drive asset panel */}
                  <div className="border border-outline-variant/20 rounded-lg p-5 bg-surface-container-high/10 space-y-4">
                    <span className="font-mono text-[10px] uppercase text-outline/60 block">Workspace Cloud Storage</span>
                    <div className="flex justify-between items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-surface-container rounded border border-outline-variant/30 text-primary">
                          <FolderGit className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-sans text-sm font-semibold text-on-surface block">Exoskeleton Blueprint Layout</span>
                          <span className="font-mono text-[10px] text-outline/60 block">Asset managed in Google Drive folder</span>
                        </div>
                      </div>
                      {selectedOrder.driveFileUrl ? (
                        <a 
                          href={selectedOrder.driveFileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-container/10 border border-primary-container/30 rounded text-xs font-mono text-primary hover:bg-primary-container/20 transition-all"
                        >
                          <LinkIcon className="w-3.5 h-3.5" />
                          View Layout
                        </a>
                      ) : (
                        <span className="font-mono text-xs text-outline/50">No Layout Uploaded</span>
                      )}
                    </div>
                  </div>

                  {/* 7-Act Tracker pipeline element */}
                  <div className="space-y-4">
                    <span className="font-mono text-[10px] uppercase text-outline/60 block">Pipeline Act Tracker</span>
                    
                    <div className="grid grid-cols-7 gap-1 border border-outline-variant/20 rounded overflow-hidden">
                      {acts.map(act => {
                        const isCurrent = selectedOrder.currentAct === act.num;
                        const isPassed = selectedOrder.currentAct > act.num;
                        
                        return (
                          <div 
                            key={act.act}
                            className={`p-2 text-center font-mono text-[9px] relative flex flex-col justify-between h-14 ${
                              isCurrent 
                                ? 'bg-primary-container text-on-primary-container font-semibold border-x border-primary-container' 
                                : isPassed 
                                  ? 'bg-surface-container-highest/60 text-primary border-r border-outline-variant/10' 
                                  : 'bg-surface-container-lowest text-outline/40 border-r border-outline-variant/10'
                            }`}
                          >
                            <span>{act.act}</span>
                            <span className="truncate max-w-full px-0.5">{act.name}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Operational controls */}
                    {selectedOrder.currentAct < 6 && (
                      <div className="flex justify-end pt-4 border-t border-outline-variant/10">
                        <button 
                          onClick={() => triggerPipelineUpdate(selectedOrder, selectedOrder.currentAct + 1)}
                          className="flex items-center gap-1.5 bg-primary-container text-on-primary-container font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded font-semibold hover:bg-primary-fixed hover:shadow-[0_0_10px_rgba(0,218,243,0.3)] transition-all duration-300"
                        >
                          <span>Advance to Act.0{selectedOrder.currentAct + 2}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-outline-variant/30 rounded-xl p-20 text-center text-on-surface-variant font-sans text-sm">
                  Select an order from the collaborative Google Sheet database to manage its operational acts.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Log Project Form */}
      <AnimatePresence>
        {isCreateOpen && (
          <div className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface-container border border-outline-variant/30 rounded-xl max-w-lg w-full overflow-hidden shadow-[0_0_50px_rgba(0,218,243,0.15)] flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-high/20">
                <h3 className="font-display text-lg text-on-surface font-semibold flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  Log New Print & Frame Request
                </h3>
                <button 
                  onClick={() => setIsCreateOpen(false)}
                  className="text-on-surface-variant hover:text-on-surface font-mono text-xs uppercase"
                >
                  Cancel
                </button>
              </div>

              {isSubmitting ? (
                <div className="p-12 text-center flex flex-col justify-center items-center gap-4">
                  <Loader2 className="w-10 h-10 animate-spin text-primary-container" />
                  <span className="font-mono text-xs text-glow uppercase tracking-wider">{statusMessage || 'Syncing assets...'}</span>
                </div>
              ) : (
                <form onSubmit={handleCreateOrder} className="p-6 space-y-4 overflow-y-auto flex-grow">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] uppercase text-outline/60 block mb-1">Customer Name</label>
                      <input 
                        type="text" 
                        required 
                        value={formName} 
                        onChange={e => setFormName(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded px-3 py-2 text-sm text-on-surface outline-none focus:border-primary-container transition-all"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase text-outline/60 block mb-1">Customer Email</label>
                      <input 
                        type="email" 
                        required 
                        value={formEmail} 
                        onChange={e => setFormEmail(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded px-3 py-2 text-sm text-on-surface outline-none focus:border-primary-container transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] uppercase text-outline/60 block mb-1">Bannering Type</label>
                    <select 
                      value={formType} 
                      onChange={e => setFormType(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded px-3 py-2 text-sm text-on-surface outline-none focus:border-primary-container transition-all"
                    >
                      <option value="Business Billboard">Business Billboard (Welded Steel)</option>
                      <option value="Tuition Class Ad Banner">Tuition Class Ad Banner (Aluminum Extruded)</option>
                      <option value="Event & Stage Backdrop">Event & Stage Backdrop (Steel Truss)</option>
                      <option value="Retail Display Frame">Retail Display Frame (Anodized Alloy)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="font-mono text-[10px] uppercase text-outline/60 block mb-1">Width (feet)</label>
                      <input 
                        type="number" 
                        required 
                        min="1" 
                        value={formWidth} 
                        onChange={e => setFormWidth(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded px-3 py-2 text-sm text-on-surface outline-none focus:border-primary-container transition-all"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase text-outline/60 block mb-1">Height (feet)</label>
                      <input 
                        type="number" 
                        required 
                        min="1" 
                        value={formHeight} 
                        onChange={e => setFormHeight(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded px-3 py-2 text-sm text-on-surface outline-none focus:border-primary-container transition-all"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase text-outline/60 block mb-1">Exoskeleton Material</label>
                      <select 
                        value={formMaterial} 
                        onChange={e => setFormMaterial(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded px-3 py-2 text-sm text-on-surface outline-none focus:border-primary-container transition-all"
                      >
                        <option value="Welded Structural Steel">Welded Structural Steel</option>
                        <option value="Extruded Aluminum Alloy">Extruded Aluminum Alloy</option>
                        <option value="Modular Steel Truss">Modular Steel Truss</option>
                        <option value="Anodized Alloy">Anodized Alloy</option>
                      </select>
                    </div>
                  </div>

                  {/* Drag and Drop Banner layout upload */}
                  <div>
                    <label className="font-mono text-[10px] uppercase text-outline/60 block mb-1">Digital Blueprint Layout (.pdf, .jpg, .png)</label>
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ${
                        dragActive 
                          ? 'border-primary-container bg-primary-container/5' 
                          : 'border-outline-variant/30 hover:border-outline-variant/60 bg-surface-container-low/40'
                      }`}
                    >
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                      <FileUp className="w-8 h-8 text-outline/60 mx-auto mb-2" />
                      {formFile ? (
                        <p className="font-mono text-xs text-primary font-medium">{formFile.name}</p>
                      ) : (
                        <p className="font-sans text-xs text-on-surface-variant">
                          Drag and drop file here, or <span className="text-primary hover:underline">browse files</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] uppercase text-outline/60 block mb-1">Design Specs & Notes</label>
                    <textarea 
                      value={formNotes} 
                      onChange={e => setFormNotes(e.target.value)}
                      rows={3}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded px-3 py-2 text-xs sm:text-sm text-on-surface outline-none focus:border-primary-container transition-all resize-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-outline-variant/10 flex justify-end">
                    <button 
                      type="submit"
                      className="flex items-center gap-1.5 bg-primary-container text-on-primary-container font-mono text-xs uppercase tracking-wider px-6 py-3 rounded font-semibold hover:bg-primary-fixed hover:shadow-[0_0_10px_rgba(0,218,243,0.3)] transition-all duration-300"
                    >
                      Log Order & Sync Sheet
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Mutating/Destructive Operation User Confirmation Dialog (MANDATORY per workspace-integration skill) */}
      <AnimatePresence>
        {isConfirmOpen && confirmConfig && (
          <div className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface-container border border-outline-variant/30 rounded-xl max-w-sm w-full overflow-hidden shadow-[0_0_50px_rgba(0,218,243,0.25)]"
            >
              <div className="p-5 border-b border-outline-variant/10 bg-surface-container-high/20 flex items-center gap-2 text-amber-400">
                <AlertCircle className="w-5 h-5" />
                <h3 className="font-display text-sm font-semibold text-on-surface uppercase tracking-wider">
                  {confirmConfig.title}
                </h3>
              </div>
              <div className="p-5">
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {confirmConfig.description}
                </p>
              </div>
              <div className="p-5 bg-surface-container-high/10 border-t border-outline-variant/10 flex justify-end gap-3 font-mono text-xs">
                <button 
                  onClick={() => setIsConfirmOpen(false)}
                  className="px-4 py-2 hover:bg-surface-container border border-outline-variant/20 rounded text-on-surface-variant"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmConfig.onConfirm}
                  className="px-4 py-2 bg-primary-container text-on-primary-container rounded font-semibold hover:bg-primary-fixed hover:shadow-[0_0_10px_rgba(0,218,243,0.3)]"
                >
                  Confirm Shift
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
