import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

// Données des captures récentes avec images mockées
const captureGallery = [
  {
    id: 1,
    timestamp: "14:32:15",
    date: "23 Août 2025",
    camera: "CAM-01",
    person: "Jean Dupont",
    confidence: 98,
    status: "recognized",
    image: "/figmaAssets/div-23.svg",
    location: "Entrée Principale",
    activity: "Entrée autorisée"
  },
  {
    id: 2,
    timestamp: "14:28:42", 
    date: "23 Août 2025",
    camera: "CAM-02",
    person: "Marie Martin",
    confidence: 92,
    status: "recognized",
    image: "/figmaAssets/div-22.svg",
    location: "Hall Principal",
    activity: "Passage normal"
  },
  {
    id: 3,
    timestamp: "14:25:18",
    date: "23 Août 2025",
    camera: "CAM-01",
    person: "Personne Inconnue",
    confidence: 76,
    status: "unknown",
    image: "/figmaAssets/div-27.svg",
    location: "Entrée Principale", 
    activity: "Tentative d'accès"
  },
  {
    id: 4,
    timestamp: "14:22:03",
    date: "23 Août 2025",
    camera: "CAM-04",
    person: "Pierre Durand",
    confidence: 95,
    status: "recognized",
    image: "/figmaAssets/div-24.svg",
    location: "Sortie Secours",
    activity: "Sortie autorisée"
  },
  {
    id: 5,
    timestamp: "14:18:29",
    date: "23 Août 2025",
    camera: "CAM-03",
    person: "Sophie Leblanc",
    confidence: 89,
    status: "recognized",
    image: "/figmaAssets/div-25.svg",
    location: "Parking",
    activity: "Arrivée véhicule"
  },
  {
    id: 6,
    timestamp: "14:15:47",
    date: "23 Août 2025",
    camera: "CAM-02",
    person: "Visiteur Non-ID",
    confidence: 67,
    status: "unknown",
    image: "/figmaAssets/div-26.svg",
    location: "Hall Principal",
    activity: "Accompagné"
  }
];

const liveFeeds = [
  {
    id: "CAM-01",
    name: "Entrée Principale",
    status: "recording",
    quality: "HD",
    fps: "25 FPS",
    lastMotion: "Il y a 2 min"
  },
  {
    id: "CAM-02",
    name: "Hall Principal", 
    status: "recording",
    quality: "HD",
    fps: "30 FPS",
    lastMotion: "Il y a 1 min"
  },
  {
    id: "CAM-03",
    name: "Parking",
    status: "standby",
    quality: "SD",
    fps: "15 FPS",
    lastMotion: "Il y a 15 min"
  },
  {
    id: "CAM-04",
    name: "Sortie Secours",
    status: "recording",
    quality: "HD", 
    fps: "25 FPS",
    lastMotion: "Il y a 5 min"
  }
];

