import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Import des images générées
import businessmanPhoto from "@assets/generated_images/Security_capture_businessman_photo_2feb92d4.png";
import womanPhoto from "@assets/generated_images/Security_capture_woman_photo_e17e3828.png";
import casualManPhoto from "@assets/generated_images/Security_capture_casual_man_eb27432b.png";
import elderlyWomanPhoto from "@assets/generated_images/Security_capture_elderly_woman_37bac27b.png";
import youngManPhoto from "@assets/generated_images/Security_capture_young_man_e6e7c093.png";

// Données des captures avec les vraies images générées
const captureData = [
  {
    id: 1,
    name: "Jean Dupont",
    time: "14:32",
    date: "23 Août 2025",
    camera: "CAM-01",
    location: "Entrée Principale",
    confidence: 98,
    status: "recognized",
    image: businessmanPhoto,
    activity: "Entrée autorisée"
  },
  {
    id: 2,
    name: "Marie Martin",
    time: "14:28",
    date: "23 Août 2025",
    camera: "CAM-02",
    location: "Hall Principal",
    confidence: 92,
    status: "recognized",
    image: womanPhoto,
    activity: "Passage normal"
  },
  {
    id: 3,
    name: "Pierre Leclerc",
    time: "14:25",
    date: "23 Août 2025",
    camera: "CAM-03",
    location: "Bureau",
    confidence: 87,
    status: "recognized",
    image: casualManPhoto,
    activity: "Travail en cours"
  },
  {
    id: 4,
    name: "Sylvie Moreau",
    time: "14:22",
    date: "23 Août 2025",
    camera: "CAM-04",
    location: "Réception",
    confidence: 94,
    status: "recognized",
    image: elderlyWomanPhoto,
    activity: "Visite client"
  },
  {
    id: 5,
    name: "Thomas Bernard",
    time: "14:18",
    date: "23 Août 2025",
    camera: "CAM-01",
    location: "Entrée Principale",
    confidence: 89,
    status: "recognized",
    image: youngManPhoto,
    activity: "Arrivée matinale"
  },
  {
    id: 6,
    name: "Personne Inconnue",
    time: "14:15",
    date: "23 Août 2025",
    camera: "CAM-02",
    location: "Hall Principal",
    confidence: 67,
    status: "unknown",
    image: businessmanPhoto,
    activity: "Visiteur non-identifié"
  }
];

const cameraFeeds = [
  {
    id: "CAM-01",
    name: "Entrée Principale",
    status: "active",
    quality: "1080p",
    fps: "30 FPS",
    lastActivity: "Il y a 2 min"
  },
  {
    id: "CAM-02",
    name: "Hall Principal",
    status: "active",
    quality: "1080p",
    fps: "25 FPS",
    lastActivity: "Il y a 1 min"
  },
  {
    id: "CAM-03",
    name: "Bureau",
    status: "active",
    quality: "720p",
    fps: "30 FPS",
    lastActivity: "Il y a 5 min"
  },
  {
    id: "CAM-04",
    name: "Réception",
    status: "active",
    quality: "1080p",
    fps: "25 FPS",
    lastActivity: "Il y a 3 min"
  }
];

