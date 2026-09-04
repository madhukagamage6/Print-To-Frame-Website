import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebase';

const functions = getFunctions(app);

export interface LeadPayload {
  name: string;
  phone: string;
  intent: string;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const callSubmitLead = httpsCallable(functions, 'submitLead');
  await callSubmitLead(payload);
}
