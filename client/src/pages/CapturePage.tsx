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
    timestamp: "14:25:17",
    camera: "Caméra 02",
    gender: "Homme",
    age: 35,
    confidence: 91,
    image: casualManPhoto,
    attributes: ["Barbe courte", "Cheveux bruns", "T-shirt"],
    today: "Aujourd'hui 14:25"
  },
  {
    id: 4,
    type: "Visage",
    timestamp: "14:20:58",
    camera: "Caméra 04",
    gender: "Femme",
    age: 62,
    confidence: 87,
    image: elderlyWomanPhoto,
    attributes: ["Cheveux gris", "Lunettes", "Manteau"],
    today: "Aujourd'hui 14:20"
  },
  {
    id: 5,
    type: "Corps",
    timestamp: "14:18:33",
    camera: "Caméra 01",
    gender: "Homme",
    age: 29,
    confidence: 84,
    image: youngManPhoto,
    attributes: ["Jean bleu", "Chemise blanche", "Sac à dos"],
    today: "Aujourd'hui 14:18"
  },
  {
    id: 6,
    type: "Visage",
    timestamp: "14:15:42",
    camera: "Caméra 03",
    gender: "Femme",
    age: 38,
    confidence: 96,
    image: womanPhoto,
    attributes: ["Cheveux longs", "Robe rouge", "Sac à main"],
    today: "Aujourd'hui 14:15"
  },
  {
    id: 7,
    type: "Corps",
    timestamp: "14:12:11",
    camera: "Caméra 02",
    gender: "Homme",
    age: 52,
    confidence: 89,
    image: businessmanPhoto,
    attributes: ["Costume gris", "Cravate", "Mallette"],
    today: "Aujourd'hui 14:12"
  },
  {
    id: 8,
    type: "Visage",
    timestamp: "14:08:27",
    camera: "Caméra 04",
    gender: "Homme",
    age: 31,
    confidence: 93,
    image: casualManPhoto,
    attributes: ["Casquette", "Veste en cuir", "Jean"],
    today: "Aujourd'hui 14:08"
  },
  {
    id: 9,
    type: "Visage",
    timestamp: "14:05:14",
    camera: "Caméra 01",
    gender: "Femme",
    age: 45,
    confidence: 88,
    image: elderlyWomanPhoto,
    attributes: ["Cheveux courts", "Blouse", "Bijoux"],
    today: "Aujourd'hui 14:05"
  },
  {
    id: 10,
    type: "Corps",
    timestamp: "14:02:39",
    camera: "Caméra 03",
    gender: "Homme",
    age: 26,
    confidence: 85,
    image: youngManPhoto,
    attributes: ["Short", "T-shirt", "Baskets"],
    today: "Aujourd'hui 14:02"
  },
  {
    id: 11,
    type: "Visage",
    timestamp: "13:58:56",
    camera: "Caméra 02",
    gender: "Femme",
    age: 33,
    confidence: 92,
    image: womanPhoto,
    attributes: ["Maquillage", "Boucles d'oreilles", "Chemisier"],
    today: "Aujourd'hui 13:58"
  },
  {
    id: 12,
    type: "Corps",
    timestamp: "13:55:21",
    camera: "Caméra 04",
    gender: "Homme",
    age: 48,
    confidence: 90,
    image: businessmanPhoto,
    attributes: ["Polo", "Pantalon chino", "Montre"],
    today: "Aujourd'hui 13:55"
  },
  {
    id: 13,
    type: "Visage",
    timestamp: "13:51:43",
    camera: "Caméra 01",
    gender: "Homme",
    age: 37,
    confidence: 86,
    image: casualManPhoto,
    attributes: ["Barbe épaisse", "Chemise", "Lunettes de soleil"],
    today: "Aujourd'hui 13:51"
  },
  {
    id: 14,
    type: "Visage",
    timestamp: "13:48:08",
    camera: "Caméra 03",
    gender: "Femme",
    age: 55,
    confidence: 91,
    image: elderlyWomanPhoto,
    attributes: ["Foulard", "Manteau long", "Sac"],
    today: "Aujourd'hui 13:48"
  },
  {
    id: 15,
    type: "Corps",
    timestamp: "13:44:17",
    camera: "Caméra 02",
    gender: "Homme",
    age: 24,
    confidence: 83,
    image: youngManPhoto,
    attributes: ["Sweat à capuche", "Jeans troués", "Casque audio"],
    today: "Aujourd'hui 13:44"
  },
  {
    id: 16,
    type: "Visage",
    timestamp: "13:40:52",
    camera: "Caméra 04",
    gender: "Femme",
    age: 41,
    confidence: 95,
    image: womanPhoto,
    attributes: ["Coiffure élégante", "Rouge à lèvres", "Collier"],
    today: "Aujourd'hui 13:40"
  }
];