export const CapturePage = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCapture, setSelectedCapture] = useState<number | null>(null);

  const filteredCaptures = captureData.filter(capture => {
    const matchesSearch = capture.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         capture.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || capture.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 [font-family:'Inter',Helvetica]">
                Capture de Personnes
              </h1>
              <p className="text-sm text-gray-600 [font-family:'Inter',Helvetica]">
                Système de surveillance et reconnaissance faciale en temps réel
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-800 px-3 py-1">
              ● LIVE • 4 caméras actives
            </Badge>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <img
                className="w-4 h-4 mr-2"
                alt="Capture"
                src="/figmaAssets/frame-1.svg"
              />
              Nouvelle Capture
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-4 gap-6 mb-6">
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 [font-family:'Inter',Helvetica]">
                    Captures Aujourd'hui
                  </p>
                  <p className="text-3xl font-bold text-gray-900 [font-family:'Inter',Helvetica] mt-2">
                    147
                  </p>
                  <p className="text-sm text-green-600 [font-family:'Inter',Helvetica] mt-1">
                    +12% vs hier
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <img className="w-6 h-6" alt="Camera" src="/figmaAssets/frame.svg" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 [font-family:'Inter',Helvetica]">
                    Personnes Reconnues
                  </p>
                  <p className="text-3xl font-bold text-gray-900 [font-family:'Inter',Helvetica] mt-2">
                    89%
                  </p>
                  <p className="text-sm text-green-600 [font-family:'Inter',Helvetica] mt-1">
                    Taux élevé
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <img className="w-6 h-6" alt="Recognition" src="/figmaAssets/frame-2.svg" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 [font-family:'Inter',Helvetica]">
                    Alertes Actives
                  </p>
                  <p className="text-3xl font-bold text-gray-900 [font-family:'Inter',Helvetica] mt-2">
                    3
                  </p>
                  <p className="text-sm text-orange-600 [font-family:'Inter',Helvetica] mt-1">
                    À traiter
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <img className="w-6 h-6" alt="Alert" src="/figmaAssets/frame-4.svg" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 [font-family:'Inter',Helvetica]">
                    Stockage
                  </p>
                  <p className="text-3xl font-bold text-gray-900 [font-family:'Inter',Helvetica] mt-2">
                    67%
                  </p>
                  <p className="text-sm text-gray-600 [font-family:'Inter',Helvetica] mt-1">
                    2.4 TB utilisés
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <img className="w-6 h-6" alt="Storage" src="/figmaAssets/div-6.svg" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Camera Feeds */}
          <div className="col-span-3">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900 [font-family:'Inter',Helvetica]">
                  Flux Caméras
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cameraFeeds.map((feed) => (
                    <div 
                      key={feed.id}
                      className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="font-medium text-sm text-gray-900 [font-family:'Inter',Helvetica]">
                            {feed.id}
                          </span>
                        </div>
                        <Badge className="bg-red-100 text-red-700 text-xs px-2 py-1">
                          REC
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm text-gray-900 [font-family:'Inter',Helvetica] mb-1">
                        {feed.name}
                      </h4>
                      <div className="text-xs text-gray-600 [font-family:'Inter',Helvetica] space-y-1">
                        <div className="flex justify-between">
                          <span>Qualité:</span>
                          <span>{feed.quality}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>FPS:</span>
                          <span>{feed.fps}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Activité:</span>
                          <span>{feed.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center - Capture Gallery */}
          <div className="col-span-9">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 [font-family:'Inter',Helvetica]">
                    Captures Récentes ({filteredCaptures.length})
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Input
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64 pl-10"
                      />
                      <img
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                        alt="Search"
                        src="/figmaAssets/button.svg"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={filterStatus === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterStatus("all")}
                      >
                        Tous
                      </Button>
                      <Button
                        variant={filterStatus === "recognized" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterStatus("recognized")}
                      >
                        Reconnus
                      </Button>
                      <Button
                        variant={filterStatus === "unknown" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterStatus("unknown")}
                      >
                        Inconnus
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="grid grid-cols-3 gap-4">
                    {filteredCaptures.map((capture) => (
                      <div
                        key={capture.id}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                          capture.status === 'recognized'
                            ? 'bg-green-50 border-green-200 hover:border-green-300'
                            : 'bg-orange-50 border-orange-200 hover:border-orange-300'
                        } ${selectedCapture === capture.id ? 'ring-2 ring-blue-500' : ''}`}
                        onClick={() => setSelectedCapture(capture.id)}
                      >
                        {/* Image de capture */}
                        <div className="relative mb-3">
                          <img
                            src={capture.image}
                            alt={capture.name}
                            className="w-full h-32 object-cover rounded-lg border-2 border-white shadow-sm"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge 
                              className={`text-xs px-2 py-1 ${
                                capture.status === 'recognized'
                                  ? 'bg-green-600 text-white'
                                  : 'bg-orange-600 text-white'
                              }`}
                            >
                              {capture.confidence}%
                            </Badge>
                          </div>
                          <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            {capture.time}
                          </div>
                        </div>

                        {/* Informations */}
                        <div className="space-y-2">
                          <h3 className="font-semibold text-sm text-gray-900 [font-family:'Inter',Helvetica] truncate">
                            {capture.name}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-gray-600 [font-family:'Inter',Helvetica]">
                            <span>{capture.camera}</span>
                            <span>{capture.date}</span>
                          </div>
                          <p className="text-xs text-gray-600 [font-family:'Inter',Helvetica]">
                            📍 {capture.location}
                          </p>
                          <p className="text-xs text-gray-700 [font-family:'Inter',Helvetica] italic">
                            {capture.activity}
                          </p>
                          <div className="flex items-center justify-between pt-2">
                            <Badge 
                              className={`text-xs ${
                                capture.status === 'recognized'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-orange-100 text-orange-700'
                              }`}
                            >
                              {capture.status === 'recognized' ? '✓ Reconnu' : '⚠ Inconnu'}
                            </Badge>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <img
                                className="w-3 h-3"
                                alt="Actions"
                                src="/figmaAssets/button.svg"
                              />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-6">
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-600 [font-family:'Inter',Helvetica]">
                      Reconnus: {captureData.filter(c => c.status === 'recognized').length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    <span className="text-sm text-gray-600 [font-family:'Inter',Helvetica]">
                      Inconnus: {captureData.filter(c => c.status === 'unknown').length}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <img className="w-4 h-4 mr-2" alt="Export" src="/figmaAssets/frame-1.svg" />
                    Exporter
                  </Button>
                  <Button variant="outline" size="sm">
                    <img className="w-4 h-4 mr-2" alt="Archive" src="/figmaAssets/frame-5.svg" />
                    Archiver
                  </Button>
                  <Button variant="outline" size="sm">
                    <img className="w-4 h-4 mr-2" alt="Settings" src="/figmaAssets/button.svg" />
                    Paramètres
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};