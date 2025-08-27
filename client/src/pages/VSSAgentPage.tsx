import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Video, 
  Search, 
  AlertCircle, 
  MessageSquare, 
  Play,
  Pause,
  Clock,
  Calendar,
  FileText,
  TrendingUp,
  Users,
  Activity,
  Camera,
  Shield,
  Target,
  Zap,
  Eye,
  Brain,
  Sparkles,
  ListFilter,
  Download,
  Share2
} from 'lucide-react';

export default function VSSAgentPage() {
  const [activeTab, setActiveTab] = useState('agent');
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedCamera, setSelectedCamera] = useState('all');

  // Agent status data
  const agentStatus = {
    active: true,
    processedVideos: 1247,
    detectedEvents: 89,
    generatedAlerts: 23,
    accuracy: 96.5
  };

  // Recent activities
  const recentActivities = [
    { 
      id: 1, 
      type: 'summary', 
      title: 'Résumé Zone A - 14:30', 
      time: 'Il y a 5 minutes',
      status: 'complete',
      details: 'Activité normale détectée, 45 personnes comptées'
    },
    { 
      id: 2, 
      type: 'alert', 
      title: 'Alerte Sécurité - Entrée principale', 
      time: 'Il y a 12 minutes',
      status: 'urgent',
      details: 'Comportement suspect détecté près de l\'entrée'
    },
    { 
      id: 3, 
      type: 'search', 
      title: 'Recherche véhicule rouge complétée', 
      time: 'Il y a 20 minutes',
      status: 'complete',
      details: '3 correspondances trouvées dans les dernières 24h'
    },
    { 
      id: 4, 
      type: 'qa', 
      title: 'Question répondue: Affluence parking', 
      time: 'Il y a 35 minutes',
      status: 'complete',
      details: 'Taux d\'occupation actuel: 78%'
    },
    { 
      id: 5, 
      type: 'summary', 
      title: 'Rapport hebdomadaire généré', 
      time: 'Il y a 1 heure',
      status: 'complete',
      details: 'Analyse complète de 168 heures de vidéo'
    }
  ];

  // Processing queue
  const processingQueue = [
    { id: 1, name: 'Caméra 01 - Hall principal', progress: 87, eta: '2 min' },
    { id: 2, name: 'Caméra 05 - Parking B', progress: 45, eta: '5 min' },
    { id: 3, name: 'Caméra 12 - Zone de chargement', progress: 12, eta: '8 min' },
    { id: 4, name: 'Caméra 08 - Corridor Est', progress: 0, eta: '10 min' }
  ];

  // Model performance metrics
  const modelMetrics = {
    summarization: { accuracy: 94, speed: 1.2, load: 67 },
    search: { accuracy: 97, speed: 0.8, load: 45 },
    alerts: { accuracy: 98, speed: 0.3, load: 78 },
    qa: { accuracy: 91, speed: 1.5, load: 56 }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      complete: 'bg-green-100 text-green-800',
      urgent: 'bg-red-100 text-red-800',
      processing: 'bg-blue-100 text-blue-800',
      pending: 'bg-gray-100 text-gray-800'
    };
    return variants[status] || variants.pending;
  };

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'summary': return <FileText className="w-4 h-4" />;
      case 'alert': return <AlertCircle className="w-4 h-4" />;
      case 'search': return <Search className="w-4 h-4" />;
      case 'qa': return <MessageSquare className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">VSS Agent Intelligent</h1>
                <p className="text-gray-600">Système de Recherche et Résumé Vidéo par IA</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                <SelectTrigger className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les caméras</SelectItem>
                  <SelectItem value="zone_a">Zone A</SelectItem>
                  <SelectItem value="zone_b">Zone B</SelectItem>
                  <SelectItem value="parking">Parking</SelectItem>
                  <SelectItem value="entrance">Entrées</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                <Sparkles className="w-4 h-4 mr-2" />
                Optimiser l'Agent
              </Button>
            </div>
          </div>
        </div>

        {/* Agent Status Cards */}
        <div className="grid grid-cols-5 gap-4">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">État de l'Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-800">
                  {agentStatus.active ? 'Actif' : 'Inactif'}
                </span>
                <div className={`w-3 h-3 rounded-full ${agentStatus.active ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              </div>
              <p className="text-xs text-gray-500 mt-1">Temps de fonctionnement: 99.8%</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">Vidéos Traitées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-800">{agentStatus.processedVideos}</span>
                <Video className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-xs text-green-600 mt-1">+12% depuis hier</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">Événements Détectés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-800">{agentStatus.detectedEvents}</span>
                <Eye className="w-5 h-5 text-indigo-500" />
              </div>
              <p className="text-xs text-gray-500 mt-1">15 critiques</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">Alertes Générées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-800">{agentStatus.generatedAlerts}</span>
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-xs text-red-600 mt-1">5 urgentes</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">Précision Globale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-800">{agentStatus.accuracy}%</span>
                <Target className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-xs text-green-600 mt-1">+2.3% ce mois</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content with Tabs */}
        <Card className="bg-white">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="agent" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Agent VSS
                </TabsTrigger>
                <TabsTrigger value="summarize" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Résumé
                </TabsTrigger>
                <TabsTrigger value="search" className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Recherche
                </TabsTrigger>
                <TabsTrigger value="alerts" className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Alertes
                </TabsTrigger>
                <TabsTrigger value="qa" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Q/R
                </TabsTrigger>
              </TabsList>

              <TabsContent value="agent" className="mt-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Recent Activities */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Activités Récentes
                    </h3>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-3 pr-4">
                        {recentActivities.map(activity => (
                          <Card key={activity.id} className="p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${getStatusBadge(activity.status)} bg-opacity-20`}>
                                  {getActivityIcon(activity.type)}
                                </div>
                                <div className="space-y-1">
                                  <h4 className="font-medium text-gray-800">{activity.title}</h4>
                                  <p className="text-sm text-gray-600">{activity.details}</p>
                                  <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                              </div>
                              <Badge className={getStatusBadge(activity.status)}>
                                {activity.status === 'complete' ? 'Terminé' : 
                                 activity.status === 'urgent' ? 'Urgent' : 
                                 activity.status === 'processing' ? 'En cours' : 'En attente'}
                              </Badge>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Processing Queue */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      File de Traitement
                    </h3>
                    <div className="space-y-4">
                      {processingQueue.map(item => (
                        <Card key={item.id} className="p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{item.name}</span>
                              <span className="text-xs text-gray-500">ETA: {item.eta}</span>
                            </div>
                            <Progress value={item.progress} className="h-2" />
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-500">{item.progress}% complété</span>
                              {item.progress > 0 && item.progress < 100 && (
                                <Badge variant="outline" className="text-xs">En cours</Badge>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Model Performance */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Performance des Modèles
                  </h3>
                  <div className="grid grid-cols-4 gap-4">
                    {Object.entries(modelMetrics).map(([model, metrics]) => (
                      <Card key={model} className="p-4">
                        <h4 className="font-medium text-gray-700 capitalize mb-3">{model}</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Précision</span>
                            <span className="text-sm font-semibold">{metrics.accuracy}%</span>
                          </div>
                          <Progress value={metrics.accuracy} className="h-1" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Vitesse</span>
                            <span className="text-sm font-semibold">{metrics.speed}s</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Charge</span>
                            <span className={`text-sm font-semibold ${metrics.load > 70 ? 'text-red-600' : 'text-green-600'}`}>
                              {metrics.load}%
                            </span>
                          </div>
                          <Progress 
                            value={metrics.load} 
                            className={`h-1 ${metrics.load > 70 ? '[&>div]:bg-red-500' : ''}`} 
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="summarize" className="mt-6">
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Module de Résumé Vidéo</h3>
                  <p className="text-gray-500">Génération automatique de résumés intelligents des flux vidéo</p>
                </div>
              </TabsContent>

              <TabsContent value="search" className="mt-6">
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Recherche Intelligente</h3>
                  <p className="text-gray-500">Recherche avancée dans les archives vidéo avec IA</p>
                </div>
              </TabsContent>

              <TabsContent value="alerts" className="mt-6">
                <div className="text-center py-12">
                  <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Gestion des Alertes</h3>
                  <p className="text-gray-500">Configuration et suivi des alertes automatiques</p>
                </div>
              </TabsContent>

              <TabsContent value="qa" className="mt-6">
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Questions & Réponses</h3>
                  <p className="text-gray-500">Interface conversationnelle pour interroger les données vidéo</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}