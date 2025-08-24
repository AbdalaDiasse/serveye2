import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Données des événements de sécurité
const eventsGallery = [
  {
    id: 1,
    type: "Intrusion",
    category: "Surveillance de zone",
    timestamp: "14:32:15",
    camera: "Caméra 01",
    zone: "Zone A",
    site: "Site Principal",
    severity: "high",
    description: "Détection d'intrusion dans zone restreinte",
    status: "active",
    today: "Aujourd'hui 14:32"
  },
  {
    id: 2,
    type: "Casque manquant",
    category: "EPI",
    timestamp: "14:28:42",
    camera: "Caméra 03",
    zone: "Zone B",
    site: "Site Principal",
    severity: "medium",
    description: "Personne sans casque dans zone chantier",
    status: "active",
    today: "Aujourd'hui 14:28"
  },
  {
    id: 3,
    type: "Fumée détectée",
    category: "Incendie",
    timestamp: "14:25:17",
    camera: "Caméra 02",
    zone: "Zone C",
    site: "Site Secondaire",
    severity: "critical",
    description: "Détection de fumée anormale",
    status: "resolved",
    today: "Aujourd'hui 14:25"
  },
  {
    id: 4,
    type: "Surnombre",
    category: "Productivité",
    timestamp: "14:20:58",
    camera: "Caméra 04",
    zone: "Zone D",
    site: "Site Principal",
    severity: "low",
    description: "Trop de personnes dans la zone",
    status: "active",
    today: "Aujourd'hui 14:20"
  },
  {
    id: 5,
    type: "Bagarre",
    category: "Comportement",
    timestamp: "14:18:33",
    camera: "Caméra 01",
    zone: "Zone A",
    site: "Site Principal",
    severity: "critical",
    description: "Altercation détectée entre individus",
    status: "resolved",
    today: "Aujourd'hui 14:18"
  },
  {
    id: 6,
    type: "Line crossing",
    category: "Surveillance de zone",
    timestamp: "14:15:42",
    camera: "Caméra 03",
    zone: "Zone B",
    site: "Site Principal",
    severity: "medium",
    description: "Franchissement de ligne interdite",
    status: "active",
    today: "Aujourd'hui 14:15"
  },
  {
    id: 7,
    type: "Veste manquante",
    category: "EPI",
    timestamp: "14:12:11",
    camera: "Caméra 02",
    zone: "Zone C",
    site: "Site Secondaire",
    severity: "medium",
    description: "Personnel sans veste de sécurité",
    status: "active",
    today: "Aujourd'hui 14:12"
  },
  {
    id: 8,
    type: "Feu détecté",
    category: "Incendie",
    timestamp: "14:08:27",
    camera: "Caméra 04",
    zone: "Zone D",
    site: "Site Principal",
    severity: "critical",
    description: "Détection de flammes",
    status: "resolved",
    today: "Aujourd'hui 14:08"
  },
  {
    id: 9,
    type: "Escalade de mur",
    category: "Surveillance de zone",
    timestamp: "14:05:14",
    camera: "Caméra 01",
    zone: "Zone A",
    site: "Site Principal",
    severity: "high",
    description: "Tentative d'escalade du périmètre",
    status: "active",
    today: "Aujourd'hui 14:05"
  },
  {
    id: 10,
    type: "Sous nombre",
    category: "Productivité",
    timestamp: "14:02:39",
    camera: "Caméra 03",
    zone: "Zone B",
    site: "Site Principal",
    severity: "low",
    description: "Effectif insuffisant dans la zone",
    status: "active",
    today: "Aujourd'hui 14:02"
  },
  {
    id: 11,
    type: "Port d'arme",
    category: "Comportement",
    timestamp: "13:58:56",
    camera: "Caméra 02",
    zone: "Zone C",
    site: "Site Secondaire",
    severity: "critical",
    description: "Arme détectée sur individu",
    status: "resolved",
    today: "Aujourd'hui 13:58"
  },
  {
    id: 12,
    type: "Fuite de liquide",
    category: "Incendie",
    timestamp: "13:55:21",
    camera: "Caméra 04",
    zone: "Zone D",
    site: "Site Principal",
    severity: "high",
    description: "Fuite de liquide inflammable détectée",
    status: "active",
    today: "Aujourd'hui 13:55"
  }
];

