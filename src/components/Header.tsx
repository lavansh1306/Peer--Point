import { motion } from "framer-motion";
import { Search, Bell, User, LogOut, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/peerpoint-logo.jpg";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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
          {isAuthenticated && (
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
          )}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  className="flex items-center gap-2 p-2 rounded-lg bg-gradient-cyber hover:shadow-glow-primary transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/20 text-primary text-sm font-bold">
                      {user?.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-cyber hover:shadow-glow-primary transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
            >
              <LogIn className="w-4 h-4" />
              <span className="text-sm font-semibold">Login</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  );
};
