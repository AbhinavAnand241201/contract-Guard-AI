'use server';

/**
 * @fileOverview A flow for generating a counter-clause for contract protection.
 *
 * - generateCounterClause - A function that generates a counter-clause for a given contract.
 * - GenerateCounterClauseInput - The input type for the generateCounterClause function.
 * - GenerateCounterClauseOutput - The return type for the generateCounterClause function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCounterClauseInputSchema = z.object({
  contractText: z
    .string()
    .describe('The text of the contract for which to generate a counter-clause.'),
});
export type GenerateCounterClauseInput = z.infer<typeof GenerateCounterClauseInputSchema>;

const GenerateCounterClauseOutputSchema = z.object({
  counterClause: z.string().describe('The AI-generated counter-clause for the contract.'),
});
export type GenerateCounterClauseOutput = z.infer<typeof GenerateCounterClauseOutputSchema>;

export async function generateCounterClause(input: GenerateCounterClauseInput): Promise<GenerateCounterClauseOutput> {
  return generateCounterClauseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCounterClausePrompt',
  input: {schema: GenerateCounterClauseInputSchema},
  output: {schema: GenerateCounterClauseOutputSchema},
  prompt: `You are an AI assistant that helps users protect themselves from unfair contract terms. A user will provide a contract and you will respond with a single counter-clause that they can use to protect themselves.

  Contract: {{{contractText}}}
  `,
});

const generateCounterClauseFlow = ai.defineFlow(
  {
    name: 'generateCounterClauseFlow',
    inputSchema: GenerateCounterClauseInputSchema,
    outputSchema: GenerateCounterClauseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
