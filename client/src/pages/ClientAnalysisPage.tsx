import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, 
  Crown, 
  Clock, 
  DoorOpen, 
  TrendingUp, 
  Activity,
  UserCheck,
  UserX,
  MapPin,
  Eye
} from "lucide-react";

// Import des images pour VIP et Blacklist
import businessmanPhoto from "@assets/generated_images/Security_capture_businessman_photo_2feb92d4.png";
import womanPhoto from "@assets/generated_images/Security_capture_woman_photo_e17e3828.png";
import casualManPhoto from "@assets/generated_images/Security_capture_casual_man_eb27432b.png";
import elderlyWomanPhoto from "@assets/generated_images/Security_capture_elderly_woman_37bac27b.png";
import youngManPhoto from "@assets/generated_images/Security_capture_young_man_e6e7c093.png";

const ClientAnalysisPage = (): JSX.Element => {
  const [customerPeriod, setCustomerPeriod] = useState("today");
  const [agePeriod, setAgePeriod] = useState("today");
  const [genderPeriod, setGenderPeriod] = useState("today");
  const [zonePeriod, setZonePeriod] = useState("today");
  const [heatmapPeriod, setHeatmapPeriod] = useState("today");
  const [trajectoryPeriod, setTrajectoryPeriod] = useState("today");

  // Fonction pour générer les données de courbe clients
  const generateCustomerData = (period: string) => {
    switch (period) {
      case "today":
        return [
          { time: "08:00", customers: 12 },
          { time: "09:00", customers: 28 },
          { time: "10:00", customers: 45 },
          { time: "11:00", customers: 67 },
          { time: "12:00", customers: 89 },
          { time: "13:00", customers: 78 },
          { time: "14:00", customers: 95 },
          { time: "15:00", customers: 112 },
          { time: "16:00", customers: 98 },
          { time: "17:00", customers: 85 },
          { time: "18:00", customers: 56 },
          { time: "19:00", customers: 34 },
          { time: "20:00", customers: 18 },
        ];
      case "week":
        return [
          { time: "Lun", customers: 456 },
          { time: "Mar", customers: 489 },
          { time: "Mer", customers: 512 },
          { time: "Jeu", customers: 534 },
          { time: "Ven", customers: 678 },
          { time: "Sam", customers: 890 },
          { time: "Dim", customers: 234 },
        ];
      case "month":
        return [
          { time: "Sem 1", customers: 3456 },
          { time: "Sem 2", customers: 3789 },
          { time: "Sem 3", customers: 4123 },
          { time: "Sem 4", customers: 4567 },
        ];
      default:
        return [];
    }
  };

  // Données d'âge
  const generateAgeData = (period: string) => {
    const baseData = [
      { range: "0-17", value: 8 },
      { range: "18-24", value: 22 },
      { range: "25-34", value: 35 },
      { range: "35-44", value: 28 },
      { range: "45-54", value: 18 },
      { range: "55-64", value: 12 },
      { range: "65+", value: 7 },
    ];
    
    const multiplier = period === "week" ? 7 : period === "month" ? 30 : 1;
    return baseData.map(item => ({
      ...item,
      value: item.value * multiplier
    }));
  };

  // Données de genre
  const generateGenderData = (period: string) => {
    const multiplier = period === "week" ? 7 : period === "month" ? 30 : 1;
    return {
      male: 52 * multiplier,
      female: 48 * multiplier
    };
  };

  // Données de zones
  const generateZoneData = (period: string) => {
    const baseData = [
      { zone: "Entrée", count: 145 },
      { zone: "Rayon A", count: 89 },
      { zone: "Rayon B", count: 112 },
      { zone: "Rayon C", count: 78 },
      { zone: "Rayon D", count: 67 },
      { zone: "Rayon E", count: 95 },
      { zone: "Caisses", count: 156 },
      { zone: "Promotion", count: 134 },
      { zone: "Services", count: 45 },
      { zone: "Alimentation", count: 123 },
      { zone: "Électronique", count: 89 },
      { zone: "Mode", count: 167 },
      { zone: "Sport", count: 54 },
      { zone: "Jardinage", count: 32 },
      { zone: "Librairie", count: 28 },
    ];
    
    const multiplier = period === "week" ? 7 : period === "month" ? 30 : 1;
    return baseData.map(item => ({
      ...item,
      count: item.count * multiplier
    }));
  };

  const customerData = generateCustomerData(customerPeriod);
  const ageData = generateAgeData(agePeriod);
  const genderData = generateGenderData(genderPeriod);
  const zoneData = generateZoneData(zonePeriod);

  const maxCustomers = Math.max(...customerData.map(d => d.customers));
  const maxAge = Math.max(...ageData.map(d => d.value));
  const maxZone = Math.max(...zoneData.map(d => d.count));
  const totalGender = genderData.male + genderData.female;

  // Données VIP récents
  const recentVIPs = [
    { id: 1, name: "Sophie Martin", time: "Il y a 5 min", zone: "Rayon Premium", photo: womanPhoto, status: "Gold" },
    { id: 2, name: "Jean Dupont", time: "Il y a 12 min", zone: "Entrée principale", photo: businessmanPhoto, status: "Platinum" },
    { id: 3, name: "Marie Laurent", time: "Il y a 18 min", zone: "Services Client", photo: elderlyWomanPhoto, status: "Gold" },
    { id: 4, name: "Thomas Bernard", time: "Il y a 25 min", zone: "Caisses", photo: youngManPhoto, status: "Silver" },
    { id: 5, name: "Pierre Durand", time: "Il y a 32 min", zone: "Rayon A", photo: casualManPhoto, status: "Gold" },
  ];

  // Données Blacklist récents
  const recentBlacklist = [
    { id: 1, name: "Personne Suspecte #1", time: "Il y a 8 min", zone: "Entrée", reason: "Vol à l'étalage", photo: casualManPhoto },
    { id: 2, name: "Individu Non Autorisé", time: "Il y a 45 min", zone: "Sortie de secours", reason: "Comportement agressif", photo: youngManPhoto },
    { id: 3, name: "Client Problématique", time: "Il y a 1h", zone: "Rayon B", reason: "Fraude CB", photo: businessmanPhoto },
    { id: 4, name: "Personne Interdite", time: "Il y a 2h", zone: "Parking", reason: "Vandalisme", photo: casualManPhoto },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6">

          {/* Row 1: KPIs */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-white border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Visiteurs Aujourd'hui</p>
                    <p className="text-2xl font-bold text-gray-900">1,847</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-500">+12.5%</span>
                    </div>
                  </div>
                  <Users className="w-10 h-10 text-blue-500 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-l-amber-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Clients VIP</p>
                    <p className="text-2xl font-bold text-gray-900">47</p>
                    <div className="flex items-center mt-2">
                      <Badge className="bg-amber-100 text-amber-700">Premium</Badge>
                    </div>
                  </div>
                  <Crown className="w-10 h-10 text-amber-500 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Temps Moyen</p>
                    <p className="text-2xl font-bold text-gray-900">18 min</p>
                    <div className="flex items-center mt-2">
                      <Activity className="w-4 h-4 text-purple-500 mr-1" />
                      <span className="text-sm text-gray-600">Séjour</span>
                    </div>
                  </div>
                  <Clock className="w-10 h-10 text-purple-500 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-l-teal-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Flux E/S</p>
                    <p className="text-2xl font-bold text-gray-900">847/793</p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-teal-600">Entrées/Sorties</span>
                    </div>
                  </div>
                  <DoorOpen className="w-10 h-10 text-teal-500 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Row 2: Customer Analytics */}
          <div className="grid grid-cols-3 gap-6">
            {/* Customer Curve */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Courbe Clients</CardTitle>
                  <Select value={customerPeriod} onValueChange={setCustomerPeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Aujourd'hui</SelectItem>
                      <SelectItem value="week">Semaine</SelectItem>
                      <SelectItem value="month">Mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative">
                  <svg className="w-full h-full" viewBox="0 0 500 250">
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map(i => (
                      <line
                        key={i}
                        x1="40"
                        y1={30 + i * 45}
                        x2="480"
                        y2={30 + i * 45}
                        stroke="#e5e7eb"
                        strokeWidth="1"
                      />
                    ))}
                    
                    {/* Line chart */}
                    <polyline
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      points={customerData
                        .map((d, i) => {
                          const x = 40 + (i * 420) / (customerData.length - 1);
                          const y = 210 - (d.customers / maxCustomers) * 180;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                    />
                    
                    {/* Area under the curve */}
                    <polygon
                      fill="url(#areaGradient)"
                      opacity="0.3"
                      points={`40,210 ${customerData
                        .map((d, i) => {
                          const x = 40 + (i * 420) / (customerData.length - 1);
                          const y = 210 - (d.customers / maxCustomers) * 180;
                          return `${x},${y}`;
                        })
                        .join(" ")} 460,210`}
                    />
                    
                    {/* Data points */}
                    {customerData.map((d, i) => {
                      const x = 40 + (i * 420) / (customerData.length - 1);
                      const y = 210 - (d.customers / maxCustomers) * 180;
                      return (
                        <g key={i}>
                          <circle cx={x} cy={y} r="4" fill="#3b82f6" />
                          <text x={x} y={230} textAnchor="middle" className="text-xs fill-gray-600">
                            {d.time}
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* Y-axis labels */}
                    {[0, 25, 50, 75, 100].map((val, i) => (
                      <text
                        key={i}
                        x="25"
                        y={215 - i * 45}
                        textAnchor="end"
                        className="text-xs fill-gray-600"
                      >
                        {Math.round((val * maxCustomers) / 100)}
                      </text>
                    ))}
                    
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </CardContent>
            </Card>

            {/* Age Distribution */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Distribution Âge</CardTitle>
                  <Select value={agePeriod} onValueChange={setAgePeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Aujourd'hui</SelectItem>
                      <SelectItem value="week">Semaine</SelectItem>
                      <SelectItem value="month">Mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {ageData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="relative w-full">
                        <div 
                          className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t transition-all duration-300 hover:from-indigo-600 hover:to-indigo-500"
                          style={{ height: `${(item.value / maxAge) * 180}px` }}
                        >
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                            {item.value}%
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-600 text-center">
                        {item.range}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gender Distribution */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Répartition Genre</CardTitle>
                  <Select value={genderPeriod} onValueChange={setGenderPeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Aujourd'hui</SelectItem>
                      <SelectItem value="week">Semaine</SelectItem>
                      <SelectItem value="month">Mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="relative">
                    <svg width="200" height="200" viewBox="0 0 200 200">
                      {/* Male segment */}
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="40"
                        strokeDasharray={`${(genderData.male / totalGender) * 502.65} 502.65`}
                        transform="rotate(-90 100 100)"
                      />
                      {/* Female segment */}
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#ec4899"
                        strokeWidth="40"
                        strokeDasharray={`${(genderData.female / totalGender) * 502.65} 502.65`}
                        strokeDashoffset={`-${(genderData.male / totalGender) * 502.65}`}
                        transform="rotate(-90 100 100)"
                      />
                      {/* Center circle */}
                      <circle cx="100" cy="100" r="60" fill="white" />
                      <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold fill-gray-800">
                        {Math.round((genderData.male / totalGender) * 100)}%
                      </text>
                      <text x="100" y="115" textAnchor="middle" className="text-sm fill-gray-600">
                        Hommes
                      </text>
                    </svg>
                    <div className="mt-4 flex justify-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-sm text-gray-600">Hommes ({genderData.male})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-pink-500 rounded"></div>
                        <span className="text-sm text-gray-600">Femmes ({genderData.female})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Row 3: Zone Analytics */}
          <div className="grid grid-cols-3 gap-6">
            {/* People per Zone */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Personnes par Zone</CardTitle>
                  <Select value={zonePeriod} onValueChange={setZonePeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Aujourd'hui</SelectItem>
                      <SelectItem value="week">Semaine</SelectItem>
                      <SelectItem value="month">Mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3 pr-3">
                    {zoneData.map((zone, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-20 text-sm text-gray-600">{zone.zone}</div>
                        <div className="flex-1 relative">
                          <div className="h-8 bg-gray-100 rounded overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded transition-all duration-500"
                              style={{ width: `${(zone.count / maxZone) * 100}%` }}
                            />
                          </div>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-700">
                            {zone.count}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Heatmap */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Carte de Chaleur</CardTitle>
                  <Select value={heatmapPeriod} onValueChange={setHeatmapPeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Aujourd'hui</SelectItem>
                      <SelectItem value="week">Semaine</SelectItem>
                      <SelectItem value="month">Mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative bg-gray-100 rounded-lg overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full">
                    <defs>
                      <radialGradient id="heat1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="heat2">
                        <stop offset="0%" stopColor="#dc2626" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#ea580c" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="heat3">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
                        <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    
                    {/* Heat zones */}
                    <ellipse cx="30%" cy="40%" rx="60" ry="50" fill="url(#heat1)" />
                    <ellipse cx="70%" cy="30%" rx="70" ry="60" fill="url(#heat2)" />
                    <ellipse cx="50%" cy="70%" rx="55" ry="45" fill="url(#heat3)" />
                    <ellipse cx="20%" cy="75%" rx="45" ry="40" fill="url(#heat1)" />
                    <ellipse cx="80%" cy="65%" rx="50" ry="45" fill="url(#heat3)" />
                    
                    {/* Store layout overlay */}
                    <rect x="10%" y="10%" width="80%" height="80%" fill="none" stroke="#374151" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
                    <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#374151" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
                    <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#374151" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
                  </svg>
                  
                  {/* Legend */}
                  <div className="absolute bottom-2 right-2 bg-white/90 rounded p-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                        <span>Élevé</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-orange-400 rounded"></div>
                        <span>Moyen</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-yellow-300 rounded"></div>
                        <span>Faible</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trajectory */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Trajectoires Clients</CardTitle>
                  <Select value={trajectoryPeriod} onValueChange={setTrajectoryPeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Aujourd'hui</SelectItem>
                      <SelectItem value="week">Semaine</SelectItem>
                      <SelectItem value="month">Mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative bg-gray-50 rounded-lg overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                      </marker>
                    </defs>
                    
                    {/* Background grid */}
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Trajectory paths */}
                    <path d="M 20 30 Q 100 60 180 40 T 280 80" stroke="#3b82f6" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" opacity="0.7" />
                    <path d="M 40 180 Q 120 140 200 160 T 300 120" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" opacity="0.7" />
                    <path d="M 280 30 Q 200 70 120 50 T 40 90" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" opacity="0.7" />
                    <path d="M 300 180 Q 220 150 140 170 T 60 140" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" opacity="0.7" />
                    <path d="M 160 20 Q 160 100 160 180" stroke="#8b5cf6" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" opacity="0.7" />
                    
                    {/* Entry/Exit points */}
                    <circle cx="20" cy="30" r="6" fill="#3b82f6" />
                    <circle cx="40" cy="180" r="6" fill="#10b981" />
                    <circle cx="280" cy="30" r="6" fill="#f59e0b" />
                    <circle cx="300" cy="180" r="6" fill="#ef4444" />
                    <circle cx="160" cy="20" r="6" fill="#8b5cf6" />
                    
                    {/* Labels */}
                    <text x="15" y="20" className="text-xs fill-gray-600">Entrée A</text>
                    <text x="35" y="200" className="text-xs fill-gray-600">Entrée B</text>
                    <text x="260" y="20" className="text-xs fill-gray-600">Sortie A</text>
                    <text x="280" y="200" className="text-xs fill-gray-600">Sortie B</text>
                  </svg>
                  
                  {/* Stats overlay */}
                  <div className="absolute top-2 left-2 bg-white/90 rounded p-2">
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-blue-500" />
                        <span>5 trajectoires actives</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-3 h-3 text-green-500" />
                        <span>Temps moyen: 18 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Row 4: VIP & Blacklist */}
          <div className="grid grid-cols-2 gap-6">
            {/* Latest VIP */}
            <Card className="bg-white">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-amber-500" />
                    Derniers VIP Reconnus
                  </CardTitle>
                  <Badge className="bg-amber-100 text-amber-700">En temps réel</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {recentVIPs.map(vip => (
                      <div key={vip.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-transparent rounded-lg hover:from-amber-100 transition-colors">
                        <img 
                          src={vip.photo} 
                          alt={vip.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-amber-300"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900">{vip.name}</p>
                            <Badge className={`text-xs ${
                              vip.status === 'Platinum' ? 'bg-gray-800 text-white' :
                              vip.status === 'Gold' ? 'bg-amber-500 text-white' :
                              'bg-gray-400 text-white'
                            }`}>
                              {vip.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{vip.zone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{vip.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Blacklist */}
            <Card className="bg-white">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <UserX className="w-5 h-5 text-red-500" />
                    Dernières Alertes Blacklist
                  </CardTitle>
                  <Badge className="bg-red-100 text-red-700">Surveillance</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {recentBlacklist.map(person => (
                      <div key={person.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-transparent rounded-lg hover:from-red-100 transition-colors">
                        <img 
                          src={person.photo} 
                          alt={person.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-red-300 grayscale"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{person.name}</p>
                          <p className="text-sm text-red-600">{person.reason}</p>
                          <p className="text-xs text-gray-600">{person.zone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{person.time}</p>
                          <Button size="sm" variant="destructive" className="mt-1 text-xs">
                            Alerter
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ClientAnalysisPage;