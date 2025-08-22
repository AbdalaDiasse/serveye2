import React from "react";
import { ControlPanelSection } from "./sections/ControlPanelSection";
import { EventSummarySection } from "./sections/EventSummarySection";

export const Frame = (): JSX.Element => {
  return (
    <div className="flex w-full min-h-screen bg-white border-2 border-solid border-[#ced4da]">
      <div className="flex w-full bg-[linear-gradient(90deg,rgba(248,250,252,1)_0%,rgba(230,242,255,1)_100%)]">
        <div className="flex w-full">
          <EventSummarySection />
          <ControlPanelSection />
        </div>
      </div>
    </div>
  );
};
