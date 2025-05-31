'use server';

/**
 * @fileOverview AI-powered contract risk scanner.
 *
 * - contractRiskScanner - A function that scans contracts for potential risks.
 * - ContractRiskScannerInput - The input type for the contractRiskScanner function.
 * - ContractRiskScannerOutput - The return type for the contractRiskScanner function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContractRiskScannerInputSchema = z.object({
  contractDataUri: z
    .string()
    .describe(
      "The contract document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ContractRiskScannerInput = z.infer<typeof ContractRiskScannerInputSchema>;

const ContractRiskScannerOutputSchema = z.object({
  riskReport: z
    .string()
    .describe('A detailed report of potential risks identified in the contract.'),
  riskScore: z.number().describe('A risk score from 0 to 100, representing the overall risk level.'),
  riskFactors: z
    .array(z.string())
    .describe('A list of specific risk factors identified in the contract.'),
});
export type ContractRiskScannerOutput = z.infer<typeof ContractRiskScannerOutputSchema>;

export async function contractRiskScanner(input: ContractRiskScannerInput): Promise<ContractRiskScannerOutput> {
  return contractRiskScannerFlow(input);
}

const contractRiskScannerPrompt = ai.definePrompt({
  name: 'contractRiskScannerPrompt',
  input: {schema: ContractRiskScannerInputSchema},
  output: {schema: ContractRiskScannerOutputSchema},
  prompt: `You are an AI-powered contract risk scanner. Analyze the contract provided and identify potential risks.

Contract: {{media url=contractDataUri}}

Provide a detailed risk report, a risk score from 0 to 100, and a list of specific risk factors.`,
});

const contractRiskScannerFlow = ai.defineFlow(
  {
    name: 'contractRiskScannerFlow',
    inputSchema: ContractRiskScannerInputSchema,
    outputSchema: ContractRiskScannerOutputSchema,
  },
  async input => {
    const {output} = await contractRiskScannerPrompt(input);
    return output!;
  }
);
