import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "lucide-react";

// Import des images depuis les assets générés
import businessmanPhoto from "@assets/generated_images/Security_capture_businessman_photo_2feb92d4.png";
import womanPhoto from "@assets/generated_images/Security_capture_woman_photo_e17e3828.png";
import casualManPhoto from "@assets/generated_images/Security_capture_casual_man_eb27432b.png";
import elderlyWomanPhoto from "@assets/generated_images/Security_capture_elderly_woman_37bac27b.png";
import youngManPhoto from "@assets/generated_images/Security_capture_young_man_e6e7c093.png";

// Données des événements
const eventsData = [
  {
    id: 1,
    type: "Intrusion détectée",
    severity: "CRITIQUE",
    severityColor: "bg-red-600",
    location: "Zone de stockage",
    date: "23 Jan 2025, 14:32",
    camera: "Caméra 02",
    image: businessmanPhoto
  },
  {
    id: 2,
    type: "EPI manquant - Casque",
    severity: "ATTENTION",
    severityColor: "bg-orange-500",
    location: "Zone de production",
    date: "23 Jan 2025, 14:31",
    camera: "Caméra 03",
    image: youngManPhoto
  },
  {
    id: 3,
    type: "Fumée détectée",
    severity: "CRITIQUE",
    severityColor: "bg-red-600",
    location: "Zone de stockage",
    date: "23 Jan 2025, 14:15",
    camera: "Caméra 05",
    image: womanPhoto
  },
  {
    id: 4,
    type: "Bagarre détectée",
    severity: "CRITIQUE",
    severityColor: "bg-red-600",
    location: "Entrée principale",
    date: "23 Jan 2025, 13:48",
    camera: "Caméra 01",
    image: casualManPhoto
  },
  {
    id: 5,
    type: "Franchissement de ligne",
    severity: "ATTENTION",
    severityColor: "bg-orange-500",
    location: "Ligne de sécurité",
    date: "23 Jan 2025, 13:40",
    camera: "Caméra 04",
    image: elderlyWomanPhoto
  },
  {
    id: 6,
    type: "EPI manquant - Veste",
    severity: "ATTENTION",
    severityColor: "bg-orange-500",
    location: "Zone de production",
    date: "23 Jan 2025, 13:32",
    camera: "Caméra 06",
    image: businessmanPhoto
  },
  {
    id: 7,
    type: "Fumée détectée",
    severity: "CRITIQUE",
    severityColor: "bg-red-600",
    location: "Zone de production",
    date: "23 Jan 2025, 13:00",
    camera: "Caméra 01",
    image: youngManPhoto
  },
  {
    id: 8,
    type: "Fumée détectée",
    severity: "CRITIQUE",
    severityColor: "bg-red-600",
    location: "Zone de production",
    date: "23 Jan 2025, 12:45",
    camera: "Caméra 02",
    image: womanPhoto
  },
  {
    id: 9,
    type: "Incendie détecté",
    severity: "CRITIQUE",
    severityColor: "bg-red-600",
    location: "Zone de production",
    date: "23 Jan 2025, 12:30",
    camera: "Caméra 04",
    image: casualManPhoto
  },
  {
    id: 10,
    type: "Personne manquante",
    severity: "CRITIQUE",
    severityColor: "bg-red-600",
    location: "Zone de production",
    date: "23 Jan 2025, 12:15",
    camera: "Caméra 05",
    image: elderlyWomanPhoto
  },
  {
    id: 11,
    type: "Escalade de mur",
    severity: "CRITIQUE",
    severityColor: "bg-red-600",
    location: "Périmètre de sécurité",
    date: "23 Jan 2025, 12:00",
    camera: "Caméra 08",
    image: businessmanPhoto
  },
  {
    id: 12,
    type: "EPI manquant - Harnais",
    severity: "ALERTE",
    severityColor: "bg-yellow-500",
    location: "Zone en hauteur",
    date: "23 Jan 2025, 11:45",
    camera: "Caméra 07",
    image: youngManPhoto
  },
  {
    id: 13,
    type: "Port d'arme détecté",
    severity: "CRITIQUE",
    severityColor: "bg-red-600",
    location: "Entrée principale",
    date: "23 Jan 2025, 11:30",
    camera: "Caméra 01",
    image: casualManPhoto
  }
];

