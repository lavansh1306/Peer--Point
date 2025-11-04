import { motion } from "framer-motion";
import { MessageCircle, ThumbsUp, Star, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cardHover } from "@/lib/animations";

interface DoubtCardProps {
  id: number | string;
  title: string;
  description: string;
  author: string;
  community: string;
  upvotes: number;
  replies: number;
  isHot?: boolean;
  index: number;
}

export const DoubtCard = ({
  id,
  title,
  description,
  author,
  community,
  upvotes,
  replies,
  isHot = false,
  index,
}: DoubtCardProps) => {
  const navigate = useNavigate();
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [localUpvotes, setLocalUpvotes] = useState(upvotes);

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUpvoted(!isUpvoted);
    setLocalUpvotes(isUpvoted ? localUpvotes - 1 : localUpvotes + 1);
  };

  const handleCardClick = () => {
    navigate(`/question/${id}`);
  };

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      onClick={handleCardClick}
      className="relative bg-card border border-border rounded-2xl p-6 cursor-pointer group overflow-hidden"
      style={{
        boxShadow: isUpvoted ? "var(--glow-primary)" : "none",
      }}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{ pointerEvents: "none" }}
      />

      {/* Hot badge */}
      {isHot && (
        <motion.div
          className="absolute top-4 right-4 flex items-center gap-1 bg-accent/20 border border-accent px-3 py-1 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <TrendingUp className="w-3 h-3 text-accent" />
          <span className="text-xs font-semibold text-accent">Hot</span>
        </motion.div>
      )}

      {/* Community tag */}
      <div className="flex items-center gap-2 mb-3">
        <span className="px-3 py-1 bg-secondary/20 border border-secondary rounded-full text-xs font-semibold text-secondary">
          {community}
        </span>
        <span className="text-xs text-muted-foreground">by {author}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground line-clamp-2 mb-4">{description}</p>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <motion.button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          onClick={handleUpvote}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={isUpvoted ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <ThumbsUp
              className={`w-4 h-4 ${isUpvoted ? "fill-primary text-primary" : "text-muted-foreground"}`}
            />
          </motion.div>
          <span className={`text-sm font-medium ${isUpvoted ? "text-primary" : "text-muted-foreground"}`}>
            {localUpvotes}
          </span>
        </motion.button>

        <div className="flex items-center gap-2 text-muted-foreground">
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">{replies} replies</span>
        </div>

        <motion.button
          className="ml-auto"
          onClick={(e) => e.stopPropagation()}
          whileHover={{ scale: 1.2, rotate: 180 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Star className="w-5 h-5 text-muted-foreground hover:text-accent hover:fill-accent transition-colors" />
        </motion.button>
      </div>
    </motion.div>
  );
};
