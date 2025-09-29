import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventDetailModal } from "@/components/EventDetailModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, Camera, MapPin, User, Users, Eye, UserCheck, UserX, Shield } from "lucide-react";

// Import personnel images
import businessmanPhoto from "@assets/generated_images/Security_capture_businessman_photo_2feb92d4.png";
import womanPhoto from "@assets/generated_images/Security_capture_woman_photo_e17e3828.png";
import casualManPhoto from "@assets/generated_images/Security_capture_casual_man_eb27432b.png";
import elderlyWomanPhoto from "@assets/generated_images/Security_capture_elderly_woman_37bac27b.png";
import youngManPhoto from "@assets/generated_images/Security_capture_young_man_e6e7c093.png";

export const ReconnaissancePage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCamera, setSelectedCamera] = useState("all");
  const [selectedSite, setSelectedSite] = useState("all");
  const [selectedZone, setSelectedZone] = useState("all");
  const [selectedConfidence, setSelectedConfidence] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedRecognitionDetail, setSelectedRecognitionDetail] = useState<any>(null);
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
    console.log("Filters applied:", { selectedStatus, selectedCamera, selectedSite, selectedZone, selectedConfidence, selectedGender, dateFrom, dateTo });
  };

  // Reset filters functionality
  const resetFilters = () => {
    setSelectedStatus("all");
    setSelectedCamera("all");
    setSelectedSite("all");
    setSelectedZone("all");
    setSelectedConfidence("all");
    setSelectedGender("all");
    setDateFrom("");
    setDateTo("");
    setSearchQuery("");
  };

  // Create array of personnel images for rotation
  const personnelImages = [businessmanPhoto, womanPhoto, casualManPhoto, elderlyWomanPhoto, youngManPhoto];

  // Sample recognition data matching the design
  const recognitionData = [
    {
      id: 1,
      name: "Marc Dubois",
      status: "Reconnu",
      confidence: 92,
      camera: "Caméra 01",
      zone: "Entrée principale",
      timestamp: "27 Jan 2025, 14:32",
      severity: "SUCCESS",
      location: "Chemin bleu",
      details: "Parution noir",
      badge: "Sortie",
      image: businessmanPhoto,
      description: "Personnel autorisé identifié"
    },
    {
      id: 2,
      name: "Personne inconnue",
      status: "Inconnue",
      confidence: 45,
      camera: "Caméra 03",
      zone: "Zone de stockage",
      timestamp: "27 Jan 2025, 14:15",
      severity: "WARNING",
      location: "Zone grise",
      details: "Visite rouge",
      badge: "Jean bleu",
      image: womanPhoto,
      description: "Personne non identifiée détectée"
    },
    {
      id: 3,
      name: "Pierre Martin",
      status: "Reconnu",
      confidence: 88,
      camera: "Caméra 02",
      zone: "Bureau administratif",
      timestamp: "27 Jan 2025, 14:28",
      severity: "SUCCESS",
      location: "Zone grise",
      details: "Parution noir",
      badge: "Lunettes",
      image: casualManPhoto,
      description: "Employé vérifié avec succès"
    },
    {
      id: 4,
      name: "Personne suspecte",
      status: "Suspect",
      confidence: 27,
      camera: "Caméra 05",
      zone: "Zone restreinte",
      timestamp: "27 Jan 2025, 13:30",
      severity: "CRITICAL",
      location: "Zone rouge",
      details: "Sweat noir",
      badge: "Jean bleu",
      image: youngManPhoto,
      description: "Individu suspect identifié en zone interdite"
    },
    {
      id: 5,
      name: "Jean Dupont",
      status: "Reconnu",
      confidence: 85,
      camera: "Caméra 04",
      zone: "Parking visiteurs",
      timestamp: "27 Jan 2025, 14:22",
      severity: "SUCCESS",
      location: "Chemin bleu",
      details: "T-shirt blanc",
      badge: "Jean bleu",
      image: businessmanPhoto,
      description: "Visiteur autorisé confirmé"
    },
    {
      id: 6,
      name: "Sophie Bernard",
      status: "Reconnu",
      confidence: 90,
      camera: "Caméra 06",
      zone: "Réception",
      timestamp: "27 Jan 2025, 14:20",
      severity: "SUCCESS",
      location: "Zone verte",
      details: "Robe jaune",
      badge: "Parution noir",
      image: elderlyWomanPhoto,
      description: "Personnel d'accueil identifié"
    },
    {
      id: 7,
      name: "Personne inconnue",
      status: "Inconnu",
      confidence: 35,
      camera: "Caméra 07",
      zone: "Couloir niveau 2",
      timestamp: "27 Jan 2025, 14:12",
      severity: "WARNING",
      location: "Zone orange",
      details: "Chemise bleue",
      badge: "Parution beige",
      image: casualManPhoto,
      description: "Individu non répertorié détecté"
    },
    {
      id: 8,
      name: "Marie Leroy",
      status: "Reconnu",
      confidence: 93,
      camera: "Caméra 01",
      zone: "Laboratoire",
      timestamp: "27 Jan 2025, 14:18",
      severity: "SUCCESS",
      location: "Zone verte",
      details: "Blouse jaune",
      badge: "Parution noir",
      image: womanPhoto,
      description: "Technicienne autorisée"
    }
  ];

  // Filter the data based on search query and filters
  const filteredRecognitions = useMemo(() => {
    return recognitionData.filter((recognition) => {
      const matchesSearch = !searchQuery || 
        recognition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recognition.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recognition.camera.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recognition.zone.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = selectedStatus === "all" || recognition.status === selectedStatus;
      const matchesCamera = selectedCamera === "all" || recognition.camera === selectedCamera;
      const matchesSite = selectedSite === "all" || recognition.zone.includes(selectedSite);
      const matchesZone = selectedZone === "all" || recognition.zone === selectedZone;
      const matchesConfidence = selectedConfidence === "all" || 
        (selectedConfidence === "high" && recognition.confidence >= 80) ||
        (selectedConfidence === "medium" && recognition.confidence >= 50 && recognition.confidence < 80) ||
        (selectedConfidence === "low" && recognition.confidence < 50);
      
      return matchesSearch && matchesStatus && matchesCamera && matchesSite && matchesZone && matchesConfidence;
    });
  }, [searchQuery, selectedStatus, selectedCamera, selectedSite, selectedZone, selectedConfidence]);

  // Get counts for status badges
  const getStatusCount = (status: string) => {
    return recognitionData.filter(r => r.status === status).length;
  };

  // Handle clicking on a recognition card
  const handleRecognitionClick = (recognition: any) => {
    setSelectedRecognitionDetail({
      ...recognition,
      type: "Personnel",
      eventType: "Reconnaissance faciale",
      cameraAngle: "Vue frontale",
      recordingAvailable: true,
      aiAnalysis: `Analyse IA : Reconnaissance avec ${recognition.confidence}% de confiance. ${
        recognition.status === "Reconnu" ? "Personne autorisée identifiée avec succès." :
        recognition.status === "Suspect" ? "Individu potentiellement dangereux détecté." :
        "Personne non identifiée nécessitant vérification."
      }`,
      relatedEvents: [],
      evidence: [
        {
          type: "Image",
          description: "Capture du visage",
          timestamp: recognition.timestamp,
          url: recognition.image
        }
      ]
    });
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 bg-teal-500 rounded-lg">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Reconnaissance Faciale</h1>
            <p className="text-gray-600 dark:text-gray-400">Système de reconnaissance et d'identification du personnel</p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Search className="w-5 h-5 text-teal-500" />
            Recherche et Filtres
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* AI Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Recherche intelligente IA
            </label>
            <Textarea
              placeholder="Décrivez ce que vous cherchez... (ex: 'Personnel avec faible confiance', 'Suspects détectés aujourd'hui', 'Reconnaissances en zone restreinte')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-h-[80px] resize-none"
              data-testid="input-ai-search"
            />
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Suggestions rapides:</span>
            {[
              "Personnel reconnu",
              "Faible confiance",
              "Zone restreinte",
              "Suspects détectés"
            ].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs h-7"
                data-testid={`button-suggestion-${suggestion.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {suggestion}
              </Button>
            ))}
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleSearch}
              className="bg-teal-500 hover:bg-teal-600 text-white"
              data-testid="button-search"
            >
              <Search className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
            <Button 
              variant="outline" 
              onClick={resetFilters}
              data-testid="button-reset-filters"
            >
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats and Filters Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Status Stats */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Filter className="w-4 h-4 text-teal-500" />
                Statuts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant={selectedStatus === "all" ? "default" : "outline"}
                onClick={() => setSelectedStatus("all")}
                className={`w-full justify-start ${
                  selectedStatus === "all" ? "bg-teal-500 hover:bg-teal-600" : ""
                }`}
                data-testid="button-filter-all-status"
              >
                <Users className="w-4 h-4 mr-2" />
                Tous ({recognitionData.length})
              </Button>
              <Button
                variant={selectedStatus === "Reconnu" ? "default" : "outline"}
                onClick={() => setSelectedStatus("Reconnu")}
                className={`w-full justify-start ${
                  selectedStatus === "Reconnu" ? "bg-green-500 hover:bg-green-600" : ""
                }`}
                data-testid="button-filter-recognized"
              >
                <UserCheck className="w-4 h-4 mr-2" />
                Reconnus ({getStatusCount("Reconnu")})
              </Button>
              <Button
                variant={selectedStatus === "Inconnue" || selectedStatus === "Inconnu" ? "default" : "outline"}
                onClick={() => setSelectedStatus("Inconnue")}
                className={`w-full justify-start ${
                  selectedStatus === "Inconnue" || selectedStatus === "Inconnu" ? "bg-yellow-500 hover:bg-yellow-600" : ""
                }`}
                data-testid="button-filter-unknown"
              >
                <User className="w-4 h-4 mr-2" />
                Inconnus ({getStatusCount("Inconnue") + getStatusCount("Inconnu")})
              </Button>
              <Button
                variant={selectedStatus === "Suspect" ? "default" : "outline"}
                onClick={() => setSelectedStatus("Suspect")}
                className={`w-full justify-start ${
                  selectedStatus === "Suspect" ? "bg-red-500 hover:bg-red-600" : ""
                }`}
                data-testid="button-filter-suspect"
              >
                <UserX className="w-4 h-4 mr-2" />
                Suspects ({getStatusCount("Suspect")})
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Filters Panel */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Filter className="w-4 h-4 text-teal-500" />
                Filtres détaillés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Confidence Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Niveau de confiance
                  </label>
                  <Select value={selectedConfidence} onValueChange={setSelectedConfidence}>
                    <SelectTrigger data-testid="select-confidence">
                      <SelectValue placeholder="Tous niveaux" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous niveaux</SelectItem>
                      <SelectItem value="high">Élevé (80%+)</SelectItem>
                      <SelectItem value="medium">Moyen (50-80%)</SelectItem>
                      <SelectItem value="low">Faible (&lt;50%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Camera Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Caméra
                  </label>
                  <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                    <SelectTrigger data-testid="select-camera">
                      <SelectValue placeholder="Toutes caméras" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes caméras</SelectItem>
                      <SelectItem value="Caméra 01">Caméra 01</SelectItem>
                      <SelectItem value="Caméra 02">Caméra 02</SelectItem>
                      <SelectItem value="Caméra 03">Caméra 03</SelectItem>
                      <SelectItem value="Caméra 04">Caméra 04</SelectItem>
                      <SelectItem value="Caméra 05">Caméra 05</SelectItem>
                      <SelectItem value="Caméra 06">Caméra 06</SelectItem>
                      <SelectItem value="Caméra 07">Caméra 07</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Site Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Site
                  </label>
                  <Select value={selectedSite} onValueChange={setSelectedSite}>
                    <SelectTrigger data-testid="select-site">
                      <SelectValue placeholder="Tous sites" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous sites</SelectItem>
                      <SelectItem value="Principal">Site principal</SelectItem>
                      <SelectItem value="Annexe">Site annexe</SelectItem>
                      <SelectItem value="Entrepôt">Entrepôt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Zone Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Zone
                  </label>
                  <Select value={selectedZone} onValueChange={setSelectedZone}>
                    <SelectTrigger data-testid="select-zone">
                      <SelectValue placeholder="Toutes zones" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes zones</SelectItem>
                      <SelectItem value="Entrée principale">Entrée principale</SelectItem>
                      <SelectItem value="Zone de stockage">Zone de stockage</SelectItem>
                      <SelectItem value="Bureau administratif">Bureau administratif</SelectItem>
                      <SelectItem value="Zone restreinte">Zone restreinte</SelectItem>
                      <SelectItem value="Parking visiteurs">Parking visiteurs</SelectItem>
                      <SelectItem value="Réception">Réception</SelectItem>
                      <SelectItem value="Laboratoire">Laboratoire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date de début
                  </label>
                  <Input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    data-testid="input-date-from"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date de fin
                  </label>
                  <Input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    data-testid="input-date-to"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button 
                  onClick={applyFilters}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                  data-testid="button-apply-filters"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Appliquer filtres
                </Button>
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  {filteredRecognitions.length} résultat(s) trouvé(s)
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Results Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-teal-500" />
            Résultats de reconnaissance ({filteredRecognitions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredRecognitions.map((recognition) => (
              <Card
                key={recognition.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-l-teal-500"
                onClick={() => handleRecognitionClick(recognition)}
                data-testid={`card-recognition-${recognition.id}`}
              >
                <CardContent className="p-4">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      recognition.status === "Reconnu" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                      recognition.status === "Suspect" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" :
                      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}>
                      {recognition.status}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ID: {recognition.id.toString().padStart(4, '0')}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative mb-3">
                    <img
                      src={recognition.image}
                      alt={recognition.name}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    {/* Confidence overlay */}
                    <div className="absolute bottom-2 left-2 bg-black/75 text-white px-2 py-1 rounded text-xs">
                      {recognition.confidence}%
                    </div>
                    {/* Camera overlay */}
                    <div className="absolute bottom-2 right-2 bg-teal-500 text-white px-2 py-1 rounded text-xs">
                      <Camera className="w-3 h-3 inline mr-1" />
                      {recognition.camera.replace("Caméra ", "")}
                    </div>
                  </div>

                  {/* Person Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm" data-testid={`text-name-${recognition.id}`}>
                      {recognition.name}
                    </h3>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span data-testid={`text-zone-${recognition.id}`}>{recognition.zone}</span>
                    </div>
                    
                    <div className="text-xs text-gray-500 dark:text-gray-400" data-testid={`text-timestamp-${recognition.id}`}>
                      {recognition.timestamp}
                    </div>

                    {/* Confidence Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">Confiance</span>
                        <span className={`font-medium ${
                          recognition.confidence >= 80 ? "text-green-600" :
                          recognition.confidence >= 50 ? "text-yellow-600" :
                          "text-red-600"
                        }`}>
                          {recognition.confidence}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            recognition.confidence >= 80 ? "bg-green-500" :
                            recognition.confidence >= 50 ? "bg-yellow-500" :
                            "bg-red-500"
                          }`}
                          style={{ width: `${recognition.confidence}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Details */}
                    <div className="flex flex-wrap gap-1">
                      {recognition.details && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded">
                          {recognition.details}
                        </span>
                      )}
                      {recognition.badge && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded">
                          {recognition.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredRecognitions.length === 0 && (
            <div className="text-center py-12">
              <Eye className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Aucune reconnaissance trouvée
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Aucun résultat ne correspond à vos critères de recherche.
              </p>
              <Button 
                onClick={resetFilters}
                variant="outline"
                data-testid="button-reset-empty-state"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recognition Detail Modal */}
      <EventDetailModal
        event={selectedRecognitionDetail}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRecognitionDetail(null);
        }}
      />
    </div>
  );
};