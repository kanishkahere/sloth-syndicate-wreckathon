import { useState } from "react";
import { Settings as SettingsIcon, Volume2, VolumeX, Zap, Shield, Palette, Bell } from "lucide-react";
import { SlothButton } from "@/components/ui/sloth-button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { LagTheSloth } from "@/components/LagTheSloth";
import { ProcrastinationVortex } from "@/components/ProcrastinationVortex";

const Settings = () => {
  const [settings, setSettings] = useState({
    heckleLevel: 2, // 1: Chill, 2: Medium, 3: Feral
    soundEnabled: true,
    reducedMotion: false,
    familyFriendly: false,
    pettyMode: true,
    brutalHonesty: false,
    notifications: true,
    darkMode: true
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const getHeckleLevelText = (level: number) => {
    switch (level) {
      case 1: return "Chill (Still judging you)";
      case 2: return "Medium (Peak performance)";
      case 3: return "Feral (No mercy)";
      default: return "Medium";
    }
  };

  const settingsSections = [
    {
      title: "Personality",
      icon: Zap,
      items: [
        {
          key: "heckleLevel",
          label: "Roast Intensity",
          type: "slider",
          description: "How much do you want to be judged?",
          value: settings.heckleLevel,
          min: 1,
          max: 3,
          step: 1
        },
        {
          key: "pettyMode",
          label: "Petty Mode",
          type: "switch",
          description: "Extra passive-aggressive comments",
          value: settings.pettyMode
        },
        {
          key: "brutalHonesty",
          label: "Brutal Honesty",
          type: "switch",
          description: "Unfiltered truth about your productivity",
          value: settings.brutalHonesty
        },
        {
          key: "familyFriendly",
          label: "Family Friendly",
          type: "switch",
          description: "Keep the roasts clean-ish",
          value: settings.familyFriendly
        }
      ]
    },
    {
      title: "Experience",
      icon: Palette,
      items: [
        {
          key: "soundEnabled",
          label: "Chaos Sounds",
          type: "switch",
          description: "Audio feedback for your failures",
          value: settings.soundEnabled
        },
        {
          key: "reducedMotion",
          label: "I Get Dizzy",
          type: "switch",
          description: "Reduce spiral and animations",
          value: settings.reducedMotion
        },
        {
          key: "notifications",
          label: "Demotivational Alerts",
          type: "switch",
          description: "Let us remind you of your shortcomings",
          value: settings.notifications
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20">
      <ProcrastinationVortex />
      
      <div className="relative z-10 p-4 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6 pt-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Damage Control</h1>
            <p className="text-sm text-muted-foreground">Customize your chaos</p>
          </div>
          <LagTheSloth 
            mood="judge" 
          />
        </div>

        {/* Current Vibe Status */}
        <Card className="p-4 mb-6 bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Current Vibe</h3>
              <p className="text-sm text-muted-foreground">
                {getHeckleLevelText(settings.heckleLevel)}
              </p>
            </div>
            <Badge className="bg-accent/20 text-accent">
              Level {settings.heckleLevel}
            </Badge>
          </div>
        </Card>

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <Card key={section.title} className="p-4 mb-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center space-x-2 mb-4">
              <section.icon className="h-5 w-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
            </div>
            
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      {item.description && (
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      )}
                    </div>
                    
                    {item.type === "switch" && (
                      <Switch
                        checked={item.value as boolean}
                        onCheckedChange={(checked) => updateSetting(item.key, checked)}
                      />
                    )}
                  </div>
                  
                  {item.type === "slider" && (
                    <div className="space-y-2">
                      <Slider
                        value={[item.value as number]}
                        onValueChange={([value]) => updateSetting(item.key, value)}
                        min={item.min}
                        max={item.max}
                        step={item.step}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Chill</span>
                        <span>Medium</span>
                        <span>Feral</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}

        {/* Danger Zone */}
        <Card className="p-4 mb-4 bg-destructive/5 border-destructive/20">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-destructive" />
            <h3 className="text-lg font-semibold text-foreground">Danger Zone</h3>
          </div>
          
          <div className="space-y-3">
            <SlothButton variant="ghost" className="w-full border border-destructive/30 text-destructive hover:bg-destructive/10">
              Reset All Progress
            </SlothButton>
            <SlothButton variant="ghost" className="w-full border border-destructive/30 text-destructive hover:bg-destructive/10">
              Delete Account & Shame
            </SlothButton>
          </div>
          
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Warning: This will erase your legendary procrastination achievements
          </p>
        </Card>

        {/* App Info */}
        <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-foreground">SLOTH v1.0</h3>
            <p className="text-sm text-muted-foreground">Snarky Little Overlord That Heckles</p>
            <p className="text-xs text-muted-foreground">
              Built with love and maximum passive aggression
            </p>
            
            <div className="pt-4 space-y-2">
              <SlothButton variant="ghost" size="sm">
                Rate Us (We Know It's 1 Star)
              </SlothButton>
              <SlothButton variant="ghost" size="sm">
                Report Bug (It's A Feature)
              </SlothButton>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;