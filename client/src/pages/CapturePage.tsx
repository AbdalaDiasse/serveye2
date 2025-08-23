import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const cameraData = [
  {
    id: "CAM-01",
    name: "Entrée Principale",
    status: "active",
    lastCapture: "Il y a 2 min",
    captures: 45,
    quality: "HD",
    zone: "Zone A"
  },
  {
    id: "CAM-02", 
    name: "Hall Principal",
    status: "active",
    lastCapture: "Il y a 5 min",
    captures: 32,
    quality: "HD",
    zone: "Zone B"
  },
  {
    id: "CAM-03",
    name: "Parking",
    status: "inactive",
    lastCapture: "Il y a 1h",
    captures: 18,
    quality: "SD",
    zone: "Zone C"
  },
  {
    id: "CAM-04",
    name: "Sortie Secours",
    status: "active",
    lastCapture: "Il y a 8 min",
    captures: 12,
    quality: "HD",
    zone: "Zone A"
  }
];

const recentCaptures = [
  {
    id: 1,
    timestamp: "14:32:15",
    camera: "CAM-01",
    person: "Jean Dupont",
    confidence: 98,
    status: "recognized",
    avatar: "/figmaAssets/div-23.svg"
  },
  {
    id: 2,
    timestamp: "14:28:42",
    camera: "CAM-02", 
    person: "Marie Martin",
    confidence: 92,
    status: "recognized",
    avatar: "/figmaAssets/div-22.svg"
  },
  {
    id: 3,
    timestamp: "14:25:18",
    camera: "CAM-01",
    person: "Inconnu",
    confidence: 76,
    status: "unknown",
    avatar: "/figmaAssets/div-27.svg"
  },
  {
    id: 4,
    timestamp: "14:22:03",
    camera: "CAM-04",
    person: "Pierre Durand",
    confidence: 95,
    status: "recognized", 
    avatar: "/figmaAssets/div-24.svg"
  }
];

