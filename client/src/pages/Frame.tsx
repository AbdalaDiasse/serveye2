import React, { useState } from "react";
import { ControlPanelSection } from "./sections/ControlPanelSection";
import { EventSummarySection } from "./sections/EventSummarySection";
import { CapturePage } from "./CapturePage";
import { ReconnaissancePage } from "./ReconnaissancePage";
import { PersonsDashboard } from "./PersonsDashboard";
import { EventsPage } from "./EventsPage";

export const Frame = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<string>("dashboard");

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
