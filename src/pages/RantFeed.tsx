import { useState } from "react";
import { Plus, TrendingUp, Clock, Zap } from "lucide-react";
import { SlothButton } from "@/components/ui/sloth-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { LagTheSloth } from "@/components/LagTheSloth";
import { ProcrastinationVortex } from "@/components/ProcrastinationVortex";

const RantFeed = () => {
  const [activeTab, setActiveTab] = useState<'trending' | 'fresh' | 'unproductive'>('trending');
  const [showCompose, setShowCompose] = useState(false);
  const [rantText, setRantText] = useState("");

  const [rants, setRants] = useState([
    {
      id: 1,
      text: "Opened Google Docs to write my essay. Made the title bold. Called it productivity. Closed laptop.",
      author: "Anonymous Sloth",
      time: "2h ago",
      reactions: { relatable: 47, skill_issue: 12, touch_grass: 3 },
      category: "Academic Chaos"
    },
    {
      id: 2,
      text: "My productivity app has 47 tasks labeled 'urgent'. I organized them by color instead of doing them. This is fine.",
      author: "Professional Delayer",
      time: "4h ago",
      reactions: { relatable: 73, skill_issue: 8, touch_grass: 15 },
      category: "Task Management"
    },
    {
      id: 3,
      text: "Spent 3 hours researching the perfect study playlist. Never played it. Napped instead. No regrets.",
      author: "Nap Champion",
      time: "6h ago",
      reactions: { relatable: 89, skill_issue: 2, touch_grass: 7 },
      category: "Study Fails"
    },
    {
      id: 4,
      text: "Made a vision board for my goals. It's just screenshots of other people's success stories. I feel accomplished.",
      author: "Vision Expert",
      time: "8h ago",
      reactions: { relatable: 34, skill_issue: 19, touch_grass: 8 },
      category: "Life Planning"
    },
    {
      id: 5,
      text: "Deadline in 2 hours. Just discovered a new hobby: organizing my bookmark folders. Priorities.",
      author: "Crisis Manager",
      time: "12h ago",
      reactions: { relatable: 156, skill_issue: 23, touch_grass: 11 },
      category: "Deadline Drama"
    }
  ]);

  const reactTo = (id: number, type: 'skull' | 'cry' | 'fire' | 'down') => {
    setRants(prev => prev.map(r => r.id === id ? {
      ...r,
      reactions: {
        skull: (r.reactions as any).skull ?? 0 + (type === 'skull' ? 1 : 0),
        cry: (r.reactions as any).cry ?? 0 + (type === 'cry' ? 1 : 0),
        fire: (r.reactions as any).fire ?? 0 + (type === 'fire' ? 1 : 0),
        down: (r.reactions as any).down ?? 0 + (type === 'down' ? 1 : 0),
      }
    } : r));
  };

  const Reaction = ({ id, type, count }: { id: number; type: 'skull' | 'cry' | 'fire' | 'down'; count: number }) => (
    <button onClick={() => reactTo(id, type)} className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
      <span>{type === 'skull' ? '💀' : type === 'cry' ? '😭' : type === 'fire' ? '🔥' : '👎'}</span>
      <span>{count}</span>
    </button>
  );

  const handlePostRant = () => {
    if (rantText.trim()) {
      setRantText("");
      setShowCompose(false);
      // In real app, would post to backend
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20">
      <ProcrastinationVortex />
      
      <div className="relative z-10 p-4 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6 pt-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">RantFeed</h1>
            <p className="text-sm text-muted-foreground">Where chaos finds community</p>
          </div>
          <LagTheSloth 
            mood="smug" 
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-muted/30 p-1 rounded-lg">
          {[
            { key: 'trending', label: 'Trending', icon: TrendingUp },
            { key: 'fresh', label: 'Fresh', icon: Clock },
            { key: 'unproductive', label: 'Chaos', icon: Zap }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === key
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Compose Button */}
        <SlothButton 
          className="w-full mb-4"
          onClick={() => setShowCompose(!showCompose)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Vent Your Frustration
        </SlothButton>

        {/* Compose Box */}
        {showCompose && (
          <Card className="p-4 mb-4 bg-card/80 backdrop-blur-sm border-border/50">
            <Textarea
              placeholder="Spill your procrastination tea... (200 chars max)"
              value={rantText}
              onChange={(e) => setRantText(e.target.value.slice(0, 200))}
              className="mb-3 bg-background/50"
              rows={3}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {rantText.length}/200 chars
              </span>
              <div className="space-x-2">
                <SlothButton 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowCompose(false)}
                >
                  Cancel
                </SlothButton>
                <SlothButton 
                  size="sm"
                  onClick={handlePostRant}
                  disabled={!rantText.trim()}
                >
                  Post Chaos
                </SlothButton>
              </div>
            </div>
          </Card>
        )}

        {/* Rant Feed */}
        <div className="space-y-4">
          {rants.map((rant) => (
            <Card key={rant.id} className="relative p-4 bg-card border-border/50">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-foreground leading-relaxed">{rant.text}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <span>{rant.author}</span>
                    <span>•</span>
                    <span>{rant.time}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {rant.category}
                  </Badge>
                </div>

                {/* Reactions: meme-only */}
                <div className="flex items-center justify-start gap-4 pt-2 border-t border-border/30">
                  <Reaction id={rant.id} type="skull" count={(rant.reactions as any).skull ?? 0} />
                  <Reaction id={rant.id} type="cry" count={(rant.reactions as any).cry ?? 0} />
                  <Reaction id={rant.id} type="fire" count={(rant.reactions as any).fire ?? 0} />
                  <Reaction id={rant.id} type="down" count={(rant.reactions as any).down ?? 0} />
                </div>
              </div>
            {/* occasional sticker overlay */}
            {Math.random() < 0.3 && (
              <div className="absolute -top-2 -right-2 bg-black text-white text-xs font-extrabold rounded-full px-2 py-1 shadow-harsh">BRO KE.</div>
            )}
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-6 text-center">
          <SlothButton variant="ghost">
            Load More Chaos
          </SlothButton>
        </div>
      </div>
    </div>
  );
};

export default RantFeed;
