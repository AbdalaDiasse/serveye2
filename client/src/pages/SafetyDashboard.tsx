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
  Shield,
  HardHat,
  Shirt,
  User,
  Users,
  Flame,
  Droplets,
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

// Import safety detection images
import detectionImage1 from '@assets/stock_images/construction_worker__9d5e7150.jpg';
import detectionImage2 from '@assets/stock_images/construction_worker__7080098c.jpg';
import detectionImage3 from '@assets/stock_images/construction_worker__42be1684.jpg';
import detectionImage4 from '@assets/stock_images/construction_worker__b0637b73.jpg';

export default function SafetyDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');


  // Key safety metrics - exact values from design
  const safetyMetrics = [
    { label: 'No Helmet', value: 89, icon: HardHat, change: '+12%', period: 'today' },
    { label: 'No Vest', value: 67, icon: Shirt, change: '+8%', period: 'today' },
    { label: 'No Harness', value: 34, icon: Shield, change: '+4%', period: 'today' },
    { label: 'No Uniform', value: 23, icon: Users, change: '+3%', period: 'today' },
    { label: 'Smoke', value: 19, icon: Flame, change: '+15%', period: 'today' },
    { label: 'Fire', value: 12, icon: Flame, change: '+25%', period: 'today' },
    { label: 'Leakage', value: 8, icon: Droplets, change: '+1%', period: 'today' }
  ];

  // Radar chart data for Safety Module Performance
  // Radar data for safety module performance - matching screenshot
  const radarData = [
    { subject: 'PPE Compliance', currentWeek: 85, previousWeek: 78, fullMark: 100 },
    { subject: 'PPE Violations', currentWeek: 60, previousWeek: 65, fullMark: 100 },
    { subject: 'Fire/Leak Detection', currentWeek: 92, previousWeek: 88, fullMark: 100 },
    { subject: 'False Positive Rate', currentWeek: 35, previousWeek: 42, fullMark: 100 },
    { subject: 'Zone Breaches', currentWeek: 25, previousWeek: 30, fullMark: 100 },
    { subject: 'Detection Coverage', currentWeek: 78, previousWeek: 75, fullMark: 100 },
    { subject: 'Response Time', currentWeek: 82, previousWeek: 85, fullMark: 100 },
    { subject: 'Critical Alert Ratio', currentWeek: 68, previousWeek: 65, fullMark: 100 }
  ];

  // Safety recommendations data
  const safetyRecommendations = [
    {
      title: 'Increase PPE Training',
      description: 'Focus on helmet compliance',
      icon: HardHat
    },
    {
      title: 'Add More Cameras',
      description: 'Improve zone coverage',
      icon: Camera
    },
    {
      title: 'Reduce Response Time',
      description: 'Optimize alert system',
      icon: AlertTriangle
    },
    {
      title: 'Safety Protocols',
      description: 'Update safety procedures',
      icon: Shield
    },
    {
      title: 'Alert Threshold',
      description: 'Fine-tune alert sensitivity',
      icon: Settings
    },
    {
      title: 'Emergency Procedures',
      description: 'Review evacuation plans',
      icon: AlertTriangle
    },
    {
      title: 'Equipment Maintenance',
      description: 'Schedule regular inspections',
      icon: Settings
    },
    {
      title: 'Staff Communication',
      description: 'Improve safety notifications',
      icon: Bell
    },
    {
      title: 'Zone Monitoring',
      description: 'Enhance restricted area access',
      icon: MapPin
    },
    {
      title: 'Incident Reporting',
      description: 'Streamline violation reports',
      icon: Shield
    }
  ];

  // Live detections - expanded for scrolling
  const liveDetections = [
    {
      id: 1,
      type: 'No Helmet Detected',
      location: 'Construction Zone',
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
      type: 'No Vest Detected',
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
      type: 'Smoke Detected',
      location: 'Factory Floor',
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
      type: 'No Harness Detected',
      location: 'High Work Zone',
      area: 'Site A',
      time: '12 mins ago',
      camera: 'CAM-03',
      status: 'Resolved',
      statusColor: 'bg-gray-500',
      severity: 'High',
      severityColor: 'bg-orange-500',
      thumbnail: detectionImage4
    },
    {
      id: 5,
      type: 'No Uniform Detected',
      location: 'Maintenance Bay',
      area: 'Site B',
      time: '15 mins ago',
      camera: 'CAM-08',
      status: 'New',
      statusColor: 'bg-green-500',
      severity: 'Medium',
      severityColor: 'bg-blue-500',
      thumbnail: detectionImage1
    },
    {
      id: 6,
      type: 'Fire Detected',
      location: 'Chemical Storage',
      area: 'Site C',
      time: '18 mins ago',
      camera: 'CAM-12',
      status: 'Critical',
      statusColor: 'bg-red-500',
      severity: 'Critical',
      severityColor: 'bg-red-600',
      thumbnail: detectionImage2
    },
    {
      id: 7,
      type: 'Unauthorized Access',
      location: 'Restricted Zone',
      area: 'Site A',
      time: '22 mins ago',
      camera: 'CAM-01',
      status: 'In Review',
      statusColor: 'bg-yellow-500',
      severity: 'High',
      severityColor: 'bg-orange-500',
      thumbnail: detectionImage3
    },
    {
      id: 8,
      type: 'Equipment Malfunction',
      location: 'Production Line',
      area: 'Site B',
      time: '25 mins ago',
      camera: 'CAM-06',
      status: 'Confirmed',
      statusColor: 'bg-blue-500',
      severity: 'Medium',
      severityColor: 'bg-blue-500',
      thumbnail: detectionImage4
    }
  ];

  // Detection frequency data - By violation type
  const detectionFrequencyData = [
    { type: 'No Helmet', violations: 95, color: '#1e40af' },
    { type: 'No Vest', violations: 68, color: '#2563eb' },
    { type: 'No Harness', violations: 35, color: '#3b82f6' },
    { type: 'No Uniform', violations: 24, color: '#60a5fa' },
    { type: 'Smoke', violations: 20, color: '#93c5fd' },
    { type: 'Fire', violations: 12, color: '#bfdbfe' },
    { type: 'Leakage', violations: 8, color: '#dbeafe' }
  ];

  // Safety violation trends data for line chart - matching screenshot scale (0-20)
  const violationTrendsData = [
    { time: '08:00', helmet: 4, vest: 2, harness: 1, uniform: 1, smoke: 1, fire: 0, leakage: 1 },
    { time: '09:00', helmet: 5, vest: 2, harness: 2, uniform: 1, smoke: 1, fire: 0, leakage: 1 },
    { time: '10:00', helmet: 8, vest: 3, harness: 3, uniform: 2, smoke: 2, fire: 1, leakage: 2 },
    { time: '11:00', helmet: 10, vest: 4, harness: 4, uniform: 2, smoke: 2, fire: 1, leakage: 2 },
    { time: '12:00', helmet: 15, vest: 5, harness: 5, uniform: 3, smoke: 3, fire: 1, leakage: 3 },
    { time: '13:00', helmet: 12, vest: 8, harness: 5, uniform: 3, smoke: 3, fire: 2, leakage: 3 },
    { time: '14:00', helmet: 17, vest: 9, harness: 6, uniform: 4, smoke: 3, fire: 2, leakage: 4 },
    { time: '15:00', helmet: 18, vest: 13, harness: 7, uniform: 4, smoke: 3, fire: 2, leakage: 4 },
    { time: '16:00', helmet: 15, vest: 14, harness: 8, uniform: 2, smoke: 2, fire: 1, leakage: 3 },
    { time: '17:00', helmet: 12, vest: 17, harness: 7, uniform: 3, smoke: 3, fire: 2, leakage: 2 },
    { time: '18:00', helmet: 9, vest: 18, harness: 6, uniform: 3, smoke: 3, fire: 2, leakage: 2 }
  ];

  // Violation distribution - Enhanced with beautiful gradients
  const violationDistribution = [
    { name: 'No Helmet', value: 35.3, percentage: '35.3%', color: '#1e40af', gradientId: 'helmet' },
    { name: 'No Vest', value: 26.6, percentage: '26.6%', color: '#2563eb', gradientId: 'vest' },
    { name: 'No Harness', value: 12.5, percentage: '12.5%', color: '#3b82f6', gradientId: 'harness' },
    { name: 'No Uniform', value: 9.1, percentage: '9.1%', color: '#60a5fa', gradientId: 'uniform' },
    { name: 'Smoke', value: 7.5, percentage: '7.5%', color: '#93c5fd', gradientId: 'smoke' },
    { name: 'Fire', value: 4.8, percentage: '4.8%', color: '#bfdbfe', gradientId: 'fire' },
    { name: 'Leakage', value: 3.2, percentage: '3.2%', color: '#dbeafe', gradientId: 'leakage' }
  ];

  // Detection summary - expanded
  const detectionSummary = [
    { type: 'Critical Violations', count: 108, icon: AlertTriangle },
    { type: 'High Priority', count: 101, icon: User },
    { type: 'Medium Priority', count: 31, icon: Shield },
    { type: 'Low Priority', count: 45, icon: Users },
    { type: 'Pending Review', count: 67, icon: RefreshCw },
    { type: 'Resolved Today', count: 234, icon: CircleCheck },
    { type: 'Equipment Issues', count: 18, icon: Settings },
    { type: 'Training Required', count: 92, icon: HardHat }
  ];

  // Detections per camera - expanded
  const camerasData = [
    { name: 'CAM-05', zone: 'Construction Zone A', violations: 45 },
    { name: 'CAM-02', zone: 'Warehouse', violations: 38 },
    { name: 'CAM-03', zone: 'High Work Zone A', violations: 29 },
    { name: 'CAM-07', zone: 'Factory Floor C', violations: 24 },
    { name: 'CAM-01', zone: 'Main Entrance', violations: 19 },
    { name: 'CAM-04', zone: 'Loading Dock', violations: 33 },
    { name: 'CAM-06', zone: 'Production Line B', violations: 41 },
    { name: 'CAM-08', zone: 'Maintenance Bay', violations: 15 },
    { name: 'CAM-09', zone: 'Chemical Storage', violations: 27 },
    { name: 'CAM-10', zone: 'Office Area', violations: 8 },
    { name: 'CAM-11', zone: 'Parking Lot', violations: 12 },
    { name: 'CAM-12', zone: 'Emergency Exit', violations: 22 }
  ];

  // Detections per site - expanded
  const sitesData = [
    { name: 'Site A', zone: 'Construction Zone', violations: 123, total: 'total violations' },
    { name: 'Site B', zone: 'Warehouse Complex', violations: 87, total: 'total violations' },
    { name: 'Site C', zone: 'Factory Floor', violations: 64, total: 'total violations' },
    { name: 'Site D', zone: 'Manufacturing Plant', violations: 48, total: 'total violations' },
    { name: 'Site E', zone: 'Chemical Processing', violations: 76, total: 'total violations' },
    { name: 'Site F', zone: 'Storage Facility', violations: 35, total: 'total violations' },
    { name: 'Site G', zone: 'Quality Control', violations: 29, total: 'total violations' },
    { name: 'Site H', zone: 'Shipping Department', violations: 42, total: 'total violations' },
    { name: 'Site I', zone: 'Research Lab', violations: 18, total: 'total violations' },
    { name: 'Site J', zone: 'Maintenance Shop', violations: 53, total: 'total violations' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">

      {/* Key Metrics */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        {safetyMetrics.map((metric, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
            {/* Blue left accent border */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
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
                  <metric.icon className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Safety Module Performance */}
        <Card className="col-span-7 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-base font-medium">Safety Module Performance</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-blue-600 border-blue-600 text-white hover:bg-blue-700 h-8 px-4 text-xs"
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
              <div className="flex flex-col">
                <div className="radar-card h-80 mb-4">
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
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.2}
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 3, r: 6 }}
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
                <div className="flex items-center gap-6 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300">Current Week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300">Previous Week</span>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-600 dark:text-gray-300">
                  <div className="mb-2">
                    <span className="font-medium">Critical Alert Ratio</span>
                  </div>
                  <div className="text-xs">
                    <span>• Current Week: <span className="font-medium">68%</span></span><br/>
                    <span>• Previous Week: <span className="font-medium">65%</span></span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">Safety Recommendations</h3>
                <div className="h-96 overflow-y-scroll scrollbar-hide space-y-3 pr-2">
                  {safetyRecommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
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
                <CardTitle className="text-gray-900 dark:text-gray-100">Live Detections</CardTitle>
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
                      detection.statusColor === 'bg-red-500' ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' :
                      'border-gray-500 text-gray-600 dark:border-gray-400 dark:text-gray-300'
                    }`}>
                      {detection.status}
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Severity - Solid filled badge for urgency/danger */}
                      <div className={`${detection.severityColor} text-white text-xs px-3 py-1 rounded-lg font-bold uppercase tracking-wide shadow-sm`}>
                        {detection.severity}
                      </div>
                      {/* Process - Button style for action */}
                      <Button size="sm" className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md border border-blue-700 shadow-sm transition-all duration-200 hover:shadow-md">
                        <Settings className="w-3 h-3 mr-1" />
                        Process
                      </Button>
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
                  className="h-8 bg-gradient-to-r from-blue-600 to-blue-700 border-blue-600 text-white text-xs hover:from-blue-700 hover:to-blue-800 shadow-lg"
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
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={detectionFrequencyData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#1e40af" stopOpacity={0.6} />
                    </linearGradient>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#1e40af" floodOpacity="0.3"/>
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
                      fill: '#6b7280', 
                      fontSize: 11,
                      fontWeight: 500
                    }}
                    className="dark:fill-gray-300"
                    domain={[0, 'dataMax']}
                    tickFormatter={(value) => `${value}`}
                  />
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
                    labelStyle={{ color: '#6b7280', fontWeight: 600 }}
                    formatter={(value) => [value + ' violations', 'Count']}
                    labelFormatter={(label) => `Type: ${label}`}
                  />
                  <Bar 
                    dataKey="violations" 
                    fill="url(#barGradient)"
                    radius={[6, 6, 0, 0]} 
                    filter="url(#shadow)"
                    strokeWidth={1}
                    stroke="#2563eb"
                    style={{
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">Violations detected</span>
                </div>
                <div className="text-gray-500 dark:text-gray-400">Most common: No Helmet violations</div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Last updated: 2 mins ago</div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Violation Trends */}
        <Card className="col-span-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-base font-medium">Safety Violation Trends</CardTitle>
              <Select defaultValue="today">
                <SelectTrigger className="w-20 h-8 text-xs bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                  <Area type="monotone" dataKey="helmet" stroke="#3b82f6" fill="#3b82f610" strokeWidth={2} />
                  <Area type="monotone" dataKey="vest" stroke="#ef4444" fill="#ef444410" strokeWidth={2} />
                  <Line type="monotone" dataKey="harness" stroke="#f59e0b" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="uniform" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="smoke" stroke="#10b981" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="fire" stroke="#ec4899" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="leakage" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-x-6 gap-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">No Helmet</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">No Vest</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">No Harness</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">No Uniform</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Smoke</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Fire</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">Leakage</span>
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
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Safety violation breakdown</p>
              </div>
              <button className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <linearGradient id="helmet" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1e40af" stopOpacity={1} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="vest" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={1} />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="harness" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="uniform" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity={1} />
                      <stop offset="100%" stopColor="#bfdbfe" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="smoke" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#93c5fd" stopOpacity={1} />
                      <stop offset="100%" stopColor="#dbeafe" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="fire" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#bfdbfe" stopOpacity={1} />
                      <stop offset="100%" stopColor="#eff6ff" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="leakage" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#dbeafe" stopOpacity={1} />
                      <stop offset="100%" stopColor="#f0f9ff" stopOpacity={0.8} />
                    </linearGradient>
                    <filter id="pieShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#1e40af" floodOpacity="0.15"/>
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
                <div className="text-xs text-gray-500 dark:text-gray-400">Total violations tracked: 548 incidents</div>
              </div>
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
              {detectionSummary.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${index === 0 ? 'bg-blue-600/20' : index === 1 ? 'bg-gray-600/20' : 'bg-gray-700/20'}`}>
                      <item.icon className={`w-4 h-4 ${index === 0 ? 'text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item.type}</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detections per Camera */}
        <Card className="col-span-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-base">Detections per Camera</CardTitle>
              <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400 h-6 p-0">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-scroll scrollbar-hide space-y-3 pr-2">
              {camerasData.map((camera, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600/20 rounded-lg">
                      <Camera className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{camera.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{camera.zone}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-400">{camera.violations}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">violations</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detections per Site */}
        <Card className="col-span-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-base">Detections per Site</CardTitle>
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
                    <div className="p-2 bg-blue-600/20 rounded-lg">
                      <MapPin className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{site.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{site.zone}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-400">{site.violations}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{site.total}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}