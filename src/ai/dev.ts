
import { config } from 'dotenv';
config();

import '@/ai/flows/contract-risk-scanner.ts';
import '@/ai/flows/basic-clause-decoder.ts';
import '@/ai/flows/clause-guardian-flow.ts'; // Updated from one-click-protection.ts
import '@/ai/flows/negotiation-simulator-flow.ts';
import '@/ai/flows/negotiation-feedback-flow.ts';

