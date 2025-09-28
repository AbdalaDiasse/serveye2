import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
  Building,
  Shield,
  Activity,
  FileText,
  Eye,
  ChevronRight,
  RefreshCw,
  ShieldAlert,
  Zap,
  Flame
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";

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
  const [eventStatus, setEventStatus] = useState(event?.status || "New");
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
    console.log("Assigning to agent:", assignedAgent);
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    console.log("Adding comment:", comment);
    setComment("");
  };

  const handleShare = async () => {
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
      const text = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
      navigator.clipboard.writeText(text);
      console.log('Event details copied to clipboard');
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setEventStatus(newStatus);
    console.log("Status changed to:", newStatus);
  };

  const getSeverityColor = (severity: string) => {
    switch(severity?.toLowerCase()) {
      case 'critical':
      case 'critique':
        return 'bg-red-100 dark:bg-red-950 border-red-300 dark:border-red-800 text-red-700 dark:text-red-300';
      case 'alert':
      case 'alerte':
        return 'bg-orange-100 dark:bg-orange-950 border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'new':
        return 'bg-green-100 dark:bg-green-950 border-green-300 dark:border-green-800 text-green-700 dark:text-green-300';
      case 'in review':
        return 'bg-yellow-100 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300';
      case 'confirmed':
        return 'bg-blue-100 dark:bg-blue-950 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300';
      case 'resolved':
        return 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300';
      case 'critical':
        return 'bg-red-100 dark:bg-red-950 border-red-300 dark:border-red-800 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'new': return <Clock className="w-4 h-4" />;
      case 'in review': return <Eye className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'critical': return <ShieldAlert className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getEventIcon = (type: string) => {
    switch(type?.toLowerCase()) {
      case 'intrusion': return <Shield className="w-5 h-5" />;
      case 'fire': 
      case 'feu/fumée': return <Flame className="w-5 h-5" />;
      case 'epi': return <AlertTriangle className="w-5 h-5" />;
      case 'fight':
      case 'bagarre': return <Zap className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[95vh] p-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Hidden title for accessibility */}
        <DialogTitle className="sr-only">Event Details - {event?.title}</DialogTitle>
        <DialogDescription className="sr-only">Details, actions and investigation tools for safety event {event?.id}</DialogDescription>
        
        {/* Header with Event Title and Badges */}
        <div className="bg-gradient-to-r from-[#0070F3] to-[#0051CC] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                {getEventIcon(event.type)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{event.title}</h2>
                <p className="text-sm text-white/80">Event ID: {event.id}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge 
                className={`${getSeverityColor(event.severity)} border font-semibold px-3 py-1`}
                data-testid={`badge-severity-${event.severity}`}
              >
                {event.severity}
              </Badge>
              <Badge 
                className={`${getStatusColor(eventStatus)} border font-semibold px-3 py-1`}
                data-testid={`badge-status-${eventStatus}`}
              >
                <span className="mr-1">{getStatusIcon(eventStatus)}</span>
                {eventStatus}
              </Badge>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 px-6 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <TabsTrigger value="details" className="data-[state=active]:bg-[#0070F3] data-[state=active]:text-white" data-testid="tab-details">
              <Info className="w-4 h-4 mr-2" />
              Details
            </TabsTrigger>
            <TabsTrigger value="actions" className="data-[state=active]:bg-[#0070F3] data-[state=active]:text-white" data-testid="tab-actions">
              <UserPlus className="w-4 h-4 mr-2" />
              Actions
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-[#0070F3] data-[state=active]:text-white" data-testid="tab-chat">
              <MessageSquare className="w-4 h-4 mr-2" />
              Investigate
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 px-6 py-6">
            <TabsContent value="details" className="space-y-6 mt-0">
              {/* Full Event Image */}
              <Card className="overflow-hidden border-gray-200 dark:border-gray-700">
                <img 
                  src={event.thumbnail || '/api/placeholder/800/400'} 
                  alt={event.title}
                  className="w-full h-auto max-h-[400px] object-contain bg-gray-100 dark:bg-gray-800"
                />
              </Card>

              {/* Event Metadata Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      <ChevronRight className="w-4 h-4 text-blue-400" />
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Detection Time</p>
                    <p className="text-sm font-bold text-blue-900 dark:text-blue-100">
                      {event.time}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Camera className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                      <ChevronRight className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1">Camera</p>
                    <p className="text-sm font-bold text-purple-900 dark:text-purple-100">
                      {event.camera || 'Camera A'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <MapPin className="w-8 h-8 text-green-600 dark:text-green-400" />
                      <ChevronRight className="w-4 h-4 text-green-400" />
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">Zone</p>
                    <p className="text-sm font-bold text-green-900 dark:text-green-100">
                      {event.zone || event.location}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Building className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                      <ChevronRight className="w-4 h-4 text-orange-400" />
                    </div>
                    <p className="text-xs text-orange-600 dark:text-orange-400 font-medium mb-1">Site</p>
                    <p className="text-sm font-bold text-orange-900 dark:text-orange-100">
                      {event.site || 'Production'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Event Description */}
              <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#0070F3]" />
                    Event Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {event.description}
                  </p>
                </CardContent>
              </Card>

              {/* Additional Details */}
              <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#0070F3]" />
                    Event Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-2xl font-bold text-[#0070F3]">98%</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Confidence</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">0.8s</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Response Time</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">3</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Alerts Sent</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">A1</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Protocol</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="space-y-6 mt-0">
              {/* Change Status */}
              <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-[#0070F3]" />
                    Change Event Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {['New', 'In Review', 'Confirmed', 'Resolved', 'Critical'].map((status) => (
                      <Button
                        key={status}
                        variant={eventStatus === status ? "default" : "outline"}
                        className={eventStatus === status ? "bg-[#0070F3] hover:bg-[#0051CC]" : ""}
                        onClick={() => handleStatusChange(status)}
                        data-testid={`button-status-${status.toLowerCase().replace(' ', '-')}`}
                      >
                        {getStatusIcon(status)}
                        <span className="ml-2">{status}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Assign to Agent */}
              <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-[#0070F3]" />
                    Assign to Security Agent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Select value={assignedAgent} onValueChange={setAssignedAgent}>
                      <SelectTrigger className="flex-1" data-testid="select-agent">
                        <SelectValue placeholder="Select a security agent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agent1">Agent Smith - Zone A Specialist</SelectItem>
                        <SelectItem value="agent2">Agent Johnson - Fire Safety Expert</SelectItem>
                        <SelectItem value="agent3">Agent Williams - Intrusion Response</SelectItem>
                        <SelectItem value="agent4">Agent Brown - Senior Investigator</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      onClick={handleAssignAgent}
                      className="bg-[#0070F3] hover:bg-[#0051CC] text-white px-6"
                      data-testid="button-assign-agent"
                    >
                      Assign
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Add Comment */}
              <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#0070F3]" />
                    Add Investigation Note
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Enter your investigation notes, observations, or action items..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[120px] border-gray-300 dark:border-gray-600"
                      data-testid="textarea-comment"
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">
                        {comment.length}/500 characters
                      </p>
                      <Button 
                        onClick={handleAddComment}
                        className="bg-[#0070F3] hover:bg-[#0051CC] text-white"
                        data-testid="button-add-comment"
                        disabled={!comment.trim()}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Add Note
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#0070F3]" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Button 
                      variant="outline"
                      onClick={handleShare}
                      className="justify-start"
                      data-testid="button-share"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Details
                    </Button>
                    <Button 
                      variant="outline"
                      className="justify-start"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button 
                      variant="outline"
                      className="justify-start"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Escalate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="mt-0">
              <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#0070F3]" />
                    AI Investigation Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Chat Messages */}
                    <ScrollArea className="h-[450px] pr-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      {chatMessages.length === 0 ? (
                        <div className="text-center py-8">
                          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Ask questions about this event to investigate what happened
                          </p>
                          <div className="space-y-3">
                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Quick Questions:</p>
                            <div className="flex flex-wrap gap-2 justify-center">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setChatInput("How did the fire start?")}
                                className="text-xs"
                                data-testid="button-example-1"
                              >
                                🔥 How did the fire start?
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setChatInput("What safety measures failed?")}
                                className="text-xs"
                                data-testid="button-example-2"
                              >
                                ⚠️ What safety measures failed?
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setChatInput("Were there any witnesses?")}
                                className="text-xs"
                                data-testid="button-example-3"
                              >
                                👥 Were there any witnesses?
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {chatMessages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-[85%] rounded-xl px-4 py-3 ${
                                  msg.role === 'user'
                                    ? 'bg-[#0070F3] text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  {msg.role === 'user' ? (
                                    <User className="w-3 h-3" />
                                  ) : (
                                    <Shield className="w-3 h-3" />
                                  )}
                                  <span className="text-xs font-semibold">
                                    {msg.role === 'user' ? 'You' : 'AI Assistant'}
                                  </span>
                                </div>
                                <p className="text-sm leading-relaxed">{msg.content}</p>
                              </div>
                            </div>
                          ))}
                          {isTyping && (
                            <div className="flex justify-start">
                              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Analyzing...</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </ScrollArea>

                    {/* Chat Input */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask about this event..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                        disabled={chatMutation.isPending}
                        data-testid="input-chat"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!chatInput.trim() || chatMutation.isPending}
                        className="bg-[#0070F3] hover:bg-[#0051CC] text-white px-6"
                        data-testid="button-send-chat"
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