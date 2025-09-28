import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "lucide-react";
import { EventDetailModal } from '@/components/EventDetailModal';

// Import behavior event images
import behaviorImage1 from "@assets/generated_images/Security_capture_businessman_photo_2feb92d4.png";
import behaviorImage2 from "@assets/generated_images/Security_capture_woman_photo_e17e3828.png";
import behaviorImage3 from "@assets/generated_images/Security_capture_casual_man_eb27432b.png";
import behaviorImage4 from "@assets/generated_images/Security_capture_elderly_woman_37bac27b.png";
import behaviorImage5 from "@assets/generated_images/Security_capture_young_man_e6e7c093.png";

// Behavior events data
const behaviorEventsData = [
  {
    id: 1,
    type: "Fight Detection",
    severity: "CRITICAL",
    severityColor: "bg-red-600",
    location: "Main Entrance",
    date: "25 Jan 2025, 14:32",
    camera: "Camera 01",
    image: behaviorImage1,
    status: "Active",
    priority: "High"
  },
  {
    id: 2,
    type: "Fall Detected",
    severity: "CRITICAL",
    severityColor: "bg-red-600",
    location: "Stairway Area",
    date: "25 Jan 2025, 14:28",
    camera: "Camera 03",
    image: behaviorImage2,
    status: "Under Investigation",
    priority: "High"
  },
  {
    id: 3,
    type: "Crowd Movement",
    severity: "WARNING",
    severityColor: "bg-orange-500",
    location: "Assembly Area",
    date: "25 Jan 2025, 14:15",
    camera: "Camera 05",
    image: behaviorImage3,
    status: "Monitoring",
    priority: "Medium"
  },
  {
    id: 4,
    type: "Smoking Detected",
    severity: "WARNING",
    severityColor: "bg-orange-500",
    location: "No-Smoking Zone",
    date: "25 Jan 2025, 13:48",
    camera: "Camera 02",
    image: behaviorImage4,
    status: "Resolved",
    priority: "Low"
  },
  {
    id: 5,
    type: "Running Detected",
    severity: "INFO",
    severityColor: "bg-blue-500",
    location: "Corridor A",
    date: "25 Jan 2025, 13:40",
    camera: "Camera 04",
    image: behaviorImage5,
    status: "Noted",
    priority: "Low"
  },
  {
    id: 6,
    type: "Unauthorized Calling",
    severity: "WARNING",
    severityColor: "bg-orange-500",
    location: "Restricted Area",
    date: "25 Jan 2025, 13:32",
    camera: "Camera 06",
    image: behaviorImage1,
    status: "Active",
    priority: "Medium"
  },
  {
    id: 7,
    type: "Weapon Detection",
    severity: "CRITICAL",
    severityColor: "bg-red-600",
    location: "Security Checkpoint",
    date: "25 Jan 2025, 13:00",
    camera: "Camera 01",
    image: behaviorImage2,
    status: "Emergency Response",
    priority: "Critical"
  },
  {
    id: 8,
    type: "Gathering Detected",
    severity: "WARNING",
    severityColor: "bg-orange-500",
    location: "Open Area",
    date: "25 Jan 2025, 12:45",
    camera: "Camera 07",
    image: behaviorImage3,
    status: "Monitoring",
    priority: "Medium"
  },
  {
    id: 9,
    type: "Fight Detection",
    severity: "CRITICAL",
    severityColor: "bg-red-600",
    location: "Cafeteria",
    date: "25 Jan 2025, 12:30",
    camera: "Camera 08",
    image: behaviorImage4,
    status: "Resolved",
    priority: "High"
  },
  {
    id: 10,
    type: "Fall Detected",
    severity: "CRITICAL",
    severityColor: "bg-red-600",
    location: "Bathroom Area",
    date: "25 Jan 2025, 12:15",
    camera: "Camera 09",
    image: behaviorImage5,
    status: "Medical Response",
    priority: "Critical"
  },
  {
    id: 11,
    type: "Crowd Movement",
    severity: "INFO",
    severityColor: "bg-blue-500",
    location: "Exit Area",
    date: "25 Jan 2025, 12:00",
    camera: "Camera 10",
    image: behaviorImage1,
    status: "Normal",
    priority: "Low"
  },
  {
    id: 12,
    type: "Smoking Detected",
    severity: "WARNING",
    severityColor: "bg-orange-500",
    location: "Parking Area",
    date: "25 Jan 2025, 11:45",
    camera: "Camera 11",
    image: behaviorImage2,
    status: "Warning Issued",
    priority: "Low"
  }
];

