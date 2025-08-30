import { Trophy, Clock, TrendingDown, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LagTheSloth } from "@/components/LagTheSloth";
import { ProcrastinationVortex } from "@/components/ProcrastinationVortex";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart, Line, LineChart, XAxis, YAxis } from 'recharts';

const Stats = () => {
  const stats = {
    totalWastedTime: "47h 23m",
    longestStreak: 12,
    tasksAvoided: 134,
    distractionsCompleted: 89,
    procrastinationLevel: 87,
    efficiency: 13
  };

  const achievements = [
    { id: 1, name: "Weekly Slacker", desc: "Avoided work for 7 consecutive days", unlocked: true },
    { id: 2, name: "Master Delayer", desc: "Postponed 50+ tasks", unlocked: true },
    { id: 3, name: "Distraction Connoisseur", desc: "Completed 25 distraction roulettes", unlocked: true },
    { id: 4, name: "Procrastinator of the Month", desc: "Ultimate achievement", unlocked: false },
  ];

  const weeklyData = [
    { day: "Mon", wasted: 6.2, attempted: 1.3 },
    { day: "Tue", wasted: 7.1, attempted: 2.1 },
    { day: "Wed", wasted: 8.3, attempted: 0.5 },
    { day: "Thu", wasted: 5.9, attempted: 1.8 },
    { day: "Fri", wasted: 9.2, attempted: 0.3 },
    { day: "Sat", wasted: 10.1, attempted: 0.1 },
    { day: "Sun", wasted: 8.7, attempted: 0.2 },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20">
      <ProcrastinationVortex />
      
      <div className="relative z-10 p-4 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6 pt-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Failure Analytics</h1>
            <p className="text-sm text-muted-foreground">Your impressive track record</p>
          </div>
          <LagTheSloth 
            mood="judge" 
          />
        </div>

        {/* Fake Dashboard */}
        <Card className="p-4 mb-6 bg-card/80 backdrop-blur-sm border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Fake Productivity Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie */}
            <ChartContainer config={{ procrastination: { label: 'Procrastination', color: '#FF6EC7' }, work: { label: '"Productivity"', color: '#ccc' }}}>
              <PieChart>
                <Pie dataKey="value" data={[{ name: 'procrastination', value: 97 }, { name: 'work', value: 3 }]} cx="50%" cy="50%" outerRadius={80} fill="#FF6EC7" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            {/* Flat line */}
            <ChartContainer config={{ vibe: { label: 'Vibe', color: '#39FF14' }}}>
              <LineChart data={[{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:4,y:0},{x:5,y:0}]}>
                <XAxis dataKey="x" hide /><YAxis hide domain={[0,1]} />
                <Line type="monotone" dataKey="y" stroke="#39FF14" dot={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ChartContainer>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">Procrastination = <span className="text-pink-400 font-bold">97%</span> (scientifically accurate)</p>
        </Card>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Wasted</p>
                <p className="text-lg font-bold text-destructive">{stats.totalWastedTime}</p>
              </div>
              <Clock className="h-5 w-5 text-destructive" />
            </div>
          </Card>

          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Longest Streak</p>
                <p className="text-lg font-bold text-accent">{stats.longestStreak} days</p>
              </div>
              <Trophy className="h-5 w-5 text-accent" />
            </div>
          </Card>

          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Tasks Avoided</p>
                <p className="text-lg font-bold text-warning">{stats.tasksAvoided}</p>
              </div>
              <TrendingDown className="h-5 w-5 text-warning" />
            </div>
          </Card>

          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Efficiency</p>
                <p className="text-lg font-bold text-muted-foreground">{stats.efficiency}%</p>
              </div>
              <Award className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>
        </div>

        {/* Procrastination Level */}
        <Card className="p-4 mb-6 bg-card/80 backdrop-blur-sm border-border/50">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground">Procrastination Level</h3>
              <span className="text-2xl font-bold text-accent">{stats.procrastinationLevel}%</span>
            </div>
            <Progress value={stats.procrastinationLevel} className="h-3" />
            <p className="text-xs text-muted-foreground text-center">
              Almost professional level! Keep it up.
            </p>
          </div>
        </Card>

        {/* Weekly Chart */}
        <Card className="p-4 mb-6 bg-card/80 backdrop-blur-sm border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">This Week's Masterpiece</h3>
          <div className="space-y-3">
            {weeklyData.map((day) => (
              <div key={day.day} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{day.day}</span>
                  <span className="text-destructive font-medium">{day.wasted}h wasted</span>
                </div>
                <div className="relative h-2 bg-muted rounded-full">
                  <div 
                    className="absolute top-0 left-0 h-full bg-destructive rounded-full"
                    style={{ width: `${(day.wasted / 12) * 100}%` }}
                  />
                  <div 
                    className="absolute top-0 h-full bg-accent rounded-full"
                    style={{ 
                      left: `${(day.wasted / 12) * 100}%`,
                      width: `${(day.attempted / 12) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-3">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-destructive rounded mr-2"></div>
              Procrastination
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-accent rounded mr-2"></div>
              "Productivity"
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Hall of Shame</h3>
          <div className="grid grid-cols-1 gap-3">
            {['5 hrs Scrolling','Certified Sleep Master','Unlocked: Crying At 2 AM'].map((name, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 rounded-lg border bg-muted/30 border-border/30">
                <div className="w-8 h-8 rounded-full bg-white shadow-inner" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">Shareable, not useful.</p>
                </div>
                <Badge variant="secondary" className="text-xs">Unlocked</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Stats;
