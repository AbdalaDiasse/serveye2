import React, { useState, useEffect } from "react";
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
import SafetyEventsPage from "./SafetyEventsPage";
import BehaviorDashboard from "./BehaviorDashboard";
import BehaviorEventsPage from "./BehaviorEventsPage";
import PersonnelDashboard from "./PersonnelDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Search, Settings, Bell, Moon, Sun } from "lucide-react";

export const Frame = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<string>("dashboard");
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Apply theme to document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case "dashboard":
        return { title: "Dashboard", subtitle: "Main system overview" };
      case "capture":
        return { title: "Capture", subtitle: "Person capture and identification" };
      case "reconnaissance":
        return { title: "Reconnaissance", subtitle: "Person recognition system" };
      case "persons":
        return { title: "Personnel Dashboard", subtitle: "Personnel monitoring and management" };
      case "personnesDashboard":
        return { title: "Personnel Dashboard", subtitle: "Personnel monitoring and management" };
      case "clientAnalysis":
        return { title: "Analyse Client", subtitle: "Client analysis and insights" };
      case "events":
        return { title: "Événements", subtitle: "Event management and tracking" };
      case "vehicles":
        return { title: "Vehicules", subtitle: "Vehicle monitoring system" };
      case "vehicleCapture":
        return { title: "Vehicle Capture", subtitle: "Vehicle detection and capture" };
      case "vssAgent":
        return { title: "VSS Agent", subtitle: "AI-powered video analysis" };
      case "vssSummarize":
        return { title: "VSS Résumé", subtitle: "Video summary generation" };
      case "vssSearch":
        return { title: "VSS Recherche", subtitle: "Intelligent video search" };
      case "vssAlerts":
        return { title: "VSS Alertes", subtitle: "Video security alerts" };
      case "vssQA":
        return { title: "VSS Q/R", subtitle: "Video question and response" };
      case "safetyDashboard":
        return { title: "Safety Dashboard", subtitle: "Real-time safety violation monitoring" };
      case "safetyEvents":
        return { title: "Safety Events", subtitle: "Safety event management" };
      case "behaviorDashboard":
        return { title: "Behavior Dashboard", subtitle: "Real-time behavior monitoring" };
      case "behaviorEvents":
        return { title: "Behavior Events", subtitle: "Behavior event management" };
      case "sites":
        return { title: "Sites", subtitle: "Site management and monitoring" };
      case "cameras":
        return { title: "Cameras", subtitle: "Camera system management" };
      case "boxes":
        return { title: "Boxes", subtitle: "Detection box management" };
      default:
        return { title: "Dashboard", subtitle: "System overview" };
    }
  };

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
        return <PersonnelDashboard />;
      case "personnesDashboard":
        return <PersonnelDashboard />;
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
      case "safetyEvents":
        return <SafetyEventsPage />;
      case "behaviorDashboard":
        return <BehaviorDashboard />;
      case "behaviorEvents":
        return <BehaviorEventsPage />;
      default:
        return <ControlPanelSection />;
    }
  };

  const pageInfo = getPageTitle();
  
  return (
    <div className="flex flex-col w-full min-h-screen bg-white dark:bg-gray-900 border-2 border-solid border-[#ced4da] dark:border-gray-700">
      {/* Top Header Bar */}
      <header className="w-full bg-white dark:bg-gray-800 border-b border-[#ced4da] dark:border-gray-700 flex items-center">
        {/* Left side - SYRATE branding - matches sidebar width */}
        <div className={`${isSidebarCollapsed ? 'w-16' : 'w-60'} flex items-center justify-center px-6 py-3 border-r border-gray-300 dark:border-gray-600 transition-all duration-300`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0070F3] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            {!isSidebarCollapsed && (
              <div>
                <div className="font-bold text-gray-800 dark:text-gray-200 text-base">SYRATE</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Safety Module</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Center - Page title with hamburger menu */}
        <div className="flex-1 px-6 py-3 flex items-center gap-4">
          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors w-6 h-6 flex items-center justify-center flex-shrink-0"
            data-testid="button-toggle-sidebar"
          >
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div>
            <h1 className="text-xl font-semibold text-[#0070F3] dark:text-blue-400">{pageInfo.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{pageInfo.subtitle}</p>
          </div>
        </div>

        {/* Right side - Search and user controls */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search violations..."
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg w-64 text-sm border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0070F3] dark:focus:ring-blue-400 focus:border-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            <Search className="w-4 h-4 text-gray-400 dark:text-gray-500 absolute right-3 top-2.5" />
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            data-testid="button-toggle-theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <Settings className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <div className="flex items-center gap-3 border-l border-gray-300 dark:border-gray-600 pl-4">
            <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full" />
            <div className="text-sm">
              <div className="font-medium text-gray-700 dark:text-gray-300">Safety Admin</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Safety Manager</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex flex-1 bg-[linear-gradient(90deg,rgba(248,250,252,1)_0%,rgba(230,242,255,1)_100%)] dark:bg-[linear-gradient(90deg,rgba(30,41,59,1)_0%,rgba(15,23,42,1)_100%)]">
        <div className="flex w-full">
          <EventSummarySection 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            isCollapsed={isSidebarCollapsed}
          />
          <div className="flex-1 border-l border-gray-300 dark:border-gray-600">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
