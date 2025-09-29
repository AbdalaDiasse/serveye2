import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventDetailModal } from "@/components/EventDetailModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Calendar, 
  Camera, 
  MapPin, 
  Shield, 
  Lock, 
  LockOpen, 
  Key, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  UserCheck, 
  UserX, 
  Activity,
  TrendingUp,
  Eye,
  Clock,
  CreditCard,
  DoorOpen
} from "lucide-react";

// Import personnel images
import businessmanPhoto from "@assets/generated_images/Security_capture_businessman_photo_2feb92d4.png";
import womanPhoto from "@assets/generated_images/Security_capture_woman_photo_e17e3828.png";
import casualManPhoto from "@assets/generated_images/Security_capture_casual_man_eb27432b.png";
import elderlyWomanPhoto from "@assets/generated_images/Security_capture_elderly_woman_37bac27b.png";
import youngManPhoto from "@assets/generated_images/Security_capture_young_man_e6e7c093.png";

export const AccessControlPage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [selectedCamera, setSelectedCamera] = useState("all");
  const [selectedSite, setSelectedSite] = useState("all");
  const [selectedZone, setSelectedZone] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedName, setSelectedName] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedEventDetail, setSelectedEventDetail] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle search functionality
  const handleSearch = () => {
    console.log("Search triggered for:", searchQuery);
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  // Apply filters functionality
  const applyFilters = () => {
    console.log("Filters applied:", { selectedEvent, selectedCamera, selectedSite, selectedZone, selectedStatus, dateFrom, dateTo });
  };

  // Reset filters functionality
  const resetFilters = () => {
    setSelectedEvent("all");
    setSelectedCamera("all");
    setSelectedSite("all");
    setSelectedZone("all");
    setSelectedStatus("all");
    setSelectedName("");
    setDateFrom("");
    setDateTo("");
    setSearchQuery("");
  };

  // Create array of personnel images for rotation
  const personnelImages = [businessmanPhoto, womanPhoto, casualManPhoto, elderlyWomanPhoto, youngManPhoto];

  // Sample access control events data
  const accessControlEvents = [
    {
      id: 1,
      title: "Accès autorisé - Marc Dubois",
      description: "Zone restreinte A",
      camera: "Caméra 01",
      zone: "Zone Sécurisée",
      timestamp: "29 Sep 2025, 08:15",
      status: "Granted",
      statusColor: "bg-green-500",
      thumbnail: businessmanPhoto,
      icon: LockOpen,
      employeeId: "EMP001",
      department: "Administration",
      accessLevel: "Level 3",
      cardId: "CARD001"
    },
    {
      id: 2,
      title: "Accès refusé - Personne inconnue",
      description: "Tentative d'accès laboratoire",
      camera: "Caméra 05",
      zone: "Laboratoire",
      timestamp: "29 Sep 2025, 14:22",
      status: "Denied",
      statusColor: "bg-red-500",
      thumbnail: casualManPhoto,
      icon: Lock,
      employeeId: "UNKNOWN",
      department: "Non autorisé",
      accessLevel: "None",
      cardId: "INVALID"
    },
    {
      id: 3,
      title: "Tentative badge invalide - Sarah Martin",
      description: "Badge expiré détecté",
      camera: "Caméra 02",
      zone: "Bureaux",
      timestamp: "29 Sep 2025, 09:30",
      status: "Invalid",
      statusColor: "bg-yellow-500",
      thumbnail: womanPhoto,
      icon: AlertTriangle,
      employeeId: "EMP002",
      department: "Marketing",
      accessLevel: "Level 1",
      cardId: "CARD002"
    },
    {
      id: 4,
      title: "Accès d'urgence - Pierre Laurent",
      description: "Sortie de secours activée",
      camera: "Caméra 06",
      zone: "Sortie Urgence",
      timestamp: "29 Sep 2025, 16:45",
      status: "Emergency",
      statusColor: "bg-orange-500",
      thumbnail: youngManPhoto,
      icon: AlertTriangle,
      employeeId: "EMP003",
      department: "Sécurité",
      accessLevel: "Emergency",
      cardId: "CARD003"
    },
    {
      id: 5,
      title: "Badge oublié - Marie Rousseau",
      description: "Accès manuel autorisé",
      camera: "Caméra 03",
      zone: "Reception",
      timestamp: "29 Sep 2025, 08:45",
      status: "Manual",
      statusColor: "bg-blue-500",
      thumbnail: elderlyWomanPhoto,
      icon: Key,
      employeeId: "EMP004",
      department: "RH",
      accessLevel: "Level 2",
      cardId: "MANUAL"
    },
    {
      id: 6,
      title: "Tailgating détecté - Plusieurs personnes",
      description: "Passage simultané détecté",
      camera: "Caméra 01",
      zone: "Entrée Principale",
      timestamp: "29 Sep 2025, 12:15",
      status: "Violation",
      statusColor: "bg-red-500",
      thumbnail: businessmanPhoto,
      icon: Eye,
      employeeId: "MULTIPLE",
      department: "Multiple",
      accessLevel: "Various",
      cardId: "CARD005"
    },
    {
      id: 7,
      title: "Accès hors horaires - Thomas Chen",
      description: "Accès autorisé weekend",
      camera: "Caméra 04",
      zone: "Bureau IT",
      timestamp: "29 Sep 2025, 20:30",
      status: "After Hours",
      statusColor: "bg-purple-500",
      thumbnail: casualManPhoto,
      icon: Clock,
      employeeId: "EMP005",
      department: "IT",
      accessLevel: "Level 4",
      cardId: "CARD006"
    }
  ];

  // Statistics
  const accessStats = {
    totalAccess: accessControlEvents.length,
    granted: accessControlEvents.filter(e => e.status === "Granted").length,
    denied: accessControlEvents.filter(e => e.status === "Denied").length,
    violations: accessControlEvents.filter(e => e.status === "Violation").length,
    emergency: accessControlEvents.filter(e => e.status === "Emergency").length,
    successRate: Math.round((accessControlEvents.filter(e => e.status === "Granted").length / accessControlEvents.length) * 100)
  };

  // Filtered events based on search and filters
  const filteredEvents = useMemo(() => {
    return accessControlEvents.filter(event => {
      // Search query filter
      const matchesSearch = searchQuery === "" || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.cardId.toLowerCase().includes(searchQuery.toLowerCase());

      // Name filter
      const matchesName = selectedName === "" || 
        event.title.toLowerCase().includes(selectedName.toLowerCase());

      // Status filter
      const matchesStatus = selectedStatus === "all" || event.status === selectedStatus;

      // Camera filter
      const matchesCamera = selectedCamera === "all" || event.camera === selectedCamera;

      // Zone filter
      const matchesZone = selectedZone === "all" || event.zone === selectedZone;

      return matchesSearch && matchesName && matchesStatus && matchesCamera && matchesZone;
    });
  }, [accessControlEvents, searchQuery, selectedName, selectedStatus, selectedCamera, selectedZone]);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-full">
      {/* Header with Statistics */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-[#3fb5b5] rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Contrôle d'Accès</h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Surveillance et gestion des accès sécurisés
          </span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-7 gap-4 mb-6">
          {[
            { label: 'Accès Autorisés', value: accessStats.granted, icon: LockOpen, change: '+5%', period: 'today' },
            { label: 'Accès Refusés', value: accessStats.denied, icon: Lock, change: '+8%', period: 'today' },
            { label: 'Violations', value: accessStats.violations, icon: AlertTriangle, change: '+15%', period: 'today' },
            { label: 'Accès H. Ouverture', value: 12, icon: Clock, change: '+20%', period: 'today' },
            { label: 'Intrusions', value: 3, icon: Shield, change: '+50%', period: 'today' },
            { label: 'Problèmes Badge', value: 7, icon: CreditCard, change: '+12%', period: 'today' },
            { label: 'Sorties Urgence', value: accessStats.emergency, icon: DoorOpen, change: '+25%', period: 'today' }
          ].map((metric, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
              {/* Teal left accent border */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#3fb5b5]"></div>
              <CardContent className="p-4 pl-6">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{metric.label}</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{metric.value}</div>
                    <div className="flex items-center gap-1">
                      <svg className={`w-3 h-3 ${metric.change.startsWith('+') ? 'text-red-500' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={metric.change.startsWith('+') ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"} />
                      </svg>
                      <span className={`text-xs font-medium ${metric.change.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>{metric.change}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{metric.period}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <metric.icon className="w-8 h-8 text-[#3fb5b5]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Search Section */}
      <Card className="mb-6 bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#3fb5b5] rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Recherche Intelligente de Contrôles d'Accès
            </h3>
          </div>
          
          <div className="relative">
            <Textarea
              placeholder={`Recherchez des événements de contrôle d'accès...
Exemples:
• "Accès refusé zone laboratoire"
• "Violations de sécurité aujourd'hui"
• "Badge invalide département IT"
• "Tentatives non autorisées"`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-h-[100px] resize-none text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-[#3fb5b5] focus:ring-2 focus:ring-[#3fb5b5]/20 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg px-4 py-3 pr-32"
              data-testid="input-search-access-control"
            />
            <Button 
              className="absolute bottom-3 right-3 bg-[#3fb5b5] hover:bg-[#3fb5b5]/90 text-white px-6 py-2 rounded-md" 
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
              className="px-3 py-1 bg-[#3fb5b5] text-white rounded-full text-xs hover:bg-[#3fb5b5]/90" 
              data-testid="button-suggestion-granted"
              onClick={() => handleSuggestionClick("autorisés")}
            >
              Autorisés
            </button>
            <button 
              className="px-3 py-1 bg-[#3fb5b5] text-white rounded-full text-xs hover:bg-[#3fb5b5]/90" 
              data-testid="button-suggestion-denied"
              onClick={() => handleSuggestionClick("refusés")}
            >
              Refusés
            </button>
            <button 
              className="px-3 py-1 bg-[#3fb5b5] text-white rounded-full text-xs hover:bg-[#3fb5b5]/90" 
              data-testid="button-suggestion-violations"
              onClick={() => handleSuggestionClick("violations")}
            >
              Violations
            </button>
            <button 
              className="px-3 py-1 bg-[#3fb5b5] text-white rounded-full text-xs hover:bg-[#3fb5b5]/90" 
              data-testid="button-suggestion-today"
              onClick={() => handleSuggestionClick("aujourd'hui")}
            >
              Aujourd'hui
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
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {filteredEvents.length} événements trouvés
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={applyFilters}
                  className="bg-[#3fb5b5] hover:bg-[#3fb5b5]/90 text-white text-sm px-4 py-2"
                  data-testid="button-apply-filters"
                >
                  Appliquer
                </Button>
                <Button 
                  onClick={resetFilters}
                  variant="outline"
                  className="text-sm px-4 py-2 border-gray-300 dark:border-gray-600"
                  data-testid="button-reset-filters"
                >
                  Réinitialiser
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Nom
              </label>
              <Input 
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
                placeholder="Rechercher par nom..."
                className="bg-white dark:bg-gray-700"
                data-testid="input-name-filter"
              />
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
                  <SelectItem value="Granted">Autorisé</SelectItem>
                  <SelectItem value="Denied">Refusé</SelectItem>
                  <SelectItem value="Violation">Violation</SelectItem>
                  <SelectItem value="Emergency">Urgence</SelectItem>
                  <SelectItem value="Manual">Manuel</SelectItem>
                  <SelectItem value="Invalid">Invalide</SelectItem>
                  <SelectItem value="After Hours">Hors horaires</SelectItem>
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
                  <SelectItem value="Caméra 06">Caméra 06</SelectItem>
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
                  <SelectItem value="Zone Sécurisée">Zone Sécurisée</SelectItem>
                  <SelectItem value="Laboratoire">Laboratoire</SelectItem>
                  <SelectItem value="Bureaux">Bureaux</SelectItem>
                  <SelectItem value="Sortie Urgence">Sortie Urgence</SelectItem>
                  <SelectItem value="Reception">Reception</SelectItem>
                  <SelectItem value="Entrée Principale">Entrée Principale</SelectItem>
                  <SelectItem value="Bureau IT">Bureau IT</SelectItem>
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
            Événements de Contrôle d'Accès ({filteredEvents.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredEvents.map((event) => (
              <Card 
                key={event.id} 
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative" 
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
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-8 h-8 bg-[#3fb5b5]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <event.icon className="w-4 h-4 text-[#3fb5b5]" />
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
                      <Key className="w-3 h-3" />
                      <span>{event.accessLevel}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>{event.timestamp}</span>
                      </div>
                      {/* Status Badge */}
                      <div className={`border-2 text-xs px-2 py-1 rounded-md font-medium bg-transparent ${
                        event.status === 'Granted' ? 'border-green-500 text-green-600 dark:border-green-400 dark:text-green-400' :
                        event.status === 'Denied' ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' :
                        event.status === 'Violation' ? 'border-orange-500 text-orange-600 dark:border-orange-400 dark:text-orange-400' :
                        event.status === 'Emergency' ? 'border-purple-500 text-purple-600 dark:border-purple-400 dark:text-purple-400' :
                        event.status === 'Manual' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' :
                        event.status === 'Invalid' ? 'border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400' :
                        event.status === 'After Hours' ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' :
                        'border-gray-500 text-gray-600 dark:border-gray-400 dark:text-gray-300'
                      }`}>
                        {event.status}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

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