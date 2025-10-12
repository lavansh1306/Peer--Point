import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostButtonProps {
  onClick: () => void;
}

export const PostButton = ({ onClick }: PostButtonProps) => {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.8,
      }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onClick}
          className="h-16 w-16 rounded-full bg-gradient-cyber shadow-glow-primary hover:shadow-glow-accent transition-all duration-300 relative overflow-hidden group"
        >
          {/* Animated sparkle effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Sparkles className="w-8 h-8 text-primary-foreground opacity-0 group-hover:opacity-50 transition-opacity" />
          </motion.div>

          <Plus className="w-8 h-8 text-primary-foreground relative z-10" />
        </Button>
      </motion.div>

      {/* Pulsing ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.8, 0, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};
