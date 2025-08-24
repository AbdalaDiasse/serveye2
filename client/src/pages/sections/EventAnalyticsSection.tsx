import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EventAnalyticsSection() {
  const [selectedMonth, setSelectedMonth] = useState("2024");
  const [selectedPeriod, setSelectedPeriod] = useState<"7" | "30">("7");

  // Données pour la distribution des événements
  const eventDistribution = {
    today: [
      { hour: "00:00", count: 12 },
      { hour: "04:00", count: 8 },
      { hour: "08:00", count: 25 },
      { hour: "12:00", count: 45 },
      { hour: "16:00", count: 38 },
      { hour: "20:00", count: 22 },
    ],
    week: [
      { day: "Lun", count: 156 },
      { day: "Mar", count: 189 },
      { day: "Mer", count: 145 },
      { day: "Jeu", count: 203 },
      { day: "Ven", count: 178 },
      { day: "Sam", count: 92 },
      { day: "Dim", count: 67 },
    ]
  };

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

  const getMaxValue = (data: { count: number }[]) => {
    return Math.max(...data.map(item => item.count));
  };

  const getBarHeight = (value: number, max: number) => {
    return (value / max) * 100;
  };

  const getEventColor = (events: number) => {
    if (events > 100) return "bg-red-500";
    if (events > 50) return "bg-orange-500";
    if (events > 20) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Distribution des Événements */}
      <Card className="bg-white border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-gray-900">
            Distribution des Évènements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
            </TabsList>
            <TabsContent value="today" className="space-y-4">
              <div className="h-48 flex items-end justify-between gap-2">
                {eventDistribution.today.map((item, index) => {
                  const maxValue = getMaxValue(eventDistribution.today);
                  const height = getBarHeight(item.count, maxValue);
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center justify-end">
                      <div className="text-xs text-gray-600 mb-1">{item.count}</div>
                      <div 
                        className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                      <div className="text-xs text-gray-500 mt-2">{item.hour}</div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="week" className="space-y-4">
              <div className="h-48 flex items-end justify-between gap-2">
                {eventDistribution.week.map((item, index) => {
                  const maxValue = getMaxValue(eventDistribution.week);
                  const height = getBarHeight(item.count, maxValue);
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center justify-end">
                      <div className="text-xs text-gray-600 mb-1">{item.count}</div>
                      <div 
                        className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                      <div className="text-xs text-gray-500 mt-2">{item.day}</div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Événements Mensuels */}
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
          <div className="grid grid-cols-7 gap-1">
            {/* Jours de la semaine */}
            {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
              <div key={index} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            {/* Jours du mois */}
            {Array.from({ length: 31 }, (_, i) => {
              const dayData = monthlyEvents.find(d => d.day === i + 1);
              const events = dayData?.events || 0;
              return (
                <div
                  key={i}
                  className={`
                    relative h-8 flex items-center justify-center text-xs rounded
                    ${events > 0 ? getEventColor(events) + ' text-white' : 'bg-gray-50 text-gray-700'}
                    ${i + 1 === 24 ? 'ring-2 ring-cyan-500' : ''}
                  `}
                >
                  {i + 1}
                  {events > 0 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full text-[8px] flex items-center justify-center">
                      {events > 99 ? '99+' : events}
                    </div>
                  )}
                </div>
              );
            })}
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