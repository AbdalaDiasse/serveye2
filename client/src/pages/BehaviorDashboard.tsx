import { useState, useEffect } from 'react';
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
  Sword,
  User,
  Users,
  Cigarette,
  Zap,
  Phone,
  ShieldAlert,
  UserCheck,
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
  Sun,
  Moon,
  BarChart3,
  Shield,
  HardHat
} from 'lucide-react';
import { CameraPerformanceModal } from '@/components/CameraPerformanceModal';

// Import behavior detection images
import detectionImage1 from '@assets/stock_images/construction_worker__9d5e7150.jpg';
import detectionImage2 from '@assets/stock_images/construction_worker__7080098c.jpg';
import detectionImage3 from '@assets/stock_images/construction_worker__42be1684.jpg';
import detectionImage4 from '@assets/stock_images/construction_worker__b0637b73.jpg';

export default function BehaviorDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedCamera, setSelectedCamera] = useState<any>(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  // Key behavior metrics - focused on behavior detection
  const behaviorMetrics = [
    { label: 'Fight Detection', value: 12, icon: Sword, change: '+5%', period: 'today' },
    { label: 'Falls', value: 8, icon: User, change: '-2%', period: 'today' },
    { label: 'Crowd Movement', value: 34, icon: Users, change: '+15%', period: 'today' },
    { label: 'Smoking', value: 23, icon: Cigarette, change: '+8%', period: 'today' },
    { label: 'Running', value: 45, icon: Zap, change: '+12%', period: 'today' },
    { label: 'Calling', value: 19, icon: Phone, change: '+3%', period: 'today' },
    { label: 'Weapon', value: 3, icon: ShieldAlert, change: '+1%', period: 'today' }
  ];

  const behaviorDetectionSummary = [
    { type: 'Critical Behaviors', count: 124, icon: AlertTriangle },
    { type: 'High Priority', count: 89, icon: User },
    { type: 'Medium Priority', count: 67, icon: Shield },
    { type: 'Low Priority', count: 45, icon: Users },
    { type: 'Pending Review', count: 78, icon: RefreshCw },
    { type: 'Resolved Today', count: 201, icon: CircleCheck },
    { type: 'Camera Issues', count: 15, icon: Settings },
    { type: 'Training Required', count: 83, icon: HardHat }
  ];

  // Radar chart data for Behavior Module Performance - matching screenshot design
  const radarData = [
    { subject: 'Coverage Rate', currentWeek: 85, previousWeek: 78, fullMark: 100 },
    { subject: 'Fight Detection', currentWeek: 92, previousWeek: 88, fullMark: 100 },
    { subject: 'Fall Detection', currentWeek: 89, previousWeek: 82, fullMark: 100 },
    { subject: 'Crowd Analysis', currentWeek: 76, previousWeek: 72, fullMark: 100 },
    { subject: 'Weapon Detection', currentWeek: 94, previousWeek: 90, fullMark: 100 },
    { subject: 'Behavior Accuracy', currentWeek: 87, previousWeek: 83, fullMark: 100 },
    { subject: 'Response Time', currentWeek: 81, previousWeek: 75, fullMark: 100 },
    { subject: 'Alert Precision', currentWeek: 88, previousWeek: 85, fullMark: 100 }
  ];

  // Behavior recommendations data - matching screenshot design
  const behaviorRecommendations = [
    {
      title: 'Update behavior policies',
      description: 'Update behavior policies',
      icon: RefreshCw
    },
    {
      title: 'Alert Threshold',
      description: 'Fine-tune detection sensitivity',
      icon: AlertTriangle
    },
    {
      title: 'Staff Training',
      description: 'Enhance behavior awareness',
      icon: Users
    },
    {
      title: 'Equipment Maintenance',
      description: 'Regular security checks',
      icon: Settings
    },
    {
      title: 'Performance Analytics',
      description: 'Monitor behavior metrics',
      icon: BarChart3
    }
  ];

  // Live detections - expanded for scrolling
  const liveDetections = [
    {
      id: 1,
      type: 'Fight Detection',
      location: 'Cafeteria',
      area: 'Site A',
      time: '2 mins ago',
      camera: 'CAM-05',
      status: 'New',
      statusColor: 'bg-green-500',
      severity: 'Critical',
      severityColor: 'bg-red-500',
      thumbnail: detectionImage1
    },
    {
      id: 2,
      type: 'Smoking Detected',
      location: 'Warehouse',
      area: 'Site B',
      time: '5 mins ago',
      camera: 'CAM-02',
      status: 'In Review',
      statusColor: 'bg-yellow-500',
      severity: 'High',
      severityColor: 'bg-orange-500',
      thumbnail: detectionImage2
    },
    {
      id: 3,
      type: 'Crowd Movement',
      location: 'Entrance',
      area: 'Site C',
      time: '8 mins ago',
      camera: 'CAM-07',
      status: 'Confirmed',
      statusColor: 'bg-gray-400',
      severity: 'Alert',
      severityColor: 'bg-yellow-400',
      thumbnail: detectionImage3
    },
    {
      id: 4,
      type: 'Fall Detected',
      location: 'Stairwell',
      area: 'Site A',
      time: '12 mins ago',
      camera: 'CAM-03',
      status: 'Resolved',
      statusColor: 'bg-blue-500',
      severity: 'Critical',
      severityColor: 'bg-red-500',
      thumbnail: detectionImage4
    },
    {
      id: 5,
      type: 'Running Detected',
      location: 'Corridor',
      area: 'Site B',
      time: '15 mins ago',
      camera: 'CAM-04',
      status: 'New',
      statusColor: 'bg-green-500',
      severity: 'Medium',
      severityColor: 'bg-blue-400',
      thumbnail: detectionImage1
    },
    {
      id: 6,
      type: 'Phone Usage',
      location: 'Production Floor',
      area: 'Site C',
      time: '18 mins ago',
      camera: 'CAM-06',
      status: 'In Review',
      statusColor: 'bg-yellow-500',
      severity: 'Low',
      severityColor: 'bg-green-400',
      thumbnail: detectionImage2
    },
    {
      id: 7,
      type: 'Weapon Detected',
      location: 'Security Gate',
      area: 'Site A',
      time: '22 mins ago',
      camera: 'CAM-01',
      status: 'Confirmed',
      statusColor: 'bg-gray-400',
      severity: 'Critical',
      severityColor: 'bg-red-500',
      thumbnail: detectionImage3
    },
    {
      id: 8,
      type: 'Gathering Detected',
      location: 'Break Room',
      area: 'Site B',
      time: '25 mins ago',
      camera: 'CAM-08',
      status: 'Resolved',
      statusColor: 'bg-blue-500',
      severity: 'Medium',
      severityColor: 'bg-blue-400',
      thumbnail: detectionImage4
    }
  ];

  // Weekly behavior data
  const weeklyData = [
    { day: 'Mon', fights: 4, falls: 2, smoking: 8, crowds: 12, running: 15, calls: 6, weapons: 1, gathering: 9 },
    { day: 'Tue', fights: 6, falls: 1, smoking: 12, crowds: 18, running: 22, calls: 4, weapons: 0, gathering: 14 },
    { day: 'Wed', fights: 3, falls: 3, smoking: 9, crowds: 15, running: 18, calls: 8, weapons: 2, gathering: 11 },
    { day: 'Thu', fights: 8, falls: 2, smoking: 15, crowds: 25, running: 28, calls: 5, weapons: 1, gathering: 16 },
    { day: 'Fri', fights: 5, falls: 4, smoking: 11, crowds: 20, running: 24, calls: 7, weapons: 0, gathering: 13 },
    { day: 'Sat', fights: 2, falls: 1, smoking: 6, crowds: 8, running: 12, calls: 3, weapons: 0, gathering: 7 },
    { day: 'Sun', fights: 1, falls: 0, smoking: 4, crowds: 5, running: 8, calls: 2, weapons: 0, gathering: 4 }
  ];

  // Hourly behavior distribution
  const hourlyData = [
    { hour: '6h', detections: 5 },
    { hour: '7h', detections: 12 },
    { hour: '8h', detections: 28 },
    { hour: '9h', detections: 45 },
    { hour: '10h', detections: 52 },
    { hour: '11h', detections: 48 },
    { hour: '12h', detections: 38 },
    { hour: '13h', detections: 42 },
    { hour: '14h', detections: 56 },
    { hour: '15h', detections: 49 },
    { hour: '16h', detections: 35 },
    { hour: '17h', detections: 22 },
    { hour: '18h', detections: 15 }
  ];

  // Cameras data with behavior detections
  const camerasData = [
    { name: 'CAM-01', zone: 'Main Entrance', violations: 89 },
    { name: 'CAM-02', zone: 'Cafeteria', violations: 67 },
    { name: 'CAM-03', zone: 'Production Floor A', violations: 54 },
    { name: 'CAM-04', zone: 'Warehouse', violations: 43 },
    { name: 'CAM-05', zone: 'Break Room', violations: 76 },
    { name: 'CAM-06', zone: 'Production Floor B', violations: 41 },
    { name: 'CAM-07', zone: 'Corridor', violations: 38 },
    { name: 'CAM-08', zone: 'Maintenance Bay', violations: 25 },
    { name: 'CAM-09', zone: 'Storage Area', violations: 32 },
    { name: 'CAM-10', zone: 'Office Area', violations: 18 },
    { name: 'CAM-11', zone: 'Parking Lot', violations: 12 },
    { name: 'CAM-12', zone: 'Emergency Exit', violations: 29 }
  ];

  // Behavior detection frequency data
  const detectionFrequencyData = [
    { type: 'Fight Detection', violations: 78, color: '#D32F2F' },
    { type: 'Falls', violations: 45, color: '#B71C1C' },
    { type: 'Crowd Movement', violations: 34, color: '#F44336' },
    { type: 'Smoking', violations: 23, color: '#E53935' },
    { type: 'Running', violations: 19, color: '#EF5350' },
    { type: 'Calling', violations: 15, color: '#F48FB1' },
    { type: 'Weapon Detection', violations: 8, color: '#FFCDD2' }
  ];

  // Behavior trends data
  const behaviorTrendsData = [
    { time: '08:00', total: 13, fights: 2, falls: 1, crowds: 3, smoking: 1, running: 4, calling: 2, weapons: 0 },
    { time: '09:00', total: 19, fights: 3, falls: 2, crowds: 4, smoking: 2, running: 5, calling: 3, weapons: 0 },
    { time: '10:00', total: 29, fights: 5, falls: 3, crowds: 6, smoking: 3, running: 7, calling: 4, weapons: 1 },
    { time: '11:00', total: 22, fights: 4, falls: 2, crowds: 5, smoking: 2, running: 6, calling: 3, weapons: 0 },
    { time: '12:00', total: 39, fights: 8, falls: 4, crowds: 9, smoking: 4, running: 8, calling: 5, weapons: 1 },
    { time: '13:00', total: 33, fights: 6, falls: 3, crowds: 7, smoking: 3, running: 9, calling: 4, weapons: 1 },
    { time: '14:00', total: 45, fights: 9, falls: 5, crowds: 8, smoking: 5, running: 10, calling: 6, weapons: 2 },
    { time: '15:00', total: 35, fights: 7, falls: 4, crowds: 6, smoking: 4, running: 8, calling: 5, weapons: 1 },
    { time: '16:00', total: 28, fights: 5, falls: 3, crowds: 5, smoking: 3, running: 7, calling: 4, weapons: 1 },
    { time: '17:00', total: 21, fights: 4, falls: 2, crowds: 4, smoking: 2, running: 6, calling: 3, weapons: 0 },
    { time: '18:00', total: 16, fights: 3, falls: 1, crowds: 3, smoking: 2, running: 5, calling: 2, weapons: 0 }
  ];

  // Behavior distribution data
  const behaviorDistribution = [
    { name: 'Fight Detection', value: 32.5, percentage: '32.5%', color: '#D32F2F', gradientId: 'fights' },
    { name: 'Falls', value: 24.8, percentage: '24.8%', color: '#B71C1C', gradientId: 'falls' },
    { name: 'Crowd Movement', value: 16.3, percentage: '16.3%', color: '#F44336', gradientId: 'crowds' },
    { name: 'Smoking', value: 12.1, percentage: '12.1%', color: '#E53935', gradientId: 'smoking' },
    { name: 'Running', value: 8.7, percentage: '8.7%', color: '#EF5350', gradientId: 'running' },
    { name: 'Calling', value: 3.9, percentage: '3.9%', color: '#F48FB1', gradientId: 'calling' },
    { name: 'Weapon Detection', value: 1.7, percentage: '1.7%', color: '#FFCDD2', gradientId: 'weapons' }
  ];

  // Detections per site - expanded
  const sitesData = [
    { name: 'Site A', zone: 'Main Building', violations: 156, total: 'total detections' },
    { name: 'Site B', zone: 'Warehouse Complex', violations: 134, total: 'total detections' },
    { name: 'Site C', zone: 'Production Floor', violations: 98, total: 'total detections' },
    { name: 'Site D', zone: 'Office Building', violations: 72, total: 'total detections' },
    { name: 'Site E', zone: 'Storage Facility', violations: 89, total: 'total detections' },
    { name: 'Site F', zone: 'Maintenance Area', violations: 45, total: 'total detections' },
    { name: 'Site G', zone: 'Cafeteria', violations: 67, total: 'total detections' },
    { name: 'Site H', zone: 'Break Rooms', violations: 54, total: 'total detections' },
    { name: 'Site I', zone: 'Security Gate', violations: 38, total: 'total detections' },
    { name: 'Site J', zone: 'Parking Areas', violations: 29, total: 'total detections' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">

      {/* Key Metrics */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        {behaviorMetrics.map((metric, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
            {/* Red left accent border */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D32F2F]"></div>
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
                  </div>
                </div>
                <div className="w-8 h-8 bg-[#D32F2F]/10 rounded-lg flex items-center justify-center">
                  <metric.icon className="w-4 h-4 text-[#D32F2F]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Behavior Module Performance */}
        <Card className="col-span-7 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold">Behavior Module Performance</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-[#D32F2F] border-[#D32F2F] text-white hover:bg-[#B71C1C] h-8 px-4 text-xs"
                >
                  Weekly
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 h-8 px-4 text-xs"
                >
                  Monthly
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
                        name="Current Week"
                        dataKey="currentWeek"
                        stroke="#D32F2F"
                        fill="#D32F2F"
                        fillOpacity={0.2}
                        strokeWidth={3}
                        dot={{ fill: '#D32F2F', strokeWidth: 3, r: 6 }}
                      />
                      <Radar
                        name="Previous Week"
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
                    <div className="w-3 h-3 bg-[#D32F2F] rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Current Week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Previous Week</span>
                  </div>
                </div>
                
                {/* Behavior Score Display */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">87.2%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Behavior Score</div>
                </div>
              </div>
              
              {/* Behavior Recommendations */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Behavior Recommendations</h3>
                <div className="space-y-3 h-80 overflow-y-auto scrollbar-hide">
                  {behaviorRecommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                      <div className="w-8 h-8 bg-[#D32F2F] rounded-lg flex items-center justify-center flex-shrink-0">
                        <recommendation.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {recommendation.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {recommendation.description}
                        </p>
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
                <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold">Live Detections</CardTitle>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-red-400">LIVE</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[450px] overflow-y-scroll scrollbar-hide space-y-3 pr-2">
              {liveDetections.map((detection) => (
                <div key={detection.id} className="relative flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <img 
                    src={detection.thumbnail} 
                    alt={detection.type}
                    className="w-28 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">{detection.type}</h4>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {detection.area} • {detection.location}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {detection.time} • {detection.camera}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {/* Status - Outlined style for informational purpose */}
                    <div className={`border-2 text-xs px-2 py-1 rounded-md font-medium bg-transparent ${
                      detection.statusColor === 'bg-green-500' ? 'border-green-500 text-green-600 dark:border-green-400 dark:text-green-400' :
                      detection.statusColor === 'bg-yellow-500' ? 'border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400' :
                      detection.statusColor === 'bg-blue-500' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' :
                      detection.statusColor === 'bg-gray-500' ? 'border-gray-500 text-gray-600 dark:border-gray-400 dark:text-gray-300' :
                      'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400'
                    }`}>
                      {detection.status}
                    </div>
                    
                    {/* Severity - Filled style for visual impact */}
                    <div className={`text-xs px-2 py-1 rounded-md font-medium text-white ${
                      detection.severityColor === 'bg-red-500' ? 'bg-red-500' :
                      detection.severityColor === 'bg-orange-500' ? 'bg-orange-500' :
                      detection.severityColor === 'bg-yellow-400' ? 'bg-yellow-400 text-yellow-900' :
                      detection.severityColor === 'bg-blue-500' ? 'bg-blue-500' :
                      'bg-gray-500'
                    }`}>
                      {detection.severity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* Detection Frequency - Enhanced Beautiful Version */}
        <Card className="col-span-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold flex items-center gap-2">
                  📊 Detection Frequency
                </CardTitle>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hourly violation patterns</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] border-[#D32F2F] text-white text-xs hover:from-[#B71C1C] hover:to-[#8E0000] shadow-lg"
                >
                  Today
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 bg-transparent text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                  Week
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 bg-transparent text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                  Month
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 bg-transparent text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                  Year
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={detectionFrequencyData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D32F2F" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#B71C1C" stopOpacity={0.6} />
                    </linearGradient>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#B71C1C" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="1 3" 
                    stroke="#e5e7eb" className="dark:stroke-gray-600" 
                    strokeOpacity={0.3}
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="type" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ 
                      fill: '#6b7280', 
                      fontSize: 10,
                      fontWeight: 500
                    }}
                    className="dark:fill-gray-300"
                    angle={-35}
                    textAnchor="end"
                    height={60}
                    interval={0}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ 
                      fill: '#9ca3af', 
                      fontSize: 11 
                    }}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px', 
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      fontSize: '12px',
                      fontWeight: 500
                    }}
                    cursor={{ fill: 'rgba(211, 47, 47, 0.1)' }}
                  />
                  <Bar 
                    dataKey="violations" 
                    fill="url(#barGradient)" 
                    radius={[4, 4, 0, 0]}
                    filter="url(#shadow)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Frequency Summary */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Total Detections</span>
                <span className="font-semibold text-[#D32F2F]">242</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Behavior Violation Trends */}
        <Card className="col-span-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold">Behavior Violation Trends</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] border-[#D32F2F] text-white text-xs hover:from-[#B71C1C] hover:to-[#8E0000] shadow-lg"
                >
                  Today
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 bg-transparent text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                  Week
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 bg-transparent text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                  Month
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 bg-transparent text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                  Year
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={behaviorTrendsData}>
                  <CartesianGrid strokeDasharray="1 1" stroke="#e5e7eb" className="dark:stroke-gray-600" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 11 }}
                    className="dark:fill-gray-300"
                  />
                  <YAxis 
                    domain={[0, 12]}
                    ticks={[0, 2, 4, 6, 8, 10, 12]}
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
                  <Line type="monotone" dataKey="fights" stroke="#D32F2F" strokeWidth={2} dot={{ fill: '#D32F2F', r: 3 }} />
                  <Line type="monotone" dataKey="falls" stroke="#B71C1C" strokeWidth={2} dot={{ fill: '#B71C1C', r: 3 }} />
                  <Line type="monotone" dataKey="crowds" stroke="#F44336" strokeWidth={2} dot={{ fill: '#F44336', r: 3 }} />
                  <Line type="monotone" dataKey="smoking" stroke="#E53935" strokeWidth={2} dot={{ fill: '#E53935', r: 3 }} />
                  <Line type="monotone" dataKey="running" stroke="#EF5350" strokeWidth={2} dot={{ fill: '#EF5350', r: 3 }} />
                  <Line type="monotone" dataKey="calling" stroke="#F48FB1" strokeWidth={2} dot={{ fill: '#F48FB1', r: 3 }} />
                  <Line type="monotone" dataKey="weapons" stroke="#FFCDD2" strokeWidth={2} dot={{ fill: '#FFCDD2', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#D32F2F] rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Fights</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#B71C1C] rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Falls</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#F44336] rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Crowds</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#E53935] rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Smoking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#EF5350] rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Running</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#F48FB1] rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Calling</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FFCDD2] rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Weapons</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Violation Distribution - Enhanced Beautiful Version */}
        <Card className="col-span-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold flex items-center gap-2">
                  🥧 Violation Distribution
                </CardTitle>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Behavior violation breakdown</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] border-[#D32F2F] text-white text-xs hover:from-[#B71C1C] hover:to-[#8E0000] shadow-lg"
                >
                  Today
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 bg-transparent text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                  Week
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 bg-transparent text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                  Month
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 bg-transparent text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                  Year
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <linearGradient id="fights" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#D32F2F" stopOpacity={1} />
                      <stop offset="100%" stopColor="#B71C1C" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="falls" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#B71C1C" stopOpacity={1} />
                      <stop offset="100%" stopColor="#8E0000" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="crowds" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#F44336" stopOpacity={1} />
                      <stop offset="100%" stopColor="#D32F2F" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="smoking" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#E53935" stopOpacity={1} />
                      <stop offset="100%" stopColor="#C62828" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="running" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#EF5350" stopOpacity={1} />
                      <stop offset="100%" stopColor="#E53935" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="calling" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#F48FB1" stopOpacity={1} />
                      <stop offset="100%" stopColor="#F06292" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="weapons" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFCDD2" stopOpacity={1} />
                      <stop offset="100%" stopColor="#FFAB91" stopOpacity={0.8} />
                    </linearGradient>
                    <filter id="pieShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.1"/>
                    </filter>
                  </defs>
                  <Pie
                    data={behaviorDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={105}
                    innerRadius={30}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                    paddingAngle={2}
                    filter="url(#pieShadow)"
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
                    {behaviorDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#${entry.gradientId})`} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px'
                    }}
                    formatter={(value, name) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Distribution Summary */}
            <div className="mt-4 space-y-2">
              {behaviorDistribution.slice(0, 4).map((item, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{item.percentage}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Total Tracked</span>
                  <span className="font-semibold text-[#D32F2F]">2,847</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Camera Performance */}
        <Card className="col-span-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-base">Camera Performance</CardTitle>
              <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400 h-6 p-0">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-scroll scrollbar-hide space-y-3 pr-2">
              {camerasData.map((camera, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => {
                    setSelectedCamera(camera);
                    setIsCameraModalOpen(true);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#D32F2F]/20 rounded-lg">
                      <Camera className="w-4 h-4 text-[#D32F2F]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{camera.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{camera.zone}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#D32F2F]">{camera.violations}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">violations</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Site Detection Summary */}
        <Card className="col-span-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-base">Site Detection Summary</CardTitle>
              <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400 h-6 p-0">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-scroll scrollbar-hide space-y-3 pr-2">
              {sitesData.map((site, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#D32F2F]/20 rounded-lg">
                      <MapPin className="w-4 h-4 text-[#D32F2F]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{site.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{site.zone}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#D32F2F]">{site.violations}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{site.total}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detection Summary */}
        <Card className="col-span-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100 text-base">Detection Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-scroll scrollbar-hide space-y-3 pr-2">
              {behaviorDetectionSummary.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#D32F2F]/10 dark:bg-[#D32F2F]/20">
                      <item.icon className="w-4 h-4 text-[#D32F2F]" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item.type}</span>
                  </div>
                  <span className="text-2xl font-bold text-[#D32F2F]">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Camera Performance Modal */}
      <CameraPerformanceModal
        camera={selectedCamera}
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        colorScheme="red"
      />
    </div>
  );
}