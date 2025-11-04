import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { SplashScreen } from "@/components/SplashScreen";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Header } from "@/components/Header";
import { CommunitySidebar } from "@/components/CommunitySidebar";
import { DoubtCard } from "@/components/DoubtCard";
import { PostButton } from "@/components/PostButton";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { pagesApi, questionsApi, type Question, type Page } from "@/lib/api";
import { toast } from "sonner";

const Index = () => {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  const [selectedCommunity, setSelectedCommunity] = useState("All");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedCommunity !== "All") {
      fetchQuestionsByPage(selectedCommunity);
    } else {
      fetchAllQuestions();
    }
  }, [selectedCommunity]);

  // Refresh when a question is updated (e.g., reply added)
  useEffect(() => {
    const handleQuestionUpdated = () => {
      if (selectedCommunity === "All") {
        fetchAllQuestions();
      } else {
        fetchQuestionsByPage(selectedCommunity);
      }
    };

    window.addEventListener('questionUpdated', handleQuestionUpdated);
    return () => window.removeEventListener('questionUpdated', handleQuestionUpdated);
  }, [selectedCommunity]);

  const fetchInitialData = async () => {
    try {
      const pagesData = await pagesApi.getAll();
      setPages(pagesData);
      await fetchAllQuestions();
    } catch (error) {
      toast.error("Failed to load data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllQuestions = async () => {
    setLoading(true);
    try {
      const pagesData = pages.length > 0 ? pages : await pagesApi.getAll();
      const allQuestions = await Promise.all(
        pagesData.map((page) => questionsApi.getByPage(page.name).catch(() => []))
      );
      setQuestions(allQuestions.flat());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestionsByPage = async (pageName: string) => {
    setLoading(true);
    try {
      const data = await questionsApi.getByPage(pageName);
      setQuestions(data);
    } catch (error) {
      toast.error("Failed to load questions");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionPosted = () => {
    if (selectedCommunity === "All") {
      fetchAllQuestions();
    } else {
      fetchQuestionsByPage(selectedCommunity);
    }
  };

  const transformQuestion = (q: Question) => ({
    id: q.id,
    title: q.title,
    description: q.description,
    author: q.userName,
    community: q.pageName,
    upvotes: 0, // Backend doesn't have voting yet
    replies: q.replyCount,
    isHot: q.replyCount > 5,
  });

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ParticleBackground />
            <Header />

            <div className="flex">
              <CommunitySidebar
                selectedCommunity={selectedCommunity}
                onSelectCommunity={setSelectedCommunity}
              />

              <main className="flex-1 p-8">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="max-w-4xl mx-auto"
                >
                  {/* Page title */}
                  <motion.div variants={fadeInUp} className="mb-8">
                    <h2 className="text-4xl font-bold mb-2">
                      <span className="bg-gradient-cyber bg-clip-text text-transparent">
                        Latest Doubts
                      </span>
                    </h2>
                    <p className="text-muted-foreground">
                      {selectedCommunity === "All"
                        ? "Explore questions from all communities"
                        : `Questions from ${selectedCommunity} community`}
                    </p>
                  </motion.div>

                  {/* Doubts grid */}
                  {loading ? (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <>
                      <motion.div className="space-y-6" variants={staggerContainer}>
                        {questions.map((question, index) => (
                          <motion.div key={question.id} variants={fadeInUp}>
                            <DoubtCard {...transformQuestion(question)} index={index} />
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Empty state */}
                      {questions.length === 0 && (
                    <motion.div
                      variants={fadeInUp}
                      className="text-center py-20"
                    >
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
                          <p className="text-6xl mb-4">🤖</p>
                        </motion.div>
                        <p className="text-xl text-muted-foreground">
                          No doubts found in this community
                        </p>
                      </motion.div>
                      )}
                    </>
                  )}
                </motion.div>
              </main>
            </div>

            <PostButton onQuestionPosted={handleQuestionPosted} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
