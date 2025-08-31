import { Home, Calendar, Shuffle, BarChart3, MessageSquare, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { LagTheSloth } from "./LagTheSloth";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Calendar, label: "Planner", path: "/planner" },
    { icon: Shuffle, label: "Chaos", path: "/distractions" },
    { icon: BarChart3, label: "Stats", path: "/stats" },
    { icon: MessageSquare, label: "Rants", path: "/rants" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const isActive = (path: string) => {
    if (path === "/home") {
      return location.pathname === "/home";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border/50 z-50">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                isActive(path)
                  ? "text-accent bg-accent/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
          
          {/* Mascot Button */}
          <div className="relative">
            <LagTheSloth 
              mood="smug" 
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
