import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search,
  Mic,
  Filter,
  Clock,
  Play,
  Share2,
  Download,
  Save,
  ChevronDown,
  User,
  Car,
  Package,
  AlertTriangle,
  Calendar,
  MapPin,
  TrendingUp,
  Activity,
  Shield,
  BarChart3,
  RefreshCw,
  X,
  SlidersHorizontal,
  Bookmark,
  FileText,
  Link,
  Pause,
  Volume2,
  ChevronRight,
  Eye
} from 'lucide-react';

export default function VSSSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    dateRange: 'last24h',
    cameras: [],
    objectType: [],
    confidence: 75
  });
  
  const popularSearches = [
    { icon: User, text: 'Person in red shirt', color: 'bg-blue-100 text-blue-700' },
    { icon: Car, text: 'Vehicle license ABC123', color: 'bg-green-100 text-green-700' },
    { icon: Clock, text: 'After 2pm today', color: 'bg-purple-100 text-purple-700' },
    { icon: AlertTriangle, text: 'Suspicious behavior', color: 'bg-orange-100 text-orange-700' },
    { icon: Package, text: 'Package delivery', color: 'bg-cyan-100 text-cyan-700' }
  ];

  const searchResults = [
    {
      id: 1,
      camera: 'CAM-01 Main Entrance',
      timestamp: 'Today 14:32:15',
      duration: '0:58',
      title: 'Person in Red - Main Entrance',
      description: 'Individual wearing red shirt entering through main entrance. Clear facial recognition available.',
      confidence: 'High Confidence',
      thumbnail: '/api/placeholder/320/180'
    },
    {
      id: 2,
      camera: 'CAM-04 Parking',
      timestamp: 'Today 14:45:22',
      duration: '1:12',
      title: 'Tracked Person - Hallway',
      description: 'Same individual tracked moving through hallway corridor. Partial view of red clothing.',
      confidence: 'Medium Confidence',
      thumbnail: '/api/placeholder/320/180'
    },
    {
      id: 3,
      camera: 'CAM-02 Exit',
      timestamp: 'Today 14:47:11',
      duration: '0:54',
      title: 'Person Exit - Rear Door',
      description: 'Same person exiting through rear door. Complete journey tracked across cameras.',
      confidence: 'High Confidence',
      thumbnail: '/api/placeholder/320/180'
    },
    {
      id: 4,
      camera: 'CAM-03 Hallway',
      timestamp: 'Today 15:15:23',
      duration: '0:35',
      title: 'Red Vehicle - Parking Lot',
      description: 'Red sedan entering parking area. License plate clearly visible: ABC-123.',
      confidence: 'High Confidence',
      thumbnail: '/api/placeholder/320/180'
    },
    {
      id: 5,
      camera: 'CAM-05',
      timestamp: 'Today 13:45:18',
      duration: '3:45',
      title: 'Person with Red Bag',
      description: 'Individual carrying large red bag entering premises. Object detection active.',
      confidence: 'Medium Confidence',
      thumbnail: '/api/placeholder/320/180'
    },
    {
      id: 6,
      camera: 'CAM-01',
      timestamp: 'Today 11:20:00',
      duration: '0:18',
      title: 'Group in Red Uniforms',
      description: 'Multiple people wearing matching red uniforms entering together. Team identification.',
      confidence: 'High Confidence',
      thumbnail: '/api/placeholder/320/180'
    }
  ];

  const recentSearches = [
    { text: 'Person in red entered the store', time: '2 min ago', icon: RefreshCw },
    { text: 'Vehicle license ABC123', time: '1 hour ago', icon: RefreshCw },
    { text: 'Suspicious activity parking lot', time: '2 hours ago', icon: RefreshCw },
    { text: 'Package delivery main entrance', time: '5 hours ago', icon: RefreshCw }
  ];

  const savedSearches = [
    { text: 'Daily Security Rounds', schedule: 'Checked hourly', icon: Bookmark },
    { text: 'After Hours Activity', schedule: 'Any movement after 6 PM', icon: Bookmark },
    { text: 'Delivery Tracking', schedule: 'Large vehicles at loading dock', icon: Bookmark }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Smart Search</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">AI-Powered Video Search & Analysis</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Summarize
              </Button>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Alerts
              </Button>
              <Button variant="outline" size="sm">
                <Activity className="w-4 h-4 mr-2" />
                Q/A
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Search Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Natural Language Video Search</h2>
            <p className="text-gray-600">Ask questions in plain English and get instant video results powered by AI</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="relative">
              <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm">
                <Search className="w-5 h-5 text-gray-400 ml-4" />
                <Input
                  type="text"
                  placeholder='Ask anything... e.g., "Show all times a person in red entered the store between 2pm and 4pm"'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-0 focus:ring-0 text-base px-4 py-4"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white m-2 px-6">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
            <span className="text-sm text-gray-500">Popular searches:</span>
            {popularSearches.map((search, idx) => (
              <Badge 
                key={idx} 
                variant="secondary" 
                className={`${search.color} cursor-pointer hover:opacity-80 transition-opacity`}
              >
                <search.icon className="w-3 h-3 mr-1" />
                {search.text}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" size="sm">
              <Mic className="w-4 h-4 mr-2" />
              Voice Search
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
            <Button variant="outline" size="sm">
              <Clock className="w-4 h-4 mr-2" />
              Search History
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Smart Filters</CardTitle>
                <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                  Reset All
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Time Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Time Range</Label>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Last 24h
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Last 7d
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Last 30d
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Custom
                    </Button>
                  </div>
                </div>

                {/* Camera Sources */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Camera Sources</Label>
                  <div className="space-y-2">
                    {['CAM-01 Main Entrance', 'CAM-02 Parking', 'CAM-03 Hallway', 'CAM-04 Exit Door'].map((cam) => (
                      <div key={cam} className="flex items-center space-x-2">
                        <Checkbox id={cam} />
                        <Label htmlFor={cam} className="text-sm font-normal cursor-pointer">
                          {cam.split(' ')[0]}
                          <span className="text-gray-500 text-xs ml-1">{cam.split(' ').slice(1).join(' ')}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Object Detection */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Object Detection</Label>
                  <div className="space-y-2">
                    {[
                      { label: 'Person', icon: User },
                      { label: 'Vehicle', icon: Car },
                      { label: 'Package', icon: Package },
                      { label: 'Alert', icon: AlertTriangle }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center space-x-2">
                        <Checkbox id={item.label} />
                        <Label htmlFor={item.label} className="text-sm font-normal cursor-pointer flex items-center">
                          <item.icon className="w-3 h-3 mr-1" />
                          {item.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attributes */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Attributes</Label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="cursor-pointer">Red</Badge>
                      <Badge variant="outline" className="cursor-pointer">Blue</Badge>
                      <Badge variant="outline" className="cursor-pointer">Black</Badge>
                      <Badge variant="outline" className="cursor-pointer">White</Badge>
                      <Badge variant="outline" className="cursor-pointer">Male</Badge>
                      <Badge variant="outline" className="cursor-pointer">Female</Badge>
                      <Badge variant="outline" className="cursor-pointer">Any</Badge>
                    </div>
                  </div>
                </div>

                {/* Age Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Age Range</Label>
                  <div className="space-y-2">
                    {['Child', 'Adult', 'Senior'].map((age) => (
                      <div key={age} className="flex items-center space-x-2">
                        <Checkbox id={age} />
                        <Label htmlFor={age} className="text-sm font-normal cursor-pointer">
                          {age}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity Type */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Activity Type</Label>
                  <div className="space-y-2">
                    {['Walking', 'Running', 'Standing/Loitering', 'Entering', 'Exiting'].map((activity) => (
                      <div key={activity} className="flex items-center space-x-2">
                        <Checkbox id={activity} />
                        <Label htmlFor={activity} className="text-sm font-normal cursor-pointer">
                          {activity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Confidence */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    AI Confidence
                    <span className="text-gray-500 ml-2">75%</span>
                  </Label>
                  <Progress value={75} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Apply Filters Button */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9">
            {/* Search Results Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Search Results</h3>
                <p className="text-sm text-gray-500">2,847 results found</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Sort by:</span>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="confidence">Confidence</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Activity className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Current Search Bar */}
            <Card className="mb-4">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Current search:</span>
                  <span className="text-sm font-medium">"Show all times a person in red entered the store"</span>
                  <Button variant="ghost" size="sm" className="ml-auto p-1 h-auto">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search Results Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {searchResults.map((result) => (
                <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <img 
                      src={result.thumbnail} 
                      alt={result.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-black/70 text-white text-xs">
                      {result.camera}
                    </Badge>
                    <Badge className="absolute top-2 right-2 bg-white/90 text-gray-900 text-xs">
                      {result.confidence === 'High Confidence' ? '95% Match' : '80% Match'}
                    </Badge>
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {result.duration}
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white">
                        <Play className="w-4 h-4 mr-1" />
                        Play from Here
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-sm line-clamp-1">{result.title}</h4>
                        <p className="text-xs text-gray-500">{result.timestamp}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">{result.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant={result.confidence === 'High Confidence' ? 'default' : 'secondary'} className="text-xs">
                        {result.confidence}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <Share2 className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <Save className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Play from Here
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" className="px-8">
                <ChevronDown className="w-4 h-4 mr-2" />
                Load More Results
              </Button>
              <p className="text-sm text-gray-500 mt-2">Showing 6 of 2,847 results</p>
            </div>

            {/* AI Search Insights */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  AI Search Insights
                  <Button variant="link" size="sm" className="ml-auto text-blue-600">
                    ANALYZING
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  {/* Pattern Analysis */}
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Activity className="w-4 h-4 text-purple-600" />
                      </div>
                      <h4 className="font-medium">Pattern Analysis</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      AI detected consistent patterns in the search results. Person in red appears to follow a regular route through the facility.
                    </p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Route Confidence</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <Progress value={87} className="h-1.5" />
                    </div>
                  </div>

                  {/* Time Analysis */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <h4 className="font-medium">Time Analysis</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      Most occurrences happen between 12:00-15:00. Average visit duration is 9 minutes 22 seconds.
                    </p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Peak Activity</span>
                        <span className="font-medium">14:00-15:00</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Avg Duration</span>
                        <span className="font-medium">9m 22s</span>
                      </div>
                    </div>
                  </div>

                  {/* Behavior Profile */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-green-600" />
                      </div>
                      <h4 className="font-medium">Behavior Profile</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      Normal behavior patterns observed. No suspicious activities detected. Regular authorized visitor profile.
                    </p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Safety Score</span>
                        <span className="font-medium text-green-600">98%</span>
                      </div>
                      <Progress value={98} className="h-1.5" />
                    </div>
                  </div>
                </div>

                {/* Related Searches */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-3">Related Searches</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {['Person in blue shirt', 'Same person different day', 'All visitors today', 'Red clothing patterns', 'Entry/exit tracking'].map((search) => (
                      <Button key={search} variant="outline" size="sm" className="justify-start">
                        <Search className="w-3 h-3 mr-2" />
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent and Saved Searches */}
            <div className="grid grid-cols-2 gap-6 mt-6">
              {/* Recent Searches */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Searches</CardTitle>
                  <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                    Clear History
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentSearches.map((search, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <div className="flex items-center gap-3">
                        <search.icon className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm">{search.text}</p>
                          <p className="text-xs text-gray-500">{search.time}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Saved Searches */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Saved Searches</CardTitle>
                  <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                    + Save Current
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {savedSearches.map((search, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <div className="flex items-center gap-3">
                        <search.icon className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium">{search.text}</p>
                          <p className="text-xs text-gray-500">{search.schedule}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Play className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Export & Share Results */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">Export & Share Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Excel
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Export Video
                  </Button>
                  <Button variant="outline" size="sm">
                    <Link className="w-4 h-4 mr-2" />
                    Share Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}