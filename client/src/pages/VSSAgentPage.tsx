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
                <div className="space-y-6">
                  {/* Video Player Section */}
                  <div className="grid grid-cols-3 gap-6">
                    {/* Video Player */}
                    <div className="col-span-2">
                      <Card className="bg-gray-900 text-white">
                        <CardContent className="p-0">
                          {/* Video Container */}
                          <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
                            <video 
                              className="w-full h-full object-cover"
                              poster="/api/placeholder/800/450"
                            >
                              <source src="/video-placeholder.mp4" type="video/mp4" />
                            </video>
                            
                            {/* Video Overlay Info */}
                            <div className="absolute top-4 left-4 flex items-center gap-2">
                              <Badge className="bg-red-600 text-white">
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                  LIVE
                                </div>
                              </Badge>
                              <Badge className="bg-gray-800/80 text-white">
                                Caméra 01 - Hall Principal
                              </Badge>
                            </div>
                            
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-gray-800/80 text-white">
                                {new Date().toLocaleTimeString()}
                              </Badge>
                            </div>

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Button 
                                size="lg" 
                                className="bg-white/20 backdrop-blur hover:bg-white/30 rounded-full p-4"
                              >
                                <Play className="w-8 h-8 text-white" />
                              </Button>
                            </div>
                          </div>
                          
                          {/* Video Controls */}
                          <div className="p-4 bg-gray-800">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
                                  <Play className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
                                  <Pause className="w-4 h-4" />
                                </Button>
                                <span className="text-sm text-gray-400">00:45 / 03:20</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
                                  <Download className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
                                  <Share2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <Progress value={35} className="h-1" />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Timeline Thumbnails */}
                      <div className="flex gap-2 mt-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="flex-1 aspect-video bg-gray-200 rounded cursor-pointer hover:opacity-80 transition-opacity">
                            <img 
                              src="/api/placeholder/150/85" 
                              alt={`Snapshot ${i}`}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Side Panels */}
                    <div className="space-y-4">
                      {/* Resume du Video */}
                      <Card className="bg-blue-50 border-blue-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-600" />
                            Résumé du Vidéo
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
                            <p className="text-gray-700">Période analysée: 09:00-09:45 (45 min)</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
                            <p className="text-gray-700">127 personnes détectées au total</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
                            <p className="text-gray-700">23 véhicules identifiés dans le parking</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
                            <p className="text-gray-700">Pic d'activité: 09:15-09:30</p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Analyse des Personnes */}
                      <Card className="bg-yellow-50 border-yellow-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Users className="w-4 h-4 text-yellow-600" />
                            Analyse des Personnes
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white p-2 rounded">
                              <p className="text-xs text-gray-500">Personnel identifié</p>
                              <p className="font-semibold">89</p>
                            </div>
                            <div className="bg-white p-2 rounded">
                              <p className="text-xs text-gray-500">Visiteurs</p>
                              <p className="font-semibold">38</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1.5" />
                            <p className="text-gray-700">Temps moyen de passage: 2.5 min</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1.5" />
                            <p className="text-gray-700">Zone la plus fréquentée: Hall A</p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Analyse de Securite */}
                      <Card className="bg-red-50 border-red-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Shield className="w-4 h-4 text-red-600" />
                            Analyse de Sécurité
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                            <p className="text-gray-700">
                              <span className="font-semibold text-orange-600">Alerte:</span> Personne non autorisée détectée à 09:23
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                            <p className="text-gray-700">
                              <span className="font-semibold text-yellow-600">Avertissement:</span> Objet abandonné zone B (09:35)
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5" />
                            <p className="text-gray-700">Toutes les sorties de secours: OK</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Bottom Sections */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Environmental Impact */}
                    <Card className="bg-green-50 border-green-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Activity className="w-4 h-4 text-green-600" />
                          Impact Environnemental
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-3">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-white p-3 rounded text-center">
                            <p className="text-xs text-gray-500 mb-1">Éclairage</p>
                            <p className="text-xl font-bold text-green-600">78%</p>
                            <p className="text-xs text-gray-500">Optimisé</p>
                          </div>
                          <div className="bg-white p-3 rounded text-center">
                            <p className="text-xs text-gray-500 mb-1">HVAC</p>
                            <p className="text-xl font-bold text-yellow-600">65%</p>
                            <p className="text-xs text-gray-500">Normal</p>
                          </div>
                          <div className="bg-white p-3 rounded text-center">
                            <p className="text-xs text-gray-500 mb-1">Occupation</p>
                            <p className="text-xl font-bold text-blue-600">42%</p>
                            <p className="text-xs text-gray-500">Faible</p>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-gray-500">Consommation énergétique</span>
                            <span className="text-xs font-semibold">-12% vs hier</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Statistics Table */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Statistiques Détaillées
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 font-medium text-gray-600">Catégorie</th>
                                <th className="text-center py-2 font-medium text-gray-600">Valeur</th>
                                <th className="text-center py-2 font-medium text-gray-600">Variation</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="py-2 flex items-center gap-2">
                                  <Users className="w-3 h-3 text-blue-500" />
                                  Flux de personnes
                                </td>
                                <td className="text-center py-2 font-semibold">1,247</td>
                                <td className="text-center py-2">
                                  <Badge className="bg-green-100 text-green-700">+12%</Badge>
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 flex items-center gap-2">
                                  <Camera className="w-3 h-3 text-purple-500" />
                                  Événements détectés
                                </td>
                                <td className="text-center py-2 font-semibold">89</td>
                                <td className="text-center py-2">
                                  <Badge className="bg-yellow-100 text-yellow-700">+5%</Badge>
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 flex items-center gap-2">
                                  <Shield className="w-3 h-3 text-red-500" />
                                  Alertes sécurité
                                </td>
                                <td className="text-center py-2 font-semibold">3</td>
                                <td className="text-center py-2">
                                  <Badge className="bg-red-100 text-red-700">+50%</Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 flex items-center gap-2">
                                  <Zap className="w-3 h-3 text-yellow-500" />
                                  Efficacité énergétique
                                </td>
                                <td className="text-center py-2 font-semibold">82%</td>
                                <td className="text-center py-2">
                                  <Badge className="bg-green-100 text-green-700">+8%</Badge>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4 pt-4 border-t">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Exporter CSV
                          </Button>
                          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                            Générer Rapport
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
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