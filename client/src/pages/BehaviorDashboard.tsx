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
  Swords,
  TrendingDown,
  Users,
  Cigarette,
  Timer,
  Phone,
  Shield,
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
import { EventDetailModal } from '@/components/EventDetailModal';

// Import behavior detection images
import behaviorImage1 from '@assets/generated_images/Security_capture_businessman_photo_2feb92d4.png';
import behaviorImage2 from '@assets/generated_images/Security_capture_woman_photo_e17e3828.png';
import behaviorImage3 from '@assets/generated_images/Security_capture_casual_man_eb27432b.png';
import behaviorImage4 from '@assets/generated_images/Security_capture_elderly_woman_37bac27b.png';

export default function BehaviorDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Key behavior metrics - from the design image
  const behaviorMetrics = [
    { label: 'Fight Detection', value: 23, icon: Swords, change: '+5%', period: 'today', color: 'text-red-600' },
    { label: 'Falls', value: 45, icon: TrendingDown, change: '+8%', period: 'today', color: 'text-red-600' },
    { label: 'Crowd Movement', value: 67, icon: Users, change: '+12%', period: 'today', color: 'text-red-600' },
    { label: 'Smoking', value: 34, icon: Cigarette, change: '+3%', period: 'today', color: 'text-red-600' },
    { label: 'Running', value: 89, icon: Timer, change: '+15%', period: 'today', color: 'text-red-600' },
    { label: 'Calling', value: 56, icon: Phone, change: '+7%', period: 'today', color: 'text-red-600' },
    { label: 'Weapon', value: 12, icon: Shield, change: '+2%', period: 'today', color: 'text-red-600' },
    { label: 'Gathering', value: 78, icon: UserCheck, change: '+10%', period: 'today', color: 'text-red-600' }
  ];

  // Radar chart data for Behavior Module Performance
  const radarData = [
    { subject: 'Behavior Accuracy', currentWeek: 88, previousWeek: 82, fullMark: 100 },
    { subject: 'Fight Detection', currentWeek: 92, previousWeek: 89, fullMark: 100 },
    { subject: 'Fall Detection', currentWeek: 85, previousWeek: 78, fullMark: 100 },
    { subject: 'Crowd Analysis', currentWeek: 75, previousWeek: 72, fullMark: 100 },
    { subject: 'Weapon Detection', currentWeek: 95, previousWeek: 93, fullMark: 100 },
    { subject: 'Response Time', currentWeek: 78, previousWeek: 75, fullMark: 100 },
    { subject: 'False Positive Rate', currentWeek: 25, previousWeek: 30, fullMark: 100 },
    { subject: 'Coverage Area', currentWeek: 82, previousWeek: 80, fullMark: 100 }
  ];

  // Behavior recommendations data
  const behaviorRecommendations = [
    {
      title: 'Increase Security Patrols',
      description: 'Focus on high-risk areas',
      icon: AlertTriangle
    },
    {
      title: 'Add Behavior Cameras',
      description: 'Improve coverage zones',
      icon: Camera
    },
    {
      title: 'Alert Response Time',
      description: 'Optimize incident response',
      icon: Timer
    },
    {
      title: 'Behavior Analysis',
      description: 'Enhanced AI detection',
      icon: Settings
    }
  ];

  // Live detections data - matching the design
  const liveDetections = [
    {
      id: 1,
      type: 'Fight Detected',
      location: 'Stairway',
      area: 'Site A - entrance hall',
      time: '1 min ago',
      camera: 'CAM-12',
      status: 'Emergency',
      statusColor: 'bg-red-500',
      severity: 'Critical',
      severityColor: 'bg-red-500',
      thumbnail: behaviorImage1
    },
    {
      id: 2,
      type: 'Fall Detected',
      location: 'Stairway',
      area: 'Site B - entrance hall',
      time: '3 mins ago',
      camera: 'CAM-03',
      status: 'Critical',
      statusColor: 'bg-red-500',
      severity: 'High',
      severityColor: 'bg-orange-500',
      thumbnail: behaviorImage2
    },
    {
      id: 3,
      type: 'Unusual Crowd Movement',
      location: 'Site C - entrance hall',
      area: 'Main Area',
      time: '5 mins ago',
      camera: 'CAM-08',
      status: 'Confirmed',
      statusColor: 'bg-gray-400',
      severity: 'Alert',
      severityColor: 'bg-yellow-400',
      thumbnail: behaviorImage3
    },
    {
      id: 4,
      type: 'Smoking Detected',
      location: 'Site A - Restricted',
      area: 'No-Smoking Zone',
      time: '8 mins ago',
      camera: 'CAM-15',
      status: 'Resolved',
      statusColor: 'bg-green-500',
      severity: 'Low',
      severityColor: 'bg-blue-400',
      thumbnail: behaviorImage4
    }
  ];

  // Detection frequency data for chart
  const detectionFrequencyData = [
    { name: 'Fight', detections: 23 },
    { name: 'Falls', detections: 45 },
    { name: 'Crowd', detections: 67 },
    { name: 'Smoking', detections: 34 },
    { name: 'Running', detections: 89 },
    { name: 'Calling', detections: 56 },
    { name: 'Weapon', detections: 12 },
    { name: 'Gathering', detections: 78 }
  ];

  // Behavior trends data
  const behaviorTrendsData = [
    { time: '08:00', fightDetection: 2, falls: 3, crowdMovement: 5, smoking: 1, running: 8, calling: 4, weapon: 0, gathering: 6 },
    { time: '10:00', fightDetection: 1, falls: 4, crowdMovement: 7, smoking: 2, running: 12, calling: 6, weapon: 1, gathering: 8 },
    { time: '12:00', fightDetection: 3, falls: 6, crowdMovement: 9, smoking: 4, running: 15, calling: 8, weapon: 0, gathering: 12 },
    { time: '14:00', fightDetection: 4, falls: 8, crowdMovement: 12, smoking: 6, running: 18, calling: 10, weapon: 2, gathering: 15 },
    { time: '16:00', fightDetection: 6, falls: 12, crowdMovement: 15, smoking: 8, running: 22, calling: 14, weapon: 3, gathering: 18 },
    { time: '18:00', fightDetection: 7, falls: 10, crowdMovement: 19, smoking: 12, running: 25, calling: 12, weapon: 6, gathering: 19 }
  ];

  // Behavior distribution data for pie chart
  const behaviorDistributionData = [
    { name: 'Fight Detection', value: 5.8, fill: '#ef4444' },
    { name: 'Running', value: 22.3, fill: '#f97316' },
    { name: 'Gathering', value: 19.6, fill: '#eab308' },
    { name: 'Crowd Movement', value: 16.8, fill: '#22c55e' },
    { name: 'Calling', value: 14.1, fill: '#3b82f6' },
    { name: 'Falls', value: 11.3, fill: '#8b5cf6' },
    { name: 'Smoking', value: 8.5, fill: '#ec4899' },
    { name: 'Weapon', value: 3.0, fill: '#6b7280' }
  ];

  // Detection summary data
  const detectionSummary = [
    { label: 'Critical Behaviors', count: 35, color: 'bg-red-500' },
    { label: 'High Priority', count: 156, color: 'bg-orange-500' },
    { label: 'Medium Priority', count: 89, color: 'bg-yellow-500' }
  ];

  // Detections per camera data
  const detectionsPerCamera = [
    { camera: 'CAM-12', area: 'Main Area', detections: 67 },
    { camera: 'CAM-03', area: 'Stairway A', detections: 54 },
    { camera: 'CAM-08', area: 'Stairway B', detections: 43 },
    { camera: 'CAM-15', area: 'Area Building', detections: 38 }
  ];

  // Detections per site data
  const detectionsPerSite = [
    { site: 'Site A', area: 'Main', detections: 145 },
    { site: 'Site B', area: 'Secondary', detections: 98 },
    { site: 'Site C', area: 'Area', detections: 76 },
    { site: 'Site D', area: 'Zone', detections: 63 }
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Behavior Dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Real-time behavior monitoring and analysis</p>
          </div>
          <div className="flex items-center space-x-4">
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
            <Button variant="outline" size="sm" data-testid="button-refresh">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Behavior Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {behaviorMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" data-testid={`card-behavior-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className={`w-5 h-5 ${metric.color}`} />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{metric.change}</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{metric.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{metric.period}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts and Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Behavior Module Performance */}
            <Card className="bg-white dark:bg-gray-800" data-testid="card-behavior-performance">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Behavior Module Performance</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Weekly</Badge>
                    <Badge variant="outline" className="text-gray-600 border-gray-200">Monthly</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                      <PolarRadiusAxis angle={45} domain={[0, 100]} tick={{ fontSize: 8 }} />
                      <Radar
                        name="Current Week"
                        dataKey="currentWeek"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Previous Week"
                        dataKey="previousWeek"
                        stroke="#94a3b8"
                        fill="#94a3b8"
                        fillOpacity={0.1}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Detection Frequency Chart */}
            <Card className="bg-white dark:bg-gray-800" data-testid="card-detection-frequency">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Detection Frequency</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Today</Badge>
                    <Badge variant="outline" className="text-gray-600 border-gray-200">Week</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={detectionFrequencyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="detections" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Behavior Trends */}
            <Card className="bg-white dark:bg-gray-800" data-testid="card-behavior-trends">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Behavior Trends</CardTitle>
                  <Select defaultValue="today">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={behaviorTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="fightDetection" stroke="#ef4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="falls" stroke="#f97316" strokeWidth={2} />
                      <Line type="monotone" dataKey="crowdMovement" stroke="#eab308" strokeWidth={2} />
                      <Line type="monotone" dataKey="smoking" stroke="#22c55e" strokeWidth={2} />
                      <Line type="monotone" dataKey="running" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="calling" stroke="#8b5cf6" strokeWidth={2} />
                      <Line type="monotone" dataKey="weapon" stroke="#ec4899" strokeWidth={2} />
                      <Line type="monotone" dataKey="gathering" stroke="#6b7280" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Behavior Distribution */}
            <Card className="bg-white dark:bg-gray-800" data-testid="card-behavior-distribution">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Behavior Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={behaviorDistributionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                      />
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Live Detections */}
          <div className="space-y-6">
            {/* Live Detections */}
            <Card className="bg-white dark:bg-gray-800" data-testid="card-live-detections">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      Live Detections
                    </div>
                  </CardTitle>
                  <Button variant="ghost" size="sm" data-testid="button-refresh-detections">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {liveDetections.map((detection) => (
                  <div 
                    key={detection.id} 
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => handleEventClick(detection)}
                    data-testid={`detection-item-${detection.id}`}
                  >
                    <div className="flex items-start gap-3">
                      <img 
                        src={detection.thumbnail} 
                        alt={detection.type}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {detection.type}
                          </h4>
                          <Badge className={`${detection.statusColor} text-white text-xs`}>
                            {detection.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{detection.location}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{detection.area}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-500">{detection.time} • {detection.camera}</span>
                          <Badge className={`${detection.severityColor} text-white text-xs`}>
                            {detection.severity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Detection Summary */}
            <Card className="bg-white dark:bg-gray-800" data-testid="card-detection-summary">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Detection Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {detectionSummary.map((item, index) => (
                  <div key={index} className="flex items-center justify-between" data-testid={`summary-item-${index}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{item.count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Detections per Camera */}
            <Card className="bg-white dark:bg-gray-800" data-testid="card-detections-per-camera">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Detections per Camera</CardTitle>
                  <Button variant="ghost" size="sm" data-testid="button-refresh-camera">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {detectionsPerCamera.map((camera, index) => (
                  <div key={index} className="flex items-center justify-between" data-testid={`camera-item-${index}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <Camera className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{camera.camera}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">{camera.area}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">{camera.detections}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">detections</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Detections per Site */}
            <Card className="bg-white dark:bg-gray-800" data-testid="card-detections-per-site">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Detections per Site</CardTitle>
                  <Button variant="ghost" size="sm" data-testid="button-refresh-site">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {detectionsPerSite.map((site, index) => (
                  <div key={index} className="flex items-center justify-between" data-testid={`site-item-${index}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{site.site}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">{site.area}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">{site.detections}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">detections</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}