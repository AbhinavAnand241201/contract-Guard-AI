
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
  riskLevel: z.enum(['Low', 'Medium', 'High']).describe('The overall risk level assessed for the contract (Low, Medium, or High).'),
  riskLevelReasoning: z.string().describe('Brief reasoning for the assigned risk level.'),
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

Provide:
1.  A detailed 'riskReport' summarizing potential risks.
2.  An overall 'riskLevel' (Low, Medium, or High).
3.  A brief 'riskLevelReasoning' explaining the basis for the assigned risk level.
4.  A list of specific 'riskFactors' identified.

Return the analysis in the specified JSON format.`,
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

