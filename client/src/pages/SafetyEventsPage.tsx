import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventDetailModal } from "@/components/EventDetailModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, Camera, MapPin, AlertTriangle, Flame, Users, Eye, HardHat, Zap, Shield } from "lucide-react";

// Import surveillance images
import surveyImage1 from "@assets/stock_images/security_camera_surv_a6d7868d.jpg";
import surveyImage2 from "@assets/stock_images/security_camera_surv_51993350.jpg"; 
import surveyImage3 from "@assets/stock_images/security_camera_surv_61395d08.jpg";
import surveyImage4 from "@assets/stock_images/security_camera_surv_f76cea15.jpg";
import surveyImage5 from "@assets/stock_images/security_camera_surv_e3b2959c.jpg";

const SafetyEventsPage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [selectedCamera, setSelectedCamera] = useState("all");
  const [selectedSite, setSelectedSite] = useState("all");
  const [selectedZone, setSelectedZone] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedEventDetail, setSelectedEventDetail] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle search functionality
  const handleSearch = () => {
    // Search is already handled by the controlled input
    // This button can be used for additional search actions if needed
    console.log("Search triggered for:", searchQuery);
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  // Apply filters functionality
  const applyFilters = () => {
    // Filters are automatically applied through useMemo dependencies
    // This button can provide user feedback about filter application
    console.log("Filters applied:", { selectedEvent, selectedCamera, selectedSite, selectedZone, selectedSeverity, selectedStatus, dateFrom, dateTo });
  };

  // Reset filters functionality
  const resetFilters = () => {
    setSelectedEvent("all");
    setSelectedCamera("all");
    setSelectedSite("all");
    setSelectedZone("all");
    setSelectedSeverity("all");
    setSelectedStatus("all");
    setDateFrom("");
    setDateTo("");
    setSearchQuery("");
  };


  // Create array of surveillance images for rotation
  const surveillanceImages = [surveyImage1, surveyImage2, surveyImage3, surveyImage4, surveyImage5];

  // Sample safety events data matching the design
  const safetyEvents = [
    {
      id: 1,
      title: "Intrusion détectée",
      description: "Zone de production",
      camera: "Caméra A",
      zone: "Zone A",
      timestamp: "27 Jan 2025, 14:32",
      severity: "CRITIQUE",
      severityColor: "bg-red-500",
      status: "New",
      statusColor: "bg-green-500",
      thumbnail: surveyImage1,
      icon: AlertTriangle,
    },
    {
      id: 2,
      title: "EPI manquant - Casque",
      description: "Zone de stockage",
      camera: "Caméra B",
      zone: "Entrepôt",
      timestamp: "27 Jan 2025, 14:28",
      severity: "ALERTE",
      severityColor: "bg-orange-500",
      status: "In Review",
      statusColor: "bg-yellow-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: HardHat,
    },
    {
      id: 3,
      title: "Fumée détectée",
      description: "Caméra C",
      camera: "Caméra C",
      zone: "Production",
      timestamp: "27 Jan 2025, 14:16",
      severity: "CRITIQUE",
      severityColor: "bg-red-500",
      status: "Confirmed",
      statusColor: "bg-blue-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: Flame,
    },
    {
      id: 4,
      title: "Bagarre détectée",
      description: "Caméra D",
      camera: "Caméra D", 
      zone: "Cafétéria",
      timestamp: "27 Jan 2025, 14:45",
      severity: "CRITIQUE",
      severityColor: "bg-red-500",
      status: "Resolved",
      statusColor: "bg-gray-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: Users,
    },
    {
      id: 5,
      title: "Franchissement de ligne",
      description: "Zone de sécurité",
      camera: "Caméra E",
      zone: "Sécurité",
      timestamp: "27 Jan 2025, 13:32",
      severity: "ALERTE",
      severityColor: "bg-orange-500",
      status: "New",
      statusColor: "bg-green-500", 
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: Shield,
    },
    {
      id: 6,
      title: "EPI manquant - Veste",
      description: "Zone de production",
      camera: "Caméra F",
      zone: "Production",
      timestamp: "27 Jan 2025, 13:18",
      severity: "ALERTE",
      severityColor: "bg-orange-500",
      status: "In Review",
      statusColor: "bg-yellow-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: HardHat,
    },
    {
      id: 7,
      title: "Feu détecté",
      description: "Zone de stockage",
      camera: "Caméra G", 
      zone: "Stockage",
      timestamp: "27 Jan 2025, 12:09",
      severity: "CRITIQUE",
      severityColor: "bg-red-500",
      status: "Critical",
      statusColor: "bg-red-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: Flame,
    },
    {
      id: 8,
      title: "Fumée détectée",
      description: "Zone de production",
      camera: "Caméra H",
      zone: "Production",
      timestamp: "27 Jan 2025, 11:48",
      severity: "CRITIQUE", 
      severityColor: "bg-red-500",
      status: "Confirmed",
      statusColor: "bg-blue-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: Flame,
    },
    {
      id: 9,
      title: "Incendie détecté",
      description: "Caméra I",
      camera: "Caméra I",
      zone: "Maintenance",
      timestamp: "27 Jan 2025, 10:47",
      severity: "CRITIQUE",
      severityColor: "bg-red-500", 
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: Flame,
    },
    {
      id: 10,
      title: "Zone de stockage manquante",
      description: "Zone de déchargement",
      camera: "Caméra J",
      zone: "Logistique", 
      timestamp: "27 Jan 2025, 10:16",
      severity: "CRITIQUE",
      severityColor: "bg-red-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: MapPin,
    },
    {
      id: 11,
      title: "Zone de sécurité",
      description: "Aire de travaux",
      camera: "Caméra K",
      zone: "Construction",
      timestamp: "27 Jan 2025, 09:59",
      severity: "ALERTE", 
      severityColor: "bg-orange-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: Shield,
    },
    {
      id: 12,
      title: "Aire de travaux",
      description: "Zone de stockage",
      camera: "Caméra L",
      zone: "Stockage",
      timestamp: "27 Jan 2025, 09:45",
      severity: "ALERTE",
      severityColor: "bg-orange-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))], 
      icon: HardHat,
    },
    {
      id: 13,
      title: "Arme détectée",
      description: "Entrée principale",
      camera: "Caméra M",
      zone: "Accès",
      timestamp: "27 Jan 2025, 10:45",
      severity: "CRITIQUE",
      severityColor: "bg-red-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: AlertTriangle,
    },
    {
      id: 14,
      title: "EPI manquant - Uniforme",
      description: "Zone de production", 
      camera: "Caméra N",
      zone: "Production",
      timestamp: "27 Jan 2025, 10:16",
      severity: "ALERTE",
      severityColor: "bg-orange-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: HardHat,
    },
    {
      id: 15,
      title: "Fuite de liquide",
      description: "Zone de déchargement",
      camera: "Caméra O",
      zone: "Logistique", 
      timestamp: "27 Jan 2025, 15:00",
      severity: "ALERTE",
      severityColor: "bg-orange-500", 
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: AlertTriangle,
    },
    {
      id: 16,
      title: "Rassemblement détecté",
      description: "Zone de sécurité",
      camera: "Caméra P",
      zone: "Sécurité",
      timestamp: "27 Jan 2025, 15:45",
      severity: "ALERTE",
      severityColor: "bg-orange-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))], 
      icon: Users,
    }
  ];

  // Filtered events based on search query and filters
  const filteredEvents = useMemo(() => {
    return safetyEvents.filter(event => {
      // Search query filter
      const matchesSearch = searchQuery === "" || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.camera.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.zone.toLowerCase().includes(searchQuery.toLowerCase());

      // Event type filter
      const matchesEventType = selectedEvent === "all" || 
        (selectedEvent === "intrusion" && event.title.toLowerCase().includes("intrusion")) ||
        (selectedEvent === "epi" && event.title.toLowerCase().includes("epi")) ||
        (selectedEvent === "fire" && (event.title.toLowerCase().includes("feu") || event.title.toLowerCase().includes("fumée") || event.title.toLowerCase().includes("incendie"))) ||
        (selectedEvent === "fight" && event.title.toLowerCase().includes("bagarre"));

      // Camera filter
      const matchesCamera = selectedCamera === "all" || 
        event.camera.toLowerCase().includes(selectedCamera.toLowerCase().replace("cam-", "caméra "));

      // Site filter (based on zone/description)
      const matchesSite = selectedSite === "all" || 
        event.zone.toLowerCase().includes(selectedSite.toLowerCase()) ||
        event.description.toLowerCase().includes(selectedSite.toLowerCase());

      // Zone filter  
      const matchesZone = selectedZone === "all" || event.zone.toLowerCase().includes(selectedZone.toLowerCase());

      // Severity filter
      const matchesSeverity = selectedSeverity === "all" || event.severity === selectedSeverity;

      // Status filter
      const matchesStatus = selectedStatus === "all" || (event.status && event.status === selectedStatus) || (selectedStatus === "New" && !event.status);

      // Date filters - basic date range checking
      const eventDate = new Date(event.timestamp);
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo) : null;
      
      const matchesDateFrom = !fromDate || eventDate >= fromDate;
      const matchesDateTo = !toDate || eventDate <= toDate;

      return matchesSearch && matchesEventType && matchesCamera && matchesSite && matchesZone && matchesSeverity && matchesStatus && matchesDateFrom && matchesDateTo;
    });
  }, [safetyEvents, searchQuery, selectedEvent, selectedCamera, selectedSite, selectedZone, selectedSeverity, selectedStatus, dateFrom, dateTo]);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-full">

      {/* Smart Search Section */}
      <Card className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#0070F3] rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Recherche intelligente
            </h3>
          </div>
          
          <div className="relative">
            <Textarea
              placeholder={`Décrivez ce que vous cherchez en langage naturel...
Exemples:
• 'Montre-moi toutes les intrusions détectées hier'
• 'Événements de feu et fumée cette semaine'`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-h-[120px] resize-none text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-[#0070F3] focus:ring-2 focus:ring-[#0070F3]/20 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg px-4 py-3 pr-32"
              data-testid="input-search-events"
            />
            <Button 
              className="absolute bottom-3 right-3 bg-[#0070F3] hover:bg-blue-700 text-white px-6 py-2 rounded-md" 
              data-testid="button-search"
              onClick={handleSearch}
            >
              <Search className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
          </div>

          <div className="flex gap-2 mt-4 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Suggestions:</span>
            <button 
              className="text-[#0070F3] hover:underline" 
              data-testid="button-suggestion-intrusions"
              onClick={() => handleSuggestionClick("intrusion")}
            >
              Intrusions
            </button>
            <button 
              className="text-[#0070F3] hover:underline" 
              data-testid="button-suggestion-epi"
              onClick={() => handleSuggestionClick("EPI manquant")}
            >
              EPI manquants
            </button>
            <button 
              className="text-[#0070F3] hover:underline" 
              data-testid="button-suggestion-incendies"
              onClick={() => handleSuggestionClick("feu")}
            >
              Incendies
            </button>
            <button 
              className="text-[#0070F3] hover:underline" 
              data-testid="button-suggestion-securite"
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
                Filtres
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                data-testid="button-reset-filters"
                onClick={resetFilters}
              >
                Reset
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-[#0070F3] text-[#0070F3] hover:bg-blue-50 dark:hover:bg-blue-900/20"
                data-testid="button-apply-filters"
                onClick={applyFilters}
              >
                <Filter className="w-4 h-4 mr-2" />
                Apply
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Événements
              </label>
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-events">
                  <SelectValue placeholder="Tous les événements" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les événements</SelectItem>
                  <SelectItem value="intrusion">Intrusion</SelectItem>
                  <SelectItem value="epi">EPI manquant</SelectItem>
                  <SelectItem value="fire">Feu/Fumée</SelectItem>
                  <SelectItem value="fight">Bagarre</SelectItem>
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
                  <SelectItem value="cam-a">Caméra A</SelectItem>
                  <SelectItem value="cam-b">Caméra B</SelectItem>
                  <SelectItem value="cam-c">Caméra C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Sites
              </label>
              <Select value={selectedSite} onValueChange={setSelectedSite}>
                <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-sites">
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="warehouse">Entrepôt</SelectItem>
                  <SelectItem value="office">Bureau</SelectItem>
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
                  <SelectItem value="zone-a">Zone A</SelectItem>
                  <SelectItem value="zone-b">Zone B</SelectItem>
                  <SelectItem value="zone-c">Zone C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Severity
              </label>
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-severity">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="CRITIQUE">Critical</SelectItem>
                  <SelectItem value="ALERTE">Alert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-status">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="In Review">In Review</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Période
              </label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-white dark:bg-gray-700"
                placeholder="mm/dd/yyyy"
                data-testid="input-date-from"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                &nbsp;
              </label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-white dark:bg-gray-700"
                placeholder="mm/dd/yyyy"
                data-testid="input-date-to"
              />
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Events Grid Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Événements Détectés
          </h3>
          <div className="text-sm text-[#0070F3] font-medium">
            {filteredEvents.length} événements
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEvents.map((event) => (
            <Card 
              key={event.id} 
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" 
              data-testid={`card-event-${event.id}`}
              onClick={() => {
                setSelectedEventDetail(event);
                setIsModalOpen(true);
              }}
            >
              <div className="relative">
                <img 
                  src={event.thumbnail} 
                  alt={event.title}
                  className="w-full h-32 object-cover"
                />
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start gap-2 mb-2">
                  <div className="w-8 h-8 bg-[#0070F3]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <event.icon className="w-4 h-4 text-[#0070F3]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {event.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  {/* Status Badge */}
                  <div className={`border-2 text-xs px-2 py-1 rounded-md font-medium bg-transparent ${
                    (event.statusColor === 'bg-green-500' || event.status === 'New') ? 'border-green-500 text-green-600 dark:border-green-400 dark:text-green-400' :
                    (event.statusColor === 'bg-yellow-500' || event.status === 'In Review') ? 'border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400' :
                    (event.statusColor === 'bg-blue-500' || event.status === 'Confirmed') ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' :
                    (event.statusColor === 'bg-gray-500' || event.status === 'Resolved') ? 'border-gray-500 text-gray-600 dark:border-gray-400 dark:text-gray-300' :
                    (event.statusColor === 'bg-red-500' || event.status === 'Critical') ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' :
                    'border-green-500 text-green-600 dark:border-green-400 dark:text-green-400'
                  }`}>
                    {event.status || 'New'}
                  </div>
                  {/* Severity Badge */}
                  <div className={`border-2 ${
                    event.severity === "CRITIQUE" 
                      ? "border-red-500 text-red-600 dark:text-red-400" 
                      : "border-orange-500 text-orange-600 dark:text-orange-400"
                  } bg-transparent text-xs px-2 py-1 rounded-md font-bold uppercase`}>
                    {event.severity}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Camera className="w-3 h-3" />
                    <span>{event.camera}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{event.zone}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>{event.timestamp}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEventDetail}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEventDetail(null);
        }}
      />
    </div>
  );
};

export default SafetyEventsPage;