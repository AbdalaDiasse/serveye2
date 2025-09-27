import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Car, 
  Truck, 
  Bike, 
  Bus,
  Activity,
  AlertTriangle,
  Camera,
  Gauge,
  Clock,
  Shield,
  TrendingUp,
  Info,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

export const VehiclesDashboard = (): JSX.Element => {
  // Données pour les métriques principales
  const metrics = [
    {
      value: "1,247",
      label: "Véhicules Détectés",
      icon: <Car className="w-6 h-6 text-white" />,
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      trend: "+15%"
    },
    {
      value: "892",
      label: "Plaques Reconnues",
      icon: <Camera className="w-6 h-6 text-white" />,
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
      trend: "+8%"
    },
    {
      value: "52",
      label: "Seuils Vitesse Max",
      icon: <Gauge className="w-6 h-6 text-white" />,
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
      trend: "-12%"
    },
    {
      value: "67",
      label: "Violations Détectées",
      icon: <AlertTriangle className="w-6 h-6 text-white" />,
      bgColor: "bg-gradient-to-br from-red-500 to-red-600",
      trend: "+23%"
    }
  ];

  // Données pour la détection en temps réel (courbe)
  const realTimeData = [
    { time: "00:00", vehicles: 45 },
    { time: "04:00", vehicles: 38 },
    { time: "08:00", vehicles: 125 },
    { time: "12:00", vehicles: 187 },
    { time: "16:00", vehicles: 210 },
    { time: "20:00", vehicles: 156 },
    { time: "24:00", vehicles: 67 }
  ];

  // Données pour la distribution des véhicules par type (pie chart)
  const vehicleTypeData = [
    { name: "Voitures", value: 567, color: "#3b82f6" },
    { name: "Camions", value: 234, color: "#f97316" },
    { name: "Motos", value: 189, color: "#10b981" },
    { name: "Bus", value: 78, color: "#8b5cf6" },
    { name: "Vélos", value: 179, color: "#06b6d4" }
  ];

  // Données pour les violations (histogram)
  const violationsData = [
    { type: "Excès vitesse", count: 89 },
    { type: "Feu rouge", count: 45 },
    { type: "Stationnement", count: 67 },
    { type: "Sens interdit", count: 23 },
    { type: "Stop", count: 34 },
    { type: "Ligne continue", count: 19 }
  ];

  // Données pour les captures de véhicules
  const vehicleCaptures = [
    {
      plate: "ABC-123",
      time: "Il y a 2 minutes",
      speed: "42 km/h",
      location: "CAM-02",
      status: "normal",
      vehicleType: "Voiture",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop&auto=format"
    },
    {
      plate: "XYZ-789",
      time: "Il y a 5 minutes",
      speed: "82 km/h",
      location: "CAM-05",
      status: "warning",
      vehicleType: "Voiture",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&auto=format"
    },
    {
      plate: "MN-456",
      time: "Il y a 8 minutes",
      speed: "38 km/h",
      location: "CAM-01",
      status: "normal",
      vehicleType: "Moto",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format"
    },
    {
      plate: "DEF-456",
      time: "Il y a 12 minutes",
      speed: "55 km/h",
      location: "CAM-03",
      status: "normal",
      vehicleType: "Camion",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop&auto=format"
    },
    {
      plate: "GHI-789",
      time: "Il y a 15 minutes",
      speed: "78 km/h",
      location: "CAM-04",
      status: "warning",
      vehicleType: "Voiture",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop&auto=format"
    },
    {
      plate: "JKL-012",
      time: "Il y a 18 minutes",
      speed: "45 km/h",
      location: "CAM-06",
      status: "normal",
      vehicleType: "Voiture",
      image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop&auto=format"
    },
    {
      plate: "MNO-345",
      time: "Il y a 22 minutes",
      speed: "35 km/h",
      location: "CAM-01",
      status: "normal",
      vehicleType: "Moto",
      image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=300&fit=crop&auto=format"
    },
    {
      plate: "PQR-678",
      time: "Il y a 25 minutes",
      speed: "89 km/h",
      location: "CAM-07",
      status: "warning",
      vehicleType: "Voiture",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop&auto=format"
    },
    {
      plate: "STU-901",
      time: "Il y a 28 minutes",
      speed: "62 km/h",
      location: "CAM-02",
      status: "normal",
      vehicleType: "Bus",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop&auto=format"
    },
    {
      plate: "VWX-234",
      time: "Il y a 32 minutes",
      speed: "48 km/h",
      location: "CAM-08",
      status: "normal",
      vehicleType: "Voiture",
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop&auto=format"
    },
    {
      plate: "YZA-567",
      time: "Il y a 35 minutes",
      speed: "75 km/h",
      location: "CAM-03",
      status: "warning",
      vehicleType: "Camion",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop&auto=format"
    },
    {
      plate: "BCD-890",
      time: "Il y a 38 minutes",
      speed: "52 km/h",
      location: "CAM-05",
      status: "normal",
      vehicleType: "Voiture",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&h=300&fit=crop&auto=format"
    }
  ];

  // Données pour les plaques d'immatriculation
  const licensePlates = [
    { plate: "ABC-123-FR", location: "Entrée A", time: "09:45", status: "registered" },
    { plate: "XYZ-789-FR", location: "Sortie B", time: "09:43", status: "warning" },
    { plate: "MN-456-FR", location: "Zone 3", time: "09:41", status: "registered" },
    { plate: "BUS-901-FR", location: "Parking", time: "09:39", status: "registered" }
  ];

  return (
    <div className="w-full p-6 space-y-6 bg-gray-50">

      {/* Métriques principales */}
      <div className="grid grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className={`${metric.bgColor} border-0 text-white`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  {metric.icon}
                </div>
                <Badge className="bg-white/20 text-white border-0">
                  {metric.trend}
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <p className="text-sm text-white/90">{metric.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-3 gap-6">
        {/* Vitesse moyenne */}
        <Card className="bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Gauge className="w-5 h-5 text-orange-500" />
                Vitesse moyenne
              </CardTitle>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-orange-600 mb-2">52.4</div>
              <p className="text-sm text-gray-500">km/h sur la période sélectionnée</p>
              <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-600">+3.2 km/h vs hier</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Densité */}
        <Card className="bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-500" />
                Densité
              </CardTitle>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-green-600 mb-2">24.7</div>
              <p className="text-sm text-gray-500">véhicules/segment sélectionné</p>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center gap-2">
                  <Activity className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Trafic modéré</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Décompte en temps réel */}
        <Card className="bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Décompte en temps réel
              </CardTitle>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-blue-600 mb-2">127</div>
              <p className="text-sm text-gray-500">véhicules actuellement</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="p-2 bg-blue-50 rounded">
                  <div className="text-sm font-semibold text-blue-600">↑ 89</div>
                  <div className="text-xs text-gray-500">Entrées</div>
                </div>
                <div className="p-2 bg-orange-50 rounded">
                  <div className="text-sm font-semibold text-orange-600">↓ 38</div>
                  <div className="text-xs text-gray-500">Sorties</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques d'analyse */}
      <div className="grid grid-cols-3 gap-6">
        {/* Détection en temps réel - Courbe */}
        <Card className="bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-800">
              Détection en temps réel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={realTimeData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}`, 'Véhicules']}
                    labelStyle={{ color: '#1f2937' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="vehicles" 
                    stroke="#f97316" 
                    strokeWidth={3}
                    dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Distribution des véhicules par type - Pie Chart */}
        <Card className="bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-800">
              Véhicules par type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vehicleTypeData}
                    cx="50%"
                    cy="45%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {vehicleTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value}`, name]}
                    labelStyle={{ color: '#1f2937' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {vehicleTypeData.map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Infractions par type - Histogram */}
        <Card className="bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-800">
              Infractions par type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={violationsData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="type" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 9, fill: '#64748b' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}`, 'Violations']}
                    labelStyle={{ color: '#1f2937' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Captures et plaques */}
      <div className="grid grid-cols-2 gap-6">
        {/* Captures de véhicules */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Captures de Véhicules
              </CardTitle>
              <Badge className="bg-blue-100 text-blue-700 border-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-1 animate-pulse" />
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3 pr-2">
                {vehicleCaptures.map((capture, index) => (
                  <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-20 h-14 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={capture.image} 
                          alt={`${capture.vehicleType} ${capture.plate}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden w-full h-full flex items-center justify-center bg-gray-200">
                          <Car className="w-8 h-8 text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 text-sm">{capture.plate}</span>
                            <Badge className={
                              capture.status === 'warning' 
                                ? 'bg-orange-100 text-orange-700 border-0 text-xs' 
                                : 'bg-green-100 text-green-700 border-0 text-xs'
                            }>
                              {capture.vehicleType}
                            </Badge>
                          </div>
                          {capture.status === 'warning' ? (
                            <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Gauge className="w-3 h-3" />
                            {capture.speed}
                          </span>
                          <span className="flex items-center gap-1">
                            <Camera className="w-3 h-3" />
                            {capture.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {capture.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Plaques d'immatriculation */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Plaques d'Immatriculation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {licensePlates.map((plate, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="font-mono font-semibold text-gray-900">{plate.plate}</div>
                      <Badge className={
                        plate.status === 'warning' 
                          ? 'bg-orange-100 text-orange-700 border-0' 
                          : 'bg-green-100 text-green-700 border-0'
                      }>
                        {plate.status === 'warning' ? 'Alerte' : 'Enregistré'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{plate.location}</span>
                      <span>{plate.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Système Actif */}
      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6" />
              <div>
                <p className="font-semibold">Système Actif</p>
                <p className="text-sm text-white/80">Surveillance en cours</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm">12 caméras actives</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};