import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

// Import des images
import businessmanPhoto from "@assets/generated_images/Security_capture_businessman_photo_2feb92d4.png";
import womanPhoto from "@assets/generated_images/Security_capture_woman_photo_e17e3828.png";
import casualManPhoto from "@assets/generated_images/Security_capture_casual_man_eb27432b.png";
import elderlyWomanPhoto from "@assets/generated_images/Security_capture_elderly_woman_37bac27b.png";
import youngManPhoto from "@assets/generated_images/Security_capture_young_man_e6e7c093.png";

export const PersonnesDashboardPage = (): JSX.Element => {
  const [selectedCamera, setSelectedCamera] = useState("all");
  const [selectedZone, setSelectedZone] = useState("all");
  const [entriesExitsPeriod, setEntriesExitsPeriod] = useState("today");
  const [detectionsPeriod, setDetectionsPeriod] = useState("today");
  const [genderPeriod, setGenderPeriod] = useState("today");
  const [agePeriod, setAgePeriod] = useState("today");
  const [heatmapPeriod, setHeatmapPeriod] = useState("today");

  // Fonction pour générer des données selon la période
  const generateEntriesExitsData = (period: string) => {
    switch (period) {
      case "today":
        return [
          { time: "08:00", entries: 45, exits: 12 },
          { time: "09:00", entries: 78, exits: 23 },
          { time: "10:00", entries: 102, exits: 45 },
          { time: "11:00", entries: 156, exits: 67 },
          { time: "12:00", entries: 234, exits: 89 },
          { time: "13:00", entries: 189, exits: 145 },
          { time: "14:00", entries: 267, exits: 178 },
          { time: "15:00", entries: 312, exits: 234 },
          { time: "16:00", entries: 289, exits: 267 },
          { time: "17:00", entries: 245, exits: 312 },
          { time: "18:00", entries: 178, exits: 345 },
        ];
      case "week":
        return [
          { time: "Lun", entries: 1245, exits: 1156 },
          { time: "Mar", entries: 1367, exits: 1278 },
          { time: "Mer", entries: 1489, exits: 1389 },
          { time: "Jeu", entries: 1678, exits: 1567 },
          { time: "Ven", entries: 1890, exits: 1789 },
          { time: "Sam", entries: 987, exits: 945 },
          { time: "Dim", entries: 567, exits: 534 },
        ];
      case "month":
        return [
          { time: "Sem 1", entries: 8945, exits: 8756 },
          { time: "Sem 2", entries: 9267, exits: 9178 },
          { time: "Sem 3", entries: 9489, exits: 9289 },
          { time: "Sem 4", entries: 9678, exits: 9567 },
        ];
      case "year":
        return [
          { time: "Jan", entries: 45678, exits: 44567 },
          { time: "Fév", entries: 47890, exits: 46789 },
          { time: "Mar", entries: 52345, exits: 51234 },
          { time: "Avr", entries: 48901, exits: 47890 },
          { time: "Mai", entries: 56789, exits: 55678 },
          { time: "Jun", entries: 54321, exits: 53210 },
          { time: "Jul", entries: 61234, exits: 60123 },
          { time: "Aoû", entries: 59876, exits: 58765 },
          { time: "Sep", entries: 53456, exits: 52345 },
          { time: "Oct", entries: 49876, exits: 48765 },
          { time: "Nov", entries: 46789, exits: 45678 },
          { time: "Déc", entries: 43210, exits: 42109 },
        ];
      default:
        return [];
    }
  };

  const generateDetectionData = (period: string) => {
    switch (period) {
      case "today":
        return [
          { time: "08:00", detections: 57 },
          { time: "09:00", detections: 101 },
          { time: "10:00", detections: 147 },
          { time: "11:00", detections: 223 },
          { time: "12:00", detections: 323 },
          { time: "13:00", detections: 334 },
          { time: "14:00", detections: 445 },
          { time: "15:00", detections: 546 },
          { time: "16:00", detections: 556 },
          { time: "17:00", detections: 557 },
          { time: "18:00", detections: 523 },
        ];
      case "week":
        return [
          { time: "Lun", detections: 3457 },
          { time: "Mar", detections: 3678 },
          { time: "Mer", detections: 3890 },
          { time: "Jeu", detections: 4123 },
          { time: "Ven", detections: 4567 },
          { time: "Sam", detections: 2345 },
          { time: "Dim", detections: 1234 },
        ];
      case "month":
        return [
          { time: "Sem 1", detections: 23456 },
          { time: "Sem 2", detections: 24567 },
          { time: "Sem 3", detections: 25678 },
          { time: "Sem 4", detections: 26789 },
        ];
      case "year":
        return [
          { time: "Jan", detections: 123456 },
          { time: "Fév", detections: 134567 },
          { time: "Mar", detections: 145678 },
          { time: "Avr", detections: 135789 },
          { time: "Mai", detections: 156890 },
          { time: "Jun", detections: 148901 },
          { time: "Jul", detections: 167012 },
          { time: "Aoû", detections: 159123 },
          { time: "Sep", detections: 142345 },
          { time: "Oct", detections: 134567 },
          { time: "Nov", detections: 125678 },
          { time: "Déc", detections: 118901 },
        ];
      default:
        return [];
    }
  };

  // Données pour les graphiques
  const entriesExitsData = generateEntriesExitsData(entriesExitsPeriod);
  const detectionData = generateDetectionData(detectionsPeriod);

  const ageDistribution = [
    { range: "18-25", count: 234 },
    { range: "26-35", count: 412 },
    { range: "36-45", count: 356 },
    { range: "46-55", count: 189 },
    { range: "56+", count: 56 },
  ];

  const generateGenderData = (period: string) => {
    switch (period) {
      case "today":
        return [
          { gender: "Homme", count: 743, percentage: 59.6 },
          { gender: "Femme", count: 504, percentage: 40.4 },
        ];
      case "week":
        return [
          { gender: "Homme", count: 5234, percentage: 58.2 },
          { gender: "Femme", count: 3766, percentage: 41.8 },
        ];
      case "month":
        return [
          { gender: "Homme", count: 22341, percentage: 57.8 },
          { gender: "Femme", count: 16329, percentage: 42.2 },
        ];
      case "year":
        return [
          { gender: "Homme", count: 287456, percentage: 58.9 },
          { gender: "Femme", count: 200544, percentage: 41.1 },
        ];
      default:
        return [];
    }
  };

  const genderData = generateGenderData(genderPeriod);

  const heatmapData = [
    { camera: "Cam 01", hour: "08", intensity: 0.3 },
    { camera: "Cam 01", hour: "09", intensity: 0.5 },
    { camera: "Cam 01", hour: "10", intensity: 0.7 },
    { camera: "Cam 01", hour: "11", intensity: 0.9 },
    { camera: "Cam 01", hour: "12", intensity: 1.0 },
    { camera: "Cam 02", hour: "08", intensity: 0.2 },
    { camera: "Cam 02", hour: "09", intensity: 0.4 },
    { camera: "Cam 02", hour: "10", intensity: 0.6 },
    { camera: "Cam 02", hour: "11", intensity: 0.8 },
    { camera: "Cam 02", hour: "12", intensity: 0.9 },
    { camera: "Cam 03", hour: "08", intensity: 0.4 },
    { camera: "Cam 03", hour: "09", intensity: 0.6 },
    { camera: "Cam 03", hour: "10", intensity: 0.8 },
    { camera: "Cam 03", hour: "11", intensity: 0.7 },
    { camera: "Cam 03", hour: "12", intensity: 0.5 },
  ];


  const recognitionList = [
    { id: 1, name: "Marc Dubois", time: "14:32", camera: "Caméra 01", status: "Reconnu", confidence: 95 },
    { id: 2, name: "Personne inconnue", time: "14:45", camera: "Caméra 03", status: "Intrusion", confidence: 28 },
    { id: 3, name: "Pierre Martin", time: "14:18", camera: "Caméra 02", status: "Reconnu", confidence: 88 },
    { id: 4, name: "Sophie Laurent", time: "13:55", camera: "Caméra 01", status: "Score faible", confidence: 45 },
  ];

  const capturesList = [
    { id: 1, time: "14:32", type: "Visage", camera: "Caméra 01", image: businessmanPhoto },
    { id: 2, time: "14:28", type: "Visage", camera: "Caméra 03", image: womanPhoto },
    { id: 3, time: "14:25", type: "Corps", camera: "Caméra 02", image: casualManPhoto },
    { id: 4, time: "14:20", type: "Visage", camera: "Caméra 04", image: elderlyWomanPhoto },
    { id: 5, time: "14:18", type: "Corps", camera: "Caméra 01", image: youngManPhoto },
    { id: 6, time: "14:15", type: "Visage", camera: "Caméra 03", image: womanPhoto },
  ];

  const getIntensityColor = (intensity: number) => {
    if (intensity > 0.8) return "bg-red-500";
    if (intensity > 0.6) return "bg-orange-500";
    if (intensity > 0.4) return "bg-yellow-500";
    if (intensity > 0.2) return "bg-green-500";
    return "bg-blue-500";
  };

  const maxCount = Math.max(...ageDistribution.map(d => d.count));
  const maxDetection = Math.max(...detectionData.map(d => d.detections));
  const maxEntry = Math.max(...entriesExitsData.map(d => Math.max(d.entries, d.exits)));

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-slate-50 to-blue-50/30 overflow-auto">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header avec titre et sélecteurs */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 [font-family:'Inter',Helvetica]">
              Dashboard Personnes
            </h1>
            <p className="text-sm text-slate-600 [font-family:'Inter',Helvetica]">
              Analyse et surveillance des personnes
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedCamera} onValueChange={setSelectedCamera}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Toutes les caméras" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les caméras</SelectItem>
                <SelectItem value="cam1">Caméra 01</SelectItem>
                <SelectItem value="cam2">Caméra 02</SelectItem>
                <SelectItem value="cam3">Caméra 03</SelectItem>
                <SelectItem value="cam4">Caméra 04</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedZone} onValueChange={setSelectedZone}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Toutes les zones" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les zones</SelectItem>
                <SelectItem value="entrance">Zone d'entrée</SelectItem>
                <SelectItem value="lobby">Hall d'accueil</SelectItem>
                <SelectItem value="parking">Parking</SelectItem>
                <SelectItem value="corridor">Couloirs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-3 gap-6">
          <Card className="bg-blue-500 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="bg-white/20 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{background: 'none'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <Badge className="bg-white/20 text-white border-0">+12%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,247</div>
              <p className="text-white/80 text-sm">Personnes détectées</p>
              <p className="text-white/60 text-xs mt-1">Aujourd'hui</p>
            </CardContent>
          </Card>

          <Card className="bg-emerald-500 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="bg-white/20 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{background: 'none'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <Badge className="bg-white/20 text-white border-0">+5%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">689 / 558</div>
              <p className="text-white/80 text-sm">Entrées / Sorties</p>
              <p className="text-white/60 text-xs mt-1">Aujourd'hui</p>
            </CardContent>
          </Card>

          <Card className="bg-red-500 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="bg-white/20 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{background: 'none'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <Badge className="bg-white/20 text-white border-0">+3</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">234 / 13</div>
              <p className="text-white/80 text-sm">Reconnus / Intrus</p>
              <p className="text-white/60 text-xs mt-1">Aujourd'hui</p>
            </CardContent>
          </Card>
        </div>


        {/* Graphiques */}
        <div className="grid grid-cols-12 gap-6">
          {/* Courbe Entrées et Sorties */}
          <Card className="col-span-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold text-slate-800">
                Entrées et Sorties
              </CardTitle>
              <Select value={entriesExitsPeriod} onValueChange={setEntriesExitsPeriod}>
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] relative">
                <svg viewBox="0 0 500 200" className="w-full h-full drop-shadow-sm">
                  {/* Définition des gradients */}
                  <defs>
                    <linearGradient id="entriesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="exitsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Grille améliorée */}
                  {[0, 40, 80, 120, 160, 200].map(y => (
                    <line key={y} x1="40" y1={y} x2="480" y2={y} 
                          stroke={y === 200 ? "#e5e7eb" : "#f3f4f6"} 
                          strokeWidth={y === 200 ? "1" : "0.5"} />
                  ))}
                  {entriesExitsData.map((_, i) => {
                    const x = 40 + (i * (440 / (entriesExitsData.length - 1)));
                    return (
                      <line key={i} x1={x} y1="0" x2={x} y2="200" 
                            stroke="#f9fafb" strokeWidth="0.5" />
                    );
                  })}
                  
                  {/* Zones de données avec gradients */}
                  {entriesExitsData.length > 0 && (
                    <>
                      <path
                        d={`M 40,${200 - (entriesExitsData[0].entries / maxEntry) * 180} 
                            ${entriesExitsData.map((d, i) => {
                              const x = 40 + (i * (440 / (entriesExitsData.length - 1)));
                              const y = 200 - (d.entries / maxEntry) * 180;
                              return `L ${x},${y}`;
                            }).join(' ')} 
                            L 480,200 L 40,200 Z`}
                        fill="url(#entriesGradient)"
                        opacity="0.6"
                      />
                      <path
                        d={`M 40,${200 - (entriesExitsData[0].exits / maxEntry) * 180} 
                            ${entriesExitsData.map((d, i) => {
                              const x = 40 + (i * (440 / (entriesExitsData.length - 1)));
                              const y = 200 - (d.exits / maxEntry) * 180;
                              return `L ${x},${y}`;
                            }).join(' ')} 
                            L 480,200 L 40,200 Z`}
                        fill="url(#exitsGradient)"
                        opacity="0.6"
                      />
                    </>
                  )}
                  
                  {/* Lignes principales */}
                  <path
                    d={`M 40,${200 - (entriesExitsData[0]?.entries || 0) / maxEntry * 180} 
                        ${entriesExitsData.map((d, i) => {
                          const x = 40 + (i * (440 / (entriesExitsData.length - 1)));
                          const y = 200 - (d.entries / maxEntry) * 180;
                          return `L ${x},${y}`;
                        }).join(' ')}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    filter="url(#glow)"
                  />
                  <path
                    d={`M 40,${200 - (entriesExitsData[0]?.exits || 0) / maxEntry * 180} 
                        ${entriesExitsData.map((d, i) => {
                          const x = 40 + (i * (440 / (entriesExitsData.length - 1)));
                          const y = 200 - (d.exits / maxEntry) * 180;
                          return `L ${x},${y}`;
                        }).join(' ')}`}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    filter="url(#glow)"
                  />
                  
                  {/* Points de données avec effet hover */}
                  {entriesExitsData.map((d, i) => {
                    const x = 40 + (i * (440 / (entriesExitsData.length - 1)));
                    const yEntries = 200 - (d.entries / maxEntry) * 180;
                    const yExits = 200 - (d.exits / maxEntry) * 180;
                    return (
                      <g key={i}>
                        <circle cx={x} cy={yEntries} r="4" fill="#10b981" stroke="white" strokeWidth="2"/>
                        <circle cx={x} cy={yExits} r="4" fill="#ef4444" stroke="white" strokeWidth="2"/>
                        <circle cx={x} cy={yEntries} r="8" fill="transparent" className="hover:fill-green-100"/>
                        <circle cx={x} cy={yExits} r="8" fill="transparent" className="hover:fill-red-100"/>
                      </g>
                    );
                  })}
                  
                  {/* Labels des axes */}
                  {entriesExitsData.map((d, i) => {
                    const x = 40 + (i * (440 / (entriesExitsData.length - 1)));
                    return (
                      <text key={i} x={x} y="190" textAnchor="middle" 
                            className="fill-gray-600 text-xs" 
                            style={{fontSize: '11px', fontFamily: 'Inter'}}>
                        {d.time}
                      </text>
                    );
                  })}
                </svg>
              </div>
              <div className="flex justify-center gap-6 mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-sm text-slate-600">Entrées</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-slate-600">Sorties</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Courbe Détections */}
          <Card className="col-span-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold text-slate-800">
                Détections au fil du temps
              </CardTitle>
              <Select value={detectionsPeriod} onValueChange={setDetectionsPeriod}>
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] relative">
                <svg viewBox="0 0 500 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="detectionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grille */}
                  {[0, 50, 100, 150, 200].map(y => (
                    <line key={y} x1="40" y1={y} x2="480" y2={y} stroke="#f3f4f6" strokeWidth="0.5" />
                  ))}
                  
                  {/* Zone de données */}
                  {detectionData.length > 0 && (
                    <path
                      d={`M 40,${200 - (detectionData[0].detections / maxDetection) * 180} 
                          ${detectionData.map((d, i) => {
                            const x = 40 + (i * (440 / (detectionData.length - 1)));
                            const y = 200 - (d.detections / maxDetection) * 180;
                            return `L ${x},${y}`;
                          }).join(' ')} 
                          L 480,200 L 40,200 Z`}
                      fill="url(#detectionGradient)"
                    />
                  )}
                  
                  {/* Ligne principale */}
                  <path
                    d={`M 40,${200 - (detectionData[0]?.detections || 0) / maxDetection * 180} 
                        ${detectionData.map((d, i) => {
                          const x = 40 + (i * (440 / (detectionData.length - 1)));
                          const y = 200 - (d.detections / maxDetection) * 180;
                          return `L ${x},${y}`;
                        }).join(' ')}`}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                  />
                  
                  {/* Points */}
                  {detectionData.map((d, i) => {
                    const x = 40 + (i * (440 / (detectionData.length - 1)));
                    const y = 200 - (d.detections / maxDetection) * 180;
                    return (
                      <circle key={i} cx={x} cy={y} r="4" fill="#3b82f6" stroke="white" strokeWidth="2"/>
                    );
                  })}
                  
                  {/* Labels */}
                  {detectionData.map((d, i) => {
                    const x = 40 + (i * (440 / (detectionData.length - 1)));
                    return (
                      <text key={i} x={x} y="190" textAnchor="middle" 
                            className="fill-gray-600 text-xs" 
                            style={{fontSize: '11px', fontFamily: 'Inter'}}>
                        {d.time}
                      </text>
                    );
                  })}
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* Répartition par genre - Graphique en secteurs */}
          <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold text-slate-800">
                Répartition par genre
              </CardTitle>
              <Select value={genderPeriod} onValueChange={setGenderPeriod}>
                <SelectTrigger className="w-[100px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Semaine</SelectItem>
                  <SelectItem value="month">Mois</SelectItem>
                  <SelectItem value="year">Année</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[240px]">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 140 140" className="w-full h-full transform -rotate-90">
                    <defs>
                      {/* Gradients améliorés */}
                      <linearGradient id="maleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#1e40af" />
                      </linearGradient>
                      <linearGradient id="femaleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f472b6" />
                        <stop offset="50%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#be185d" />
                      </linearGradient>
                      
                      {/* Gradients pour hover */}
                      <linearGradient id="maleHoverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#93c5fd" />
                        <stop offset="50%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                      <linearGradient id="femaleHoverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f9a8d4" />
                        <stop offset="50%" stopColor="#f472b6" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                      
                      {/* Ombres portées */}
                      <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                        <feOffset dx="2" dy="2" result="offset"/>
                        <feFlood floodColor="#000000" floodOpacity="0.2"/>
                        <feComposite in2="offset" operator="in"/>
                        <feMerge>
                          <feMergeNode/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                      
                      {/* Effet de brillance */}
                      <radialGradient id="shine" cx="30%" cy="30%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                      </radialGradient>
                    </defs>
                    
                    {/* Cercle de base avec ombre */}
                    <circle cx="70" cy="70" r="60" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="3" filter="url(#dropShadow)"/>
                    
                    {/* Secteur Homme avec animation */}
                    <g className="transition-all duration-300 hover:scale-105 cursor-pointer">
                      <path 
                        d={`M 70 70 L 70 10 A 60 60 0 ${genderData[0]?.percentage > 50 ? 1 : 0} 1 ${
                          70 + 60 * Math.cos((genderData[0]?.percentage / 100) * 2 * Math.PI - Math.PI/2)
                        } ${
                          70 + 60 * Math.sin((genderData[0]?.percentage / 100) * 2 * Math.PI - Math.PI/2)
                        } Z`}
                        fill="url(#maleGradient)"
                        stroke="white"
                        strokeWidth="3"
                        filter="url(#dropShadow)"
                        className="transition-all duration-300 hover:fill-[url(#maleHoverGradient)]"
                      />
                      {/* Effet de brillance */}
                      <path 
                        d={`M 70 70 L 70 10 A 60 60 0 ${genderData[0]?.percentage > 50 ? 1 : 0} 1 ${
                          70 + 60 * Math.cos((genderData[0]?.percentage / 100) * 2 * Math.PI - Math.PI/2)
                        } ${
                          70 + 60 * Math.sin((genderData[0]?.percentage / 100) * 2 * Math.PI - Math.PI/2)
                        } Z`}
                        fill="url(#shine)"
                        stroke="none"
                      />
                    </g>
                    
                    {/* Secteur Femme avec animation */}
                    <g className="transition-all duration-300 hover:scale-105 cursor-pointer">
                      <path 
                        d={`M 70 70 L ${
                          70 + 60 * Math.cos((genderData[0]?.percentage / 100) * 2 * Math.PI - Math.PI/2)
                        } ${
                          70 + 60 * Math.sin((genderData[0]?.percentage / 100) * 2 * Math.PI - Math.PI/2)
                        } A 60 60 0 ${genderData[1]?.percentage > 50 ? 1 : 0} 1 70 10 Z`}
                        fill="url(#femaleGradient)"
                        stroke="white"
                        strokeWidth="3"
                        filter="url(#dropShadow)"
                        className="transition-all duration-300 hover:fill-[url(#femaleHoverGradient)]"
                      />
                      {/* Effet de brillance */}
                      <path 
                        d={`M 70 70 L ${
                          70 + 60 * Math.cos((genderData[0]?.percentage / 100) * 2 * Math.PI - Math.PI/2)
                        } ${
                          70 + 60 * Math.sin((genderData[0]?.percentage / 100) * 2 * Math.PI - Math.PI/2)
                        } A 60 60 0 ${genderData[1]?.percentage > 50 ? 1 : 0} 1 70 10 Z`}
                        fill="url(#shine)"
                        stroke="none"
                      />
                    </g>
                    
                    {/* Cercle intérieur décoratif */}
                    <circle cx="70" cy="70" r="25" fill="white" stroke="#e2e8f0" strokeWidth="2" opacity="0.9"/>
                  </svg>
                  
                  {/* Centre du graphique avec animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-white rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-lg border border-slate-200">
                      <div className="text-lg font-bold text-slate-800 animate-pulse">
                        {genderData.reduce((sum, item) => sum + item.count, 0).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-600 font-medium">Total</div>
                    </div>
                  </div>
                </div>
                
                {/* Légende améliorée */}
                <div className="ml-8 space-y-4">
                  {genderData.map((item, index) => (
                    <div key={index} className="group flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-all duration-200 cursor-pointer">
                      <div className={`w-4 h-4 rounded-full shadow-md transition-all duration-200 group-hover:scale-110 ${
                        item.gender === "Homme" 
                          ? "bg-gradient-to-br from-blue-400 to-blue-600" 
                          : "bg-gradient-to-br from-pink-400 to-pink-600"
                      }`} />
                      <div className="text-sm">
                        <div className="font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
                          {item.gender}
                        </div>
                        <div className="text-slate-600 font-medium">
                          {item.count.toLocaleString()} 
                          <span className="text-slate-500 ml-1">({item.percentage}%)</span>
                        </div>
                      </div>
                      
                      {/* Barre de progression miniature */}
                      <div className="ml-auto w-12 h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-700 ${
                            item.gender === "Homme" 
                              ? "bg-gradient-to-r from-blue-400 to-blue-600" 
                              : "bg-gradient-to-r from-pink-400 to-pink-600"
                          }`}
                          style={{width: `${item.percentage}%`}}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Distribution des âges */}
          <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold text-slate-800">
                Distribution par âge
              </CardTitle>
              <Select value={agePeriod} onValueChange={setAgePeriod}>
                <SelectTrigger className="w-[100px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Semaine</SelectItem>
                  <SelectItem value="month">Mois</SelectItem>
                  <SelectItem value="year">Année</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ageDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 text-sm font-medium text-slate-700 shrink-0">
                        {item.range}
                      </div>
                      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300"
                          style={{width: `${(item.count / maxCount) * 100}%`}}
                        />
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-slate-800 ml-3 w-12 text-right">
                      {item.count}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Heatmap des détections */}
          <Card className="col-span-8">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold text-slate-800">
                Carte de chaleur des détections
              </CardTitle>
              <Select value={heatmapPeriod} onValueChange={setHeatmapPeriod}>
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Cam 01", "Cam 02", "Cam 03"].map((camera) => (
                  <div key={camera} className="flex items-center gap-2">
                    <div className="w-16 text-sm font-medium text-slate-700 shrink-0">
                      {camera}
                    </div>
                    <div className="flex gap-1 flex-1">
                      {["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18"].map((hour) => {
                        const data = heatmapData.find(d => d.camera === camera && d.hour === hour);
                        const intensity = data?.intensity || 0;
                        return (
                          <div 
                            key={hour}
                            className={`flex-1 h-8 rounded ${getIntensityColor(intensity)} opacity-${Math.round(intensity * 100)}`}
                            style={{opacity: 0.2 + (intensity * 0.8)}}
                            title={`${camera} - ${hour}h: ${Math.round(intensity * 100)}%`}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t text-xs text-slate-600">
                <span>08h</span>
                <span>12h</span>
                <span>18h</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Listes des détections récentes */}
        <div className="grid grid-cols-12 gap-6">
          {/* Liste de reconnaissance */}
          <Card className="col-span-6">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Reconnaissances récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                  {recognitionList.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border">
                      <div className="flex-1">
                        <div className="font-medium text-slate-800">{item.name}</div>
                        <div className="text-sm text-slate-600">{item.camera} • {item.time}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={item.status === "Reconnu" ? "default" : item.status === "Intrusion" ? "destructive" : "secondary"}
                          className={
                            item.status === "Reconnu" 
                              ? "bg-green-100 text-green-700 border-green-200" 
                              : item.status === "Intrusion"
                              ? "bg-red-100 text-red-700 border-red-200"
                              : "bg-yellow-100 text-yellow-700 border-yellow-200"
                          }
                        >
                          {item.status}
                        </Badge>
                        <span className="text-xs text-slate-500 font-mono">
                          {item.confidence}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Gallery de captures */}
          <Card className="col-span-6">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Captures récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="grid grid-cols-2 gap-3">
                  {capturesList.map((capture) => (
                    <div key={capture.id} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-lg border-2 border-slate-200 group-hover:border-blue-300 transition-colors">
                        <img 
                          src={capture.image} 
                          alt={`Capture ${capture.id}`}
                          className="w-full h-24 object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                          <div className="text-white text-xs">
                            <div className="font-medium">{capture.type}</div>
                            <div className="opacity-80">{capture.camera} • {capture.time}</div>
                          </div>
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
    </div>
  );
};