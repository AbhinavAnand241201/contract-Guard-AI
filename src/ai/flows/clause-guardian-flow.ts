
'use server';

/**
 * @fileOverview A flow for generating suggestions to improve contract clauses for user protection.
 *
 * - generateClauseSuggestions - A function that analyzes a contract and suggests improvements.
 * - ClauseGuardianInput - The input type for the generateClauseSuggestions function.
 * - ClauseGuardianOutput - The return type for the generateClauseSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClauseGuardianInputSchema = z.object({
  contractText: z
    .string()
    .describe('The text of the contract for which to generate clause improvement suggestions.'),
});
export type ClauseGuardianInput = z.infer<typeof ClauseGuardianInputSchema>;

const SuggestedImprovementSchema = z.object({
  originalClauseContext: z.string().describe("The context or a snippet of the original clause being addressed."),
  suggestion: z.string().describe("The suggested improvement or alternative phrasing for the clause."),
  reasoning: z.string().describe("Why this improvement is suggested to protect the user's interests."),
});

const ClauseGuardianOutputSchema = z.object({
  suggestedImprovements: z.array(SuggestedImprovementSchema).describe('A list of AI-generated suggestions for improving contract clauses.'),
  disclaimer: z.string().describe('A standard legal disclaimer accompanying the suggestions.'),
});
export type ClauseGuardianOutput = z.infer<typeof ClauseGuardianOutputSchema>;

export async function generateClauseSuggestions(input: ClauseGuardianInput): Promise<ClauseGuardianOutput> {
  return clauseGuardianFlow(input);
}

const prompt = ai.definePrompt({
  name: 'clauseGuardianPrompt',
  input: {schema: ClauseGuardianInputSchema},
  output: {schema: ClauseGuardianOutputSchema},
  prompt: `You are an AI assistant specializing in contract review for user protection.
The user has provided the following contract text.
Analyze the contract and identify up to 3 clauses that could be risky, unclear, or unfavorable to the user.
For each identified clause, provide:
1.  'originalClauseContext': A brief snippet or context of the original clause.
2.  'suggestion': A specific suggestion on how to rephrase or what to add/remove to make it more favorable or clearer for the user.
3.  'reasoning': A clear explanation of why your suggestion would benefit the user.

Finally, include a standard 'disclaimer'.

Contract Text:
{{{contractText}}}

Return your analysis in the specified JSON format. The disclaimer must be: "AI-generated suggestions are for informational purposes only and do not constitute legal advice. Always consult with a qualified legal professional for advice specific to your situation."
`,
});

const clauseGuardianFlow = ai.defineFlow(
  {
    name: 'clauseGuardianFlow',
    inputSchema: ClauseGuardianInputSchema,
    outputSchema: ClauseGuardianOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error('AI did not return an output.');
    }
    // Ensure the disclaimer is always the standard one, even if the AI modified it.
    return {
        ...output,
        disclaimer: "AI-generated suggestions are for informational purposes only and do not constitute legal advice. Always consult with a qualified legal professional for advice specific to your situation."
    };
  }
);

