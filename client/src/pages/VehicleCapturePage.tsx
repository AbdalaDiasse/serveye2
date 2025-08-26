import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Filter, 
  Download, 
  Camera,
  Car,
  MapPin,
  Clock,
  AlertTriangle,
  Shield,
  ChevronRight,
  CalendarIcon,
  Home,
  Printer,
  Upload,
  Eye,
  Gauge
} from "lucide-react";

export const VehicleCapturePage = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  
  // Données des captures de véhicules
  const vehicleCaptures = [
    {
      id: 1,
      plate: "AB-123-CD",
      vehicleType: "Renault Clio",
      location: "Entrée principale",
      time: "14:22:45",
      date: "14-12-16",
      status: "Excès vitesse",
      speed: "67 km/h",
      image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=300&fit=crop",
      violation: true
    },
    {
      id: 2,
      plate: "EF-456-GH",
      vehicleType: "Iveco Daily",
      location: "Zone livraison",
      time: "14:35:23",
      date: "14-12-16",
      status: "Confirmé",
      speed: "42 km/h",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop",
      violation: false
    },
    {
      id: 3,
      plate: "IJ-789-KL",
      vehicleType: "BMW Série 3",
      location: "Parking visiteurs",
      time: "14:10:15",
      date: "14-12-16",
      status: "Stationnement interdit",
      speed: "0 km/h",
      image: "https://images.unsplash.com/photo-1555215858-9dc8d91d2e4e?w=400&h=300&fit=crop",
      violation: true
    },
    {
      id: 4,
      plate: "MN-012-OP",
      vehicleType: "Plaque détectée",
      location: "CAM-02",
      time: "14:41:33",
      date: "14-12-16",
      status: "Autorisé",
      speed: "35 km/h",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
      violation: false
    },
    {
      id: 5,
      plate: "QR-345-ST",
      vehicleType: "Yamaha MT-07",
      location: "Accès sécurisé",
      time: "14:55:18",
      date: "14-12-16",
      status: "Autorisé",
      speed: "28 km/h",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      violation: false
    },
    {
      id: 6,
      plate: "UV-678-WX",
      vehicleType: "Mercedes Citaro",
      location: "Zone bus",
      time: "14:02:21",
      date: "14-12-16",
      status: "Autorisé",
      speed: "25 km/h",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
      violation: false
    },
    {
      id: 7,
      plate: "YZ-901-AB",
      vehicleType: "Peugeot 308",
      location: "Entrée sud",
      time: "13:45:12",
      date: "14-12-16",
      status: "Zone interdite",
      speed: "48 km/h",
      image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop",
      violation: true
    },
    {
      id: 8,
      plate: "CD-234-EF",
      vehicleType: "Ford Transit",
      location: "Parking employés",
      time: "13:28:55",
      date: "14-12-16",
      status: "Confirmé",
      speed: "15 km/h",
      image: "https://images.unsplash.com/photo-1570733577524-3a047079e80d?w=400&h=300&fit=crop",
      violation: false
    },
    {
      id: 9,
      plate: "GH-567-IJ",
      vehicleType: "Tesla Model 3",
      location: "Entrée VIP",
      time: "13:15:47",
      date: "14-12-16",
      status: "Autorisé",
      speed: "32 km/h",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
      violation: false
    }
  ];

  return (
    <div className="w-full h-full bg-[#f8f9fa]">
      {/* Header avec titre et badges */}
      <div className="bg-white px-8 py-6 border-b border-[#e5e7eb] shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-gray-900">Captures Véhicules & Plaques</h1>
            <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-sm px-3 py-1">
              <Camera className="w-3 h-3 mr-1" />
              Recherche intelligente : "véhicules"
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-gray-300">
              <Upload className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>
      </div>

      {/* Recherche Avancée - Pleine largeur */}
      <div className="bg-white px-8 py-4 border-b border-[#e5e7eb]">
        <Card className="border-orange-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4">
            <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Shield className="w-5 h-5 text-orange-600" />
              Recherche Avancée
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-4">
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">Suggestions rapides :</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs border border-orange-200 cursor-pointer hover:bg-orange-100">
                    "Véhicules rouges avec violation de vitesse aujourd'hui"
                  </span>
                  <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs border border-orange-200 cursor-pointer hover:bg-orange-100">
                    "Camions détectés par Caméra 3 cette semaine"
                  </span>
                  <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs border border-orange-200 cursor-pointer hover:bg-orange-100">
                    "Plaques d'immatriculation reconnues zone parking"
                  </span>
                  <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs border border-orange-200 cursor-pointer hover:bg-orange-100">
                    "Véhicules entre 8h et 10h Zone principale"
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Input 
                  placeholder="Saisissez ce que vous cherchez en langage naturel..." 
                  className="flex-1 h-11 border-gray-300 focus:border-orange-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select defaultValue="5min">
                  <SelectTrigger className="w-[140px] h-11 border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5min">Dernières 5 min</SelectItem>
                    <SelectItem value="1h">Dernière heure</SelectItem>
                    <SelectItem value="24h">24 heures</SelectItem>
                    <SelectItem value="7d">7 jours</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="plaques">
                  <SelectTrigger className="w-[140px] h-11 border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plaques">Plaques</SelectItem>
                    <SelectItem value="vehicles">Véhicules</SelectItem>
                    <SelectItem value="all">Tous</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white h-11 px-6">
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal avec sidebar */}
      <div className="flex h-[calc(100%-200px)]">
        {/* Sidebar avec filtres */}
        <aside className="w-[320px] bg-white border-r border-[#e5e7eb] p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Filtres header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <Filter className="w-4 h-4 text-orange-500" />
                Filtres
              </h3>
              <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                Réinitialiser
              </Button>
            </div>

            <Separator className="bg-gray-200" />

            {/* Type de capture */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Type de capture</Label>
              <Select defaultValue="plaques">
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plaques">Plaques</SelectItem>
                  <SelectItem value="vehicles">Véhicules</SelectItem>
                  <SelectItem value="all">Tous</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sites */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Sites</Label>
              <Select defaultValue="all">
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les sites</SelectItem>
                  <SelectItem value="entrance">Entrées</SelectItem>
                  <SelectItem value="parking">Parkings</SelectItem>
                  <SelectItem value="security">Zones sécurisées</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Caméras */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Caméras</Label>
              <Select defaultValue="all">
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les caméras</SelectItem>
                  <SelectItem value="cam1">CAM-01</SelectItem>
                  <SelectItem value="cam2">CAM-02</SelectItem>
                  <SelectItem value="cam3">CAM-03</SelectItem>
                  <SelectItem value="cam4">CAM-04</SelectItem>
                  <SelectItem value="cam5">CAM-05</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Zones */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Zones</Label>
              <Select defaultValue="all">
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les zones</SelectItem>
                  <SelectItem value="public">Zones publiques</SelectItem>
                  <SelectItem value="restricted">Zones restreintes</SelectItem>
                  <SelectItem value="vip">Zones VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Période */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Période</Label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-xs text-gray-500">De</Label>
                  <Input type="date" className="border-gray-300" />
                </div>
                <div className="flex-1">
                  <Label className="text-xs text-gray-500">À</Label>
                  <Input type="date" className="border-gray-300" />
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            {/* Violations */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">Violations</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="stationnement" className="border-gray-400" />
                  <label htmlFor="stationnement" className="text-sm text-gray-600 cursor-pointer">Stationnement interdit</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="vitesse" className="border-gray-400" />
                  <label htmlFor="vitesse" className="text-sm text-gray-600 cursor-pointer">Excès de vitesse</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sens" className="border-gray-400" />
                  <label htmlFor="sens" className="text-sm text-gray-600 cursor-pointer">Sens interdit</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="stop" className="border-gray-400" />
                  <label htmlFor="stop" className="text-sm text-gray-600 cursor-pointer">Stop</label>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            {/* Type de véhicule */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">Type de véhicule</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="voiture" defaultChecked className="border-gray-400" />
                  <label htmlFor="voiture" className="text-sm text-gray-600 cursor-pointer">Voiture</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="camion" className="border-gray-400" />
                  <label htmlFor="camion" className="text-sm text-gray-600 cursor-pointer">Camion</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="moto" className="border-gray-400" />
                  <label htmlFor="moto" className="text-sm text-gray-600 cursor-pointer">Moto</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="bus" className="border-gray-400" />
                  <label htmlFor="bus" className="text-sm text-gray-600 cursor-pointer">Bus</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="truck" className="border-gray-400" />
                  <label htmlFor="truck" className="text-sm text-gray-600 cursor-pointer">Truck</label>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            {/* Couleur */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">Couleur</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="blanc" className="border-gray-400" />
                  <label htmlFor="blanc" className="text-sm text-gray-600 cursor-pointer">Blanc</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="noir" className="border-gray-400" />
                  <label htmlFor="noir" className="text-sm text-gray-600 cursor-pointer">Noir</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rouge" className="border-gray-400" />
                  <label htmlFor="rouge" className="text-sm text-gray-600 cursor-pointer">Rouge</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="bleu" className="border-gray-400" />
                  <label htmlFor="bleu" className="text-sm text-gray-600 cursor-pointer">Bleu</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="gris" className="border-gray-400" />
                  <label htmlFor="gris" className="text-sm text-gray-600 cursor-pointer">Gris</label>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            {/* Marque */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Marque</Label>
              <Select defaultValue="all">
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les marques</SelectItem>
                  <SelectItem value="renault">Renault</SelectItem>
                  <SelectItem value="peugeot">Peugeot</SelectItem>
                  <SelectItem value="bmw">BMW</SelectItem>
                  <SelectItem value="mercedes">Mercedes</SelectItem>
                  <SelectItem value="volkswagen">Volkswagen</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                  <SelectItem value="toyota">Toyota</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-6">
              <Filter className="w-4 h-4 mr-2" />
              Appliquer les filtres
            </Button>
          </div>
        </aside>

        {/* Zone principale avec résultats */}
        <main className="flex-1 p-6 overflow-y-auto bg-[#f8f9fa]">
          {/* Barre de résultats */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Résultats de détection
              </h2>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                1,247 détections trouvées
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px] border-gray-300 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Plus récent</SelectItem>
                  <SelectItem value="oldest">Plus ancien</SelectItem>
                  <SelectItem value="violations">Violations d'abord</SelectItem>
                  <SelectItem value="authorized">Autorisés d'abord</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="border-gray-300 bg-white">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>

          {/* Grille de captures */}
          <div className="grid grid-cols-3 gap-4">
            {vehicleCaptures.map((capture) => (
              <Card key={capture.id} className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow bg-white">
                <div className="relative">
                  <img 
                    src={capture.image} 
                    alt={`Capture ${capture.plate}`}
                    className="w-full h-48 object-cover"
                  />
                  {capture.violation && (
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white border-0">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Violation
                    </Badge>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <div className="text-white">
                      <div className="font-bold text-lg">{capture.plate}</div>
                      <div className="text-sm opacity-90">{capture.vehicleType}</div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{capture.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{capture.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Camera className="w-3 h-3" />
                      <span>{capture.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge className={capture.violation ? "bg-red-100 text-red-700 border-0" : "bg-green-100 text-green-700 border-0"}>
                        {capture.status}
                      </Badge>
                    </div>
                  </div>
                  <Separator className="my-3 bg-gray-200" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Gauge className="w-3 h-3" />
                      {capture.speed}
                    </span>
                    <Button size="sm" variant="ghost" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                      <Eye className="w-4 h-4 mr-1" />
                      Détails
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button variant="outline" size="sm" className="border-gray-300">Précédent</Button>
            <Button variant="outline" size="sm" className="bg-orange-500 text-white hover:bg-orange-600 border-orange-500">1</Button>
            <Button variant="outline" size="sm" className="border-gray-300">2</Button>
            <Button variant="outline" size="sm" className="border-gray-300">3</Button>
            <Button variant="outline" size="sm" className="border-gray-300">...</Button>
            <Button variant="outline" size="sm" className="border-gray-300">42</Button>
            <Button variant="outline" size="sm" className="border-gray-300">Suivant</Button>
          </div>
        </main>
      </div>
    </div>
  );
};