export const CapturePage = (): JSX.Element => {
  const [selectedCamera, setSelectedCamera] = useState<string>("all");
  const [captureMode, setCaptureMode] = useState<string>("auto");

  return (
    <div className="flex-1 p-8 bg-[linear-gradient(90deg,rgba(248,250,252,1)_0%,rgba(230,242,255,1)_100%)]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 [font-family:'Inter',Helvetica]">
              Capture de Personnes
            </h1>
            <p className="text-sm text-gray-600 [font-family:'Inter',Helvetica]">
              Système de capture et analyse en temps réel
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/10 text-green-500">
              4 caméras actives
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

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 [font-family:'Inter',Helvetica]">
                    Captures Aujourd'hui
                  </p>
                  <p className="text-2xl font-bold text-gray-900 [font-family:'Inter',Helvetica]">
                    107
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <img
                    className="w-6 h-6"
                    alt="Camera"
                    src="/figmaAssets/frame.svg"
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs">
                <span className="text-green-500 [font-family:'Inter',Helvetica]">+12%</span>
                <span className="text-gray-500 ml-1 [font-family:'Inter',Helvetica]">vs hier</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 [font-family:'Inter',Helvetica]">
                    Personnes Reconnues
                  </p>
                  <p className="text-2xl font-bold text-gray-900 [font-family:'Inter',Helvetica]">
                    89%
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <img
                    className="w-6 h-6"
                    alt="Recognition"
                    src="/figmaAssets/frame-2.svg"
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs">
                <span className="text-green-500 [font-family:'Inter',Helvetica]">+3%</span>
                <span className="text-gray-500 ml-1 [font-family:'Inter',Helvetica]">vs hier</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 [font-family:'Inter',Helvetica]">
                    Qualité Moyenne
                  </p>
                  <p className="text-2xl font-bold text-gray-900 [font-family:'Inter',Helvetica]">
                    94%
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <img
                    className="w-6 h-6"
                    alt="Quality"
                    src="/figmaAssets/div-6.svg"
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs">
                <span className="text-yellow-500 [font-family:'Inter',Helvetica]">+1%</span>
                <span className="text-gray-500 ml-1 [font-family:'Inter',Helvetica]">vs hier</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 [font-family:'Inter',Helvetica]">
                    Alertes Actives
                  </p>
                  <p className="text-2xl font-bold text-gray-900 [font-family:'Inter',Helvetica]">
                    3
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <img
                    className="w-6 h-6"
                    alt="Alert"
                    src="/figmaAssets/frame-4.svg"
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs">
                <span className="text-red-500 [font-family:'Inter',Helvetica]">+2</span>
                <span className="text-gray-500 ml-1 [font-family:'Inter',Helvetica]">vs hier</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Camera List */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900 [font-family:'Inter',Helvetica]">
                Caméras de Capture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="active" className="text-sm">Actives</TabsTrigger>
                  <TabsTrigger value="all" className="text-sm">Toutes</TabsTrigger>
                </TabsList>
                <TabsContent value="active" className="mt-0">
                  <ScrollArea className="h-80">
                    <div className="space-y-3">
                      {cameraData.filter(cam => cam.status === 'active').map((camera) => (
                        <Card 
                          key={camera.id} 
                          className={`cursor-pointer transition-colors ${
                            selectedCamera === camera.id 
                              ? 'bg-blue-50 border-blue-200' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedCamera(camera.id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <div>
                                  <h4 className="font-semibold text-sm text-gray-900 [font-family:'Inter',Helvetica]">
                                    {camera.name}
                                  </h4>
                                  <p className="text-xs text-gray-500 [font-family:'Inter',Helvetica]">
                                    {camera.id} • {camera.zone}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs font-semibold text-gray-900 [font-family:'Inter',Helvetica]">
                                  {camera.captures}
                                </div>
                                <div className="text-xs text-gray-500 [font-family:'Inter',Helvetica]">
                                  captures
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="all" className="mt-0">
                  <ScrollArea className="h-80">
                    <div className="space-y-3">
                      {cameraData.map((camera) => (
                        <Card 
                          key={camera.id} 
                          className={`cursor-pointer transition-colors ${
                            selectedCamera === camera.id 
                              ? 'bg-blue-50 border-blue-200' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedCamera(camera.id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${
                                  camera.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                                }`} />
                                <div>
                                  <h4 className="font-semibold text-sm text-gray-900 [font-family:'Inter',Helvetica]">
                                    {camera.name}
                                  </h4>
                                  <p className="text-xs text-gray-500 [font-family:'Inter',Helvetica]">
                                    {camera.id} • {camera.zone}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs font-semibold text-gray-900 [font-family:'Inter',Helvetica]">
                                  {camera.captures}
                                </div>
                                <div className="text-xs text-gray-500 [font-family:'Inter',Helvetica]">
                                  captures
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Recent Captures */}
          <Card className="bg-white border-0 shadow-sm col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-900 [font-family:'Inter',Helvetica]">
                  Captures Récentes
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
              <ScrollArea className="h-80">
                <div className="space-y-3">
                  {recentCaptures.map((capture) => (
                    <Card 
                      key={capture.id} 
                      className={`${
                        capture.status === 'recognized' 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-orange-50 border-orange-200'
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={capture.avatar} />
                            <AvatarFallback>{capture.person.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-sm text-gray-900 [font-family:'Inter',Helvetica]">
                                {capture.person}
                              </h4>
                              <span className="text-xs text-gray-500 [font-family:'Inter',Helvetica]">
                                {capture.timestamp}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-600 [font-family:'Inter',Helvetica]">
                                {capture.camera} • Confiance: {capture.confidence}%
                              </p>
                              <Badge 
                                className={`text-xs ${
                                  capture.status === 'recognized'
                                    ? 'bg-green-500/10 text-green-500'
                                    : 'bg-orange-500/10 text-orange-500'
                                }`}
                              >
                                {capture.status === 'recognized' ? 'Reconnu' : 'Inconnu'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs text-gray-500 [font-family:'Inter',Helvetica]">
                      Reconnus (89%)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-xs text-gray-500 [font-family:'Inter',Helvetica]">
                      Inconnus (11%)
                    </span>
                  </div>
                </div>
                <Button variant="link" className="text-blue-500 font-semibold text-sm p-0 h-auto">
                  Voir tout
                  <img
                    className="w-3 h-4 ml-1"
                    alt="Arrow"
                    src="/figmaAssets/i-3.svg"
                  />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Section */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900 [font-family:'Inter',Helvetica]">
              Configuration de Capture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 [font-family:'Inter',Helvetica] mb-2 block">
                  Mode de Capture
                </label>
                <div className="space-y-2">
                  <div 
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      captureMode === 'auto' 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setCaptureMode('auto')}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        captureMode === 'auto' 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {captureMode === 'auto' && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                        )}
                      </div>
                      <span className="text-sm text-gray-900 [font-family:'Inter',Helvetica]">
                        Automatique
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 ml-6 [font-family:'Inter',Helvetica]">
                      Capture lors de détection
                    </p>
                  </div>
                  <div 
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      captureMode === 'manual' 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setCaptureMode('manual')}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        captureMode === 'manual' 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {captureMode === 'manual' && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                        )}
                      </div>
                      <span className="text-sm text-gray-900 [font-family:'Inter',Helvetica]">
                        Manuel
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 ml-6 [font-family:'Inter',Helvetica]">
                      Capture à la demande
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 [font-family:'Inter',Helvetica] mb-2 block">
                  Qualité de Capture
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <Card className="bg-blue-50 border border-blue-200">
                    <CardContent className="p-3 text-center">
                      <div className="text-lg font-bold text-blue-600 [font-family:'Inter',Helvetica]">HD</div>
                      <p className="text-xs text-gray-600 [font-family:'Inter',Helvetica]">1080p</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50 border border-gray-200">
                    <CardContent className="p-3 text-center">
                      <div className="text-lg font-bold text-gray-600 [font-family:'Inter',Helvetica]">SD</div>
                      <p className="text-xs text-gray-600 [font-family:'Inter',Helvetica]">720p</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 [font-family:'Inter',Helvetica] mb-2 block">
                  Actions Rapides
                </label>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <img
                      className="w-4 h-4 mr-2"
                      alt="Export"
                      src="/figmaAssets/frame-1.svg"
                    />
                    Exporter Captures
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <img
                      className="w-4 h-4 mr-2"
                      alt="Config"
                      src="/figmaAssets/button.svg"
                    />
                    Configurer Alertes
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};