import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Frame } from "@/pages/Frame";
import ClientAnalysisPage from "@/pages/ClientAnalysisPage";
import VSSAgentPage from "@/pages/VSSAgentPage";
import VSSResumePage from "@/pages/VSSResumePage";
import VSSSearchPage from "@/pages/VSSSearchPage";
import SafetyDashboard from "@/pages/SafetyDashboard";
import BehaviorDashboard from "@/pages/BehaviorDashboard";
import BehaviorEventsPage from "@/pages/BehaviorEventsPage";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={Frame} />
      <Route path="/client-analysis" component={ClientAnalysisPage} />
      <Route path="/vss-agent" component={VSSAgentPage} />
      <Route path="/vss-resume" component={VSSResumePage} />
      <Route path="/vss-search" component={VSSSearchPage} />
      <Route path="/behavior" component={BehaviorDashboard} />
      <Route path="/behavior/events" component={BehaviorEventsPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