export const EventsPage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCamera, setFilterCamera] = useState("all");
  const [filterSite, setFilterSite] = useState("all");
  const [filterZone, setFilterZone] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  // États pour les filtres par catégorie avec checkboxes
  const [surveillanceFilters, setSurveillanceFilters] = useState({
    intrusion: false,
    escalade: false,
    lineCrossing: false,
    errance: false
  });
  
  const [epiFilters, setEpiFilters] = useState({
    casque: false,
    veste: false,
    harnais: false,
    uniforme: false,
    masque: false
  });
  
  const [incendieFilters, setIncendieFilters] = useState({
    feux: false,
    fumee: false,
    fuiteLiquide: false
  });
  
  const [productiviteFilters, setProductiviteFilters] = useState({
    surnombre: false,
    sousNombre: false
  });
  
  const [comportementFilters, setComportementFilters] = useState({
    bagarre: false,
    fumer: false,
    portArme: false,
    regroupement: false
  });

  // Fonction de filtrage des événements
  const getFilteredEvents = () => {
    return eventsData.filter(event => {
      // Filtres par caméras
      if (filterCamera !== "all") {
        const cameraNumber = filterCamera.replace("cam", "").padStart(2, "0");
        if (!event.camera.includes(cameraNumber)) return false;
      }

      // Filtres par sites (pour l'exemple, on associe selon la zone)
      if (filterSite !== "all") {
        if (filterSite === "principal" && !event.location.includes("production")) return false;
        if (filterSite === "secondaire" && !event.location.includes("stockage")) return false;
      }

      // Filtres par zones
      if (filterZone !== "all") {
        if (filterZone === "production" && !event.location.includes("production")) return false;
        if (filterZone === "stockage" && !event.location.includes("stockage")) return false;
        if (filterZone === "entree" && !event.location.includes("Entrée")) return false;
      }

      // Vérifier si au moins un filtre de catégorie est sélectionné
      const hasAnyFilterSelected = Object.values(surveillanceFilters).some(v => v) ||
                                   Object.values(epiFilters).some(v => v) ||
                                   Object.values(incendieFilters).some(v => v) ||
                                   Object.values(productiviteFilters).some(v => v) ||
                                   Object.values(comportementFilters).some(v => v);

      // Si aucun filtre n'est sélectionné, afficher tous les événements
      if (!hasAnyFilterSelected) return true;

      // Filtres par surveillance de zone
      if (surveillanceFilters.intrusion && event.type.includes("Intrusion")) return true;
      if (surveillanceFilters.escalade && event.type.includes("Escalade")) return true;
      if (surveillanceFilters.lineCrossing && event.type.includes("Franchissement")) return true;
      if (surveillanceFilters.errance && event.type.includes("Errance")) return true;

      // Filtres par EPI
      if (epiFilters.casque && event.type.includes("Casque")) return true;
      if (epiFilters.veste && event.type.includes("Veste")) return true;
      if (epiFilters.harnais && event.type.includes("Harnais")) return true;
      if (epiFilters.uniforme && event.type.includes("Uniforme")) return true;
      if (epiFilters.masque && event.type.includes("Masque")) return true;

      // Filtres par incendie
      if (incendieFilters.feux && event.type.includes("Incendie")) return true;
      if (incendieFilters.fumee && event.type.includes("Fumée")) return true;
      if (incendieFilters.fuiteLiquide && event.type.includes("Fuite")) return true;

      // Filtres par productivité
      if (productiviteFilters.surnombre && event.type.includes("Surnombre")) return true;
      if (productiviteFilters.sousNombre && event.type.includes("manquante")) return true;

      // Filtres par comportement
      if (comportementFilters.bagarre && event.type.includes("Bagarre")) return true;
      if (comportementFilters.fumer && event.type.includes("Fumer")) return true;
      if (comportementFilters.portArme && event.type.includes("Port d'arme")) return true;
      if (comportementFilters.regroupement && event.type.includes("Regroupement")) return true;

      return false;
    });
  };

  const filteredEvents = getFilteredEvents();
  const totalEvents = filteredEvents.length;

  return (
    <div className="w-full min-h-screen relative">
      <div className="px-8 py-6">
        {/* Section Recherche Intelligente - Pleine largeur */}
        <Card className="mb-6 bg-red-50/50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{background: 'none'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-800 [font-family:'Inter',Helvetica]">
                Recherche intelligente
              </h2>
            </div>
            
            <div className="space-y-3">
              <textarea
                placeholder="Décrivez ce que vous cherchez en langage naturel...&#10;Exemples:&#10;• 'Montrer moi toutes les intrusions d'hier'&#10;• 'Événements sur feu et fumée cette semaine'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-red-200 rounded-lg text-slate-700 placeholder:text-slate-400 placeholder:text-xs min-h-[80px] resize-none [font-family:'Inter',Helvetica] text-sm"
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs border-red-200 text-red-600">
                    Intrusions récentes
                  </Badge>
                  <Badge variant="outline" className="text-xs border-red-200 text-red-600">
                    EPI manquants
                  </Badge>
                  <Badge variant="outline" className="text-xs border-red-200 text-red-600">
                    Incidents incendie
                  </Badge>
                </div>
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{background: 'none'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Rechercher
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contenu principal avec sidebar et grille */}
        <div className="flex gap-6">
          {/* Sidebar Filtres */}
          <aside className="w-80 bg-white border border-gray-200 rounded-lg h-fit">
            <div className="p-6">
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2 [font-family:'Inter',Helvetica]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{background: 'none'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filtres
              </h3>

              {/* Caméras - DÉPLACÉ EN PREMIER */}
              <div className="mb-4">
                <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                  Caméras
                </label>
                <Select value={filterCamera} onValueChange={setFilterCamera}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Toutes les caméras" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les caméras</SelectItem>
                    <SelectItem value="cam1">Caméra 01</SelectItem>
                    <SelectItem value="cam2">Caméra 02</SelectItem>
                    <SelectItem value="cam3">Caméra 03</SelectItem>
                    <SelectItem value="cam4">Caméra 04</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sites */}
              <div className="mb-4">
                <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                  Sites
                </label>
                <Select value={filterSite} onValueChange={setFilterSite}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tous les sites" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les sites</SelectItem>
                    <SelectItem value="principal">Site Principal</SelectItem>
                    <SelectItem value="secondaire">Site Secondaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Zones */}
              <div className="mb-4">
                <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                  Zones
                </label>
                <Select value={filterZone} onValueChange={setFilterZone}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Toutes les zones" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les zones</SelectItem>
                    <SelectItem value="production">Zone de production</SelectItem>
                    <SelectItem value="stockage">Zone de stockage</SelectItem>
                    <SelectItem value="entree">Entrée principale</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Période */}
              <div className="mb-6">
                <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                  Période
                </label>
                <div className="space-y-2">
                  <div className="relative">
                    <Input 
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="pl-3 pr-10"
                      placeholder="mm / dd / yy"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" style={{background: 'none'}} />
                  </div>
                  <div className="relative">
                    <Input 
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="pl-3 pr-10"
                      placeholder="mm / dd / yy"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" style={{background: 'none'}} />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4"></div>

              {/* Surveillance de Zone */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-slate-700 mb-2 [font-family:'Inter',Helvetica]">
                  Surveillance de Zone
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={surveillanceFilters.intrusion}
                      onCheckedChange={(checked) => setSurveillanceFilters({...surveillanceFilters, intrusion: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Intrusion</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={surveillanceFilters.escalade}
                      onCheckedChange={(checked) => setSurveillanceFilters({...surveillanceFilters, escalade: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Escalade de mur</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={surveillanceFilters.lineCrossing}
                      onCheckedChange={(checked) => setSurveillanceFilters({...surveillanceFilters, lineCrossing: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Line crossing</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={surveillanceFilters.errance}
                      onCheckedChange={(checked) => setSurveillanceFilters({...surveillanceFilters, errance: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Errance</span>
                  </label>
                </div>
              </div>

              {/* EPI */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-slate-700 mb-2 [font-family:'Inter',Helvetica]">
                  EPI
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={epiFilters.casque}
                      onCheckedChange={(checked) => setEpiFilters({...epiFilters, casque: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Casque</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={epiFilters.veste}
                      onCheckedChange={(checked) => setEpiFilters({...epiFilters, veste: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Veste</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={epiFilters.harnais}
                      onCheckedChange={(checked) => setEpiFilters({...epiFilters, harnais: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Harnais</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={epiFilters.uniforme}
                      onCheckedChange={(checked) => setEpiFilters({...epiFilters, uniforme: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Uniforme</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={epiFilters.masque}
                      onCheckedChange={(checked) => setEpiFilters({...epiFilters, masque: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Masque</span>
                  </label>
                </div>
              </div>

              {/* Incendie */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-slate-700 mb-2 [font-family:'Inter',Helvetica]">
                  Incendie
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={incendieFilters.feux}
                      onCheckedChange={(checked) => setIncendieFilters({...incendieFilters, feux: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Feux</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={incendieFilters.fumee}
                      onCheckedChange={(checked) => setIncendieFilters({...incendieFilters, fumee: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Fumée</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={incendieFilters.fuiteLiquide}
                      onCheckedChange={(checked) => setIncendieFilters({...incendieFilters, fuiteLiquide: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Fuite de liquide</span>
                  </label>
                </div>
              </div>

              {/* Productivité */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-slate-700 mb-2 [font-family:'Inter',Helvetica]">
                  Productivité
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={productiviteFilters.surnombre}
                      onCheckedChange={(checked) => setProductiviteFilters({...productiviteFilters, surnombre: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Surnombre</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={productiviteFilters.sousNombre}
                      onCheckedChange={(checked) => setProductiviteFilters({...productiviteFilters, sousNombre: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Sous-nombre</span>
                  </label>
                </div>
              </div>

              {/* Comportement */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-700 mb-2 [font-family:'Inter',Helvetica]">
                  Comportement
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={comportementFilters.bagarre}
                      onCheckedChange={(checked) => setComportementFilters({...comportementFilters, bagarre: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Bagarre</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={comportementFilters.fumer}
                      onCheckedChange={(checked) => setComportementFilters({...comportementFilters, fumer: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Fumer</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={comportementFilters.portArme}
                      onCheckedChange={(checked) => setComportementFilters({...comportementFilters, portArme: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Port d'arme</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={comportementFilters.regroupement}
                      onCheckedChange={(checked) => setComportementFilters({...comportementFilters, regroupement: !!checked})}
                      className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Regroupement</span>
                  </label>
                </div>
              </div>

              {/* Bouton Appliquer */}
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{background: 'none'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Appliquer les filtres
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-slate-800 [font-family:'Inter',Helvetica]">
                Événements Détectés
              </h2>
              <span className="text-sm text-red-600 font-medium [font-family:'Inter',Helvetica]">
                {totalEvents} événements
              </span>
            </div>

            {/* Grid des événements */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow cursor-pointer bg-white border border-gray-200">
                  <div className="relative">
                    <img 
                      src={event.image} 
                      alt={event.type}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge 
                      className={`absolute top-2 left-2 ${event.severityColor} text-white text-xs font-bold px-2 py-1`}
                    >
                      {event.severity}
                    </Badge>
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      {event.camera}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-800 text-sm mb-2 [font-family:'Inter',Helvetica]">
                      🔴 {event.type}
                    </h3>
                    <p className="text-xs text-slate-600 mb-2 [font-family:'Inter',Helvetica]">
                      {event.location}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-slate-500 [font-family:'Inter',Helvetica]">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{background: 'none'}}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.date}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};