export const CapturePage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const filteredCaptures = captureGallery.filter(capture => {
    const matchesSearch = capture.person.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         capture.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || capture.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 p-6 bg-[linear-gradient(90deg,rgba(248,250,252,1)_0%,rgba(230,242,255,1)_100%)]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 [font-family:'Inter',Helvetica]">
              Galerie de Captures
            </h1>
            <p className="text-sm text-gray-600 [font-family:'Inter',Helvetica] mt-1">
              Gestion et analyse des captures de surveillance en temps réel
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/10 text-green-500 px-3 py-1">
              ● Live • 4 caméras actives
            </Badge>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
              <img
                className="w-4 h-4 mr-2"
                alt="Capture"
                src="/figmaAssets/frame-1.svg"
              />
              Capture Manuelle
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 [font-family:'Inter',Helvetica] uppercase tracking-wide">
                    Captures Aujourd'hui
                  </p>
                  <p className="text-2xl font-bold text-gray-900 [font-family:'Inter',Helvetica] mt-1">
                    147
                  </p>
                  <p className="text-xs text-green-600 [font-family:'Inter',Helvetica] mt-1">
                    +23% vs hier
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <img className="w-6 h-6" alt="Camera" src="/figmaAssets/frame.svg" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 [font-family:'Inter',Helvetica] uppercase tracking-wide">
                    Personnes Reconnues
                  </p>
                  <p className="text-2xl font-bold text-gray-900 [font-family:'Inter',Helvetica] mt-1">
                    89%
                  </p>
                  <p className="text-xs text-green-600 [font-family:'Inter',Helvetica] mt-1">
                    Taux élevé
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <img className="w-6 h-6" alt="Recognition" src="/figmaAssets/frame-2.svg" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 [font-family:'Inter',Helvetica] uppercase tracking-wide">
                    Alertes Actives
                  </p>
                  <p className="text-2xl font-bold text-gray-900 [font-family:'Inter',Helvetica] mt-1">
                    3
                  </p>
                  <p className="text-xs text-orange-600 [font-family:'Inter',Helvetica] mt-1">
                    À traiter
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <img className="w-6 h-6" alt="Alert" src="/figmaAssets/frame-4.svg" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 [font-family:'Inter',Helvetica] uppercase tracking-wide">
                    Stockage Utilisé
                  </p>
                  <p className="text-2xl font-bold text-gray-900 [font-family:'Inter',Helvetica] mt-1">
                    67%
                  </p>
                  <p className="text-xs text-gray-600 [font-family:'Inter',Helvetica] mt-1">
                    2.4 TB / 3.6 TB
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <img className="w-6 h-6" alt="Storage" src="/figmaAssets/div-6.svg" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls and Filters */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Input
                    placeholder="Rechercher par nom ou localisation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-72 pl-10"
                  />
                  <img
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    alt="Search"
                    src="/figmaAssets/button.svg"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={selectedFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("all")}
                  >
                    Toutes
                  </Button>
                  <Button
                    variant={selectedFilter === "recognized" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("recognized")}
                  >
                    Reconnues
                  </Button>
                  <Button
                    variant={selectedFilter === "unknown" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("unknown")}
                  >
                    Inconnues
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  Grille
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  Liste
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-4 gap-6">
          {/* Live Feeds */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900 [font-family:'Inter',Helvetica]">
                Flux en Direct
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {liveFeeds.map((feed) => (
                    <Card 
                      key={feed.id} 
                      className={`cursor-pointer transition-colors ${
                        feed.status === 'recording' 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              feed.status === 'recording' ? 'bg-red-500' : 'bg-gray-400'
                            }`} />
                            <span className="font-semibold text-sm text-gray-900 [font-family:'Inter',Helvetica]">
                              {feed.name}
                            </span>
                          </div>
                          <Badge className={`text-xs ${
                            feed.status === 'recording' 
                              ? 'bg-red-500/10 text-red-500' 
                              : 'bg-gray-500/10 text-gray-500'
                          }`}>
                            {feed.status === 'recording' ? 'REC' : 'PAUSE'}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-600 space-y-1 [font-family:'Inter',Helvetica]">
                          <div className="flex justify-between">
                            <span>Qualité:</span>
                            <span>{feed.quality}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>FPS:</span>
                            <span>{feed.fps}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Mouvement:</span>
                            <span>{feed.lastMotion}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Capture Gallery */}
          <div className="col-span-3">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-gray-900 [font-family:'Inter',Helvetica]">
                    Captures Récentes ({filteredCaptures.length})
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500/10 text-blue-500 text-xs">
                      Temps réel
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <img
                        className="w-4 h-6"
                        alt="Refresh"
                        src="/figmaAssets/button.svg"
                      />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-2 gap-4">
                      {filteredCaptures.map((capture) => (
                        <Card 
                          key={capture.id} 
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            capture.status === 'recognized' 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-orange-50 border-orange-200'
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <Avatar className="w-14 h-14 border-2 border-white shadow-sm">
                                <AvatarImage src={capture.image} />
                                <AvatarFallback className="bg-gray-200">
                                  {capture.person.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-semibold text-sm text-gray-900 [font-family:'Inter',Helvetica] truncate">
                                    {capture.person}
                                  </h4>
                                  <Badge 
                                    className={`text-xs ml-2 ${
                                      capture.status === 'recognized'
                                        ? 'bg-green-500/10 text-green-600'
                                        : 'bg-orange-500/10 text-orange-600'
                                    }`}
                                  >
                                    {capture.confidence}%
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-600 [font-family:'Inter',Helvetica] mb-2">
                                  {capture.location} • {capture.camera}
                                </p>
                                <div className="flex items-center justify-between text-xs text-gray-500 [font-family:'Inter',Helvetica]">
                                  <span>{capture.date}</span>
                                  <span>{capture.timestamp}</span>
                                </div>
                                <p className="text-xs text-gray-600 [font-family:'Inter',Helvetica] mt-1 italic">
                                  {capture.activity}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredCaptures.map((capture) => (
                        <Card 
                          key={capture.id} 
                          className={`cursor-pointer transition-colors ${
                            capture.status === 'recognized' 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-orange-50 border-orange-200'
                          }`}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center gap-4">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={capture.image} />
                                <AvatarFallback>{capture.person.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold text-sm text-gray-900 [font-family:'Inter',Helvetica]">
                                    {capture.person}
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500 [font-family:'Inter',Helvetica]">
                                      {capture.timestamp}
                                    </span>
                                    <Badge 
                                      className={`text-xs ${
                                        capture.status === 'recognized'
                                          ? 'bg-green-500/10 text-green-600'
                                          : 'bg-orange-500/10 text-orange-600'
                                      }`}
                                    >
                                      {capture.confidence}%
                                    </Badge>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-600 [font-family:'Inter',Helvetica]">
                                  {capture.location} • {capture.camera} • {capture.activity}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900 [font-family:'Inter',Helvetica]">
              Actions Rapides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              <Button variant="outline" className="flex flex-col h-20 gap-2">
                <img className="w-6 h-6" alt="Export" src="/figmaAssets/frame-1.svg" />
                <span className="text-xs">Exporter Tout</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20 gap-2">
                <img className="w-6 h-6" alt="Archive" src="/figmaAssets/frame-5.svg" />
                <span className="text-xs">Archiver</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20 gap-2">
                <img className="w-6 h-6" alt="Report" src="/figmaAssets/frame-4.svg" />
                <span className="text-xs">Rapport</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20 gap-2">
                <img className="w-6 h-6" alt="Settings" src="/figmaAssets/button.svg" />
                <span className="text-xs">Paramètres</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20 gap-2">
                <img className="w-6 h-6" alt="Analytics" src="/figmaAssets/div-6.svg" />
                <span className="text-xs">Analyses</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};