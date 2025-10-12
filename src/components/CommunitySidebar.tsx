import { motion } from "framer-motion";
import { Code, Brain, Cpu, Calculator, Beaker, Zap } from "lucide-react";
import { slideInRight } from "@/lib/animations";

const communities = [
  { name: "CSE", icon: Code, color: "neon-blue" },
  { name: "ECE", icon: Cpu, color: "neon-magenta" },
  { name: "Math", icon: Calculator, color: "neon-violet" },
  { name: "Physics", icon: Beaker, color: "electric-cyan" },
  { name: "AI/ML", icon: Brain, color: "neon-blue" },
  { name: "General", icon: Zap, color: "neon-magenta" },
];

interface CommunitySidebarProps {
  selectedCommunity: string;
  onSelectCommunity: (community: string) => void;
}

export const CommunitySidebar = ({
  selectedCommunity,
  onSelectCommunity,
}: CommunitySidebarProps) => {
  return (
    <motion.div
      className="w-64 bg-card border-r border-border p-6 flex-shrink-0"
      variants={slideInRight}
      initial="hidden"
      animate="show"
    >
      <h2 className="text-2xl font-bold mb-6 bg-gradient-neon bg-clip-text text-transparent">
        Communities
      </h2>

      <div className="space-y-2">
        {communities.map((community, index) => {
          const Icon = community.icon;
          const isSelected = selectedCommunity === community.name;

          return (
            <motion.button
              key={community.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isSelected
                  ? "bg-primary/20 border border-primary shadow-glow-primary"
                  : "bg-muted/50 border border-transparent hover:border-border"
              }`}
              onClick={() => onSelectCommunity(community.name)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`p-2 rounded-lg bg-${community.color}/20`}
                animate={
                  isSelected
                    ? {
                        boxShadow: [
                          "0 0 0px transparent",
                          `0 0 20px hsl(var(--${community.color}))`,
                          "0 0 0px transparent",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon className={`w-5 h-5 text-${community.color}`} />
              </motion.div>
              <span
                className={`font-semibold ${
                  isSelected ? "text-primary" : "text-foreground"
                }`}
              >
                {community.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Stats section */}
      <motion.div
        className="mt-8 p-4 bg-gradient-cyber/10 border border-primary/20 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">
          Your Stats
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">XP Points</span>
            <span className="text-sm font-bold text-primary">1,247</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Rank</span>
            <span className="text-sm font-bold text-accent">#42</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Solved</span>
            <span className="text-sm font-bold text-secondary">23</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
