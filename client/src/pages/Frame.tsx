import React, { useState } from "react";
import { ControlPanelSection } from "./sections/ControlPanelSection";
import { EventSummarySection } from "./sections/EventSummarySection";
import { CapturePage } from "./CapturePage";
import { ReconnaissancePage } from "./ReconnaissancePage";
import { PersonsDashboard } from "./PersonsDashboard";
import { EventsPage } from "./EventsPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export const Frame = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<string>("dashboard");

  // Données pour les graphiques
  const eventDistributionData = [
    { name: "Intrusion", value: 45, color: "#ef4444" },
    { name: "Vol", value: 28, color: "#f97316" },
    { name: "Vandalisme", value: 18, color: "#eab308" },
    { name: "Bagarre", value: 9, color: "#22c55e" }
  ];

  const monthlyEventsData = [
    { month: "Jan", events: 45 },
    { month: "Fév", events: 52 },
    { month: "Mar", events: 48 },
    { month: "Avr", events: 61 },
    { month: "Mai", events: 55 },
    { month: "Jun", events: 67 }
  ];

  const dailyTrendData = [
    { day: 1, events: 12 },
    { day: 5, events: 19 },
    { day: 10, events: 15 },
    { day: 15, events: 25 },
    { day: 20, events: 22 },
    { day: 25, events: 30 },
    { day: 30, events: 28 }
  ];

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <div className="w-full">
            <ControlPanelSection />
            
            {/* Graphiques d'analyse - en bas et à l'extérieur du centre de contrôle */}
            <div className="p-6 bg-gray-50">
              <div className="grid grid-cols-3 gap-6">
                {/* Distribution des Événements - Pie Chart */}
                <Card className="bg-white">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Distribution des Événements
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-blue-600 bg-blue-50">
                        Today
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-slate-500">
                        Week
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={eventDistributionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {eventDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name) => [`${value}`, name]}
                            labelStyle={{ color: '#1f2937' }}
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #e5e7eb', 
                              borderRadius: '8px',
                              fontSize: '12px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    {/* Légende personnalisée */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {eventDistributionData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-xs text-slate-600 truncate">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Événements Mensuels - Histogram */}
                <Card className="bg-white">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Événements Mensuels
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>2024</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyEventsData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="month" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#64748b' }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#64748b' }}
                          />
                          <Tooltip 
                            formatter={(value) => [`${value}`, 'Événements']}
                            labelStyle={{ color: '#1f2937' }}
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #e5e7eb', 
                              borderRadius: '8px',
                              fontSize: '12px'
                            }}
                          />
                          <Bar 
                            dataKey="events" 
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                            fillOpacity={0.8}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Tendance Quotidienne - Line Chart */}
                <Card className="bg-white">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Tendance Quotidienne
                    </CardTitle>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-slate-500">
                        7
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-blue-600 bg-blue-50">
                        30
                      </Button>
                      <span className="text-xs text-slate-500 self-center ml-1">jours</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dailyTrendData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="day" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#64748b' }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#64748b' }}
                          />
                          <Tooltip 
                            formatter={(value) => [`${value}`, 'Événements']}
                            labelFormatter={(label) => `Jour ${label}`}
                            labelStyle={{ color: '#1f2937' }}
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #e5e7eb', 
                              borderRadius: '8px',
                              fontSize: '12px'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="events" 
                            stroke="#10b981" 
                            strokeWidth={3}
                            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      case "capture":
        return <CapturePage />;
      case "reconnaissance":
        return <ReconnaissancePage />;
      case "persons":
        return <PersonsDashboard />;
      case "events":
        return <EventsPage />;
      default:
        return <ControlPanelSection />;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-white border-2 border-solid border-[#ced4da]">
      <div className="flex w-full bg-[linear-gradient(90deg,rgba(248,250,252,1)_0%,rgba(230,242,255,1)_100%)]">
        <div className="flex w-full">
          <EventSummarySection currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
