import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const navigationItems = [
  {
    name: "Dashboard",
    icon: "dashboard",
    isActive: false,
  },
  {
    name: "Cameras",
    icon: "/figmaAssets/frame.svg",
    isActive: false,
  },
  {
    name: "Boxes",
    icon: "/figmaAssets/frame-5.svg",
    isActive: false,
  },
  {
    name: "Personnes",
    icon: "/figmaAssets/frame-2.svg",
    hasDropdown: true,
    isActive: false,
    subItems: [
      {
        name: "Dashboard",
        icon: "/figmaAssets/frame-1.svg",
        isActive: false,
      },
      {
        name: "Capture",
        icon: "/figmaAssets/frame-1.svg",
        isActive: false,
      },
      {
        name: "Reconnaissance",
        icon: "/figmaAssets/frame-2.svg",
        isActive: false,
      },
      {
        name: "Analyse Client",
        icon: "/figmaAssets/frame-2.svg",
        isActive: false,
      },
    ],
  },
  {
    name: "Vehicules",
    icon: "/figmaAssets/frame-6.svg",
    isActive: false,
    hasDropdown: true,
    subItems: [
      {
        name: "Dashboard",
        icon: "/figmaAssets/frame-1.svg",
      },
      {
        name: "Captures",
        icon: "/figmaAssets/frame-2.svg",
      },
    ],
  },
  {
    name: "Événements",
    icon: "/figmaAssets/frame-4.svg",
    isActive: false,
  },
  {
    name: "Sites",
    icon: "/figmaAssets/frame-3.svg",
    isActive: false,
  },
];

interface EventSummarySectionProps {
  currentPage?: string;
  setCurrentPage?: (page: string) => void;
}

const renderIcon = (icon: string, className: string) => {
  if (icon === "dashboard") {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{background: 'none'}}>
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
      </svg>
    );
  }
  return (
    <img
      className={className}
      alt="Icon"
      src={icon}
    />
  );
};

