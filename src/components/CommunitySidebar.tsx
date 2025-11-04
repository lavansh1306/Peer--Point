import { motion } from "framer-motion";
import { Code, Brain, Cpu, Calculator, Beaker, Zap, Loader2 } from "lucide-react";
import { slideInRight } from "@/lib/animations";
import { useEffect, useState } from "react";
import { pagesApi, type Page } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const iconMap: Record<string, any> = {
  CSE: Code,
  ECE: Cpu,
  Math: Calculator,
  Mathematics: Calculator,
  Physics: Beaker,
  "AI/ML": Brain,
  General: Zap,
};

const colorMap: Record<string, string> = {
  CSE: "neon-blue",
  ECE: "neon-magenta",
  Math: "neon-violet",
  Mathematics: "neon-violet",
  Physics: "electric-cyan",
  "AI/ML": "neon-blue",
  General: "neon-magenta",
};

interface CommunitySidebarProps {
  selectedCommunity: string;
  onSelectCommunity: (community: string) => void;
}

export const CommunitySidebar = ({
  selectedCommunity,
  onSelectCommunity,
}: CommunitySidebarProps) => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const data = await pagesApi.getAll();
        setPages(data);
      } catch (error: any) {
        toast.error("Failed to load communities");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  const handleCommunityClick = (pageName: string) => {
    onSelectCommunity(pageName);
    navigate(`/subject/${pageName}`);
  };

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

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-2">
          {pages.map((page, index) => {
            const Icon = iconMap[page.name] || Code;
            const color = colorMap[page.name] || "neon-blue";
            const isSelected = selectedCommunity === page.name;

            return (
              <motion.button
                key={page.id}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isSelected
                    ? "bg-primary/20 border border-primary shadow-glow-primary"
                    : "bg-muted/50 border border-transparent hover:border-border"
                }`}
                onClick={() => handleCommunityClick(page.name)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className={`p-2 rounded-lg bg-${color}/20`}
                  animate={
                    isSelected
                      ? {
                          boxShadow: [
                            "0 0 0px transparent",
                            `0 0 20px hsl(var(--${color}))`,
                            "0 0 0px transparent",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon className={`w-5 h-5 text-${color}`} />
                </motion.div>
                <div className="flex-1 text-left">
                  <span
                    className={`font-semibold block ${
                      isSelected ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {page.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {page.questionCount} questions
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

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
