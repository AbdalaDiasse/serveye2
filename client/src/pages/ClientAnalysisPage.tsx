import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, LogIn, LogOut, Star, UserX, Activity, TrendingUp, User, Eye, MapPin } from "lucide-react";

export default function ClientAnalysisPage() {
  // Sample data for charts
  const customerTimeData = [
    { time: '09:00', count: 45 },
    { time: '10:00', count: 78 },
    { time: '11:00', count: 125 },
    { time: '12:00', count: 189 },
    { time: '13:00', count: 156 },
    { time: '14:00', count: 234 },
    { time: '15:00', count: 198 },
    { time: '16:00', count: 167 },
    { time: '17:00', count: 145 },
    { time: '18:00', count: 89 }
  ];

  const ageDistributionData = [
    { range: '18-25', count: 156, percentage: 25 },
    { range: '26-40', count: 218, percentage: 35 },
    { range: '41-60', count: 175, percentage: 28 },
    { range: '60+', count: 75, percentage: 12 }
  ];

  const zoneData = [
    { zone: 'Entrée', count: 234 },
    { zone: 'Électronique', count: 189 },
    { zone: 'Vêtements', count: 167 },
    { zone: 'Alimentation', count: 145 },
    { zone: 'Caisse', count: 198 }
  ];

  const vipList = [
    { name: 'Marie Dubois', time: '14:32', confidence: 98 },
    { name: 'Jean Martin', time: '14:28', confidence: 95 },
    { name: 'Sophie Laurent', time: '14:15', confidence: 97 },
    { name: 'Pierre Bernard', time: '14:02', confidence: 96 }
  ];

  const blacklistAlerts = [
    { name: 'Alex Durand', time: '14:45', location: 'Zone Électronique', risk: 'High' },
    { name: 'Sarah Mills', time: '13:58', location: 'Entrée Principale', risk: 'Medium' },
    { name: 'Tom Wilson', time: '13:42', location: 'Zone Vêtements', risk: 'High' }
  ];

  const maxCount = Math.max(...customerTimeData.map(d => d.count));
  const maxZoneCount = Math.max(...zoneData.map(d => d.count));
  const maxAge = Math.max(...ageDistributionData.map(d => d.count));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 [font-family:'Inter',Helvetica]">
              Analyse Client
            </h1>
            <p className="text-gray-600 [font-family:'Inter',Helvetica]">
              Surveillance et analyse comportementale des clients
            </p>
          </div>
          <Badge className="bg-blue-500/10 text-blue-600 text-sm">
            ANALYTICS DASHBOARD
          </Badge>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-4 gap-6">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 [font-family:'Inter',Helvetica]">
                    Visiteurs Aujourd'hui
                  </p>
                  <p className="text-3xl font-bold text-gray-900 [font-family:'Inter',Helvetica]">
                    1,234
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 [font-family:'Inter',Helvetica]">
                    VIP Détectés
                  </p>
                  <p className="text-3xl font-bold text-gray-900 [font-family:'Inter',Helvetica]">
                    23
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 [font-family:'Inter',Helvetica]">
                    Temps Moyen (min)
                  </p>
                  <p className="text-3xl font-bold text-gray-900 [font-family:'Inter',Helvetica]">
                    8.5
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 [font-family:'Inter',Helvetica]">
                    Entrées/Sorties
                  </p>
                  <p className="text-3xl font-bold text-gray-900 [font-family:'Inter',Helvetica]">
                    892/867
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <LogIn className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6">
          {/* Customer Flow Chart */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 [font-family:'Inter',Helvetica]">
                Flux Client dans le Temps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 relative">
                <div className="absolute inset-0 flex items-end justify-between space-x-1">
                  {customerTimeData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-blue-500 rounded-t-sm transition-all hover:bg-blue-600"
                        style={{
                          height: `${(item.count / maxCount) * 100}%`,
                          minHeight: '4px'
                        }}
                      />
                      <span className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-center">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Pic: 14h00 (234 clients)</p>
              </div>
            </CardContent>
          </Card>

          {/* Age Distribution */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 [font-family:'Inter',Helvetica]">
                Distribution par Âge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 relative">
                <div className="absolute inset-0 flex items-end justify-between space-x-2">
                  {ageDistributionData.map((item, index) => {
                    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="text-xs text-gray-600 mb-1 font-medium">
                          {item.count}
                        </div>
                        <div
                          className={`w-full ${colors[index]} rounded-t-sm transition-all hover:opacity-80`}
                          style={{
                            height: `${(item.count / maxAge) * 100}%`,
                            minHeight: '8px'
                          }}
                        />
                        <span className="text-xs text-gray-600 mt-2 font-medium">
                          {item.range}
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.percentage}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gender Distribution */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 [font-family:'Inter',Helvetica]">
                Répartition par Genre
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center">
                <div className="relative">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    {/* Male slice (52%) */}
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="18"
                      strokeDasharray="147 283"
                      strokeDashoffset="0"
                      opacity="0.8"
                      className="transition-all hover:opacity-100"
                    />
                    {/* Female slice (48%) */}
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="18"
                      strokeDasharray="136 283"
                      strokeDashoffset="-147"
                      opacity="0.8"
                      className="transition-all hover:opacity-100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">52/48</div>
                      <div className="text-sm text-gray-600">H/F</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Hommes 52%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Femmes 48%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Row */}
        <div className="grid grid-cols-3 gap-6">
          {/* Zone Distribution */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 [font-family:'Inter',Helvetica]">
                Personnes par Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {zoneData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-medium min-w-0 flex-1">
                      {item.zone}
                    </span>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full transition-all"
                          style={{ width: `${(item.count / maxZoneCount) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 min-w-0">
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Heatmap */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 [font-family:'Inter',Helvetica]">
                Heatmap Magasin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gray-100 rounded-lg p-4 relative">
                <div className="grid grid-cols-8 grid-rows-6 gap-1 h-full">
                  {Array.from({ length: 48 }, (_, i) => {
                    const intensity = Math.random();
                    let bgColor = 'bg-blue-100';
                    if (intensity > 0.8) bgColor = 'bg-red-400';
                    else if (intensity > 0.6) bgColor = 'bg-orange-400';
                    else if (intensity > 0.4) bgColor = 'bg-yellow-400';
                    else if (intensity > 0.2) bgColor = 'bg-green-400';
                    
                    return (
                      <div key={i} className={`${bgColor} rounded-sm transition-all hover:scale-110`} />
                    );
                  })}
                </div>
                <div className="absolute bottom-2 left-4 text-xs text-gray-600">Forte affluence</div>
                <div className="absolute top-2 right-4 text-xs text-gray-600">Faible affluence</div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Trajectories */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 [font-family:'Inter',Helvetica]">
                Trajectoires Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gray-100 rounded-lg p-4 relative">
                <div className="absolute inset-4 border-2 border-gray-300 rounded border-dashed"></div>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <path 
                    d="M10 20 Q30 15 50 25 Q70 35 85 30" 
                    stroke="#ef4444" 
                    strokeWidth="2" 
                    fill="none" 
                    strokeDasharray="3,3"
                    opacity="0.8"
                  />
                  <path 
                    d="M15 80 Q40 70 60 75 Q80 80 90 70" 
                    stroke="#3b82f6" 
                    strokeWidth="2" 
                    fill="none" 
                    strokeDasharray="3,3"
                    opacity="0.8"
                  />
                  <path 
                    d="M20 50 Q45 45 65 55 Q80 65 85 50" 
                    stroke="#10b981" 
                    strokeWidth="2" 
                    fill="none" 
                    strokeDasharray="3,3"
                    opacity="0.8"
                  />
                  <circle cx="10" cy="20" r="3" fill="#ef4444" opacity="0.8" />
                  <circle cx="15" cy="80" r="3" fill="#3b82f6" opacity="0.8" />
                  <circle cx="20" cy="50" r="3" fill="#10b981" opacity="0.8" />
                </svg>
                <div className="absolute bottom-2 left-4 text-xs text-gray-600">Points d'entrée</div>
                <div className="absolute top-2 right-4 text-xs text-gray-600">Parcours populaires</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recognition Lists Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Latest VIP */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 [font-family:'Inter',Helvetica]">
                  Derniers VIP Reconnus
                </CardTitle>
                <Badge className="bg-yellow-500/10 text-yellow-600">
                  VIP
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vipList.map((vip, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 [font-family:'Inter',Helvetica]">
                          {vip.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Détecté à {vip.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {vip.confidence}%
                      </p>
                      <p className="text-xs text-gray-600">Confiance</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Latest Blacklist */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 [font-family:'Inter',Helvetica]">
                  Alertes Blacklist
                </CardTitle>
                <Badge className="bg-red-500/10 text-red-600">
                  ALERTE
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blacklistAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center">
                        <UserX className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 [font-family:'Inter',Helvetica]">
                          {alert.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {alert.location} - {alert.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`text-xs ${
                        alert.risk === 'High' 
                          ? 'bg-red-500/10 text-red-600' 
                          : 'bg-orange-500/10 text-orange-600'
                      }`}>
                        {alert.risk}
                      </Badge>
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