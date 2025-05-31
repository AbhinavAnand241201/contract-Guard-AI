
'use server';

/**
 * @fileOverview AI-powered negotiation feedback flow.
 *
 * - negotiationFeedback - A function that analyzes a negotiation conversation and provides feedback.
 * - NegotiationFeedbackInput - The input type for the negotiationFeedback function.
 * - NegotiationFeedbackOutput - The return type for the negotiationFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NegotiationFeedbackInputSchema = z.object({
  role: z.string().describe('The role the AI played in the negotiation.'),
  scenario: z.string().describe('The negotiation scenario context.'),
  conversationHistory: z
    .array(
      z.object({
        speaker: z.enum(['user', 'ai']).describe('Who sent the message.'),
        message: z.string().describe('The content of the message.'),
      })
    )
    .describe('The full history of the negotiation conversation.'),
});
export type NegotiationFeedbackInput = z.infer<typeof NegotiationFeedbackInputSchema>;

const NegotiationFeedbackOutputSchema = z.object({
  effectivenessScore: z.number().min(0).max(100).describe('An overall negotiation effectiveness score for the user (0-100).'),
  keyMistake: z.string().describe('The single most important key mistake the user made.'),
  improvementSuggestion: z.string().describe('One concise suggestion for improvement for the user.'),
});
export type NegotiationFeedbackOutput = z.infer<typeof NegotiationFeedbackOutputSchema>;

export async function negotiationFeedback(input: NegotiationFeedbackInput): Promise<NegotiationFeedbackOutput> {
  return negotiationFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'negotiationFeedbackPrompt',
  input: {schema: NegotiationFeedbackInputSchema},
  output: {schema: NegotiationFeedbackOutputSchema},
  prompt: `You are a negotiation coach. Analyze the following contract negotiation conversation.
The AI played the role of: {{role}}
The negotiation scenario was: {{scenario}}

Conversation History:
{{#each conversationHistory}}
{{speaker}}: {{message}}
{{/each}}

Based on the user's messages and negotiation strategy, provide the following feedback:
1.  **Effectiveness Score**: An overall negotiation effectiveness score for the user, from 0 to 100. Consider their assertiveness, clarity, ability to handle objections, and progress towards a favorable outcome.
2.  **Key Mistake**: Identify the single most significant mistake or area where the user could have performed better. Be specific.
3.  **Improvement Suggestion**: Offer one concise, actionable suggestion for how the user could improve their negotiation skills in future, based on this simulation.

Return the feedback in the specified JSON format.`,
});

const negotiationFeedbackFlow = ai.defineFlow(
  {
    name: 'negotiationFeedbackFlow',
    inputSchema: NegotiationFeedbackInputSchema,
    outputSchema: NegotiationFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