export const BehaviorEventsPage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCamera, setFilterCamera] = useState("all");
  const [filterSite, setFilterSite] = useState("all");
  const [filterZone, setFilterZone] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter states for behavior categories
  const [behaviorFilters, setBehaviorFilters] = useState({
    fightDetection: false,
    falls: false,
    crowdMovement: false,
    smoking: false,
    running: false,
    calling: false,
    weapon: false,
    gathering: false
  });
  
  const [severityFilters, setSeverityFilters] = useState({
    critical: false,
    warning: false,
    info: false
  });

  // Handle filter changes for behavior categories
  const handleBehaviorFilterChange = (filterKey: string, checked: boolean) => {
    setBehaviorFilters(prev => ({
      ...prev,
      [filterKey]: checked
    }));
  };

  // Handle filter changes for severity
  const handleSeverityFilterChange = (filterKey: string, checked: boolean) => {
    setSeverityFilters(prev => ({
      ...prev,
      [filterKey]: checked
    }));
  };

  // Filter events based on selected filters
  const filteredEvents = behaviorEventsData.filter(event => {
    // Search query filter
    if (searchQuery && !event.type.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Camera filter
    if (filterCamera !== "all" && !event.camera.toLowerCase().includes(filterCamera.toLowerCase())) {
      return false;
    }

    // Date range filter
    if (startDate && new Date(event.date) < new Date(startDate)) {
      return false;
    }
    if (endDate && new Date(event.date) > new Date(endDate)) {
      return false;
    }

    // Behavior type filters
    const behaviorFiltersActive = Object.values(behaviorFilters).some(Boolean);
    if (behaviorFiltersActive) {
      const eventType = event.type.toLowerCase();
      if (behaviorFilters.fightDetection && !eventType.includes('fight')) return false;
      if (behaviorFilters.falls && !eventType.includes('fall')) return false;
      if (behaviorFilters.crowdMovement && !eventType.includes('crowd')) return false;
      if (behaviorFilters.smoking && !eventType.includes('smoking')) return false;
      if (behaviorFilters.running && !eventType.includes('running')) return false;
      if (behaviorFilters.calling && !eventType.includes('calling')) return false;
      if (behaviorFilters.weapon && !eventType.includes('weapon')) return false;
      if (behaviorFilters.gathering && !eventType.includes('gathering')) return false;
      
      // If no behavior filters match, exclude the event
      if (!(
        (behaviorFilters.fightDetection && eventType.includes('fight')) ||
        (behaviorFilters.falls && eventType.includes('fall')) ||
        (behaviorFilters.crowdMovement && eventType.includes('crowd')) ||
        (behaviorFilters.smoking && eventType.includes('smoking')) ||
        (behaviorFilters.running && eventType.includes('running')) ||
        (behaviorFilters.calling && eventType.includes('calling')) ||
        (behaviorFilters.weapon && eventType.includes('weapon')) ||
        (behaviorFilters.gathering && eventType.includes('gathering'))
      )) {
        return false;
      }
    }

    // Severity filters
    const severityFiltersActive = Object.values(severityFilters).some(Boolean);
    if (severityFiltersActive) {
      const eventSeverity = event.severity.toLowerCase();
      if (!(
        (severityFilters.critical && eventSeverity === 'critical') ||
        (severityFilters.warning && eventSeverity === 'warning') ||
        (severityFilters.info && eventSeverity === 'info')
      )) {
        return false;
      }
    }

    return true;
  });

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterCamera("all");
    setFilterSite("all");
    setFilterZone("all");
    setStartDate("");
    setEndDate("");
    setBehaviorFilters({
      fightDetection: false,
      falls: false,
      crowdMovement: false,
      smoking: false,
      running: false,
      calling: false,
      weapon: false,
      gathering: false
    });
    setSeverityFilters({
      critical: false,
      warning: false,
      info: false
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Behavior Events</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Monitor and manage behavior detection events</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={handleResetFilters}
              data-testid="button-reset-filters"
            >
              Reset Filters
            </Button>
            <Badge variant="secondary" className="bg-red-50 text-red-600">
              {filteredEvents.length} events
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Filters */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
          
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Events
            </label>
            <Input
              type="text"
              placeholder="Search by type or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              data-testid="input-search"
            />
          </div>

          {/* Camera Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Camera
            </label>
            <Select value={filterCamera} onValueChange={setFilterCamera}>
              <SelectTrigger data-testid="select-camera">
                <SelectValue placeholder="Select camera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cameras</SelectItem>
                <SelectItem value="camera 01">Camera 01</SelectItem>
                <SelectItem value="camera 02">Camera 02</SelectItem>
                <SelectItem value="camera 03">Camera 03</SelectItem>
                <SelectItem value="camera 04">Camera 04</SelectItem>
                <SelectItem value="camera 05">Camera 05</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Site Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Site
            </label>
            <Select value={filterSite} onValueChange={setFilterSite}>
              <SelectTrigger data-testid="select-site">
                <SelectValue placeholder="Select site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                <SelectItem value="site-a">Site A</SelectItem>
                <SelectItem value="site-b">Site B</SelectItem>
                <SelectItem value="site-c">Site C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Zone Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Zone
            </label>
            <Select value={filterZone} onValueChange={setFilterZone}>
              <SelectTrigger data-testid="select-zone">
                <SelectValue placeholder="Select zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Zones</SelectItem>
                <SelectItem value="entrance">Entrance Area</SelectItem>
                <SelectItem value="corridor">Corridor</SelectItem>
                <SelectItem value="assembly">Assembly Area</SelectItem>
                <SelectItem value="restricted">Restricted Area</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Range
            </label>
            <div className="space-y-2">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full"
                data-testid="input-start-date"
              />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full"
                data-testid="input-end-date"
              />
            </div>
          </div>

          {/* Behavior Type Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Behavior Types
            </label>
            <div className="space-y-2">
              {[
                { key: 'fightDetection', label: 'Fight Detection' },
                { key: 'falls', label: 'Falls' },
                { key: 'crowdMovement', label: 'Crowd Movement' },
                { key: 'smoking', label: 'Smoking' },
                { key: 'running', label: 'Running' },
                { key: 'calling', label: 'Calling' },
                { key: 'weapon', label: 'Weapon' },
                { key: 'gathering', label: 'Gathering' }
              ].map((filter) => (
                <div key={filter.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={filter.key}
                    checked={behaviorFilters[filter.key as keyof typeof behaviorFilters]}
                    onCheckedChange={(checked) => handleBehaviorFilterChange(filter.key, checked as boolean)}
                    data-testid={`checkbox-${filter.key}`}
                  />
                  <label
                    htmlFor={filter.key}
                    className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    {filter.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Severity Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Severity Level
            </label>
            <div className="space-y-2">
              {[
                { key: 'critical', label: 'Critical', color: 'text-red-600' },
                { key: 'warning', label: 'Warning', color: 'text-orange-500' },
                { key: 'info', label: 'Info', color: 'text-blue-500' }
              ].map((filter) => (
                <div key={filter.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={filter.key}
                    checked={severityFilters[filter.key as keyof typeof severityFilters]}
                    onCheckedChange={(checked) => handleSeverityFilterChange(filter.key, checked as boolean)}
                    data-testid={`checkbox-severity-${filter.key}`}
                  />
                  <label
                    htmlFor={filter.key}
                    className={`text-sm cursor-pointer ${filter.color}`}
                  >
                    {filter.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="space-y-4">
            {/* Events Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Behavior Events
              </h2>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="border-red-200 text-red-600">
                  Live Updates
                </Badge>
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => handleEventClick(event)}
                  data-testid={`event-card-${event.id}`}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Event Image */}
                      <div className="relative">
                        <img
                          src={event.image}
                          alt={event.type}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Badge 
                          className={`absolute top-2 right-2 ${event.severityColor} text-white text-xs`}
                        >
                          {event.severity}
                        </Badge>
                      </div>

                      {/* Event Details */}
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                          {event.type}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {event.location}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                          <span>{event.date}</span>
                          <span>{event.camera}</span>
                        </div>
                      </div>

                      {/* Status and Priority */}
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className="text-xs border-gray-300 text-gray-600"
                        >
                          {event.status}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            event.priority === 'Critical' ? 'border-red-300 text-red-600' :
                            event.priority === 'High' ? 'border-orange-300 text-orange-600' :
                            event.priority === 'Medium' ? 'border-yellow-300 text-yellow-600' :
                            'border-blue-300 text-blue-600'
                          }`}
                        >
                          {event.priority}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results Message */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-600 mb-2">
                  <Calendar className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No events found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default BehaviorEventsPage;