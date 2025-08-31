import { useState } from "react";
import { Shuffle, Timer, Trophy, Zap } from "lucide-react";
import { SlothButton } from "@/components/ui/sloth-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DistractionRoulette } from "@/components/DistractionRoulette";
import { LagTheSloth } from "@/components/LagTheSloth";
import { ProcrastinationVortex } from "@/components/ProcrastinationVortex";

const Distractions = () => {
  const [showRoulette, setShowRoulette] = useState(false);
  const [stats] = useState({
    todayWasted: "2h 34m",
    weekStreak: 7,
    topDistraction: "Desktop organization",
    efficiency: "12%"
  });

  const recentDistractions = [
    { id: 1, text: "Sorted bookmarks by chaos", duration: "23m", completed: true },
    { id: 2, text: "Made a meme about procrastination", duration: "18m", completed: true },
    { id: 3, text: "Reorganized phone apps by color", duration: "31m", completed: false },
    { id: 4, text: "Watched productivity videos", duration: "45m", completed: true },
  ];

  return (
    <div className="min-h-screen bg-background relative pb-20">
      <ProcrastinationVortex />
      
      <div className="relative z-10 p-4 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6 pt-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Distraction Central</h1>
            <p className="text-sm text-muted-foreground">Because productivity is overrated</p>
          </div>
          <LagTheSloth 
            mood="smug" 
          />
        </div>

        {/* Main Roulette Card */}
        <Card className="p-6 mb-6 bg-card/80 backdrop-blur-sm border-border/50">
          <div className="text-center">
            <Shuffle className="h-12 w-12 text-accent mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Distraction Roulette</h2>
            <p className="text-sm text-muted-foreground mb-4">Spin for scientifically curated chaos</p>
            
            <SlothButton 
              className="w-full text-lg py-3"
              onClick={() => setShowRoulette(true)}
            >
              <Zap className="h-5 w-5 mr-2" />
              Embrace the Chaos
            </SlothButton>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Today Wasted</p>
                <p className="text-lg font-bold text-accent">{stats.todayWasted}</p>
              </div>
              <Timer className="h-5 w-5 text-accent" />
            </div>
          </Card>
          
          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Streak</p>
                <p className="text-lg font-bold text-accent">{stats.weekStreak} days</p>
              </div>
              <Trophy className="h-5 w-5 text-accent" />
            </div>
          </Card>
        </div>

        {/* Recent Distractions */}
        <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Masterpieces</h3>
          <div className="space-y-3">
            {recentDistractions.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/30">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.duration}</p>
                </div>
                <Badge variant={item.completed ? "default" : "secondary"} className="text-xs">
                  {item.completed ? "Nailed it" : "Gave up"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievement */}
        <Card className="p-4 mt-4 bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
          <div className="flex items-center space-x-3">
            <Trophy className="h-6 w-6 text-accent" />
            <div>
              <p className="text-sm font-semibold text-foreground">Achievement Unlocked!</p>
              <p className="text-xs text-muted-foreground">Master of Avoiding Things: Level 47</p>
            </div>
          </div>
        </Card>
      </div>

      {showRoulette && (
        <DistractionRoulette autoSpin onComplete={() => setShowRoulette(false)} />
      )}
    </div>
  );
};

export default Distractions;