export const EventSummarySection = ({ currentPage = "dashboard", setCurrentPage }: EventSummarySectionProps): JSX.Element => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(
    // Ouvrir automatiquement le dropdown approprié selon la page
    (currentPage === "capture" || currentPage === "reconnaissance" || currentPage === "persons" || currentPage === "personnesDashboard" || currentPage === "clientAnalysis") ? "Personnes" : 
    (currentPage === "vehicles" || currentPage === "vehicleCapture") ? "Vehicules" : null
  );

  const toggleDropdown = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  // Effet pour ouvrir automatiquement le dropdown approprié selon la page
  useEffect(() => {
    if (currentPage === "capture" || currentPage === "reconnaissance" || currentPage === "persons" || currentPage === "personnesDashboard" || currentPage === "clientAnalysis") {
      setOpenDropdown("Personnes");
    } else if (currentPage === "vehicles" || currentPage === "vehicleCapture") {
      setOpenDropdown("Vehicules");
    }
  }, [currentPage]);

  const handleNavigation = (page: string) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <aside className="w-72 h-full bg-[#ffffffcc] border-r border-[#ffffff33] shadow-[0px_25px_50px_#00000040] flex flex-col overflow-hidden flex-shrink-0">
      <header className="h-20 border-b border-[#f1f5f980] flex items-center px-6">
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10"
            alt="SYRATE Logo"
            src="/figmaAssets/div-36.svg"
          />
          <div>
            <div className="[font-family:'Inter',Helvetica] font-bold text-[#0d1a2b] text-lg tracking-[0] leading-7">
              SYRATE
            </div>
            <div className="[font-family:'Inter',Helvetica] font-normal text-slate-500 text-xs tracking-[0] leading-4">
              Security Platform
            </div>
          </div>
        </div>
      </header>

      <nav className="flex-1 p-4 overflow-hidden">
        <div className="space-y-2">
          {navigationItems.map((item, index) => {
            const isPersonnesActive = item.name === "Personnes" && (currentPage === "persons" || currentPage === "capture" || currentPage === "reconnaissance" || currentPage === "personnesDashboard" || currentPage === "clientAnalysis");
            const isEventsActive = (item.name === "Évènements" || item.name === "Événements") && currentPage === "events";
            const isVehiclesActive = item.name === "Vehicules" && (currentPage === "vehicles" || currentPage === "vehicleCapture");
            const isOtherActive = currentPage === item.name.toLowerCase() && item.name !== "Personnes" && item.name !== "Évènements" && item.name !== "Événements" && item.name !== "Vehicules";
            
            return (
              <div key={index} className="relative">
                <div 
                  className={`h-12 rounded-xl flex items-center px-4 cursor-pointer transition-all ${
                    isPersonnesActive
                      ? "shadow-md bg-gradient-to-r from-teal-500 to-cyan-500"
                      : isEventsActive
                      ? "shadow-md bg-gradient-to-r from-red-500 to-red-600"
                      : isVehiclesActive
                      ? "shadow-md bg-gradient-to-r from-orange-500 to-orange-600"
                      : isOtherActive
                      ? "shadow-md bg-gradient-to-r from-blue-600 to-blue-500"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    if (item.hasDropdown) {
                      toggleDropdown(item.name);
                      if (item.name === "Personnes" && openDropdown !== item.name) {
                        // Ne pas naviguer automatiquement, seulement ouvrir le dropdown
                      }
                    } else if (item.name === "Évènements" || item.name === "Événements") {
                      handleNavigation("events");
                    } else if (item.name === "Vehicules") {
                      if (openDropdown !== item.name) {
                        handleNavigation("vehicles");
                      }
                    } else {
                      handleNavigation(item.name.toLowerCase());
                    }
                  }}
                >
                  {renderIcon(item.icon, `${(isPersonnesActive || isEventsActive || isVehiclesActive || isOtherActive) ? "w-4 h-4 mr-3 text-white" : "w-4 h-4 mr-3 text-slate-600"}`)}
                  <span className={`[font-family:'Inter',Helvetica] text-base tracking-[0] truncate ${
                    (isPersonnesActive || isEventsActive || isVehiclesActive || isOtherActive)
                      ? 'font-semibold text-white leading-[normal]'
                      : 'font-normal text-slate-600 leading-6'
                  }`}>
                    {item.name}
                  </span>
                  {item.hasDropdown && (
                    <img
                      className={`w-3 h-3 ml-auto transition-transform duration-200 ${
                        openDropdown === item.name ? 'rotate-180' : ''
                      } ${(isPersonnesActive || isVehiclesActive) ? 'filter brightness-0 invert' : ''}`}
                      alt="Dropdown"
                      src="/figmaAssets/frame-7.svg"
                    />
                  )}
                </div>
                {item.subItems && openDropdown === item.name && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem, subIndex) => {
                      const subPageName = item.name === "Vehicules" && subItem.name === "Captures" 
                        ? "vehicleCapture" 
                        : item.name === "Vehicules" && subItem.name === "Dashboard"
                        ? "vehicles"
                        : item.name === "Personnes" && subItem.name === "Dashboard"
                        ? "personnesDashboard"
                        : item.name === "Personnes" && subItem.name === "Analyse Client"
                        ? "clientAnalysis"
                        : subItem.name.toLowerCase();
                      const isSubActive = currentPage === subPageName;
                      const gradientClass = item.name === "Vehicules" 
                        ? 'from-orange-400 to-orange-500' 
                        : 'from-teal-400 to-cyan-400';
                      
                      return (
                        <div
                          key={subIndex}
                          className={`flex items-center px-4 rounded-lg cursor-pointer transition-all duration-200 ${
                            isSubActive
                              ? `h-12 bg-gradient-to-r ${gradientClass} shadow-md`
                              : 'h-10 hover:bg-gray-50'
                          }`}
                          onClick={() => handleNavigation(subPageName)}
                        >
                        <img
                          className="w-3 h-3 mr-3"
                          alt={subItem.name}
                          src={subItem.icon}
                        />
                        <span className={`[font-family:'Inter',Helvetica] text-sm tracking-[0] leading-5 truncate ${
                          isSubActive
                            ? 'font-semibold text-white'
                            : 'font-normal text-slate-500'
                        }`}>
                          {subItem.name}
                        </span>
                      </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      <div className="p-4">
        <Card className="rounded-xl border border-[#10b98133] bg-[linear-gradient(90deg,rgba(16,185,129,0.1)_0%,rgba(6,182,212,0.1)_100%)]">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-90" />
              <span className="[font-family:'Inter',Helvetica] font-semibold text-emerald-500 text-sm tracking-[0] leading-5">
                Système Actif
              </span>
            </div>
            <div className="[font-family:'Inter',Helvetica] font-normal text-slate-600 text-xs tracking-[0] leading-4">
              Surveillance en cours
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};
