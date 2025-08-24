import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Area, AreaChart } from 'recharts';

export function ControlPanelSection() {
  // Données pour les cartes métriques du haut
  const metricCards = [
    {
      title: "2,847",
      subtitle: "Détections Actives", 
      badge: "Live",
      icon: "/figmaAssets/i-23.svg",
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      title: "98.7%",
      subtitle: "Temps de Fonctionnement",
      badge: "24h", 
      icon: "/figmaAssets/i-19.svg",
      gradient: "bg-gradient-to-br from-teal-500 to-teal-600"
    },
    {
      title: "23",
      subtitle: "Alertes Critiques",
      badge: "Urgent",
      icon: "/figmaAssets/i-18.svg", 
      gradient: "bg-gradient-to-br from-orange-500 to-orange-600"
    },
    {
      title: "1,456",
      subtitle: "Personnes Reconnues",
      badge: "Today",
      icon: "/figmaAssets/i-16.svg",
      gradient: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      title: "87",
      subtitle: "Score de Sécurité",
      badge: "Score",
      icon: "/figmaAssets/i-21.svg",
      gradient: "bg-gradient-to-br from-green-500 to-green-600"
    }
  ];

  // Données pour le pie chart de distribution des événements
  const distributionData = [
    { name: 'Sécurité', value: 35, color: '#3b82f6' },
    { name: 'Accès', value: 25, color: '#10b981' },
    { name: 'Comportement', value: 20, color: '#f59e0b' },
    { name: 'Véhicules', value: 20, color: '#8b5cf6' }
  ];

  // Données pour l'histogramme des événements mensuels
  const monthlyEventsData = [
    { month: 'Jan', value: 65 },
    { month: 'Fév', value: 78 },
    { month: 'Mar', value: 90 },
    { month: 'Avr', value: 81 },
    { month: 'Mai', value: 56 },
    { month: 'Jun', value: 95 },
    { month: 'Jul', value: 88 },
    { month: 'Août', value: 72 }
  ];

  // Données pour la courbe des événements totaux
  const totalEventsData = [
    { time: '00h', value: 30 },
    { time: '04h', value: 45 },
    { time: '08h', value: 78 },
    { time: '12h', value: 95 },
    { time: '16h', value: 88 },
    { time: '20h', value: 62 },
    { time: '24h', value: 48 }
  ];

  // Événements en direct
  const liveEvents = [
    {
      title: "Intrusion Détectée",
      description: "Personne non autorisée dans la zone sécurisée - Entrée principale",
      time: "Il y a 5 minutes • CAM-01",
      badge: "URGENT",
      badgeColor: "bg-red-500",
      avatar: "/figmaAssets/avatar-1.png",
      bgColor: "bg-red-50",
      borderColor: "border-red-500"
    },
    {
      title: "Étranger Identifié",
      description: "Visage non reconnu dans la base de données - Zone de parking",
      time: "Il y a 14 minutes • CAM-05",
      badge: "ALERTE",
      badgeColor: "bg-orange-500",
      avatar: "/figmaAssets/avatar-2.png",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-500"
    },
    {
      title: "Accès Autorisé",
      description: "Employé ID-2156 - Accès accordé au bâtiment principal",
      time: "Il y a 18 minutes • CAM-03",
      badge: "INFO",
      badgeColor: "bg-green-500",
      avatar: "/figmaAssets/avatar-3.png",
      bgColor: "bg-green-50",
      borderColor: "border-green-500"
    },
    {
      title: "Équipement",
      description: "Travailleur sans casque détecté - Zone de construction",
      time: "Il y a 24 minutes • CAM-09",
      badge: "URGENT",
      badgeColor: "bg-purple-500",
      avatar: "/figmaAssets/avatar-4.png",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-500"
    }
  ];

  // Données reconnaissance faciale
  const faceRecognitionData = [
    { name: "Marie Dubois", role: "Manager", time: "08:45", status: "success", image: "/figmaAssets/face-1.jpg" },
    { name: "Jean Martin", role: "Employé", time: "08:48", status: "success", image: "/figmaAssets/face-2.jpg" },
    { name: "Inconnu #1247", role: "Étranger", time: "09:02", status: "warning", image: "/figmaAssets/face-3.jpg" }
  ];

  // Données caméras
  const cameraData = [
    { id: "CAM-01", location: "Entrée principale", status: "online", events: 23 },
    { id: "CAM-02", location: "Parking", status: "online", events: 18 },
    { id: "CAM-03", location: "Zone sécurisée", status: "maintenance", events: 12 }
  ];

  // Données sites
  const sitesData = [
    { name: "Site Principal", status: "Ouvert", events: 45, visitors: 1847 },
    { name: "Site Industriel", status: "Fermé", events: 32, visitors: 923 },
    { name: "Entrepôt Sud", status: "Ouvert", events: 28, visitors: 456 }
  ];

  return (
    <div className="w-full min-h-screen relative bg-gray-50">
      {/* Header */}
      <header className="w-full h-20 bg-white shadow-sm border-b">
        <div className="flex items-center justify-between h-full px-8">
          <div className="flex items-center gap-6">
            <img className="w-6 h-6" alt="Menu" src="/figmaAssets/button-4.svg" style={{background: 'none'}} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">Tableau de bord de sécurité</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-64 h-10 pl-10 pr-4 border rounded-lg bg-gray-50"
              />
              <img className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" alt="Search" src="/figmaAssets/i-17.svg" style={{background: 'none'}} />
            </div>
            <Button variant="ghost" size="icon">
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500">2</Badge>
              <img className="w-5 h-5" alt="Notifications" src="/figmaAssets/button-3.svg" style={{background: 'none'}} />
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className="w-9 h-9">
                <AvatarImage src="/figmaAssets/avatar-admin.jpg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Admin admin</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <img className="w-3 h-3" alt="Dropdown" src="/figmaAssets/button-6.svg" style={{background: 'none'}} />
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Cartes métriques du haut */}
        <div className="grid grid-cols-5 gap-4">
          {metricCards.map((card, index) => (
            <Card key={index} className={`${card.gradient} text-white border-0 shadow-lg`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <img className="w-7 h-7" alt="Icon" src={card.icon} style={{background: 'none'}} />
                  <Badge className="bg-white/20 text-white text-xs">{card.badge}</Badge>
                </div>
                <h3 className="text-3xl font-bold mb-1">{card.title}</h3>
                <p className="text-sm opacity-90">{card.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Panneau de contrôle principal */}
          <div className="col-span-8">
            <Card className="bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 text-white border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <CardTitle className="text-xl">Centre de Contrôle Intelligent</CardTitle>
                    <Badge className="bg-green-500/20 text-green-400 text-xs">IA ACTIVE</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Première ligne - Safety, People Counting, Person */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Safety */}
                  <Card className="bg-white/10 backdrop-blur border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <img className="w-5 h-5" alt="Safety" src="/figmaAssets/div-38.svg" style={{background: 'none'}} />
                          <div>
                            <h4 className="text-sm font-bold">Safety</h4>
                            <p className="text-xs opacity-70">Équipements</p>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-orange-400">189</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs">Vest</span>
                          <span className="text-sm font-bold">23</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs">Harnais</span>
                          <span className="text-sm font-bold">16</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs">Fire</span>
                          <span className="text-sm font-bold">34</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* People Counting */}
                  <Card className="bg-white/10 backdrop-blur border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <img className="w-5 h-5" alt="People" src="/figmaAssets/div.svg" style={{background: 'none'}} />
                        <div>
                          <h4 className="text-sm font-bold">People Counting</h4>
                          <p className="text-xs opacity-70">Flux de personnes</p>
                        </div>
                      </div>
                      <div className="flex justify-center gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">342</div>
                          <p className="text-xs opacity-70">Entrées</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-400">298</div>
                          <p className="text-xs opacity-70">Sorties</p>
                        </div>
                      </div>
                      <Separator className="my-3 bg-white/20" />
                      <div className="text-center">
                        <span className="text-xl font-bold">44</span>
                        <p className="text-xs opacity-70">Personnes présentes</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Person Recognition */}
                  <Card className="bg-white/10 backdrop-blur border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <img className="w-5 h-5" alt="Person" src="/figmaAssets/div-16.svg" style={{background: 'none'}} />
                        <div>
                          <h4 className="text-sm font-bold">Person</h4>
                          <p className="text-xs opacity-70">Reconnaissance</p>
                        </div>
                      </div>
                      <div className="flex justify-center mb-3">
                        <div className="relative w-24 h-24">
                          <svg className="w-24 h-24 transform -rotate-90">
                            <circle cx="48" cy="48" r="36" stroke="white" strokeWidth="8" fill="none" opacity="0.2" />
                            <circle cx="48" cy="48" r="36" stroke="#10b981" strokeWidth="8" fill="none" 
                              strokeDasharray={`${2 * Math.PI * 36 * 0.7} ${2 * Math.PI * 36 * 0.3}`} />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <span className="text-xl font-bold">70%</span>
                              <p className="text-xs opacity-70">Reconnus</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-green-400">Reconnu</span>
                          <span className="text-sm font-bold">1,245</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-orange-400">Étranger</span>
                          <span className="text-sm font-bold">534</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Deuxième ligne - Zone Monitoring et Behavior */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Zone Monitoring */}
                  <Card className="bg-white/10 backdrop-blur border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <img className="w-5 h-5" alt="Zone" src="/figmaAssets/i-20.svg" style={{background: 'none'}} />
                          <div>
                            <h4 className="text-sm font-bold">Zone Monitoring</h4>
                            <p className="text-xs opacity-70">Surveillance de zones</p>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-cyan-400">89</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs">Intrusion</span>
                            <span className="text-sm font-bold">23</span>
                          </div>
                          <p className="text-xs text-green-400">+15% aujourd'hui</p>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs">Line Crossing</span>
                          <span className="text-sm font-bold">67</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Behavior Analysis */}
                  <Card className="bg-white/10 backdrop-blur border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <img className="w-5 h-5" alt="Behavior" src="/figmaAssets/div-8.svg" style={{background: 'none'}} />
                          <div>
                            <h4 className="text-sm font-bold">Behavior</h4>
                            <p className="text-xs opacity-70">Analyse comportementale</p>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-cyan-400">89</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <div className="text-lg font-bold">12</div>
                          <p className="text-xs opacity-70">Bagarre</p>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">28</div>
                          <p className="text-xs opacity-70">Smoke</p>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">7</div>
                          <p className="text-xs opacity-70">Fall</p>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">19</div>
                          <p className="text-xs opacity-70">Running</p>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">15</div>
                          <p className="text-xs opacity-70">Gathering</p>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">8</div>
                          <p className="text-xs opacity-70">Gun</p>
                        </div>
                      </div>
                      <Separator className="my-2 bg-white/20" />
                      <p className="text-xs text-center text-orange-400">Critique</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Véhicules */}
                <Card className="bg-white/10 backdrop-blur border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <img className="w-4 h-4" alt="Vehicles" src="/figmaAssets/i-9.svg" style={{background: 'none'}} />
                        <h4 className="text-sm font-bold">Véhicules</h4>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 text-xs">ACTIF</Badge>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      <div className="text-center">
                        <div className="text-xl font-bold">234</div>
                        <p className="text-xs opacity-70">Voitures</p>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">67</div>
                        <p className="text-xs opacity-70">Camions</p>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">89</div>
                        <p className="text-xs opacity-70">Motos</p>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">23</div>
                        <p className="text-xs opacity-70">Vélos</p>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">15</div>
                        <p className="text-xs opacity-70">Bus</p>
                      </div>
                    </div>
                    <Separator className="my-3 bg-white/20" />
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold">1,847</div>
                        <p className="text-xs opacity-70">Plaques Détectées</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">47 <span className="text-xs">km/h</span></div>
                        <p className="text-xs opacity-70">Vitesse Moyenne</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">34</div>
                        <p className="text-xs opacity-70">Violations</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

          {/* Panneau des événements en direct */}
          <div className="col-span-4">
            <Card className="bg-white border-0 shadow-lg h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">Événements en Direct</CardTitle>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <Badge className="bg-transparent text-red-500 text-xs px-0">LIVE</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">•••</Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {liveEvents.map((event, index) => (
                      <Card key={index} className={`${event.bgColor} ${event.borderColor} border-l-4`}>
                        <CardContent className="p-3">
                          <div className="flex gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={event.avatar} />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-sm">{event.title}</h4>
                                <Badge className={`${event.badgeColor} text-white text-xs`}>
                                  {event.badge}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">{event.description}</p>
                              <span className="text-xs text-gray-500">{event.time}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
                <Separator className="my-3" />
                <Button variant="link" className="text-blue-500 text-sm">
                  Voir tous les événements →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section des graphiques */}
        <div className="grid grid-cols-3 gap-6">
          {/* Distribution des Événements - Pie Chart */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Distribution des Événements</CardTitle>
                <Tabs defaultValue="today" className="w-auto">
                  <TabsList className="h-8">
                    <TabsTrigger value="today" className="text-xs">Jour</TabsTrigger>
                    <TabsTrigger value="week" className="text-xs">Semaine</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {distributionData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{backgroundColor: item.color}} />
                    <span className="text-xs">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Événements Mensuels - Bar Chart */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Événements Mensuels</CardTitle>
                <Button variant="ghost" size="sm">2024 ▼</Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyEventsData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="month" tick={{fontSize: 11}} />
                  <YAxis tick={{fontSize: 11}} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center mt-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded" />
                  <span className="text-xs">Événements</span>
                </div>
                <span className="text-sm font-bold">Total: 589</span>
              </div>
            </CardContent>
          </Card>

          {/* Répartition des Priorités - Area Chart */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Répartition des Priorités</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={totalEventsData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="time" tick={{fontSize: 11}} />
                  <YAxis tick={{fontSize: 11}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Haute</p>
                  <p className="text-lg font-bold text-red-500">23</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Moyenne</p>
                  <p className="text-lg font-bold text-orange-500">67</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Basse</p>
                  <p className="text-lg font-bold text-green-500">189</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section du bas */}
        <div className="grid grid-cols-3 gap-6">
          {/* Reconnaissance Faciale */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Reconnaissance Faciale</CardTitle>
                <Badge className="bg-green-100 text-green-700 text-xs">LIVE</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {faceRecognitionData.map((person, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={person.image} />
                        <AvatarFallback>{person.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{person.name}</p>
                        <p className="text-xs text-gray-500">{person.role} • {person.time}</p>
                      </div>
                    </div>
                    <Badge className={person.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'} variant="outline">
                      {person.status === 'success' ? '✓' : '!'}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="link" className="text-blue-500 text-sm mt-3">
                Voir tout →
              </Button>
            </CardContent>
          </Card>

          {/* Liste des Caméras */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Liste des Caméras</CardTitle>
                <span className="text-sm text-gray-500">18 actives</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cameraData.map((camera, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${camera.status === 'online' ? 'bg-green-500' : 'bg-orange-500'}`} />
                      <div>
                        <p className="text-sm font-medium">{camera.id}</p>
                        <p className="text-xs text-gray-500">{camera.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{camera.events}</p>
                      <p className="text-xs text-gray-500">événements</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="text-blue-500 text-sm mt-3">
                Voir toutes →
              </Button>
            </CardContent>
          </Card>

          {/* Liste des Sites */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Liste des Sites</CardTitle>
                <span className="text-sm text-gray-500">4 sites actifs</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sitesData.map((site, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                    <div>
                      <p className="text-sm font-medium">{site.name}</p>
                      <p className="text-xs text-gray-500">
                        <span className={site.status === 'Ouvert' ? 'text-green-600' : 'text-red-600'}>
                          {site.status}
                        </span> • {site.visitors} visiteurs
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{site.events}</p>
                      <p className="text-xs text-gray-500">alertes</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="text-blue-500 text-sm mt-3">
                Voir tout →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}