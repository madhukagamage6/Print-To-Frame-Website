export type Page = 'home' | 'process' | 'capabilities' | 'portfolio' | 'pipeline' | 'contact' | 'privacy' | 'terms';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  bannerType: string;
  bannerWidth: number;
  bannerHeight: number;
  frameMaterial: string;
  currentAct: number; // 0 to 6
  paymentStatus: 'Advance Pending' | '75% Advance Paid' | 'Fully Paid';
  driveFolderId?: string;
  driveFileId?: string;
  driveFileUrl?: string;
  createdAt: string;
  updatedAt: string;
  notes: string;
}

export interface PipelineStep {
  act: string;
  title: string;
  description: string;
  role?: string;
  icon: string;
  displayNum?: string;
}

export interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  material: string;
  maxSize: string;
  fixingMethod: string;
  icon: string;
  tag: string;
  imageUrl: string;
}

export interface PortfolioItem {
  id: string;
  category: 'Retail Signage' | 'Educational Banners' | 'Event Backdrops';
  title: string;
  description: string;
  turnaround: string;
  digitalPrintImg: string;
  finalFrameImg: string;
  digitalPrintAlt: string;
  finalFrameAlt: string;
}
