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
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('safetyDashboardTheme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('safetyDashboardTheme', newTheme);
  };

  // Theme colors
  const themeColors = {
    light: {
      background: 'bg-gray-50',
      cardBg: 'bg-white',
      cardBorder: 'border-gray-200',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textMuted: 'text-gray-500',
      inputBg: 'bg-gray-100',
      inputBorder: 'border-gray-300',
      hoverBg: 'hover:bg-gray-100',
      gridStroke: '#e5e7eb',
      tooltipBg: '#ffffff',
      tooltipBorder: '#e5e7eb',
      chartText: '#6b7280',
      innerCardBg: 'bg-gray-50'
    },
    dark: {
      background: 'bg-[#0a0e27]',
      cardBg: 'bg-[#1a1f3a]',
      cardBorder: 'border-gray-800',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400',
      inputBg: 'bg-gray-800/50',
      inputBorder: 'border-gray-700',
      hoverBg: 'hover:bg-gray-800',
      gridStroke: '#1f2937',
      tooltipBg: '#1a1f3a',
      tooltipBorder: '#374151',
      chartText: '#9ca3af',
      innerCardBg: 'bg-[#0a0e27]'
    }
  };

  const currentTheme = themeColors[theme];

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
    }
  ];

  // Live detections - exact from design
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
      statusColor: 'bg-blue-500',
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
      thumbnail: detectionImage4
    }
  ];

  // Detection frequency data
  const detectionFrequencyData = [
    { time: '06:00-08:00', violations: 95 },
    { time: '08:00-10:00', violations: 110 },
    { time: '10:00-12:00', violations: 75 },
    { time: '12:00-14:00', violations: 85 },
    { time: '14:00-16:00', violations: 65 },
    { time: '16:00-18:00', violations: 55 },
    { time: '18:00-20:00', violations: 35 },
    { time: '20:00-22:00', violations: 25 }
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

  // Violation distribution - matching screenshot data
  const violationDistribution = [
    { name: 'No Helmet', value: 35.3, percentage: '35.3%', color: '#2563eb' },
    { name: 'No Vest', value: 26.6, percentage: '26.6%', color: '#1d4ed8' },
    { name: 'No Harness', value: 12.5, percentage: '12.5%', color: '#3b82f6' },
    { name: 'No Uniform', value: 9.1, percentage: '9.1%', color: '#60a5fa' },
    { name: 'Smoke', value: 7.5, percentage: '7.5%', color: '#93c5fd' },
    { name: 'Fire', value: 4.8, percentage: '4.8%', color: '#bfdbfe' },
    { name: 'Leakage', value: 3.2, percentage: '3.2%', color: '#dbeafe' }
  ];

  // Detection summary
  const detectionSummary = [
    { type: 'Critical Violations', count: 108, icon: AlertTriangle },
    { type: 'High\nPriority', count: 101, icon: User },
    { type: 'Medium Priority', count: 31, icon: Shield }
  ];

  // Detections per camera - exact from design
  const camerasData = [
    { name: 'CAM-05', zone: 'Construction Zone A', violations: 45 },
    { name: 'CAM-02', zone: 'Warehouse', violations: 38 },
    { name: 'CAM-03', zone: 'High Work Zone A', violations: 29 },
    { name: 'CAM-07', zone: 'Factory Floor C', violations: 24 }
  ];

  // Detections per site - exact from design
  const sitesData = [
    { name: 'Site A', zone: 'Construction Zone', violations: 123, total: 'total violations' },
    { name: 'Site B', zone: 'Warehouse Complex', violations: 87, total: 'total violations' },
    { name: 'Site C', zone: 'Factory Floor', violations: 64, total: 'total violations' },
    { name: 'Site D', zone: '', violations: 48, total: 'total violations' }
  ];

  return (
    <div className={`min-h-screen ${currentTheme.background} ${currentTheme.text} p-6`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${currentTheme.text}`}>Safety Dashboard</h1>
          <p className={`${currentTheme.textMuted} text-sm`}>Real-time safety violation monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search violations..."
              className={`${currentTheme.inputBg} ${currentTheme.textSecondary} px-4 py-2 rounded-lg w-64 text-sm border ${currentTheme.inputBorder}`}
            />
            <Search className={`w-4 h-4 ${currentTheme.textMuted} absolute right-3 top-2.5`} />
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme}
            className={`${currentTheme.textMuted} ${currentTheme.hoverBg}`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm" className={`${currentTheme.textMuted} ${currentTheme.hoverBg}`}>
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className={`${currentTheme.textMuted} ${currentTheme.hoverBg} relative`}>
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <div className="flex items-center gap-2">
            <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full" />
            <div className="text-sm">
              <div className={`${currentTheme.text} font-medium`}>Safety Admin</div>
              <div className={`${currentTheme.textMuted} text-xs`}>Safety Manager</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        {safetyMetrics.map((metric, index) => (
          <Card key={index} className={`${theme === 'light' ? 'bg-white border-gray-200' : 'bg-white border-gray-200'} shadow-sm`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
                  <div className="text-xs text-gray-500">{metric.change} {metric.period}</div>
                </div>
                <div className="ml-4">
                  <metric.icon className="w-10 h-10 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Safety Module Performance */}
        <Card className="col-span-7 bg-white border border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 text-base font-medium">Safety Module Performance</CardTitle>
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
                  className="bg-transparent border-gray-300 text-gray-600 hover:bg-gray-100 h-8 px-4 text-xs"
                >
                  Monthly
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col">
                <div className="h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid 
                        gridType="polygon" 
                        radialLines={true}
                        stroke="#e2e8f0"
                      />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: '#64748b', fontSize: 10 }}
                      />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 100]} 
                        tick={false}
                        tickCount={6}
                      />
                      <Radar
                        name="Current Week"
                        dataKey="currentWeek"
                        stroke="#2563eb"
                        fill="#2563eb"
                        fillOpacity={0.1}
                        strokeWidth={2}
                        dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                      />
                      <Radar
                        name="Previous Week"
                        dataKey="previousWeek"
                        stroke="#94a3b8"
                        fill="#94a3b8"
                        fillOpacity={0.05}
                        strokeWidth={2}
                        dot={{ fill: '#94a3b8', strokeWidth: 2, r: 3 }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-6 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-600">Current Week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-600">Previous Week</span>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-600">
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
                <h3 className="text-base font-medium text-gray-900 mb-4">Safety Recommendations</h3>
                <div className="space-y-3">
                  {safetyRecommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <recommendation.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{recommendation.title}</div>
                        <div className="text-xs text-gray-600">{recommendation.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Detections */}
        <Card className={`col-span-5 ${currentTheme.cardBg} ${currentTheme.cardBorder}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className={currentTheme.text}>Live Detections</CardTitle>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-red-400">LIVE</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className={currentTheme.textMuted}>
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {liveDetections.map((detection) => (
              <div key={detection.id} className={`flex items-center gap-4 p-3 ${currentTheme.innerCardBg} rounded-lg`}>
                <img 
                  src={detection.thumbnail} 
                  alt={detection.type}
                  className="w-24 h-16 object-cover rounded-lg border border-gray-600"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`text-sm font-medium ${currentTheme.text}`}>{detection.type}</h4>
                  </div>
                  <div className={`flex items-center gap-4 text-xs ${currentTheme.textMuted}`}>
                    <span>{detection.area} • {detection.location}</span>
                    <span>{detection.time} • {detection.camera}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${detection.statusColor} text-white text-xs px-3 py-1`}>
                    {detection.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className={`h-8 px-2 ${currentTheme.textMuted}`}>
                    <Settings className="w-4 h-4 mr-1" />
                    Process
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Detection Frequency */}
        <Card className={`col-span-4 ${currentTheme.cardBg} ${currentTheme.cardBorder}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className={`${currentTheme.text} text-base`}>Detection Frequency</CardTitle>
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
                  className={`h-7 bg-transparent text-xs ${theme === 'light' ? 'border-gray-400 text-gray-600 hover:bg-gray-100' : 'border-gray-600 text-gray-400 hover:bg-gray-700'}`}
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
                  <CartesianGrid strokeDasharray="3 3" stroke={currentTheme.gridStroke} />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: currentTheme.chartText, fontSize: 9 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: currentTheme.chartText, fontSize: 10 }}
                    ticks={[0, 25, 50, 75, 100, 125]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: currentTheme.tooltipBg, 
                      border: `1px solid ${currentTheme.tooltipBorder}`,
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
        <Card className="col-span-4 bg-white border border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 text-base font-medium">Safety Violation Trends</CardTitle>
              <Select defaultValue="today">
                <SelectTrigger className="w-20 h-8 text-xs bg-gray-50 border-gray-300 text-gray-700">
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
                  <CartesianGrid strokeDasharray="1 1" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#666666', fontSize: 11 }}
                  />
                  <YAxis 
                    domain={[0, 20]}
                    ticks={[0, 5, 10, 15, 20]}
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#666666', fontSize: 11 }}
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
                <span className="text-gray-600">No Helmet</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-600">No Vest</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600">No Harness</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">No Uniform</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Smoke</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-gray-600">Fire</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Leakage</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Violation Distribution */}
        <Card className="col-span-4 bg-white border border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 text-base font-medium">Violation Distribution</CardTitle>
              <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={violationDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, percentage }) => `${name}\n${percentage}`}
                    labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
                  >
                    {violationDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Detection Summary */}
        <Card className={`col-span-4 ${currentTheme.cardBg} ${currentTheme.cardBorder}`}>
          <CardHeader>
            <CardTitle className={`${currentTheme.text} text-base`}>Detection Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {detectionSummary.map((item, index) => (
              <div key={index} className={`flex items-center justify-between p-3 ${currentTheme.innerCardBg} rounded-lg`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${index === 0 ? 'bg-blue-600/20' : index === 1 ? 'bg-gray-600/20' : 'bg-gray-700/20'}`}>
                    <item.icon className={`w-4 h-4 ${index === 0 ? 'text-blue-400' : currentTheme.textMuted}`} />
                  </div>
                  <span className={`text-sm ${currentTheme.textSecondary}`}>{item.type}</span>
                </div>
                <span className={`text-2xl font-bold ${currentTheme.text}`}>{item.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Detections per Camera */}
        <Card className={`col-span-4 ${currentTheme.cardBg} ${currentTheme.cardBorder}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className={`${currentTheme.text} text-base`}>Detections per Camera</CardTitle>
              <Button variant="ghost" size="sm" className={`${currentTheme.textMuted} h-6 p-0`}>
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
                    <div className={`text-sm font-medium ${currentTheme.text}`}>{camera.name}</div>
                    <div className={`text-xs ${currentTheme.textMuted}`}>{camera.zone}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-400">{camera.violations}</div>
                  <div className={`text-xs ${currentTheme.textMuted}`}>violations</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Detections per Site */}
        <Card className={`col-span-4 ${currentTheme.cardBg} ${currentTheme.cardBorder}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className={`${currentTheme.text} text-base`}>Detections per Site</CardTitle>
              <Button variant="ghost" size="sm" className={`${currentTheme.textMuted} h-6 p-0`}>
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
                    <div className={`text-sm font-medium ${currentTheme.text}`}>{site.name}</div>
                    <div className={`text-xs ${currentTheme.textMuted}`}>{site.zone}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-400">{site.violations}</div>
                  <div className={`text-xs ${currentTheme.textMuted}`}>{site.total}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}