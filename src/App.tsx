import { Toaster } from "@/components/ui/toaster";
// removed Sonner duplicate toaster
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import Distractions from "./pages/Distractions";
import Stats from "./pages/Stats";
import RantFeed from "./pages/RantFeed";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BottomNav from "./components/BottomNav";
import { SlothJumpScare } from "./components/SlothJumpScare";
import { SlothBubble } from "./components/SlothBubble";
import { GlobalCaption } from "./components/GlobalCaption";
import { IdleWatcher } from "./components/IdleWatcher";
import { FailWatcher } from "./components/FailWatcher";
import { NotificationBubble } from "./components/NotificationBubble";

const queryClient = new QueryClient();

const AppShell = () => {
  const location = useLocation();
  const isChromeHidden = ["/", "/login", "/signup"].includes(location.pathname);
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/distractions" element={<Distractions />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/rants" element={<RantFeed />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isChromeHidden && (
        <>
          <BottomNav />
          <SlothJumpScare />
          <SlothBubble />
          <GlobalCaption />
          <IdleWatcher />
          <FailWatcher />
          <NotificationBubble />
        </>
      )}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
