import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventDetailModal } from "@/components/EventDetailModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, Camera, MapPin, AlertTriangle, Flame, Users, Eye, HardHat, Zap, Shield, Sword, User, Cigarette, Phone, ShieldAlert, UserCheck } from "lucide-react";

// Import surveillance images
import surveyImage1 from "@assets/stock_images/security_camera_surv_a6d7868d.jpg";
import surveyImage2 from "@assets/stock_images/security_camera_surv_51993350.jpg"; 
import surveyImage3 from "@assets/stock_images/security_camera_surv_61395d08.jpg";
import surveyImage4 from "@assets/stock_images/security_camera_surv_f76cea15.jpg";
import surveyImage5 from "@assets/stock_images/security_camera_surv_e3b2959c.jpg";

const BehaviorEventsPage = (): JSX.Element => {
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
    console.log("Search triggered for:", searchQuery);
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  // Apply filters functionality
  const applyFilters = () => {
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

  // Sample behavior events data with 8 detection types
  const behaviorEvents = [
    {
      id: 1,
      title: "Fight Detection",
      description: "Altercation detected in cafeteria",
      camera: "Caméra A",
      zone: "Cafeteria",
      timestamp: "27 Jan 2025, 14:32",
      severity: "CRITIQUE",
      severityColor: "bg-red-500",
      status: "New",
      statusColor: "bg-green-500",
      thumbnail: surveyImage1,
      icon: Sword,
    },
    {
      id: 2,
      title: "Fall Detection",
      description: "Person fell on stairs",
      camera: "Caméra B",
      zone: "Stairwell",
      timestamp: "27 Jan 2025, 14:28",
      severity: "CRITIQUE",
      severityColor: "bg-red-500",
      status: "In Review",
      statusColor: "bg-yellow-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: User,
    },
    {
      id: 3,
      title: "Crowd Movement",
      description: "Large gathering detected",
      camera: "Caméra C",
      zone: "Main Entrance",
      timestamp: "27 Jan 2025, 14:16",
      severity: "ALERTE",
      severityColor: "bg-orange-500",
      status: "Confirmed",
      statusColor: "bg-blue-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: Users,
    },
    {
      id: 4,
      title: "Smoking Detection",
      description: "Smoking in restricted area",
      camera: "Caméra D", 
      zone: "Production Floor",
      timestamp: "27 Jan 2025, 14:45",
      severity: "ALERTE",
      severityColor: "bg-orange-500",
      status: "Resolved",
      statusColor: "bg-gray-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: Cigarette,
    },
    {
      id: 5,
      title: "Running Detection",
      description: "Person running in corridor",
      camera: "Caméra E",
      zone: "Corridor",
      timestamp: "27 Jan 2025, 13:52",
      severity: "MODÉRÉE",
      severityColor: "bg-blue-500",
      status: "New",
      statusColor: "bg-green-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: Zap,
    },
    {
      id: 6,
      title: "Phone Usage",
      description: "Phone call during work",
      camera: "Caméra F",
      zone: "Production Line",
      timestamp: "27 Jan 2025, 13:44",
      severity: "FAIBLE",
      severityColor: "bg-green-500",
      status: "In Review",
      statusColor: "bg-yellow-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: Phone,
    },
    {
      id: 7,
      title: "Weapon Detection",
      description: "Suspicious object detected",
      camera: "Caméra G",
      zone: "Security Gate",
      timestamp: "27 Jan 2025, 13:38",
      severity: "CRITIQUE",
      severityColor: "bg-red-500",
      status: "Confirmed",
      statusColor: "bg-blue-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: ShieldAlert,
    },
    {
      id: 8,
      title: "Gathering Detection",
      description: "Unauthorized gathering",
      camera: "Caméra H",
      zone: "Break Room",
      timestamp: "27 Jan 2025, 13:25",
      severity: "ALERTE",
      severityColor: "bg-orange-500",
      status: "Resolved",
      statusColor: "bg-gray-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: UserCheck,
    },
    {
      id: 9,
      title: "Fight Detection",
      description: "Physical confrontation",
      camera: "Caméra I",
      zone: "Warehouse",
      timestamp: "27 Jan 2025, 13:15",
      severity: "CRITIQUE",
      severityColor: "bg-red-500",
      status: "New",
      statusColor: "bg-green-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: Sword,
    },
    {
      id: 10,
      title: "Fall Detection",
      description: "Slip and fall incident",
      camera: "Caméra J",
      zone: "Storage Area",
      timestamp: "27 Jan 2025, 13:08",
      severity: "CRITIQUE",
      severityColor: "bg-red-500",
      status: "In Review",
      statusColor: "bg-yellow-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: User,
    },
    {
      id: 11,
      title: "Crowd Movement",
      description: "Mass movement detected",
      camera: "Caméra K",
      zone: "Parking Lot",
      timestamp: "27 Jan 2025, 12:58",
      severity: "MODÉRÉE",
      severityColor: "bg-blue-500",
      status: "Confirmed",
      statusColor: "bg-blue-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: Users,
    },
    {
      id: 12,
      title: "Smoking Detection",
      description: "Smoking violation",
      camera: "Caméra L",
      zone: "Office Area",
      timestamp: "27 Jan 2025, 12:42",
      severity: "ALERTE",
      severityColor: "bg-orange-500",
      status: "Resolved",
      statusColor: "bg-gray-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: Cigarette,
    },
    {
      id: 13,
      title: "Running Detection",
      description: "Excessive speed detected",
      camera: "Caméra M",
      zone: "Emergency Exit",
      timestamp: "27 Jan 2025, 12:35",
      severity: "MODÉRÉE",
      severityColor: "bg-blue-500",
      status: "New",
      statusColor: "bg-green-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: Zap,
    },
    {
      id: 14,
      title: "Phone Usage",
      description: "Unauthorized phone use",
      camera: "Caméra N",
      zone: "Clean Room",
      timestamp: "27 Jan 2025, 12:28",
      severity: "FAIBLE",
      severityColor: "bg-green-500",
      status: "In Review",
      statusColor: "bg-yellow-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: Phone,
    },
    {
      id: 15,
      title: "Gathering Detection",
      description: "Group formation",
      camera: "Caméra O",
      zone: "Loading Dock",
      timestamp: "27 Jan 2025, 12:18",
      severity: "ALERTE",
      severityColor: "bg-orange-500",
      status: "Confirmed",
      statusColor: "bg-blue-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: UserCheck,
    },
    {
      id: 16,
      title: "Weapon Detection",
      description: "Security threat identified",
      camera: "Caméra P",
      zone: "Reception",
      timestamp: "27 Jan 2025, 12:05",
      severity: "CRITIQUE",
      severityColor: "bg-red-500",
      status: "Resolved",
      statusColor: "bg-gray-500",
      thumbnail: surveillanceImages[(Math.floor(Math.random() * 5))],
      icon: ShieldAlert,
    }
  ];

  // Filter events based on current filters
  const filteredEvents = useMemo(() => {
    return behaviorEvents.filter(event => {
      const matchesSearch = searchQuery === "" || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.camera.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesEvent = selectedEvent === "all" || event.title.toLowerCase().includes(selectedEvent.toLowerCase());
      const matchesCamera = selectedCamera === "all" || event.camera === selectedCamera;
      const matchesSite = selectedSite === "all" || event.zone.includes(selectedSite);
      const matchesZone = selectedZone === "all" || event.zone === selectedZone;
      const matchesSeverity = selectedSeverity === "all" || event.severity === selectedSeverity;
      const matchesStatus = selectedStatus === "all" || event.status === selectedStatus;

      return matchesSearch && matchesEvent && matchesCamera && matchesSite && matchesZone && matchesSeverity && matchesStatus;
    });
  }, [behaviorEvents, searchQuery, selectedEvent, selectedCamera, selectedSite, selectedZone, selectedSeverity, selectedStatus]);

  // Open event detail modal
  const openEventModal = (event: any) => {
    setSelectedEventDetail(event);
    setIsModalOpen(true);
  };

  // Search suggestions for behavior events
  const searchSuggestions = [
    "Fight Detection",
    "Fall Detection", 
    "Crowd Movement",
    "Smoking Detection",
    "Running Detection",
    "Phone Usage",
    "Weapon Detection",
    "Gathering Detection"
  ];

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Behavior Events</h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Smart Search Section */}
        <Card className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#D32F2F] rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Smart Search
              </h3>
            </div>
            
            <div className="relative">
              <Textarea
                placeholder={`Describe what you're looking for in natural language...
Examples:
• 'Show me all fight detections yesterday'
• 'Smoking and weapon events this week'`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-h-[120px] resize-none text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-[#D32F2F] focus:ring-2 focus:ring-[#D32F2F]/20 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg px-4 py-3 pr-32"
                data-testid="input-search-events"
              />
              <Button 
                className="absolute bottom-3 right-3 bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-6 py-2 rounded-md" 
                data-testid="button-search"
                onClick={handleSearch}
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex gap-2 mt-4 text-sm">
              <span className="text-gray-500 dark:text-gray-400">Suggestions:</span>
              <button 
                className="text-[#D32F2F] hover:underline" 
                data-testid="button-suggestion-fights"
                onClick={() => handleSuggestionClick("fight")}
              >
                Fights
              </button>
              <button 
                className="text-[#D32F2F] hover:underline" 
                data-testid="button-suggestion-falls"
                onClick={() => handleSuggestionClick("fall")}
              >
                Falls
              </button>
              <button 
                className="text-[#D32F2F] hover:underline" 
                data-testid="button-suggestion-weapons"
                onClick={() => handleSuggestionClick("weapon")}
              >
                Weapons
              </button>
              <button 
                className="text-[#D32F2F] hover:underline" 
                data-testid="button-suggestion-smoking"
                onClick={() => handleSuggestionClick("smoking")}
              >
                Smoking
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Filter Section */}
        <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                  Filters
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
                  className="border-[#D32F2F] text-[#D32F2F] hover:bg-red-50 dark:hover:bg-red-900/20"
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
                  Events
                </label>
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-events">
                    <SelectValue placeholder="All Events" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="fight">Fight Detection</SelectItem>
                    <SelectItem value="fall">Fall Detection</SelectItem>
                    <SelectItem value="crowd">Crowd Movement</SelectItem>
                    <SelectItem value="smoking">Smoking</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="phone">Phone Usage</SelectItem>
                    <SelectItem value="weapon">Weapon</SelectItem>
                    <SelectItem value="gathering">Gathering</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Cameras
                </label>
                <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                  <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-cameras">
                    <SelectValue placeholder="All Cameras" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cameras</SelectItem>
                    <SelectItem value="Caméra A">Caméra A</SelectItem>
                    <SelectItem value="Caméra B">Caméra B</SelectItem>
                    <SelectItem value="Caméra C">Caméra C</SelectItem>
                    <SelectItem value="Caméra D">Caméra D</SelectItem>
                    <SelectItem value="Caméra E">Caméra E</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sites
                </label>
                <Select value={selectedSite} onValueChange={setSelectedSite}>
                  <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-sites">
                    <SelectValue placeholder="All Sites" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sites</SelectItem>
                    <SelectItem value="Main">Main Building</SelectItem>
                    <SelectItem value="Production">Production Area</SelectItem>
                    <SelectItem value="Office">Office Area</SelectItem>
                    <SelectItem value="Warehouse">Warehouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Zones
                </label>
                <Select value={selectedZone} onValueChange={setSelectedZone}>
                  <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-zones">
                    <SelectValue placeholder="All Zones" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Zones</SelectItem>
                    <SelectItem value="Cafeteria">Cafeteria</SelectItem>
                    <SelectItem value="Stairwell">Stairwell</SelectItem>
                    <SelectItem value="Main Entrance">Main Entrance</SelectItem>
                    <SelectItem value="Production Floor">Production Floor</SelectItem>
                    <SelectItem value="Corridor">Corridor</SelectItem>
                    <SelectItem value="Break Room">Break Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Severity
                </label>
                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-severity">
                    <SelectValue placeholder="All Severities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="CRITIQUE">Critical</SelectItem>
                    <SelectItem value="ALERTE">Alert</SelectItem>
                    <SelectItem value="MODÉRÉE">Moderate</SelectItem>
                    <SelectItem value="FAIBLE">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-status">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="In Review">In Review</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map((event) => (
            <Card 
              key={event.id}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => openEventModal(event)}
              data-testid={`event-card-${event.id}`}
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
                  <div className="w-8 h-8 bg-[#D32F2F]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <event.icon className="w-4 h-4 text-[#D32F2F]" />
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>{event.timestamp}</span>
                    </div>
                    {/* Status and Severity Badges */}
                    <div className="flex gap-1">
                      {/* Status Badge */}
                      <div className={`border-2 text-xs px-2 py-1 rounded-md font-medium bg-transparent ${
                        (event.statusColor === 'bg-green-500' || event.status === 'New') ? 'border-green-500 text-green-600 dark:border-green-400 dark:text-green-400' :
                        (event.statusColor === 'bg-yellow-500' || event.status === 'In Review') ? 'border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400' :
                        (event.statusColor === 'bg-blue-500' || event.status === 'Confirmed') ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' :
                        (event.statusColor === 'bg-gray-500' || event.status === 'Resolved') ? 'border-gray-500 text-gray-600 dark:border-gray-400 dark:text-gray-300' :
                        'border-gray-500 text-gray-600 dark:border-gray-400 dark:text-gray-300'
                      }`}>
                        {event.status}
                      </div>
                      {/* Severity Badge */}
                      <div className={`border-2 bg-transparent text-xs px-2 py-1 rounded-lg font-bold uppercase tracking-wide ${
                        (event.severityColor === 'bg-red-500' || event.severity === 'CRITIQUE') ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' :
                        (event.severityColor === 'bg-orange-500' || event.severity === 'ALERTE') ? 'border-orange-500 text-orange-600 dark:border-orange-400 dark:text-orange-400' :
                        (event.severityColor === 'bg-blue-500' || event.severity === 'MODÉRÉE') ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' :
                        (event.severityColor === 'bg-green-500' || event.severity === 'FAIBLE') ? 'border-green-500 text-green-600 dark:border-green-400 dark:text-green-400' :
                        'border-gray-500 text-gray-600 dark:border-gray-400 dark:text-gray-300'
                      }`}>
                        {event.severity}
                      </div>
                    </div>
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

export default BehaviorEventsPage;