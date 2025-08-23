import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import des images générées
import businessmanPhoto from "@assets/generated_images/Security_capture_businessman_photo_2feb92d4.png";
import womanPhoto from "@assets/generated_images/Security_capture_woman_photo_e17e3828.png";
import casualManPhoto from "@assets/generated_images/Security_capture_casual_man_eb27432b.png";
import elderlyWomanPhoto from "@assets/generated_images/Security_capture_elderly_woman_37bac27b.png";
import youngManPhoto from "@assets/generated_images/Security_capture_young_man_e6e7c093.png";

// Données des captures selon le design Figma
const captureGallery = [
  {
    id: 1,
    name: "Jean Dupont",
    timestamp: "14:32:15",
    date: "23 Août 2025",
    camera: "CAM-001",
    zone: "Entrée Principale",
    confidence: 98,
    status: "authorized",
    image: businessmanPhoto,
    employee_id: "EMP-0001",
    department: "Direction"
  },
  {
    id: 2,
    name: "Marie Laurent",
    timestamp: "14:28:42",
    date: "23 Août 2025", 
    camera: "CAM-002",
    zone: "Hall Réception",
    confidence: 94,
    status: "authorized",
    image: womanPhoto,
    employee_id: "EMP-0245",
    department: "RH"
  },
  {
    id: 3,
    name: "Pierre Martin",
    timestamp: "14:25:18",
    date: "23 Août 2025",
    camera: "CAM-003", 
    zone: "Bureau Étage 2",
    confidence: 91,
    status: "authorized",
    image: casualManPhoto,
    employee_id: "EMP-0156",
    department: "IT"
  },
  {
    id: 4,
    name: "Sylvie Moreau",
    timestamp: "14:22:03",
    date: "23 Août 2025",
    camera: "CAM-004",
    zone: "Salle de Conférence",
    confidence: 89,
    status: "authorized",
    image: elderlyWomanPhoto,
    employee_id: "EMP-0078",
    department: "Finance"
  },
  {
    id: 5,
    name: "Thomas Bernard", 
    timestamp: "14:18:29",
    date: "23 Août 2025",
    camera: "CAM-001",
    zone: "Entrée Principale",
    confidence: 96,
    status: "authorized",
    image: youngManPhoto,
    employee_id: "EMP-0312",
    department: "Marketing"
  },
  {
    id: 6,
    name: "Personne Inconnue",
    timestamp: "14:15:47",
    date: "23 Août 2025",
    camera: "CAM-002",
    zone: "Hall Réception", 
    confidence: 67,
    status: "unknown",
    image: businessmanPhoto,
    employee_id: "N/A",
    department: "Visiteur"
  },
  {
    id: 7,
    name: "Claire Dubois",
    timestamp: "14:12:33",
    date: "23 Août 2025",
    camera: "CAM-005",
    zone: "Parking Souterrain",
    confidence: 93,
    status: "authorized", 
    image: womanPhoto,
    employee_id: "EMP-0089",
    department: "Juridique"
  },
  {
    id: 8,
    name: "Michel Rousseau",
    timestamp: "14:09:15",
    date: "23 Août 2025",
    camera: "CAM-003",
    zone: "Bureau Étage 2",
    confidence: 88,
    status: "authorized",
    image: casualManPhoto,
    employee_id: "EMP-0203",
    department: "Production"
  }
];

const liveFeeds = [
  { id: "CAM-001", name: "Entrée Principale", status: "recording", quality: "4K", persons: 3 },
  { id: "CAM-002", name: "Hall Réception", status: "recording", quality: "HD", persons: 7 },
  { id: "CAM-003", name: "Bureau Étage 2", status: "recording", quality: "HD", persons: 12 },
  { id: "CAM-004", name: "Salle Conférence", status: "recording", quality: "4K", persons: 0 },
  { id: "CAM-005", name: "Parking Souterrain", status: "standby", quality: "HD", persons: 2 }
];

