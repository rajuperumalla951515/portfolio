import { motion } from 'framer-motion';
import ideaLogo from '../assets/idea.png';
import codeLogo from '../assets/code (1).png';
import executeLogo from '../assets/execute.png';

const name = "Raju Perumalla";
const cornerCodeRows = [
  { text: "const craft = (idea) => deploy(idea);", position: "top-10 left-10", x: [-36, 16, -24] },
  { text: "git commit -m \"premium loader\"", position: "top-10 right-10", x: [36, -16, 24] },
  { text: "while(loading){ renderMagic(); }", position: "bottom-10 left-10", x: [-34, 14, -22] },
  { text: "npm run build && npm run deploy", position: "bottom-10 right-10", x: [34, -14, 22] },
];

const nameVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
  exit: {
    transition: { staggerChildren: 0.05, delayChildren: 0 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 16, stiffness: 60 },
  },
  exit: {
    opacity: 0,
    y: 30,
    filter: "blur(5px)",
    transition: { type: "spring", damping: 20, stiffness: 100 },
  },
};

const logoContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.25 },
  },
};

const logoVariants = [
  {
    hidden: { opacity: 0, x: -220, y: 10, rotate: -42, scale: 0.55, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 16, stiffness: 120, mass: 0.9 },
    },
    exit: {
      opacity: 0,
      x: -220,
      y: 10,
      rotate: -42,
      scale: 0.55,
      filter: 'blur(10px)',
      transition: { type: 'spring', damping: 16, stiffness: 120, mass: 0.9 },
    },
  },
  {
    hidden: { opacity: 0, y: 180, rotateX: 65, scale: 0.55, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 17, stiffness: 125, mass: 0.95 },
    },
    exit: {
      opacity: 0,
      y: 180,
      rotateX: 65,
      scale: 0.55,
      filter: 'blur(10px)',
      transition: { type: 'spring', damping: 17, stiffness: 125, mass: 0.95 },
    },
  },
  {
    hidden: { opacity: 0, x: 220, y: 10, rotate: 42, scale: 0.55, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 16, stiffness: 120, mass: 0.9 },
    },
    exit: {
      opacity: 0,
      x: 220,
      y: 10,
      rotate: 42,
      scale: 0.55,
      filter: 'blur(10px)',
      transition: { type: 'spring', damping: 16, stiffness: 120, mass: 0.9 },
    },
  },
];

const logos = [ideaLogo, codeLogo, executeLogo];

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1, filter: "blur(0px)", scale: 1, pointerEvents: "auto" }}
      exit={{ 
        opacity: 0, 
        filter: "blur(24px)",
        scale: 1.06,
        pointerEvents: "none", 
        transition: { duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] } 
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030303]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0.08, scale: 0.95 }}
          animate={{ opacity: [0.06, 0.12, 0.06], scale: [0.97, 1.01, 0.98] }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 4.2, ease: "easeInOut", repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0)_70%)]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_50%,rgba(3,3,3,0.95)_95%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center transform -translate-y-8">
        <motion.div
          className="relative z-10 flex space-x-5 mb-5"
          variants={logoContainerVariants}
          initial="hidden"
          animate="visible"
          exit={{ transition: { staggerChildren: 0.16, delayChildren: 0 } }}
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              variants={logoVariants[index]}
              className="relative"
            >
              <img 
                src={logo} 
                alt="logo" 
                className="relative w-9 h-9 object-contain filter grayscale contrast-[1.1] opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-500" 
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="px-6">
          <motion.h1
            className="relative text-2xl md:text-3xl font-outfit font-medium text-gray-200 text-center tracking-[0.14em]"
            variants={nameVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ textShadow: '0 0 16px rgba(255, 255, 255, 0.05)' }}
          >
            {name.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
