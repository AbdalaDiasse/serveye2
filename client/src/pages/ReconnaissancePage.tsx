import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventDetailModal } from "@/components/EventDetailModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, Calendar, Camera, MapPin, Eye, User, UserCheck, UserX, Shield, Upload, FileText } from "lucide-react";

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
  const [searchMode, setSearchMode] = useState("text"); // "text" or "face"
  const [similarity, setSimilarity] = useState([80]);
  const [selectedPeriod, setSelectedPeriod] = useState("24h");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Handle file upload
  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleFileUpload(files[0]);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  // Handle search functionality
  const handleSearch = () => {
    console.log("Search triggered for:", searchQuery, "Mode:", searchMode, "File:", uploadedFile, "Similarity:", similarity[0]);
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
    setSearchMode("text");
    setSimilarity([80]);
    setSelectedPeriod("24h");
    setUploadedFile(null);
  };

  // Create array of personnel images for rotation
  const personnelImages = [businessmanPhoto, womanPhoto, casualManPhoto, elderlyWomanPhoto, youngManPhoto];

  // Sample recognition data matching the design
  const recognitionData = [
    {
      id: 1,
      title: "Marc Dubois - Reconnu",
      description: "Personnel autorisé identifié",
      camera: "Caméra A",
      zone: "Entrée principale",
      timestamp: "27 Jan 2025, 14:32",
      severity: "SUCCESS",
      severityColor: "bg-green-500",
      status: "Confirmed",
      statusColor: "bg-green-500",
      thumbnail: businessmanPhoto,
      icon: UserCheck,
      name: "Marc Dubois",
      recognitionStatus: "Reconnu",
      confidence: 92,
      gender: "Homme",
      age: 45,
      attributes: ["Costume", "Sans barbe", "Cheveux courts"]
    },
    {
      id: 2,
      title: "Personne inconnue - Investigation",
      description: "Personne non identifiée détectée",
      camera: "Caméra B",
      zone: "Zone de stockage",
      timestamp: "27 Jan 2025, 14:15",
      severity: "WARNING",
      severityColor: "bg-yellow-500",
      status: "Pending",
      statusColor: "bg-yellow-500",
      thumbnail: womanPhoto,
      icon: User,
      name: "Personne inconnue",
      recognitionStatus: "Inconnue",
      confidence: 45,
      gender: "Femme",
      age: 28,
      attributes: ["Veste rouge", "Cheveux longs", "Sans lunettes"]
    },
    {
      id: 3,
      title: "Pierre Martin - Employé",
      description: "Employé vérifié avec succès",
      camera: "Caméra C",
      zone: "Bureau administratif",
      timestamp: "27 Jan 2025, 14:28",
      severity: "SUCCESS",
      severityColor: "bg-green-500",
      status: "Confirmed",
      statusColor: "bg-green-500",
      thumbnail: casualManPhoto,
      icon: UserCheck,
      name: "Pierre Martin",
      recognitionStatus: "Reconnu",
      confidence: 88,
      gender: "Homme",
      age: 35,
      attributes: ["T-shirt bleu", "Barbe courte", "Cheveux bruns"]
    },
    {
      id: 4,
      title: "Alerte Suspect - Zone Restreinte",
      description: "Individu suspect identifié en zone interdite",
      camera: "Caméra D",
      zone: "Zone restreinte",
      timestamp: "27 Jan 2025, 13:30",
      severity: "CRITIQUE",
      severityColor: "bg-red-500",
      status: "Critical",
      statusColor: "bg-red-500",
      thumbnail: youngManPhoto,
      icon: UserX,
      name: "Personne suspecte",
      recognitionStatus: "Suspect",
      confidence: 27,
      gender: "Homme",
      age: 29,
      attributes: ["Sweat noir", "Capuche", "Jean foncé"]
    },
    {
      id: 5,
      title: "Jean Dupont - Visiteur",
      description: "Visiteur autorisé confirmé",
      camera: "Caméra E",
      zone: "Parking visiteurs",
      timestamp: "27 Jan 2025, 14:22",
      severity: "INFO",
      severityColor: "bg-blue-500",
      status: "Confirmed",
      statusColor: "bg-blue-500",
      thumbnail: businessmanPhoto,
      icon: User,
      name: "Jean Dupont",
      recognitionStatus: "Reconnu",
      confidence: 85,
      gender: "Homme",
      age: 52,
      attributes: ["Costume gris", "Cravate", "Lunettes"]
    },
    {
      id: 6,
      title: "Sophie Bernard - Réceptionniste",
      description: "Personnel d'accueil identifié",
      camera: "Caméra F",
      zone: "Réception",
      timestamp: "27 Jan 2025, 14:20",
      severity: "SUCCESS",
      severityColor: "bg-green-500",
      status: "Confirmed",
      statusColor: "bg-green-500",
      thumbnail: elderlyWomanPhoto,
      icon: UserCheck,
      name: "Sophie Bernard",
      recognitionStatus: "Reconnu",
      confidence: 90,
      gender: "Femme",
      age: 62,
      attributes: ["Robe jaune", "Cheveux gris", "Lunettes"]
    },
    {
      id: 7,
      title: "Personne non répertoriée",
      description: "Individu non répertorié détecté",
      camera: "Caméra G",
      zone: "Couloir niveau 2",
      timestamp: "27 Jan 2025, 14:12",
      severity: "WARNING",
      severityColor: "bg-yellow-500",
      status: "Pending",
      statusColor: "bg-yellow-500",
      thumbnail: casualManPhoto,
      icon: User,
      name: "Personne inconnue",
      recognitionStatus: "Inconnu",
      confidence: 35,
      gender: "Homme",
      age: 38,
      attributes: ["Chemise bleue", "Jean", "Sac à dos"]
    },
    {
      id: 8,
      title: "Marie Leroy - Technicienne",
      description: "Technicienne autorisée",
      camera: "Caméra H",
      zone: "Laboratoire",
      timestamp: "27 Jan 2025, 14:18",
      severity: "SUCCESS",
      severityColor: "bg-green-500",
      status: "Confirmed",
      statusColor: "bg-green-500",
      thumbnail: womanPhoto,
      icon: UserCheck,
      name: "Marie Leroy",
      recognitionStatus: "Reconnu",
      confidence: 93,
      gender: "Femme",
      age: 31,
      attributes: ["Blouse jaune", "Lunettes sécurité", "Badge"]
    }
  ];

  // Filtered recognitions based on search query and filters
  const filteredRecognitions = useMemo(() => {
    return recognitionData.filter(recognition => {
      // Search query filter
      const matchesSearch = searchQuery === "" || 
        recognition.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recognition.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recognition.camera.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recognition.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recognition.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = selectedStatus === "all" || 
        (selectedStatus === "recognized" && recognition.recognitionStatus === "Reconnu") ||
        (selectedStatus === "unknown" && (recognition.recognitionStatus === "Inconnue" || recognition.recognitionStatus === "Inconnu")) ||
        (selectedStatus === "suspect" && recognition.recognitionStatus === "Suspect");

      // Camera filter
      const matchesCamera = selectedCamera === "all" || 
        recognition.camera.toLowerCase().includes(selectedCamera.toLowerCase().replace("cam-", "caméra "));

      // Site filter (based on zone/description)
      const matchesSite = selectedSite === "all" || 
        recognition.zone.toLowerCase().includes(selectedSite.toLowerCase()) ||
        recognition.description.toLowerCase().includes(selectedSite.toLowerCase());

      // Zone filter  
      const matchesZone = selectedZone === "all" || recognition.zone.toLowerCase().includes(selectedZone.toLowerCase());

      // Confidence filter
      const matchesConfidence = selectedConfidence === "all" || 
        (selectedConfidence === "high" && recognition.confidence >= 80) ||
        (selectedConfidence === "medium" && recognition.confidence >= 50 && recognition.confidence < 80) ||
        (selectedConfidence === "low" && recognition.confidence < 50);

      // Gender filter
      const matchesGender = selectedGender === "all" || recognition.gender === selectedGender;

      // Date filters - basic date range checking
      const eventDate = new Date(recognition.timestamp);
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo) : null;
      
      const matchesDateFrom = !fromDate || eventDate >= fromDate;
      const matchesDateTo = !toDate || eventDate <= toDate;

      return matchesSearch && matchesStatus && matchesCamera && matchesSite && matchesZone && matchesConfidence && matchesGender && matchesDateFrom && matchesDateTo;
    });
  }, [recognitionData, searchQuery, selectedStatus, selectedCamera, selectedSite, selectedZone, selectedConfidence, selectedGender, dateFrom, dateTo]);

  // Handle clicking on a recognition card
  const handleRecognitionClick = (recognition: any) => {
    setSelectedRecognitionDetail({
      ...recognition,
      type: "Personnel",
      eventType: "Reconnaissance faciale",
      cameraAngle: "Vue frontale",
      recordingAvailable: true,
      aiAnalysis: `Analyse IA : Reconnaissance avec ${recognition.confidence}% de confiance. ${
        recognition.recognitionStatus === "Reconnu" ? "Personne autorisée identifiée avec succès." :
        recognition.recognitionStatus === "Suspect" ? "Individu potentiellement dangereux détecté." :
        "Personne non identifiée nécessitant vérification."
      }`,
      relatedEvents: [],
      evidence: [
        {
          type: "Image",
          description: "Capture du visage",
          timestamp: recognition.timestamp,
          url: recognition.thumbnail
        }
      ]
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-full">

      {/* Smart Search Section */}
      <Card className="mb-6 bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#3fb5b5] rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Recherche Intelligente
            </h3>
          </div>
          
          {/* Search Mode Toggle */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={searchMode === "text" ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchMode("text")}
              className={searchMode === "text" ? "bg-[#3fb5b5] hover:bg-[#3fb5b5]/90" : ""}
              data-testid="button-search-text"
            >
              <FileText className="w-4 h-4 mr-2" />
              Texte
            </Button>
            <Button
              variant={searchMode === "face" ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchMode("face")}
              className={searchMode === "face" ? "bg-[#3fb5b5] hover:bg-[#3fb5b5]/90" : ""}
              data-testid="button-search-face"
            >
              <Eye className="w-4 h-4 mr-2" />
              Visage
            </Button>
          </div>
          
          {searchMode === "text" ? (
            <div className="relative">
              <Textarea
                placeholder={`Décrivez ce que vous cherchez en langage naturel...
Exemples:
• 'Montre-moi toutes les personnes reconnues aujourd'hui'
• 'Suspects détectés cette semaine'
• 'Personnel avec faible score de confiance'`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-h-[120px] resize-none text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-[#3fb5b5] focus:ring-2 focus:ring-[#3fb5b5]/20 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg px-4 py-3 pr-32"
                data-testid="input-search-recognitions"
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
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {/* File Upload Section */}
              <div className="space-y-4">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragOver 
                      ? 'border-[#3fb5b5] bg-cyan-50 dark:bg-cyan-900/30' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  data-testid="file-upload-area"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                      <Upload className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      Glissez une photo ici
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      ou cliquez pour parcourir
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      JPG, PNG jusqu'à 10MB
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    data-testid="file-input"
                  />
                </div>
                {uploadedFile && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Fichier sélectionné: {uploadedFile.name}
                  </div>
                )}
              </div>

              {/* Search Controls */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Similarité
                  </label>
                  <div className="px-3">
                    <Slider
                      value={similarity}
                      onValueChange={setSimilarity}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                      data-testid="similarity-slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>0%</span>
                      <span className="font-medium text-[#3fb5b5]">{similarity[0]}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Période
                  </label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-period">
                      <SelectValue placeholder="Sélectionner une période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Dernières 24h</SelectItem>
                      <SelectItem value="7d">7 derniers jours</SelectItem>
                      <SelectItem value="30d">30 derniers jours</SelectItem>
                      <SelectItem value="all">Toute la période</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Caméras
                  </label>
                  <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                    <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-cameras-search">
                      <SelectValue placeholder="Sélectionner les caméras" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les caméras</SelectItem>
                      <SelectItem value="cam-a">Caméra A</SelectItem>
                      <SelectItem value="cam-b">Caméra B</SelectItem>
                      <SelectItem value="cam-c">Caméra C</SelectItem>
                      <SelectItem value="cam-d">Caméra D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full bg-[#3fb5b5] hover:bg-[#3fb5b5]/90 text-white py-3 mt-6" 
                  data-testid="button-search-face"
                  onClick={handleSearch}
                  disabled={!uploadedFile}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher ce visage
                </Button>
              </div>
            </div>
          )}

          <div className="flex gap-2 mt-6 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Suggestions:</span>
            <button 
              className="px-3 py-1 bg-[#3fb5b5] text-white rounded-full text-xs hover:bg-[#3fb5b5]/90" 
              data-testid="button-suggestion-suspects"
              onClick={() => handleSuggestionClick("suspect")}
            >
              Personnes suspectes
            </button>
            <button 
              className="px-3 py-1 bg-[#3fb5b5] text-white rounded-full text-xs hover:bg-[#3fb5b5]/90" 
              data-testid="button-suggestion-recurrents"
              onClick={() => handleSuggestionClick("récurrent")}
            >
              Visiteurs récurrents
            </button>
            <button 
              className="px-3 py-1 bg-[#3fb5b5] text-white rounded-full text-xs hover:bg-[#3fb5b5]/90" 
              data-testid="button-suggestion-autorise"
              onClick={() => handleSuggestionClick("autorisé")}
            >
              Personnel autorisé
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
                className="border-[#3fb5b5] text-[#3fb5b5] hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
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
                Statut
              </label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-status">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="recognized">Reconnu</SelectItem>
                  <SelectItem value="unknown">Inconnu</SelectItem>
                  <SelectItem value="suspect">Suspect</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Confiance
              </label>
              <Select value={selectedConfidence} onValueChange={setSelectedConfidence}>
                <SelectTrigger className="bg-white dark:bg-gray-700" data-testid="select-confidence">
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
                  <SelectItem value="cam-d">Caméra D</SelectItem>
                  <SelectItem value="cam-e">Caméra E</SelectItem>
                  <SelectItem value="cam-f">Caméra F</SelectItem>
                  <SelectItem value="cam-g">Caméra G</SelectItem>
                  <SelectItem value="cam-h">Caméra H</SelectItem>
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
                  <SelectItem value="principal">Site principal</SelectItem>
                  <SelectItem value="annexe">Site annexe</SelectItem>
                  <SelectItem value="entrepot">Entrepôt</SelectItem>
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
                  <SelectItem value="entree">Entrée principale</SelectItem>
                  <SelectItem value="stockage">Zone de stockage</SelectItem>
                  <SelectItem value="bureau">Bureau administratif</SelectItem>
                  <SelectItem value="restreinte">Zone restreinte</SelectItem>
                  <SelectItem value="parking">Parking visiteurs</SelectItem>
                  <SelectItem value="reception">Réception</SelectItem>
                  <SelectItem value="laboratoire">Laboratoire</SelectItem>
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
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date de début
              </label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-white dark:bg-gray-700"
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
                className="bg-white dark:bg-gray-700"
                data-testid="input-date-to"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recognition Grid Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Reconnaissance Faciale
          </h3>
          <div className="text-sm text-[#3fb5b5] font-medium">
            {filteredRecognitions.length} reconnaissances
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRecognitions.map((recognition) => (
            <Card 
              key={recognition.id} 
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative" 
              data-testid={`card-recognition-${recognition.id}`}
              onClick={() => handleRecognitionClick(recognition)}
            >
              <div className="relative">
                <img 
                  src={recognition.thumbnail} 
                  alt={recognition.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start gap-2 mb-2">
                  <div className="w-8 h-8 bg-[#3fb5b5]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <recognition.icon className="w-4 h-4 text-[#3fb5b5]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1" data-testid={`text-title-${recognition.id}`}>
                      {recognition.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400" data-testid={`text-description-${recognition.id}`}>
                      {recognition.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Camera className="w-3 h-3" />
                    <span>{recognition.camera}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span data-testid={`text-zone-${recognition.id}`}>{recognition.zone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span data-testid={`text-timestamp-${recognition.id}`}>{recognition.timestamp}</span>
                    </div>
                    {/* Status and Confidence Badges */}
                    <div className="flex gap-1">
                      {/* Status Badge */}
                      <div className={`border-2 text-xs px-2 py-1 rounded-md font-medium bg-transparent ${
                        (recognition.statusColor === 'bg-green-500' || recognition.status === 'Confirmed') ? 'border-green-500 text-green-600 dark:border-green-400 dark:text-green-400' :
                        (recognition.statusColor === 'bg-yellow-500' || recognition.status === 'Pending') ? 'border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400' :
                        (recognition.statusColor === 'bg-blue-500' || recognition.status === 'New') ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' :
                        (recognition.statusColor === 'bg-red-500' || recognition.status === 'Critical') ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' :
                        'border-green-500 text-green-600 dark:border-green-400 dark:text-green-400'
                      }`}>
                        {recognition.status}
                      </div>
                      {/* Confidence Badge */}
                      <div className={`border-2 ${
                        recognition.confidence >= 80 
                          ? "border-green-500 text-green-600 dark:text-green-400" 
                          : recognition.confidence >= 50
                          ? "border-yellow-500 text-yellow-600 dark:text-yellow-400"
                          : "border-red-500 text-red-600 dark:text-red-400"
                      } bg-transparent text-xs px-2 py-1 rounded-md font-bold`}>
                        {recognition.confidence}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

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