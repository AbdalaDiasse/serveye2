import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventDetailModal } from "@/components/EventDetailModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, Camera, MapPin, User, Users, Eye, UserCheck, UserX } from "lucide-react";

// Import personnel images
import businessmanPhoto from "@assets/generated_images/Security_capture_businessman_photo_2feb92d4.png";
import womanPhoto from "@assets/generated_images/Security_capture_woman_photo_e17e3828.png";
import casualManPhoto from "@assets/generated_images/Security_capture_casual_man_eb27432b.png";
import elderlyWomanPhoto from "@assets/generated_images/Security_capture_elderly_woman_37bac27b.png";
import youngManPhoto from "@assets/generated_images/Security_capture_young_man_e6e7c093.png";

export const CapturePage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCaptureType, setSelectedCaptureType] = useState("all");
  const [selectedCamera, setSelectedCamera] = useState("all");
  const [selectedSite, setSelectedSite] = useState("all");
  const [selectedZone, setSelectedZone] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedAgeRange, setSelectedAgeRange] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedCaptureDetail, setSelectedCaptureDetail] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchMode, setSearchMode] = useState("text"); // "text" or "face"

  // Handle search functionality
  const handleSearch = () => {
    console.log("Search triggered for:", searchQuery, "Mode:", searchMode);
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  // Apply filters functionality
  const applyFilters = () => {
    console.log("Filters applied:", { selectedCaptureType, selectedCamera, selectedSite, selectedZone, selectedGender, selectedAgeRange, dateFrom, dateTo });
  };

  // Reset filters functionality
  const resetFilters = () => {
    setSelectedCaptureType("all");
    setSelectedCamera("all");
    setSelectedSite("all");
    setSelectedZone("all");
    setSelectedGender("all");
    setSelectedAgeRange("all");
    setDateFrom("");
    setDateTo("");
    setSearchQuery("");
    setSearchMode("text");
  };

  // Sample personnel capture data
  const personnelCaptures = [
    {
      id: 1,
      title: "Homme d'affaires",
      description: "Détection faciale",
      camera: "Caméra 01",
      zone: "Entrée principale",
      timestamp: "27 Jan 2025, 14:32",
      gender: "Homme",
      age: 45,
      confidence: 98,
      status: "Reconnu",
      statusColor: "bg-green-500",
      thumbnail: businessmanPhoto,
      icon: User,
      attributes: ["Sans barbe", "Cheveux courts", "Sans lunettes"],
      type: "Visage"
    },
    {
      id: 2,
      title: "Femme professionnelle",
      description: "Détection faciale",
      camera: "Caméra 03",
      zone: "Bureau direction",
      timestamp: "27 Jan 2025, 14:28",
      gender: "Femme",
      age: 28,
      confidence: 94,
      status: "Inconnu",
      statusColor: "bg-yellow-500",
      thumbnail: womanPhoto,
      icon: User,
      attributes: ["Cheveux longs", "Sans lunettes", "Sans casquette"],
      type: "Visage"
    },
    {
      id: 3,
      title: "Homme décontracté",
      description: "Détection corporelle",
      camera: "Caméra 02",
      zone: "Zone de stockage",
      timestamp: "27 Jan 2025, 14:25",
      gender: "Homme",
      age: 35,
      confidence: 91,
      status: "Visiteur",
      statusColor: "bg-blue-500",
      thumbnail: casualManPhoto,
      icon: User,
      attributes: ["Barbe courte", "Cheveux bruns", "T-shirt"],
      type: "Corps"
    },
    {
      id: 4,
      title: "Femme âgée",
      description: "Détection faciale",
      camera: "Caméra 04",
      zone: "Réception",
      timestamp: "27 Jan 2025, 14:20",
      gender: "Femme",
      age: 62,
      confidence: 87,
      status: "Employé",
      statusColor: "bg-green-500",
      thumbnail: elderlyWomanPhoto,
      icon: User,
      attributes: ["Cheveux gris", "Lunettes", "Manteau"],
      type: "Visage"
    },
    {
      id: 5,
      title: "Jeune homme",
      description: "Détection corporelle",
      camera: "Caméra 01",
      zone: "Cafétéria",
      timestamp: "27 Jan 2025, 14:18",
      gender: "Homme",
      age: 29,
      confidence: 84,
      status: "Suspect",
      statusColor: "bg-red-500",
      thumbnail: youngManPhoto,
      icon: User,
      attributes: ["Jean bleu", "Chemise blanche", "Sac à dos"],
      type: "Corps"
    },
    {
      id: 6,
      title: "Employé sécurité",
      description: "Détection faciale",
      camera: "Caméra 05",
      zone: "Point de contrôle",
      timestamp: "27 Jan 2025, 14:15",
      gender: "Homme",
      age: 38,
      confidence: 96,
      status: "Autorisé",
      statusColor: "bg-green-500",
      thumbnail: businessmanPhoto,
      icon: User,
      attributes: ["Uniforme", "Badge visible", "Radio"],
      type: "Visage"
    },
    {
      id: 7,
      title: "Visiteur non identifié",
      description: "Détection corporelle",
      camera: "Caméra 06",
      zone: "Parking",
      timestamp: "27 Jan 2025, 14:12",
      gender: "Femme",
      age: 33,
      confidence: 78,
      status: "Non autorisé",
      statusColor: "bg-red-500",
      thumbnail: womanPhoto,
      icon: UserX,
      attributes: ["Veste noire", "Casquette", "Masque"],
      type: "Corps"
    },
    {
      id: 8,
      title: "Personnel maintenance",
      description: "Détection faciale",
      camera: "Caméra 07",
      zone: "Sous-sol technique",
      timestamp: "27 Jan 2025, 14:08",
      gender: "Homme",
      age: 52,
      confidence: 89,
      status: "Employé",
      statusColor: "bg-green-500",
      thumbnail: casualManPhoto,
      icon: User,
      attributes: ["Casque de sécurité", "Combinaison", "Outils"],
      type: "Visage"
    }
  ];

  // Filtered captures based on search query and filters
  const filteredCaptures = useMemo(() => {
    return personnelCaptures.filter(capture => {
      // Search query filter
      const matchesSearch = searchQuery === "" || 
        capture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        capture.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        capture.camera.toLowerCase().includes(searchQuery.toLowerCase()) ||
        capture.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        capture.attributes.some(attr => attr.toLowerCase().includes(searchQuery.toLowerCase()));

      // Capture type filter
      const matchesCaptureType = selectedCaptureType === "all" || 
        (selectedCaptureType === "face" && capture.type === "Visage") ||
        (selectedCaptureType === "body" && capture.type === "Corps") ||
        (selectedCaptureType === "person" && (capture.type === "Visage" || capture.type === "Corps"));

      // Camera filter
      const matchesCamera = selectedCamera === "all" || 
        capture.camera.toLowerCase().includes(selectedCamera.toLowerCase().replace("cam-", "caméra "));

      // Site filter (based on zone)
      const matchesSite = selectedSite === "all" || 
        capture.zone.toLowerCase().includes(selectedSite.toLowerCase());

      // Zone filter  
      const matchesZone = selectedZone === "all" || capture.zone.toLowerCase().includes(selectedZone.toLowerCase());

      // Gender filter
      const matchesGender = selectedGender === "all" || capture.gender === selectedGender;

      // Age range filter
      const matchesAgeRange = selectedAgeRange === "all" || 
        (selectedAgeRange === "18-30" && capture.age >= 18 && capture.age <= 30) ||
        (selectedAgeRange === "31-50" && capture.age >= 31 && capture.age <= 50) ||
        (selectedAgeRange === "51+" && capture.age >= 51);

      // Date filters
      const captureDate = new Date(capture.timestamp);
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo) : null;
      
      const matchesDateFrom = !fromDate || captureDate >= fromDate;
      const matchesDateTo = !toDate || captureDate <= toDate;

      return matchesSearch && matchesCaptureType && matchesCamera && matchesSite && matchesZone && matchesGender && matchesAgeRange && matchesDateFrom && matchesDateTo;
    });
  }, [personnelCaptures, searchQuery, selectedCaptureType, selectedCamera, selectedSite, selectedZone, selectedGender, selectedAgeRange, dateFrom, dateTo]);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-full">

      {/* Smart Search Section with Face Search Option */}
      <Card className="mb-6 border-2" style={{backgroundColor: '#f0fdfa', borderColor: '#3fb5b5'}}>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#3fb5b5'}}>
              {searchMode === "face" ? <User className="w-4 h-4 text-white" /> : <Search className="w-4 h-4 text-white" />}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Recherche de personnes
            </h3>
            <div className="ml-auto flex gap-2">
              <Button
                variant={searchMode === "text" ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchMode("text")}
                className={searchMode === "text" ? "text-white" : "border-gray-300"}
                style={searchMode === "text" ? {backgroundColor: '#3fb5b5', borderColor: '#3fb5b5'} : {}}
                data-testid="button-search-text"
              >
                <Search className="w-4 h-4 mr-2" />
                Texte
              </Button>
              <Button
                variant={searchMode === "face" ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchMode("face")}
                className={searchMode === "face" ? "text-white" : "border-gray-300"}
                style={searchMode === "face" ? {backgroundColor: '#3fb5b5', borderColor: '#3fb5b5'} : {}}
                data-testid="button-search-face"
              >
                <User className="w-4 h-4 mr-2" />
                Visage
              </Button>
            </div>
          </div>
          
          <div className="relative">
            {searchMode === "text" ? (
              <Textarea
                placeholder={`Décrivez ce que vous cherchez en langage naturel...
Exemples:
• 'Montrez-moi tous les hommes détectés aujourd'hui'
• 'Personnes avec lunettes dans la zone de réception'
• 'Femmes entre 30-40 ans caméra 01'`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-h-[120px] resize-none text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-[#3fb5b5] focus:ring-2 focus:ring-[#3fb5b5]/20 rounded-lg px-4 py-3 pr-32"
                data-testid="input-search-captures"
              />
            ) : (
              <div className="min-h-[120px] bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center gap-3">
                <User className="w-12 h-12" style={{color: '#3fb5b5'}} />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Recherche par visage</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Glissez une image ou cliquez pour sélectionner</p>
                </div>
                <Button 
                  size="sm" 
                  className="text-white"
                  style={{backgroundColor: '#3fb5b5'}}
                  data-testid="button-upload-face"
                >
                  Sélectionner une image
                </Button>
              </div>
            )}
            <Button 
              className="absolute bottom-3 right-3 text-white px-6 py-2 rounded-md hover:opacity-90"
              style={{backgroundColor: '#3fb5b5'}}
              data-testid="button-search"
              onClick={handleSearch}
            >
              {searchMode === "face" ? <User className="w-4 h-4 mr-2" /> : <Search className="w-4 h-4 mr-2" />}
              Rechercher
            </Button>
          </div>

          <div className="flex gap-2 mt-4 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Suggestions:</span>
            <button 
              className="hover:underline" 
              style={{color: '#3fb5b5'}}
              data-testid="button-suggestion-employees"
              onClick={() => handleSuggestionClick("employé")}
            >
              Employés
            </button>
            <button 
              className="hover:underline" 
              style={{color: '#3fb5b5'}}
              data-testid="button-suggestion-visitors"
              onClick={() => handleSuggestionClick("visiteur")}
            >
              Visiteurs
            </button>
            <button 
              className="hover:underline" 
              style={{color: '#3fb5b5'}}
              data-testid="button-suggestion-faces"
              onClick={() => handleSuggestionClick("visage")}
            >
              Visages
            </button>
            <button 
              className="hover:underline" 
              style={{color: '#3fb5b5'}}
              data-testid="button-suggestion-unauthorized"
              onClick={() => handleSuggestionClick("non autorisé")}
            >
              Non autorisés
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
                className="text-white hover:opacity-90"
                style={{backgroundColor: '#3fb5b5', borderColor: '#3fb5b5'}}
                data-testid="button-apply-filters"
                onClick={applyFilters}
              >
                <Filter className="w-4 h-4 mr-2" />
                Apply
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Type de détection
              </label>
              <Select value={selectedCaptureType} onValueChange={setSelectedCaptureType}>
                <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-capture-type">
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="face">Visage</SelectItem>
                  <SelectItem value="body">Corps</SelectItem>
                  <SelectItem value="person">Personne</SelectItem>
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
                  <SelectItem value="cam-01">Caméra 01</SelectItem>
                  <SelectItem value="cam-02">Caméra 02</SelectItem>
                  <SelectItem value="cam-03">Caméra 03</SelectItem>
                  <SelectItem value="cam-04">Caméra 04</SelectItem>
                  <SelectItem value="cam-05">Caméra 05</SelectItem>
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
                  <SelectItem value="entrance">Entrée</SelectItem>
                  <SelectItem value="office">Bureau</SelectItem>
                  <SelectItem value="warehouse">Entrepôt</SelectItem>
                  <SelectItem value="parking">Parking</SelectItem>
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
                  <SelectItem value="reception">Réception</SelectItem>
                  <SelectItem value="cafeteria">Cafétéria</SelectItem>
                  <SelectItem value="storage">Stockage</SelectItem>
                  <SelectItem value="basement">Sous-sol</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Genre
              </label>
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-gender">
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="Homme">Homme</SelectItem>
                  <SelectItem value="Femme">Femme</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Âge
              </label>
              <Select value={selectedAgeRange} onValueChange={setSelectedAgeRange}>
                <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-age-range">
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="18-30">18-30 ans</SelectItem>
                  <SelectItem value="31-50">31-50 ans</SelectItem>
                  <SelectItem value="51+">51+ ans</SelectItem>
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

      {/* Captures Grid Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Personnes Détectées
          </h3>
          <div className="text-sm font-medium" style={{color: '#3fb5b5'}}>
            {filteredCaptures.length} détections
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCaptures.map((capture) => (
            <Card 
              key={capture.id} 
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative" 
              data-testid={`card-capture-${capture.id}`}
              onClick={() => {
                setSelectedCaptureDetail(capture);
                setIsModalOpen(true);
              }}
            >
              <div className="relative">
                <img 
                  src={capture.thumbnail} 
                  alt={capture.title}
                  className="w-full h-48 object-cover"
                />
                {/* Confidence badge */}
                <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold text-white" style={{backgroundColor: '#3fb5b5'}}>
                  {capture.confidence}%
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{backgroundColor: 'rgba(63, 181, 181, 0.1)'}}>
                    <capture.icon className="w-4 h-4" style={{color: '#3fb5b5'}} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {capture.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {capture.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Camera className="w-3 h-3" />
                    <span>{capture.camera}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{capture.zone}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <User className="w-3 h-3" />
                    <span>{capture.gender}, {capture.age} ans</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>{capture.timestamp}</span>
                    </div>
                    {/* Status Badge */}
                    <div className={`border-2 text-xs px-2 py-1 rounded-md font-medium bg-transparent ${
                      (capture.statusColor === 'bg-green-500' || capture.status === 'Reconnu' || capture.status === 'Employé' || capture.status === 'Autorisé') ? 'border-green-500 text-green-600 dark:border-green-400 dark:text-green-400' :
                      (capture.statusColor === 'bg-yellow-500' || capture.status === 'Inconnu') ? 'border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400' :
                      (capture.statusColor === 'bg-blue-500' || capture.status === 'Visiteur') ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' :
                      (capture.statusColor === 'bg-red-500' || capture.status === 'Suspect' || capture.status === 'Non autorisé') ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' :
                      'border-gray-500 text-gray-600 dark:border-gray-400 dark:text-gray-300'
                    }`}>
                      {capture.status}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Capture Detail Modal */}
      <EventDetailModal
        event={selectedCaptureDetail}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCaptureDetail(null);
        }}
      />
    </div>
  );
};

