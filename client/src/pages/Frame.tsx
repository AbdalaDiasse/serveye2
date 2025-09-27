import React, { useState } from "react";
import { ControlPanelSection } from "./sections/ControlPanelSection";
import { EventSummarySection } from "./sections/EventSummarySection";
import { CapturePage } from "./CapturePage";
import { ReconnaissancePage } from "./ReconnaissancePage";
import { PersonsDashboard } from "./PersonsDashboard";
import { PersonnesDashboardPage } from "./PersonnesDashboardPage";
import { EventsPage } from "./EventsPage";
import { VehiclesDashboard } from "./VehiclesDashboard";
import { VehicleCapturePage } from "./VehicleCapturePage";
import ClientAnalysisPage from "./ClientAnalysisPage";
import VSSAgentPage from "./VSSAgentPage";
import VSSResumePage from "./VSSResumePage";
import VSSSearchPage from "./VSSSearchPage";
import SafetyDashboard from "./SafetyDashboard";
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
        return <ControlPanelSection />;
      case "capture":
        return <CapturePage />;
      case "reconnaissance":
        return <ReconnaissancePage />;
      case "persons":
        return <PersonsDashboard />;
      case "personnesDashboard":
        return <PersonnesDashboardPage />;
      case "events":
        return <EventsPage />;
      case "vehicles":
        return <VehiclesDashboard />;
      case "vehicleCapture":
        return <VehicleCapturePage />;
      case "clientAnalysis":
        return <ClientAnalysisPage />;
      case "vssAgent":
        return <VSSAgentPage />;
      case "vssSummarize":
        return <VSSResumePage />;
      case "vssSearch":
        return <VSSSearchPage />;
      case "vssAlerts":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">VSS Alertes</h1>
          <p>Page des alertes VSS en cours de développement...</p>
        </div>;
      case "vssQA":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">VSS Q/R</h1>
          <p>Page de questions/réponses VSS en cours de développement...</p>
        </div>;
      case "safetyDashboard":
        return <SafetyDashboard />;
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
