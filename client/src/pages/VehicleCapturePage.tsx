import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Download, 
  Camera,
  Car,
  ChevronRight,
  Eye,
  Filter
} from "lucide-react";

export const VehicleCapturePage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // États pour les filtres
  const [filters, setFilters] = useState({
    typeCapture: "plaques",
    site: "all", 
    camera: "all",
    zone: "all",
    dateDebut: "2024-08-19",
    dateFin: "2024-08-25",
    violations: {
      stationnement: true,
      vitesse: false,
      sens: false,
      stop: false
    },
    typeVehicule: {
      voiture: false,
      camion: false,
      moto: false,
      truck: false,
      bus: false
    },
    couleur: {
      blanc: false,
      noir: false,
      rouge: false,
      bleu: false,
      gris: false
    },
    marque: "all"
  });
  
  // Données des captures de véhicules enrichies
  const vehicleCaptures = [
    {
      id: 1,
      plate: "AB-123-CD",
      vehicleType: "Renault Clio",
      location: "Entrée principale",
      time: "14:22:45",
      date: "2024-08-20",
      status: "Excès vitesse",
      speed: "67 km/h",
      image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=300&fit=crop",
      violation: true,
      site: "site1",
      camera: "cam1",
      zone: "entrance",
      typeVehicule: "voiture",
      couleur: "rouge",
      marque: "renault",
      violationType: "vitesse"
    },
    {
      id: 2,
      plate: "EF-456-GH", 
      vehicleType: "Iveco Daily",
      location: "Zone livraison",
      time: "14:35:23",
      date: "2024-08-21",
      status: "Confirmé",
      speed: "42 km/h",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop",
      violation: false,
      site: "site1",
      camera: "cam2",
      zone: "parking",
      typeVehicule: "camion",
      couleur: "blanc",
      marque: "iveco",
      violationType: null
    },
    {
      id: 3,
      plate: "IJ-789-KL",
      vehicleType: "BMW Série 3",
      location: "Parking visiteurs", 
      time: "14:10:15",
      date: "2024-08-22",
      status: "Stationnement interdit",
      speed: "0 km/h",
      image: "https://images.unsplash.com/photo-1555215858-9dc8d91d2e4e?w=400&h=300&fit=crop",
      violation: true,
      site: "site2",
      camera: "cam3",
      zone: "vip",
      typeVehicule: "voiture",
      couleur: "noir",
      marque: "bmw",
      violationType: "stationnement"
    },
    {
      id: 4,
      plate: "MN-012-OP",
      vehicleType: "Plaque détectée",
      location: "CAM-02",
      time: "14:41:33",
      date: "2024-08-23",
      status: "Autorisé",
      speed: "35 km/h",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
      violation: false,
      site: "site1",
      camera: "cam2",
      zone: "entrance",
      typeVehicule: "voiture",
      couleur: "bleu",
      marque: "peugeot",
      violationType: null
    },
    {
      id: 5,
      plate: "QR-345-ST",
      vehicleType: "Yamaha MT-07",
      location: "Accès sécurisé",
      time: "14:55:18",
      date: "2024-08-24",
      status: "Autorisé",
      speed: "28 km/h",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      violation: false,
      site: "site2",
      camera: "cam1",
      zone: "entrance",
      typeVehicule: "moto",
      couleur: "noir",
      marque: "yamaha",
      violationType: null
    },
    {
      id: 6,
      plate: "UV-678-WX",
      vehicleType: "Mercedes Citaro",
      location: "Zone bus",
      time: "14:02:21",
      date: "2024-08-25",
      status: "Autorisé",
      speed: "25 km/h",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
      violation: false,
      site: "site1",
      camera: "cam3",
      zone: "parking",
      typeVehicule: "bus",
      couleur: "blanc",
      marque: "mercedes",
      violationType: null
    },
    {
      id: 7,
      plate: "YZ-901-AB",
      vehicleType: "Peugeot 308",
      location: "Entrée sud",
      time: "13:45:12",
      date: "2024-08-19",
      status: "Sens interdit",
      speed: "48 km/h",
      image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop",
      violation: true,
      site: "site2",
      camera: "cam2",
      zone: "entrance",
      typeVehicule: "voiture",
      couleur: "gris",
      marque: "peugeot",
      violationType: "sens"
    },
    {
      id: 8,
      plate: "CD-234-EF",
      vehicleType: "Ford Transit",
      location: "Parking employés",
      time: "13:28:55",
      date: "2024-08-20",
      status: "Confirmé",
      speed: "15 km/h",
      image: "https://images.unsplash.com/photo-1570733577524-3a047079e80d?w=400&h=300&fit=crop",
      violation: false,
      site: "site1",
      camera: "cam1",
      zone: "parking",
      typeVehicule: "truck",
      couleur: "blanc",
      marque: "ford",
      violationType: null
    },
    {
      id: 9,
      plate: "GH-567-IJ",
      vehicleType: "Tesla Model 3",
      location: "Entrée VIP",
      time: "13:15:47",
      date: "2024-08-21",
      status: "Autorisé",
      speed: "32 km/h",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
      violation: false,
      site: "site2",
      camera: "cam3",
      zone: "vip",
      typeVehicule: "voiture",
      couleur: "rouge",
      marque: "tesla",
      violationType: null
    }
  ];

  // Fonction de filtrage complète
  const applyFilters = () => {
    return vehicleCaptures.filter(vehicle => {
      // Filtres des onglets
      if (activeTab === "violations" && !vehicle.violation) return false;
      if (activeTab === "authorized" && (vehicle.violation || vehicle.status !== "Autorisé")) return false;
      if (activeTab === "confirmed" && vehicle.status !== "Confirmé") return false;
      
      // Filtre par site
      if (filters.site !== "all" && vehicle.site !== filters.site) return false;
      
      // Filtre par caméra
      if (filters.camera !== "all" && vehicle.camera !== filters.camera) return false;
      
      // Filtre par zone
      if (filters.zone !== "all" && vehicle.zone !== filters.zone) return false;
      
      // Filtre par date
      const vehicleDate = new Date(vehicle.date);
      const dateDebut = new Date(filters.dateDebut);
      const dateFin = new Date(filters.dateFin);
      if (vehicleDate < dateDebut || vehicleDate > dateFin) return false;
      
      // Filtre par violations
      const violationsSelected = Object.entries(filters.violations).filter(([_, checked]) => checked).map(([type, _]) => type);
      if (violationsSelected.length > 0 && vehicle.violation) {
        if (!vehicle.violationType || !violationsSelected.includes(vehicle.violationType)) return false;
      }
      
      // Filtre par type de véhicule
      const typesSelected = Object.entries(filters.typeVehicule).filter(([_, checked]) => checked).map(([type, _]) => type);
      if (typesSelected.length > 0 && !typesSelected.includes(vehicle.typeVehicule)) return false;
      
      // Filtre par couleur
      const couleursSelected = Object.entries(filters.couleur).filter(([_, checked]) => checked).map(([couleur, _]) => couleur);
      if (couleursSelected.length > 0 && !couleursSelected.includes(vehicle.couleur)) return false;
      
      // Filtre par marque
      if (filters.marque !== "all" && vehicle.marque !== filters.marque) return false;
      
      return true;
    });
  };

  const filteredData = applyFilters();

  const authorizedCount = vehicleCaptures.filter(v => !v.violation && v.status === "Autorisé").length;
  const violationCount = vehicleCaptures.filter(v => v.violation).length;
  const confirmedCount = vehicleCaptures.filter(v => v.status === "Confirmé").length;

  return (
    <div className="w-full min-h-screen relative dark:bg-gray-900">
      <div className="px-8 py-6">
        {/* Section Recherche Intelligente */}
        <Card className="mb-6 bg-orange-50/50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-slate-800 [font-family:'Inter',Helvetica]">
                Recherche intelligente
              </h2>
            </div>
            <div className="space-y-3">
              <textarea
                placeholder="Décrivez ce que vous cherchez en langage naturel...&#10;Exemples:&#10;• 'Véhicules avec violations de vitesse'&#10;• 'Plaques détectées cette semaine'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-orange-200 rounded-lg text-slate-700 placeholder:text-slate-400 placeholder:text-xs min-h-[80px] resize-none [font-family:'Inter',Helvetica] text-sm"
              />
              <div className="flex gap-3">
                <Badge variant="outline" className="text-xs text-slate-600">
                  Véhicules autorisés
                </Badge>
                <Badge variant="outline" className="text-xs text-slate-600">
                  Violations récentes
                </Badge>
                <Badge variant="outline" className="text-xs text-slate-600">
                  Plaques détectées
                </Badge>
                <Badge variant="outline" className="text-xs text-slate-600">
                  Excès vitesse
                </Badge>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques et filtres */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <Button
              variant={activeTab === "all" ? "default" : "outline"}
              onClick={() => setActiveTab("all")}
              className={activeTab === "all" ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              🚗 Tous ({vehicleCaptures.length})
            </Button>
            <Button
              variant={activeTab === "authorized" ? "default" : "outline"}
              onClick={() => setActiveTab("authorized")}
              className={activeTab === "authorized" ? "bg-green-500 hover:bg-green-600" : ""}
            >
              ✅ Autorisés ({authorizedCount})
            </Button>
            <Button
              variant={activeTab === "violations" ? "default" : "outline"}
              onClick={() => setActiveTab("violations")}
              className={activeTab === "violations" ? "bg-red-500 hover:bg-red-600" : ""}
            >
              🚨 Violations ({violationCount})
            </Button>
            <Button
              variant={activeTab === "confirmed" ? "default" : "outline"}
              onClick={() => setActiveTab("confirmed")}
              className={activeTab === "confirmed" ? "bg-blue-500 hover:bg-blue-600" : ""}
            >
              📋 Confirmés ({confirmedCount})
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filtres avancés */}
          <div className="lg:col-span-1">
            <Card className="bg-white/90 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-4 h-4 text-orange-500" />
                  <h3 className="font-semibold text-gray-800 text-sm">
                    Filtres
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {/* Type de capture */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Type de capture
                    </label>
                    <Select 
                      defaultValue="plaques" 
                      onValueChange={(value) => setFilters({...filters, typeCapture: value})}
                    >
                      <SelectTrigger className="w-full h-10 text-sm">
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
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Sites
                    </label>
                    <Select 
                      defaultValue="all" 
                      onValueChange={(value) => setFilters({...filters, site: value})}
                    >
                      <SelectTrigger className="w-full h-10 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les sites</SelectItem>
                        <SelectItem value="site1">Site principal</SelectItem>
                        <SelectItem value="site2">Site secondaire</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Caméras */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Caméras
                    </label>
                    <Select 
                      defaultValue="all" 
                      onValueChange={(value) => setFilters({...filters, camera: value})}
                    >
                      <SelectTrigger className="w-full h-10 text-sm">
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
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Zones
                    </label>
                    <Select 
                      defaultValue="all" 
                      onValueChange={(value) => setFilters({...filters, zone: value})}
                    >
                      <SelectTrigger className="w-full h-10 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les zones</SelectItem>
                        <SelectItem value="entrance">Zone d'entrée</SelectItem>
                        <SelectItem value="parking">Parking</SelectItem>
                        <SelectItem value="vip">Zone VIP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Période avec date pickers */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Période
                    </label>
                    <div className="flex gap-2">
                      <Input 
                        type="date" 
                        defaultValue="2024-08-19"
                        className="flex-1 h-10 text-sm"
                        onChange={(e) => setFilters({...filters, dateDebut: e.target.value})}
                      />
                      <Input 
                        type="date" 
                        defaultValue="2024-08-25"
                        className="flex-1 h-10 text-sm"
                        onChange={(e) => setFilters({...filters, dateFin: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Violations */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Violations
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="stationnement" 
                          defaultChecked 
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" 
                          onCheckedChange={(checked) => setFilters({...filters, violations: {...filters.violations, stationnement: !!checked}})}
                        />
                        <label htmlFor="stationnement" className="text-sm text-gray-700">
                          Stationnement interdit
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="vitesse" 
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" 
                          onCheckedChange={(checked) => setFilters({...filters, violations: {...filters.violations, vitesse: !!checked}})}
                        />
                        <label htmlFor="vitesse" className="text-sm text-gray-700">
                          Excès de vitesse
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="sens" 
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" 
                          onCheckedChange={(checked) => setFilters({...filters, violations: {...filters.violations, sens: !!checked}})}
                        />
                        <label htmlFor="sens" className="text-sm text-gray-700">
                          Sens interdit
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="stop" 
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" 
                          onCheckedChange={(checked) => setFilters({...filters, violations: {...filters.violations, stop: !!checked}})}
                        />
                        <label htmlFor="stop" className="text-sm text-gray-700">
                          Stop
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Type de véhicule */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Type de véhicule
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="voiture" 
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" 
                          onCheckedChange={(checked) => setFilters({...filters, typeVehicule: {...filters.typeVehicule, voiture: !!checked}})}
                        />
                        <label htmlFor="voiture" className="text-sm text-gray-700">
                          Voiture
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="camion" 
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" 
                          onCheckedChange={(checked) => setFilters({...filters, typeVehicule: {...filters.typeVehicule, camion: !!checked}})}
                        />
                        <label htmlFor="camion" className="text-sm text-gray-700">
                          Camion
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="moto" 
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" 
                          onCheckedChange={(checked) => setFilters({...filters, typeVehicule: {...filters.typeVehicule, moto: !!checked}})}
                        />
                        <label htmlFor="moto" className="text-sm text-gray-700">
                          Moto
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="truck" 
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" 
                          onCheckedChange={(checked) => setFilters({...filters, typeVehicule: {...filters.typeVehicule, truck: !!checked}})}
                        />
                        <label htmlFor="truck" className="text-sm text-gray-700">
                          Truck
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="bus" 
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" 
                          onCheckedChange={(checked) => setFilters({...filters, typeVehicule: {...filters.typeVehicule, bus: !!checked}})}
                        />
                        <label htmlFor="bus" className="text-sm text-gray-700">
                          Bus
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Couleur */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Couleur
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="blanc" 
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" 
                          onCheckedChange={(checked) => setFilters({...filters, couleur: {...filters.couleur, blanc: !!checked}})}
                        />
                        <label htmlFor="blanc" className="text-sm text-gray-700">
                          Blanc
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="noir" 
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" 
                          onCheckedChange={(checked) => setFilters({...filters, couleur: {...filters.couleur, noir: !!checked}})}
                        />
                        <label htmlFor="noir" className="text-sm text-gray-700">
                          Noir
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="rouge" 
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" 
                          onCheckedChange={(checked) => setFilters({...filters, couleur: {...filters.couleur, rouge: !!checked}})}
                        />
                        <label htmlFor="rouge" className="text-sm text-gray-700">
                          Rouge
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="bleu" 
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" 
                          onCheckedChange={(checked) => setFilters({...filters, couleur: {...filters.couleur, bleu: !!checked}})}
                        />
                        <label htmlFor="bleu" className="text-sm text-gray-700">
                          Bleu
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="gris" 
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" 
                          onCheckedChange={(checked) => setFilters({...filters, couleur: {...filters.couleur, gris: !!checked}})}
                        />
                        <label htmlFor="gris" className="text-sm text-gray-700">
                          Gris
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Marque */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Marque
                    </label>
                    <Select 
                      defaultValue="all" 
                      onValueChange={(value) => setFilters({...filters, marque: value})}
                    >
                      <SelectTrigger className="w-full h-10 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les marques</SelectItem>
                        <SelectItem value="renault">Renault</SelectItem>
                        <SelectItem value="peugeot">Peugeot</SelectItem>
                        <SelectItem value="bmw">BMW</SelectItem>
                        <SelectItem value="mercedes">Mercedes</SelectItem>
                        <SelectItem value="tesla">Tesla</SelectItem>
                        <SelectItem value="yamaha">Yamaha</SelectItem>
                        <SelectItem value="iveco">Iveco</SelectItem>
                        <SelectItem value="ford">Ford</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bouton Appliquer */}
                  <div className="pt-4">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white h-10 font-medium">
                      <Search className="w-4 h-4 mr-2" />
                      Appliquer les filtres
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grille de cartes */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredData.map((vehicle) => (
                <Card key={vehicle.id} className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="relative mb-3">
                      <Badge 
                        className={`absolute top-2 right-2 ${
                          vehicle.violation ? "bg-red-500" : "bg-green-500"
                        } text-white text-xs`}
                      >
                        {vehicle.status}
                      </Badge>
                      <img
                        src={vehicle.image}
                        alt={vehicle.vehicleType}
                        className="w-full h-40 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=300&fit=crop";
                        }}
                      />
                      <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs text-white ${
                        vehicle.violation ? "bg-red-500" : "bg-green-500"
                      }`}>
                        {vehicle.location}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-slate-800 [font-family:'Inter',Helvetica] text-sm mb-1">
                      {vehicle.plate}
                    </h4>
                    
                    <p className="text-xs text-slate-500 [font-family:'Inter',Helvetica] mb-2">
                      {vehicle.vehicleType}
                    </p>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600">Vitesse:</span>
                      <span className="text-xs font-semibold">{vehicle.speed}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {vehicle.time}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {vehicle.date}
                      </Badge>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <p className="text-xs text-slate-500">
                        {vehicle.location}
                      </p>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};