import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  Eye
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
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Car className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Captures Véhicules & Plaques</h1>
              <p className="text-sm text-gray-500">Liste des captures de véhicules et plaques détectées</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-orange-100 text-orange-700 border-0">
              <Home className="w-3 h-3 mr-1" />
              Recherche intelligente : "véhicules"
            </Badge>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white" size="sm">
              <Camera className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
          </div>
        </div>
      </div>

      {/* Recherche Avancée - Pleine largeur */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200 px-6 py-6">
        <div className="max-w-full">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-orange-600" />
            <h2 className="text-lg font-bold text-gray-800">Recherche Avancée</h2>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-200">
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">Exemples :</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs border border-orange-200">
                    "Véhicules rouges avec violation de vitesse aujourd'hui"
                  </span>
                  <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs border border-orange-200">
                    "Camions détectés par Caméra 3 cette semaine"
                  </span>
                  <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs border border-orange-200">
                    "Plaques d'immatriculation reconnues zone parking"
                  </span>
                  <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs border border-orange-200">
                    "Véhicules entre 8h et 10h Zone principale"
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Input 
                  placeholder="Saisissez ce que vous cherchez en langage naturel..." 
                  className="flex-1 h-12 text-base border-orange-200 focus:border-orange-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex gap-2">
                  <Select defaultValue="5min">
                    <SelectTrigger className="w-[140px] h-12 border-orange-200">
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
                    <SelectTrigger className="w-[140px] h-12 border-orange-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plaques">Plaques</SelectItem>
                      <SelectItem value="vehicles">Véhicules</SelectItem>
                      <SelectItem value="all">Tous</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white h-12 px-6">
                    <Search className="w-5 h-5 mr-2" />
                    Rechercher
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar avec filtres */}
        <aside className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          {/* Filtres */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtres
              </h3>
              
              {/* Type de capture */}
              <div className="space-y-3">
                <Label className="text-sm">Type de capture</Label>
                <Select defaultValue="plaques">
                  <SelectTrigger>
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
              <div className="space-y-3 mt-4">
                <Label className="text-sm">Sites</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
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
              <div className="space-y-3 mt-4">
                <Label className="text-sm">Caméras</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les caméras</SelectItem>
                    <SelectItem value="cam1">CAM-01</SelectItem>
                    <SelectItem value="cam2">CAM-02</SelectItem>
                    <SelectItem value="cam3">CAM-03</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Zones */}
              <div className="space-y-3 mt-4">
                <Label className="text-sm">Zones</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
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
              <div className="space-y-3 mt-4">
                <Label className="text-sm">Période</Label>
                <div className="flex gap-2">
                  <Input type="date" className="flex-1" />
                  <span className="self-center text-gray-500">à</span>
                  <Input type="date" className="flex-1" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Violations */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Violations</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="stationnement" />
                  <label htmlFor="stationnement" className="text-sm">Stationnement interdit</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="vitesse" />
                  <label htmlFor="vitesse" className="text-sm">Excès de vitesse</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sens" />
                  <label htmlFor="sens" className="text-sm">Sens interdit</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="stop" />
                  <label htmlFor="stop" className="text-sm">Stop</label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Type de véhicule */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Type de véhicule</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="voiture" defaultChecked />
                  <label htmlFor="voiture" className="text-sm">Voiture</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="camion" />
                  <label htmlFor="camion" className="text-sm">Camion</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="moto" />
                  <label htmlFor="moto" className="text-sm">Moto</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="bus" />
                  <label htmlFor="bus" className="text-sm">Bus</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="truck" />
                  <label htmlFor="truck" className="text-sm">Truck</label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Couleur */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Couleur</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="blanc" />
                  <label htmlFor="blanc" className="text-sm">Blanc</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="noir" />
                  <label htmlFor="noir" className="text-sm">Noir</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rouge" />
                  <label htmlFor="rouge" className="text-sm">Rouge</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="bleu" />
                  <label htmlFor="bleu" className="text-sm">Bleu</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="gris" />
                  <label htmlFor="gris" className="text-sm">Gris</label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Marque */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Marque</Label>
              <Select defaultValue="all">
                <SelectTrigger>
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
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Barre de résultats */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Résultats de détection
              </h2>
              <Badge className="bg-orange-100 text-orange-700 border-0">
                1,247 détections trouvées
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Plus récent</SelectItem>
                  <SelectItem value="oldest">Plus ancien</SelectItem>
                  <SelectItem value="violations">Violations d'abord</SelectItem>
                  <SelectItem value="authorized">Autorisés d'abord</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>

          {/* Grille de captures */}
          <div className="grid grid-cols-3 gap-4">
            {vehicleCaptures.map((capture) => (
              <Card key={capture.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <span className="text-sm font-medium text-gray-700">
                      Vitesse: {capture.speed}
                    </span>
                    <Button size="sm" variant="ghost" className="text-orange-600 hover:text-orange-700">
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
            <Button variant="outline" size="sm">Précédent</Button>
            <Button variant="outline" size="sm" className="bg-orange-500 text-white hover:bg-orange-600">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">...</Button>
            <Button variant="outline" size="sm">42</Button>
            <Button variant="outline" size="sm">Suivant</Button>
          </div>
        </main>
      </div>
    </div>
  );
};