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
  Flame,
  X
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

interface UpdateHistoryEntry {
  id: string;
  type: 'status_change' | 'assignment_change' | 'comment';
  description: string;
  timestamp: Date;
  author: string;
}

export function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  const [activeTab, setActiveTab] = useState("image-complete");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Array<{id: string, text: string, timestamp: Date, author: string}>>([]);
  const [assignedAgent, setAssignedAgent] = useState("");
  const [eventStatus, setEventStatus] = useState(event?.status || "New");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [updateHistory, setUpdateHistory] = useState<UpdateHistoryEntry[]>([
    {
      id: '1',
      type: 'status_change',
      description: 'Event created with status: New',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      author: 'System'
    }
  ]);

  // Mock chat responses for demo
  const getMockResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('intrusion')) {
      return "Oui, j'ai trouvé 3 autres intrusions dans la zone de production cette semaine :\n• 23 Jan - 09:15 (Caméra 01)\n• 24 Jan - 16:42 (Caméra 03)\n• 25 Jan - 11:28 (Caméra 02)\n\nMaintenant";
    }
    
    return `J'ai analysé l'événement ${event?.type || 'détecté'} qui s'est produit à ${event?.time || 'l\'heure rapportée'} dans ${event?.location || 'la zone surveillée'}. Le niveau de gravité est marqué comme ${event?.severity || 'significatif'}. Basé sur les données disponibles, ceci semble être un incident critique nécessitant une attention immédiate et un suivi d'enquête.`;
  };

  // Simulate chat mutation
  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
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
        content: "J'ai des difficultés à analyser cet événement en ce moment. Veuillez réessayer.",
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

  const handleAssignAgent = (agentValue: string) => {
    if (!agentValue) return;
    
    const agentName = agentValue === 'agent1' ? 'Security Agent A' : 
                     agentValue === 'agent2' ? 'Security Agent B' : 
                     agentValue === 'agent3' ? 'Security Agent C' : 'Security Supervisor';
    
    setAssignedAgent(agentValue);
    
    // Add new entry to update history
    const newHistoryEntry: UpdateHistoryEntry = {
      id: Date.now().toString(),
      type: 'assignment_change',
      description: `Event assigned to ${agentName}`,
      timestamp: new Date(),
      author: 'Security Agent A'
    };
    
    setUpdateHistory(prev => [...prev, newHistoryEntry]);
    console.log("Assigning to agent:", agentValue);
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now().toString(),
      text: comment,
      timestamp: new Date(),
      author: "Security Agent A"
    };
    setComments(prev => [...prev, newComment]);
    
    // Add new entry to update history
    const newHistoryEntry: UpdateHistoryEntry = {
      id: (Date.now() + 1).toString(),
      type: 'comment',
      description: `Comment added: "${comment.length > 50 ? comment.substring(0, 50) + '...' : comment}"`,
      timestamp: new Date(),
      author: 'Security Agent A'
    };
    
    setUpdateHistory(prev => [...prev, newHistoryEntry]);
    setComment(""); // Clear the input for new comment
    console.log("Adding comment:", comment);
  };

  const handleSave = () => {
    console.log("Saving event details");
  };

  const handleAlert = () => {
    console.log("Sending alert");
  };

  const handleStatusChange = (newStatus: string) => {
    const previousStatus = eventStatus;
    setEventStatus(newStatus);
    
    // Add new entry to update history
    const newHistoryEntry: UpdateHistoryEntry = {
      id: Date.now().toString(),
      type: 'status_change',
      description: `Status changed from "${previousStatus}" to "${newStatus}"`,
      timestamp: new Date(),
      author: 'Security Agent A'
    };
    
    setUpdateHistory(prev => [...prev, newHistoryEntry]);
    console.log("Status changed to:", newStatus);
  };

  const getSeverityBadge = (severity: string) => {
    switch(severity?.toLowerCase()) {
      case 'critical':
      case 'critique':
        return <Badge className="bg-red-500 text-white font-bold">CRITICAL</Badge>;
      case 'alert':
      case 'alerte':
        return <Badge className="bg-orange-500 text-white font-bold">ALERT</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white font-bold">INFO</Badge>;
    }
  };

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-7xl max-h-[90vh] p-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 flex flex-col overflow-y-auto">
        {/* Hidden title for accessibility */}
        <DialogTitle className="sr-only">Event Details - {event?.title}</DialogTitle>
        <DialogDescription className="sr-only">Details, actions and investigation tools for security event {event?.id}</DialogDescription>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Event Details
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ID: EVT-2025-{String(event.id).padStart(6, '0')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            data-testid="button-close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Left Panel */}
          <div className="flex-1 flex flex-col border-r border-gray-200 dark:border-gray-700">
            {/* Image Display with Thumbnails */}
            <div className="p-4">
              <div className="flex gap-4">
                {/* Main Image */}
                <div className="flex-1">
                  <div className="relative">
                    <img 
                      src={event.thumbnail || '/api/placeholder/400/300'} 
                      alt={activeTab === "image-complete" ? "Full Image" : "Detection View"}
                      className="w-full h-[600px] object-contain rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    />
                    <div className="absolute top-3 right-3">
                      {getSeverityBadge(event.severity)}
                    </div>
                    {activeTab === "detection" && (
                      <div className="absolute bottom-3 left-3 text-xs bg-black/70 text-white px-2 py-1 rounded">
                        🔍 Detection View
                      </div>
                    )}
                  </div>
                </div>

                {/* Thumbnail Selectors */}
                <div className="w-24 space-y-3">
                  <div 
                    className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                      activeTab === "image-complete" 
                        ? "border-blue-500 ring-2 ring-blue-200" 
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("image-complete")}
                    data-testid="thumbnail-full-image"
                  >
                    <img 
                      src={event.thumbnail || '/api/placeholder/400/300'} 
                      alt="Full Image"
                      className="w-full h-16 object-cover"
                    />
                    <div className="p-1 text-center">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300">📷 Full</p>
                    </div>
                  </div>

                  <div 
                    className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                      activeTab === "detection" 
                        ? "border-blue-500 ring-2 ring-blue-200" 
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("detection")}
                    data-testid="thumbnail-detection"
                  >
                    <img 
                      src={event.thumbnail || '/api/placeholder/400/300'} 
                      alt="Detection View"
                      className="w-full h-16 object-cover"
                    />
                    <div className="p-1 text-center">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300">🔍 Detection</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detection Information */}
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Detection Information
                </h3>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Camera:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {event.camera || 'Camera 02'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Site:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {event.site || 'Main Site'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Zone:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {event.zone || 'Production Zone'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Time:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {event.timestamp || '25 Jan 2025, 14:32'}
                  </span>
                </div>
              </div>
            </div>

            {/* Update History Header - Fixed */}
            <div className="px-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Update History
                </h3>
              </div>
            </div>

            {/* Update History Content */}
            <div className="px-4 pb-4 h-[300px] overflow-y-auto">
              <div className="space-y-3">
                {updateHistory.map((historyItem) => (
                  <div key={historyItem.id} className="flex items-center gap-3 text-sm">
                    <div className={`w-2 h-2 rounded-full ${
                      historyItem.type === 'status_change' ? 'bg-blue-500' :
                      historyItem.type === 'assignment_change' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-gray-900 dark:text-gray-100">
                          {historyItem.type === 'status_change' ? 'Status Changed' :
                           historyItem.type === 'assignment_change' ? 'Agent Assigned' :
                           'Comment Added'}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {historyItem.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        {historyItem.description} - {historyItem.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-[420px] flex flex-col">
            {/* Actions Section */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <UserPlus className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Actions
                </h3>
              </div>
              
              <div className="space-y-4">
                {/* Status */}
                <div>
                  <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
                    Status
                  </label>
                  <Select value={eventStatus} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-full" data-testid="select-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Assign to */}
                <div>
                  <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
                    Assign to
                  </label>
                  <Select value={assignedAgent} onValueChange={handleAssignAgent}>
                    <SelectTrigger className="w-full" data-testid="select-agent">
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agent1">Security Agent A</SelectItem>
                      <SelectItem value="agent2">Security Agent B</SelectItem>
                      <SelectItem value="agent3">Security Agent C</SelectItem>
                      <SelectItem value="supervisor">Security Supervisor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Add Note */}
                <div>
                  <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
                    Add a note
                  </label>
                  <Textarea
                    placeholder="Describe actions taken or observations..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[80px] text-sm"
                    data-testid="textarea-note"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    onClick={handleAddComment}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                    data-testid="button-save"
                  >
                    💾 Save
                  </Button>
                  <Button 
                    onClick={handleAlert}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    data-testid="button-alert"
                  >
                    🚨 Alert
                  </Button>
                </div>
              </div>
            </div>

            {/* AI Investigation Section */}
            <div className="flex-1 flex flex-col p-4">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  🔍 AI Investigation
                </h3>
              </div>
              
              {/* Chat Content Area - Fill remaining space */}
              <div className="flex-1 flex flex-col min-h-0">
                {/* Initial AI Message */}
                <div className="mb-4 flex-shrink-0">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Hello! I can help you analyze this event. What would you like to know?
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 min ago</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages - Scrollable area */}
                <div className="flex-1 mb-4 overflow-y-auto min-h-0">
                  <div className="space-y-4">
                    {chatMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          message.role === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                        }`}>
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.role === 'user' ? 'Now' : '1 min ago'}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Chat Input - Always at bottom */}
                <div className="flex gap-2 flex-shrink-0">
                  <Input
                    placeholder="Were there other intrusions in this zone this week?"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 text-sm"
                    data-testid="input-chat"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim() || isTyping}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3"
                    data-testid="button-send-chat"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Update/Save Button */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline"
              onClick={onClose}
              className="px-6"
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6"
              data-testid="button-update-save"
            >
              💾 Update
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}