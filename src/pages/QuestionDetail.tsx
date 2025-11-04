import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessageSquare, ThumbsUp, Star, Send, Loader2, Trash2 } from "lucide-react";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";
import { questionsApi, repliesApi, type Question, type Reply } from "@/lib/api";
import { toast } from "sonner";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const QuestionDetail = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [question, setQuestion] = useState<Question | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (questionId) {
      loadQuestionAndReplies();
    }
  }, [questionId]);

  const loadQuestionAndReplies = async () => {
    if (!questionId) return;
    
    setLoading(true);
    try {
      const [questionData, repliesData] = await Promise.all([
        questionsApi.getById(questionId),
        repliesApi.getByQuestion(questionId),
      ]);
      setQuestion(questionData);
      setReplies(repliesData);
    } catch (error: any) {
      toast.error("Failed to load question");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login to reply");
      navigate("/login");
      return;
    }

    if (!replyContent.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    if (!questionId) return;

    setSubmitting(true);
    try {
      const newReply = await repliesApi.create(questionId, replyContent);
      toast.success("Reply posted successfully!");
      setReplyContent("");
      // Update local state immediately for better UX
      setReplies(prev => [...prev, newReply]);
      // Also reload to get updated question with new reply count
      await loadQuestionAndReplies();
      // Notify other pages that question was updated
      window.dispatchEvent(new CustomEvent('questionUpdated'));
    } catch (error: any) {
      toast.error(error.message || "Failed to post reply");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteQuestion = async () => {
    if (!questionId || !question) return;

    setDeleting(true);
    try {
      await questionsApi.delete(questionId);
      toast.success("Question deleted successfully!");
      // Notify other pages to refresh
      window.dispatchEvent(new CustomEvent('questionUpdated'));
      // Navigate back to home
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete question");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    try {
      await repliesApi.delete(replyId);
      toast.success("Reply deleted successfully!");
      // Remove from local state
      setReplies(prev => prev.filter(r => r.id !== replyId));
      // Reload to update reply count
      await loadQuestionAndReplies();
      // Notify other pages
      window.dispatchEvent(new CustomEvent('questionUpdated'));
    } catch (error: any) {
      toast.error(error.message || "Failed to delete reply");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <ParticleBackground />
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-background">
        <ParticleBackground />
        <Header />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
          <p className="text-xl text-muted-foreground mb-4">Question not found</p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />
      <Header />

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back button */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => {
              // Navigate back and trigger refresh via window event
              window.dispatchEvent(new CustomEvent('questionUpdated'));
              navigate(-1);
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Question Card */}
          <Card className="border-2 border-primary/20 shadow-glow-primary mb-8">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Badge className="bg-gradient-cyber">{question.pageName}</Badge>
              </div>

              <h1 className="text-3xl font-bold mb-4 bg-gradient-neon bg-clip-text text-transparent">
                {question.title}
              </h1>

              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                {question.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {getInitials(question.userName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{question.userName}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(question.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Like</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Star className="w-4 h-4" />
                    <span>Star</span>
                  </Button>
                  
                  {/* Delete button - only shown to question author */}
                  {isAuthenticated && user?.id === question.userId && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Question?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            question and all its replies.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteQuestion}
                            disabled={deleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {deleting ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              "Delete"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Replies Section */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">
                {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
              </h2>
            </div>

            <div className="space-y-4">
              {replies.map((reply, index) => (
                <motion.div key={reply.id} variants={fadeInUp}>
                  <Card className="border border-border hover:border-primary/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-secondary/20 text-secondary text-sm">
                            {getInitials(reply.userName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{reply.userName}</p>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(reply.createdAt)}
                              </span>
                            </div>
                            {/* Delete button for reply author */}
                            {isAuthenticated && user?.id === reply.userId && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Reply?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete your reply.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteReply(reply.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                          <p className="text-foreground leading-relaxed">
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {replies.length === 0 && (
                <motion.div
                  variants={fadeInUp}
                  className="text-center py-12 text-muted-foreground"
                >
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No replies yet. Be the first to answer!</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Reply Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-2 border-primary/20 shadow-glow-primary">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Your Answer</h3>
                <form onSubmit={handleSubmitReply}>
                  <Textarea
                    placeholder="Write your answer here..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={6}
                    className="mb-4"
                    disabled={!isAuthenticated}
                  />
                  {!isAuthenticated ? (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-amber-500">
                        Please login to post a reply
                      </p>
                      <Button onClick={() => navigate("/login")}>
                        Login
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="bg-gradient-cyber shadow-glow-primary"
                        disabled={submitting || !replyContent.trim()}
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Posting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Post Reply
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default QuestionDetail;
