import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { pagesApi, questionsApi, type Page } from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface PostButtonProps {
  onQuestionPosted?: () => void;
}

export const PostButton = ({ onQuestionPosted }: PostButtonProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPage, setSelectedPage] = useState("");
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (open && pages.length === 0) {
      pagesApi.getAll().then(setPages).catch(console.error);
    }
  }, [open, pages.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login to post a question");
      navigate("/login");
      return;
    }

    if (!title || !content || !selectedPage) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await questionsApi.create(title, content, selectedPage);
      toast.success("Question posted successfully!");
      setTitle("");
      setContent("");
      setSelectedPage("");
      setOpen(false);
      onQuestionPosted?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to post question");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && !isAuthenticated) {
      toast.error("Please login to post a question");
      navigate("/login");
      return;
    }
    setOpen(newOpen);
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
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
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button className="h-16 w-16 rounded-full bg-gradient-cyber shadow-glow-primary hover:shadow-glow-accent transition-all duration-300 relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
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
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] border-2 border-primary/20 shadow-glow-primary">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-neon bg-clip-text text-transparent">
            Post a Question
          </DialogTitle>
          <DialogDescription>
            Share your doubt with the community and get help from peers
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Question Title</Label>
            <Input
              id="title"
              placeholder="What's your doubt?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Description</Label>
            <Textarea
              id="content"
              placeholder="Provide more details about your question..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="page">Subject</Label>
            <Select value={selectedPage} onValueChange={setSelectedPage} required>
              <SelectTrigger id="page">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {pages.map((page) => (
                  <SelectItem key={page.id} value={page.id}>
                    {page.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-cyber shadow-glow-primary"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Question"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
