import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EventAnalyticsSection() {
  const [selectedMonth, setSelectedMonth] = useState("2024");
  const [selectedPeriod, setSelectedPeriod] = useState<"7" | "30">("7");

  // Données pour le pie chart de distribution des événements
  const eventDistribution = [
    { name: "Intrusion", value: 245, color: "#ef4444" },
    { name: "EPI manquant", value: 189, color: "#f97316" },
    { name: "Fumée/Incendie", value: 156, color: "#eab308" },
    { name: "Comportement", value: 123, color: "#22c55e" },
    { name: "Zone Monitoring", value: 89, color: "#06b6d4" },
    { name: "Autres", value: 67, color: "#8b5cf6" },
  ];

  // Données pour le calendrier mensuel
  const monthlyEvents = [
    { day: 1, events: 23 },
    { day: 2, events: 45 },
    { day: 3, events: 12 },
    { day: 4, events: 67 },
    { day: 5, events: 34 },
    { day: 6, events: 56 },
    { day: 7, events: 89 },
    { day: 8, events: 45 },
    { day: 9, events: 23 },
    { day: 10, events: 78 },
    { day: 11, events: 34 },
    { day: 12, events: 90 },
    { day: 13, events: 56 },
    { day: 14, events: 123 },
    { day: 15, events: 67 },
    { day: 16, events: 45 },
    { day: 17, events: 89 },
    { day: 18, events: 34 },
    { day: 19, events: 78 },
    { day: 20, events: 56 },
    { day: 21, events: 102 },
    { day: 22, events: 89 },
    { day: 23, events: 145 },
    { day: 24, events: 167 },
    { day: 25, events: 89 },
    { day: 26, events: 56 },
    { day: 27, events: 78 },
    { day: 28, events: 45 },
    { day: 29, events: 67 },
    { day: 30, events: 89 },
    { day: 31, events: 34 },
  ];

  // Données pour la tendance quotidienne
  const dailyTrend = {
    "7": [
      { day: "Lun", count: 156 },
      { day: "Mar", count: 189 },
      { day: "Mer", count: 145 },
      { day: "Jeu", count: 203 },
      { day: "Ven", count: 178 },
      { day: "Sam", count: 92 },
      { day: "Dim", count: 67 },
    ],
    "30": [
      { day: "1", count: 145 },
      { day: "5", count: 178 },
      { day: "10", count: 203 },
      { day: "15", count: 167 },
      { day: "20", count: 189 },
      { day: "25", count: 156 },
      { day: "30", count: 134 },
    ]
  };

  const total = eventDistribution.reduce((sum, item) => sum + item.value, 0);
  
  const getMaxValue = (data: { count: number }[]) => {
    return Math.max(...data.map(item => item.count));
  };

  const getBarHeight = (value: number, max: number) => {
    return (value / max) * 100;
  };

  const calculatePieSlices = () => {
    let currentAngle = -90; // Start from top
    return eventDistribution.map(item => {
      const percentage = (item.value / total) * 100;
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const startRadians = (startAngle * Math.PI) / 180;
      const endRadians = (endAngle * Math.PI) / 180;
      
      const x1 = 50 + 40 * Math.cos(startRadians);
      const y1 = 50 + 40 * Math.sin(startRadians);
      const x2 = 50 + 40 * Math.cos(endRadians);
      const y2 = 50 + 40 * Math.sin(endRadians);
      
      return {
        ...item,
        path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
        percentage: percentage.toFixed(1)
      };
    });
  };

  const getEventColor = (events: number) => {
    if (events > 100) return "bg-red-500";
    if (events > 50) return "bg-orange-500";
    if (events > 20) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Distribution des Événements - Pie Chart */}
      <Card className="bg-white border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-gray-900">
            Distribution des Évènements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Pie Chart */}
            <div className="flex justify-center mb-4">
              <svg width="200" height="200" viewBox="0 0 100 100">
                {calculatePieSlices().map((slice, index) => (
                  <path
                    key={index}
                    d={slice.path}
                    fill={slice.color}
                    stroke="white"
                    strokeWidth="0.5"
                  />
                ))}
              </svg>
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-2 gap-2">
              {eventDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1">
                    <div className="text-xs text-gray-700">{item.name}</div>
                    <div className="text-xs font-semibold text-gray-900">
                      {item.value} ({((item.value / total) * 100).toFixed(1)}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Événements Mensuels - Histogram */}
      <Card className="bg-white border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900">
              Évènements Mensuels
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-20 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-end justify-between gap-0.5">
            {monthlyEvents.slice(0, 31).map((item, index) => {
              const maxValue = Math.max(...monthlyEvents.map(d => d.events));
              const height = (item.events / maxValue) * 100;
              let barColor = '#22c55e'; // green
              if (item.events > 100) barColor = '#ef4444'; // red
              else if (item.events > 50) barColor = '#f97316'; // orange
              else if (item.events > 20) barColor = '#eab308'; // yellow
              
              return (
                <div 
                  key={index} 
                  className="flex-1 flex flex-col items-center justify-end group relative"
                >
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                    Jour {item.day}: {item.events} événements
                  </div>
                  <div 
                    className="w-full rounded-t transition-all duration-300 hover:opacity-80"
                    style={{ 
                      height: `${height}%`,
                      backgroundColor: barColor,
                      minHeight: '2px'
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">1</span>
            <span className="text-xs text-gray-500">15</span>
            <span className="text-xs text-gray-500">31</span>
          </div>
        </CardContent>
      </Card>

      {/* Tendance Quotidienne */}
      <Card className="bg-white border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900">
              Tendance Quotidienne
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant={selectedPeriod === "7" ? "default" : "outline"}
                size="sm"
                className="h-7 px-3"
                onClick={() => setSelectedPeriod("7")}
              >
                7 jours
              </Button>
              <Button
                variant={selectedPeriod === "30" ? "default" : "outline"}
                size="sm"
                className="h-7 px-3"
                onClick={() => setSelectedPeriod("30")}
              >
                30 jours
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-48 relative">
            {/* Grille horizontale */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-gray-100" />
              ))}
            </div>
            
            {/* Graphique en ligne */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>
              {(() => {
                const data = dailyTrend[selectedPeriod];
                const maxValue = getMaxValue(data);
                const points = data.map((item, index) => {
                  const x = (index / (data.length - 1)) * 100;
                  const y = 100 - (item.count / maxValue) * 100;
                  return `${x},${y}`;
                }).join(' ');
                
                const areaPoints = `0,100 ${points} 100,100`;
                
                return (
                  <>
                    <polygon
                      points={areaPoints}
                      fill="url(#gradient)"
                    />
                    <polyline
                      points={points}
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2"
                    />
                    {data.map((item, index) => {
                      const x = (index / (data.length - 1)) * 100;
                      const y = 100 - (item.count / maxValue) * 100;
                      return (
                        <circle
                          key={index}
                          cx={`${x}%`}
                          cy={`${y}%`}
                          r="3"
                          fill="#06b6d4"
                        />
                      );
                    })}
                  </>
                );
              })()}
            </svg>
            
            {/* Labels de l'axe X */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between mt-2">
              {dailyTrend[selectedPeriod].map((item, index) => (
                <div key={index} className="text-xs text-gray-500">
                  {item.day}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}