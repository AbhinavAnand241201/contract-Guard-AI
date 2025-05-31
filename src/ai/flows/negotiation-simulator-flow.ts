
'use server';

/**
 * @fileOverview AI-powered negotiation simulator flow.
 *
 * - negotiationSimulatorFlow - A function that generates AI responses for negotiation simulation.
 * - NegotiationSimulatorInput - The input type for the negotiationSimulatorFlow function.
 * - NegotiationSimulatorOutput - The return type for the negotiationSimulatorFlow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NegotiationSimulatorInputSchema = z.object({
  role: z.enum(['Landlord', 'Client', 'Employer']).describe('The role the AI will play.'),
  scenario: z.string().describe('The negotiation scenario context.'),
  conversationHistory: z
    .array(
      z.object({
        speaker: z.enum(['user', 'ai']).describe('Who sent the message.'),
        message: z.string().describe('The content of the message.'),
      })
    )
    .describe('The history of the conversation so far.'),
  userInput: z.string().describe("The user's latest message in the negotiation."),
});
export type NegotiationSimulatorInput = z.infer<typeof NegotiationSimulatorInputSchema>;

const NegotiationSimulatorOutputSchema = z.object({
  aiResponse: z.string().describe("The AI's response in the negotiation."),
});
export type NegotiationSimulatorOutput = z.infer<typeof NegotiationSimulatorOutputSchema>;

export async function negotiationSimulator(input: NegotiationSimulatorInput): Promise<NegotiationSimulatorOutput> {
  return negotiationSimulatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'negotiationSimulatorPrompt',
  input: {schema: NegotiationSimulatorInputSchema},
  output: {schema: NegotiationSimulatorOutputSchema},
  prompt: `You are an AI simulating a contract negotiation.
Act as a {{role}}. Your personality should align with this role in a typical negotiation. For example, a 'Demanding Client' might be firm, a 'Landlord' might be focused on property rules, an 'Employer' might discuss company policy.
The negotiation is about: {{scenario}}.

Conversation History:
{{#each conversationHistory}}
{{speaker}}: {{message}}
{{/each}}

User's latest message: "{{userInput}}"

Your task is to respond to the user's message. Your response should:
1. Be a maximum of 2-3 sentences.
2. Be in character for the {{role}} you are playing, considering the {{scenario}}.
3. If appropriate for the context and your role, include a point of contention, a question, or a reason for your stance.

Generate only the AI's response.`,
});

const negotiationSimulatorFlow = ai.defineFlow(
  {
    name: 'negotiationSimulatorFlow',
    inputSchema: NegotiationSimulatorInputSchema,
    outputSchema: NegotiationSimulatorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
