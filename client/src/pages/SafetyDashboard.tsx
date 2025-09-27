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
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  Shield,
  HardHat,
  Shirt,
  User,
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
  Filter
} from 'lucide-react';

export default function SafetyDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Key safety metrics - exact values from design
  const safetyMetrics = [
    { label: 'No Helmet', value: 89, icon: HardHat, change: '+12%', period: 'today' },
    { label: 'No Vest', value: 67, icon: Shield, change: '+8%', period: 'today' },
    { label: 'No Harness', value: 34, icon: Shield, change: '+4%', period: 'today' },
    { label: 'No Uniform', value: 23, icon: Shirt, change: '+3%', period: 'today' },
    { label: 'Smoke', value: 19, icon: Flame, change: '+15%', period: 'today' },
    { label: 'Fire', value: 12, icon: Flame, change: '+25%', period: 'today' },
    { label: 'Leakage', value: 8, icon: Droplets, change: '+1%', period: 'today' }
  ];

  // Radar chart data for Safety Module Performance
  const radarData = [
    { subject: 'Increase PPE', A: 120, fullMark: 150 },
    { subject: 'Training', A: 98, fullMark: 150 },
    { subject: 'helmet compliance', A: 86, fullMark: 150 },
    { subject: 'Reduce Response', A: 99, fullMark: 150 },
    { subject: 'Add More Cameras', A: 85, fullMark: 150 },
    { subject: 'Safety Recommendations', A: 65, fullMark: 150 }
  ];

  // Live detections - exact from design
  const liveDetections = [
    {
      id: 1,
      type: 'No Helmet Detected',
      location: 'Construction Zone',
      time: '2 mins ago',
      camera: 'CAM-05',
      status: 'Critical',
      statusColor: 'bg-red-500',
      thumbnail: '/api/placeholder/120/80'
    },
    {
      id: 2,
      type: 'No Vest Detected',
      location: 'Warehouse Area',
      time: '3 mins ago',
      camera: 'CAM-02',
      status: 'In Review',
      statusColor: 'bg-orange-500',
      thumbnail: '/api/placeholder/120/80'
    },
    {
      id: 3,
      type: 'Smoke Detected',
      location: 'Factory Floor',
      time: '5 mins ago',
      camera: 'CAM-07',
      status: 'Confirmed',
      statusColor: 'bg-blue-500',
      thumbnail: '/api/placeholder/120/80'
    },
    {
      id: 4,
      type: 'No Harness Detected',
      location: 'High Work Zone',
      time: '12 mins ago',
      camera: 'CAM-03',
      status: 'Resolved',
      statusColor: 'bg-gray-500',
      thumbnail: '/api/placeholder/120/80'
    }
  ];

  // Detection frequency data
  const detectionFrequencyData = [
    { time: '6am', violations: 12 },
    { time: '8am', violations: 25 },
    { time: '10am', violations: 35 },
    { time: '12pm', violations: 45 },
    { time: '2pm', violations: 38 },
    { time: '4pm', violations: 28 },
    { time: '6pm', violations: 15 },
    { time: '8pm', violations: 8 }
  ];

  // Violation distribution
  const violationDistribution = [
    { name: 'PPE\nViolations', value: 65, color: '#3b82f6' },
    { name: 'Safety\nViolations', value: 25, color: '#6366f1' },
    { name: 'Environmental\nHazards', value: 10, color: '#0ea5e9' }
  ];

  // Detection summary
  const detectionSummary = [
    { type: 'Critical Violations', count: 108, icon: AlertTriangle },
    { type: 'High Priority', count: 101, icon: User },
    { type: 'Medium Priority', count: 31, icon: Shield }
  ];

  // Detections per camera - exact from design
  const camerasData = [
    { name: 'CAM-05', zone: 'Construction Zone A', violations: 45 },
    { name: 'CAM-02', zone: 'Warehouse', violations: 38 },
    { name: 'CAM-03', zone: 'Factory Zone A', violations: 29 },
    { name: 'CAM-07', zone: 'Factory Zone C', violations: 24 }
  ];

  // Detections per site - exact from design
  const sitesData = [
    { name: 'Site A', zone: 'Construction Zone', violations: 123, total: 'total violations' },
    { name: 'Site B', zone: 'Warehouse Complex', violations: 87, total: 'total violations' },
    { name: 'Site C', zone: 'Factory Floor', violations: 64, total: 'total violations' },
    { name: 'Site D', zone: 'Office Area', violations: 48, total: 'total violations' }
  ];

  return (
    <div className="min-h-screen bg-[#0f1419] text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Safety Dashboard</h1>
          <p className="text-gray-400 text-sm">Real-time safety violation monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search violations..."
              className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg w-64 text-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <div className="flex items-center gap-2">
            <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full" />
            <div className="text-sm">
              <div className="text-white font-medium">Safety Admin</div>
              <div className="text-gray-400 text-xs">Safety Manager</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        {safetyMetrics.map((metric, index) => (
          <Card key={index} className="bg-gray-800/50 border-gray-700/50 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-xs">No</span>
                <span className="text-gray-400 text-xs">{metric.label.split(' ')[1]}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-white">{metric.value}</div>
                <metric.icon className="w-8 h-8 text-blue-400" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-green-400 text-xs font-medium">{metric.change}</span>
                <span className="text-gray-500 text-xs">{metric.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Safety Module Performance */}
        <Card className="col-span-5 bg-gray-800/50 border-gray-700/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Safety Module Performance</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
                >
                  Weekly
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-700"
                >
                  Monthly
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid 
                    gridType="polygon" 
                    radialLines={true}
                    stroke="#374151"
                  />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#9ca3af', fontSize: 10 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 150]} 
                    tick={false}
                    axisLine={false}
                  />
                  <Radar
                    name="Performance"
                    dataKey="A"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Safety Recommendations</h4>
              <div className="space-y-1">
                {['Increase PPE', 'Training', 'helmet compliance', 'Add More Cameras', 'Reduce Response'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Detections */}
        <Card className="col-span-7 bg-gray-800/50 border-gray-700/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-white">Live Detections</CardTitle>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-red-400">LIVE</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-400">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {liveDetections.map((detection) => (
              <div key={detection.id} className="flex items-center gap-4 p-3 bg-gray-900/50 rounded-lg">
                <img 
                  src={detection.thumbnail} 
                  alt={detection.type}
                  className="w-20 h-14 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium text-white">{detection.type}</h4>
                    <Badge className={`${detection.statusColor} text-white text-xs`}>
                      {detection.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{detection.location}</span>
                    <span>{detection.time} • {detection.camera}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <div className="text-xs text-gray-500">Process</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Detection Frequency */}
        <Card className="col-span-4 bg-gray-800/50 border-gray-700/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-base">Detection Frequency</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 bg-blue-600 border-blue-600 text-white text-xs hover:bg-blue-700"
                >
                  Today
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 bg-transparent border-gray-600 text-gray-400 text-xs hover:bg-gray-700"
                >
                  Week
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={detectionFrequencyData}>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 10 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 10 }}
                  />
                  <Bar dataKey="violations" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Safety Violation Trends */}
        <Card className="col-span-4 bg-gray-800/50 border-gray-700/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-base">Safety Violation Trends</CardTitle>
              <Select defaultValue="today">
                <SelectTrigger className="w-20 h-7 bg-gray-700 border-gray-600 text-xs">
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
            <div className="h-48 flex items-center justify-center">
              {/* Dot matrix visualization */}
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: 96 }, (_, i) => {
                  const colors = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#6366f1'];
                  const randomColor = colors[Math.floor(Math.random() * colors.length)];
                  const shouldShow = Math.random() > 0.3;
                  return (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: shouldShow ? randomColor : '#1f2937',
                        opacity: shouldShow ? (0.5 + Math.random() * 0.5) : 0.3
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Violation Distribution */}
        <Card className="col-span-4 bg-gray-800/50 border-gray-700/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white text-base">Violation Distribution</CardTitle>
            <Button variant="ghost" size="sm" className="text-gray-400 h-6 p-0">
              <Filter className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={violationDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {violationDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-2">
              {violationDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-300">{item.name.replace('\n', ' ')}</span>
                  </div>
                  <span className="text-white font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detection Summary */}
        <Card className="col-span-4 bg-gray-800/50 border-gray-700/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white text-base">Detection Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {detectionSummary.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${index === 0 ? 'bg-blue-600/20' : index === 1 ? 'bg-gray-600/20' : 'bg-gray-700/20'}`}>
                    <item.icon className={`w-4 h-4 ${index === 0 ? 'text-blue-400' : 'text-gray-400'}`} />
                  </div>
                  <span className="text-sm text-gray-300">{item.type}</span>
                </div>
                <span className="text-2xl font-bold text-white">{item.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Detections per Camera */}
        <Card className="col-span-4 bg-gray-800/50 border-gray-700/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-base">Detections per Camera</CardTitle>
              <Button variant="ghost" size="sm" className="text-gray-400 h-6 p-0">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {camerasData.map((camera, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <Camera className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{camera.name}</div>
                    <div className="text-xs text-gray-400">{camera.zone}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-400">{camera.violations}</div>
                  <div className="text-xs text-gray-400">violations</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Detections per Site */}
        <Card className="col-span-4 bg-gray-800/50 border-gray-700/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-base">Detections per Site</CardTitle>
              <Button variant="ghost" size="sm" className="text-gray-400 h-6 p-0">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {sitesData.map((site, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <MapPin className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{site.name}</div>
                    <div className="text-xs text-gray-400">{site.zone}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-400">{site.violations}</div>
                  <div className="text-xs text-gray-400">{site.total}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}