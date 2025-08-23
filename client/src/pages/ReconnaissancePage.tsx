import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Import des images générées
import businessmanPhoto from "@assets/generated_images/Security_capture_businessman_photo_2feb92d4.png";
import womanPhoto from "@assets/generated_images/Security_capture_woman_photo_e17e3828.png";
import casualManPhoto from "@assets/generated_images/Security_capture_casual_man_eb27432b.png";
import elderlyWomanPhoto from "@assets/generated_images/Security_capture_elderly_woman_37bac27b.png";
import youngManPhoto from "@assets/generated_images/Security_capture_young_man_e6e7c093.png";

// Données des personnes reconnues
const recognitionData = [
  {
    id: 1,
    name: "Marc Dubois",
    status: "Reconnu",
    confidence: 92,
    lastSeen: "Il y a 32 min",
    location: "Chemin bleu",
    details: "Parution noir",
    badge: "Sortie",
    image: businessmanPhoto,
    color: "teal"
  },
  {
    id: 2,
    name: "Personne inconnue",
    status: "Inconnue",
    confidence: 45,
    lastSeen: "Il y a 45 min",
    location: "Zone grise",
    details: "Visite rouge",
    badge: "Jean bleu",
    image: womanPhoto,
    color: "orange"
  },
  {
    id: 3,
    name: "Pierre Martin",
    status: "Reconnu",
    confidence: 88,
    lastSeen: "Il y a 48 min",
    location: "Zone grise",
    details: "Parution noir",
    badge: "Lunettes",
    image: casualManPhoto,
    color: "teal"
  },
  {
    id: 4,
    name: "Personne suspecte",
    status: "Suspect",
    confidence: 27,
    lastSeen: "Il y a 1h",
    location: "Zone rouge",
    details: "Sweat noir",
    badge: "Jean bleu",
    image: youngManPhoto,
    color: "red"
  },
  {
    id: 5,
    name: "Jean Dupont",
    status: "Reconnu",
    confidence: 85,
    lastSeen: "Il y a 38 min",
    location: "Chemin bleu",
    details: "T-shirt blanc",
    badge: "Jean bleu",
    image: businessmanPhoto,
    color: "teal"
  },
  {
    id: 6,
    name: "Sophie Bernard",
    status: "Reconnu",
    confidence: 90,
    lastSeen: "Il y a 30 min",
    location: "Zone verte",
    details: "Robe jaune",
    badge: "Parution noir",
    image: elderlyWomanPhoto,
    color: "teal"
  },
  {
    id: 7,
    name: "Personne inconnue",
    status: "Inconnu",
    confidence: 35,
    lastSeen: "Il y a 38 min",
    location: "Zone orange",
    details: "Chemise bleue",
    badge: "Parution beige",
    image: casualManPhoto,
    color: "orange"
  },
  {
    id: 8,
    name: "Marie Leroy",
    status: "Reconnu",
    confidence: 93,
    lastSeen: "Il y a 28 min",
    location: "Zone verte",
    details: "Blouse jaune",
    badge: "Parution noir",
    image: womanPhoto,
    color: "teal"
  },
  {
    id: 9,
    name: "Paul Dupont",
    status: "Reconnu",
    confidence: 87,
    lastSeen: "Il y a 44 min",
    location: "Chemin blanc",
    details: "Chemise bleue",
    badge: "Parution noir",
    image: businessmanPhoto,
    color: "teal"
  },
  {
    id: 10,
    name: "Marie Dupont",
    status: "Reconnu",
    confidence: 89,
    lastSeen: "Il y a 28 min",
    location: "Zone verte",
    details: "Visite rouge",
    badge: "Jean bleu",
    image: elderlyWomanPhoto,
    color: "teal"
  },
  {
    id: 11,
    name: "Sophie Dupont",
    status: "Reconnu",
    confidence: 91,
    lastSeen: "Il y a 22 min",
    location: "Zone verte",
    details: "Blouse jaune",
    badge: "Parution noir",
    image: womanPhoto,
    color: "teal"
  },
  {
    id: 12,
    name: "Paul Dupont",
    status: "Reconnu",
    confidence: 86,
    lastSeen: "Il y a 54 min",
    location: "Chemin blanc",
    details: "Chemise bleue",
    badge: "Parution noir",
    image: youngManPhoto,
    color: "teal"
  }
];

