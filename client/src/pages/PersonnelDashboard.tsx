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
  User,
  Users,
  UserCheck,
  UserX,
  DoorOpen,
  Eye,
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
  Crown,
  Shield,
  Activity
} from 'lucide-react';
import { CameraPerformanceModal } from '@/components/CameraPerformanceModal';

// Import personnel detection images
import businessmanPhoto from '@assets/generated_images/Security_capture_businessman_photo_2feb92d4.png';
import womanPhoto from '@assets/generated_images/Security_capture_woman_photo_e17e3828.png';
import casualManPhoto from '@assets/generated_images/Security_capture_casual_man_eb27432b.png';
import elderlyWomanPhoto from '@assets/generated_images/Security_capture_elderly_woman_37bac27b.png';
import youngManPhoto from '@assets/generated_images/Security_capture_young_man_e6e7c093.png';

export default function PersonnelDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedCamera, setSelectedCamera] = useState<any>(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  // Key personnel metrics - personnel-focused
  const personnelMetrics = [
    { label: 'Employees', value: 342, icon: User, change: '+8%', period: 'today' },
    { label: 'Visitors', value: 89, icon: UserCheck, change: '+15%', period: 'today' },
    { label: 'VIP Detected', value: 12, icon: Crown, change: '+3%', period: 'today' },
    { label: 'Unauthorized', value: 7, icon: UserX, change: '-2%', period: 'today' },
    { label: 'Entry/Exit', value: 156, icon: DoorOpen, change: '+12%', period: 'today' },
    { label: 'Recognition', value: 298, icon: Eye, change: '+18%', period: 'today' },
    { label: 'Alerts', value: 19, icon: AlertTriangle, change: '+5%', period: 'today' }
  ];

  // Radar chart data for Personnel Module Performance
  const radarData = [
    { subject: 'Face Recognition', currentWeek: 92, previousWeek: 89, fullMark: 100 },
    { subject: 'Identity Verification', currentWeek: 88, previousWeek: 85, fullMark: 100 },
    { subject: 'Access Control', currentWeek: 85, previousWeek: 82, fullMark: 100 },
    { subject: 'Visitor Management', currentWeek: 78, previousWeek: 75, fullMark: 100 },
    { subject: 'Unauthorized Detection', currentWeek: 95, previousWeek: 90, fullMark: 100 },
    { subject: 'Entry/Exit Tracking', currentWeek: 82, previousWeek: 80, fullMark: 100 },
    { subject: 'VIP Recognition', currentWeek: 90, previousWeek: 87, fullMark: 100 },
    { subject: 'Response Time', currentWeek: 85, previousWeek: 83, fullMark: 100 }
  ];

  // Personnel recommendations data
  const personnelRecommendations = [
    {
      title: 'Improve Face Recognition',
      description: 'Enhance lighting in dark areas',
      icon: Eye
    },
    {
      title: 'Update Access List',
      description: 'Refresh employee database',
      icon: User
    },
    {
      title: 'Visitor Management',
      description: 'Streamline check-in process',
      icon: UserCheck
    },
    {
      title: 'Security Training',
      description: 'Update recognition protocols',
      icon: Shield
    },
    {
      title: 'Camera Coverage',
      description: 'Add cameras to blind spots',
      icon: Camera
    },
    {
      title: 'VIP Protection',
      description: 'Review VIP access routes',
      icon: Crown
    },
    {
      title: 'Access Control',
      description: 'Upgrade entry systems',
      icon: DoorOpen
    },
    {
      title: 'Alert System',
      description: 'Fine-tune alert thresholds',
      icon: Bell
    },
    {
      title: 'Zone Monitoring',
      description: 'Enhance restricted area tracking',
      icon: MapPin
    },
    {
      title: 'Incident Response',
      description: 'Improve security response time',
      icon: RefreshCw
    }
  ];

  // Live detections - personnel focused
  const liveDetections = [
    {
      id: 1,
      type: 'Unauthorized Access',
      location: 'Restricted Zone',
      area: 'Building A',
      time: '2 mins ago',
      camera: 'CAM-05',
      status: 'New',
      statusColor: 'bg-green-500',
      severity: 'Critical',
      severityColor: 'bg-red-500',
      thumbnail: casualManPhoto
    },
    {
      id: 2,
      type: 'VIP Detected',
      location: 'Main Entrance',
      area: 'Lobby',
      time: '5 mins ago',
      camera: 'CAM-02',
      status: 'Confirmed',
      statusColor: 'bg-blue-500',
      severity: 'High',
      severityColor: 'bg-orange-500',
      thumbnail: businessmanPhoto
    },
    {
      id: 3,
      type: 'Unknown Person',
      location: 'Employee Area',
      area: 'Floor 3',
      time: '8 mins ago',
      camera: 'CAM-07',
      status: 'In Review',
      statusColor: 'bg-yellow-500',
      severity: 'Alert',
      severityColor: 'bg-yellow-400',
      thumbnail: womanPhoto
    },
    {
      id: 4,
      type: 'Employee Entry',
      location: 'Main Gate',
      area: 'Security Check',
      time: '12 mins ago',
      camera: 'CAM-03',
      status: 'Verified',
      statusColor: 'bg-gray-500',
      severity: 'Medium',
      severityColor: 'bg-blue-500',
      thumbnail: youngManPhoto
    },
    {
      id: 5,
      type: 'Visitor Check-in',
      location: 'Reception',
      area: 'Main Lobby',
      time: '15 mins ago',
      camera: 'CAM-08',
      status: 'New',
      statusColor: 'bg-green-500',
      severity: 'Low',
      severityColor: 'bg-gray-400',
      thumbnail: elderlyWomanPhoto
    },
    {
      id: 6,
      type: 'Multiple Persons',
      location: 'Conference Room',
      area: 'Meeting Area',
      time: '18 mins ago',
      camera: 'CAM-12',
      status: 'Monitoring',
      statusColor: 'bg-blue-500',
      severity: 'Medium',
      severityColor: 'bg-blue-500',
      thumbnail: businessmanPhoto
    },
    {
      id: 7,
      type: 'Tailgating Detected',
      location: 'Secure Door',
      area: 'IT Department',
      time: '22 mins ago',
      camera: 'CAM-01',
      status: 'Alert',
      statusColor: 'bg-red-500',
      severity: 'High',
      severityColor: 'bg-orange-500',
      thumbnail: casualManPhoto
    },
    {
      id: 8,
      type: 'Late Entry',
      location: 'Employee Entrance',
      area: 'Side Gate',
      time: '25 mins ago',
      camera: 'CAM-06',
      status: 'Logged',
      statusColor: 'bg-gray-500',
      severity: 'Low',
      severityColor: 'bg-gray-400',
      thumbnail: womanPhoto
    }
  ];

  // Detection frequency data - By detection type
  const detectionFrequencyData = [
    { type: 'Employees', violations: 342, color: '#3fb5b5' },
    { type: 'Visitors', violations: 89, color: '#5eced1' },
    { type: 'VIP', violations: 12, color: '#7dd3d8' },
    { type: 'Unauthorized', violations: 7, color: '#9ecccf' },
    { type: 'Unknown', violations: 23, color: '#b8d4da' },
    { type: 'Alerts', violations: 19, color: '#d1e7ea' },
    { type: 'Incidents', violations: 5, color: '#eaf4f4' }
  ];

  // Personnel detection trends data for line chart
  const detectionTrendsData = [
    { time: '08:00', employees: 45, visitors: 5, vip: 1, unauthorized: 0, unknown: 2, alerts: 1, incidents: 0 },
    { time: '09:00', employees: 89, visitors: 8, vip: 2, unauthorized: 1, unknown: 3, alerts: 2, incidents: 0 },
    { time: '10:00', employees: 142, visitors: 12, vip: 2, unauthorized: 1, unknown: 4, alerts: 2, incidents: 1 },
    { time: '11:00', employees: 198, visitors: 18, vip: 3, unauthorized: 2, unknown: 5, alerts: 3, incidents: 1 },
    { time: '12:00', employees: 234, visitors: 25, vip: 4, unauthorized: 2, unknown: 8, alerts: 4, incidents: 1 },
    { time: '13:00', employees: 189, visitors: 32, vip: 3, unauthorized: 3, unknown: 12, alerts: 5, incidents: 2 },
    { time: '14:00', employees: 267, visitors: 28, vip: 5, unauthorized: 2, unknown: 15, alerts: 4, incidents: 1 },
    { time: '15:00', employees: 312, visitors: 35, vip: 6, unauthorized: 4, unknown: 18, alerts: 6, incidents: 2 },
    { time: '16:00', employees: 289, visitors: 42, vip: 4, unauthorized: 3, unknown: 20, alerts: 7, incidents: 1 },
    { time: '17:00', employees: 245, visitors: 38, vip: 3, unauthorized: 5, unknown: 22, alerts: 8, incidents: 3 },
    { time: '18:00', employees: 178, visitors: 31, vip: 2, unauthorized: 2, unknown: 19, alerts: 5, incidents: 1 }
  ];

  // Detection distribution - Enhanced with beautiful gradients
  const detectionDistribution = [
    { name: 'Employees', value: 68.5, percentage: '68.5%', color: '#3fb5b5', gradientId: 'employees' },
    { name: 'Visitors', value: 17.8, percentage: '17.8%', color: '#5eced1', gradientId: 'visitors' },
    { name: 'Unknown', value: 4.6, percentage: '4.6%', color: '#7dd3d8', gradientId: 'unknown' },
    { name: 'Alerts', value: 3.8, percentage: '3.8%', color: '#9ecccf', gradientId: 'alerts' },
    { name: 'VIP', value: 2.4, percentage: '2.4%', color: '#b8d4da', gradientId: 'vip' },
    { name: 'Unauthorized', value: 1.4, percentage: '1.4%', color: '#d1e7ea', gradientId: 'unauthorized' },
    { name: 'Incidents', value: 1.0, percentage: '1.0%', color: '#eaf4f4', gradientId: 'incidents' }
  ];

  // Detection summary - expanded
  const detectionSummary = [
    { type: 'Total Personnel', count: 499, icon: Users },
    { type: 'Active Employees', count: 342, icon: User },
    { type: 'Current Visitors', count: 89, icon: UserCheck },
    { type: 'VIP Tracked', count: 12, icon: Crown },
    { type: 'Unauthorized Access', count: 7, icon: UserX },
    { type: 'Pending Verification', count: 23, icon: RefreshCw },
    { type: 'Security Alerts', count: 19, icon: AlertTriangle },
    { type: 'System Health', count: 98, icon: Activity }
  ];

  // Detections per camera - expanded
  const camerasData = [
    { name: 'CAM-05', zone: 'Main Entrance', violations: 89 },
    { name: 'CAM-02', zone: 'Reception Area', violations: 67 },
    { name: 'CAM-03', zone: 'Employee Gate', violations: 54 },
    { name: 'CAM-07', zone: 'Parking Lot', violations: 43 },
    { name: 'CAM-01', zone: 'Security Check', violations: 38 },
    { name: 'CAM-04', zone: 'Elevator Hall', violations: 35 },
    { name: 'CAM-06', zone: 'Cafeteria', violations: 29 },
    { name: 'CAM-08', zone: 'Meeting Rooms', violations: 25 },
    { name: 'CAM-09', zone: 'Executive Floor', violations: 22 },
    { name: 'CAM-10', zone: 'IT Department', violations: 18 },
    { name: 'CAM-11', zone: 'Server Room', violations: 15 },
    { name: 'CAM-12', zone: 'Emergency Exit', violations: 12 }
  ];

  // Detections per site - expanded
  const sitesData = [
    { name: 'Building A', zone: 'Corporate Headquarters', violations: 234, total: 'total detections' },
    { name: 'Building B', zone: 'Research Facility', violations: 156, total: 'total detections' },
    { name: 'Building C', zone: 'Manufacturing', violations: 98, total: 'total detections' },
    { name: 'Building D', zone: 'Warehouse', violations: 76, total: 'total detections' },
    { name: 'Building E', zone: 'Administration', violations: 65, total: 'total detections' },
    { name: 'Building F', zone: 'Security Center', violations: 45, total: 'total detections' },
    { name: 'Building G', zone: 'Guest Services', violations: 38, total: 'total detections' },
    { name: 'Building H', zone: 'Training Center', violations: 29, total: 'total detections' },
    { name: 'Building I', zone: 'Data Center', violations: 23, total: 'total detections' },
    { name: 'Building J', zone: 'Maintenance', violations: 18, total: 'total detections' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">

      {/* Key Metrics */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        {personnelMetrics.map((metric, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
            {/* Indigo left accent border */}
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{backgroundColor: '#3fb5b5'}}></div>
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
                  <metric.icon className="w-8 h-8" style={{color: '#3fb5b5'}} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Personnel Module Performance */}
        <Card className="col-span-7 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-base font-medium">Personnel Module Performance</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-white h-8 px-4 text-xs hover:opacity-90"
                  style={{backgroundColor: '#3fb5b5', borderColor: '#3fb5b5'}}
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
                        stroke="#3fb5b5"
                        fill="#3fb5b5"
                        fillOpacity={0.2}
                        strokeWidth={3}
                        dot={{ fill: '#3fb5b5', strokeWidth: 3, r: 6 }}
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
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#3fb5b5'}}></div>
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Current Week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Previous Week</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl border" style={{background: 'linear-gradient(to right, #f0fdfa, #e6fffa)', borderColor: '#a7f3d0'}} data-dark-style="background: linear-gradient(to right, rgba(63, 181, 181, 0.1), rgba(63, 181, 181, 0.15)); border-color: rgba(63, 181, 181, 0.3)">
                  <div className="text-center">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Personnel Score</h4>
                    <div className="text-3xl font-bold" style={{color: '#3fb5b5'}}>87</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">out of 100</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">Personnel Recommendations</h3>
                <div className="h-96 overflow-y-scroll scrollbar-hide space-y-3 pr-2">
                  {personnelRecommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#3fb5b5'}}>
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
                      {/* Severity - Border-only badge for urgency/danger */}
                      <div className={`border-2 bg-transparent text-xs px-3 py-1 rounded-lg font-bold uppercase tracking-wide ${
                        detection.severityColor === 'bg-red-500' || detection.severityColor === 'bg-red-600' ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' :
                        detection.severityColor === 'bg-orange-500' ? 'border-orange-500 text-orange-600 dark:border-orange-400 dark:text-orange-400' :
                        detection.severityColor === 'bg-yellow-400' ? 'border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400' :
                        detection.severityColor === 'bg-blue-500' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' :
                        'border-gray-500 text-gray-600 dark:border-gray-400 dark:text-gray-300'
                      }`}>
                        {detection.severity}
                      </div>
                      {/* Process - Button style for action */}
                      <Button size="sm" className="h-8 px-4 text-white text-xs font-semibold rounded-md shadow-sm transition-all duration-200 hover:shadow-md hover:opacity-90" style={{backgroundColor: '#3fb5b5', borderColor: '#3fb5b5'}}>
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

        {/* Detection Frequency Chart */}
        <Card className="col-span-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold flex items-center gap-2">
                  📊 Detection Frequency
                </CardTitle>
              </div>
              <Select defaultValue={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-28 h-8 text-xs border-gray-300 dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today" className="text-xs">Today</SelectItem>
                  <SelectItem value="week" className="text-xs">Week</SelectItem>
                  <SelectItem value="month" className="text-xs">Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={detectionFrequencyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                  <XAxis 
                    dataKey="type" 
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="violations" fill="#3fb5b5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Personnel Detection Trends */}
        <Card className="col-span-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold flex items-center gap-2">
                📈 Personnel Detection Trends
              </CardTitle>
              <Select defaultValue={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-28 h-8 text-xs border-gray-300 dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today" className="text-xs">Today</SelectItem>
                  <SelectItem value="week" className="text-xs">Week</SelectItem>
                  <SelectItem value="month" className="text-xs">Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={detectionTrendsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    domain={[0, 350]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="employees" stroke="#3fb5b5" strokeWidth={3} dot={{ fill: '#3fb5b5', r: 4 }} />
                  <Line type="monotone" dataKey="visitors" stroke="#5eced1" strokeWidth={2} dot={{ fill: '#5eced1', r: 3 }} />
                  <Line type="monotone" dataKey="vip" stroke="#7dd3d8" strokeWidth={2} dot={{ fill: '#7dd3d8', r: 3 }} />
                  <Line type="monotone" dataKey="unauthorized" stroke="#f44336" strokeWidth={2} dot={{ fill: '#f44336', r: 3 }} />
                  <Line type="monotone" dataKey="unknown" stroke="#9ecccf" strokeWidth={2} dot={{ fill: '#9ecccf', r: 3 }} />
                  <Line type="monotone" dataKey="alerts" stroke="#ff9800" strokeWidth={2} dot={{ fill: '#ff9800', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Detection Distribution Pie Chart */}
        <Card className="col-span-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold flex items-center gap-2">
              🥧 Detection Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      {detectionDistribution.map((entry) => (
                        <linearGradient key={entry.gradientId} id={entry.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                          <stop offset="100%" stopColor={entry.color} stopOpacity={0.6} />
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie
                      data={detectionDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={40}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {detectionDistribution.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`url(#${entry.gradientId})`}
                          stroke="white"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value}%`, name]}
                      contentStyle={{
                        backgroundColor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 pl-6">
                <div className="space-y-3">
                  {detectionDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">{item.percentage}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Row: Detection Summary, Cameras, and Site - All on same row */}
        {/* Detection Summary */}
        <Card className="col-span-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold flex items-center gap-2">
              📋 Detection Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 h-80">
              {detectionSummary.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: '#3fb5b5'}}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.count}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">{item.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detections per Camera */}
        <Card className="col-span-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold flex items-center gap-2">
              📹 Detections per Camera
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 overflow-y-scroll scrollbar-hide space-y-2 pr-2">
              {camerasData.map((camera, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Camera className="w-5 h-5" style={{color: '#3fb5b5'}} />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{camera.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">{camera.zone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{camera.violations}</div>
                    <Button
                      size="sm"
                      className="h-7 px-3 text-white text-xs hover:opacity-90"
                      style={{backgroundColor: '#3fb5b5'}}
                      onClick={() => {
                        setSelectedCamera(camera);
                        setIsCameraModalOpen(true);
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detections per Site */}
        <Card className="col-span-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold flex items-center gap-2">
              🏢 Detections per Site
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 overflow-y-scroll scrollbar-hide space-y-2 pr-2">
              {sitesData.map((site, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" style={{color: '#3fb5b5'}} />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{site.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">{site.zone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{site.violations}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">{site.total}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Camera Performance Modal */}
      {selectedCamera && (
        <CameraPerformanceModal
          camera={selectedCamera}
          isOpen={isCameraModalOpen}
          onClose={() => {
            setIsCameraModalOpen(false);
            setSelectedCamera(null);
          }}
        />
      )}
    </div>
  );
}