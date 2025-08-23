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

// Données des captures de visages et corps
const captureGallery = [
  {
    id: 1,
    type: "Visage",
    timestamp: "14:32:15",
    camera: "Caméra 01",
    gender: "Homme",
    age: 45,
    confidence: 98,
    image: businessmanPhoto,
    attributes: ["Sans barbe", "Cheveux courts", "Sans lunettes"],
    today: "Aujourd'hui 14:32"
  },
  {
    id: 2,
    type: "Visage", 
    timestamp: "14:28:42",
    camera: "Caméra 03",
    gender: "Femme",
    age: 28,
    confidence: 94,
    image: womanPhoto,
    attributes: ["Cheveux longs", "Sans lunettes", "Sans casquette"],
    today: "Aujourd'hui 14:28"
  },
  {
    id: 3,
    type: "Visage",
    timestamp: "14:25:18",
    camera: "Caméra 02",
    gender: "Homme",
    age: 35,
    confidence: 91,
    image: casualManPhoto,
    attributes: ["Barbe", "Cheveux courts", "Sans lunettes"],
    today: "Aujourd'hui 14:25"
  },
  {
    id: 4,
    type: "Visage",
    timestamp: "14:22:03",
    camera: "Caméra 05",
    gender: "Femme",
    age: 55,
    confidence: 89,
    image: elderlyWomanPhoto,
    attributes: ["Cheveux courts", "Lunettes", "Sans casquette"],
    today: "Aujourd'hui 14:22"
  },
  {
    id: 5,
    type: "Visage",
    timestamp: "14:18:29",
    camera: "Caméra 01",
    gender: "Homme",
    age: 25,
    confidence: 96,
    image: youngManPhoto,
    attributes: ["Sans barbe", "Cheveux courts", "Sans lunettes"],
    today: "Aujourd'hui 14:18"
  },
  {
    id: 6,
    type: "Visage",
    timestamp: "14:15:47",
    camera: "Caméra 04",
    gender: "Homme",
    age: 40,
    confidence: 67,
    image: businessmanPhoto,
    attributes: ["Barbe", "Cheveux courts", "Sans lunettes"],
    today: "Aujourd'hui 14:15"
  },
  {
    id: 7,
    type: "Visage",
    timestamp: "14:12:33",
    camera: "Caméra 06",
    gender: "Femme",
    age: 32,
    confidence: 93,
    image: womanPhoto,
    attributes: ["Cheveux longs", "Sans lunettes", "Sans barbe"],
    today: "Aujourd'hui 14:12"
  },
  {
    id: 8,
    type: "Visage",
    timestamp: "14:09:15",
    camera: "Caméra 02",
    gender: "Homme",
    age: 38,
    confidence: 88,
    image: casualManPhoto,
    attributes: ["Lunettes", "Cheveux longs", "Sans barbe"],
    today: "Aujourd'hui 14:09"
  },
  {
    id: 9,
    type: "Corps",
    timestamp: "14:06:22",
    camera: "Caméra 01",
    gender: "Homme",
    age: 42,
    confidence: 85,
    image: businessmanPhoto,
    attributes: ["Costume", "Taille moyenne", "Posture droite"],
    today: "Aujourd'hui 14:06"
  },
  {
    id: 10,
    type: "Corps",
    timestamp: "14:03:11",
    camera: "Caméra 03",
    gender: "Femme",
    age: 30,
    confidence: 92,
    image: womanPhoto,
    attributes: ["Robe", "Taille petite", "Démarche rapide"],
    today: "Aujourd'hui 14:03"
  },
  {
    id: 11,
    type: "Corps",
    timestamp: "14:00:45",
    camera: "Caméra 02",
    gender: "Homme",
    age: 28,
    confidence: 78,
    image: casualManPhoto,
    attributes: ["Jeans", "Taille grande", "Sac à dos"],
    today: "Aujourd'hui 14:00"
  },
  {
    id: 12,
    type: "Corps",
    timestamp: "13:58:17",
    camera: "Caméra 05",
    gender: "Femme",
    age: 52,
    confidence: 86,
    image: elderlyWomanPhoto,
    attributes: ["Manteau", "Taille moyenne", "Canne"],
    today: "Aujourd'hui 13:58"
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
  const [filterAge, setFilterAge] = useState("all");
  const [filterGender, setFilterGender] = useState("all");
  const [clothingType, setClothingType] = useState("all");
  const [hairType, setHairType] = useState("all");
  const [activeFilterMode, setActiveFilterMode] = useState("tous"); // tous, visage, corps

  const filteredCaptures = captureGallery.filter(capture => {
    const matchesSearch = capture.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         capture.camera.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         capture.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         capture.attributes.some(attr => attr.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesAge = filterAge === "all" || 
                      (filterAge === "young" && capture.age < 30) ||
                      (filterAge === "middle" && capture.age >= 30 && capture.age < 50) ||
                      (filterAge === "senior" && capture.age >= 50);
    
    const matchesGender = filterGender === "all" || capture.gender === filterGender;
    
    const matchesConfidence = selectedFilter === "all" || 
                             (selectedFilter === "authorized" && capture.confidence > 80) ||
                             (selectedFilter === "unknown" && capture.confidence <= 80);
    
    return matchesSearch && matchesAge && matchesGender && matchesConfidence;
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
              {/* Onglets Texte/Visage */}
              <div className="flex gap-2 mb-4">
                <Button
                  className="bg-teal-500 hover:bg-teal-600 text-white [font-family:'Inter',Helvetica] text-sm px-4 py-2 rounded-lg"
                >
                  📝 Texte
                </Button>
                <Button
                  variant="outline"
                  className="border-teal-200 text-teal-600 hover:bg-teal-50 [font-family:'Inter',Helvetica] text-sm px-4 py-2 rounded-lg"
                >
                  👤 Visage
                </Button>
              </div>

              {/* Champ de recherche en langage naturel */}
              <div className="mb-4">
                <div className="relative">
                  <div className="bg-white/90 border border-cyan-200 rounded-lg p-4">
                    <textarea
                      placeholder="Décrivez ce que vous cherchez en langage naturel..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 min-h-[60px] resize-none [font-family:'Inter',Helvetica] text-sm"
                    />
                    {searchQuery === '' && (
                      <div className="mt-1 text-slate-500 [font-family:'Inter',Helvetica] text-xs">
                        <div className="mb-1">Exemples:</div>
                        <div className="space-y-1">
                          <div>• 'Montre-moi toutes les femmes avec veste rouge détectées hier'</div>
                          <div>• 'Hommes âgés de 25-40 ans avec barbe ce matin'</div>
                        </div>
                      </div>
                    )}
                    <Button
                      className="absolute bottom-4 right-4 bg-teal-500 hover:bg-teal-600 text-white [font-family:'Inter',Helvetica] text-sm px-4 py-2 rounded-lg"
                      onClick={() => {
                        // Ici on peut ajouter la logique de recherche
                        console.log('Recherche lancée:', searchQuery);
                      }}
                    >
                      🔍 Rechercher
                    </Button>
                  </div>
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
                  onClick={() => setSearchQuery("Personnes suspectes")}
                >
                  Personnes suspectes
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/80 border-cyan-200 text-teal-700 hover:bg-cyan-50 hover:border-teal-300"
                  onClick={() => setSearchQuery("Visiteurs récurrents")}
                >
                  Visiteurs récurrents
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/80 border-cyan-200 text-teal-700 hover:bg-cyan-50 hover:border-teal-300"
                  onClick={() => setSearchQuery("Personnel autorisé")}
                >
                  Personnel autorisé
                </Button>
              </div>
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
                      className={`flex-1 ${
                        activeFilterMode === "tous" 
                          ? "bg-teal-600 text-white border-teal-600 hover:bg-teal-700" 
                          : "border-slate-300 text-slate-600 hover:bg-slate-50"
                      }`}
                      onClick={() => setActiveFilterMode("tous")}
                    >
                      Tous
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`flex-1 ${
                        activeFilterMode === "visage" 
                          ? "bg-teal-600 text-white border-teal-600 hover:bg-teal-700" 
                          : "border-slate-300 text-slate-600 hover:bg-slate-50"
                      }`}
                      onClick={() => setActiveFilterMode("visage")}
                    >
                      Visage
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`flex-1 ${
                        activeFilterMode === "corps" 
                          ? "bg-teal-600 text-white border-teal-600 hover:bg-teal-700" 
                          : "border-slate-300 text-slate-600 hover:bg-slate-50"
                      }`}
                      onClick={() => setActiveFilterMode("corps")}
                    >
                      Corps
                    </Button>
                  </div>
                </div>

                {/* Filtres Principaux */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                      Age
                    </label>
                    <Select value={filterAge} onValueChange={setFilterAge}>
                      <SelectTrigger className="w-full bg-white border-slate-200">
                        <SelectValue placeholder="Tous les âges" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les âges</SelectItem>
                        <SelectItem value="young">Jeune (moins de 30 ans)</SelectItem>
                        <SelectItem value="middle">Adulte (30-50 ans)</SelectItem>
                        <SelectItem value="senior">Senior (plus de 50 ans)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                      Sexe
                    </label>
                    <Select value={filterGender} onValueChange={setFilterGender}>
                      <SelectTrigger className="w-full bg-white border-slate-200">
                        <SelectValue placeholder="Tous les sexes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les sexes</SelectItem>
                        <SelectItem value="Homme">Homme</SelectItem>
                        <SelectItem value="Femme">Femme</SelectItem>
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
                {(activeFilterMode === "tous" || activeFilterMode === "corps") && (
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
                )}

                {/* Attributs Faciaux */}
                {(activeFilterMode === "tous" || activeFilterMode === "visage") && (
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
                )}

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
                  <div className="grid grid-cols-4 gap-4">
                    {filteredCaptures.map((capture) => (
                      <Card 
                        key={capture.id} 
                        className="group hover:shadow-xl transition-all duration-300 border-slate-200/60 bg-white/90 backdrop-blur-sm overflow-hidden"
                      >
                        <div className="relative">
                          <img
                            src={capture.image}
                            alt={capture.type}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          
                          {/* Badge Type */}
                          <div className="absolute top-2 left-2">
                            <Badge className={`${
                              capture.type === "Visage" 
                                ? "bg-blue-500 text-white" 
                                : "bg-purple-500 text-white"
                            } px-2 py-1 text-xs font-medium`}>
                              {capture.type}
                            </Badge>
                          </div>

                          {/* Badge confiance */}
                          <div className="absolute top-2 right-2">
                            <Badge className={`${
                              capture.confidence > 80 
                                ? 'bg-emerald-500 text-white' 
                                : 'bg-red-500 text-white'
                            } px-2 py-1 text-xs font-bold shadow-lg`}>
                              {capture.confidence}%
                            </Badge>
                          </div>

                          {/* Caméra */}
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {capture.camera}
                          </div>
                        </div>

                        <CardContent className="p-3">
                          <div className="space-y-3">
                            <div>
                              <h3 className="font-bold text-slate-800 [font-family:'Inter',Helvetica] text-sm">
                                {capture.type}
                              </h3>
                              <p className="text-slate-600 [font-family:'Inter',Helvetica] text-sm">
                                {capture.gender}, {capture.age} ans
                              </p>
                            </div>

                            {/* Attributs physiques */}
                            <div className="flex flex-wrap gap-1">
                              {capture.attributes.map((attribute, index) => (
                                <Badge 
                                  key={index}
                                  variant="outline" 
                                  className={`text-xs px-2 py-0.5 ${
                                    attribute.includes('Barbe') ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                    attribute.includes('Cheveux') ? 'bg-purple-100 text-purple-700 border-purple-200' :
                                    attribute.includes('Lunettes') ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                    attribute.includes('Sans') ? 'bg-gray-100 text-gray-700 border-gray-200' :
                                    'bg-green-100 text-green-700 border-green-200'
                                  }`}
                                >
                                  {attribute}
                                </Badge>
                              ))}
                            </div>

                            {/* Timestamp */}
                            <div className="flex items-center text-xs text-slate-500 pt-2 border-t border-slate-100">
                              <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <circle cx="10" cy="10" r="4"></circle>
                              </svg>
                              {capture.today}
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