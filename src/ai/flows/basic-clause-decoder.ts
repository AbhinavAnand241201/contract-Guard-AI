'use server';

/**
 * @fileOverview Explains complex legal terms in plain English.
 *
 * - decodeClause - A function that decodes a legal clause into plain English.
 * - DecodeClauseInput - The input type for the decodeClause function.
 * - DecodeClauseOutput - The return type for the decodeClause function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DecodeClauseInputSchema = z.object({
  clause: z
    .string()
    .describe('The legal clause to be decoded into plain English.'),
});
export type DecodeClauseInput = z.infer<typeof DecodeClauseInputSchema>;

const DecodeClauseOutputSchema = z.object({
  explanation: z.string().describe('The plain English explanation of the legal clause.'),
});
export type DecodeClauseOutput = z.infer<typeof DecodeClauseOutputSchema>;

export async function decodeClause(input: DecodeClauseInput): Promise<DecodeClauseOutput> {
  return decodeClauseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'decodeClausePrompt',
  input: {schema: DecodeClauseInputSchema},
  output: {schema: DecodeClauseOutputSchema},
  prompt: `You are a legal expert skilled at explaining complex legal terms in plain English.

  Please provide a clear and concise explanation of the following legal clause:

  {{clause}}`,
});

const decodeClauseFlow = ai.defineFlow(
  {
    name: 'decodeClauseFlow',
    inputSchema: DecodeClauseInputSchema,
    outputSchema: DecodeClauseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
