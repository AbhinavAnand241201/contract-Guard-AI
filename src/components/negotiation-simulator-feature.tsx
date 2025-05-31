
"use client";

import type { NegotiationSimulatorInput, NegotiationSimulatorOutput } from '@/ai/flows/negotiation-simulator-flow';
import { negotiationSimulator } from '@/ai/flows/negotiation-simulator-flow';
import type { NegotiationFeedbackInput, NegotiationFeedbackOutput } from '@/ai/flows/negotiation-feedback-flow';
import { negotiationFeedback } from '@/ai/flows/negotiation-feedback-flow';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Brain, Loader2, MessageCircle, Send, Sparkles, ThumbsUp, TrendingUp, Zap, CornerDownLeft } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ConversationMessage {
  speaker: 'user' | 'ai';
  message: string;
}

const scenarios = [
  "Negotiate freelance contract payment terms with a new client.",
  "Discussing a salary raise with your current employer.",
  "Negotiating lease terms for a new apartment with a landlord.",
  "Vendor contract renewal: seeking a better price for services.",
  "Client wants to add more work beyond the original project scope (scope creep)."
];

const roles = ['Landlord', 'Client', 'Employer'];

export function NegotiationSimulatorFeature() {
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [currentUserInput, setCurrentUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedbackResult, setFeedbackResult] = useState<NegotiationFeedbackOutput | null>(null);
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [simulationEnded, setSimulationEnded] = useState(false);

  const { toast } = useToast();
  const conversationEndRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationHistory]);

  useEffect(() => {
    if (simulationStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [simulationStarted]);

  const handleStartSimulation = () => {
    if (!selectedScenario || !selectedRole) {
      toast({
        title: "Setup Incomplete",
        description: "Please select both a scenario and a counterparty role.",
        variant: "destructive",
      });
      return;
    }
    setConversationHistory([]);
    setCurrentUserInput('');
    setError(null);
    setFeedbackResult(null);
    setSimulationStarted(true);
    setSimulationEnded(false);
    toast({
      title: "Simulation Started!",
      description: `You are negotiating: ${selectedScenario} with a ${selectedRole}. Good luck!`,
      className: "bg-primary text-primary-foreground"
    });
  };

  const handleSendMessage = async () => {
    if (!currentUserInput.trim() || isLoading) return;

    const newUserMessage: ConversationMessage = { speaker: 'user', message: currentUserInput };
    const updatedHistory = [...conversationHistory, newUserMessage];
    setConversationHistory(updatedHistory);
    setCurrentUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      const input: NegotiationSimulatorInput = {
        role: selectedRole as NegotiationSimulatorInput['role'], 
        scenario: selectedScenario,
        conversationHistory: updatedHistory.map(msg => ({ speaker: msg.speaker, message: msg.message })), // Ensure correct type
        userInput: newUserMessage.message,
      };
      const result = await negotiationSimulator(input);
      setConversationHistory(prev => [...prev, { speaker: 'ai', message: result.aiResponse }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred with the AI.";
      setError(errorMessage);
      toast({ title: "AI Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleEndSimulation = async () => {
    setIsFeedbackLoading(true);
    setError(null);
    setFeedbackResult(null);
    try {
      const input: NegotiationFeedbackInput = {
        role: selectedRole,
        scenario: selectedScenario,
        conversationHistory: conversationHistory.map(msg => ({ speaker: msg.speaker, message: msg.message })), // Ensure correct type
      };
      const result = await negotiationFeedback(input);
      setFeedbackResult(result);
      setSimulationEnded(true);
      setSimulationStarted(false); 
      toast({
        title: "Negotiation Feedback Ready!",
        description: "Check your analysis below.",
        className: "bg-primary text-primary-foreground"
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred while getting feedback.";
      setError(errorMessage);
      toast({ title: "Feedback Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsFeedbackLoading(false);
    }
  };

  const handleNewSimulation = () => {
    setSelectedScenario('');
    setSelectedRole('');
    setConversationHistory([]);
    setCurrentUserInput('');
    setError(null);
    setFeedbackResult(null);
    setSimulationStarted(false);
    setSimulationEnded(false);
  }

  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="text-2xl font-headline">AI Negotiation Simulator</CardTitle>
            <CardDescription>Practice your negotiation skills in realistic scenarios before high-stakes discussions.</CardDescription>
          </div>
        </div>
      </CardHeader>

      {!simulationStarted && !simulationEnded && (
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="scenario-select" className="text-base font-medium">Select Scenario</Label>
              <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                <SelectTrigger id="scenario-select" className="bg-background border">
                  <SelectValue placeholder="Choose a negotiation scenario" />
                </SelectTrigger>
                <SelectContent>
                  {scenarios.map((scenario, index) => (
                    <SelectItem key={index} value={scenario}>{scenario}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-select" className="text-base font-medium">Select AI Counterparty Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger id="role-select" className="bg-background border">
                  <SelectValue placeholder="Choose AI's role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role, index) => (
                    <SelectItem key={index} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
           <Button onClick={handleStartSimulation} disabled={!selectedScenario || !selectedRole} className="w-full text-base py-3 px-6 mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Zap className="mr-2 h-5 w-5" /> Start Simulation
          </Button>
        </CardContent>
      )}

      {simulationStarted && (
        <CardContent className="p-6 space-y-4 flex flex-col max-h-[calc(100vh-20rem)] md:max-h-[calc(100vh-22rem)]">
          <ScrollArea className="flex-grow pr-4 -mr-4 mb-4 h-64 md:h-96 border rounded-lg bg-muted/30 p-4"> 
            <div className="space-y-4">
              {conversationHistory.map((msg, index) => (
                <div key={index} className={`flex flex-col ${msg.speaker === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm shadow-md ${msg.speaker === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card text-foreground border rounded-bl-none'}`}>
                    <p className="font-semibold mb-1">{msg.speaker === 'user' ? 'You' : selectedRole}</p>
                    <p className="whitespace-pre-wrap">{msg.message}</p>
                  </div>
                </div>
              ))}
              <div ref={conversationEndRef} />
            </div>
          </ScrollArea>
          <div className="flex gap-2 items-end pt-4 border-t">
            <Textarea
              ref={inputRef}
              value={currentUserInput}
              onChange={(e) => setCurrentUserInput(e.target.value)}
              placeholder="Type your response..."
              rows={2}
              className="flex-grow resize-none text-sm p-2 focus:border-primary transition-colors bg-background border"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !currentUserInput.trim()} className="py-2 px-4 bg-primary hover:bg-primary/90 text-primary-foreground self-stretch text-base">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              <span className="ml-2 hidden sm:inline">Send</span>
            </Button>
          </div>
           {error && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
          )}
        </CardContent>
      )}
      
      {(simulationStarted || simulationEnded) && (
        <CardFooter className="border-t p-6 bg-muted/50 flex flex-col sm:flex-row justify-between gap-3">
          {simulationStarted && (
             <Button onClick={handleEndSimulation} disabled={isFeedbackLoading || isLoading || conversationHistory.length === 0} variant="outline" className="w-full sm:w-auto text-base py-3 px-6">
                {isFeedbackLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ThumbsUp className="mr-2 h-5 w-5" />}
                End & Get Feedback
            </Button>
          )}
          {(simulationEnded || simulationStarted) && ( 
            <Button onClick={handleNewSimulation} variant="ghost" className="w-full sm:w-auto text-base py-3 px-6 text-muted-foreground hover:text-primary">
                <CornerDownLeft className="mr-2 h-5 w-5" /> Start New Simulation
            </Button>
          )}
        </CardFooter>
      )}


      {feedbackResult && simulationEnded && (
        <CardContent className="p-6 border-t">
          <h3 className="text-2xl font-semibold font-headline text-primary mb-6">Negotiation Feedback</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><TrendingUp className="text-green-500 w-6 h-6"/>Effectiveness Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-5xl font-bold text-primary">{feedbackResult.effectivenessScore}<span className="text-2xl font-normal text-muted-foreground">/100</span></p>
              </CardContent>
            </Card>
            <Card className="bg-card border shadow-sm md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><AlertCircle className="text-destructive w-6 h-6"/>Key Mistake</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{feedbackResult.keyMistake}</p>
              </CardContent>
            </Card>
            <Card className="bg-card border shadow-sm md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><MessageCircle className="text-blue-500 w-6 h-6"/>Improvement Suggestion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{feedbackResult.improvementSuggestion}</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
