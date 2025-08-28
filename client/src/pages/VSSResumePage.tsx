import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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
  Share2,
  Settings,
  BarChart3,
  Menu,
  ChevronRight,
  Bell,
  User,
  Home,
  Maximize,
  SkipBack,
  SkipForward,
  Volume2,
  Copy,
  RefreshCw,
  Filter,
  ExternalLink,
  Archive,
  X
} from 'lucide-react';

export default function VSSResumePage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('last4hours');
  const [detailLevel, setDetailLevel] = useState('brief');
  const [autoMode, setAutoMode] = useState(true);
  const [focusAreas, setFocusAreas] = useState({
    security: true,
    people: true,
    vehicle: false,
    behavioral: false
  });

  const recentSummaries = [
    {
      time: "Today 12:00 - 16:00",
      status: "Completed",
      description: "Peak activity period with 127 detections. 2 alerts resolved, normal security posture maintained.",
      detections: 127,
      color: "green"
    },
    {
      time: "Today 08:00 - 12:00", 
      status: "Archived",
      description: "Morning shift summary, with increased delivery activity. 89 people tracked, 12 vehicles processed.",
      detections: 89,
      color: "blue"
    },
    {
      time: "Yesterday 16:00 - 20:00",
      status: "Archived", 
      description: "Evening activity summary. Lower than usual activity, 3 security alerts (all resolved).",
      detections: 3,
      color: "blue"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="w-full overflow-auto">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">Video Summarize</h1>
              <p className="text-sm text-gray-500">AI-powered video analysis and summaries</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Light
              </Button>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search videos..." 
                  className="text-sm border-none focus:outline-none w-48"
                />
              </div>
              <Bell className="w-5 h-5 text-gray-400" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">Security Admin</p>
                  <p className="text-gray-500 text-xs">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-2">
          {/* Video Analysis Section */}
          <div className="grid grid-cols-12 gap-6">
            {/* Main Video Player */}
            <div className="col-span-8">
              <Card className="bg-blue-900 text-white overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Video Analysis</span>
                      <Badge className="bg-red-600 text-white text-xs">LIVE</Badge>
                    </div>
                    <Select defaultValue="camera1">
                      <SelectTrigger className="w-40 bg-blue-800 border-blue-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="camera1">Live Camera</SelectItem>
                        <SelectItem value="camera2">Camera 02</SelectItem>
                        <SelectItem value="camera3">Camera 03</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Video Display */}
                  <div className="relative aspect-video bg-black">
                    <img 
                      src="/api/placeholder/800/450" 
                      alt="Live camera feed"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Video Overlays */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/60 text-white text-xs">
                        CAM-01 • Main Entrance
                      </Badge>
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-black/60 text-white text-xs">
                        14:32:45
                      </Badge>
                    </div>

                    {/* Detection Overlays */}
                    <div className="absolute top-16 left-4 space-y-2">
                      <Badge className="bg-green-600/80 text-white text-xs">
                        Person Detected
                        <br />
                        Confidence: 87%
                      </Badge>
                      <Badge className="bg-yellow-600/80 text-white text-xs">
                        Activity: Walking
                        <br />
                        Direction: East-West
                      </Badge>
                    </div>

                    {/* Play Controls Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-white/20 backdrop-blur hover:bg-white/30 rounded-full p-2">
                          <Play className="w-4 h-4 text-white" />
                        </Button>
                        <Button size="sm" className="bg-white/20 backdrop-blur hover:bg-white/30 rounded-full p-2">
                          <Pause className="w-4 h-4 text-white" />
                        </Button>
                        <Button size="sm" className="bg-white/20 backdrop-blur hover:bg-white/30 rounded-full p-2">
                          <Maximize className="w-4 h-4 text-white" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Controls */}
                  <div className="p-4 bg-blue-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 p-2">
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 p-2">
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 p-2">
                          <SkipForward className="w-4 h-4" />
                        </Button>
                        <span className="text-sm text-blue-200">14:32 / 22:00</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 p-2">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 p-2">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 p-2">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Progress value={65} className="h-2 bg-blue-700" />
                    
                    {/* Camera Thumbnails */}
                    <div className="grid grid-cols-4 gap-2">
                      {['CAM-01', 'CAM-02', 'CAM-03', 'CAM-04'].map((cam, index) => (
                        <div key={cam} className="relative aspect-video bg-blue-700 rounded cursor-pointer hover:bg-blue-600 transition-colors overflow-hidden">
                          <img 
                            src="/api/placeholder/120/68" 
                            alt={cam}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-1 left-1">
                            <Badge className="bg-black/60 text-white text-xs text-[10px] px-1">
                              {cam}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side Panels */}
            <div className="col-span-4 space-y-4">
              {/* Prompt Generation */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2 text-blue-800">
                    <Sparkles className="w-4 h-4" />
                    Prompt de Résumé
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-2">
                  <p className="text-gray-700">
                    Décrivez précisément comment l'IA doit analyser et résumer la vidéo. 
                    Générez un résumé détaillé des activités suspectes, comptez les 
                    personnes, identifiez les véhicules avec horodatage précis, analysez les...
                  </p>
                  <div className="bg-white p-2 rounded border">
                    <div className="flex items-center gap-2 mb-2">
                      <Checkbox id="modeles" defaultChecked />
                      <Label htmlFor="modeles" className="text-xs">Modèles</Label>
                    </div>
                    <p className="text-gray-600 text-xs">Prompt personnalisé pour résumé</p>
                  </div>
                </CardContent>
              </Card>

              {/* Objects to Track */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2 text-green-800">
                    <Target className="w-4 h-4" />
                    Objets à Suivre
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-gray-700">Ex: personne en veste rouge, véhicule bleu</p>
                  
                  <div className="space-y-2">
                    <div className="text-xs text-gray-600">Objets actuellement suivis:</div>
                    <div className="flex flex-wrap gap-1">
                      <Badge className="bg-blue-100 text-blue-700 text-xs">
                        Personnes
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                      <Badge className="bg-red-100 text-red-700 text-xs">
                        Véhicules
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                      <Badge className="bg-orange-100 text-orange-700 text-xs">
                        Bagages
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-gray-600">1. Sélection rapide:</div>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs cursor-pointer">
                        Personne
                      </Badge>
                      <Badge variant="outline" className="text-xs cursor-pointer">
                        Véhicule
                      </Badge>
                      <Badge variant="outline" className="text-xs cursor-pointer">
                        Objet
                      </Badge>
                      <Badge variant="outline" className="text-xs cursor-pointer">
                        Baggage
                      </Badge>
                      <Badge variant="outline" className="text-xs cursor-pointer">
                        Suspect
                      </Badge>
                      <Badge variant="outline" className="text-xs cursor-pointer">
                        Mouvement
                      </Badge>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 text-xs h-7">
                    <Target className="w-3 h-3 mr-1" />
                    Ajouter Objet Personnalisé
                  </Button>
                </CardContent>
              </Card>

              {/* Generate Resume */}
              <Card className="bg-blue-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Générer le Résumé
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="text-xs">Type de résumé:</div>
                    <RadioGroup defaultValue="brief" className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="brief" id="brief" className="text-white" />
                        <Label htmlFor="brief" className="text-xs">Résumé Bref</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="detailed" id="detailed" className="text-white" />
                        <Label htmlFor="detailed" className="text-xs">Analyse Détaillée</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="timeline" id="timeline" className="text-white" />
                        <Label htmlFor="timeline" className="text-xs">Timeline Highlights</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                    <Brain className="w-4 h-4 mr-2" />
                    Générer Résumé IA
                  </Button>

                  <div className="text-xs space-y-1 pt-2 border-t border-blue-500">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                      <span>Résumé intelligent avec horodatage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                      <span>Export PDF et texte disponible</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                      <span>Génération en ~30 secondes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* AI Generated Summary - Positioned in center */}
          <Card className="mt-6">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Brain className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">AI Generated Summary</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        Generated • 2 min ago
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Brief</Button>
                  <Button variant="ghost" size="sm">Detailed</Button>
                  <Button variant="ghost" size="sm">Timeline</Button>
                  <Button className="bg-red-600 hover:bg-red-700 text-white" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Period Analysis */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Période d'analyse: 14:00 - 16:00 (Aujourd'hui)</h3>
                </div>
                
                <div className="grid grid-cols-4 gap-6 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">127</div>
                    <div className="text-sm text-gray-600">Personnes détectées</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">23</div>
                    <div className="text-sm text-gray-600">Véhicules identifiés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">5</div>
                    <div className="text-sm text-gray-600">Alertes générées</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">98%</div>
                    <div className="text-sm text-gray-600">Précision IA</div>
                  </div>
                </div>

                <div className="bg-blue-100 p-3 rounded border-l-4 border-blue-600">
                  <p className="text-sm text-blue-900">
                    <strong>Résumé Exécutif:</strong> Durant la période analysée de 14:00 à 16:00, le système VSS a traité et analysé 2 heures de flux vidéo en continu provenant de 6 caméras de sécurité. L'activité globale était élevée avec un pic d'affluence observé entre 14:30 et 15:15.
                  </p>
                </div>
              </div>

              {/* Person Analysis */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Analyse des Personnes</h3>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>• <strong>127 personnes uniques</strong> détectées et suivies à travers le système</p>
                    <p>• <strong>89% d'employés reconnus</strong> via reconnaissance faciale (112 personnes)</p>
                    <p>• <strong>15 visiteurs non-identifiés</strong> escortés selon les procédures standard</p>
                    <p>• <strong>Pic d'activité:</strong> 34 personnes simultanément présentes à 14:47</p>
                    <p>• <strong>Zones les plus fréquentées:</strong> Entrée principale (67%), Hall d'accueil (45%), Cafétéria (23%)</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-gray-900">Suivi Véhiculaire</h3>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>• <strong>23 véhicules</strong> identifiés dans le périmètre de sécurité</p>
                    <p>• <strong>18 véhicules autorisés</strong> avec plaques d'immatriculation reconnues</p>
                    <p>• <strong>5 véhicules visiteurs</strong> dirigés vers la zone d'accueil</p>
                    <p>• <strong>3 livraisons programmées:</strong> FedEx (14:15), DHL (15:20), Transporteur local (15:45)</p>
                    <p>• <strong>Temps de stationnement moyen:</strong> 45 minutes pour les visiteurs</p>
                  </div>
                </div>
              </div>

              {/* Security Incidents */}
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-orange-900">Incidents de Sécurité</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-red-100 p-3 rounded border-l-4 border-red-500">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-red-600 text-white text-xs">CRITIQUE</Badge>
                      <span className="font-semibold text-red-900">14:32 - Tentative d'accès non autorisé</span>
                    </div>
                    <p className="text-sm text-red-800">détectée à l'entrée arrière. Résolu en 2m15s par l'équipe de sécurité.</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-yellow-600 text-white text-xs">MOYEN</Badge>
                      <span className="font-semibold text-yellow-900">15:08 - Porte de secours</span>
                    </div>
                    <p className="text-sm text-yellow-800">ouverte pendant 45s pour maintenance programmée.</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-yellow-600 text-white text-xs">FAIBLE</Badge>
                      <span className="font-semibold text-yellow-900">14:55 - Objet abandonné</span>
                    </div>
                    <p className="text-sm text-yellow-800">(sac à dos) dans le hall, récupéré par son propriétaire après 3 minutes.</p>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Insights Comportementaux IA</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• <strong>Patterns de mouvement normaux</strong> observés pour 97% des détections</p>
                  <p>• <strong>Aucun comportement suspect</strong> ou loitering prolongé détecté</p>
                  <p>• <strong>Conformité aux masques:</strong> 78% de port du masque observé</p>
                  <p>• <strong>Distanciation sociale:</strong> Respectée dans 85% des interactions</p>
                  <p>• <strong>Zones de congestion:</strong> Prédites avec 94% de précision pour optimisation future</p>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-cyan-600" />
                  <h3 className="font-semibold text-cyan-900">Recommandations</h3>
                </div>
                <div className="space-y-2 text-sm text-cyan-800">
                  <p>• Renforcer la surveillance de l'entrée arrière pendant les heures de pointe</p>
                  <p>• Optimiser les flux de circulation dans le hall d'accueil (congestion détectée)</p>
                  <p>• Programmer une maintenance préventive pour CAM-03 (qualité d'image dégradée)</p>
                  <p>• Mettre à jour la base de données de reconnaissance faciale (15 nouveaux employés détectés)</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Brain className="w-4 h-4 text-blue-600" />
                  <span>Généré par VSS AI Engine v2.1 • Temps de traitement: 28 secondes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copier
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Régénérer
                  </Button>
                </div>
              </div>
                </CardContent>
          </Card>

          {/* Bottom Statistics Dashboard */}
          <div className="grid grid-cols-12 gap-6">
            {/* Detection Statistics */}
            <div className="col-span-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Detection Statistics</CardTitle>
                    <Badge className="bg-green-100 text-green-700 text-xs">LIVE</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { icon: Users, label: 'People', value: '1,247', color: 'blue' },
                    { icon: Activity, label: 'Vehicles', value: '234', color: 'green' },
                    { icon: AlertCircle, label: 'Alerts', value: '23', color: 'orange' },
                    { icon: Target, label: 'Objects', value: '89', color: 'purple' },
                    { icon: Eye, label: 'Recognized Faces', value: '456', color: 'cyan' }
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                          <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
                        </div>
                        <span className="text-sm font-medium">{stat.label}</span>
                      </div>
                      <span className="text-lg font-bold">{stat.value}</span>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <div className="text-center mb-2">
                      <span className="text-sm text-gray-600">AI Accuracy Rate</span>
                    </div>
                    <div className="relative w-20 h-20 mx-auto">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle cx="40" cy="40" r="32" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                        <circle 
                          cx="40" cy="40" r="32" 
                          stroke="#10b981" 
                          strokeWidth="6" 
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 32 * 0.97} ${2 * Math.PI * 32}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-green-600">97%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Camera Performance */}
            <div className="col-span-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Camera Performance</CardTitle>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: 'CAM-01', location: 'Main Entrance', status: 'Online', quality: '1080p • 30fps' },
                    { name: 'CAM-02', location: 'Parking Lot', status: 'Online', quality: '4K • 30fps' },
                    { name: 'CAM-03', location: 'Hallway', status: 'Degraded', quality: '720p • 20fps' },
                    { name: 'CAM-04', location: 'Exit Door', status: 'Online', quality: '1080p • 30fps' },
                    { name: 'CAM-05', location: 'Loading Dock', status: 'Online', quality: '4K • 30fps' }
                  ].map((camera) => (
                    <div key={camera.name} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          camera.status === 'Online' ? 'bg-green-500' : 
                          camera.status === 'Degraded' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <div className="font-medium text-sm">{camera.name}</div>
                          <div className="text-xs text-gray-500">{camera.location}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs font-medium ${
                          camera.status === 'Online' ? 'text-green-700' : 
                          camera.status === 'Degraded' ? 'text-yellow-700' : 'text-red-700'
                        }`}>
                          {camera.status}
                        </div>
                        <div className="text-xs text-gray-500">{camera.quality}</div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">System Health</span>
                      <span className="font-semibold text-green-600">98.7%</span>
                    </div>
                    <Progress value={98.7} className="h-2 mt-1" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Insights */}
            <div className="col-span-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">AI Insights</CardTitle>
                    <Badge className="bg-purple-100 text-purple-700 text-xs">ANALYZING</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Pattern Recognition</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">
                      Peak activity detected between 2-4 PM daily. 
                      23% increase in foot traffic compared to last week.
                    </p>
                    <div className="text-xs text-gray-500">Confidence: 94%</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Behavioral Analysis</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">
                      Normal behavior patterns observed. No unusual loitering or suspicious activities detected.
                    </p>
                    <div className="text-xs text-gray-500">Safety Score: 98%</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium">Security Assessment</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">
                      2 minor security incidents resolved. Overall security posture remains strong.
                    </p>
                    <div className="text-xs text-gray-500">Threat Level: Low</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">Predictive Analytics</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">
                      Expect 30% activity increase around 5 PM. 
                      Recommend additional monitoring.
                    </p>
                    <div className="text-xs text-gray-500">Accuracy: 87%</div>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm h-8">
                    <Brain className="w-4 h-4 mr-2" />
                    View Full AI Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Advanced Summary Controls */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Advanced Summary Controls</CardTitle>
                <div className="flex items-center gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    Auto Mode
                  </Button>
                  <Button variant="outline" size="sm">Manual</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-6">
                {/* Time Range */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Time Range</Label>
                  <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last1hour">Last 1 Hour</SelectItem>
                      <SelectItem value="last4hours">Last 4 Hours</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Detail Level */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Detail Level</Label>
                  <RadioGroup value={detailLevel} onValueChange={setDetailLevel}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="brief" id="brief-control" />
                      <Label htmlFor="brief-control" className="text-sm">Brief Summary</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="detailed" id="detailed-control" />
                      <Label htmlFor="detailed-control" className="text-sm">Detailed Analysis</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="timeline" id="timeline-control" />
                      <Label htmlFor="timeline-control" className="text-sm">Timeline Highlights</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full" id="full-control" />
                      <Label htmlFor="full-control" className="text-sm">Full Report</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Focus Areas */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Focus Areas</Label>
                  <div className="space-y-2">
                    {Object.entries(focusAreas).map(([key, checked]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox 
                          id={key}
                          checked={checked}
                          onCheckedChange={(checked) => 
                            setFocusAreas(prev => ({ ...prev, [key]: checked as boolean }))
                          }
                        />
                        <Label htmlFor={key} className="text-sm capitalize">
                          {key === 'vehicle' ? 'Vehicle Activity' : 
                           key === 'behavioral' ? 'Behavioral Analysis' :
                           key === 'security' ? 'Security Events' :
                           'People Tracking'}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Export Options */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Export Options</Label>
                  <div className="space-y-2">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      PDF Report
                    </Button>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="sm">
                      <Archive className="w-4 h-4 mr-2" />
                      Excel Export
                    </Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Summary
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Summary History */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Summary History</CardTitle>
                <Button variant="outline" size="sm">
                  View All History
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {recentSummaries.map((summary, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">{summary.time}</div>
                      <Badge className={`text-xs ${
                        summary.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {summary.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{summary.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{summary.detections} detections</span>
                      </div>
                      <Button variant="outline" size="sm" className="h-6 text-xs">
                        View
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}