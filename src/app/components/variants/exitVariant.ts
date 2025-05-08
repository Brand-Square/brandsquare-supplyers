 
const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 50,
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 30,
      transition: {
        type: 'tween',
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  }
  
  const backDropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        delay: 0.1,
        duration: 0.2
      }
    }
  }

  export { backDropVariants, modalVariants };