export const CapturePage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filterAge, setFilterAge] = useState("all");
  const [filterGender, setFilterGender] = useState("all");
  const [clothingType, setClothingType] = useState("all");
  const [hairType, setHairType] = useState("all");
  const [activeFilterMode, setActiveFilterMode] = useState("tous"); // tous, visage, corps
  
  // États pour les filtres Corps et Visage
  const [topColor, setTopColor] = useState("all");
  const [bottomColor, setBottomColor] = useState("all");
  const [glassesType, setGlassesType] = useState("all");
  const [beardType, setBeardType] = useState("all");
  const [hatType, setHatType] = useState("all");
  
  // États pour la recherche par visage
  const [searchMode, setSearchMode] = useState("texte");
  const [similarity, setSimilarity] = useState(80);
  const [period, setPeriod] = useState("24h");
  const [cameras, setCameras] = useState("toutes");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
    <div className="w-full min-h-screen relative">
      {/* Header */}
      <header className="w-full h-20 bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="flex items-center justify-between h-full px-8">
          <div className="flex items-center gap-6">
            <h1 className="[font-family:'Inter',Helvetica] font-bold text-slate-800 text-2xl">
              Capture
            </h1>
            <p className="[font-family:'Inter',Helvetica] font-normal text-slate-500 text-sm">
              Galerie des détections de sécurité
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
                className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [font-family:'Inter',Helvetica]"
              />
            </div>

            {/* Notification */}
            <div className="relative">
              <svg className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5V7a6 6 0 10-12 0v5l-5 5h5m5 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                1
              </span>
            </div>

            {/* Profil utilisateur */}
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
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
        {/* Section Recherche Intelligente */}
        <Card className="mb-6 bg-cyan-50/50 border-cyan-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-800 [font-family:'Inter',Helvetica]">
                Recherche intelligente
              </h2>
            </div>

            {/* Onglets Texte/Visage */}
            <div className="flex gap-2 mb-4">
              <Button
                className={`[font-family:'Inter',Helvetica] text-sm px-4 py-2 rounded-lg ${
                  searchMode === "texte" 
                    ? "bg-teal-500 hover:bg-teal-600 text-white" 
                    : "bg-white border border-teal-200 text-teal-600 hover:bg-teal-50"
                }`}
                onClick={() => setSearchMode("texte")}
              >
                📝 Texte
              </Button>
              <Button
                className={`[font-family:'Inter',Helvetica] text-sm px-4 py-2 rounded-lg ${
                  searchMode === "visage" 
                    ? "bg-teal-500 hover:bg-teal-600 text-white" 
                    : "bg-white border border-teal-200 text-teal-600 hover:bg-teal-50"
                }`}
                onClick={() => setSearchMode("visage")}
              >
                👤 Visage
              </Button>
            </div>

            {/* Contenu selon le mode de recherche */}
            {searchMode === "texte" ? (
              <div className="space-y-3">
                <textarea
                  placeholder="Décrivez ce que vous cherchez en langage naturel...&#10;Exemples:&#10;• 'Personnes avec veste rouge hier'&#10;• 'Hommes 25-40 ans avec barbe'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-cyan-200 rounded-lg text-slate-700 placeholder:text-slate-400 placeholder:text-xs min-h-[80px] resize-none [font-family:'Inter',Helvetica] text-sm"
                />
                <div className="flex gap-3">
                  <Badge variant="outline" className="text-xs text-slate-600">
                    Personnes suspectes
                  </Badge>
                  <Badge variant="outline" className="text-xs text-slate-600">
                    Visiteurs récurrents
                  </Badge>
                  <Badge variant="outline" className="text-xs text-slate-600">
                    Personnel autorisé
                  </Badge>
                </div>
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Rechercher
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-4">
                {/* Zone de drop d'image */}
                <div className="col-span-6">
                  <div
                    className="border-2 border-dashed border-teal-300 rounded-lg p-6 text-center bg-teal-50/30 hover:bg-teal-50/50 transition-colors cursor-pointer h-full flex flex-col justify-center"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    {uploadedImage ? (
                      <div className="space-y-3">
                        <img 
                          src={uploadedImage} 
                          alt="Image uploadée" 
                          className="w-20 h-20 object-cover rounded-lg mx-auto border-2 border-teal-200"
                        />
                        <p className="text-sm text-teal-700 [font-family:'Inter',Helvetica]">
                          ✓ Image chargée
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
                          <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-teal-700 [font-family:'Inter',Helvetica] font-medium text-sm">
                            Glissez une photo ici
                          </p>
                          <p className="text-xs text-slate-500 [font-family:'Inter',Helvetica]">
                            ou cliquez pour parcourir
                          </p>
                          <p className="text-xs text-slate-500 [font-family:'Inter',Helvetica] mt-1">
                            JPG, PNG jusqu'à 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {/* Contrôles de recherche */}
                <div className="col-span-6 space-y-4">
                  {/* Similarité */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica]">
                        Similarité
                      </label>
                      <span className="text-sm font-bold text-emerald-500 [font-family:'Inter',Helvetica]">
                        {similarity}%
                      </span>
                    </div>
                    <div className="relative">
                      <div className="relative h-2 bg-slate-300 rounded-full">
                        <div
                          className="absolute h-2 bg-emerald-500 rounded-full"
                          style={{ width: `${((similarity - 50) / (99 - 50)) * 100}%` }}
                        />
                        <input
                          type="range"
                          min="50"
                          max="99"
                          value={similarity}
                          onChange={(e) => setSimilarity(parseInt(e.target.value))}
                          className="absolute inset-0 w-full h-2 bg-transparent appearance-none cursor-pointer focus:outline-none range-slider"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Période */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                      Période
                    </label>
                    <Select value={period} onValueChange={setPeriod}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Période" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">Dernières 24h</SelectItem>
                        <SelectItem value="7d">Derniers 7 jours</SelectItem>
                        <SelectItem value="30d">Derniers 30 jours</SelectItem>
                        <SelectItem value="all">Toutes les périodes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Caméras */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                      Caméras
                    </label>
                    <Select value={cameras} onValueChange={setCameras}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Caméras" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toutes">Toutes les caméras</SelectItem>
                        <SelectItem value="cam1">Caméra 01</SelectItem>
                        <SelectItem value="cam2">Caméra 02</SelectItem>
                        <SelectItem value="cam3">Caméra 03</SelectItem>
                        <SelectItem value="cam4">Caméra 04</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Bouton de recherche et suggestions */}
                <div className="col-span-12">
                  <div className="flex justify-center mb-3">
                    <Button 
                      className={`px-6 py-2 text-white text-sm font-medium transition-colors ${
                        uploadedImage 
                          ? 'bg-emerald-500 hover:bg-emerald-600' 
                          : 'bg-slate-400 hover:bg-slate-500 disabled:opacity-50'
                      }`}
                      disabled={!uploadedImage}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Rechercher ce visage
                    </Button>
                  </div>
                  
                  <div className="flex gap-3">
                    <span className="text-xs text-slate-500 [font-family:'Inter',Helvetica]">
                      Suggestions:
                    </span>
                    <Badge variant="outline" className="text-xs text-slate-600">
                      Personnes suspectes
                    </Badge>
                    <Badge variant="outline" className="text-xs text-slate-600">
                      Visiteurs récurrents
                    </Badge>
                    <Badge variant="outline" className="text-xs text-slate-600">
                      Personnel autorisé
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

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
                      👤 Visage
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
                      👤 Corps
                    </Button>
                  </div>
                </div>

                {/* Filtres dynamiques selon le mode */}
                <div className="space-y-4">
                  {/* Filtres communs */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                      Âge
                    </label>
                    <Select value={filterAge} onValueChange={setFilterAge}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tous les âges" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les âges</SelectItem>
                        <SelectItem value="young">18-30 ans</SelectItem>
                        <SelectItem value="middle">30-50 ans</SelectItem>
                        <SelectItem value="senior">50+ ans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                      Genre
                    </label>
                    <Select value={filterGender} onValueChange={setFilterGender}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tous" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="Homme">Homme</SelectItem>
                        <SelectItem value="Femme">Femme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Attributs Faciaux - Mode Visage */}
                  {(activeFilterMode === "visage" || activeFilterMode === "tous") && (
                    <>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800 [font-family:'Inter',Helvetica] mb-3 mt-4">
                          Attributs Faciaux
                        </h4>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                          Cheveux
                        </label>
                        <Select value={hairType} onValueChange={setHairType}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Tous" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous</SelectItem>
                            <SelectItem value="short">Courts</SelectItem>
                            <SelectItem value="long">Longs</SelectItem>
                            <SelectItem value="bald">Chauve</SelectItem>
                            <SelectItem value="curly">Bouclés</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                          Lunettes
                        </label>
                        <Select value={glassesType} onValueChange={setGlassesType}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Tous" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous</SelectItem>
                            <SelectItem value="clear">Transparentes</SelectItem>
                            <SelectItem value="dark">Sombres</SelectItem>
                            <SelectItem value="none">Aucunes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                          Barbe
                        </label>
                        <Select value={beardType} onValueChange={setBeardType}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Tous" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous</SelectItem>
                            <SelectItem value="full">Barbe complète</SelectItem>
                            <SelectItem value="mustache">Moustache</SelectItem>
                            <SelectItem value="goatee">Bouc</SelectItem>
                            <SelectItem value="none">Aucune</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                          Casquette
                        </label>
                        <Select value={hatType} onValueChange={setHatType}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Tous" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous</SelectItem>
                            <SelectItem value="cap">Casquette</SelectItem>
                            <SelectItem value="hat">Chapeau</SelectItem>
                            <SelectItem value="beanie">Bonnet</SelectItem>
                            <SelectItem value="none">Aucune</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {/* Attributs Corporels - Mode Corps */}
                  {(activeFilterMode === "corps" || activeFilterMode === "tous") && (
                    <>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800 [font-family:'Inter',Helvetica] mb-3 mt-4">
                          Attributs Corporels
                        </h4>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                          Couleur vêtement haut
                        </label>
                        <Select value={topColor} onValueChange={setTopColor}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Toutes couleurs" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Toutes couleurs</SelectItem>
                            <SelectItem value="black">Noir</SelectItem>
                            <SelectItem value="white">Blanc</SelectItem>
                            <SelectItem value="blue">Bleu</SelectItem>
                            <SelectItem value="red">Rouge</SelectItem>
                            <SelectItem value="green">Vert</SelectItem>
                            <SelectItem value="gray">Gris</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 [font-family:'Inter',Helvetica] mb-2 block">
                          Couleur vêtement bas
                        </label>
                        <Select value={bottomColor} onValueChange={setBottomColor}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Toutes couleurs" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Toutes couleurs</SelectItem>
                            <SelectItem value="black">Noir</SelectItem>
                            <SelectItem value="blue">Bleu</SelectItem>
                            <SelectItem value="white">Blanc</SelectItem>
                            <SelectItem value="gray">Gris</SelectItem>
                            <SelectItem value="brown">Marron</SelectItem>
                            <SelectItem value="green">Vert</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>

                {/* Boutons d'action */}
                <div className="pt-4 space-y-2">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white [font-family:'Inter',Helvetica]">
                    🔍 Appliquer les filtres
                  </Button>
                  <Button variant="outline" className="w-full text-slate-600 border-slate-300 [font-family:'Inter',Helvetica]">
                    ↻ Réinitialiser
                  </Button>
                </div>

                {/* Statistiques */}
                <div className="pt-4 text-center">
                  <div className="text-2xl font-bold text-slate-800 [font-family:'Inter',Helvetica]">
                    {filteredCaptures.length}
                  </div>
                  <div className="text-sm text-slate-500 [font-family:'Inter',Helvetica]">
                    captures trouvées
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section principale - Galerie */}
          <div className="col-span-9">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div className="space-y-2">
                  <CardTitle className="text-xl font-bold text-slate-800 [font-family:'Inter',Helvetica] flex items-center gap-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Galerie des Captures
                    <Badge className="bg-emerald-100 text-emerald-700 px-2 py-1">
                      🔴 LIVE
                    </Badge>
                  </CardTitle>
                  <p className="text-slate-500 [font-family:'Inter',Helvetica] text-sm">
                    Détections en temps réel • Dernière mise à jour: maintenant
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">
                      {filteredCaptures.length} actives
                    </span>
                  </div>

                  {/* Barre de recherche locale */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <Input
                      placeholder="Rechercher dans les captures..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 w-64 [font-family:'Inter',Helvetica] text-sm"
                    />
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