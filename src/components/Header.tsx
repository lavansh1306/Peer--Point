import { motion } from "framer-motion";
import { Search, Bell, User } from "lucide-react";
import logo from "@/assets/peerpoint-logo.jpg";

export const Header = () => {
  return (
    <motion.header
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={logo}
            alt="PeerPoint"
            className="w-10 h-10 rounded-lg shadow-glow-primary"
          />
          <h1 className="text-2xl font-bold bg-gradient-neon bg-clip-text text-transparent">
            PeerPoint
          </h1>
        </motion.div>

        {/* Search bar */}
        <motion.div
          className="flex-1 max-w-xl mx-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search doubts, users, topics..."
              className="w-full pl-12 pr-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <motion.button
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5 text-foreground" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-background"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          <motion.button
            className="p-2 rounded-lg bg-gradient-cyber hover:shadow-glow-primary transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-5 h-5 text-primary-foreground" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};
