import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { EventDetailModal } from "@/components/EventDetailModal";
import { 
  Search, 
  Filter, 
  Calendar, 
  BarChart3, 
  Shield, 
  Users, 
  Car, 
  Eye, 
  MapPin,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Activity,
  Zap,
  UserCheck,
  UserX,
  Camera,
  Bell,
  TrendingUp
} from "lucide-react";

// Import personnel images
import businessmanPhoto from "@assets/generated_images/Security_capture_businessman_photo_2feb92d4.png";
import womanPhoto from "@assets/generated_images/Security_capture_woman_photo_e17e3828.png";
import casualManPhoto from "@assets/generated_images/Security_capture_casual_man_eb27432b.png";
import elderlyWomanPhoto from "@assets/generated_images/Security_capture_elderly_woman_37bac27b.png";
import youngManPhoto from "@assets/generated_images/Security_capture_young_man_e6e7c093.png";

export const EventCenterPage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCamera, setSelectedCamera] = useState("all");
  const [selectedZone, setSelectedZone] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Comprehensive event data from all modules
  const allEvents = [
    // Safety Events
    {
      id: 1,
      module: "Safety",
      type: "EPI manquant - Casque",
      title: "Casque de sécurité requis",
      description: "Travailleur détecté sans casque de protection",
      severity: "Warning",
      severityColor: "bg-yellow-500",
      status: "Active",
      statusColor: "bg-red-500",
      location: "Zone de production A",
      zone: "Production",
      camera: "Caméra 03",
      timestamp: "29 Sep 2025, 14:32",
      confidence: 94,
      thumbnail: youngManPhoto,
      icon: Shield,
      priority: "High"
    },
    {
      id: 2,
      module: "Safety", 
      type: "Fumée détectée",
      title: "Détection de fumée",
      description: "Fumée détectée dans la zone de stockage",
      severity: "Critical",
      severityColor: "bg-red-600",
      status: "Investigating",
      statusColor: "bg-yellow-500",
      location: "Zone de stockage B",
      zone: "Stockage",
      camera: "Caméra 05",
      timestamp: "29 Sep 2025, 14:15",
      confidence: 98,
      thumbnail: womanPhoto,
      icon: Shield,
      priority: "Critical"
    },
    // Behavior Events
    {
      id: 3,
      module: "Behavior",
      type: "Bagarre détectée",
      title: "Altercation physique",
      description: "Bagarre détectée entre deux personnes",
      severity: "Critical",
      severityColor: "bg-red-600",
      status: "Resolved",
      statusColor: "bg-green-500",
      location: "Entrée principale",
      zone: "Entrée",
      camera: "Caméra 01",
      timestamp: "29 Sep 2025, 13:48",
      confidence: 92,
      thumbnail: casualManPhoto,
      icon: Eye,
      priority: "Critical"
    },
    {
      id: 4,
      module: "Behavior",
      type: "Rassemblement anormal",
      title: "Groupement suspect",
      description: "Rassemblement de plus de 5 personnes détecté",
      severity: "Warning", 
      severityColor: "bg-yellow-500",
      status: "Monitoring",
      statusColor: "bg-blue-500",
      location: "Cour extérieure",
      zone: "Extérieur",
      camera: "Caméra 07",
      timestamp: "29 Sep 2025, 13:30",
      confidence: 87,
      thumbnail: elderlyWomanPhoto,
      icon: Eye,
      priority: "Medium"
    },
    // Personnel Events
    {
      id: 5,
      module: "Personnel",
      type: "Accès non autorisé",
      title: "Tentative d'accès refusée",
      description: "Personne non autorisée tentant d'accéder",
      severity: "Warning",
      severityColor: "bg-yellow-500",
      status: "Active",
      statusColor: "bg-red-500",
      location: "Zone restreinte",
      zone: "Sécurisée",
      camera: "Caméra 04",
      timestamp: "29 Sep 2025, 13:15",
      confidence: 96,
      thumbnail: youngManPhoto,
      icon: UserX,
      priority: "High"
    },
    {
      id: 6,
      module: "Personnel",
      type: "Reconnaissance faciale",
      title: "Employé vérifié",
      description: "Marc Dubois identifié avec succès",
      severity: "Info",
      severityColor: "bg-blue-500",
      status: "Completed",
      statusColor: "bg-green-500",
      location: "Entrée principale",
      zone: "Entrée",
      camera: "Caméra 01",
      timestamp: "29 Sep 2025, 13:00",
      confidence: 98,
      thumbnail: businessmanPhoto,
      icon: UserCheck,
      priority: "Low"
    },
    // Vehicle Events
    {
      id: 7,
      module: "Vehicle",
      type: "Véhicule non autorisé",
      title: "Plaque d'immatriculation inconnue",
      description: "Véhicule avec plaque non reconnue détecté",
      severity: "Warning",
      severityColor: "bg-yellow-500",
      status: "Investigating",
      statusColor: "bg-yellow-500",
      location: "Parking visiteurs",
      zone: "Parking",
      camera: "Caméra 09",
      timestamp: "29 Sep 2025, 12:45",
      confidence: 91,
      thumbnail: casualManPhoto,
      icon: Car,
      priority: "Medium"
    },
    {
      id: 8,
      module: "Vehicle", 
      type: "Survitesse détectée",
      title: "Excès de vitesse",
      description: "Véhicule roulant à 45 km/h dans zone 30",
      severity: "Warning",
      severityColor: "bg-yellow-500",
      status: "Active",
      statusColor: "bg-red-500",
      location: "Allée principale",
      zone: "Circulation",
      camera: "Caméra 08",
      timestamp: "29 Sep 2025, 12:30",
      confidence: 94,
      thumbnail: womanPhoto,
      icon: Car,
      priority: "Medium"
    },
    // Zone Monitoring Events
    {
      id: 9,
      module: "Zone",
      type: "Intrusion périmètre",
      title: "Franchissement de périmètre",
      description: "Intrusion détectée dans zone interdite",
      severity: "Critical",
      severityColor: "bg-red-600",
      status: "Active",
      statusColor: "bg-red-500",
      location: "Périmètre nord",
      zone: "Périmètre",
      camera: "Caméra 10",
      timestamp: "29 Sep 2025, 12:15",
      confidence: 97,
      thumbnail: elderlyWomanPhoto,
      icon: MapPin,
      priority: "Critical"
    },
    {
      id: 10,
      module: "Zone",
      type: "Objet abandonné",
      title: "Colis suspect détecté",
      description: "Objet non identifié abandonné depuis 30 min",
      severity: "Warning",
      severityColor: "bg-yellow-500",
      status: "Investigating",
      statusColor: "bg-yellow-500",
      location: "Hall d'accueil",
      zone: "Accueil",
      camera: "Caméra 02",
      timestamp: "29 Sep 2025, 12:00",
      confidence: 88,
      thumbnail: youngManPhoto,
      icon: MapPin,
      priority: "High"
    }
  ];

  // Module statistics
  const moduleStats = {
    Safety: {
      total: allEvents.filter(e => e.module === "Safety").length,
      critical: allEvents.filter(e => e.module === "Safety" && e.severity === "Critical").length,
      warning: allEvents.filter(e => e.module === "Safety" && e.severity === "Warning").length,
      active: allEvents.filter(e => e.module === "Safety" && e.status === "Active").length,
      icon: Shield,
      color: "#dc2626"
    },
    Behavior: {
      total: allEvents.filter(e => e.module === "Behavior").length,
      critical: allEvents.filter(e => e.module === "Behavior" && e.severity === "Critical").length,
      warning: allEvents.filter(e => e.module === "Behavior" && e.severity === "Warning").length,
      active: allEvents.filter(e => e.module === "Behavior" && e.status === "Active").length,
      icon: Eye,
      color: "#7c3aed"
    },
    Personnel: {
      total: allEvents.filter(e => e.module === "Personnel").length,
      critical: allEvents.filter(e => e.module === "Personnel" && e.severity === "Critical").length,
      warning: allEvents.filter(e => e.module === "Personnel" && e.severity === "Warning").length,
      active: allEvents.filter(e => e.module === "Personnel" && e.status === "Active").length,
      icon: Users,
      color: "#3fb5b5"
    },
    Vehicle: {
      total: allEvents.filter(e => e.module === "Vehicle").length,
      critical: allEvents.filter(e => e.module === "Vehicle" && e.severity === "Critical").length,
      warning: allEvents.filter(e => e.module === "Vehicle" && e.severity === "Warning").length,
      active: allEvents.filter(e => e.module === "Vehicle" && e.status === "Active").length,
      icon: Car,
      color: "#059669"
    },
    Zone: {
      total: allEvents.filter(e => e.module === "Zone").length,
      critical: allEvents.filter(e => e.module === "Zone" && e.severity === "Critical").length,
      warning: allEvents.filter(e => e.module === "Zone" && e.severity === "Warning").length,
      active: allEvents.filter(e => e.module === "Zone" && e.status === "Active").length,
      icon: MapPin,
      color: "#ea580c"
    }
  };

  // Filtered events based on search and filters
  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      // Search query filter
      const matchesSearch = searchQuery === "" || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Module filter
      const matchesModule = selectedModule === "all" || event.module === selectedModule;

      // Severity filter
      const matchesSeverity = selectedSeverity === "all" || event.severity === selectedSeverity;

      // Status filter
      const matchesStatus = selectedStatus === "all" || event.status === selectedStatus;

      // Camera filter
      const matchesCamera = selectedCamera === "all" || event.camera === selectedCamera;

      // Zone filter
      const matchesZone = selectedZone === "all" || event.zone === selectedZone;

      return matchesSearch && matchesModule && matchesSeverity && matchesStatus && matchesCamera && matchesZone;
    });
  }, [allEvents, searchQuery, selectedModule, selectedSeverity, selectedStatus, selectedCamera, selectedZone]);

  // Handle natural language search
  const handleNaturalSearch = () => {
    console.log("Natural language search:", searchQuery);
    // Here you would integrate with an AI service to parse natural language
  };

  // Handle event click
  const handleEventClick = (event: any) => {
    setSelectedEvent({
      ...event,
      eventType: event.type,
      cameraAngle: "Vue frontale",
      recordingAvailable: true,
      aiAnalysis: `Analyse IA : Événement ${event.module} détecté avec ${event.confidence}% de confiance. ${event.description}`,
      relatedEvents: [],
      evidence: [
        {
          type: "Image",
          description: "Capture de l'événement",
          timestamp: event.timestamp,
          url: event.thumbnail
        }
      ]
    });
    setIsModalOpen(true);
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-full">
      {/* Page Header with Statistics */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-[#FF9800] rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Event Center</h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Centre de gestion des événements tous modules
          </span>
        </div>

        {/* Module Statistics Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {Object.entries(moduleStats).map(([module, stats]) => {
            const IconComponent = stats.icon;
            return (
              <Card key={module} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: stats.color }}
                      >
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {module}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {stats.total}
                    </div>
                    <div className="flex gap-3 text-xs">
                      <span className="text-red-600 dark:text-red-400">
                        {stats.critical} critiques
                      </span>
                      <span className="text-yellow-600 dark:text-yellow-400">
                        {stats.warning} alertes
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {stats.active} actifs
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Natural Language Search Section */}
      <Card className="mb-6 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#FF9800] rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Recherche Intelligente Tous Modules
            </h3>
          </div>
          
          <div className="relative">
            <Textarea
              placeholder={`Recherchez des événements en langage naturel...
Exemples:
• "Tous les événements critiques d'aujourd'hui"
• "Problèmes de sécurité dans la zone de production"
• "Événements Personnel avec statut actif"
• "Intrusions et accès non autorisés cette semaine"`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-h-[100px] resize-none text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-[#FF9800] focus:ring-2 focus:ring-[#FF9800]/20 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg px-4 py-3 pr-32"
              data-testid="input-search-events"
            />
            <Button 
              className="absolute bottom-3 right-3 bg-[#FF9800] hover:bg-[#FF9800]/90 text-white px-6 py-2 rounded-md" 
              data-testid="button-search"
              onClick={handleNaturalSearch}
            >
              <Search className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
          </div>

          <div className="flex gap-2 mt-4 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Suggestions:</span>
            <button 
              className="px-3 py-1 bg-[#FF9800] text-white rounded-full text-xs hover:bg-[#FF9800]/90" 
              data-testid="button-suggestion-critical"
              onClick={() => handleSuggestionClick("événements critiques")}
            >
              Événements critiques
            </button>
            <button 
              className="px-3 py-1 bg-[#FF9800] text-white rounded-full text-xs hover:bg-[#FF9800]/90" 
              data-testid="button-suggestion-active"
              onClick={() => handleSuggestionClick("statut actif")}
            >
              Statut actif
            </button>
            <button 
              className="px-3 py-1 bg-[#FF9800] text-white rounded-full text-xs hover:bg-[#FF9800]/90" 
              data-testid="button-suggestion-today"
              onClick={() => handleSuggestionClick("aujourd'hui")}
            >
              Aujourd'hui
            </button>
            <button 
              className="px-3 py-1 bg-[#FF9800] text-white rounded-full text-xs hover:bg-[#FF9800]/90" 
              data-testid="button-suggestion-security"
              onClick={() => handleSuggestionClick("sécurité")}
            >
              Sécurité
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Filters Section */}
      <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                Filtres Avancés
              </h3>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {filteredEvents.length} événements trouvés
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Module
              </label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-module">
                  <SelectValue placeholder="Tous les modules" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les modules</SelectItem>
                  <SelectItem value="Safety">Safety</SelectItem>
                  <SelectItem value="Behavior">Behavior</SelectItem>
                  <SelectItem value="Personnel">Personnel</SelectItem>
                  <SelectItem value="Vehicle">Vehicle</SelectItem>
                  <SelectItem value="Zone">Zone Monitoring</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Sévérité
              </label>
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-severity">
                  <SelectValue placeholder="Toutes sévérités" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes sévérités</SelectItem>
                  <SelectItem value="Critical">Critique</SelectItem>
                  <SelectItem value="Warning">Attention</SelectItem>
                  <SelectItem value="Info">Information</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Statut
              </label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-status">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Active">Actif</SelectItem>
                  <SelectItem value="Investigating">En cours</SelectItem>
                  <SelectItem value="Resolved">Résolu</SelectItem>
                  <SelectItem value="Completed">Terminé</SelectItem>
                  <SelectItem value="Monitoring">Surveillance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Caméras
              </label>
              <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-cameras">
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="Caméra 01">Caméra 01</SelectItem>
                  <SelectItem value="Caméra 02">Caméra 02</SelectItem>
                  <SelectItem value="Caméra 03">Caméra 03</SelectItem>
                  <SelectItem value="Caméra 04">Caméra 04</SelectItem>
                  <SelectItem value="Caméra 05">Caméra 05</SelectItem>
                  <SelectItem value="Caméra 07">Caméra 07</SelectItem>
                  <SelectItem value="Caméra 08">Caméra 08</SelectItem>
                  <SelectItem value="Caméra 09">Caméra 09</SelectItem>
                  <SelectItem value="Caméra 10">Caméra 10</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Zones
              </label>
              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-zones">
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="Production">Production</SelectItem>
                  <SelectItem value="Stockage">Stockage</SelectItem>
                  <SelectItem value="Entrée">Entrée</SelectItem>
                  <SelectItem value="Extérieur">Extérieur</SelectItem>
                  <SelectItem value="Sécurisée">Sécurisée</SelectItem>
                  <SelectItem value="Parking">Parking</SelectItem>
                  <SelectItem value="Circulation">Circulation</SelectItem>
                  <SelectItem value="Périmètre">Périmètre</SelectItem>
                  <SelectItem value="Accueil">Accueil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Période
              </label>
              <Select value="" onValueChange={() => {}}>
                <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-period">
                  <SelectValue placeholder="Aujourd'hui" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="yesterday">Hier</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-medium">
            Événements Tous Modules ({filteredEvents.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {filteredEvents.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div 
                  key={event.id}
                  className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                    index === filteredEvents.length - 1 ? 'border-b-0' : ''
                  }`}
                  onClick={() => handleEventClick(event)}
                  data-testid={`event-card-${event.id}`}
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={event.thumbnail} 
                      alt="Event"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          className={`text-xs text-white px-2 py-1 ${event.severityColor}`}
                          data-testid={`badge-severity-${event.id}`}
                        >
                          {event.severity}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className="text-xs px-2 py-1"
                          style={{ borderColor: moduleStats[event.module as keyof typeof moduleStats]?.color, color: moduleStats[event.module as keyof typeof moduleStats]?.color }}
                          data-testid={`badge-module-${event.id}`}
                        >
                          {event.module}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <IconComponent className="w-3 h-3" />
                          <span>{event.type}</span>
                        </div>
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                        {event.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Camera className="w-3 h-3" />
                          <span>{event.camera}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{event.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          <span>{event.confidence}% confiance</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge 
                        className={`text-xs text-white px-3 py-1 ${event.statusColor}`}
                        data-testid={`badge-status-${event.id}`}
                      >
                        {event.status}
                      </Badge>
                      <div className={`text-xs px-2 py-1 rounded ${
                        event.priority === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        event.priority === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                        event.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {event.priority}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Event Detail Modal */}
      <EventDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
};