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

export function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  const [activeTab, setActiveTab] = useState("image-complete");
  const [comment, setComment] = useState("");
  const [assignedAgent, setAssignedAgent] = useState("");
  const [eventStatus, setEventStatus] = useState(event?.status || "Nouveau");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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

  const handleAssignAgent = () => {
    if (!assignedAgent) return;
    console.log("Assigning to agent:", assignedAgent);
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    console.log("Adding comment:", comment);
    setComment("");
  };

  const handleSave = () => {
    console.log("Saving event details");
  };

  const handleAlert = () => {
    console.log("Sending alert");
  };

  const handleStatusChange = (newStatus: string) => {
    setEventStatus(newStatus);
    console.log("Status changed to:", newStatus);
  };

  const getSeverityBadge = (severity: string) => {
    switch(severity?.toLowerCase()) {
      case 'critical':
      case 'critique':
        return <Badge className="bg-red-500 text-white font-bold">CRITIQUE</Badge>;
      case 'alert':
      case 'alerte':
        return <Badge className="bg-orange-500 text-white font-bold">ALERTE</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white font-bold">INFO</Badge>;
    }
  };

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
        {/* Hidden title for accessibility */}
        <DialogTitle className="sr-only">Détails de l'événement - {event?.title}</DialogTitle>
        <DialogDescription className="sr-only">Détails, actions et outils d'investigation pour l'événement de sécurité {event?.id}</DialogDescription>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Détails de l'événement
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
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel */}
          <div className="flex-1 flex flex-col border-r border-gray-200 dark:border-gray-700">
            {/* Image and Tabs */}
            <div className="p-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="image-complete" className="text-sm" data-testid="tab-image-complete">
                    📷 Image complète
                  </TabsTrigger>
                  <TabsTrigger value="detection" className="text-sm" data-testid="tab-detection">
                    🔍 Détection
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="image-complete" className="mt-0">
                  <div className="relative">
                    <img 
                      src={event.thumbnail || '/api/placeholder/400/300'} 
                      alt={event.title}
                      className="w-full h-64 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    <div className="absolute top-3 right-3">
                      {getSeverityBadge(event.severity)}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="detection" className="mt-0">
                  <div className="relative">
                    <img 
                      src={event.thumbnail || '/api/placeholder/400/300'} 
                      alt={event.title}
                      className="w-full h-64 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    <div className="absolute top-3 right-3">
                      {getSeverityBadge(event.severity)}
                    </div>
                    {/* Detection overlay could be added here */}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Detection Information */}
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Informations de détection
                </h3>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Caméra:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {event.camera || 'Caméra 02'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Site:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {event.site || 'Site Principal'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Zone:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {event.zone || 'Zone de production'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Heure:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {event.timestamp || '25 Jan 2025, 14:32'}
                  </span>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Confiance:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Update History */}
            <div className="px-4 pb-4 flex-1 overflow-y-auto">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Historique des mises à jour
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-gray-900 dark:text-gray-100">Événement créé</span>
                      <span className="text-gray-500 dark:text-gray-400">25 Jan 14:32</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      Détection automatique par {event.camera || 'Caméra 02'}
                    </p>
                  </div>
                </div>
                
                {eventStatus !== 'Nouveau' && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-gray-900 dark:text-gray-100">Statut modifié</span>
                        <span className="text-gray-500 dark:text-gray-400">25 Jan 14:35</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        Nouveau → En cours par Agent Sécurité A
                      </p>
                    </div>
                  </div>
                )}
                
                {comment && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-gray-900 dark:text-gray-100">Commentaire ajouté</span>
                        <span className="text-gray-500 dark:text-gray-400">25 Jan 14:38</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        "Équipe de sécurité dépêchée sur zone" - Agent Sécurité A
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-[480px] flex flex-col">
            {/* Actions Section */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
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
                    Statut
                  </label>
                  <Select value={eventStatus} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-full" data-testid="select-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nouveau">Nouveau</SelectItem>
                      <SelectItem value="En cours">En cours</SelectItem>
                      <SelectItem value="Confirmé">Confirmé</SelectItem>
                      <SelectItem value="Résolu">Résolu</SelectItem>
                      <SelectItem value="Critique">Critique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Assign to */}
                <div>
                  <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
                    Assigner à
                  </label>
                  <Select value={assignedAgent} onValueChange={setAssignedAgent}>
                    <SelectTrigger className="w-full" data-testid="select-agent">
                      <SelectValue placeholder="Sélectionner un utilisateur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agent1">Agent Sécurité A</SelectItem>
                      <SelectItem value="agent2">Agent Sécurité B</SelectItem>
                      <SelectItem value="agent3">Agent Sécurité C</SelectItem>
                      <SelectItem value="supervisor">Superviseur Sécurité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Add Note */}
                <div>
                  <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
                    Ajouter une note
                  </label>
                  <Textarea
                    placeholder="Décrivez les actions prises ou observations..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[80px] text-sm"
                    data-testid="textarea-note"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSave}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                    data-testid="button-save"
                  >
                    💾 Sauvegarder
                  </Button>
                  <Button 
                    onClick={handleAlert}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    data-testid="button-alert"
                  >
                    🚨 Alerter
                  </Button>
                </div>
              </div>
            </div>

            {/* AI Investigation Section */}
            <div className="flex-1 flex flex-col p-4">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  🔍 Investigation IA
                </h3>
              </div>
              
              {/* Initial AI Message */}
              <div className="mb-4">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Bonjour ! Je peux vous aider à analyser cet événement. Que souhaitez-vous savoir ?
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Il y a 2 min</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <ScrollArea className="flex-1 mb-4">
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
                          {message.role === 'user' ? 'Maintenant' : 'Il y a 1 min'}
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
              </ScrollArea>

              {/* Chat Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Y a-t-il eu d'autres intrusions dans cette zone cette semaine ?"
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
      </DialogContent>
    </Dialog>
  );
}