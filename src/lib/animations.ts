// Framer Motion animation variants for PeerPoint

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.95,
  },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export const scaleRotateIn = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    rotate: -180,
  },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

export const cardHover = {
  rest: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    y: 0,
  },
  hover: {
    scale: 1.03,
    y: -10,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 15,
    },
  },
};

export const glowPulse = {
  rest: {
    filter: "brightness(1) drop-shadow(0 0 0px transparent)",
  },
  hover: {
    filter: [
      "brightness(1) drop-shadow(0 0 10px hsl(210 90% 55%))",
      "brightness(1.2) drop-shadow(0 0 20px hsl(210 90% 55%))",
      "brightness(1) drop-shadow(0 0 10px hsl(210 90% 55%))",
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 20,
    },
  },
};

export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.2,
    },
  },
};

export const sparkleVariants = {
  hidden: { scale: 0, rotate: 0 },
  show: { 
    scale: [0, 1.2, 1],
    rotate: [0, 180, 360],
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const floatAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};
