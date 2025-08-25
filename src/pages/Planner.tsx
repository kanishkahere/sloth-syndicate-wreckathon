import { useState } from "react";
import { Calendar, Plus, Clock, Coffee } from "lucide-react";
import { SlothButton } from "@/components/ui/sloth-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LagTheSloth } from "@/components/LagTheSloth";
import { ProcrastinationVortex } from "@/components/ProcrastinationVortex";

const Planner = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Study for finals", time: "9:00 AM", status: "avoided", type: "work" },
    { id: 2, text: "Coffee break", time: "10:30 AM", status: "completed", type: "break" },
    { id: 3, text: "Reorganize desktop icons", time: "11:00 AM", status: "in-progress", type: "distraction" },
    { id: 4, text: "Lunch break", time: "1:00 PM", status: "scheduled", type: "break" },
    { id: 5, text: "Actually do work", time: "2:00 PM", status: "delusional", type: "work" },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-accent/20 text-accent";
      case "avoided": return "bg-destructive/20 text-destructive";
      case "in-progress": return "bg-warning/20 text-warning";
      case "delusional": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "break": return <Coffee className="h-4 w-4" />;
      case "distraction": return <Clock className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20">
      <ProcrastinationVortex />
      
      <div className="relative z-10 p-4 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6 pt-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Schedule the Break</h1>
            <p className="text-sm text-muted-foreground">Breaks first, work... maybe later</p>
          </div>
          <LagTheSloth 
            mood="judge" 
          />
        </div>

        <Card className="p-4 mb-6 bg-card/80 backdrop-blur-sm border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Today's "Schedule"</h2>
            <SlothButton variant="ghost" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Regret
            </SlothButton>
          </div>
          
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/30">
                <div className="flex items-center space-x-3">
                  {getTypeIcon(task.type)}
                  <div>
                    <p className="text-sm font-medium text-foreground">{task.text}</p>
                    <p className="text-xs text-muted-foreground">{task.time}</p>
                  </div>
                </div>
                <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                  {task.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-3">Procrastination Insights</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• You've scheduled 3 breaks and 2 "work" sessions</p>
            <p>• Optimistic work-to-procrastination ratio: 40/60</p>
            <p>• Probability of following this schedule: 12%</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Planner;