export const EventsPage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [filterSite, setFilterSite] = useState("all");
  const [filterCamera, setFilterCamera] = useState("all");
  const [filterZone, setFilterZone] = useState("all");
  const [activeFilterMode, setActiveFilterMode] = useState("tous");
  
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

  const filteredEvents = eventsGallery.filter(event => {
    const matchesSearch = event.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.camera.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSite = filterSite === "all" || event.site === filterSite;
    const matchesCamera = filterCamera === "all" || event.camera === filterCamera;
    const matchesZone = filterZone === "all" || event.zone === filterZone;
    
    return matchesSearch && matchesSite && matchesCamera && matchesZone;
  });

  return (
    <div className="w-full min-h-screen relative">
      {/* Header */}
      <header className="w-full h-20 bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="flex items-center justify-between h-full px-8">
          <div className="flex items-center gap-6">
            <h1 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-2xl">
              Événements
            </h1>
            <p className="[font-family:'Inter',Helvetica] font-normal text-slate-500 text-sm">
              Alertes et incidents de sécurité
            </p>
          </div>

          {/* Actions droite */}
          <div className="flex items-center gap-4">
            {/* Barre de recherche */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 [font-family:'Inter',Helvetica]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Notification */}
            <div className="relative">
              <svg className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5V7a6 6 0 10-12 0v5l-5 5h5m5 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                3
              </span>
            </div>

            {/* Profil utilisateur */}
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
              <div className="text-left">
                <div className="[font-family:'Inter',Helvetica] font-semibold text-slate-800 text-sm">
                  admin admin
                </div>
                <div className="[font-family:'Inter',Helvetica] font-normal text-slate-500 text-xs">
                  Administrateur
                </div>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 py-6">
        {/* Section Filtres avancés */}
        <Card className="mb-6 bg-red-50/50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-800 [font-family:'Inter',Helvetica]">
                Filtres avancés
              </h2>
            </div>

            {/* Filtres de base */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {/* Période */}
              <div>
                <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                  Période
                </label>
                <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Toutes les périodes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les périodes</SelectItem>
                    <SelectItem value="1h">Dernière heure</SelectItem>
                    <SelectItem value="24h">Dernières 24h</SelectItem>
                    <SelectItem value="7d">Derniers 7 jours</SelectItem>
                    <SelectItem value="30d">Derniers 30 jours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Caméras */}
              <div>
                <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                  Caméras
                </label>
                <Select value={filterCamera} onValueChange={setFilterCamera}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Toutes les caméras" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les caméras</SelectItem>
                    <SelectItem value="Caméra 01">Caméra 01</SelectItem>
                    <SelectItem value="Caméra 02">Caméra 02</SelectItem>
                    <SelectItem value="Caméra 03">Caméra 03</SelectItem>
                    <SelectItem value="Caméra 04">Caméra 04</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Site */}
              <div>
                <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                  Site
                </label>
                <Select value={filterSite} onValueChange={setFilterSite}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tous les sites" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les sites</SelectItem>
                    <SelectItem value="Site Principal">Site Principal</SelectItem>
                    <SelectItem value="Site Secondaire">Site Secondaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Zone */}
              <div>
                <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                  Zone
                </label>
                <Select value={filterZone} onValueChange={setFilterZone}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Toutes les zones" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les zones</SelectItem>
                    <SelectItem value="Zone A">Zone A</SelectItem>
                    <SelectItem value="Zone B">Zone B</SelectItem>
                    <SelectItem value="Zone C">Zone C</SelectItem>
                    <SelectItem value="Zone D">Zone D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filtres par catégorie avec checkboxes */}
            <div className="space-y-4">
              {/* Surveillance de zone */}
              <div className="border border-red-200 rounded-lg p-4 bg-white">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 [font-family:'Inter',Helvetica]">
                  🎯 Surveillance de zone
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={surveillanceFilters.intrusion}
                      onCheckedChange={(checked) => setSurveillanceFilters({...surveillanceFilters, intrusion: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Intrusion</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={surveillanceFilters.escalade}
                      onCheckedChange={(checked) => setSurveillanceFilters({...surveillanceFilters, escalade: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Escalade de mur</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={surveillanceFilters.lineCrossing}
                      onCheckedChange={(checked) => setSurveillanceFilters({...surveillanceFilters, lineCrossing: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Line crossing</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={surveillanceFilters.errance}
                      onCheckedChange={(checked) => setSurveillanceFilters({...surveillanceFilters, errance: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Errance</span>
                  </label>
                </div>
              </div>

              {/* EPI */}
              <div className="border border-red-200 rounded-lg p-4 bg-white">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 [font-family:'Inter',Helvetica]">
                  🦺 EPI (Équipement de Protection Individuelle)
                </h3>
                <div className="grid grid-cols-5 gap-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={epiFilters.casque}
                      onCheckedChange={(checked) => setEpiFilters({...epiFilters, casque: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Casque</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={epiFilters.veste}
                      onCheckedChange={(checked) => setEpiFilters({...epiFilters, veste: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Veste</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={epiFilters.harnais}
                      onCheckedChange={(checked) => setEpiFilters({...epiFilters, harnais: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Harnais</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={epiFilters.uniforme}
                      onCheckedChange={(checked) => setEpiFilters({...epiFilters, uniforme: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Uniforme</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={epiFilters.masque}
                      onCheckedChange={(checked) => setEpiFilters({...epiFilters, masque: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Masque</span>
                  </label>
                </div>
              </div>

              {/* Incendie */}
              <div className="border border-red-200 rounded-lg p-4 bg-white">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 [font-family:'Inter',Helvetica]">
                  🔥 Incendie
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={incendieFilters.feux}
                      onCheckedChange={(checked) => setIncendieFilters({...incendieFilters, feux: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Feux</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={incendieFilters.fumee}
                      onCheckedChange={(checked) => setIncendieFilters({...incendieFilters, fumee: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Fumée</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={incendieFilters.fuiteLiquide}
                      onCheckedChange={(checked) => setIncendieFilters({...incendieFilters, fuiteLiquide: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Fuite de liquide</span>
                  </label>
                </div>
              </div>

              {/* Productivité */}
              <div className="border border-red-200 rounded-lg p-4 bg-white">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 [font-family:'Inter',Helvetica]">
                  📊 Productivité
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={productiviteFilters.surnombre}
                      onCheckedChange={(checked) => setProductiviteFilters({...productiviteFilters, surnombre: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Surnombre</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={productiviteFilters.sousNombre}
                      onCheckedChange={(checked) => setProductiviteFilters({...productiviteFilters, sousNombre: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Sous nombre</span>
                  </label>
                </div>
              </div>

              {/* Comportement */}
              <div className="border border-red-200 rounded-lg p-4 bg-white">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 [font-family:'Inter',Helvetica]">
                  ⚠️ Comportement
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={comportementFilters.bagarre}
                      onCheckedChange={(checked) => setComportementFilters({...comportementFilters, bagarre: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Bagarre</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={comportementFilters.fumer}
                      onCheckedChange={(checked) => setComportementFilters({...comportementFilters, fumer: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Fumer</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={comportementFilters.portArme}
                      onCheckedChange={(checked) => setComportementFilters({...comportementFilters, portArme: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Port d'arme</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox 
                      checked={comportementFilters.regroupement}
                      onCheckedChange={(checked) => setComportementFilters({...comportementFilters, regroupement: !!checked})}
                      className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">Regroupement</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-3 mt-6">
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Appliquer les filtres
              </Button>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                Réinitialiser
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Galerie des événements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant={
                    event.severity === "critical" ? "destructive" :
                    event.severity === "high" ? "default" :
                    event.severity === "medium" ? "secondary" : "outline"
                  } className={
                    event.severity === "critical" ? "bg-red-600" :
                    event.severity === "high" ? "bg-orange-500" :
                    event.severity === "medium" ? "bg-yellow-500" : ""
                  }>
                    {event.severity === "critical" ? "Critique" :
                     event.severity === "high" ? "Élevé" :
                     event.severity === "medium" ? "Moyen" : "Faible"}
                  </Badge>
                  <Badge variant={event.status === "active" ? "default" : "secondary"} 
                         className={event.status === "active" ? "bg-green-500" : ""}>
                    {event.status === "active" ? "Actif" : "Résolu"}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-slate-800 mb-1 [font-family:'Inter',Helvetica]">
                  {event.type}
                </h3>
                
                <p className="text-xs text-slate-500 mb-2 [font-family:'Inter',Helvetica]">
                  {event.category}
                </p>
                
                <p className="text-sm text-slate-600 mb-3 [font-family:'Inter',Helvetica]">
                  {event.description}
                </p>
                
                <div className="space-y-1 text-xs text-slate-500 [font-family:'Inter',Helvetica]">
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.today}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {event.camera}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.zone} - {event.site}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};