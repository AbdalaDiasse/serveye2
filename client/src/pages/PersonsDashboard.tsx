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

export const PersonsDashboard = (): JSX.Element => {
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
                          stroke={y === 200 ? "#94a3b8" : "#e2e8f0"} 
                          strokeWidth={y === 200 ? "1.5" : "0.5"} 
                          strokeDasharray={y === 200 ? "none" : "2,2"} />
                  ))}
                  
                  
                  {/* Courbe Entrées avec effet glow */}
                  <polyline
                    points={entriesExitsData.map((d, i) => 
                      `${40 + (i * 440 / (entriesExitsData.length - 1))},${200 - (d.entries / maxEntry * 180)}`
                    ).join(' ')}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    filter="url(#glow)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Courbe Sorties avec effet glow */}
                  <polyline
                    points={entriesExitsData.map((d, i) => 
                      `${40 + (i * 440 / (entriesExitsData.length - 1))},${200 - (d.exits / maxEntry * 180)}`
                    ).join(' ')}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    filter="url(#glow)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Points de données */}
                  {entriesExitsData.map((d, i) => (
                    <g key={`point-${i}`}>
                      <circle cx={40 + (i * 440 / (entriesExitsData.length - 1))} 
                              cy={200 - (d.entries / maxEntry * 180)} 
                              r="4" fill="white" stroke="#10b981" strokeWidth="2" />
                      <circle cx={40 + (i * 440 / (entriesExitsData.length - 1))} 
                              cy={200 - (d.exits / maxEntry * 180)} 
                              r="4" fill="white" stroke="#ef4444" strokeWidth="2" />
                    </g>
                  ))}
                  
                  {/* Labels améliorés */}
                  {entriesExitsData.map((d, i) => {
                    const showLabel = entriesExitsData.length <= 7 || i % Math.ceil(entriesExitsData.length / 6) === 0;
                    return showLabel ? (
                      <text key={i} x={40 + (i * 440 / (entriesExitsData.length - 1))} y="190" 
                            className="text-xs fill-slate-500 font-medium" textAnchor="middle">
                        {d.time}
                      </text>
                    ) : null;
                  })}
                </svg>
                
              </div>
            </CardContent>
          </Card>

          {/* Courbe Détections */}
          <Card className="col-span-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold text-slate-800">
                Détections de Personnes
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
              <div className="h-[240px] relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
                <svg viewBox="0 0 500 200" className="w-full h-full drop-shadow-sm">
                  <defs>
                    {/* Gradient principal */}
                    <linearGradient id="detectionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                    </linearGradient>
                    
                    {/* Gradient pour la ligne */}
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1e40af" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                    
                    {/* Filtre glow */}
                    <filter id="blueGlow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    
                    {/* Motif pour la grille */}
                    <pattern id="gridPattern" width="44" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 44 0 L 0 0 0 40" fill="none" stroke="#e0e7ff" strokeWidth="0.5" opacity="0.5"/>
                    </pattern>
                  </defs>
                  
                  {/* Grille avec motif */}
                  <rect width="440" height="200" x="40" y="0" fill="url(#gridPattern)" />
                  
                  {/* Lignes de grille principales */}
                  {[0, 40, 80, 120, 160, 200].map(y => (
                    <line key={y} x1="40" y1={y} x2="480" y2={y} 
                          stroke={y === 200 ? "#6366f1" : "#c7d2fe"} 
                          strokeWidth={y === 200 ? "2" : "1"} 
                          opacity={y === 200 ? "0.6" : "0.3"} />
                  ))}
                  
                  {/* Zone sous la courbe avec gradient animé */}
                  <path
                    d={`M 40,200 ${detectionData.map((d, i) => 
                      `L ${40 + (i * 440 / (detectionData.length - 1))},${200 - (d.detections / maxDetection * 180)}`
                    ).join(' ')} L 480,200 Z`}
                    fill="url(#detectionGradient)"
                    className="animate-pulse"
                  />
                  
                  {/* Courbe principale avec gradient et glow */}
                  <polyline
                    points={detectionData.map((d, i) => 
                      `${40 + (i * 440 / (detectionData.length - 1))},${200 - (d.detections / maxDetection * 180)}`
                    ).join(' ')}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="4"
                    filter="url(#blueGlow)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Points de données avec animation */}
                  {detectionData.map((d, i) => (
                    <g key={`detection-point-${i}`}>
                      <circle cx={40 + (i * 440 / (detectionData.length - 1))} 
                              cy={200 - (d.detections / maxDetection * 180)} 
                              r="6" fill="#1e40af" opacity="0.2" className="animate-ping" />
                      <circle cx={40 + (i * 440 / (detectionData.length - 1))} 
                              cy={200 - (d.detections / maxDetection * 180)} 
                              r="5" fill="white" stroke="#3b82f6" strokeWidth="3" 
                              className="shadow-lg" />
                      <circle cx={40 + (i * 440 / (detectionData.length - 1))} 
                              cy={200 - (d.detections / maxDetection * 180)} 
                              r="2" fill="#1e40af" />
                    </g>
                  ))}
                  
                  {/* Labels adaptés selon la période */}
                  {detectionData.map((d, i) => {
                    const showLabel = detectionData.length <= 7 || i % Math.ceil(detectionData.length / 6) === 0;
                    return showLabel ? (
                      <text key={i} x={40 + (i * 440 / (detectionData.length - 1))} y="190" 
                            className="text-xs fill-indigo-600 font-semibold" textAnchor="middle">
                        {d.time}
                      </text>
                    ) : null;
                  })}
                  
                </svg>
                
              </div>
            </CardContent>
          </Card>

          {/* Distribution Homme/Femme */}
          <Card className="col-span-3">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold text-slate-800">
                Distribution Homme/Femme
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
              <div className="relative h-[180px] flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-40 h-40">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="20" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#3b82f6" strokeWidth="20"
                          strokeDasharray="301.6 502.4" strokeDashoffset="-125.6" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#ec4899" strokeWidth="20"
                          strokeDasharray="200.8 502.4" strokeDashoffset="0" />
                </svg>
                <div className="absolute text-center">
                  <div className="text-2xl font-bold text-slate-800">60/40</div>
                  <div className="text-xs text-slate-600">Ratio H/F</div>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-slate-600">Hommes (60%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  <span className="text-xs text-slate-600">Femmes (40%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Répartition par Âge */}
          <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold text-slate-800">
                Répartition par Âge
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
                {ageDistribution.map((age, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xs text-slate-600 w-12">{age.range}</span>
                    <div className="flex-1 bg-slate-200 rounded-full h-6 relative overflow-hidden">
                      <div 
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(age.count / maxCount) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">{age.count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Carte de Chaleur des Caméras */}
          <Card className="col-span-5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold text-slate-800">
                Carte de Chaleur des Caméras
              </CardTitle>
              <Select value={heatmapPeriod} onValueChange={setHeatmapPeriod}>
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
              <div className="space-y-2">
                {["Cam 01", "Cam 02", "Cam 03"].map((camera) => (
                  <div key={camera} className="flex items-center gap-2">
                    <span className="text-xs text-slate-600 w-14">{camera}</span>
                    <div className="flex gap-1 flex-1">
                      {["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18"].map((hour) => {
                        const data = heatmapData.find(d => d.camera === camera && d.hour === hour);
                        const intensity = data ? data.intensity : Math.random();
                        return (
                          <div
                            key={hour}
                            className={`flex-1 h-8 rounded ${getIntensityColor(intensity)} opacity-${Math.round(intensity * 100)}`}
                            title={`${camera} - ${hour}:00 - Intensité: ${Math.round(intensity * 100)}%`}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                  <span className="text-xs text-slate-600 w-14">Heures</span>
                  <div className="flex gap-1 flex-1">
                    {["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18"].map((hour) => (
                      <div key={hour} className="flex-1 text-center text-xs text-slate-600">
                        {hour}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Listes en bas */}
        <div className="grid grid-cols-2 gap-6">
          {/* Reconnaissances / Intrusions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-800">
                Reconnaissances / Intrusions
              </CardTitle>
              <div className="flex gap-2">
                <Badge className="bg-emerald-100 text-emerald-700 border-0">Reconnus</Badge>
                <Badge className="bg-red-100 text-red-700 border-0">Intrusions</Badge>
                <Badge className="bg-orange-100 text-orange-700 border-0">Score faible</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-3">
                  {recognitionList.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold
                          ${item.status === "Reconnu" ? "bg-emerald-500" : 
                            item.status === "Intrusion" ? "bg-red-500" : "bg-orange-500"}`}>
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{item.name}</p>
                          <p className="text-xs text-slate-600">{item.time} - {item.camera}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${
                          item.status === "Reconnu" ? "bg-emerald-100 text-emerald-700" : 
                          item.status === "Intrusion" ? "bg-red-100 text-red-700" : 
                          "bg-orange-100 text-orange-700"
                        } border-0`}>
                          {item.confidence}%
                        </Badge>
                        <p className="text-xs text-slate-600 mt-1">{item.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Button variant="link" className="w-full mt-2 text-teal-600">
                Voir tout →
              </Button>
            </CardContent>
          </Card>

          {/* Captures de Personnes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-800">
                Captures de Personnes
              </CardTitle>
              <Button variant="link" className="text-teal-600 text-sm">
                Voir tout
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {capturesList.map((capture) => (
                  <div key={capture.id} className="relative group cursor-pointer">
                    <img 
                      src={capture.image} 
                      alt={`Capture ${capture.id}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <p className="text-xs font-medium">{capture.type}</p>
                        <p className="text-xs">{capture.time}</p>
                        <p className="text-xs">{capture.camera}</p>
                      </div>
                    </div>
                    <Badge className={`absolute top-1 right-1 text-xs ${
                      capture.type === "Visage" ? "bg-blue-500" : "bg-purple-500"
                    } text-white border-0`}>
                      {capture.type === "Visage" ? "V" : "C"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};