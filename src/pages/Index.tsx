import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplashScreen } from "@/components/SplashScreen";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Header } from "@/components/Header";
import { CommunitySidebar } from "@/components/CommunitySidebar";
import { DoubtCard } from "@/components/DoubtCard";
import { PostButton } from "@/components/PostButton";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const mockDoubts = [
  {
    id: 1,
    title: "How to implement Binary Search Tree in C++?",
    description:
      "I'm struggling with the deletion operation in BST. Can someone explain the three cases involved?",
    author: "Rahul K.",
    community: "CSE",
    upvotes: 24,
    replies: 8,
    isHot: true,
  },
  {
    id: 2,
    title: "Confusion in Fourier Transform concepts",
    description:
      "What's the difference between continuous and discrete Fourier transforms? Need practical examples.",
    author: "Priya S.",
    community: "ECE",
    upvotes: 18,
    replies: 5,
  },
  {
    id: 3,
    title: "Best approach for solving integration by parts?",
    description:
      "I always mess up choosing u and dv. Is there a trick to remember which one to choose?",
    author: "Aditya M.",
    community: "Math",
    upvotes: 31,
    replies: 12,
    isHot: true,
  },
  {
    id: 4,
    title: "Neural Network backpropagation explained?",
    description:
      "Can someone break down the chain rule application in backpropagation? Visual diagrams would help!",
    author: "Sneha R.",
    community: "AI/ML",
    upvotes: 42,
    replies: 15,
    isHot: true,
  },
  {
    id: 5,
    title: "Understanding Kirchhoff's Current Law",
    description:
      "Working on circuit analysis assignment. Getting wrong answers when applying KCL to complex circuits.",
    author: "Vijay P.",
    community: "ECE",
    upvotes: 15,
    replies: 6,
  },
  {
    id: 6,
    title: "Python list comprehension vs loops - which is faster?",
    description:
      "Doing a project and need to optimize code. Should I use list comprehension or traditional for loops?",
    author: "Meera J.",
    community: "CSE",
    upvotes: 22,
    replies: 9,
  },
];

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedCommunity, setSelectedCommunity] = useState("All");

  const filteredDoubts =
    selectedCommunity === "All"
      ? mockDoubts
      : mockDoubts.filter((doubt) => doubt.community === selectedCommunity);

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
                  <motion.div className="space-y-6" variants={staggerContainer}>
                    {filteredDoubts.map((doubt, index) => (
                      <motion.div key={doubt.id} variants={fadeInUp}>
                        <DoubtCard {...doubt} index={index} />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Empty state */}
                  {filteredDoubts.length === 0 && (
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
                </motion.div>
              </main>
            </div>

            <PostButton onClick={() => alert("Post modal coming soon!")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
