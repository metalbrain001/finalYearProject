import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const useMotion = () => {
  // Common animations you can reuse across components
  const [isOpen, setIsOpen] = useState(false);

  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();
  const animatePresences = AnimatePresence;

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
      svgControls.start("open");
    } else {
      containerControls.start("close");
      svgControls.start("close");
    }
  }, [isOpen, containerControls]);

  // ** Toggle Leftsidebar state ** //
  const toggleLeftSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  // ✅ Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // ✅ Dropdown Animation Variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeInOut" } },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  // ** Slide-in from the right animation ** //
  const slideInFromRight = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.3 } },
  };

  // ** Slide-in from the left animation ** //
  const slideInFromLeft = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  // ** Slide in from bottom animation ** //
  const slideInFromBottom = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  // ** Slide in from Top animation ** //
  const slideInFromTop = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  // ** Fade-in animation ** //
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  // ** Staggered children animation (for lists, etc.) ** //
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // ** Staggered children animation (for lists, etc.) ** //
  const staggerChild = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // ** Toggle collapse animation ** //
  const toggleCollapse = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // ** ContainerVariants for the sidebar ** //
  const containerVariants = {
    close: {
      width: "5rem",
      transition: {
        type: "spring",
        damping: 200,
        delay: 0.5,
      },
    },
    open: {
      width: "15rem",
      transition: {
        type: "spring",
        damping: 200,
        duration: 0.5,
      },
    },
  };

  // ** SVG variants ** //
  const svgVariants = {
    close: {
      rotate: 360,
    },
    open: {
      rotate: 180,
    },
  };

  const whileHover = {
    scale: 1.1,
    transition: { duration: 0.2 },
  };

  const whileTap = {
    scale: 0.9,
  };

  const transition = {
    duration: 0.8,
    delay: 0.5,
    ease: [0, 0.71, 0.2, 1.01],
  };

  const whileInView = {
    scale: 1.1,
    transition: { duration: 0.5 },
  };

  // ✅ Scale-up Effect (For Hovering)
  const scaleUp = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return {
    motion,
    animatePresences,
    animations: {
      slideInFromRight,
      slideInFromLeft,
      slideInFromBottom,
      slideInFromTop,
      fadeIn,
      staggerContainer,
      staggerChild,
      toggleCollapse,
      whileHover,
      whileTap,
      transition,
      whileInView,
      scaleUp,
      dropdownVariants,
    },
    toggleLeftSidebar,
    toggleDropdown,
    isOpen,
    setIsOpen,
    containerVariants,
    containerControls,
    handleOpenClose,
    svgVariants,
    svgControls,
  };
};

export default useMotion;
