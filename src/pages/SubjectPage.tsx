import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Header } from "@/components/Header";
import { DoubtCard } from "@/components/DoubtCard";
import { PostButton } from "@/components/PostButton";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { questionsApi, pagesApi, Page, Question } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const SubjectPage = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [page, setPage] = useState<Page | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    loadData();
  }, [subject]);

  // Refresh when a question is updated (e.g., reply added)
  useEffect(() => {
    const handleQuestionUpdated = () => {
      loadData();
    };

    window.addEventListener('questionUpdated', handleQuestionUpdated);
    return () => window.removeEventListener('questionUpdated', handleQuestionUpdated);
  }, [subject]);

  const loadData = async () => {
    if (!subject) return;
    
    setLoading(true);
    try {
      const [pageData, questionsData] = await Promise.all([
        pagesApi.getByName(subject),
        questionsApi.getByPage(subject),
      ]);
      setPage(pageData);
      setQuestions(questionsData);
    } catch (error) {
      console.error("Failed to load data:", error);
      toast.error("Failed to load page data");
    } finally {
      setLoading(false);
    }
  };

  const handlePostQuestion = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to post a question");
      navigate("/login");
      return;
    }

    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!page) return;

    setPosting(true);
    try {
      await questionsApi.create(title, description, page.id);
      toast.success("Question posted successfully!");
      setTitle("");
      setDescription("");
      setIsPostDialogOpen(false);
      loadData(); // Refresh questions
    } catch (error: any) {
      toast.error(error.message || "Failed to post question");
    } finally {
      setPosting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <ParticleBackground />
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-background">
        <ParticleBackground />
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl text-muted-foreground mb-4"
          >
            Page not found
          </motion.p>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />
      <Header />

      <main className="container mx-auto px-6 py-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto"
        >
          {/* Back button and page header */}
          <motion.div variants={fadeInUp} className="mb-8">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Communities
            </Button>
            <h2 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-cyber bg-clip-text text-transparent">
                {page.name}
              </span>
            </h2>
            <p className="text-muted-foreground">{page.description}</p>
            <div className="mt-2 text-sm text-muted-foreground">
              {page.questionCount} questions • Active community
            </div>
          </motion.div>

          {/* Questions grid */}
          <motion.div className="space-y-6" variants={staggerContainer}>
            <AnimatePresence mode="popLayout">
              {questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  layout
                >
                  <DoubtCard
                    id={question.id}
                    title={question.title}
                    description={question.description}
                    author={question.userName}
                    community={question.pageName}
                    upvotes={Math.floor(Math.random() * 50)} // Mock data
                    replies={question.replyCount}
                    isHot={index < 2}
                    index={index}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {questions.length === 0 && (
            <motion.div variants={fadeInUp} className="text-center py-20">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <p className="text-6xl mb-4">🤔</p>
              </motion.div>
              <p className="text-xl text-muted-foreground mb-2">
                No questions yet in {page.name}
              </p>
              <p className="text-sm text-muted-foreground">
                Be the first to ask a question!
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>

      <PostButton onQuestionPosted={loadData} />
    </div>
  );
};

export default SubjectPage;
