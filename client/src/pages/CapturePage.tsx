import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Import des images générées
import businessmanPhoto from "@assets/generated_images/Security_capture_businessman_photo_2feb92d4.png";
import womanPhoto from "@assets/generated_images/Security_capture_woman_photo_e17e3828.png";
import casualManPhoto from "@assets/generated_images/Security_capture_casual_man_eb27432b.png";
import elderlyWomanPhoto from "@assets/generated_images/Security_capture_elderly_woman_37bac27b.png";
import youngManPhoto from "@assets/generated_images/Security_capture_young_man_e6e7c093.png";

// Données des captures - Design Figma exact
const capturesData = [
  {
    id: 1,
    name: "Jean Dupont",
    timestamp: "14:32:15",
    date: "Aujourd'hui",
    camera: "CAM-01",
    location: "Entrée Principale", 
    confidence: 98,
    status: "Reconnu",
    image: businessmanPhoto,
    badgeColor: "bg-green-500"
  },
  {
    id: 2,
    name: "Marie Laurent",
    timestamp: "14:28:42",
    date: "Aujourd'hui",
    camera: "CAM-02",
    location: "Hall Principal",
    confidence: 94,
    status: "Reconnu",
    image: womanPhoto,
    badgeColor: "bg-green-500"
  },
  {
    id: 3,
    name: "Pierre Martin",
    timestamp: "14:25:18",
    date: "Aujourd'hui", 
    camera: "CAM-03",
    location: "Bureau Étage 2",
    confidence: 91,
    status: "Reconnu",
    image: casualManPhoto,
    badgeColor: "bg-green-500"
  },
  {
    id: 4,
    name: "Sylvie Moreau",
    timestamp: "14:22:03",
    date: "Aujourd'hui",
    camera: "CAM-04",
    location: "Réception",
    confidence: 89,
    status: "Reconnu",
    image: elderlyWomanPhoto,
    badgeColor: "bg-green-500"
  },
  {
    id: 5,
    name: "Thomas Bernard",
    timestamp: "14:18:29",
    date: "Aujourd'hui",
    camera: "CAM-01",
    location: "Entrée Principale",
    confidence: 96,
    status: "Reconnu",
    image: youngManPhoto,
    badgeColor: "bg-green-500"
  },
  {
    id: 6,
    name: "Inconnu",
    timestamp: "14:15:47",
    date: "Aujourd'hui",
    camera: "CAM-02",
    location: "Hall Principal",
    confidence: 67,
    status: "Non Reconnu",
    image: businessmanPhoto,
    badgeColor: "bg-red-500"
  }
];