export const ReconnaissancePage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("suggestions");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [sexFilter, setSexFilter] = useState("all");
  const [cameraFilter, setCameraFilter] = useState("all");
  const [confidenceRange, setConfidenceRange] = useState([0]);

  const filteredData = recognitionData.filter(person => {
    if (activeTab === "low-score") return person.confidence < 50;
    if (activeTab === "intrusions") return person.status === "Suspect" || person.status === "Inconnu" || person.status === "Inconnue";
    if (activeTab === "authorized") return person.status === "Reconnu" && person.confidence > 80;
    return true;
  });

  const recognizedCount = recognitionData.filter(p => p.status === "Reconnu").length;
  const lowScoreCount = recognitionData.filter(p => p.confidence < 50).length;
  const intrusionCount = recognitionData.filter(p => p.status === "Suspect" || p.status === "Inconnu" || p.status === "Inconnue").length;

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 [font-family:'Inter',Helvetica]">
                Reconnaissance Faciale
              </h1>
              <p className="text-slate-600 [font-family:'Inter',Helvetica] text-sm">
                Gestion des identités et reconnaissance
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Ajouter une identité
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Section Recherche Intelligente */}
        <Card className="mb-6 bg-cyan-50/50 border-cyan-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-800 [font-family:'Inter',Helvetica]">
                Recherche intelligente
              </h2>
            </div>
            <div className="space-y-3">
              <textarea
                placeholder="Décrivez ce que vous cherchez en langage naturel...&#10;Exemples:&#10;• 'Personnes reconnues avec un score inférieur à 80%'&#10;• 'Intrusions détectées cette semaine'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-cyan-200 rounded-lg text-slate-700 placeholder:text-slate-400 min-h-[80px] resize-none [font-family:'Inter',Helvetica] text-sm"
              />
              <div className="flex gap-3">
                <Badge variant="outline" className="text-xs text-slate-600">
                  Suggestions
                </Badge>
                <Badge variant="outline" className="text-xs text-slate-600">
                  Score faible
                </Badge>
                <Badge variant="outline" className="text-xs text-slate-600">
                  Intrusions récentes
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
          </CardContent>
        </Card>

        {/* Statistiques et filtres */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <Button
              variant={activeTab === "suggestions" ? "default" : "outline"}
              onClick={() => setActiveTab("suggestions")}
              className={activeTab === "suggestions" ? "bg-teal-500 hover:bg-teal-600" : ""}
            >
              ✅ Reconnus ({recognizedCount})
            </Button>
            <Button
              variant={activeTab === "low-score" ? "default" : "outline"}
              onClick={() => setActiveTab("low-score")}
              className={activeTab === "low-score" ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              ⚠️ Score Faible ({lowScoreCount})
            </Button>
            <Button
              variant={activeTab === "intrusions" ? "default" : "outline"}
              onClick={() => setActiveTab("intrusions")}
              className={activeTab === "intrusions" ? "bg-red-500 hover:bg-red-600" : ""}
            >
              🚨 Intrusions ({intrusionCount})
            </Button>
          </div>
          <Button variant="outline">
            📋 Tous ({recognitionData.length})
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filtres avancés */}
          <div className="lg:col-span-1">
            <Card className="bg-white/90">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-800 [font-family:'Inter',Helvetica] mb-4">
                  🔍 Filtres de recherche
                </h3>
                
                <div className="space-y-4">
                  <Input
                    placeholder="Nom, prénom..."
                    className="w-full"
                  />

                  <div>
                    <label className="text-sm text-slate-600 [font-family:'Inter',Helvetica] mb-2 block">
                      Score de confiance
                    </label>
                    <Select value={scoreFilter} onValueChange={setScoreFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tous les scores" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les scores</SelectItem>
                        <SelectItem value="high">Score élevé (80%+)</SelectItem>
                        <SelectItem value="medium">Score moyen (50-80%)</SelectItem>
                        <SelectItem value="low">Score faible (&lt;50%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-600 [font-family:'Inter',Helvetica] mb-2 block">
                      Type d'événement
                    </label>
                    <Select value={eventFilter} onValueChange={setEventFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tous les événements" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les événements</SelectItem>
                        <SelectItem value="entry">Entrée</SelectItem>
                        <SelectItem value="exit">Sortie</SelectItem>
                        <SelectItem value="intrusion">Intrusion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-600 [font-family:'Inter',Helvetica] mb-2 block">
                      Période
                    </label>
                    <Select value={periodFilter} onValueChange={setPeriodFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Toutes les périodes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les périodes</SelectItem>
                        <SelectItem value="today">Aujourd'hui</SelectItem>
                        <SelectItem value="week">Cette semaine</SelectItem>
                        <SelectItem value="month">Ce mois</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <h4 className="font-medium text-slate-700 [font-family:'Inter',Helvetica] mt-6 mb-3">
                    Filtres Avancés
                  </h4>

                  <div>
                    <label className="text-sm text-slate-600 [font-family:'Inter',Helvetica] mb-2 block">
                      Attributs Faciaux
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Tous" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="glasses">Avec lunettes</SelectItem>
                        <SelectItem value="beard">Avec barbe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-600 [font-family:'Inter',Helvetica] mb-2 block">
                      Âge estimé
                    </label>
                    <Select value={ageFilter} onValueChange={setAgeFilter}>
                      <SelectTrigger>
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
                    <label className="text-sm text-slate-600 [font-family:'Inter',Helvetica] mb-2 block">
                      Sexe
                    </label>
                    <Select value={sexFilter} onValueChange={setSexFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tous" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="male">Homme</SelectItem>
                        <SelectItem value="female">Femme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-600 [font-family:'Inter',Helvetica] mb-2 block">
                      Caméra
                    </label>
                    <Select value={cameraFilter} onValueChange={setCameraFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Toutes caméras" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes caméras</SelectItem>
                        <SelectItem value="cam1">Caméra 01</SelectItem>
                        <SelectItem value="cam2">Caméra 02</SelectItem>
                        <SelectItem value="cam3">Caméra 03</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                      🔍 Appliquer les filtres
                    </Button>
                    <Button variant="outline" className="w-full">
                      ↻ Réinitialiser
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <p className="text-center text-slate-500 [font-family:'Inter',Helvetica] text-sm">
                      {filteredData.length} reconnaissances trouvées
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grille de cartes */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredData.map((person) => (
                <Card key={person.id} className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="relative mb-3">
                      <Badge 
                        className={`absolute top-2 right-2 ${
                          person.color === "teal" ? "bg-teal-500" :
                          person.color === "orange" ? "bg-orange-500" :
                          "bg-red-500"
                        } text-white text-xs`}
                      >
                        {person.status}
                      </Badge>
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs text-white ${
                        person.status === "Reconnu" ? "bg-teal-500" :
                        person.status === "Suspect" ? "bg-red-500" :
                        "bg-orange-500"
                      }`}>
                        Caméra {String(person.id).padStart(2, '0')}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-slate-800 [font-family:'Inter',Helvetica] text-sm mb-1">
                      {person.name}
                    </h4>
                    
                    <p className="text-xs text-slate-500 [font-family:'Inter',Helvetica] mb-2">
                      {person.lastSeen}
                    </p>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600">Score:</span>
                      <div className="flex items-center gap-1">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              person.confidence > 80 ? "bg-teal-500" :
                              person.confidence > 50 ? "bg-orange-500" :
                              "bg-red-500"
                            }`}
                            style={{ width: `${person.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold">{person.confidence}%</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {person.details && (
                        <Badge variant="outline" className="text-xs">
                          {person.details}
                        </Badge>
                      )}
                      {person.badge && (
                        <Badge variant="outline" className="text-xs">
                          {person.badge}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="mt-3 flex justify-between">
                      <p className="text-xs text-slate-500">
                        Aujourd'hui {person.lastSeen.replace("Il y a ", "")}
                      </p>
                      <div className="flex gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          person.confidence > 80 ? "bg-teal-500" :
                          person.confidence > 50 ? "bg-orange-500" :
                          "bg-red-500"
                        }`} />
                        <div className={`w-2 h-2 rounded-full ${
                          person.status === "Reconnu" ? "bg-green-500" :
                          person.status === "Suspect" ? "bg-red-500" :
                          "bg-gray-400"
                        }`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Section Woman with... */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-slate-800 [font-family:'Inter',Helvetica] mb-4">
                Woman with...
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Woman with sunglasses", status: "Reconnu", color: "teal" },
                  { label: "Woman with hat", status: "Reconnu", color: "teal" },
                  { label: "Woman with scarf", status: "Reconnu", color: "teal" },
                  { label: "Woman with bag", status: "Reconnu", color: "teal" }
                ].map((item, index) => (
                  <Card key={index} className="bg-gray-100">
                    <CardContent className="p-4">
                      <div className="h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                        <div className="text-gray-400">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                      <Badge className={`${item.color === "teal" ? "bg-teal-500" : "bg-gray-500"} text-white text-xs`}>
                        {item.status}
                      </Badge>
                      <p className="text-sm text-slate-700 [font-family:'Inter',Helvetica] mt-2">
                        {item.label}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};