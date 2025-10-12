import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/peerpoint-logo.jpg";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-cyber opacity-20 animate-shimmer bg-[length:200%_200%]" />
      
      {/* Particle effects */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-neon-cyan"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Logo explosion effect */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ 
          scale: [0, 1.2, 1],
          rotate: [180, 0, 0],
          opacity: [0, 1, 1],
        }}
        transition={{
          duration: 1.5,
          times: [0, 0.7, 1],
          ease: "easeOut",
        }}
      >
        <div className="relative">
          <motion.img
            src={logo}
            alt="PeerPoint"
            className="w-64 h-auto rounded-2xl shadow-glow-primary"
            animate={{
              filter: [
                "brightness(1) drop-shadow(0 0 20px hsl(210 90% 55%))",
                "brightness(1.3) drop-shadow(0 0 40px hsl(320 90% 60%))",
                "brightness(1) drop-shadow(0 0 20px hsl(210 90% 55%))",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-4">
          Entering the Future of Learning
        </h2>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-cyber shadow-glow-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <motion.p
          className="mt-3 text-sm text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {progress < 100 ? "Loading..." : "Ready!"}
        </motion.p>
      </motion.div>

      {/* Corner accents */}
      <motion.div
        className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-neon-cyan rounded-tl-3xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-neon-magenta rounded-br-3xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 0.5 }}
      />
    </motion.div>
  );
};
