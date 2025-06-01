
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
import { AlertCircle, Brain, Loader2, MessageCircle, Send, Sparkles, ThumbsUp, TrendingUp, Zap, CornerDownLeft, Info } from 'lucide-react';
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

const roles = ['Landlord', 'Client', 'Employer'] as const;

export function NegotiationSimulatorFeature() {
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<typeof roles[number] | ''>('');
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [currentUserInput, setCurrentUserInput] = useState('');
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const [aiThinkingText, setAiThinkingText] = useState<string | null>(null);
  const [feedbackLoadingText, setFeedbackLoadingText] = useState<string | null>(null);
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
    if (simulationStarted && !isAiResponding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [simulationStarted, isAiResponding]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAiResponding) {
      setAiThinkingText("ContractGuard AI is thinking...");
      timer = setTimeout(() => {
        setAiThinkingText("ContractGuard AI is preparing a response...");
      }, 2500);
    } else {
      setAiThinkingText(null);
    }
    return () => clearTimeout(timer);
  }, [isAiResponding]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isFeedbackLoading) {
      setFeedbackLoadingText("ContractGuard AI is thinking...");
      timer = setTimeout(() => {
        setFeedbackLoadingText("ContractGuard AI is analysing your negotiation...");
      }, 2500);
    } else {
      setFeedbackLoadingText(null);
    }
    return () => clearTimeout(timer);
  }, [isFeedbackLoading]);


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
     if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSendMessage = async () => {
    if (!currentUserInput.trim() || isAiResponding) return;

    const userMessageContent = currentUserInput;
    const newUserMessage: ConversationMessage = { speaker: 'user', message: userMessageContent };
    
    const updatedLocalHistory = [...conversationHistory, newUserMessage];
    setConversationHistory(updatedLocalHistory); 
    
    setCurrentUserInput('');
    setIsAiResponding(true);
    setError(null);

    try {
      const input: NegotiationSimulatorInput = {
        role: selectedRole as typeof roles[number], 
        scenario: selectedScenario,
        conversationHistory: updatedLocalHistory.map(msg => ({ 
          speaker: msg.speaker, 
          message: msg.message 
        })),
        userInput: userMessageContent,
      };
      const result = await negotiationSimulator(input);
      if (result && result.aiResponse) {
        setConversationHistory(prev => [...prev, { speaker: 'ai', message: result.aiResponse }]);
      } else {
        setConversationHistory(prev => prev.slice(0, -1));
        throw new Error("AI did not provide a valid response.");
      }
    } catch (err) {
      setConversationHistory(prev => prev.slice(0, -1)); 
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred with the AI.";
      setError(errorMessage);
      toast({ title: "AI Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsAiResponding(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleEndSimulation = async () => {
    if (conversationHistory.length === 0) {
        toast({
            title: "No Conversation",
            description: "Please have a conversation before requesting feedback.",
            variant: "destructive",
        });
        return;
    }
    setIsFeedbackLoading(true);
    setError(null);
    setFeedbackResult(null);
    try {
      const input: NegotiationFeedbackInput = {
        role: selectedRole as string, 
        scenario: selectedScenario,
        conversationHistory: conversationHistory.map(msg => ({ 
          speaker: msg.speaker, 
          message: msg.message 
        })),
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
    <Card className="w-full shadow-xl rounded-xl overflow-hidden flex flex-col card-hover-effect">
      <CardHeader className="border-b p-4 sm:p-6 bg-card/50">
        <div className="flex items-center gap-3">
          <Brain className="w-7 h-7 sm:w-8 sm:h-8 text-primary shrink-0" />
          <div>
            <CardTitle className="text-xl sm:text-2xl font-headline">AI Negotiation Simulator</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Practice your negotiation skills in realistic scenarios before high-stakes discussions.</CardDescription>
          </div>
        </div>
      </CardHeader>

      {!simulationStarted && !simulationEnded && (
        <CardContent className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="scenario-select" className="text-base font-medium">Select Scenario</Label>
              <Select value={selectedScenario} onValueChange={setSelectedScenario} disabled={isAiResponding || isFeedbackLoading}>
                <SelectTrigger id="scenario-select" className="bg-background border shadow-sm text-sm sm:text-base focus:border-primary transition-colors">
                  <SelectValue placeholder="Choose a negotiation scenario" />
                </SelectTrigger>
                <SelectContent>
                  {scenarios.map((scenario, index) => (
                    <SelectItem key={index} value={scenario} className="text-sm sm:text-base">{scenario}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-select" className="text-base font-medium">Select AI Counterparty Role</Label>
              <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as typeof roles[number])} disabled={isAiResponding || isFeedbackLoading}>
                <SelectTrigger id="role-select" className="bg-background border shadow-sm text-sm sm:text-base focus:border-primary transition-colors">
                  <SelectValue placeholder="Choose AI's role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role, index) => (
                    <SelectItem key={index} value={role} className="text-sm sm:text-base">{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
           <Button onClick={handleStartSimulation} disabled={!selectedScenario || !selectedRole || isAiResponding || isFeedbackLoading} className="w-full text-base py-3 px-6 mt-4 bg-primary hover:bg-primary/90 text-primary-foreground button-hover-effect shadow-md hover:shadow-lg">
            <Zap className="mr-2 h-5 w-5" /> Start Simulation
          </Button>
        </CardContent>
      )}

      {simulationStarted && (
         <CardContent className="p-4 sm:p-6 space-y-4 flex flex-col flex-grow max-h-[400px] sm:max-h-[550px] md:max-h-[700px]">
          <ScrollArea className="flex-grow pr-2 sm:pr-4 -mr-2 sm:-mr-4 mb-4 border rounded-lg bg-muted/30 p-3 sm:p-4 shadow-inner"> 
            {conversationHistory.length === 0 && !isAiResponding && (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    No messages yet. Start the conversation!
                </div>
            )}
            <div className="space-y-4">
              {conversationHistory.map((msg, index) => (
                <div key={index} className={`flex flex-col ${msg.speaker === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] sm:max-w-[80%] p-2.5 sm:p-3 rounded-lg text-sm shadow-md ${msg.speaker === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card text-foreground border rounded-bl-none'}`}>
                    <p className="font-semibold mb-1 text-xs sm:text-sm">{msg.speaker === 'user' ? 'You' : selectedRole}</p>
                    <p className="whitespace-pre-wrap text-xs sm:text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
              {isAiResponding && aiThinkingText && (
                <div className="flex items-start">
                    <div className="max-w-[85%] sm:max-w-[80%] p-2.5 sm:p-3 rounded-lg text-sm shadow-md bg-card text-muted-foreground border rounded-bl-none italic">
                        <div className="flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin shrink-0" />
                            <span>{aiThinkingText}</span>
                        </div>
                    </div>
                </div>
              )}
              <div ref={conversationEndRef} />
            </div>
          </ScrollArea>
          <div className="flex gap-2 sm:gap-3 items-end pt-4 border-t">
            <Textarea
              ref={inputRef}
              value={currentUserInput}
              onChange={(e) => setCurrentUserInput(e.target.value)}
              placeholder="Type your response..."
              rows={2}
              className="flex-grow resize-none text-sm p-2 focus:border-primary transition-colors bg-background border shadow-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isAiResponding || isFeedbackLoading}
            />
            <Button onClick={handleSendMessage} disabled={isAiResponding || !currentUserInput.trim() || isFeedbackLoading} className="py-2 px-3 sm:px-4 bg-primary hover:bg-primary/90 text-primary-foreground self-stretch text-sm sm:text-base button-hover-effect shadow hover:shadow-md">
              {isAiResponding ? <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" /> : <Send className="h-4 w-4 sm:h-5 sm:w-5" />}
              <span className="ml-1.5 sm:ml-2 hidden sm:inline">Send</span>
            </Button>
          </div>
           {error && !isAiResponding && (
              <Alert variant="destructive" className="mt-2 text-xs sm:text-sm">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
          )}
        </CardContent>
      )}
      
      {(simulationStarted || simulationEnded) && (
        <CardFooter className="border-t p-4 sm:p-6 bg-muted/50 flex flex-col sm:flex-row justify-between items-center gap-3 mt-auto">
          {simulationStarted && (
             <Button 
                onClick={handleEndSimulation} 
                disabled={isFeedbackLoading || isAiResponding || conversationHistory.length === 0} 
                variant="outline" 
                className="w-full sm:w-auto text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-6 shadow hover:shadow-md border-primary/50 hover:bg-primary/10 hover:text-primary button-hover-effect"
              >
                {isFeedbackLoading && feedbackLoadingText ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    {feedbackLoadingText}
                  </>
                ) : (
                  <>
                    <ThumbsUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    End & Get Feedback
                  </>
                )}
            </Button>
          )}
          <Button 
            onClick={handleNewSimulation} 
            variant="ghost" 
            className="w-full sm:w-auto text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-6 text-muted-foreground hover:text-primary hover:bg-primary/5 button-hover-effect"
            disabled={isAiResponding || isFeedbackLoading}
          >
            <CornerDownLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Start New Simulation
          </Button>
        </CardFooter>
      )}


      {feedbackResult && simulationEnded && (
        <CardContent className="p-4 sm:p-6 border-t">
          <h3 className="text-xl sm:text-2xl font-semibold font-headline text-primary mb-4 sm:mb-6">Negotiation Feedback</h3>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            <Card className="bg-card border shadow-md card-hover-effect">
              <CardHeader className="pb-2 pt-3 sm:pb-3 sm:pt-4 px-3 sm:px-4">
                <CardTitle className="flex items-center gap-2 text-md sm:text-lg"><TrendingUp className="text-green-500 w-5 h-5 sm:w-6 sm:h-6"/>Effectiveness Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center p-3 sm:p-4">
                <p className="text-4xl sm:text-5xl font-bold text-primary">{feedbackResult.effectivenessScore}<span className="text-xl sm:text-2xl font-normal text-muted-foreground">/100</span></p>
              </CardContent>
            </Card>
            <Card className="bg-card border shadow-md card-hover-effect">
              <CardHeader className="pb-2 pt-3 sm:pb-3 sm:pt-4 px-3 sm:px-4">
                <CardTitle className="flex items-center gap-2 text-md sm:text-lg"><AlertCircle className="text-destructive w-5 h-5 sm:w-6 sm:h-6"/>Key Mistake</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4">
                <p className="text-xs sm:text-sm leading-relaxed">{feedbackResult.keyMistake}</p>
              </CardContent>
            </Card>
            <Card className="bg-card border shadow-md card-hover-effect">
              <CardHeader className="pb-2 pt-3 sm:pb-3 sm:pt-4 px-3 sm:px-4">
                <CardTitle className="flex items-center gap-2 text-md sm:text-lg"><MessageCircle className="text-blue-500 dark:text-blue-400 w-5 h-5 sm:w-6 sm:h-6"/>Improvement Suggestion</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4">
                <p className="text-xs sm:text-sm leading-relaxed">{feedbackResult.improvementSuggestion}</p>
              </CardContent>
            </Card>
          </div>
           <Alert variant="default" className="mt-6 bg-accent/10 border-accent/50 text-accent-foreground text-xs sm:text-sm shadow">
              <Info className="h-5 w-5 text-accent" />
              <AlertTitle className="font-semibold text-accent">Simulator Information</AlertTitle>
              <AlertDescription>
                This AI negotiation simulator is for practice purposes only. The AI's responses are generated and may not reflect real-world negotiation outcomes. Feedback provided is AI-generated and intended to offer general guidance.
              </AlertDescription>
            </Alert>
        </CardContent>
      )}
    </Card>
  );
}
