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
  Moon
} from 'lucide-react';

// Import behavior detection images
import detectionImage1 from '@assets/stock_images/construction_worker__9d5e7150.jpg';
import detectionImage2 from '@assets/stock_images/construction_worker__7080098c.jpg';
import detectionImage3 from '@assets/stock_images/construction_worker__42be1684.jpg';
import detectionImage4 from '@assets/stock_images/construction_worker__b0637b73.jpg';

export default function BehaviorDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

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

  // Radar chart data for Behavior Module Performance
  const radarData = [
    { subject: 'Fight Detection', currentWeek: 88, previousWeek: 82, fullMark: 100 },
    { subject: 'Fall Detection', currentWeek: 92, previousWeek: 88, fullMark: 100 },
    { subject: 'Crowd Analysis', currentWeek: 76, previousWeek: 72, fullMark: 100 },
    { subject: 'False Positive Rate', currentWeek: 25, previousWeek: 32, fullMark: 100 },
    { subject: 'Smoking Detection', currentWeek: 84, previousWeek: 78, fullMark: 100 },
    { subject: 'Detection Coverage', currentWeek: 89, previousWeek: 85, fullMark: 100 },
    { subject: 'Response Time', currentWeek: 91, previousWeek: 87, fullMark: 100 },
    { subject: 'Critical Alert Ratio', currentWeek: 73, previousWeek: 68, fullMark: 100 }
  ];

  // Behavior recommendations data
  const behaviorRecommendations = [
    {
      title: 'Enhanced Fight Detection',
      description: 'Improve altercation recognition',
      icon: Sword
    },
    {
      title: 'Fall Prevention Alerts',
      description: 'Setup proactive fall detection',
      icon: User
    },
    {
      title: 'Crowd Density Monitoring',
      description: 'Optimize gathering detection',
      icon: Users
    },
    {
      title: 'Smoking Policy Enforcement',
      description: 'Strengthen no-smoking zones',
      icon: Cigarette
    },
    {
      title: 'Running Detection Tuning',
      description: 'Fine-tune movement analysis',
      icon: Zap
    },
    {
      title: 'Communication Monitoring',
      description: 'Phone usage compliance',
      icon: Phone
    },
    {
      title: 'Weapon Detection Training',
      description: 'Enhance security protocols',
      icon: ShieldAlert
    },
    {
      title: 'Gathering Restrictions',
      description: 'Monitor group formations',
      icon: UserCheck
    },
    {
      title: 'Zone Monitoring',
      description: 'Enhance restricted area access',
      icon: MapPin
    },
    {
      title: 'Incident Reporting',
      description: 'Streamline behavior reports',
      icon: AlertTriangle
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

      <div className="grid grid-cols-12 gap-6">
        {/* Live Behavior Detections */}
        <div className="col-span-4">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-[800px] flex flex-col">
            <CardHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Live Behavior Detections
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-[#D32F2F] hover:text-[#B71C1C] hover:bg-[#D32F2F]/10">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
              <div className="h-full overflow-y-auto">
                {liveDetections.map((detection, index) => (
                  <div key={index} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <img 
                        src={detection.thumbnail} 
                        alt={detection.type}
                        className="w-16 h-12 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {detection.type}
                          </h4>
                          <div className="flex gap-1 ml-2">
                            <Badge 
                              variant="outline" 
                              className={`text-xs px-2 py-0.5 border-2 ${
                                detection.severity === 'Critical' ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' :
                                detection.severity === 'High' ? 'border-orange-500 text-orange-600 dark:border-orange-400 dark:text-orange-400' :
                                detection.severity === 'Medium' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' :
                                detection.severity === 'Alert' ? 'border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400' :
                                'border-green-500 text-green-600 dark:border-green-400 dark:text-green-400'
                              }`}
                            >
                              {detection.severity}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <MapPin className="w-3 h-3" />
                            <span>{detection.location} • {detection.area}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <Camera className="w-3 h-3" />
                            <span>{detection.camera}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">{detection.time}</span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs px-2 py-0.5 border ${
                                detection.status === 'New' ? 'border-green-500 text-green-600 dark:border-green-400 dark:text-green-400' :
                                detection.status === 'In Review' ? 'border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400' :
                                detection.status === 'Confirmed' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' :
                                'border-gray-500 text-gray-600 dark:border-gray-400 dark:text-gray-300'
                              }`}
                            >
                              {detection.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Behavior Trends */}
        <div className="col-span-8">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-[400px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Weekly Behavior Trends
                </CardTitle>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="day" 
                    stroke="#6B7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255,255,255,0.95)', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px', 
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="fights" stackId="a" fill="#D32F2F" name="Fights" />
                  <Bar dataKey="falls" stackId="a" fill="#E53E3E" name="Falls" />
                  <Bar dataKey="smoking" stackId="a" fill="#F56565" name="Smoking" />
                  <Bar dataKey="crowds" stackId="a" fill="#FC8181" name="Crowds" />
                  <Bar dataKey="running" stackId="a" fill="#FEB2B2" name="Running" />
                  <Bar dataKey="calls" stackId="a" fill="#FED7D7" name="Calls" />
                  <Bar dataKey="weapons" stackId="a" fill="#1A365D" name="Weapons" />
                  <Bar dataKey="gathering" stackId="a" fill="#2D3748" name="Gathering" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Hourly Distribution */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-[380px] mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Hourly Behavior Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={hourlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D32F2F" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D32F2F" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="hour" 
                    stroke="#6B7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255,255,255,0.95)', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px', 
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="detections" 
                    stroke="#D32F2F" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorDetections)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Behavior Module Performance Radar */}
        <div className="col-span-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-[500px]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Behavior Module Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fontSize: 11, fill: '#6B7280' }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fontSize: 10, fill: '#6B7280' }}
                  />
                  <Radar
                    name="Current Week"
                    dataKey="currentWeek"
                    stroke="#D32F2F"
                    fill="#D32F2F"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Previous Week"
                    dataKey="previousWeek"
                    stroke="#6B7280"
                    fill="#6B7280"
                    fillOpacity={0.05}
                    strokeWidth={1.5}
                    strokeDasharray="5 5"
                  />
                  <Legend 
                    wrapperStyle={{ 
                      fontSize: '12px',
                      paddingTop: '20px'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Behavior Recommendations */}
        <div className="col-span-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-[500px]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Behavior Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto h-[400px]">
              <div className="space-y-3">
                {behaviorRecommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-[#D32F2F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <recommendation.icon className="w-4 h-4 text-[#D32F2F]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                        {recommendation.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {recommendation.description}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[#D32F2F] hover:text-[#B71C1C] hover:bg-[#D32F2F]/10">
                      <CircleCheck className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Camera Performance */}
        <div className="col-span-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-[500px]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Camera Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto h-[400px]">
              <div className="space-y-3">
                {camerasData.map((camera, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#D32F2F]/10 rounded-lg flex items-center justify-center">
                        <Camera className="w-4 h-4 text-[#D32F2F]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {camera.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {camera.zone}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {camera.violations}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        detections
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Site Detection Summary */}
        <div className="col-span-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-[500px]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Site Detection Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto h-[400px]">
              <div className="space-y-3">
                {sitesData.map((site, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#D32F2F]/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-[#D32F2F]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {site.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {site.zone}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {site.violations}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {site.total}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}