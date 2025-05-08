import React from 'react';
import { motion } from 'framer-motion';

import { ReactNode } from 'react';

interface AnimatedSidebarProps {
  children: ReactNode;
}

const AnimatedSidebar = ({ children }: AnimatedSidebarProps) => {
  const sidebarVariants = {
    open: {
      x: 0,
      width: "auto",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: -20,
      width: "80px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <motion.aside
      className="h-screen fixed left-0 top-0 z-40"
      initial="open"
      animate="open"
      variants={sidebarVariants}
      whileHover={{ scale: 1.01 }}
      layout
    >
      <motion.div
        className="h-full"
        layout
      >
        {children}
      </motion.div>
    </motion.aside>
  );
};

export default AnimatedSidebar;