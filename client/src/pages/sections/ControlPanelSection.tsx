import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Menu, Search, Bell, ChevronDown, TrendingUp, Settings, Shield, Users, 
  ArrowDown, ArrowUp, User, AlertTriangle, Eye, Car, Hash, Gauge, 
  AlertCircle, MoreVertical, MoreHorizontal, ChevronRight, HardHat, Clock,
  Shirt, Zap, Flame, Wind, Droplet, Activity, Monitor, Target,
  Truck, Bike, Bus, FileText, Wrench, Swords, Cloud, TrendingDown,
  Move, ShieldAlert, UserX, Cigarette, Footprints
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { DomainConfigDialog } from "@/components/DomainConfigDialog";
import { DOMAINS, type DomainType, type DomainConfig } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export const ControlPanelSection = (): JSX.Element => {
  const [selectedPeriod, setSelectedPeriod] = useState("jour");
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch current domain configuration
  const { data: domainConfig, isLoading: configLoading } = useQuery({
    queryKey: ['/api/domain-config'],
    queryFn: async () => {
      const response = await fetch('/api/domain-config');
      if (!response.ok) throw new Error('Failed to fetch domain config');
      return response.json();
    }
  });

  // Save domain configuration mutation
  const saveDomainConfigMutation = useMutation({
    mutationFn: async ({ domain, sections }: { domain: DomainType, sections: string[] }) => {
      const response = await fetch('/api/domain-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain, sections })
      });
      if (!response.ok) throw new Error('Failed to save domain config');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/domain-config'] });
    }
  });

  // Handle domain configuration change
  const handleDomainChange = (domain: DomainType, sections: string[]) => {
    saveDomainConfigMutation.mutate({ domain, sections });
  };

  // Get current domain and sections
  const currentDomain = (domainConfig?.domain as DomainType) || 'industrial_safety';
  const currentSections = domainConfig?.sections || [];
  const domainInfo = DOMAINS[currentDomain];

  // Legacy config state (keeping for backward compatibility)
  const [config, setConfig] = useState({
    safety: true,
    peopleCountingnp: true,
    personRecognition: true,
    zoneMonitoring: true,
    behaviorAnalysis: true,
    vehicles: true,
    recentActivity: true
  });

  const handleConfigChange = (section: string, checked: boolean) => {
    setConfig(prev => ({...prev, [section]: checked}));
  };

  // Helper function to check if a section should be rendered
  const shouldRenderSection = (sectionId: string) => {
    return currentSections.includes(sectionId);
  };
  // Data for top metric cards
  const metricCards = [
    {
      title: "2,847",
      subtitle: "Détections Actives",
      badge: "Live",
      gradient: "bg-gradient-to-r from-blue-500 to-blue-700",
      icon: <Activity className="w-7 h-8 text-white" />
    },
    {
      title: "98.7%",
      subtitle: "Temps de Fonctionnement",
      badge: "24h",
      gradient: "bg-gradient-to-r from-emerald-500 to-cyan-500",
      icon: <TrendingUp className="w-7 h-8 text-white" />
    },
    {
      title: "23",
      subtitle: "Alertes Critiques",
      badge: "Urgent",
      gradient: "bg-gradient-to-r from-orange-500 to-red-500",
      icon: <AlertTriangle className="w-7 h-8 text-white" />
    },
    {
      title: "1,456",
      subtitle: "Personnes Reconnues",
      badge: "Today",
      gradient: "bg-gradient-to-r from-violet-500 to-blue-500",
      icon: <Users className="w-7 h-8 text-white" />
    },
    {
      title: "87",
      subtitle: "Score de Sécurité",
      badge: "Score",
      gradient: "bg-gradient-to-r from-emerald-500 to-green-600",
      icon: <Shield className="w-7 h-8 text-white" />,
      hasChart: true
    }
  ];

  // Data for safety equipment
  const safetyEquipment = [
    { name: "Casque", count: 89, progress: 47, icon: <HardHat className="w-4 h-5 text-white" /> },
    { name: "Vest", count: 23, progress: 12, icon: <Shirt className="w-4 h-5 text-white" /> },
    { name: "Harnais", count: 15, progress: 8, icon: <Zap className="w-4 h-5 text-white" /> },
    { name: "Fire", count: 34, progress: 18, icon: <Flame className="w-4 h-5 text-white" />, color: "bg-red-500" },
    { name: "Smoke", count: 19, progress: 10, icon: <Wind className="w-4 h-5 text-white" />, color: "bg-gray-400" },
    { name: "Leak", count: 9, progress: 5, icon: <Droplet className="w-4 h-5 text-white" />, color: "bg-cyan-500" }
  ];

  // Data for zone monitoring
  const zoneMonitoring = [
    { name: "Intrusion", count: 23, icon: <AlertTriangle className="w-6 h-6 text-white" />, progress: 75, color: "#ff7a00" },
    { name: "Line Crossing", count: 67, icon: <Target className="w-6 h-6 text-white" />, progress: 85, color: "#06b6d4" },
    { name: "Escalade de mur", count: 12, icon: <TrendingUp className="w-6 h-6 text-white" />, progress: 45, color: "#ef4444" },
    { name: "Errance", count: 8, icon: <Move className="w-6 h-6 text-white" />, progress: 30, color: "#10b981" }
  ];

  // Data for behavior analysis
  const behaviorAnalysis = [
    { name: "Bagarre", count: 12, icon: <Swords className="w-8 h-8 text-white" /> },
    { name: "Smoke", count: 28, icon: <Cigarette className="w-8 h-8 text-white" /> },
    { name: "Fall", count: 7, icon: <UserX className="w-8 h-8 text-white" /> },
    { name: "Running", count: 19, icon: <Footprints className="w-8 h-8 text-white" /> },
    { name: "Gathering", count: 15, icon: <Users className="w-8 h-8 text-white" /> },
    { name: "Gun", count: 8, icon: <AlertTriangle className="w-8 h-8 text-white" /> }
  ];

  // Données pour les graphiques d'analyse
  const eventDistributionData = [
    { name: "Intrusion", value: 34, color: "#ef4444" },
    { name: "Mouvement", value: 67, color: "#f97316" },
    { name: "Reconnaissance", value: 89, color: "#22c55e" },
    { name: "Zone Interdite", value: 23, color: "#8b5cf6" },
    { name: "Alerte", value: 45, color: "#06b6d4" },
  ];

  const monthlyEventsData = [
    { month: "Jan", events: 234 },
    { month: "Fév", events: 289 },
    { month: "Mar", events: 356 },
    { month: "Avr", events: 298 },
    { month: "Mai", events: 423 },
    { month: "Jun", events: 389 },
    { month: "Jul", events: 467 },
    { month: "Aoû", events: 512 },
    { month: "Sep", events: 434 },
    { month: "Oct", events: 398 },
    { month: "Nov", events: 356 },
    { month: "Déc", events: 289 },
  ];

  const dailyTrendData = [
    { day: "1", events: 45 },
    { day: "5", events: 67 },
    { day: "10", events: 89 },
    { day: "15", events: 123 },
    { day: "20", events: 156 },
    { day: "25", events: 134 },
    { day: "30", events: 98 },
  ];


  // Data for vehicles
  const vehicleTypes = [
    { name: "Voitures", count: 234, icon: <Car className="w-6 h-6 text-white" /> },
    { name: "Camions", count: 67, icon: <Truck className="w-6 h-6 text-white" /> },
    { name: "Motos", count: 89, icon: <Bike className="w-6 h-6 text-white" /> },
    { name: "Trucks", count: 23, icon: <Truck className="w-6 h-6 text-white" /> },
    { name: "Bus", count: 12, icon: <Bus className="w-6 h-6 text-white" /> }
  ];

  // Data for live events
  const liveEvents = [
    {
      type: "urgent",
      title: "Intrusion Détectée",
      description: "Personne non autorisée dans la zone sécurisée - Entrée principale",
      time: "Il y a 2 minutes • CAM-01",
      badge: "URGENT",
      bgColor: "bg-red-50/50",
      borderColor: "border-l-red-500",
      badgeColor: "bg-red-500",
      avatar: "/figmaAssets/img-1.png",
      statusColor: "bg-red-500"
    },
    {
      type: "alert",
      title: "Étranger Identifié",
      description: "Visage non reconnu dans la base de données - Zone de parking",
      time: "Il y a 5 minutes • CAM-02",
      badge: "ALERTE",
      bgColor: "bg-orange-50/50",
      borderColor: "border-l-orange-500",
      badgeColor: "bg-orange-500",
      avatar: "/figmaAssets/img-2.png",
      statusColor: "bg-orange-500"
    },
    {
      type: "success",
      title: "Accès Autorisé",
      description: "Employé reconnu - Accès accordé au bâtiment principal",
      time: "Il y a 8 minutes • CAM-03",
      badge: "VALIDÉ",
      bgColor: "bg-emerald-50/50",
      borderColor: "border-l-emerald-500",
      badgeColor: "bg-emerald-500",
      avatar: "/figmaAssets/div-22.svg",
      statusColor: "bg-emerald-500"
    },
    {
      type: "security",
      title: "Équipement Manquant",
      description: "Travailleur sans casque détecté - Zone de construction",
      time: "Il y a 12 minutes • CAM-05",
      badge: "SÉCURITÉ",
      bgColor: "bg-violet-50/50",
      borderColor: "border-l-violet-500",
      badgeColor: "bg-violet-500",
      avatar: "/figmaAssets/div-19.svg",
      statusColor: "bg-violet-500"
    }
  ];

  // Data for facial recognition
  const facialRecognitionData = [
    {
      name: "Marie Dubois",
      role: "Employée • Accès autorisé",
      time: "08:45",
      camera: "CAM-01",
      avatar: "/figmaAssets/img-3.png",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      statusColor: "bg-emerald-500"
    },
    {
      name: "Jean Martin",
      role: "Manager • Accès autorisé",
      time: "08:42",
      camera: "CAM-03",
      avatar: "/figmaAssets/img-4.png",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      statusColor: "bg-blue-500"
    },
    {
      name: "Inconnu #1247",
      role: "Étranger • Accès refusé",
      time: "08:38",
      camera: "CAM-02",
      avatar: "/figmaAssets/div-15.svg",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      statusColor: "bg-orange-500"
    },
    {
      name: "Sophie Laurent",
      role: "Technicienne • Accès autorisé",
      time: "08:35",
      camera: "CAM-05",
      avatar: "/figmaAssets/img-5.png",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      statusColor: "bg-emerald-500"
    }
  ];

  // Data for cameras
  const cameraData = [
    {
      name: "CAM-01",
      location: "Entrée principale",
      events: 23,
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      eventColor: "text-red-500"
    },
    {
      name: "CAM-02",
      location: "Parking",
      events: 18,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      eventColor: "text-orange-500"
    },
    {
      name: "CAM-03",
      location: "Couloir principal",
      events: 12,
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
      eventColor: "text-emerald-500"
    },
    {
      name: "CAM-04",
      location: "Zone de stockage",
      events: 9,
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      eventColor: "text-blue-500"
    },
    {
      name: "CAM-05",
      location: "Zone de construction",
      events: 15,
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      eventColor: "text-violet-500"
    },
    {
      name: "CAM-06",
      location: "Sortie de secours",
      events: 6,
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      eventColor: "text-cyan-500"
    }
  ];

  // Data for sites
  const siteData = [
    {
      name: "Site Principal",
      location: "Bâtiment A - Centre-ville",
      events: 45,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      eventColor: "text-red-500",
      icon: "/figmaAssets/div-32.svg"
    },
    {
      name: "Site Industriel",
      location: "Zone Nord - Usine",
      events: 32,
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      eventColor: "text-orange-500",
      icon: "/figmaAssets/div-28.svg"
    },
    {
      name: "Entrepôt Sud",
      location: "Zone logistique",
      events: 28,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      eventColor: "text-blue-500",
      icon: "/figmaAssets/div-37.svg"
    },
    {
      name: "Bureau Est",
      location: "Siège administratif",
      events: 19,
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      eventColor: "text-emerald-500",
      icon: "/figmaAssets/div-9.svg"
    },
    {
      name: "Parking Central",
      location: "Zone de stationnement",
      events: 15,
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
      eventColor: "text-violet-500",
      icon: "/figmaAssets/div-27.svg"
    },
    {
      name: "Poste de Garde",
      location: "Contrôle d'accès",
      events: 12,
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      eventColor: "text-cyan-500",
      icon: "/figmaAssets/div-24.svg"
    }
  ];

  return (
    <div className="w-full min-h-screen relative">
{/* Header */}
      <header className="w-full h-20 bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
<div className="flex items-center justify-between h-full px-8">
<div className="flex items-center gap-6">
<Menu className="w-[18px] h-7 text-gray-700" />
<div>
<h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text [font-family:'Inter',Helvetica]">
Dashboard
              </h1>
<p className="text-sm text-slate-500 [font-family:'Inter',Helvetica]">
Tableau de bord de sécurité
              </p>
</div>
</div>
<div className="flex items-center gap-4">
<div className="flex items-center gap-3">
<div className="relative">
<Input
                  placeholder="Rechercher..."
                  className="w-[268px] h-[38px] bg-white/50 border-white/30 rounded-xl pl-10 text-sm text-gray-600 placeholder:text-gray-400"
                />
<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
</div>
<Button variant="ghost" size="sm" className="h-auto p-2">
<div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center relative">
                  <Bell className="w-6 h-6 text-gray-700" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
</Button>
</div>
<div className="flex items-center gap-3 bg-white/50 rounded-xl p-2">
<Avatar className="w-10 h-10">
<AvatarImage src="/figmaAssets/img.png" />
<AvatarFallback>AA</AvatarFallback>
</Avatar>
<div>
<p className="text-sm font-semibold text-gray-900 [font-family:'Inter',Helvetica]">
admin admin
                </p>
<p className="text-xs text-slate-500 [font-family:'Inter',Helvetica]">
Administrateur
                </p>
</div>
<Button variant="ghost" size="sm" className="h-auto p-1">
<ChevronDown className="w-3 h-6 text-gray-700" />
</Button>
</div>
</div>
</div>
</header>
<div className="p-8 space-y-8">
{/* Top Metric Cards */}
        <div className="grid grid-cols-5 gap-6">
{metricCards.map((card, index) => (
            <Card key={index} className={`${card.gradient} text-white border-0 shadow-lg overflow-hidden`}>
<CardContent className="p-6">
<div className="flex items-center justify-between mb-4">
{card.icon}
<Badge className="bg-white/20 text-white text-xs px-2 py-1">
{card.badge}
                  </Badge>
</div>
<div className="space-y-2">
<h3 className="text-3xl font-bold [font-family:'Inter',Helvetica]">
{card.title}
                  </h3>
<p className="text-sm opacity-90 [font-family:'Inter',Helvetica]">
{card.subtitle}
                  </p>
</div>
{card.hasChart && (
                  <div className="absolute bottom-0 right-0">
<img
                      className="w-[77px] h-[77px]"
                      alt="Chart"
                      src="/figmaAssets/div-35.svg"
                      style={{background: 'none'}}
                    />
</div>
)}
              </CardContent>
</Card>
))}
        </div>
<div className="grid grid-cols-12 gap-8">
{/* Main Control Panel */}
          <div className="col-span-8">
<Card className="bg-gradient-to-r from-gray-900/95 to-blue-700/95 text-white border-0 shadow-xl">
<CardHeader className="pb-6">
<div className="flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-3 h-3 bg-emerald-500 rounded-full opacity-95" />
<CardTitle className="text-xl font-bold [font-family:'Inter',Helvetica]">
Centre de Contrôle Intelligent
                    </CardTitle>
                    {!configLoading && domainInfo && (
                      <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                        {domainInfo.icon} {domainInfo.name}
                      </Badge>
                    )}
</div>
<div className="flex items-center gap-3">
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jour">Jour</SelectItem>
                      <SelectItem value="semaine">Semaine</SelectItem>
                      <SelectItem value="mois">Mois</SelectItem>
                      <SelectItem value="annee">Année</SelectItem>
                    </SelectContent>
                  </Select>
                  <DomainConfigDialog
                    currentDomain={currentDomain}
                    currentSections={currentSections}
                    onDomainChange={handleDomainChange}
                  />
                </div>
</div>
</CardHeader>
<CardContent className="space-y-8">

{/* Top Row - Safety, People Counting, Person Recognition */}
                <div className="grid grid-cols-3 gap-6">
{/* Safety Equipment */}
                  {shouldRenderSection('safety_equipment') && (
                  <Card className="bg-white/10 border-0">
<CardContent className="p-5">
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-3">
<Shield className="w-6 h-10 text-white" />
<div>
<h4 className="font-bold text-white [font-family:'Inter',Helvetica]">Safety</h4>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
Équipements de protection
                            </p>
</div>
</div>
<span className="text-2xl font-bold text-orange-500 [font-family:'Inter',Helvetica]">
189
                        </span>
</div>
<ScrollArea className="h-32">
<div className="space-y-4 pr-2">
{safetyEquipment.map((item, index) => (
                          <div key={index} className="space-y-2">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
{item.icon}
<span className="text-sm text-white/80 [font-family:'Inter',Helvetica]">
{item.name}
                                </span>
</div>
<span className="text-base font-semibold text-white [font-family:'Inter',Helvetica]">
{item.count}
                              </span>
</div>
<Progress 
                              value={item.progress} 
                              className="h-1.5 bg-white/20"
                              style={{
                                '--progress-background': item.color || '#ff7a00'
                              } as React.CSSProperties}
                            />
</div>
))}
                      </div>
                      </ScrollArea>
</CardContent>
</Card>
                  )}
{/* People Counting */}
                  {shouldRenderSection('people_counting') && (
                  <Card className="bg-white/10 border-0">
<CardContent className="p-5">
<div className="flex items-center gap-3 mb-6">
<Users className="w-8 h-10 text-white" />
<div>
<h4 className="font-bold text-white [font-family:'Inter',Helvetica]">People Counting</h4>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
Flux de personnes
                          </p>
</div>
</div>
<div className="grid grid-cols-2 gap-4 mb-6">
<div className="text-center">
<div className="w-16 h-16 bg-emerald-500/20 rounded-full border-4 border-emerald-500 flex items-center justify-center mx-auto mb-2">
<div>
<ArrowDown className="w-8 h-5 mx-auto mb-1 text-white" />
<span className="text-lg font-bold text-white [font-family:'Inter',Helvetica]">
342
                              </span>
</div>
</div>
<p className="text-xs text-white/80 [font-family:'Inter',Helvetica]">Entrées</p>
</div>
<div className="text-center">
<div className="w-16 h-16 bg-red-500/20 rounded-full border-4 border-red-500 flex items-center justify-center mx-auto mb-2">
<div>
<ArrowUp className="w-8 h-5 mx-auto mb-1 text-white" />
<span className="text-lg font-bold text-white [font-family:'Inter',Helvetica]">
298
                              </span>
</div>
</div>
<p className="text-xs text-white/80 [font-family:'Inter',Helvetica]">Sorties</p>
</div>
</div>
<Separator className="bg-white/20 mb-4" />
<div className="text-center">
<span className="text-2xl font-bold text-white [font-family:'Inter',Helvetica]">44</span>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
Personnes présentes
                        </p>
</div>
</CardContent>
</Card>
                  )}
{/* Person Recognition */}
                  {shouldRenderSection('person_recognition') && (
                  <Card className="bg-white/10 border-0">
<CardContent className="p-5">
<div className="flex items-center gap-3 mb-6">
<User className="w-8 h-10 text-white" />
<div>
<h4 className="font-bold text-white [font-family:'Inter',Helvetica]">Person</h4>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
Reconnaissance faciale
                          </p>
</div>
</div>
<div className="relative w-32 h-32 mx-auto mb-6">
<div 
                          className="w-full h-full rounded-full bg-cover bg-center flex items-center justify-center"
                          style={{ backgroundImage: 'url(/figmaAssets/svg.svg)' }}
                        >
<div className="text-center">
<span className="text-xl font-bold text-white [font-family:'Inter',Helvetica]">70%</span>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">Reconnus</p>
</div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between">
<span className="text-sm text-emerald-500 [font-family:'Inter',Helvetica]">Reconnu</span>
<span className="text-sm font-semibold text-white [font-family:'Inter',Helvetica]">1,245</span>
</div>
<div className="flex justify-between">
<span className="text-sm text-orange-500 [font-family:'Inter',Helvetica]">Étranger</span>
<span className="text-sm font-semibold text-white [font-family:'Inter',Helvetica]">534</span>
</div>
</div>
</CardContent>
</Card>
                  )}
</div>
{/* Zone Monitoring and Behavior Row */}
                <div className="grid grid-cols-2 gap-6">
{/* Zone Monitoring */}
                  {shouldRenderSection('zone_monitoring') && (
                  <Card className="bg-white/10 border-0">
<CardContent className="p-5">
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-3">
<AlertTriangle className="w-6 h-10 text-white" />
<div>
<h4 className="font-bold text-white [font-family:'Inter',Helvetica]">Zone Monitoring</h4>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
Surveillance de zones
                            </p>
</div>
</div>
<span className="text-2xl font-bold text-cyan-500 [font-family:'Inter',Helvetica]">89</span>
</div>
<ScrollArea className="h-48">
<div className="space-y-4 pr-2">
{zoneMonitoring.map((item, index) => (
                          <div key={index} className="space-y-2">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
{item.icon}
<span className="text-sm text-white/80 [font-family:'Inter',Helvetica]">
{item.name}
                                  </span>
</div>
<span className="text-base font-semibold text-white [font-family:'Inter',Helvetica]">
{item.count}
                                </span>
</div>
<Progress 
                              value={item.progress} 
                              className="h-1.5 bg-white/20"
                              style={{
                                '--progress-background': item.color || '#06b6d4'
                              } as React.CSSProperties}
                            />
</div>
))}
                      </div>
                      </ScrollArea>
</CardContent>
</Card>
                  )}
{/* Behavior Analysis */}
                  {shouldRenderSection('behavior_analysis') && (
                  <Card className="bg-white/10 border-0">
<CardContent className="p-5">
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-3">
<Eye className="w-6 h-10 text-white" />
<div>
<h4 className="font-bold text-white [font-family:'Inter',Helvetica]">Behavior</h4>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
Analyse comportementale
                            </p>
</div>
</div>
<span className="text-2xl font-bold text-cyan-500 [font-family:'Inter',Helvetica]">89</span>
</div>
<div className="grid grid-cols-6 gap-4 mb-4">
{behaviorAnalysis.map((item, index) => (
                          <div key={index} className="text-center">
{item.icon}
<span className="text-lg font-bold text-white block [font-family:'Inter',Helvetica]">
{item.count}
                            </span>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
{item.name}
                            </p>
</div>
))}
                      </div>
<Separator className="bg-white/20 mb-4" />
<p className="text-xs text-white/70 text-center [font-family:'Inter',Helvetica]">Critique</p>
</CardContent>
</Card>
                  )}

{/* Smart City Behavior Analysis */}
                  {shouldRenderSection('behavior') && (
                  <Card className="bg-white/10 border-0">
<CardContent className="p-5">
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-3">
<Eye className="w-6 h-7 text-white" />
<h4 className="font-bold text-white text-lg [font-family:'Inter',Helvetica]">Analyse Comportementale</h4>
</div>

</div>
<div className="grid grid-cols-2 gap-4">
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-4 text-center">
<Swords className="w-5 h-6 mx-auto mb-2 text-red-400" />
<span className="text-lg font-bold text-white block [font-family:'Inter',Helvetica]">
2
</span>
<p className="text-sm text-white/80 [font-family:'Inter',Helvetica]">
Bagarre
</p>
</CardContent>
</Card>
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-4 text-center">
<Users className="w-5 h-6 mx-auto mb-2 text-yellow-400" />
<span className="text-lg font-bold text-white block [font-family:'Inter',Helvetica]">
3
</span>
<p className="text-sm text-white/80 [font-family:'Inter',Helvetica]">
Foule
</p>
</CardContent>
</Card>
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-4 text-center">
<Target className="w-5 h-6 mx-auto mb-2 text-orange-400" />
<span className="text-lg font-bold text-white block [font-family:'Inter',Helvetica]">
0
</span>
<p className="text-sm text-white/80 [font-family:'Inter',Helvetica]">
Arme
</p>
</CardContent>
</Card>
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-4 text-center">
<Activity className="w-5 h-6 mx-auto mb-2 text-blue-400" />
<span className="text-lg font-bold text-white block [font-family:'Inter',Helvetica]">
47
</span>
<p className="text-sm text-white/80 [font-family:'Inter',Helvetica]">
Course
</p>
</CardContent>
</Card>
</div>
</CardContent>
</Card>
                  )}
</div>
{/* Vehicles Section */}
                {shouldRenderSection('vehicles') && (
                <Card className="bg-white/10 border-0">
<CardContent className="p-4">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-2">
<Car className="w-3.5 h-5 text-white" />
<h4 className="font-bold text-white text-sm [font-family:'Inter',Helvetica]">Véhicules</h4>
</div>
<Badge className="bg-blue-500/30 text-blue-500 text-xs">ACTIF</Badge>
</div>
<div className="grid grid-cols-5 gap-3 mb-6">
{vehicleTypes.map((vehicle, index) => (
                        <Card key={index} className="bg-white/5 border border-white/10">
<CardContent className="p-3 text-center">
{vehicle.icon}
<span className="text-sm font-bold text-white block [font-family:'Inter',Helvetica]">
{vehicle.count}
                            </span>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
{vehicle.name}
                            </p>
</CardContent>
</Card>
))}
                    </div>
<div className="grid grid-cols-3 gap-4">
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-4 text-center">
<Hash className="w-4 h-5 mx-auto mb-2 text-white" />
<span className="text-lg font-bold text-white block [font-family:'Inter',Helvetica]">
1,847
                          </span>
<p className="text-xs text-white/80 [font-family:'Inter',Helvetica]">
Plaques Détectées
                          </p>
<p className="text-xs font-semibold text-emerald-500 [font-family:'Inter',Helvetica]">
+12% aujourd'hui
                          </p>
</CardContent>
</Card>
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-4 text-center">
<Gauge className="w-3.5 h-5 mx-auto mb-2 text-white" />
<div className="flex items-center justify-center gap-1 mb-2">
                            <span className="text-lg font-bold text-white [font-family:'Inter',Helvetica]">47</span>
<span className="text-xs font-bold text-white [font-family:'Inter',Helvetica]">km/h</span>
</div>
<p className="text-xs text-white/80 [font-family:'Inter',Helvetica]">
Vitesse Moyenne
                          </p>
</CardContent>
</Card>
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-4 text-center">
<AlertCircle className="w-3.5 h-5 mx-auto mb-2 text-white" />
<span className="text-lg font-bold text-white block [font-family:'Inter',Helvetica]">
34
                          </span>
<p className="text-xs text-white/80 [font-family:'Inter',Helvetica]">
Violations
                          </p>
<p className="text-xs font-semibold text-red-500 [font-family:'Inter',Helvetica]">
Vitesse excessive
                          </p>
</CardContent>
</Card>
</div>
</CardContent>
</Card>
                )}

{/* Smart City Personnes Section */}
                {shouldRenderSection('personnes') && (
                <Card className="bg-white/10 border-0">
<CardContent className="p-4">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-2">
<Users className="w-5 h-6 text-white" />
<h4 className="font-bold text-white text-sm [font-family:'Inter',Helvetica]">Personnes</h4>
</div>
<Badge className="bg-green-500/30 text-green-500 text-xs">ACTIF</Badge>
</div>
<div className="grid grid-cols-4 gap-3 mb-6">
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-3 text-center">
<Users className="w-5 h-6 mx-auto mb-2 text-blue-400" />
<span className="text-sm font-bold text-white block [font-family:'Inter',Helvetica]">
2,847
</span>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
Piétons
</p>
</CardContent>
</Card>
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-3 text-center">
<AlertTriangle className="w-5 h-6 mx-auto mb-2 text-red-400" />
<span className="text-sm font-bold text-white block [font-family:'Inter',Helvetica]">
18
</span>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
Violations
</p>
</CardContent>
</Card>
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-3 text-center">
<Activity className="w-5 h-6 mx-auto mb-2 text-yellow-400" />
<span className="text-sm font-bold text-white block [font-family:'Inter',Helvetica]">
85%
</span>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
Crowd Density
</p>
</CardContent>
</Card>
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-3 text-center">
<Eye className="w-5 h-6 mx-auto mb-2 text-orange-400" />
<span className="text-sm font-bold text-white block [font-family:'Inter',Helvetica]">
23
</span>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
Watchlists
</p>
</CardContent>
</Card>
</div>
</CardContent>
</Card>
                )}

{/* Smart City Traffic Section */}
                {shouldRenderSection('traffic') && (
                <Card className="bg-white/10 border-0">
<CardContent className="p-4">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-2">
<Car className="w-5 h-6 text-white" />
<h4 className="font-bold text-white text-sm [font-family:'Inter',Helvetica]">Trafic Urbain</h4>
</div>
<Badge className="bg-yellow-500/30 text-yellow-500 text-xs">SURVEILLANCE</Badge>
</div>
<div className="grid grid-cols-3 gap-3 mb-6">
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-3 text-center">
<div className="w-6 h-6 bg-green-500 rounded-full mx-auto mb-2"></div>
<span className="text-sm font-bold text-white block [font-family:'Inter',Helvetica]">
Fluide
</span>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
Avenue Principal
</p>
</CardContent>
</Card>
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-3 text-center">
<div className="w-6 h-6 bg-yellow-500 rounded-full mx-auto mb-2"></div>
<span className="text-sm font-bold text-white block [font-family:'Inter',Helvetica]">
Dense
</span>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
Centre Ville
</p>
</CardContent>
</Card>
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-3 text-center">
<div className="w-6 h-6 bg-red-500 rounded-full mx-auto mb-2"></div>
<span className="text-sm font-bold text-white block [font-family:'Inter',Helvetica]">
Saturé
</span>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
Rond-Point Nord
</p>
</CardContent>
</Card>
</div>
<div className="grid grid-cols-3 gap-4">
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-4 text-center">
<Gauge className="w-4 h-5 mx-auto mb-2 text-white" />
<span className="text-lg font-bold text-white block [font-family:'Inter',Helvetica]">
42
</span>
<p className="text-xs text-white/80 [font-family:'Inter',Helvetica]">
km/h Moyenne
</p>
</CardContent>
</Card>
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-4 text-center">
<Clock className="w-4 h-5 mx-auto mb-2 text-white" />
<span className="text-lg font-bold text-white block [font-family:'Inter',Helvetica]">
8.5
</span>
<p className="text-xs text-white/80 [font-family:'Inter',Helvetica]">
min Temps Moyen
</p>
</CardContent>
</Card>
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-4 text-center">
<AlertCircle className="w-4 h-5 mx-auto mb-2 text-red-400" />
<span className="text-lg font-bold text-white block [font-family:'Inter',Helvetica]">
3
</span>
<p className="text-xs text-white/80 [font-family:'Inter',Helvetica]">
Embouteillages
</p>
</CardContent>
</Card>
</div>
</CardContent>
</Card>
                )}

{/* Smart City Voitures Section */}
                {shouldRenderSection('voitures') && (
                <Card className="bg-white/10 border-0">
<CardContent className="p-4">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-2">
<Car className="w-5 h-6 text-white" />
<h4 className="font-bold text-white text-sm [font-family:'Inter',Helvetica]">Voitures Urbaines</h4>
</div>
<Badge className="bg-blue-500/30 text-blue-500 text-xs">SURVEILLANCE</Badge>
</div>
<div className="grid grid-cols-4 gap-3 mb-6">
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-3 text-center">
<Car className="w-5 h-6 mx-auto mb-2 text-blue-400" />
<span className="text-sm font-bold text-white block [font-family:'Inter',Helvetica]">
1,847
</span>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
Véhicules
</p>
</CardContent>
</Card>
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-3 text-center">
<Truck className="w-5 h-6 mx-auto mb-2 text-green-400" />
<span className="text-sm font-bold text-white block [font-family:'Inter',Helvetica]">
234
</span>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
Poids Lourds
</p>
</CardContent>
</Card>
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-3 text-center">
<Bus className="w-5 h-6 mx-auto mb-2 text-yellow-400" />
<span className="text-sm font-bold text-white block [font-family:'Inter',Helvetica]">
45
</span>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
Bus
</p>
</CardContent>
</Card>
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-3 text-center">
<Bike className="w-5 h-6 mx-auto mb-2 text-orange-400" />
<span className="text-sm font-bold text-white block [font-family:'Inter',Helvetica]">
156
</span>
<p className="text-xs text-white/70 [font-family:'Inter',Helvetica]">
Motos
</p>
</CardContent>
</Card>
</div>
<div className="grid grid-cols-3 gap-4">
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-4 text-center">
<Hash className="w-4 h-5 mx-auto mb-2 text-white" />
<span className="text-lg font-bold text-white block [font-family:'Inter',Helvetica]">
2,282
</span>
<p className="text-xs text-white/80 [font-family:'Inter',Helvetica]">
Plaques Détectées
</p>
<p className="text-xs font-semibold text-emerald-500 [font-family:'Inter',Helvetica]">
+8% aujourd'hui
</p>
</CardContent>
</Card>
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-4 text-center">
<Gauge className="w-4 h-5 mx-auto mb-2 text-white" />
<span className="text-lg font-bold text-white block [font-family:'Inter',Helvetica]">
52
</span>
<p className="text-xs text-white/80 [font-family:'Inter',Helvetica]">
km/h Moyenne
</p>
</CardContent>
</Card>
<Card className="bg-white/5 border border-white/10">
<CardContent className="p-4 text-center">
<AlertCircle className="w-4 h-5 mx-auto mb-2 text-red-400" />
<span className="text-lg font-bold text-white block [font-family:'Inter',Helvetica]">
18
</span>
<p className="text-xs text-white/80 [font-family:'Inter',Helvetica]">
Infractions
</p>
</CardContent>
</Card>
</div>
</CardContent>
</Card>
                )}



</CardContent>
</Card>
</div>
{/* Live Events Panel */}
          <div className="col-span-4">
<Card className="bg-white border-0 shadow-sm h-full">
<CardHeader className="pb-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-4">
<CardTitle className="text-lg font-bold text-gray-900 [font-family:'Inter',Helvetica]">
Évènements en Direct
                    </CardTitle>
<div className="flex items-center gap-2">
<div className="w-2 h-2 bg-red-500 rounded-full opacity-98" />
<Badge className="bg-transparent text-red-500 text-xs font-semibold px-0">
LIVE
                      </Badge>
</div>
</div>
<Button variant="ghost" size="sm" className="h-auto p-1">
<img
                      className="w-3.5 h-6"
                      alt="More"
                      src="/figmaAssets/button-1.svg"
                    />
</Button>
</div>
</CardHeader>
<CardContent className="pb-4">
<ScrollArea className="h-[552px]">
<div className="space-y-4">
{liveEvents.map((event, index) => (
                      <Card key={index} className={`${event.bgColor} ${event.borderColor} border-l-4 border-y-0 border-r-0`}>
<CardContent className="p-3">
<div className="flex gap-3">
<div className="relative">
<div className="w-8 h-14 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${event.avatar})` }} />
<div className={`absolute -top-1 -right-1 w-4 h-4 ${event.statusColor} rounded-full`}>
<div className="w-2 h-2 bg-white rounded-full opacity-88 absolute top-1 left-1" />
</div>
</div>
<div className="flex-1 space-y-2">
<div className="flex items-center justify-between">
<h4 className="font-semibold text-gray-900 [font-family:'Inter',Helvetica]">
{event.title}
                                </h4>
<Badge className={`${event.badgeColor} text-white text-xs`}>
{event.badge}
                                </Badge>
</div>
<p className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">
{event.description}
                              </p>
<div className="flex items-center justify-between">
<span className="text-xs text-slate-500 [font-family:'Inter',Helvetica]">
{event.time}
                                </span>
<img
                                  className="w-[38px] h-5"
                                  alt="Actions"
                                  src="/figmaAssets/div-33.svg"
                                />
</div>
</div>
</div>
</CardContent>
</Card>
))}
                  </div>
</ScrollArea>
<Separator className="my-4" />
<div className="flex items-center justify-between">
<Button variant="link" className="text-blue-500 font-semibold text-sm p-0 h-auto">
Voir tous les évènements
                    <img
                      className="w-3 h-4 ml-1"
                      alt="Arrow"
                      src="/figmaAssets/i-3.svg"
                    />
</Button>
<div className="flex items-center gap-2">
<div className="w-2 h-2 bg-emerald-500 rounded-full" />
<span className="text-xs text-black [font-family:'Inter',Helvetica]">
Mise à jour automatique
                    </span>
</div>
</div>
</CardContent>
</Card>
</div>
</div>
{/* Graphiques d'analyse - au-dessus des listes */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Distribution des Événements - Pie Chart */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold text-slate-800">
                Distribution des Événements
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-blue-600 bg-blue-50">
                  Today
                </Button>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-slate-500">
                  Week
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={eventDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {eventDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value}`, name]}
                      labelStyle={{ color: '#1f2937' }}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Légende personnalisée */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {eventDistributionData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-xs text-slate-600 truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Événements Mensuels - Histogram */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold text-slate-800">
                Événements Mensuels
              </CardTitle>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>2024</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyEventsData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#64748b' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#64748b' }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}`, 'Événements']}
                      labelStyle={{ color: '#1f2937' }}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Bar 
                      dataKey="events" 
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      fillOpacity={0.8}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Tendance Quotidienne - Line Chart */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold text-slate-800">
                Tendance Quotidienne
              </CardTitle>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-slate-500">
                  7
                </Button>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-blue-600 bg-blue-50">
                  30
                </Button>
                <span className="text-xs text-slate-500 self-center ml-1">jours</span>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyTrendData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#64748b' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#64748b' }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}`, 'Événements']}
                      labelFormatter={(label) => `Jour ${label}`}
                      labelStyle={{ color: '#1f2937' }}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="events" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

{/* Bottom Lists Section */}
        <div className="grid grid-cols-3 gap-8">
{/* Personnes */}
          <Card className="bg-white border-0 shadow-sm">
<CardHeader>
<div className="flex items-center justify-between">
<CardTitle className="text-lg font-bold text-gray-900 [font-family:'Inter',Helvetica]">
Personnes
                </CardTitle>
<div className="flex items-center gap-2">
<Badge className="bg-emerald-500/10 text-emerald-500 text-xs">
1,456 reconnus
                  </Badge>
<Button variant="ghost" size="sm" className="h-auto p-1">
<img
                      className="w-4 h-6"
                      alt="More"
                      src="/figmaAssets/button.svg"
                    />
</Button>
</div>
</div>
</CardHeader>
<CardContent>
<Tabs defaultValue="reconnaissance" className="w-full">
<TabsList className="grid w-full grid-cols-2 mb-4">
<TabsTrigger value="capture" className="text-sm">Capture</TabsTrigger>
<TabsTrigger value="reconnaissance" className="text-sm">Reconnaissance</TabsTrigger>
</TabsList>
<TabsContent value="capture" className="mt-0">
<ScrollArea className="h-64">
<div className="space-y-3">
<div className="text-center text-gray-500 py-8">
<img
                            className="w-12 h-12 mx-auto mb-3 opacity-50"
                            alt="Camera"
                            src="/figmaAssets/div-6.svg"
                          />
<p className="text-sm [font-family:'Inter',Helvetica]">Mode capture activé</p>
<p className="text-xs text-gray-400 [font-family:'Inter',Helvetica]">
En attente de nouvelles détections
                          </p>
</div>
<div className="grid grid-cols-2 gap-3">
<Card className="bg-blue-50 border border-blue-200">
<CardContent className="p-3 text-center">
<div className="text-lg font-bold text-blue-600 [font-family:'Inter',Helvetica]">45</div>
<p className="text-xs text-gray-600 [font-family:'Inter',Helvetica]">Captures aujourd'hui</p>
</CardContent>
</Card>
<Card className="bg-green-50 border border-green-200">
<CardContent className="p-3 text-center">
<div className="text-lg font-bold text-green-600 [font-family:'Inter',Helvetica]">89%</div>
<p className="text-xs text-gray-600 [font-family:'Inter',Helvetica]">Qualité moyenne</p>
</CardContent>
</Card>
</div>
</div>
</ScrollArea>
</TabsContent>
<TabsContent value="reconnaissance" className="mt-0">
<ScrollArea className="h-64">
<div className="space-y-3">
{facialRecognitionData.map((person, index) => (
                        <Card key={index} className={`${person.bgColor} border ${person.borderColor}`}>
<CardContent className="p-3">
<div className="flex items-center gap-3">
<Avatar className="w-10 h-10">
<AvatarImage src={person.avatar} />
<AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
</Avatar>
<div className="flex-1">
<h4 className="font-semibold text-gray-900 text-sm [font-family:'Inter',Helvetica]">
{person.name}
                                </h4>
<p className="text-xs text-slate-500 [font-family:'Inter',Helvetica]">
{person.role}
                                </p>
</div>
<div className="text-right">
<div className="text-xs font-semibold text-right [font-family:'Inter',Helvetica]">
{person.time}
                                </div>
<div className="flex items-center gap-1 justify-end mt-1">
<div className={`w-2 h-2 ${person.statusColor} rounded-full`} />
<span className="text-xs text-slate-500 [font-family:'Inter',Helvetica]">
{person.camera}
                                  </span>
</div>
</div>
</div>
</CardContent>
</Card>
))}
                    </div>
</ScrollArea>
</TabsContent>
</Tabs>
<Separator className="my-4" />
<div className="flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="flex items-center gap-2">
<div className="w-2 h-2 bg-emerald-500 rounded-full" />
<span className="text-xs text-slate-500 [font-family:'Inter',Helvetica]">
Autorisé (89%)
                    </span>
</div>
<div className="flex items-center gap-2">
<div className="w-2 h-2 bg-orange-500 rounded-full" />
<span className="text-xs text-slate-500 [font-family:'Inter',Helvetica]">
Inconnu (11%)
                    </span>
</div>
</div>
<Button variant="link" className="text-blue-500 font-semibold text-sm p-0 h-auto">
Voir tout
                  <img
                    className="w-3 h-4 ml-1"
                    alt="Arrow"
                    src="/figmaAssets/i-3.svg"
                  />
</Button>
</div>
</CardContent>
</Card>
{/* Camera List */}
          <Card className="bg-white border-0 shadow-sm">
<CardHeader>
<div className="flex items-center justify-between">
<CardTitle className="text-lg font-bold text-gray-900 [font-family:'Inter',Helvetica]">
Liste des Caméras
                </CardTitle>
<div className="flex items-center gap-2">
<Badge className="bg-emerald-500/10 text-emerald-500 text-xs">
147 Actives
                  </Badge>
<Button variant="ghost" size="sm" className="h-auto p-1">
<img
                      className="w-4 h-6"
                      alt="More"
                      src="/figmaAssets/button.svg"
                    />
</Button>
</div>
</div>
</CardHeader>
<CardContent>
<ScrollArea className="h-64">
<div className="space-y-3">
{cameraData.map((camera, index) => (
                    <Card key={index} className={`${camera.bgColor} border ${camera.borderColor}`}>
<CardContent className="p-3">
<div className="flex items-center gap-3">
<img
                            className="w-8 h-8"
                            alt="Camera"
                            src="/figmaAssets/div-6.svg"
                          />
<div className="flex-1">
<h4 className="font-semibold text-gray-900 text-sm [font-family:'Inter',Helvetica]">
{camera.name}
                            </h4>
<p className="text-xs text-slate-500 [font-family:'Inter',Helvetica]">
{camera.location}
                            </p>
</div>
<div className="text-right">
<div className={`text-lg font-bold ${camera.eventColor} [font-family:'Inter',Helvetica]`}>
{camera.events}
                            </div>
<p className="text-xs text-slate-500 [font-family:'Inter',Helvetica]">
événements
                            </p>
</div>
</div>
</CardContent>
</Card>
))}
                </div>
</ScrollArea>
<Separator className="my-4" />
<div className="flex items-center justify-between">
<div className="text-xs text-slate-500 [font-family:'Inter',Helvetica]">
<span>Total: </span>
<span className="font-semibold text-gray-900">83 événements</span>
<span> aujourd'hui</span>
</div>
<Button variant="link" className="text-blue-500 font-semibold text-sm p-0 h-auto">
Voir toutes
                  <img
                    className="w-3 h-4 ml-1"
                    alt="Arrow"
                    src="/figmaAssets/i-3.svg"
                  />
</Button>
</div>
</CardContent>
</Card>
{/* Site List */}
          <Card className="bg-white border-0 shadow-sm">
<CardHeader>
<div className="flex items-center justify-between">
<CardTitle className="text-lg font-bold text-gray-900 [font-family:'Inter',Helvetica]">
Liste des Sites
                </CardTitle>
<div className="flex items-center gap-2">
<Badge className="bg-blue-500/10 text-blue-500 text-xs">
8 Sites actifs
                  </Badge>
<Button variant="ghost" size="sm" className="h-auto p-1">
<img
                      className="w-4 h-6"
                      alt="More"
                      src="/figmaAssets/button-5.svg"
                    />
</Button>
</div>
</div>
</CardHeader>
<CardContent>
<ScrollArea className="h-64">
<div className="space-y-3">
{siteData.map((site, index) => (
                    <Card key={index} className={`${site.bgColor} border ${site.borderColor}`}>
<CardContent className="p-3">
<div className="flex items-center gap-3">
<img
                            className="w-8 h-8"
                            alt="Site"
                            src={site.icon}
                          />
<div className="flex-1">
<h4 className="font-semibold text-gray-900 text-sm [font-family:'Inter',Helvetica]">
{site.name}
                            </h4>
<p className="text-xs text-slate-500 [font-family:'Inter',Helvetica]">
{site.location}
                            </p>
</div>
<div className="text-right">
<div className={`text-lg font-bold ${site.eventColor} [font-family:'Inter',Helvetica]`}>
{site.events}
                            </div>
<p className="text-xs text-slate-500 [font-family:'Inter',Helvetica]">
événements
                            </p>
</div>
</div>
</CardContent>
</Card>
))}
                </div>
</ScrollArea>
<Separator className="my-4" />
<div className="flex items-center justify-between">
<div className="text-xs text-slate-500 [font-family:'Inter',Helvetica]">
<div>
<span>Total: </span>
<span className="font-semibold text-gray-900">162 événements</span>
<span> sur tous les</span>
</div>
<div>sites</div>
</div>
<Button variant="link" className="text-blue-500 font-semibold text-sm p-0 h-auto">
Voir tous
                  <img
                    className="w-3 h-4 ml-1"
                    alt="Arrow"
                    src="/figmaAssets/i-3.svg"
                  />
</Button>
</div>
</CardContent>
</Card>
</div>
</div>
</div>
);
};