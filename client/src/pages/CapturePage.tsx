import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

      {/* Dashboard Stats */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 [font-family:'Inter',Helvetica] text-sm font-medium uppercase tracking-wider">
                    Captures Totales
                  </p>
                  <p className="text-3xl font-bold text-slate-800 [font-family:'Inter',Helvetica] mt-2">
                    {captureGallery.length}
                  </p>
                  <p className="text-emerald-600 [font-family:'Inter',Helvetica] text-sm mt-1 font-medium">
                    +{Math.round((captureGallery.length / 100) * 15)}% aujourd'hui
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 [font-family:'Inter',Helvetica] text-sm font-medium uppercase tracking-wider">
                    Taux de Reconnaissance
                  </p>
                  <p className="text-3xl font-bold text-slate-800 [font-family:'Inter',Helvetica] mt-2">
                    {Math.round((captureGallery.filter(c => c.status === 'authorized').length / captureGallery.length) * 100)}%
                  </p>
                  <p className="text-emerald-600 [font-family:'Inter',Helvetica] text-sm mt-1 font-medium">
                    Performance excellente
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 [font-family:'Inter',Helvetica] text-sm font-medium uppercase tracking-wider">
                    Personnes Présentes
                  </p>
                  <p className="text-3xl font-bold text-slate-800 [font-family:'Inter',Helvetica] mt-2">
                    {liveFeeds.reduce((sum, feed) => sum + feed.persons, 0)}
                  </p>
                  <p className="text-blue-600 [font-family:'Inter',Helvetica] text-sm mt-1 font-medium">
                    En temps réel
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 [font-family:'Inter',Helvetica] text-sm font-medium uppercase tracking-wider">
                    Alertes Sécurité
                  </p>
                  <p className="text-3xl font-bold text-slate-800 [font-family:'Inter',Helvetica] mt-2">
                    {captureGallery.filter(c => c.status === 'unknown').length}
                  </p>
                  <p className="text-amber-600 [font-family:'Inter',Helvetica] text-sm mt-1 font-medium">
                    Nécessite attention
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section principale avec layout 3 colonnes */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Gauche - Flux Live */}
          <div className="col-span-3">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-slate-800 [font-family:'Inter',Helvetica] flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  Flux en Direct
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {liveFeeds.map((feed) => (
                      <div 
                        key={feed.id}
                        className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={`${
                            feed.status === 'recording' 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-amber-100 text-amber-700'
                          } text-xs px-2 py-1`}>
                            {feed.status === 'recording' ? '🔴 REC' : '⏸ PAUSE'}
                          </Badge>
                          <span className="text-xs text-slate-500 font-medium">{feed.quality}</span>
                        </div>
                        <h4 className="font-semibold text-sm text-slate-800 [font-family:'Inter',Helvetica] mb-1">
                          {feed.id}
                        </h4>
                        <p className="text-xs text-slate-600 [font-family:'Inter',Helvetica] mb-2">
                          {feed.name}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>👥 {feed.persons} personnes</span>
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
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