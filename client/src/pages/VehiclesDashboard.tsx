import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';
import { 
  Car,
  Truck,
  Bike,
  Bus,
  Gauge,
  AlertTriangle,
  Camera,
  MapPin,
  Settings,
  Bell,
  Search,
  Maximize2,
  RefreshCw,
  Filter,
  CircleCheck,
  CircleX,
  Activity,
  Shield
} from 'lucide-react';
import { CameraPerformanceModal } from '@/components/CameraPerformanceModal';

// Import vehicle detection images
import vehicleImage1 from '@assets/stock_images/traffic_camera_view__8e4e968a.jpg';
import vehicleImage2 from '@assets/stock_images/traffic_camera_view__d984fc58.jpg';
import vehicleImage3 from '@assets/stock_images/traffic_camera_view__57548b28.jpg';
import vehicleImage4 from '@assets/stock_images/traffic_camera_view__5759916c.jpg';

export const VehiclesDashboard = (): JSX.Element => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedCamera, setSelectedCamera] = useState<any>(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [vehicleTypeTimePeriod, setVehicleTypeTimePeriod] = useState('today');

  // Key vehicle metrics - matching Safety Dashboard pattern
  const vehicleMetrics = [
    { label: 'Véhicules Détectés', value: 1247, icon: Car, change: '+15%', period: 'today' },
    { label: 'Plaques Reconnues', value: 892, icon: Camera, change: '+8%', period: 'today' },
    { label: 'Excès de Vitesse', value: 52, icon: Gauge, change: '+12%', period: 'today' },
    { label: 'Feux Rouges', value: 34, icon: AlertTriangle, change: '+5%', period: 'today' },
    { label: 'Stationnements', value: 67, icon: MapPin, change: '+18%', period: 'today' },
    { label: 'Sens Interdit', value: 23, icon: Shield, change: '+3%', period: 'today' },
    { label: 'Violations Total', value: 89, icon: AlertTriangle, change: '+23%', period: 'today' }
  ];

  // Radar chart data for Vehicle Module Performance
  const radarData = [
    { subject: 'Détection Plaques', currentWeek: 92, previousWeek: 88, fullMark: 100 },
    { subject: 'Vitesse Monitoring', currentWeek: 78, previousWeek: 75, fullMark: 100 },
    { subject: 'Type Recognition', currentWeek: 85, previousWeek: 82, fullMark: 100 },
    { subject: 'Violation Detection', currentWeek: 88, previousWeek: 85, fullMark: 100 },
    { subject: 'Zone Coverage', currentWeek: 75, previousWeek: 70, fullMark: 100 },
    { subject: 'False Positive Rate', currentWeek: 30, previousWeek: 38, fullMark: 100 },
    { subject: 'Response Time', currentWeek: 90, previousWeek: 87, fullMark: 100 },
    { subject: 'Alert Accuracy', currentWeek: 82, previousWeek: 80, fullMark: 100 }
  ];

  // Vehicle recommendations data
  const vehicleRecommendations = [
    {
      title: 'Améliorer Caméras',
      description: 'Installer nouvelles caméras haute résolution',
      icon: Camera
    },
    {
      title: 'Zones à Risque',
      description: 'Augmenter surveillance intersections',
      icon: MapPin
    },
    {
      title: 'Réduction Violations',
      description: 'Optimiser signalisation routière',
      icon: AlertTriangle
    },
    {
      title: 'Système d\'Alerte',
      description: 'Améliorer temps de réponse',
      icon: Bell
    },
    {
      title: 'Calibration Vitesse',
      description: 'Ajuster seuils de détection',
      icon: Gauge
    },
    {
      title: 'Formation Personnel',
      description: 'Training système reconnaissance',
      icon: Settings
    },
    {
      title: 'Analyse Trafic',
      description: 'Optimiser flux de circulation',
      icon: Activity
    },
    {
      title: 'Maintenance Équipement',
      description: 'Inspection caméras régulière',
      icon: Settings
    },
    {
      title: 'Protocoles Sécurité',
      description: 'Mise à jour procédures',
      icon: Shield
    },
    {
      title: 'Rapports Incidents',
      description: 'Streamliner processus reporting',
      icon: AlertTriangle
    }
  ];

  // Live vehicle detections
  const liveDetections = [
    {
      id: 1,
      plate: 'ABC-123',
      type: 'Excès de Vitesse',
      location: 'Avenue Principale',
      area: 'Zone A',
      time: '2 mins ago',
      camera: 'CAM-05',
      status: 'New',
      statusColor: 'bg-green-500',
      severity: 'Critical',
      severityColor: 'bg-red-500',
      speed: '92 km/h',
      vehicleType: 'Voiture',
      thumbnail: vehicleImage1
    },
    {
      id: 2,
      plate: 'XYZ-789',
      type: 'Feu Rouge',
      location: 'Intersection Centre',
      area: 'Zone B',
      time: '5 mins ago',
      camera: 'CAM-02',
      status: 'In Review',
      statusColor: 'bg-yellow-500',
      severity: 'High',
      severityColor: 'bg-orange-500',
      speed: '45 km/h',
      vehicleType: 'Camion',
      thumbnail: vehicleImage2
    },
    {
      id: 3,
      plate: 'MNO-456',
      type: 'Stationnement Interdit',
      location: 'Rue Commerciale',
      area: 'Zone C',
      time: '8 mins ago',
      camera: 'CAM-07',
      status: 'Confirmed',
      statusColor: 'bg-gray-400',
      severity: 'Medium',
      severityColor: 'bg-blue-500',
      speed: '0 km/h',
      vehicleType: 'Voiture',
      thumbnail: vehicleImage3
    },
    {
      id: 4,
      plate: 'DEF-789',
      type: 'Sens Interdit',
      location: 'Boulevard Nord',
      area: 'Zone A',
      time: '12 mins ago',
      camera: 'CAM-03',
      status: 'Resolved',
      statusColor: 'bg-gray-500',
      severity: 'High',
      severityColor: 'bg-orange-500',
      speed: '38 km/h',
      vehicleType: 'Moto',
      thumbnail: vehicleImage4
    },
    {
      id: 5,
      plate: 'GHI-012',
      type: 'Ligne Continue',
      location: 'Route Principale',
      area: 'Zone B',
      time: '15 mins ago',
      camera: 'CAM-08',
      status: 'New',
      statusColor: 'bg-green-500',
      severity: 'Medium',
      severityColor: 'bg-blue-500',
      speed: '55 km/h',
      vehicleType: 'Bus',
      thumbnail: vehicleImage1
    },
    {
      id: 6,
      plate: 'JKL-345',
      type: 'Excès de Vitesse',
      location: 'Autoroute',
      area: 'Zone D',
      time: '18 mins ago',
      camera: 'CAM-12',
      status: 'Critical',
      statusColor: 'bg-red-500',
      severity: 'Critical',
      severityColor: 'bg-red-600',
      speed: '145 km/h',
      vehicleType: 'Voiture',
      thumbnail: vehicleImage2
    },
    {
      id: 7,
      plate: 'PQR-678',
      type: 'Stop Non Respecté',
      location: 'Intersection Sud',
      area: 'Zone C',
      time: '22 mins ago',
      camera: 'CAM-04',
      status: 'Confirmed',
      statusColor: 'bg-gray-400',
      severity: 'High',
      severityColor: 'bg-orange-500',
      speed: '42 km/h',
      vehicleType: 'Voiture',
      thumbnail: vehicleImage3
    },
    {
      id: 8,
      plate: 'STU-901',
      type: 'Zone Restreinte',
      location: 'Zone Industrielle',
      area: 'Zone E',
      time: '25 mins ago',
      camera: 'CAM-09',
      status: 'New',
      statusColor: 'bg-green-500',
      severity: 'Alert',
      severityColor: 'bg-yellow-400',
      speed: '28 km/h',
      vehicleType: 'Camion',
      thumbnail: vehicleImage4
    }
  ];

  // Violation distribution
  const violationDistribution = [
    { name: 'Excès Vitesse', value: 32.5, percentage: '32.5%', color: '#059669', gradientId: 'speed' },
    { name: 'Feu Rouge', value: 24.3, percentage: '24.3%', color: '#10b981', gradientId: 'red' },
    { name: 'Stationnement', value: 18.7, percentage: '18.7%', color: '#34d399', gradientId: 'parking' },
    { name: 'Sens Interdit', value: 12.8, percentage: '12.8%', color: '#6ee7b7', gradientId: 'direction' },
    { name: 'Stop', value: 7.2, percentage: '7.2%', color: '#a7f3d0', gradientId: 'stop' },
    { name: 'Ligne Continue', value: 4.5, percentage: '4.5%', color: '#d1fae5', gradientId: 'line' }
  ];

  // Detection summary
  const detectionSummary = [
    { type: 'Violations Critiques', count: 89, icon: AlertTriangle },
    { type: 'Priorité Haute', count: 67, icon: Gauge },
    { type: 'Priorité Moyenne', count: 45, icon: Shield },
    { type: 'Priorité Basse', count: 23, icon: Car },
    { type: 'En Révision', count: 34, icon: RefreshCw },
    { type: 'Résolues Aujourd\'hui', count: 156, icon: CircleCheck },
    { type: 'Caméras Actives', count: 24, icon: Camera },
    { type: 'Zones Surveillées', count: 12, icon: MapPin }
  ];

  // Detections per camera
  const camerasData = [
    { name: 'CAM-05', zone: 'Avenue Principale', violations: 52 },
    { name: 'CAM-02', zone: 'Intersection Centre', violations: 48 },
    { name: 'CAM-03', zone: 'Boulevard Nord', violations: 39 },
    { name: 'CAM-07', zone: 'Rue Commerciale', violations: 35 },
    { name: 'CAM-01', zone: 'Entrée Principale', violations: 28 },
    { name: 'CAM-04', zone: 'Intersection Sud', violations: 44 },
    { name: 'CAM-06', zone: 'Route Nationale', violations: 51 },
    { name: 'CAM-08', zone: 'Route Principale', violations: 25 },
    { name: 'CAM-09', zone: 'Zone Industrielle', violations: 37 },
    { name: 'CAM-10', zone: 'Centre Ville', violations: 19 },
    { name: 'CAM-11', zone: 'Parking', violations: 15 },
    { name: 'CAM-12', zone: 'Autoroute', violations: 42 }
  ];

  // Detections per zone
  const zonesData = [
    { name: 'Zone A', area: 'Avenue Principale', violations: 134, total: 'total violations' },
    { name: 'Zone B', area: 'Intersection Centre', violations: 98, total: 'total violations' },
    { name: 'Zone C', area: 'Rue Commerciale', violations: 76, total: 'total violations' },
    { name: 'Zone D', area: 'Autoroute', violations: 112, total: 'total violations' },
    { name: 'Zone E', area: 'Zone Industrielle', violations: 54, total: 'total violations' },
    { name: 'Zone F', area: 'Centre Ville', violations: 41, total: 'total violations' },
    { name: 'Zone G', area: 'Boulevard Nord', violations: 67, total: 'total violations' },
    { name: 'Zone H', area: 'Route Nationale', violations: 89, total: 'total violations' }
  ];

  // Live vehicle captures with detailed metadata
  const liveVehicleCaptures = [
    {
      id: 1,
      image: vehicleImage1,
      color: 'Bleu',
      type: 'Berline',
      brand: 'Toyota',
      model: 'Camry',
      time: '2 mins ago',
      camera: 'CAM-05',
      confidence: '98%',
      location: 'Avenue Principale'
    },
    {
      id: 2,
      image: vehicleImage2,
      color: 'Noir',
      type: 'SUV',
      brand: 'Mercedes',
      model: 'GLE',
      time: '5 mins ago',
      camera: 'CAM-02',
      confidence: '95%',
      location: 'Intersection Centre'
    },
    {
      id: 3,
      image: vehicleImage3,
      color: 'Blanc',
      type: 'Sedan',
      brand: 'BMW',
      model: '320i',
      time: '8 mins ago',
      camera: 'CAM-07',
      confidence: '97%',
      location: 'Rue Commerciale'
    },
    {
      id: 4,
      image: vehicleImage4,
      color: 'Gris',
      type: 'Berline',
      brand: 'Audi',
      model: 'A4',
      time: '12 mins ago',
      camera: 'CAM-03',
      confidence: '96%',
      location: 'Boulevard Nord'
    },
    {
      id: 5,
      image: vehicleImage1,
      color: 'Rouge',
      type: 'Coupé',
      brand: 'Honda',
      model: 'Civic',
      time: '15 mins ago',
      camera: 'CAM-08',
      confidence: '94%',
      location: 'Route Principale'
    },
    {
      id: 6,
      image: vehicleImage2,
      color: 'Argent',
      type: 'SUV',
      brand: 'Nissan',
      model: 'Qashqai',
      time: '18 mins ago',
      camera: 'CAM-12',
      confidence: '99%',
      location: 'Autoroute'
    }
  ];

  // Vehicle type distribution data by time period
  const vehicleTypeDistribution = {
    today: [
      { type: 'Voiture', count: 567 },
      { type: 'Camion', count: 234 },
      { type: 'Moto', count: 189 },
      { type: 'Bus', count: 78 },
      { type: 'Vélo', count: 179 }
    ],
    week: [
      { type: 'Voiture', count: 3845 },
      { type: 'Camion', count: 1567 },
      { type: 'Moto', count: 1234 },
      { type: 'Bus', count: 456 },
      { type: 'Vélo', count: 987 }
    ],
    month: [
      { type: 'Voiture', count: 16234 },
      { type: 'Camion', count: 6789 },
      { type: 'Moto', count: 5432 },
      { type: 'Bus', count: 1876 },
      { type: 'Vélo', count: 4123 }
    ],
    year: [
      { type: 'Voiture', count: 198456 },
      { type: 'Camion', count: 82345 },
      { type: 'Moto', count: 65789 },
      { type: 'Bus', count: 23456 },
      { type: 'Vélo', count: 51234 }
    ]
  };

  // Vehicle type detection trend over time
  const vehicleDetectionTrend = [
    { time: '00:00', Voiture: 45, Camion: 38, Moto: 32, Bus: 25, Vélo: 28 },
    { time: '04:00', Voiture: 23, Camion: 18, Moto: 15, Bus: 12, Vélo: 20 },
    { time: '08:00', Voiture: 89, Camion: 72, Moto: 65, Bus: 58, Vélo: 75 },
    { time: '12:00', Voiture: 67, Camion: 55, Moto: 48, Bus: 42, Vélo: 60 },
    { time: '16:00', Voiture: 78, Camion: 65, Moto: 58, Bus: 52, Vélo: 68 },
    { time: '20:00', Voiture: 56, Camion: 45, Moto: 38, Bus: 32, Vélo: 48 }
  ];

  // Vehicle violation trends over time
  const violationTrendsData = [
    { time: '08:00', speeding: 4, parking: 3, redLine: 2, wrongWay: 2, noEntry: 2, overweight: 1 },
    { time: '09:00', speeding: 6, parking: 4, redLine: 3, wrongWay: 3, noEntry: 3, overweight: 2 },
    { time: '10:00', speeding: 9, parking: 6, redLine: 4, wrongWay: 4, noEntry: 4, overweight: 3 },
    { time: '11:00', speeding: 11, parking: 7, redLine: 5, wrongWay: 5, noEntry: 5, overweight: 4 },
    { time: '12:00', speeding: 16, parking: 9, redLine: 7, wrongWay: 6, noEntry: 6, overweight: 5 },
    { time: '13:00', speeding: 13, parking: 11, redLine: 8, wrongWay: 7, noEntry: 7, overweight: 6 },
    { time: '14:00', speeding: 18, parking: 13, redLine: 9, wrongWay: 8, noEntry: 8, overweight: 7 },
    { time: '15:00', speeding: 19, parking: 16, redLine: 10, wrongWay: 9, noEntry: 9, overweight: 6 },
    { time: '16:00', speeding: 16, parking: 17, redLine: 11, wrongWay: 7, noEntry: 7, overweight: 5 },
    { time: '17:00', speeding: 13, parking: 19, redLine: 9, wrongWay: 6, noEntry: 6, overweight: 4 },
    { time: '18:00', speeding: 10, parking: 20, redLine: 8, wrongWay: 5, noEntry: 5, overweight: 3 }
  ];

  // Live license plate recognition
  const livePlateRecognition = [
    {
      id: 1,
      plate: 'ABC-123-XY',
      image: vehicleImage1,
      time: '1 min ago',
      camera: 'CAM-05',
      confidence: '99.2%',
      status: 'Valide',
      statusColor: 'bg-green-500',
      country: 'France',
      region: 'Île-de-France'
    },
    {
      id: 2,
      plate: 'XYZ-789-AB',
      image: vehicleImage2,
      time: '3 mins ago',
      camera: 'CAM-02',
      confidence: '98.7%',
      status: 'Valide',
      statusColor: 'bg-green-500',
      country: 'France',
      region: 'Provence'
    },
    {
      id: 3,
      plate: 'MNO-456-CD',
      image: vehicleImage3,
      time: '6 mins ago',
      camera: 'CAM-07',
      confidence: '97.5%',
      status: 'Recherchée',
      statusColor: 'bg-red-500',
      country: 'France',
      region: 'Normandie'
    },
    {
      id: 4,
      plate: 'DEF-789-EF',
      image: vehicleImage4,
      time: '9 mins ago',
      camera: 'CAM-03',
      confidence: '96.8%',
      status: 'Valide',
      statusColor: 'bg-green-500',
      country: 'France',
      region: 'Bretagne'
    },
    {
      id: 5,
      plate: 'GHI-012-GH',
      image: vehicleImage1,
      time: '11 mins ago',
      camera: 'CAM-08',
      confidence: '99.5%',
      status: 'Volée',
      statusColor: 'bg-orange-500',
      country: 'France',
      region: 'Alsace'
    },
    {
      id: 6,
      plate: 'JKL-345-IJ',
      image: vehicleImage2,
      time: '14 mins ago',
      camera: 'CAM-12',
      confidence: '98.9%',
      status: 'Valide',
      statusColor: 'bg-green-500',
      country: 'France',
      region: 'Aquitaine'
    },
    {
      id: 7,
      plate: 'PQR-678-KL',
      image: vehicleImage3,
      time: '17 mins ago',
      camera: 'CAM-04',
      confidence: '95.3%',
      status: 'Valide',
      statusColor: 'bg-green-500',
      country: 'France',
      region: 'Bourgogne'
    },
    {
      id: 8,
      plate: 'STU-901-MN',
      image: vehicleImage4,
      time: '20 mins ago',
      camera: 'CAM-09',
      confidence: '97.1%',
      status: 'Expirée',
      statusColor: 'bg-yellow-500',
      country: 'France',
      region: 'Lorraine'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">

      {/* Key Metrics */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        {vehicleMetrics.map((metric, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
            {/* Green left accent border */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
            <CardContent className="p-4 pl-6">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{metric.label}</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{metric.value}</div>
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-xs text-green-500 font-medium">{metric.change}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{metric.period}</span>
                  </div>
                </div>
                <div className="ml-4">
                  <metric.icon className="w-8 h-8 text-emerald-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Vehicle Module Performance */}
        <Card className="col-span-7 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-base font-medium">Performance Module Véhicules</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700 h-8 px-4 text-xs"
                >
                  Hebdomadaire
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 h-8 px-4 text-xs"
                >
                  Mensuel
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <div className="radar-card h-80 mb-4 w-full max-w-md">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid 
                        gridType="polygon" 
                        radialLines={true}
                        stroke="#9ca3af"
                        strokeWidth={1}
                        strokeOpacity={0.5}
                      />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }}
                        tickFormatter={(value) => value}
                      />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 100]} 
                        tick={{ fill: '#9ca3af', fontSize: 10 }}
                        tickCount={5}
                        axisLine={false}
                      />
                      <Radar
                        name="Semaine Actuelle"
                        dataKey="currentWeek"
                        stroke="#059669"
                        fill="#059669"
                        fillOpacity={0.2}
                        strokeWidth={3}
                        dot={{ fill: '#059669', strokeWidth: 3, r: 6 }}
                      />
                      <Radar
                        name="Semaine Précédente"
                        dataKey="previousWeek"
                        stroke="#6b7280"
                        fill="#6b7280"
                        fillOpacity={0.1}
                        strokeWidth={2}
                        dot={{ fill: '#6b7280', strokeWidth: 2, r: 4 }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-6 text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Semaine Actuelle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Semaine Précédente</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-700/50">
                  <div className="text-center">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Score Véhicules</h4>
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">88</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">sur 100</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">Recommandations Véhicules</h3>
                <div className="h-96 overflow-y-scroll scrollbar-hide space-y-3 pr-2">
                  {vehicleRecommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                        <recommendation.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{recommendation.title}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">{recommendation.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Detections */}
        <Card className="col-span-5 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-gray-900 dark:text-gray-100 text-base font-medium">Détections En Direct</CardTitle>
              </div>
              <Button size="sm" variant="ghost" className="h-8 px-3">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] overflow-y-scroll scrollbar-hide space-y-3 pr-2">
              {liveDetections.map((detection) => (
                <div key={detection.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <img 
                      src={detection.thumbnail} 
                      alt={detection.type}
                      className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                      data-testid={`img-detection-${detection.id}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">{detection.plate}</div>
                        <div className="flex items-center gap-1">
                          <Badge className={`${detection.statusColor} text-white text-xs px-2 py-0.5`}>
                            {detection.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-gray-900 dark:text-gray-100 font-medium mb-1">{detection.type}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 mb-2">
                        <MapPin className="w-3 h-3" />
                        <span>{detection.location}</span>
                        <span>•</span>
                        <span>{detection.area}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <Camera className="w-3 h-3" />
                          <span>{detection.camera}</span>
                          <span>•</span>
                          <span>{detection.speed}</span>
                        </div>
                        <Badge className={`${detection.severityColor} text-white text-xs px-2 py-0.5`}>
                          {detection.severity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Vehicle Captures */}
        <Card className="col-span-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-gray-900 dark:text-gray-100 text-base font-medium">Captures Véhicules en Direct</CardTitle>
              </div>
              <Button size="sm" variant="ghost" className="h-8 px-3">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] overflow-y-scroll scrollbar-hide space-y-3 pr-2">
              {liveVehicleCaptures.map((vehicle) => (
                <div key={vehicle.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <img 
                      src={vehicle.image} 
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                      data-testid={`img-vehicle-${vehicle.id}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-bold text-base text-gray-900 dark:text-gray-100">{vehicle.brand} {vehicle.model}</div>
                        <Badge className="bg-emerald-600 text-white text-xs px-2 py-1">
                          {vehicle.confidence}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Couleur:</span>
                          <span className="text-xs font-medium text-gray-900 dark:text-gray-100">{vehicle.color}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Type:</span>
                          <span className="text-xs font-medium text-gray-900 dark:text-gray-100">{vehicle.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 mb-1">
                        <MapPin className="w-3 h-3" />
                        <span>{vehicle.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Camera className="w-3 h-3" />
                        <span>{vehicle.camera}</span>
                        <span>•</span>
                        <span>{vehicle.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live License Plate Recognition */}
        <Card className="col-span-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-gray-900 dark:text-gray-100 text-base font-medium">Reconnaissance Plaques en Direct</CardTitle>
              </div>
              <Button size="sm" variant="ghost" className="h-8 px-3">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] overflow-y-scroll scrollbar-hide space-y-3 pr-2">
              {livePlateRecognition.map((plate) => (
                <div key={plate.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <img 
                      src={plate.image} 
                      alt={plate.plate}
                      className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                      data-testid={`img-plate-${plate.id}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-bold text-lg text-gray-900 dark:text-gray-100 font-mono tracking-wider">{plate.plate}</div>
                        <Badge className={`${plate.statusColor} text-white text-xs px-2 py-1`}>
                          {plate.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Confiance:</span>
                          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{plate.confidence}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Région:</span>
                          <span className="text-xs font-medium text-gray-900 dark:text-gray-100">{plate.region}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 mb-1">
                        <MapPin className="w-3 h-3" />
                        <span>{plate.country}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Camera className="w-3 h-3" />
                        <span>{plate.camera}</span>
                        <span>•</span>
                        <span>{plate.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Violation Distribution */}
        <Card className="col-span-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100 text-base font-medium">Distribution des Violations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    {violationDistribution.map((entry) => (
                      <linearGradient key={entry.gradientId} id={entry.gradientId} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                        <stop offset="100%" stopColor={entry.color} stopOpacity={0.8} />
                      </linearGradient>
                    ))}
                    <filter id="vehiclePieShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#059669" floodOpacity="0.15"/>
                    </filter>
                  </defs>
                  <Pie
                    data={violationDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={105}
                    innerRadius={30}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                    paddingAngle={2}
                    filter="url(#vehiclePieShadow)"
                    label={({ name, percentage, x, y }) => (
                      <text 
                        x={x} 
                        y={y} 
                        fill="#6b7280" 
                        textAnchor={x > 200 ? 'start' : 'end'} 
                        dominantBaseline="central"
                        fontSize="11"
                        fontWeight="600"
                      >
                        {percentage}
                      </text>
                    )}
                    labelLine={{
                      stroke: '#6b7280', 
                      strokeWidth: 1.5,
                      strokeDasharray: '2 2'
                    }}
                  >
                    {violationDistribution.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={`url(#${entry.gradientId})`}
                        stroke="#ffffff"
                        strokeWidth={2}
                        style={{
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255,255,255,0.95)', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      backdropFilter: 'blur(8px)'
                    }}
                    formatter={(value, name) => [`${value}%`, name]}
                    labelFormatter={(label) => `Violation: ${label}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-3">
                {violationDistribution.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}88)` }}
                      ></div>
                      <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">{item.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{item.percentage}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">Total violations: <span className="font-semibold text-emerald-600">1,247</span> incidents</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detection Summary */}
        <Card className="col-span-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100 text-base font-medium">Résumé des Détections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {detectionSummary.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">{item.type}</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{item.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Violations per Camera */}
        <Card className="col-span-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100 text-base font-medium">Violations par Caméra</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={camerasData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#f3f4f6' }}
                />
                <Bar dataKey="violations" fill="#059669" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Violations per Zone */}
        <Card className="col-span-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100 text-base font-medium">Violations par Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={zonesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#f3f4f6' }}
                />
                <Bar dataKey="violations" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vehicle Type Distribution */}
        <Card className="col-span-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-base font-medium">Distribution par Type de Véhicule</CardTitle>
              <Select value={vehicleTypeTimePeriod} onValueChange={setVehicleTypeTimePeriod}>
                <SelectTrigger className="w-32 h-8 text-xs" data-testid="select-time-period">
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Semaine</SelectItem>
                  <SelectItem value="month">Mois</SelectItem>
                  <SelectItem value="year">Année</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vehicleTypeDistribution[vehicleTypeTimePeriod as keyof typeof vehicleTypeDistribution]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="type" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#f3f4f6' }}
                />
                <Bar dataKey="count" fill="#059669" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vehicle Type Detection Trend */}
        <Card className="col-span-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100 text-base font-medium">Tendance des Détections par Type de Véhicule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={vehicleDetectionTrend}>
                  <CartesianGrid strokeDasharray="1 1" stroke="#e5e7eb" className="dark:stroke-gray-600" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 11 }}
                    className="dark:fill-gray-300"
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 11 }}
                    className="dark:fill-gray-300"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area type="monotone" dataKey="Voiture" stroke="#059669" fill="#05966910" strokeWidth={2} />
                  <Area type="monotone" dataKey="Camion" stroke="#f59e0b" fill="#f59e0b10" strokeWidth={2} />
                  <Line type="monotone" dataKey="Moto" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Bus" stroke="#ef4444" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Vélo" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-x-6 gap-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Voiture</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Camion</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Moto</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Bus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Vélo</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Violation Detection Trend */}
        <Card className="col-span-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100 text-base font-medium">Tendance des Détections par violation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={violationTrendsData}>
                  <CartesianGrid strokeDasharray="1 1" stroke="#e5e7eb" className="dark:stroke-gray-600" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 11 }}
                    className="dark:fill-gray-300"
                  />
                  <YAxis 
                    domain={[0, 20]}
                    ticks={[0, 5, 10, 15, 20]}
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 11 }}
                    className="dark:fill-gray-300"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area type="monotone" dataKey="speeding" stroke="#059669" fill="#05966910" strokeWidth={2} />
                  <Area type="monotone" dataKey="parking" stroke="#f59e0b" fill="#f59e0b10" strokeWidth={2} />
                  <Line type="monotone" dataKey="redLine" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="wrongWay" stroke="#ef4444" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="noEntry" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="overweight" stroke="#ec4899" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-x-6 gap-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Excès de vitesse</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Stationnement interdit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Franchissement ligne</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Sens interdit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Accès interdit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Surcharge</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Camera Performance Modal */}
      <CameraPerformanceModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        camera={selectedCamera}
      />
    </div>
  );
};
