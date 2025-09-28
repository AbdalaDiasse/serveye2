import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Info,
  MessageSquare,
  UserPlus,
  Share2,
  Send,
  Clock,
  MapPin,
  Camera,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  User,
  Calendar,
  Hash,
  Building
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface EventDetailModalProps {
  event: any;
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [comment, setComment] = useState("");
  const [assignedAgent, setAssignedAgent] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Mock chat responses for demo
  const getMockResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('fire') && lowerMessage.includes('start')) {
      return "Based on the thermal imaging data and smoke detection patterns, the fire appears to have originated from the electrical panel in Zone B. The rapid temperature increase at 14:32 suggests an electrical short circuit as the likely cause. Emergency protocols were activated within 30 seconds of detection.";
    }
    if (lowerMessage.includes('safety') && lowerMessage.includes('measure')) {
      return "Several safety measures were triggered: 1) Automatic fire suppression system activated at 14:33, 2) Emergency evacuation alerts sent to all personnel, 3) Zone isolation protocols engaged. However, the backup sprinkler system in Section 2B experienced a 45-second delay due to a pressure valve issue that needs immediate attention.";
    }
    if (lowerMessage.includes('witness')) {
      return "According to access logs, 3 personnel were in the vicinity: Technician James Wilson (Zone B maintenance), Supervisor Maria Garcia (routine inspection), and Security Officer Chen Li (patrol route). All personnel were safely evacuated. Their statements have been logged in the incident report.";
    }
    if (lowerMessage.includes('damage') || lowerMessage.includes('impact')) {
      return "Preliminary assessment indicates: Minor structural damage to electrical panel B-7, smoke damage in a 10-meter radius, no injuries reported. Equipment affected includes 2 control units and wiring infrastructure. Estimated repair time: 48-72 hours. Production impact limited to Zone B operations.";
    }
    if (lowerMessage.includes('prevent') || lowerMessage.includes('recommendation')) {
      return "Key recommendations: 1) Immediate inspection of all electrical panels in similar zones, 2) Upgrade thermal monitoring sensors to newer models with faster response times, 3) Review and update maintenance schedules for critical electrical infrastructure, 4) Conduct emergency response drill focusing on electrical fire scenarios within 2 weeks.";
    }
    
    return `I've analyzed the ${event?.type || 'event'} that occurred at ${event?.time || 'the reported time'} in ${event?.location || 'the monitored area'}. The severity level is marked as ${event?.severity || 'significant'}. Based on the available data, this appears to be a safety-critical incident requiring immediate attention and follow-up investigation.`;
  };

  // Simulate chat mutation
  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      return { response: getMockResponse(message) };
    },
    onSuccess: (data) => {
      setChatMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    },
    onError: () => {
      setChatMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I'm having trouble analyzing this event right now. Please try again.",
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }
  });

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);
    
    chatMutation.mutate(chatInput);
  };

  const handleAssignAgent = () => {
    if (!assignedAgent) return;
    // Handle agent assignment
    console.log("Assigning to agent:", assignedAgent);
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    // Handle comment addition
    console.log("Adding comment:", comment);
    setComment("");
  };

  const handleShare = async () => {
    // Handle sharing functionality
    const shareData = {
      title: `Safety Event: ${event?.title}`,
      text: `${event?.description} - Severity: ${event?.severity}, Status: ${event?.status}`,
      url: window.location.href
    };
    
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: Copy to clipboard
      const text = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
      navigator.clipboard.writeText(text);
      console.log('Event details copied to clipboard');
    }
  };

  const getSeverityColor = (severity: string) => {
    switch(severity?.toLowerCase()) {
      case 'critical': return 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400';
      case 'alert': return 'border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400';
      default: return 'border-gray-500 text-gray-600 dark:border-gray-400 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'new': return <Clock className="w-4 h-4" />;
      case 'in review': return <AlertTriangle className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-white dark:bg-gray-800">
        <DialogHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Event Details
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 px-6">
            <TabsTrigger value="details" data-testid="tab-details">
              <Info className="w-4 h-4 mr-2" />
              Details
            </TabsTrigger>
            <TabsTrigger value="actions" data-testid="tab-actions">
              <UserPlus className="w-4 h-4 mr-2" />
              Actions
            </TabsTrigger>
            <TabsTrigger value="chat" data-testid="tab-chat">
              <MessageSquare className="w-4 h-4 mr-2" />
              Investigate
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 px-6 py-4">
            <TabsContent value="details" className="space-y-6 mt-0">
              {/* Event Image */}
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={event.thumbnail || '/api/placeholder/400/200'} 
                  alt={event.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge className={`border-2 bg-transparent ${getSeverityColor(event.severity)}`}>
                    {event.severity}
                  </Badge>
                  <Badge variant="outline" className="bg-white/90 dark:bg-gray-800/90">
                    <span className="mr-1">{getStatusIcon(event.status)}</span>
                    {event.status}
                  </Badge>
                </div>
              </div>

              {/* Event Information Grid */}
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Event ID</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {event.id}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Detection Time</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {event.time}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Location</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {event.location}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Camera</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {event.camera || 'Camera A'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Event Description
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="space-y-6 mt-0">
              {/* Assign to Agent */}
              <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                    Assign to Agent
                  </h3>
                  <div className="flex gap-2">
                    <Select value={assignedAgent} onValueChange={setAssignedAgent}>
                      <SelectTrigger className="flex-1" data-testid="select-agent">
                        <SelectValue placeholder="Select an agent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agent1">Agent Smith</SelectItem>
                        <SelectItem value="agent2">Agent Johnson</SelectItem>
                        <SelectItem value="agent3">Agent Williams</SelectItem>
                        <SelectItem value="agent4">Agent Brown</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      onClick={handleAssignAgent}
                      className="bg-[#0070F3] hover:bg-[#0051CC] text-white"
                      data-testid="button-assign-agent"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Assign
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Add Comment */}
              <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                    Add Comment
                  </h3>
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Enter your comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[100px] bg-white dark:bg-gray-800"
                      data-testid="textarea-comment"
                    />
                    <Button 
                      onClick={handleAddComment}
                      className="bg-[#0070F3] hover:bg-[#0051CC] text-white"
                      data-testid="button-add-comment"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Add Comment
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Share Details */}
              <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                    Share Details
                  </h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter email address..."
                      className="flex-1 bg-white dark:bg-gray-800"
                      data-testid="input-share-email"
                    />
                    <Button 
                      onClick={handleShare}
                      className="bg-[#0070F3] hover:bg-[#0051CC] text-white"
                      data-testid="button-share"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="mt-0">
              <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Chat Messages */}
                    <ScrollArea className="h-[400px] pr-4">
                      {chatMessages.length === 0 ? (
                        <div className="text-center py-8">
                          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Ask questions about this event to investigate what happened
                          </p>
                          <div className="mt-4 space-y-2">
                            <p className="text-xs text-gray-500">Example questions:</p>
                            <div className="flex flex-wrap gap-2 justify-center">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setChatInput("How did the fire start?")}
                                data-testid="button-example-1"
                              >
                                How did the fire start?
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setChatInput("What safety measures failed?")}
                                data-testid="button-example-2"
                              >
                                What safety measures failed?
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setChatInput("Were there any witnesses?")}
                                data-testid="button-example-3"
                              >
                                Were there any witnesses?
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {chatMessages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg p-3 ${
                                  msg.role === 'user'
                                    ? 'bg-[#0070F3] text-white'
                                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <User className="w-3 h-3" />
                                  <span className="text-xs font-medium">
                                    {msg.role === 'user' ? 'You' : 'AI Assistant'}
                                  </span>
                                </div>
                                <p className="text-sm">{msg.content}</p>
                              </div>
                            </div>
                          ))}
                          {isTyping && (
                            <div className="flex justify-start">
                              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                                <Loader2 className="w-4 h-4 animate-spin" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </ScrollArea>

                    {/* Chat Input */}
                    <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Input
                        placeholder="Ask about this event..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 bg-white dark:bg-gray-800"
                        disabled={chatMutation.isPending}
                        data-testid="input-chat"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!chatInput.trim() || chatMutation.isPending}
                        className="bg-[#0070F3] hover:bg-[#0051CC] text-white"
                        data-testid="button-send-message"
                      >
                        {chatMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}