export const CapturePage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  
  // États pour les filtres
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [clothingType, setClothingType] = useState("all");
  const [hairType, setHairType] = useState("all");

  const filteredCaptures = captureGallery.filter(capture => {
    const matchesSearch = capture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         capture.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         capture.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "authorized" && capture.status === "authorized") ||
                         (selectedFilter === "unknown" && capture.status === "unknown");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header Moderne */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent [font-family:'Inter',Helvetica]">
                  Galerie de Captures
                </h1>
                <p className="text-slate-600 [font-family:'Inter',Helvetica] text-sm">
                  Surveillance intelligente et reconnaissance faciale en temps réel
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-emerald-100 text-emerald-700 px-4 py-2 font-medium">
                🟢 LIVE • 5 caméras actives
              </Badge>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 shadow-lg">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nouvelle Capture
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Recherche Intelligente */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-100">
        <div className="px-8 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-slate-800 [font-family:'Inter',Helvetica]">
              Recherche intelligente
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <p className="text-slate-600 [font-family:'Inter',Helvetica] text-sm mb-4 leading-relaxed">
                Effectuez une recherche dans toutes les données de sécurité stockées.<br />
                Recherchez par nom, fonction, localisation, horodatage, niveau de confiance et plus encore.<br />
                • Recherche rapide par ID ou nom d'employé<br />
                • Filtres avancés par date et zone de détection<br />
                • Analyse des patterns de comportement anormaux
              </p>
              
              {/* Champ de recherche en langage naturel */}
              <div className="mb-4">
                <div className="relative">
                  <Input
                    placeholder="Recherchez en langage naturel : 'Montrez-moi les captures de Jean hier soir' ou 'Personnes inconnues entrée principale'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/90 border-cyan-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 rounded-lg text-slate-700 placeholder:text-slate-400"
                  />
                  <svg 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-slate-500 [font-family:'Inter',Helvetica] text-sm">
                  Suggestions:
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/80 border-cyan-200 text-teal-700 hover:bg-cyan-50 hover:border-teal-300"
                  onClick={() => setSearchQuery("Jean Dupont")}
                >
                  Jean Dupont
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/80 border-cyan-200 text-teal-700 hover:bg-cyan-50 hover:border-teal-300"
                  onClick={() => setSearchQuery("Entrée Principale")}
                >
                  Entrée Principale
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/80 border-cyan-200 text-teal-700 hover:bg-cyan-50 hover:border-teal-300"
                  onClick={() => setSelectedFilter("unknown")}
                >
                  Personnes inconnues
                </Button>
              </div>
            </div>
            
            <div className="flex justify-end items-start">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 shadow-lg font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Section principale */}
      <div className="px-8 py-6">
        {/* Section principale avec layout 3 colonnes */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Gauche - Panneau de Filtres */}
          <div className="col-span-3">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-slate-800 [font-family:'Inter',Helvetica] flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filtres
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Boutons Type de Recherche */}
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 bg-teal-600 text-white border-teal-600 hover:bg-teal-700"
                    >
                      Sauvegarder
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-slate-300 text-slate-600 hover:bg-slate-50"
                    >
                      Visage
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-slate-300 text-slate-600 hover:bg-slate-50"
                    >
                      Objet
                    </Button>
                  </div>
                </div>

                {/* Filtres Principaux */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                      Tous les types
                    </label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-full bg-white border-slate-200">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les types</SelectItem>
                        <SelectItem value="employee">Employés</SelectItem>
                        <SelectItem value="visitor">Visiteurs</SelectItem>
                        <SelectItem value="unknown">Inconnus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                      Tous les statuts
                    </label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full bg-white border-slate-200">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="authorized">Autorisé</SelectItem>
                        <SelectItem value="unauthorized">Non autorisé</SelectItem>
                        <SelectItem value="pending">En attente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                      Statut
                    </label>
                    <Select>
                      <SelectTrigger className="w-full bg-white border-slate-200">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Actif</SelectItem>
                        <SelectItem value="inactive">Inactif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                      Période
                    </label>
                    <Select>
                      <SelectTrigger className="w-full bg-white border-slate-200">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Aujourd'hui</SelectItem>
                        <SelectItem value="week">Cette semaine</SelectItem>
                        <SelectItem value="month">Ce mois</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Dates */}
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input 
                        type="date" 
                        placeholder="min 08/07/26"
                        className="text-xs bg-white border-slate-200"
                      />
                    </div>
                    <div className="flex-1">
                      <Input 
                        type="date" 
                        placeholder="max 08/07/26"
                        className="text-xs bg-white border-slate-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Attributs Corporels */}
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-sm font-bold text-slate-800 [font-family:'Inter',Helvetica] mb-3">
                    Attributs Corporels
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                        Tenue vestimentaire
                      </label>
                      <Select value={clothingType} onValueChange={setClothingType}>
                        <SelectTrigger className="w-full bg-white border-slate-200">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes</SelectItem>
                          <SelectItem value="formal">Formelle</SelectItem>
                          <SelectItem value="casual">Décontractée</SelectItem>
                          <SelectItem value="uniform">Uniforme</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                        Taille standard
                      </label>
                      <Select>
                        <SelectTrigger className="w-full bg-white border-slate-200">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Petite</SelectItem>
                          <SelectItem value="medium">Moyenne</SelectItem>
                          <SelectItem value="large">Grande</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Attributs Faciaux */}
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-sm font-bold text-slate-800 [font-family:'Inter',Helvetica] mb-3">
                    Attributs Faciaux
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                        Cheveux
                      </label>
                      <Select value={hairType} onValueChange={setHairType}>
                        <SelectTrigger className="w-full bg-white border-slate-200">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous</SelectItem>
                          <SelectItem value="blond">Blond</SelectItem>
                          <SelectItem value="brun">Brun</SelectItem>
                          <SelectItem value="noir">Noir</SelectItem>
                          <SelectItem value="roux">Roux</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                        Lunettes
                      </label>
                      <Select>
                        <SelectTrigger className="w-full bg-white border-slate-200">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Aucune</SelectItem>
                          <SelectItem value="glasses">Lunettes</SelectItem>
                          <SelectItem value="sunglasses">Lunettes de soleil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                        Barbe
                      </label>
                      <Select>
                        <SelectTrigger className="w-full bg-white border-slate-200">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Aucune</SelectItem>
                          <SelectItem value="light">Légère</SelectItem>
                          <SelectItem value="full">Complète</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                        Coiffure
                      </label>
                      <Select>
                        <SelectTrigger className="w-full bg-white border-slate-200">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Courte</SelectItem>
                          <SelectItem value="medium">Moyenne</SelectItem>
                          <SelectItem value="long">Longue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                        Port
                      </label>
                      <Select>
                        <SelectTrigger className="w-full bg-white border-slate-200">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="confident">Confiant</SelectItem>
                          <SelectItem value="nervous">Nerveux</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="pt-4 space-y-3">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                    ✓ Appliquer les filtres
                  </Button>
                  <Button variant="outline" className="w-full border-slate-300 text-slate-600 hover:bg-slate-50">
                    ↻ Réinitialiser
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section Centrale - Galerie de Captures */}
          <div className="col-span-9">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
              <CardHeader className="border-b border-slate-200/60 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-slate-800 [font-family:'Inter',Helvetica]">
                    Captures Récentes ({filteredCaptures.length})
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    {/* Recherche */}
                    <div className="relative">
                      <Input
                        placeholder="Rechercher par nom, zone ou département..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-80 pl-10 bg-white/80 border-slate-200 focus:border-blue-400"
                      />
                      <svg 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    {/* Filtres */}
                    <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="w-auto">
                      <TabsList className="bg-slate-100/80">
                        <TabsTrigger value="all" className="text-sm">Tous</TabsTrigger>
                        <TabsTrigger value="authorized" className="text-sm">Autorisés</TabsTrigger>
                        <TabsTrigger value="unknown" className="text-sm">Inconnus</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <ScrollArea className="h-[600px]">
                  <div className="grid grid-cols-3 gap-6">
                    {filteredCaptures.map((capture) => (
                      <Card 
                        key={capture.id} 
                        className="group hover:shadow-xl transition-all duration-300 border-slate-200/60 bg-white/80 backdrop-blur-sm overflow-hidden"
                      >
                        <div className="relative">
                          <img
                            src={capture.image}
                            alt={capture.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          
                          {/* Overlays */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          
                          {/* Badge confiance */}
                          <div className="absolute top-3 right-3">
                            <Badge className={`${
                              capture.status === 'authorized' 
                                ? 'bg-emerald-500/90 text-white' 
                                : 'bg-red-500/90 text-white'
                            } px-2 py-1 text-xs font-bold shadow-lg`}>
                              {capture.confidence}%
                            </Badge>
                          </div>

                          {/* Timestamp */}
                          <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded font-mono">
                            {capture.timestamp}
                          </div>

                          {/* Status */}
                          <div className="absolute bottom-3 right-3">
                            <Badge className={`${
                              capture.status === 'authorized' 
                                ? 'bg-emerald-500/90 text-white' 
                                : 'bg-red-500/90 text-white'
                            } text-xs px-2 py-1 shadow-lg`}>
                              {capture.status === 'authorized' ? '✓' : '⚠'}
                            </Badge>
                          </div>
                        </div>

                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <h3 className="font-bold text-slate-800 [font-family:'Inter',Helvetica] text-base truncate">
                                {capture.name}
                              </h3>
                              <p className="text-slate-500 [font-family:'Inter',Helvetica] text-sm">
                                {capture.employee_id} • {capture.department}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-slate-400 block">Caméra:</span>
                                <span className="font-medium text-slate-700">{capture.camera}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block">Zone:</span>
                                <span className="font-medium text-slate-700 truncate">{capture.zone}</span>
                              </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                              <Button variant="outline" size="sm" className="flex-1 text-xs">
                                👁 Détails
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1 text-xs">
                                📤 Export
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};