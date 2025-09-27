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
  TrendingUp,
  Calendar,
  Clock,
  Settings,
  Maximize2,
  Play,
  Pause,
  Volume2,
  Download,
  Share2,
  RefreshCw,
  Eye,
  Filter
} from 'lucide-react';

export default function SafetyDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [isLive, setIsLive] = useState(true);

  // Key safety metrics
  const safetyMetrics = [
    { label: 'No Helmet', value: 89, icon: HardHat, color: 'bg-blue-500', change: '+12%' },
    { label: 'No Vest', value: 87, icon: Shield, color: 'bg-blue-500', change: '+8%' },
    { label: 'Uniform', value: 34, icon: Shirt, color: 'bg-cyan-500', change: '+4%' },
    { label: 'Unknown', value: 23, icon: User, color: 'bg-gray-500', change: '+3%' },
    { label: 'Smoke', value: 19, icon: Flame, color: 'bg-orange-500', change: '+15%' },
    { label: 'Fire', value: 12, icon: Flame, color: 'bg-red-500', change: '+25%' },
    { label: 'Leakage', value: 8, icon: Droplets, color: 'bg-blue-400', change: '+1%' }
  ];

  // Radar chart data for Safety Module Performance
  const radarData = [
    { subject: 'PPE Compliance', A: 110, B: 130, fullMark: 150 },
    { subject: 'Fire Detection', A: 98, B: 110, fullMark: 150 },
    { subject: 'Helmet Detection', A: 86, B: 130, fullMark: 150 },
    { subject: 'Vest Detection', A: 99, B: 100, fullMark: 150 },
    { subject: 'Smoke Detection', A: 85, B: 90, fullMark: 150 },
    { subject: 'Training Compliance', A: 65, B: 85, fullMark: 150 }
  ];

  // Live detections
  const liveDetections = [
    {
      id: 1,
      type: 'No Helmet Detected',
      location: 'Construction Zone',
      time: '2 mins ago',
      camera: 'CAM-05',
      status: 'Critical',
      thumbnail: '/api/placeholder/120/80'
    },
    {
      id: 2,
      type: 'No Vest Detected',
      location: 'Warehouse Area',
      time: '3 mins ago',
      camera: 'CAM-02',
      status: 'In Review',
      thumbnail: '/api/placeholder/120/80'
    },
    {
      id: 3,
      type: 'Smoke Detected',
      location: 'Factory Floor',
      time: '5 mins ago',
      camera: 'CAM-07',
      status: 'Confirmed',
      thumbnail: '/api/placeholder/120/80'
    },
    {
      id: 4,
      type: 'No Harness Detected',
      location: 'High Work Zone',
      time: '12 mins ago',
      camera: 'CAM-04',
      status: 'Resolved',
      thumbnail: '/api/placeholder/120/80'
    }
  ];

  // Detection frequency data
  const detectionFrequencyData = [
    { time: '00:00', violations: 12 },
    { time: '04:00', violations: 8 },
    { time: '08:00', violations: 25 },
    { time: '12:00', violations: 35 },
    { time: '16:00', violations: 28 },
    { time: '20:00', violations: 15 }
  ];

  // Safety violation trends
  const violationTrendsData = [
    { date: 'Jan', helmet: 45, vest: 38, fire: 5, smoke: 12 },
    { date: 'Feb', helmet: 52, vest: 42, fire: 8, smoke: 15 },
    { date: 'Mar', helmet: 48, vest: 35, fire: 3, smoke: 9 },
    { date: 'Apr', helmet: 61, vest: 48, fire: 12, smoke: 18 },
    { date: 'May', helmet: 55, vest: 45, fire: 7, smoke: 14 },
    { date: 'Jun', helmet: 67, vest: 52, fire: 9, smoke: 16 }
  ];

  // Violation distribution
  const violationDistribution = [
    { name: 'PPE Violations', value: 65, color: '#3b82f6' },
    { name: 'Safety Violations', value: 25, color: '#ef4444' },
    { name: 'Environmental', value: 10, color: '#f59e0b' }
  ];

  // Detection summary
  const detectionSummary = [
    { type: 'Critical Violations', count: 108, color: 'bg-red-500', icon: AlertTriangle },
    { type: 'High Priority', count: 101, color: 'bg-orange-500', icon: AlertTriangle },
    { type: 'Medium Priority', count: 31, color: 'bg-blue-500', icon: AlertTriangle }
  ];

  // Detections per camera
  const camerasData = [
    { name: 'CAM-05', zone: 'Construction Zone A', violations: 45 },
    { name: 'CAM-02', zone: 'Warehouse', violations: 38 },
    { name: 'CAM-03', zone: 'Factory Zone A', violations: 29 },
    { name: 'CAM-07', zone: 'Factory Zone C', violations: 24 }
  ];

  // Detections per site
  const sitesData = [
    { name: 'Site A', zone: 'Construction Zone', violations: 123 },
    { name: 'Site B', zone: 'Warehouse Complex', violations: 87 },
    { name: 'Site C', zone: 'Factory Floor', violations: 64 },
    { name: 'Site D', zone: 'Office Area', violations: 45 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Critical':
        return <Badge className="bg-red-500 text-white">Critical</Badge>;
      case 'In Review':
        return <Badge className="bg-orange-500 text-white">In Review</Badge>;
      case 'Confirmed':
        return <Badge className="bg-yellow-500 text-white">Confirmed</Badge>;
      case 'Resolved':
        return <Badge className="bg-gray-500 text-white">Resolved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Safety Dashboard</h1>
          <p className="text-gray-400">Real-time safety violation monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32 bg-gray-800 border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        {safetyMetrics.map((metric, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className="w-5 h-5 text-blue-400" />
                <Badge className="bg-gray-700 text-gray-300 text-xs">{metric.change}</Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-xs text-gray-400">{metric.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Safety Module Performance */}
        <Card className="col-span-5 bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Safety Module Performance</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-blue-600 border-blue-600 text-white">
                  Weekly
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-400">
                  Monthly
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid gridType="polygon" />
                  <PolarAngleAxis dataKey="subject" className="text-gray-400" />
                  <PolarRadiusAxis angle={90} domain={[0, 150]} className="text-gray-400" />
                  <Radar
                    name="Current Week"
                    dataKey="A"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Previous Week"
                    dataKey="B"
                    stroke="#64748b"
                    fill="#64748b"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-white mb-2">Safety Recommendations</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Increase PPE Training</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Add More Cameras</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Reduce Response Time</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Detections */}
        <Card className="col-span-7 bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-white">Live Detections</CardTitle>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-red-400">LIVE</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {liveDetections.map((detection) => (
                <div key={detection.id} className="flex items-center gap-4 p-3 bg-gray-900 rounded-lg border border-gray-700">
                  <img 
                    src={detection.thumbnail} 
                    alt={detection.type}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-white">{detection.type}</h4>
                      {getStatusBadge(detection.status)}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>{detection.location}</span>
                      <span>{detection.time}</span>
                      <span>{detection.camera}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detection Frequency */}
        <Card className="col-span-4 bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Detection Frequency</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-blue-600 border-blue-600 text-white">
                  Today
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-400">
                  Week
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={detectionFrequencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} className="text-gray-400" />
                  <YAxis axisLine={false} tickLine={false} className="text-gray-400" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#374151', 
                      border: '1px solid #4b5563',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="violations" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Safety Violation Trends */}
        <Card className="col-span-4 bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Safety Violation Trends</CardTitle>
              <Select defaultValue="today">
                <SelectTrigger className="w-24 bg-gray-700 border-gray-600">
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
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={violationTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} className="text-gray-400" />
                  <YAxis axisLine={false} tickLine={false} className="text-gray-400" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#374151', 
                      border: '1px solid #4b5563',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="helmet" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="vest" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="fire" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="smoke" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Violation Distribution */}
        <Card className="col-span-4 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Violation Distribution</CardTitle>
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
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {violationDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#374151', 
                      border: '1px solid #4b5563',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {violationDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-white font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detection Summary */}
        <Card className="col-span-4 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Detection Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {detectionSummary.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-300">{item.type}</span>
                </div>
                <span className="text-xl font-bold text-white">{item.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Detections per Camera */}
        <Card className="col-span-4 bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Detections per Camera</CardTitle>
              <Button variant="ghost" size="sm" className="text-gray-400">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {camerasData.map((camera, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{camera.name}</div>
                    <div className="text-xs text-gray-400">{camera.zone}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{camera.violations}</div>
                  <div className="text-xs text-gray-400">violations</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Detections per Site */}
        <Card className="col-span-4 bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Detections per Site</CardTitle>
              <Button variant="ghost" size="sm" className="text-gray-400">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {sitesData.map((site, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{site.name}</div>
                    <div className="text-xs text-gray-400">{site.zone}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{site.violations}</div>
                  <div className="text-xs text-gray-400">total violations</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}