export const CapturePage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filteredCaptures = capturesData.filter(capture => {
    const matchesSearch = capture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         capture.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "Tous" || 
                         (activeFilter === "Reconnus" && capture.status === "Reconnu") ||
                         (activeFilter === "Non Reconnus" && capture.status === "Non Reconnu");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 bg-[#f8fafc] min-h-screen">
      {/* En-tête principal */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0f172a] [font-family:'Inter',Helvetica]">
                Captures de Surveillance
              </h1>
              <p className="text-[#64748b] [font-family:'Inter',Helvetica] mt-1 text-base">
                Système de reconnaissance faciale en temps réel
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-[#dcfce7] text-[#166534] px-4 py-2 text-sm font-medium">
                ● ACTIF • 4 caméras en ligne
              </Badge>
              <Button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-2 font-medium">
                + Nouvelle Capture
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Section des métriques */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Carte Captures Totales */}
          <Card className="bg-white shadow-sm border-[#e2e8f0]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#64748b] [font-family:'Inter',Helvetica] text-sm font-medium uppercase tracking-wide">
                    CAPTURES TOTALES
                  </p>
                  <p className="text-3xl font-bold text-[#0f172a] [font-family:'Inter',Helvetica] mt-2">
                    1,247
                  </p>
                  <p className="text-[#10b981] [font-family:'Inter',Helvetica] text-sm mt-1">
                    +18% ce mois
                  </p>
                </div>
                <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#3b82f6]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Carte Reconnus */}
          <Card className="bg-white shadow-sm border-[#e2e8f0]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#64748b] [font-family:'Inter',Helvetica] text-sm font-medium uppercase tracking-wide">
                    PERSONNES RECONNUES
                  </p>
                  <p className="text-3xl font-bold text-[#0f172a] [font-family:'Inter',Helvetica] mt-2">
                    92%
                  </p>
                  <p className="text-[#10b981] [font-family:'Inter',Helvetica] text-sm mt-1">
                    Taux excellent
                  </p>
                </div>
                <div className="w-14 h-14 bg-[#dcfce7] rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Carte Alertes */}
          <Card className="bg-white shadow-sm border-[#e2e8f0]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#64748b] [font-family:'Inter',Helvetica] text-sm font-medium uppercase tracking-wide">
                    ALERTES ACTIVES
                  </p>
                  <p className="text-3xl font-bold text-[#0f172a] [font-family:'Inter',Helvetica] mt-2">
                    5
                  </p>
                  <p className="text-[#f59e0b] [font-family:'Inter',Helvetica] text-sm mt-1">
                    Attention requise
                  </p>
                </div>
                <div className="w-14 h-14 bg-[#fef3c7] rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Carte Stockage */}
          <Card className="bg-white shadow-sm border-[#e2e8f0]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#64748b] [font-family:'Inter',Helvetica] text-sm font-medium uppercase tracking-wide">
                    STOCKAGE UTILISÉ
                  </p>
                  <p className="text-3xl font-bold text-[#0f172a] [font-family:'Inter',Helvetica] mt-2">
                    74%
                  </p>
                  <p className="text-[#64748b] [font-family:'Inter',Helvetica] text-sm mt-1">
                    3.2 TB / 4.3 TB
                  </p>
                </div>
                <div className="w-14 h-14 bg-[#f3e8ff] rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#8b5cf6]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section principale - Galerie de captures */}
        <Card className="bg-white shadow-sm border-[#e2e8f0]">
          <CardHeader className="border-b border-[#e2e8f0] pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-[#0f172a] [font-family:'Inter',Helvetica]">
                Captures Récentes
              </CardTitle>
              <div className="flex items-center gap-4">
                {/* Barre de recherche */}
                <div className="relative">
                  <Input
                    placeholder="Rechercher une personne..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-80 pl-10 border-[#e2e8f0] focus:border-[#3b82f6]"
                  />
                  <svg 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748b]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Filtres */}
                <div className="flex gap-2">
                  {["Tous", "Reconnus", "Non Reconnus"].map((filter) => (
                    <Button
                      key={filter}
                      variant={activeFilter === filter ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter(filter)}
                      className={`${
                        activeFilter === filter 
                          ? "bg-[#3b82f6] text-white" 
                          : "border-[#e2e8f0] text-[#64748b] hover:bg-[#f8fafc]"
                      }`}
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <ScrollArea className="h-[700px]">
              <div className="grid grid-cols-4 gap-6">
                {filteredCaptures.map((capture) => (
                  <Card 
                    key={capture.id} 
                    className="border-[#e2e8f0] hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  >
                    <CardContent className="p-4">
                      {/* Image de capture avec overlay */}
                      <div className="relative mb-4 overflow-hidden rounded-lg">
                        <img
                          src={capture.image}
                          alt={capture.name}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        
                        {/* Overlay informations */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Badge de confiance */}
                        <div className="absolute top-3 right-3">
                          <Badge className={`${capture.badgeColor} text-white px-2 py-1 text-xs font-medium`}>
                            {capture.confidence}%
                          </Badge>
                        </div>

                        {/* Timestamp */}
                        <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
                          {capture.timestamp}
                        </div>

                        {/* Status badge */}
                        <div className="absolute bottom-3 right-3">
                          <Badge className={`${
                            capture.status === "Reconnu" 
                              ? "bg-green-500/90 text-white" 
                              : "bg-red-500/90 text-white"
                          } text-xs px-2 py-1`}>
                            {capture.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Informations détaillées */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-[#0f172a] [font-family:'Inter',Helvetica] text-base truncate">
                            {capture.name}
                          </h3>
                          <p className="text-[#64748b] [font-family:'Inter',Helvetica] text-sm">
                            {capture.date}
                          </p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-[#64748b] [font-family:'Inter',Helvetica]">Caméra:</span>
                            <span className="font-medium text-[#0f172a] [font-family:'Inter',Helvetica]">{capture.camera}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#64748b] [font-family:'Inter',Helvetica]">Lieu:</span>
                            <span className="font-medium text-[#0f172a] [font-family:'Inter',Helvetica] text-right max-w-[120px] truncate">
                              {capture.location}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1 text-xs">
                            Détails
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 text-xs">
                            Export
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

        {/* Footer avec statistiques */}
        <div className="mt-6 grid grid-cols-3 gap-6">
          <Card className="bg-white shadow-sm border-[#e2e8f0]">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#10b981] [font-family:'Inter',Helvetica]">
                {capturesData.filter(c => c.status === "Reconnu").length}
              </div>
              <div className="text-[#64748b] [font-family:'Inter',Helvetica] text-sm">
                Personnes Reconnues
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-[#e2e8f0]">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#ef4444] [font-family:'Inter',Helvetica]">
                {capturesData.filter(c => c.status === "Non Reconnu").length}
              </div>
              <div className="text-[#64748b] [font-family:'Inter',Helvetica] text-sm">
                Personnes Inconnues
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-[#e2e8f0]">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#3b82f6] [font-family:'Inter',Helvetica]">
                {capturesData.length}
              </div>
              <div className="text-[#64748b] [font-family:'Inter',Helvetica] text-sm">
                Total Captures
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};