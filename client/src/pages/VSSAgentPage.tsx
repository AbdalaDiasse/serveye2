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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
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
                <div className="space-y-6">
                  {/* Top Video Analytics Section */}
                  <div className="grid grid-cols-12 gap-6">
                    {/* Video Player - Takes up 8 columns */}
                    <div className="col-span-8">
                      <Card className="bg-blue-900 text-white overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-white">Video Surveillance</CardTitle>
                            <div className="flex items-center gap-2">
                              <Select defaultValue="camera1">
                                <SelectTrigger className="w-40 bg-blue-800 border-blue-700 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="camera1">Camera 01</SelectItem>
                                  <SelectItem value="camera2">Camera 02</SelectItem>
                                  <SelectItem value="camera3">Camera 03</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          {/* Main Video Display */}
                          <div className="relative aspect-video bg-black">
                            <img 
                              src="/api/placeholder/800/450" 
                              alt="Video surveillance feed"
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Video Overlay Info */}
                            <div className="absolute top-4 left-4 flex items-center gap-2">
                              <Badge className="bg-red-600 text-white text-xs px-2 py-1">
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                  LIVE
                                </div>
                              </Badge>
                            </div>
                            
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-black/60 text-white text-xs px-2 py-1">
                                {new Date().toLocaleTimeString()}
                              </Badge>
                            </div>

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Button 
                                size="lg" 
                                className="bg-white/20 backdrop-blur hover:bg-white/30 rounded-full p-3"
                              >
                                <Play className="w-6 h-6 text-white" />
                              </Button>
                            </div>
                          </div>
                          
                          {/* Video Controls and Timeline */}
                          <div className="p-4 bg-blue-800 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 p-2">
                                  <Play className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 p-2">
                                  <Pause className="w-4 h-4" />
                                </Button>
                                <span className="text-sm text-blue-200">14:30:45 / 15:15:20</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 p-2">
                                  <Download className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 p-2">
                                  <Share2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <Progress value={65} className="h-2 bg-blue-700" />
                            
                            {/* Timeline Thumbnails */}
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="flex-1 aspect-video bg-blue-700 rounded cursor-pointer hover:bg-blue-600 transition-colors overflow-hidden">
                                  <img 
                                    src="/api/placeholder/120/68" 
                                    alt={`Timeline ${i}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Right Analytics Panel - Takes up 4 columns */}
                    <div className="col-span-4 space-y-4">
                      {/* Period Selector */}
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">Période d'analyse:</span>
                        <Select defaultValue="today">
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="today">Aujourd'hui</SelectItem>
                            <SelectItem value="week">Cette semaine</SelectItem>
                            <SelectItem value="month">Ce mois</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-3">
                        <Card className="p-3 bg-blue-50">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">127</div>
                            <div className="text-xs text-gray-600">Personnes détectées</div>
                          </div>
                        </Card>
                        <Card className="p-3 bg-green-50">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">23</div>
                            <div className="text-xs text-gray-600">Véhicules suivis</div>
                          </div>
                        </Card>
                        <Card className="p-3 bg-orange-50">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">5</div>
                            <div className="text-xs text-gray-600">Alertes actives</div>
                          </div>
                        </Card>
                        <Card className="p-3 bg-purple-50">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">98%</div>
                            <div className="text-xs text-gray-600">Efficacité IA</div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>

                  {/* Analysis Results Section */}
                  <div className="grid grid-cols-12 gap-6">
                    
                    {/* Resume Personnel */}
                    <div className="col-span-6">
                      <Card className="bg-blue-50 border border-blue-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2 text-blue-800">
                            <Users className="w-5 h-5" />
                            Résumé Personnel
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="bg-white p-3 rounded border border-blue-100">
                            <h4 className="font-semibold text-sm text-gray-800 mb-2">Analyse des Documents</h4>
                            <div className="text-xs text-gray-600 space-y-1">
                              <p>• Documents analysés dans la zone A: 15 fichiers, 3 dossiers de 12,5 MB</p>
                              <p>• Cartes d'identité scannées et vérifiées: 8 personnes autorisées</p>
                              <p>• Badges d'accès validés: 12 employés, niveau de sécurité confirmé</p>
                              <p>• Personnel externe enregistré: 3 visiteurs, accompagnés selon le protocole</p>
                            </div>
                          </div>
                          
                          <div className="bg-white p-3 rounded border border-blue-100">
                            <h4 className="font-semibold text-sm text-gray-800 mb-2">Feuille de Présence</h4>
                            <div className="text-xs text-gray-600 space-y-1">
                              <p>• Heures d'arrivée enregistrées: 07:30-09:00</p>
                              <p>• Personnel présent: 89 employés sur 95 attendus</p>
                              <p>• Absences justifiées: 4 congés planifiés, 2 congés maladie</p>
                              <p>• Temps de présence moyen: 8h 15min par employé</p>
                            </div>
                          </div>

                          <div className="bg-white p-3 rounded border border-blue-100">
                            <h4 className="font-semibold text-sm text-gray-800 mb-2">Analyse Comportementale</h4>
                            <div className="text-xs text-gray-600 space-y-1">
                              <p>• Comportements normaux détectés: 98.5% des interactions</p>
                              <p>• Anomalies mineures: 3 cas de retard d'accès (&gt;30 sec aux portes)</p>
                              <p>• Groupes formés spontanément: 6 discussions de 5-15 minutes</p>
                              <p>• Respect des protocoles de sécurité: 100% de conformité</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Analyse Securite */}
                    <div className="col-span-6">
                      <Card className="bg-red-50 border border-red-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2 text-red-800">
                            <Shield className="w-5 h-5" />
                            Analyse Sécurité
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="bg-white p-3 rounded border border-red-100">
                            <h4 className="font-semibold text-sm text-gray-800 mb-2">Événements de Sécurité</h4>
                            <div className="space-y-2">
                              <div className="flex items-start gap-2 text-xs">
                                <AlertCircle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">
                                  <span className="font-semibold text-red-600">14:15</span> - Tentative d'accès non autorisé détectée à la porte B. Personne non identifiée dans la base de données
                                </span>
                              </div>
                              <div className="flex items-start gap-2 text-xs">
                                <AlertCircle className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">
                                  <span className="font-semibold text-orange-600">14:23</span> - Objet abandonné détecté en zone B pendant 15 minutes. Sac à dos noir, taille moyenne
                                </span>
                              </div>
                              <div className="flex items-start gap-2 text-xs">
                                <AlertCircle className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">
                                  <span className="font-semibold text-yellow-600">14:35</span> - Comportement atypique: personne immobile pendant 8 minutes près de la zone sensible
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white p-3 rounded border border-red-100">
                            <h4 className="font-semibold text-sm text-gray-800 mb-2">État des Accès</h4>
                            <div className="text-xs text-gray-600 space-y-1">
                              <div className="flex justify-between">
                                <span>Portes principales</span>
                                <span className="text-green-600 font-semibold">✓ Sécurisées</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Sorties de secours</span>
                                <span className="text-green-600 font-semibold">✓ Fonctionnelles</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Système d'alarme</span>
                                <span className="text-green-600 font-semibold">✓ Actif</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Caméras de surveillance</span>
                                <span className="text-green-600 font-semibold">✓ 24/24 opérationnelles</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white p-3 rounded border border-red-100">
                            <h4 className="font-semibold text-sm text-gray-800 mb-2">Analyse Comportementale</h4>
                            <div className="text-xs text-gray-600 space-y-1">
                              <p>• Mouvements suspects détectés: 0 cas critiques</p>
                              <p>• Vitesse de déplacement anormale: 2 cas (course dans les couloirs)</p>
                              <p>• Regroupements non autorisés: 0 rassemblement détecté</p>
                              <p>• Conformité aux protocoles: 98.2% de respect des règles</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Environmental Impact Section */}
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12">
                      <Card className="bg-green-50 border border-green-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2 text-green-800">
                            <Activity className="w-5 h-5" />
                            Recommandations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4">
                            {/* Performance */}
                            <div className="bg-white p-4 rounded border border-green-100">
                              <h4 className="font-semibold text-sm text-gray-800 mb-3">Performance</h4>
                              <div className="space-y-2 text-xs text-gray-600">
                                <p>• Optimiser la position de la caméra 3 pour une meilleure couverture de la zone d'accès</p>
                                <p>• Ajuster les seuils de détection pour réduire les faux positifs de 15%</p>
                                <p>• Améliorer l'éclairage de la zone B pour une reconnaissance faciale plus précise</p>
                                <p>• Configurer des alertes spécialisées pour les objets abandonnés &gt;10 minutes</p>
                              </div>
                            </div>

                            {/* Recommendations */}
                            <div className="bg-white p-4 rounded border border-green-100">
                              <h4 className="font-semibold text-sm text-gray-800 mb-3">Recommandations</h4>
                              <div className="space-y-2 text-xs text-gray-600">
                                <p>• Installer un lecteur de badges supplémentaire à l'entrée principale</p>
                                <p>• Programmer des rondes de sécurité toutes les 2 heures en zone sensible</p>
                                <p>• Mettre en place un système d'alerte SMS pour les incidents critiques</p>
                                <p>• Former le personnel aux nouveaux protocoles de sécurité renforcés</p>
                              </div>
                            </div>

                            {/* Statistics Summary */}
                            <div className="bg-white p-4 rounded border border-green-100">
                              <h4 className="font-semibold text-sm text-gray-800 mb-3">Actions à Effectuer</h4>
                              <div className="space-y-2 text-xs text-gray-600">
                                <p>• Vérifier l'identité de la personne non autorisée (incident 14:15)</p>
                                <p>• Récupérer et analyser l'objet abandonné en zone B</p>
                                <p>• Effectuer un contrôle de routine des systèmes d'accès</p>
                                <p>• Planifier une maintenance préventive des caméras zone 3-5</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Bottom Statistics Section */}
                  <div className="grid grid-cols-12 gap-6">
                    {/* Statistics Table */}
                    <div className="col-span-8">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-blue-600" />
                              <span>Statistiques Détaillées</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="text-xs h-8">
                                <ListFilter className="w-3 h-3 mr-1" />
                                Filtrer
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs h-8">
                                <Download className="w-3 h-3 mr-1" />
                                Export
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-gray-200">
                                  <th className="text-left py-2 font-medium text-gray-700">Objet</th>
                                  <th className="text-center py-2 font-medium text-gray-700">Compté</th>
                                  <th className="text-center py-2 font-medium text-gray-700">Référence</th>
                                  <th className="text-center py-2 font-medium text-gray-700">Stratégies</th>
                                </tr>
                              </thead>
                              <tbody className="text-xs">
                                <tr className="border-b border-gray-100">
                                  <td className="py-2 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-blue-500" />
                                    <span className="font-medium">Employés</span>
                                  </td>
                                  <td className="text-center py-2 font-semibold">89</td>
                                  <td className="text-center py-2 text-gray-600">95</td>
                                  <td className="text-center py-2">
                                    <Badge className="bg-blue-100 text-blue-700 text-xs">Personnel Planifié</Badge>
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                  <td className="py-2 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-green-500" />
                                    <span className="font-medium">Visiteurs</span>
                                  </td>
                                  <td className="text-center py-2 font-semibold">38</td>
                                  <td className="text-center py-2 text-gray-600">-</td>
                                  <td className="text-center py-2">
                                    <Badge className="bg-green-100 text-green-700 text-xs">Référence Historique</Badge>
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                  <td className="py-2 flex items-center gap-2">
                                    <Camera className="w-4 h-4 text-purple-500" />
                                    <span className="font-medium">Véhicules</span>
                                  </td>
                                  <td className="text-center py-2 font-semibold">23</td>
                                  <td className="text-center py-2 text-gray-600">85</td>
                                  <td className="text-center py-2">
                                    <Badge className="bg-purple-100 text-purple-700 text-xs">Parking Management</Badge>
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                  <td className="py-2 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-red-500" />
                                    <span className="font-medium">Incidents</span>
                                  </td>
                                  <td className="text-center py-2 font-semibold">5</td>
                                  <td className="text-center py-2 text-gray-600">2</td>
                                  <td className="text-center py-2">
                                    <Badge className="bg-red-100 text-red-700 text-xs">Analyse de Sécurité</Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-2 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-yellow-500" />
                                    <span className="font-medium">Performance IA</span>
                                  </td>
                                  <td className="text-center py-2 font-semibold">98%</td>
                                  <td className="text-center py-2 text-gray-600">95%</td>
                                  <td className="text-center py-2">
                                    <Badge className="bg-yellow-100 text-yellow-700 text-xs">Amélioration Continue</Badge>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Side Panel with Circular Progress */}
                    <div className="col-span-4 space-y-4">
                      {/* Performance Gauge */}
                      <Card className="text-center">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Performance Globale</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="relative w-24 h-24 mx-auto mb-3">
                            <svg className="w-24 h-24 transform -rotate-90">
                              <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                              <circle 
                                cx="48" cy="48" r="40" 
                                stroke="#10b981" 
                                strokeWidth="8" 
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 40 * 0.82} ${2 * Math.PI * 40}`}
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-2xl font-bold text-green-600">82%</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600">Efficacité du système</p>
                        </CardContent>
                      </Card>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm h-9">
                          <FileText className="w-4 h-4 mr-2" />
                          Générer Rapport
                        </Button>
                        <Button variant="outline" className="w-full text-sm h-9">
                          <Share2 className="w-4 h-4 mr-2" />
                          Partager Analyse
                        </Button>
                      </div>
                    </div>
                  </div>
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