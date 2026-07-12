import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import * as Lucide from 'lucide-react';
import Loader from './components/Loader';

import myLogo from './assets/mylogo.png';
import profilePhoto from './assets/profile.png';
import htmlLogo from './assets/html.png';
import cssLogo from './assets/css-3.png';
import jsLogo from './assets/javascript.png';
import reactLogo from './assets/react.svg';
import dockerLogo from './assets/docker.png';
import githubLogo from './assets/github.png';
import javaLogo from './assets/java.png';
import socialLogo from './assets/social.png';
import cppLogo from './assets/C++.png';
import cloudLogo from './assets/cloud.png';
import dbLogo from './assets/database.png';
import nodeLogo from './assets/node js.png';
import pythonLogo from './assets/python.png';
import sqlLogo from './assets/sql.png';
import linkedinLogo from './assets/linkedin.png';
import youtubeLogo from './assets/youtube (1).png';
import googleLogo from './assets/google-logo.png';
import sapLogo from './assets/sap-logo.png';
import gmailLogo from './assets/gmail.png';
import instaProfile from './assets/insta profile.png';

// Safe icon access helper
const IconWrapper = ({ name, ...props }) => {
  const Icon = Lucide[name];
  return Icon ? <Icon {...props} /> : <Lucide.HelpCircle {...props} />;
};

const cinematicContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const cinematicItem = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(12px)',
    clipPath: 'inset(0 0 100% 0)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Shuffling Floating Logos Component
const FloatingLogos = ({ logos }) => {
  const [visibleLogos, setVisibleLogos] = useState([]);

  useEffect(() => {
    const shuffle = () => {
      const shuffled = [...logos].sort(() => 0.5 - Math.random());
      setVisibleLogos(shuffled.slice(0, 4));
    };

    shuffle();
    const interval = setInterval(shuffle, 8000);
    return () => clearInterval(interval);
  }, [logos]);

  const positions = [
    { pos: '-top-12 left-4', delay: 0 },
    { pos: 'top-16 -right-12', delay: 0.5 },
    { pos: '-bottom-12 right-6', delay: 1 },
    { pos: 'bottom-20 -left-14', delay: 1.5 },
  ];

  return (
    <AnimatePresence>
      <div className="absolute inset-0 pointer-events-none">
        {visibleLogos.map((logo, i) => (
          <motion.div
            key={logo}
            initial={{ opacity: 0, scale: 0.2, rotate: -35, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.2, rotate: 35, filter: "blur(8px)" }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 15,
              mass: 0.8,
              opacity: { duration: 0.8 },
              filter: { duration: 0.6 }
            }}
            className={`absolute ${positions[i].pos} z-10`}
          >
            <motion.img
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: positions[i].delay
              }}
              src={logo}
              alt="tech"
              className='w-14 h-14 object-contain filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]'
            />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};

// Decimals-capable animated stat counter
const Counter = ({ value, duration = 1.8, suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        let start = 0;
        const end = value;
        const totalMiliseconds = duration * 1000;
        const stepTime = 30; // 30ms updates
        const totalSteps = totalMiliseconds / stepTime;
        const increment = (end - start) / totalSteps;

        let current = start;
        let timer = setInterval(() => {
          current += increment;
          if (current >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(current);
          }
        }, stepTime);
      }
    }, { threshold: 0.1 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={elementRef} className="font-outfit font-black">
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

// Premium Bento Card with cursor spotlight
const BentoCard = ({ children, className = '', spotlightClass = 'spotlight-blue', disableAnimation = false }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      {...(!disableAnimation && {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
      })}
      className={`spotlight-card ${spotlightClass} ${className} relative p-6 flex flex-col justify-between group`}
    >
      <div className="premium-card-overlay" />
      <div className="relative z-10 flex flex-col h-full justify-between">
        {children}
      </div>
    </motion.div>
  );
};

// Live FastAPI rolling terminal logger
const TerminalLogs = () => {
  const [logs, setLogs] = useState([
    { method: 'GET', path: '/api/v1/health', status: 200, latency: '12ms' },
    { method: 'POST', path: '/api/v1/predict', status: 200, latency: '21ms' },
    { method: 'GET', path: '/api/v1/metrics', status: 200, latency: '15ms' }
  ]);

  useEffect(() => {
    const endpoints = [
      { method: 'GET', path: '/api/v1/items', status: 200 },
      { method: 'POST', path: '/api/v1/inference', status: 200 },
      { method: 'GET', path: '/api/v1/users/me', status: 200 },
      { method: 'PUT', path: '/api/v1/settings', status: 200 }
    ];

    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextIndex = Math.floor(Math.random() * endpoints.length);
        const latency = Math.floor(Math.random() * 15 + 8) + 'ms';
        const newLog = { ...endpoints[nextIndex], latency };
        return [...prev.slice(1), newLog];
      });
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[10px] md:text-xs text-emerald-400/90 space-y-1.5 p-3 rounded-lg bg-black/40 border border-emerald-500/10 min-h-[96px] relative overflow-hidden terminal-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.01] to-emerald-500/[0.03] animate-grid-scroll pointer-events-none" />
      {logs.map((log, index) => (
        <div key={index} className="flex justify-between items-center transition-all duration-500 font-mono">
          <span className="flex items-center gap-1.5 font-mono">
            <span className={`font-mono font-bold text-[9px] px-1 py-0.5 rounded ${log.method === 'POST' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
              {log.method}
            </span>
            <span className="text-white/60 font-mono">{log.path}</span>
          </span>
          <span className="flex gap-3 font-mono text-[10px]">
            <span className="text-emerald-500 font-mono">{log.status}</span>
            <span className="text-white/30 font-mono">{log.latency}</span>
          </span>
        </div>
      ))}
    </div>
  );
};

const aboutTabs = [
  {
    id: 'about',
    label: 'About Me',
    title: 'Full-Stack Web &',
    titleHighlight: 'Android Developer',
    icon: 'User',
    tagline: 'Full Stack Developer • Android Developer • AI & ML Engineer • Content Creator (2.5K+ YouTube)',
    content: 'I build scalable web and Android applications powered by AI, machine learning, and modern backend technologies. From intelligent automation to real-time data-driven systems, I enjoy transforming ideas into products that solve real-world problems and create meaningful user experiences.'
  },
  {
    id: 'projects',
    label: 'Projects',
    title: 'Shipped Products &',
    titleHighlight: 'Real-World Impact',
    icon: 'Layers',
    content: 'I designed, developed, and deployed multiple real-world software solutions that are actively solving practical problems. My work includes full-stack web development, Android apps, AI, machine learning, and scalable backend systems. Projects such as Smart Guardian, the AI Student Travel Planner, and the Helmet Detection System demonstrate my ability to build production-ready applications with a strong focus on scalability, performance, clean architecture, and user experience.'
  },
  {
    id: 'experience',
    label: 'Experience',
    title: '3+ Years of',
    titleHighlight: 'Professional Craft',
    icon: 'Briefcase',
    content: 'Experienced in building real-world projects from concept to deployment across Full Stack Web Development, Android Development, Artificial Intelligence, and Machine Learning. Actively attend tech events, hackathons, and developer communities to stay updated with emerging technologies and industry trends. Hosted 4+ technical sessions on AI, software development, and modern technologies, sharing knowledge with students and aspiring developers. Passionate about content creation with experience in technical video production, video editing, photography, graphic design, and digital storytelling. Skilled at combining technical expertise with creativity to build impactful products and create engaging digital experiences.'
  },
  {
    id: 'achievements',
    label: 'Achievements',
    title: 'Milestones &',
    titleHighlight: 'Recognition',
    icon: 'Trophy',
    content: 'Recognized for delivering innovative solutions and contributing to the technology community through impactful projects and leadership. Achievements include being a Finalist in SAP Innovation Marathon 4.0, selected as a Google Student Ambassador 2026, Hosting 4+ technical sessions on AI and software development, actively participating in national hackathons and technical events, and building multiple production-ready applications that solve real-world problems. Additionally, I have grown a 2.5K+ YouTube community, where I create technical content to educate and inspire aspiring developers while continuously expanding my expertise through certifications, workshops, and hands-on learning.'
  }
];

const App = () => {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [isAboutInView, setIsAboutInView] = useState(false);
  const [isSkillsInView, setIsSkillsInView] = useState(false);
  const aboutSectionRef = useRef(null);
  const skillsSectionRef = useRef(null);
  const lastScrollYRef = useRef(0);

  const [showEmailTag, setShowEmailTag] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [isInstaHovered, setIsInstaHovered] = useState(false);
  const [isFacebookHovered, setIsFacebookHovered] = useState(false);
  const [isDiscordHovered, setIsDiscordHovered] = useState(false);
  const [hasHoveredSocial, setHasHoveredSocial] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isAboutCardsHovered, setIsAboutCardsHovered] = useState(false);
  const [animDirection, setAnimDirection] = useState(1);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('23ra1a05b0@kpritech.ac.in');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const rotatingRoles = ['DEVELOPER', 'SPEAKER', 'CONTRIBUTOR'];
  const rotatingRoleVariants = {
    enter: (direction) => ({
      opacity: 0,
      y: direction === 'down' ? 30 : -30,
      filter: 'blur(7px)',
    }),
    center: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    },
    exit: (direction) => ({
      opacity: 0,
      y: direction === 'down' ? -30 : 30,
      filter: 'blur(7px)',
    }),
  };

  useEffect(() => {
    console.log('App mounted');
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRoleIndex((currentIndex) => (currentIndex + 1) % rotatingRoles.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [rotatingRoles.length]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollYRef.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollYRef.current) {
        setScrollDirection('up');
      }

      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const aboutSection = aboutSectionRef.current;
    if (!aboutSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAboutInView(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(aboutSection);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const skillsSection = skillsSectionRef.current;
    if (!skillsSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSkillsInView(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(skillsSection);

    return () => observer.disconnect();
  }, []);


  return (
    <div
      className='relative min-h-screen text-white'
      style={{
        '--scroll-transition-ease': scrollDirection === 'down' ? 'ease-in' : 'ease-out',
      }}
    >
      <div className={`bg-red-gradient ${isScrolled ? 'bg-fade-out' : ''}`} />
      <div className={`bg-blue-gradient ${isAboutInView || isSkillsInView ? 'bg-fade-out' : isScrolled ? 'bg-fade-in' : ''}`} />
      <div className={`bg-green-gradient ${isAboutInView ? 'bg-fade-in' : ''}`} />
      <div className={`bg-yellow-gradient ${isSkillsInView ? 'bg-fade-in' : ''}`} />
      <div
        className={`fixed top-40 right-25 md:top-38 md:right-[36rem] z-[-9] pointer-events-none select-none whitespace-nowrap transition-all duration-150 ${isScrolled ? 'opacity-0 translate-y-4 blur-sm' : 'opacity-100 translate-y-0 blur-0'}`}
        style={{ transitionTimingFunction: 'var(--scroll-transition-ease)' }}
      >
        <div className='text-white font-black leading-none tracking-tight text-lg sm:text-xl md:text-2xl lg:text-3xl flex items-center'>
          <span className='text-black'>I'M  A</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={rotatingRoles[activeRoleIndex]}
              custom={scrollDirection}
              variants={rotatingRoleVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                opacity: { duration: 0.05 },
                y: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                filter: { duration: 0.1 },
              }}
              className='text-white inline-block min-w-[12ch] ml-2'
            >
              {rotatingRoles[activeRoleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <div className='bg-grid' />

      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      {/* Premium Black Fade-in Overlay */}
      {!loading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="fixed inset-0 bg-[#030303] z-[90] pointer-events-none"
        />
      )}

      {/* Premium Glassmorphic Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#030303]/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col gap-8 text-center text-2xl font-outfit tracking-widest font-semibold">
              <motion.li
                whileHover={{ scale: 1.1, color: '#ef4444' }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a href="#about" onClick={() => setMobileMenuOpen(false)}>ABOUT</a>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.1, color: '#ef4444' }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a href="#skills" onClick={() => setMobileMenuOpen(false)}>SKILLS</a>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.1, color: '#ef4444' }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a href="#projects" onClick={() => setMobileMenuOpen(false)}>PROJECTS</a>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.1, color: '#ef4444' }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>CONTACT</a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='fixed inset-0 pointer-events-none overflow-hidden -z-10'>
        <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-700' />
      </div>

      <motion.nav
        initial="hidden"
        animate={!loading ? "visible" : "hidden"}
        variants={cinematicContainer}
        transition={{ delay: 0.2 }}
        className='fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[98%] max-w-[1440px]'
      >
        <div className="glass-container">
          <div className="glass-filter"></div>
          <div className="glass-overlay"></div>
          <div className="glass-specular"></div>
          <div className="glass-content flex justify-between items-center w-full px-8 py-5">
            <motion.div variants={cinematicItem} className='main-logo-font text-gradient cursor-pointer'>
              Raju Perumalla
            </motion.div>

            <div className="flex items-center gap-6">
              <motion.div variants={cinematicItem} className='hidden md:block'>
                <ul className="navbar-links">
                  <li><a href="#about">ABOUT</a></li>
                  <li><a href="#skills">SKILLS</a></li>
                  <li><a href="#projects">PROJECTS</a></li>
                  <li><a href="#contact">CONTACT</a></li>
                </ul>
              </motion.div>

              <motion.button
                variants={cinematicItem}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className='md:hidden text-white hover:text-red-500 transition-colors focus:outline-none z-50 relative'
              >
                {mobileMenuOpen ? <Lucide.X size={26} /> : <Lucide.Menu size={26} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <main className='w-full max-w-[1500px] mx-auto px-4 md:px-6 relative'>
        {/* Hero Section */}
        <section className='min-h-screen flex items-center justify-center pt-20 relative'>
          <motion.div
            className='w-full mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16'
            initial="hidden"
            animate={!loading ? "visible" : "hidden"}
            variants={cinematicContainer}
            transition={{ delay: 0.4 }}
          >
            <div className='outer'>
              <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                scale={1.01}
                speed={300}
                glareEnable={true}
                glareMaxOpacity={0.12}
                glareColor="#3b82f6"
                glarePosition="all"
                className="card rounded-2xl"
                style={{ perspective: '1200px' }}
              >
                <div className='ray'></div>

                {/* Top-Right Social Links */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 flex gap-3 z-20">
                  <motion.a
                    href="https://www.linkedin.com/in/rajuperumalla9006"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] backdrop-blur-md hover:border-red-500/50 hover:bg-red-500/[0.03] transition-all duration-300 p-2.5 overflow-hidden"
                    title="LinkedIn"
                  >
                    <img src={linkedinLogo} alt="LinkedIn" className="w-full h-full object-contain" />
                  </motion.a>
                  {/* Gmail icon with pop-up email tag */}
                  <div className="relative">
                    <motion.button
                      onClick={() => setShowEmailTag(prev => !prev)}
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] backdrop-blur-md hover:border-red-500/50 hover:bg-red-500/[0.03] transition-all duration-300 p-2.5 overflow-hidden cursor-pointer"
                      title="Show Email"
                    >
                      <img src={gmailLogo} alt="Gmail" className="w-full h-full object-contain" />
                    </motion.button>

                    <AnimatePresence>
                      {showEmailTag && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.94 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-11 right-0 z-50 w-[210px]"
                        >
                          {/* Arrow */}
                          <div className="absolute -top-[4px] right-3.5 w-2 h-2 rotate-45 bg-[#111] border-l border-t border-white/10 z-10" />

                          <div className="relative rounded-lg border border-white/10 bg-[#111]/98 backdrop-blur-xl shadow-[0_6px_24px_rgba(0,0,0,0.6)] overflow-hidden px-3 py-2.5">
                            {/* Top accent line */}
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

                            {/* Header row */}
                            <div className="flex items-center justify-between mb-2">
                              <span style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[8px] uppercase tracking-[0.18em] text-white/25 font-bold">
                                E-mail
                              </span>
                              <motion.button
                                onClick={() => setShowEmailTag(false)}
                                whileTap={{ scale: 0.9 }}
                                className="w-4 h-4 flex items-center justify-center rounded text-white/30 hover:text-white/70 hover:bg-white/10 transition-all duration-150"
                              >
                                <IconWrapper name="X" size={10} />
                              </motion.button>
                            </div>

                            {/* Email row */}
                            <div className="flex items-center gap-2 mb-2.5">
                              <img src={gmailLogo} alt="Gmail" className="w-4 h-4 object-contain flex-shrink-0" />
                              <span style={{ fontFamily: "'Outfit', sans-serif" }} className="text-white/80 text-[11px] font-medium tracking-tight leading-none truncate">
                                23ra1a05b0@kpritech.ac.in
                              </span>
                            </div>

                            {/* Action buttons — icons only */}
                            <div className="flex gap-1.5">
                              <motion.button
                                onClick={handleCopyEmail}
                                whileTap={{ scale: 0.92 }}
                                title={emailCopied ? "Copied!" : "Copy email"}
                                className={`flex-1 flex items-center justify-center py-1.5 rounded-md border transition-all duration-200 ${emailCopied
                                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                                  : 'border-white/8 bg-white/[0.04] hover:bg-white/[0.09] text-white/50 hover:text-white/90'
                                  }`}
                              >
                                <IconWrapper name={emailCopied ? "Check" : "Copy"} size={12} />
                              </motion.button>

                              <motion.a
                                href="mailto:23ra1a05b0@kpritech.ac.in"
                                whileTap={{ scale: 0.92 }}
                                title="Compose email"
                                className="flex-1 flex items-center justify-center py-1.5 rounded-md bg-red-500/80 hover:bg-red-500 text-white transition-all duration-200"
                              >
                                <IconWrapper name="Send" size={12} />
                              </motion.a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <motion.a
                    href="https://www.youtube.com/@DevRaj96660"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] backdrop-blur-md hover:border-red-500/50 hover:bg-red-500/[0.03] transition-all duration-300 p-2.5 overflow-hidden"
                    title="YouTube"
                  >
                    <img src={youtubeLogo} alt="YouTube" className="w-full h-full object-contain" />
                  </motion.a>
                </div>

                <div className="relative z-10 w-full max-w-[1000px] text-left">
                  <div className='dot'></div>
                  <motion.h2
                    variants={cinematicItem}
                    className='text-4xl md:text-5xl lg:text-6xl font-[800] mb-6 leading-tight drop-shadow-lg'
                  >
                    <span className='text-white block'>RAJU</span>
                    <span className='text-red-500 block -mt-1'>PERUMALLA</span>
                  </motion.h2>
                  <motion.p
                    variants={cinematicItem}
                    className='text-white/70 text-sm md:text-base lg:text-lg mb-8 leading-relaxed'
                  >
                    Full Stack Web & Android Developer | Data-Driven Systems | FastAPI | ML Predictive Modeling | API & System Design | Android Projects | YouTube Creator (2.5K+)
                  </motion.p>
                  <motion.div
                    variants={cinematicItem}
                    className='flex flex-wrap gap-4 justify-start mt-6'
                  >
                    <a href='#projects' className='button flex items-center justify-center'>
                      View Work
                    </a>
                    <a href='#contact' className='button flex items-center justify-center'>
                      Contact Me
                    </a>
                  </motion.div>
                </div>
              </Tilt>
            </div>

            <div className='relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] flex-shrink-0 group lg:-ml-16' style={{ perspective: '1200px' }}>
              <div className='absolute inset-0 bg-gradient-to-br from-red-500/40 to-blue-500/40 rounded-full animate-pulse blur-3xl opacity-40 group-hover:from-red-500/60 group-hover:to-blue-600/60 group-hover:opacity-100 transition-all duration-500'></div>
              <FloatingLogos logos={[htmlLogo, cssLogo, jsLogo, reactLogo, dockerLogo, githubLogo, javaLogo, cppLogo, cloudLogo, dbLogo, nodeLogo, pythonLogo]} />
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={1.02}
                speed={400}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glarePosition="all"
                glareBorderRadius="50%"
                className="w-full h-full rounded-full"
              >
                <img
                  src={myLogo}
                  alt="Raju Perumalla"
                  className='relative w-full h-full object-cover rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10'
                  style={{
                    maskImage: 'radial-gradient(circle, black 65%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 100%)'
                  }}
                />
              </Tilt>
            </div>
          </motion.div>



        </section>


        {/* Tech Stack Scrolling Marquee */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cinematicContainer}
          className='py-12 border-y border-white/5 bg-[#0c0c0d] overflow-hidden relative marquee-container'
        >
          <div className='w-[115%] max-w-none -mx-[7.5%] overflow-hidden flex flex-col gap-4 md:gap-6 -rotate-[10deg] scale-125 py-4'>
            {/* Row 1: Moving Right-to-Left */}
            <div className='flex whitespace-nowrap animate-marquee w-max' style={{ animationDelay: '3s' }}>
              {[htmlLogo, jsLogo, reactLogo, javaLogo, dockerLogo, githubLogo, socialLogo, cppLogo, cloudLogo, dbLogo, cssLogo, nodeLogo, pythonLogo, sqlLogo].map((logo, i) => (
                <div key={i} className='inline-block px-12 md:px-16 opacity-70 hover:opacity-100 transition-opacity duration-500'>
                  <img src={logo} alt="tech" className={`h-14 w-14 md:h-24 md:w-24 object-contain ${[sqlLogo, pythonLogo, javaLogo, cppLogo, cloudLogo].includes(logo) ? 'scale-[1.35]' : ''}`} />
                </div>
              ))}
              {[htmlLogo, jsLogo, reactLogo, javaLogo, dockerLogo, githubLogo, socialLogo, cppLogo, cloudLogo, dbLogo, cssLogo, nodeLogo, pythonLogo, sqlLogo].map((logo, i) => (
                <div key={i + 'copy'} className='inline-block px-12 md:px-16 opacity-70 hover:opacity-100 transition-opacity duration-500'>
                  <img src={logo} alt="tech" className={`h-14 w-14 md:h-24 md:w-24 object-contain ${[sqlLogo, pythonLogo, javaLogo, cppLogo, cloudLogo].includes(logo) ? 'scale-[1.35]' : ''}`} />
                </div>
              ))}
            </div>

            {/* Row 2: Moving Left-to-Right (Reverse) */}
            <div className='flex whitespace-nowrap animate-marquee-reverse w-max'>
              {[cppLogo, cloudLogo, dbLogo, cssLogo, nodeLogo, pythonLogo, sqlLogo, htmlLogo, jsLogo, reactLogo, javaLogo, dockerLogo, githubLogo, socialLogo].map((logo, i) => (
                <div key={i} className='inline-block px-12 md:px-16 opacity-70 hover:opacity-100 transition-opacity duration-500'>
                  <img src={logo} alt="tech" className={`h-14 w-14 md:h-24 md:w-24 object-contain ${[sqlLogo, pythonLogo, javaLogo, cppLogo, cloudLogo].includes(logo) ? 'scale-[1.35]' : ''}`} />
                </div>
              ))}
              {[cppLogo, cloudLogo, dbLogo, cssLogo, nodeLogo, pythonLogo, sqlLogo, htmlLogo, jsLogo, reactLogo, javaLogo, dockerLogo, githubLogo, socialLogo].map((logo, i) => (
                <div key={i + 'copy'} className='inline-block px-12 md:px-16 opacity-70 hover:opacity-100 transition-opacity duration-500'>
                  <img src={logo} alt="tech" className={`h-14 w-14 md:h-24 md:w-24 object-contain ${[sqlLogo, pythonLogo, javaLogo, cppLogo, cloudLogo].includes(logo) ? 'scale-[1.35]' : ''}`} />
                </div>
              ))}
            </div>

            {/* Row 3: Moving Right-to-Left */}
            <div className='flex whitespace-nowrap animate-marquee w-max'>
              {[reactLogo, javaLogo, dockerLogo, githubLogo, socialLogo, cppLogo, cloudLogo, dbLogo, cssLogo, nodeLogo, pythonLogo, sqlLogo, htmlLogo, jsLogo].map((logo, i) => (
                <div key={i} className='inline-block px-12 md:px-16 opacity-70 hover:opacity-100 transition-opacity duration-500'>
                  <img src={logo} alt="tech" className={`h-14 w-14 md:h-24 md:w-24 object-contain ${[sqlLogo, pythonLogo, javaLogo, cppLogo, cloudLogo].includes(logo) ? 'scale-[1.35]' : ''}`} />
                </div>
              ))}
              {[reactLogo, javaLogo, dockerLogo, githubLogo, socialLogo, cppLogo, cloudLogo, dbLogo, cssLogo, nodeLogo, pythonLogo, sqlLogo, htmlLogo, jsLogo].map((logo, i) => (
                <div key={i + 'copy'} className='inline-block px-12 md:px-16 opacity-70 hover:opacity-100 transition-opacity duration-500'>
                  <img src={logo} alt="tech" className={`h-14 w-14 md:h-24 md:w-24 object-contain ${[sqlLogo, pythonLogo, javaLogo, cppLogo, cloudLogo].includes(logo) ? 'scale-[1.35]' : ''}`} />
                </div>
              ))}
            </div>
          </div>
        </motion.section>
        <section id='about' ref={aboutSectionRef} className='py-20 md:py-24 px-8 md:px-12 my-12 grid lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-start relative overflow-hidden'>
          {/* Blurred background with left-right feathering, no border */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md -z-10" style={{
            maskImage: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent)'
          }} />

          {/* Decorative Glowing Accent Behind Column */}
          <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
          <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />


          {/* Left Column: Interactive Narrative System */}
          <motion.div
            initial={{ x: -40, opacity: 0, filter: 'blur(8px)' }}
            whileInView={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col h-full justify-between"
          >
            <div>
              <h3 className='text-blue-500 font-semibold mb-4 flex items-center gap-2 text-sm tracking-widest uppercase'>
                <span className='h-px w-8 bg-blue-500 block' /> About Me
              </h3>

              {(() => {
                const currentTab = aboutTabs[activeCardIndex] || aboutTabs[0];
                return (
                  <div>
                    <h2 className='text-4xl md:text-5xl font-black mb-4 tracking-tight leading-[1.15] text-white'>
                      {currentTab.title} <br />
                      <span className='text-red-500'>{currentTab.titleHighlight}</span>
                    </h2>

                    {currentTab.tagline && (
                      <p className='text-xs md:text-sm font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-2 rounded-xl mb-6 leading-relaxed tracking-normal max-w-xl'>
                        {currentTab.tagline}
                      </p>
                    )}

                    {/* Modern Liquid Sliding Tabs Selector */}
                    <div className="flex flex-wrap gap-2 p-1.5 bg-white/[0.02] border border-white/5 rounded-full mb-8 w-fit backdrop-blur-md">
                      {aboutTabs.map((tab, idx) => {
                        const isActive = activeCardIndex === idx;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              setAnimDirection(idx > activeCardIndex ? 1 : -1);
                              setActiveCardIndex(idx);
                            }}
                            className={`relative px-4 py-2 rounded-full text-xs md:text-sm font-semibold tracking-wider transition-colors duration-300 flex items-center gap-2 ${isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                              }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="aboutActiveTab"
                                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -z-10 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                              />
                            )}
                            <IconWrapper name={tab.icon} size={15} />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Narrative body with smooth slide/blur switcher */}
                    <div className="relative min-h-[160px] md:min-h-[140px]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeCardIndex}
                          initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                        >
                          <p className='text-white/60 text-lg leading-relaxed mb-8'>
                            {currentTab.content}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className='flex flex-wrap gap-4 justify-start pt-6 border-t border-white/5 mt-auto'>
              <button className='button flex items-center gap-2'>
                View Projects <IconWrapper name='ArrowUpRight' size={16} />
              </button>
              <button className='button flex items-center gap-2'>
                Get in Touch <IconWrapper name='Send' size={15} />
              </button>
            </div>
          </motion.div>          {/* Right Column: Carousel with slide animation */}
          <div
            className="relative w-full overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)'
            }}
            onMouseEnter={() => setIsAboutCardsHovered(true)}
            onMouseLeave={() => setIsAboutCardsHovered(false)}
          >
            <AnimatePresence mode="wait" custom={animDirection}>
              <motion.div
                key={activeCardIndex}
                custom={animDirection}
                variants={{
                  enter: (dir) => ({ x: dir >= 0 ? '100%' : '-100%', opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (dir) => ({ x: dir >= 0 ? '-100%' : '100%', opacity: 0 })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
              >
                {/* Card 0: About Me */}
                {activeCardIndex === 0 && (
                  <BentoCard
                    disableAnimation={true}
                    spotlightClass="spotlight-blue"
                    className="w-full h-[400px] md:h-[440px] relative overflow-hidden !rounded-none"
                  >
                    <div className="absolute inset-0 bg-grid-card opacity-[0.03] pointer-events-none" />
                    {/* Profile layout: photo right full-height, info left */}
                    <div className="flex h-full gap-5">
                      {/* Left: info */}
                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <span className="text-[9px] font-bold text-blue-400 tracking-widest uppercase bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">Full-Stack • Android • ML</span>
                          <h4 className="font-bold text-white text-base md:text-lg mt-4 leading-tight">Raju Perumalla</h4>
                          <p className="text-[11px] text-white/50 mt-2.5 leading-relaxed">
                            Creating modern digital experiences through robust API engineering, intelligent machine learning workflows, and responsive web & mobile client architectures.
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-3">
                          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-center hover:bg-white/[0.04] transition-all duration-300">
                            <span className="text-xs md:text-sm font-black text-blue-400">3+</span>
                            <p className="text-[8px] text-white/40 uppercase tracking-widest mt-0.5">Years</p>
                          </div>
                          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-center hover:bg-white/[0.04] transition-all duration-300">
                            <span className="text-xs md:text-sm font-black text-purple-400">15+</span>
                            <p className="text-[8px] text-white/40 uppercase tracking-widest mt-0.5">Projects</p>
                          </div>
                          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-center hover:bg-white/[0.04] transition-all duration-300">
                            <span className="text-xs md:text-sm font-black text-red-400">2.5K+</span>
                            <p className="text-[8px] text-white/40 uppercase tracking-widest mt-0.5">Subs</p>
                          </div>
                        </div>
                      </div>
                      {/* Right: full-height image, no box/border, feathered bottom mask */}
                      <div className="flex-shrink-0 self-stretch flex items-end">
                        <img
                          src={profilePhoto}
                          alt="Raju Perumalla"
                          className="h-full w-auto object-contain object-bottom hover:scale-105 transition-transform duration-500"
                          style={{
                            maskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)'
                          }}
                        />
                      </div>
                    </div>
                  </BentoCard>
                )}

                {/* Card 1: Featured Projects */}
                {activeCardIndex === 1 && (
                  <BentoCard
                    disableAnimation={true}
                    spotlightClass="spotlight-emerald"
                    className="w-full h-[400px] md:h-[440px] relative overflow-hidden !rounded-none"
                  >
                    <div className="absolute inset-0 bg-grid-card opacity-[0.03] pointer-events-none" />
                    <div className="flex justify-between items-start w-full">
                      <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                        <IconWrapper name="Layers" size={20} />
                      </div>
                      <span className="text-[9px] font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase">Production Ready</span>
                    </div>
                    <div className="mt-auto space-y-2.5">
                      {[
                        { name: 'Smart Guardian', tech: 'AI / Real-time Security & Android', badge: 'Active Dev', color: 'border-blue-500/20 text-blue-400 bg-blue-500/5' },
                        { name: 'AI Student Travel Planner', tech: 'LLM Agent / React / Node.js', badge: 'Intelligent', color: 'border-purple-500/20 text-purple-400 bg-purple-500/5' },
                        { name: 'Helmet Detection System', tech: 'ML / YOLOv8 / Computer Vision', badge: 'Model Train', color: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' },
                      ].map((p) => (
                        <div key={p.name} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 transition-all duration-300">
                          <div>
                            <p className="text-[11px] font-bold text-white tracking-wide">{p.name}</p>
                            <p className="text-[9px] text-white/40 font-mono mt-0.5">{p.tech}</p>
                          </div>
                          <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${p.color}`}>{p.badge}</span>
                        </div>
                      ))}
                    </div>
                  </BentoCard>
                )}

                {/* Card 2: Experience */}
                {activeCardIndex === 2 && (
                  <BentoCard
                    disableAnimation={true}
                    spotlightClass="spotlight-blue"
                    className="w-full h-[400px] md:h-[440px] relative overflow-hidden !rounded-none"
                  >
                    <div className="absolute inset-0 bg-grid-card opacity-[0.03] pointer-events-none" />
                    <div className="flex justify-between items-start w-full">
                      <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                        <IconWrapper name="Briefcase" size={20} />
                      </div>
                      <span className="text-[9px] font-bold tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full uppercase">Concept to Deploy</span>
                    </div>
                    <div className="mt-auto space-y-2.5">
                      {[
                        { role: 'Full Stack & Android Development', desc: 'Crafting responsive interfaces, mobile apps, and robust systems.', period: '2021 – Present' },
                        { role: 'Artificial Intelligence & ML', desc: 'Predictive modeling, data systems, and smart automation pipelines.', period: '2023 – Present' },
                        { role: 'Technical Session Host & Mentor', desc: 'Hosted 4+ workshops sharing engineering knowledge on modern tech.', period: 'Active' },
                      ].map((e) => (
                        <div key={e.role} className="p-3 rounded-lg bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 transition-all duration-300">
                          <div className="flex justify-between items-center">
                            <p className="text-[11px] font-bold text-white tracking-wide">{e.role}</p>
                            <span className="text-[8px] text-blue-400 font-mono bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">{e.period}</span>
                          </div>
                          <p className="text-[9px] text-white/40 mt-1 leading-normal">{e.desc}</p>
                        </div>
                      ))}
                    </div>
                  </BentoCard>
                )}

                {/* Card 3: Achievements */}
                {activeCardIndex === 3 && (
                  <BentoCard
                    disableAnimation={true}
                    spotlightClass="spotlight-red"
                    className="w-full h-[400px] md:h-[440px] relative overflow-hidden !rounded-none"
                  >
                    <div className="absolute inset-0 bg-grid-card opacity-[0.03] pointer-events-none" />
                    <div className="flex justify-between items-start w-full">
                      <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                        <IconWrapper name="Trophy" size={20} />
                      </div>
                      <span className="text-[9px] font-bold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase">Leadership & Milestones</span>
                    </div>
                    <div className="mt-auto space-y-2">
                      {/* Google */}
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 transition-all duration-300">
                        <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0">
                          <img src={googleLogo} alt="Google" className="w-5 h-5 object-contain" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-white tracking-wide">Google Student Ambassador 2026</p>
                          <p className="text-[9px] text-white/40 mt-0.5">Selected lead for developer programs</p>
                        </div>
                      </div>
                      {/* SAP */}
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 transition-all duration-300">
                        <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0">
                          <img src={sapLogo} alt="SAP" className="w-6 h-6 object-contain" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-white tracking-wide">SAP Innovation Marathon 4.0 Finalist</p>
                          <p className="text-[9px] text-white/40 mt-0.5">Pitched scalable software architecture</p>
                        </div>
                      </div>
                      {/* Sessions */}
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 transition-all duration-300">
                        <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0">
                          <IconWrapper name="Presentation" size={14} className="text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-white tracking-wide">Hosted 4+ Technical Sessions</p>
                          <p className="text-[9px] text-white/40 mt-0.5">AI and software development workshops</p>
                        </div>
                      </div>
                      {/* YouTube */}
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 transition-all duration-300">
                        <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0">
                          <img src={youtubeLogo} alt="YouTube" className="w-5 h-5 object-contain" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-white tracking-wide">2.5K+ Community Creator</p>
                          <p className="text-[9px] text-white/40 mt-0.5">Educational technical video creation</p>
                        </div>
                      </div>
                    </div>
                  </BentoCard>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  setAnimDirection(-1);
                  setActiveCardIndex(i => (i - 1 + 4) % 4);
                }}
                aria-label="Previous card"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 hover:text-white text-white/60 transition-all duration-300 shadow-md backdrop-blur-sm"
              >
                <IconWrapper name="ChevronLeft" size={16} />
              </button>

              <div className="flex gap-2">
                {[0, 1, 2, 3].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setAnimDirection(idx > activeCardIndex ? 1 : -1);
                      setActiveCardIndex(idx);
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeCardIndex === idx
                        ? 'w-7 bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                        : 'w-2.5 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setAnimDirection(1);
                  setActiveCardIndex(i => (i + 1) % 4);
                }}
                aria-label="Next card"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 hover:text-white text-white/60 transition-all duration-300 shadow-md backdrop-blur-sm"
              >
                <IconWrapper name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        </section>


        {/* Skills Section */}
        <section id='skills' ref={skillsSectionRef} className='py-32'>
          <div className='text-center mb-20 flex flex-col items-center'>
            <h3 className='text-blue-500 font-semibold mb-4 flex items-center justify-center gap-2 text-sm tracking-widest uppercase'>
              <span className='h-px w-8 bg-blue-500 block' /> Technical Expertise <span className='h-px w-8 bg-blue-500 block' />
            </h3>
            <h2 className='text-4xl md:text-5xl font-black tracking-tight leading-[1.15] text-white'>
              Core Technologies &amp; <br /><span className='text-gradient'>Engineering Stack</span>
            </h2>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {[
              { name: 'React', level: '95%', logo: reactLogo },
              { name: 'Java', level: '90%', logo: javaLogo },
              { name: 'JavaScript', level: '92%', logo: jsLogo },
              { name: 'HTML5', level: '98%', logo: htmlLogo },
              { name: 'CSS3', level: '95%', logo: cssLogo },
              { name: 'Docker', level: '75%', logo: dockerLogo },
              { name: 'GitHub', level: '92%', logo: githubLogo },
              { name: 'Social Apps', level: '88%', logo: socialLogo },
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className='premium-card p-6 flex flex-col items-center text-center group'
              >
                <div className='w-16 h-16 mb-4 flex items-center justify-center p-3 glass rounded-xl group-hover:border-primary/50 transition-colors'>
                  <img src={skill.logo} alt={skill.name} className='w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500' />
                </div>
                <h4 className='font-bold mb-2'>{skill.name}</h4>
                <div className='w-full bg-white/5 h-1.5 rounded-full overflow-hidden'>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className='h-full bg-gradient-to-r from-blue-500 to-purple-500'
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id='projects' className='py-32'>
          <div className='flex justify-between items-end mb-20'>
            <div>
              <h3 className='text-blue-500 font-medium mb-4 flex items-center gap-2'>
                <div className='h-px w-8 bg-blue-500' /> Portfolio
              </h3>
              <h2 className='text-4xl font-bold'>Featured <span className='text-gradient'>Projects</span></h2>
            </div>
          </div>

          <div className='parent movie_grid'>
            <div className='movie_card div1' id='bright'>
              <div className='info_section'>
                <div className='movie_header'>
                  <img className='locandina' src='https://movieplayer.net-cdn.it/t/images/2017/12/20/bright_jpg_191x283_crop_q85.jpg' alt='project' />
                  <h1>Premium E-commerce</h1>
                  <h4>2024, Raju Perumalla</h4>
                  <span className='minutes'>—</span>
                  <p className='type'>Next.js, Tailwind, Stripe</p>
                </div>
                <div className='movie_desc'>
                  <p className='text'>Full featured digital store with Stripe integration and motion UI.</p>
                </div>
                <div className='movie_social'>
                  <ul className='flex gap-3 items-center'>
                    <li className='w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-1.5 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300'>
                      <img src={reactLogo} className='w-full h-full object-contain' alt='React/Next' />
                    </li>
                    <li className='w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-1.5 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300'>
                      <img src={cssLogo} className='w-full h-full object-contain' alt='CSS/Tailwind' />
                    </li>
                    <li className='w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-1.5 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300'>
                      <img src={jsLogo} className='w-full h-full object-contain' alt='JavaScript' />
                    </li>
                  </ul>
                </div>
              </div>
              <div className='blur_back bright_back'></div>
            </div>

            <div className='movie_card div2' id='tomb'>
              <div className='info_section'>
                <div className='movie_header'>
                  <img className='locandina' src='https://mr.comingsoon.it/imgdb/locandine/235x336/53750.jpg' alt='project' />
                  <h1>Social Connect App</h1>
                  <h4>2023, Raju Perumalla</h4>
                  <span className='minutes'>—</span>
                  <p className='type'>Kotlin, Firebase, Jetpack Compose</p>
                </div>
                <div className='movie_desc'>
                  <p className='text'>Native Android application for social networking with real-time chat.</p>
                </div>
                <div className='movie_social'>
                  <ul className='flex gap-3 items-center'>
                    <li className='w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-1.5 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300'>
                      <img src={javaLogo} className='w-full h-full object-contain' alt='Java/Kotlin' />
                    </li>
                    <li className='w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-1.5 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300'>
                      <img src={socialLogo} className='w-full h-full object-contain' alt='Firebase/Social' />
                    </li>
                  </ul>
                </div>
              </div>
              <div className='blur_back tomb_back'></div>
            </div>

            <div className='movie_card div3' id='ave'>
              <div className='info_section'>
                <div className='movie_header'>
                  <img className='locandina' src='https://mr.comingsoon.it/imgdb/locandine/235x336/53715.jpg' alt='project' />
                  <h1>AI Image Generator</h1>
                  <h4>2024, Raju Perumalla</h4>
                  <span className='minutes'>—</span>
                  <p className='type'>React, OpenAI, Cloudinary</p>
                </div>
                <div className='movie_desc'>
                  <p className='text'>SaaS platform that generates high-quality images using DALL-E API.</p>
                </div>
                <div className='movie_social'>
                  <ul className='flex gap-3 items-center'>
                    <li className='w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-1.5 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300'>
                      <img src={reactLogo} className='w-full h-full object-contain' alt='React' />
                    </li>
                    <li className='w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-1.5 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300'>
                      <img src={jsLogo} className='w-full h-full object-contain' alt='JavaScript' />
                    </li>
                    <li className='w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-1.5 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300'>
                      <img src={githubLogo} className='w-full h-full object-contain' alt='GitHub' />
                    </li>
                  </ul>
                </div>
              </div>
              <div className='blur_back ave_back'></div>
            </div>

            <div className='movie_card div4' id='nova'>
              <div className='info_section'>
                <div className='movie_header'>
                  <img className='locandina' src='https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=abcd' alt='project' />
                  <h1>Design System</h1>
                  <h4>2025, Raju Perumalla</h4>
                  <span className='minutes'>—</span>
                  <p className='type'>React, Storybook, Tokens</p>
                </div>
                <div className='movie_desc'>
                  <p className='text'>Shared component library and design tokens for scalable UI.</p>
                </div>
                <div className='movie_social'>
                  <ul className='flex gap-3 items-center'>
                    <li className='w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-1.5 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300'>
                      <img src={reactLogo} className='w-full h-full object-contain' alt='React' />
                    </li>
                    <li className='w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-1.5 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300'>
                      <img src={cssLogo} className='w-full h-full object-contain' alt='CSS' />
                    </li>
                    <li className='w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-1.5 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300'>
                      <img src={htmlLogo} className='w-full h-full object-contain' alt='HTML' />
                    </li>
                  </ul>
                </div>
              </div>
              <div className='blur_back nova_back'></div>
            </div>
          </div>
        </section>

        {/* Indian Names List */}
        <section id='community' className='py-16'>
          <div className='mb-8'>
            <h3 className='text-blue-500 font-medium mb-2 flex items-center gap-2'>
              <div className='h-px w-8 bg-blue-500' /> Community
            </h3>
            <h2 className='text-2xl font-bold'>Local Contributors</h2>
          </div>

          {/* Indian Names List */}
          <div className='indian-list mt-12'>
            <ul>
              <li style={{ '--i': 1 }}>
                <img src='https://i.postimg.cc/ZRCLqjNq/user-img1.jpg' alt='user image' />
                <div className='content'>
                  <h3>Arjun Rao</h3>
                  <p>Bengaluru, KA</p>
                </div>
              </li>
              <li style={{ '--i': 2 }}>
                <img src='https://i.postimg.cc/C1XsnDCs/user-img2.jpg' alt='user image' />
                <div className='content'>
                  <h3>Priya Sharma</h3>
                  <p>Mumbai, MH</p>
                </div>
              </li>
              <li style={{ '--i': 3 }}>
                <img src='https://i.postimg.cc/qqKXsRjV/user-img3.jpg' alt='user image' />
                <div className='content'>
                  <h3>Rohan Kapoor</h3>
                  <p>New Delhi, DL</p>
                </div>
              </li>
              <li style={{ '--i': 4 }}>
                <img src='https://i.postimg.cc/QNKbG4s4/user-img4.jpg' alt='user image' />
                <div className='content'>
                  <h3>Ananya Patel</h3>
                  <p>Ahmedabad, GJ</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section id='contact' className='py-32'>
          <div className="flex flex-col items-start justify-center w-full max-w-[1440px] mx-auto px-4 gap-12 text-left">

            {/* Main 2-Column Row for Contact Section */}
            <div className="flex flex-col lg:flex-row items-start justify-between w-full max-w-[1300px] gap-12 md:gap-8 mx-auto text-left">

              {/* Left Side: Heading, Socials & Profile */}
              <div className="w-full lg:w-1/2 flex flex-col items-start gap-8">
                <div className="text-left">
                  <h2 className='text-4xl font-bold mb-6'>Let's craft something <br /><span className='text-gradient'>Legendary</span></h2>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-8 w-full">
                  {/* Social Card Wrapper */}
                  <div className="relative flex-shrink-0 w-full max-w-[300px]">
                    <div className="social-card" onMouseEnter={() => setHasHoveredSocial(true)}>
                      <div className="social-background"></div>
                      <div className="social-title">Socials</div>

                      <a href="https://www.instagram.com/impressive_dev_34?igsh=eGtsMjNwMWZ2YTh2" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsInstaHovered(true)} onMouseLeave={() => setIsInstaHovered(false)}>
                        <div className="social-link instagram">
                          <span className="social-icon">
                            <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className="social-icon-svg">
                              <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
                            </svg>
                          </span>
                        </div>
                      </a>

                      <a href="##" onMouseEnter={() => setIsFacebookHovered(true)} onMouseLeave={() => setIsFacebookHovered(false)}>
                        <div className="social-link facebook">
                          <span className="social-icon">
                            <svg viewBox="0 0 320 512" style={{ width: '25px', height: '25px' }} xmlns="http://www.w3.org/2000/svg" className="social-icon-svg">
                              <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06H297V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                            </svg>
                          </span>
                        </div>
                      </a>
                      <a href="###" onMouseEnter={() => setIsDiscordHovered(true)} onMouseLeave={() => setIsDiscordHovered(false)}>
                        <div className="social-link discord">
                          <span className="social-icon">
                            <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" className="social-icon-svg">
                              <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
                            </svg>
                          </span>
                        </div>
                      </a>

                      <div className="social-link empty"></div>
                    </div>

                    {/* Hover Hint */}
                    {!hasHoveredSocial && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-white/40 flex items-center gap-1 whitespace-nowrap">
                        <span className="animate-pulse">Dive Deep here</span>
                        <span className="inline-block animate-bounce">↓</span>
                      </div>
                    )}
                  </div>

                  {/* Text and Dynamic Card (Right of Social Card) */}
                  <div className="flex flex-col justify-start gap-10 max-w-[450px]">
                    <p className="text-white/60" style={{ marginLeft: '5px' }}>
                      Available for full-time roles,
                      <br />internships, and freelance projects.
                      <br />Let's connect and build something great together.
                    </p>
                    {/* Instagram Profile Card */}
                    <AnimatePresence mode="wait">
                      {isInstaHovered && (
                        <motion.div
                          key="insta-card"
                          initial={{ opacity: 0, y: -15, scale: 1 }}
                          animate={{ opacity: 1, y: -20, scale: 1.02 }}
                          exit={{ opacity: 0, y: -28, scale: 0.96 }}
                          transition={{ type: 'tween', duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                          style={{ marginLeft: '4px' }}
                          className="premium-card p-5 bg-gradient-to-br from-[#833ab4]/20 via-[#fd1d1d]/20 to-[#fcb045]/20 border border-pink-500/30 rounded-xl w-[320px]"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-[2px] flex-shrink-0">
                              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                <img src={instaProfile} alt="Profile" className="w-full h-full object-cover" />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-white text-base">@impressive_dev_34</h3>
                              <p className="text-sm text-white/60">D Σ ∇ Я ∆Ｊ [ راجو ]</p>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between text-sm text-white/80">
                            <div><span className="font-bold">590</span> Followers</div>
                            <div><span className="font-bold">50</span> Following</div>
                          </div>
                          <div className="mt-3 text-sm text-white/60 line-clamp-2">
                            Speaker | Developer | Digital Creator
                          </div>
                        </motion.div>
                      )}
                      {isFacebookHovered && (
                        <motion.div
                          key="fb-card"
                          initial={{ opacity: 0, y: -15, scale: 1 }}
                          animate={{ opacity: 1, y: -20, scale: 1.02 }}
                          exit={{ opacity: 0, y: -28, scale: 0.96 }}
                          transition={{ type: 'tween', duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                          style={{ marginLeft: '4px' }}
                          className="premium-card p-5 bg-gradient-to-br from-[#1877F2]/20 to-[#0e5a9c]/20 border border-blue-500/30 rounded-xl w-[320px]"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1877F2] to-[#0e5a9c] p-[2px] flex-shrink-0">
                              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                <img src="https://i.pravatar.cc/100?img=33" alt="Avatar" className="w-full h-full object-cover" />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-white text-base">Raju Perumalla</h3>
                              <p className="text-sm text-white/60">Facebook Profile</p>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between text-sm text-white/80">
                            <div><span className="font-bold">1.5k</span> Friends</div>
                            <div><span className="font-bold">200</span> Following</div>
                          </div>
                          <div className="mt-3 text-sm text-white/60 line-clamp-2">
                            Web Developer | Tech Enthusiast
                          </div>
                        </motion.div>
                      )}
                      {isDiscordHovered && (
                        <motion.div
                          key="discord-card"
                          initial={{ opacity: 0, y: -15, scale: 1 }}
                          animate={{ opacity: 1, y: -20, scale: 1.02 }}
                          exit={{ opacity: 0, y: -28, scale: 0.96 }}
                          transition={{ type: 'tween', duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                          style={{ marginLeft: '4px' }}
                          className="premium-card p-5 bg-gradient-to-br from-[#5865F2]/20 to-[#7289DA]/20 border border-indigo-500/30 rounded-xl w-[320px]"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5865F2] to-[#7289DA] p-[2px] flex-shrink-0">
                              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=gaming" alt="Avatar" className="w-full h-full object-cover" />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-white text-base">rajuperumalla</h3>
                              <p className="text-sm text-white/60">Discord Profile</p>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between text-sm text-white/80">
                            <div><span className="font-bold">Online</span></div>
                            <div><span className="font-bold">Gaming | Coding</span></div>
                          </div>
                          <div className="mt-3 text-sm text-white/60 line-clamp-2">
                            Join my server or DM me!
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Divider Line */}
              <div className="hidden lg:block w-[1px] h-[450px] bg-gradient-to-b from-transparent via-white/10 to-transparent self-center translate-x-[100px]"></div>

              {/* Right Side: Let's Connect Form */}
              <div className="w-full lg:w-1/2 flex justify-end translate-x-[60px]">
                {/* Let's Connect Bento Card */}
                <BentoCard spotlightClass="spotlight-blue" className="w-full max-w-[500px] h-[450px] !p-8 flex flex-col justify-between ml-auto">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <IconWrapper name="Send" size={24} className="text-blue-400" />
                      <h3 className="font-bold text-white text-2xl tracking-tight">Let's Connect</h3>
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed">
                      Send me a message and I'll get back to you soon.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-white/40">Name</label>
                        <input
                          className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all duration-200"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-white/40">Email</label>
                        <input
                          type="email"
                          className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all duration-200"
                          placeholder="you@email.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/40">Message</label>
                      <textarea
                        rows={5}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all duration-200 resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    <button className="w-full py-4 bg-blue-500 hover:bg-blue-600 active:scale-[0.98] rounded-lg text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 group mt-2">
                      Send Message
                      <IconWrapper name="Send" size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </button>
                  </div>
                </BentoCard>
              </div>
            </div>

          </div>

        </section>
      </main>

      <footer className='py-10 border-t border-white/5 text-center text-white/40 text-sm'>
        <p>© 2026 Raju Perumalla. All rights reserved.</p>
      </footer>

      {/* SVG Filters for Liquid Glass Effect */}
      <svg style={{ display: 'none' }}>
        <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="1" seed="5" result="turbulence" />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100" lightingColor="white" result="specLight">
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
          <feDisplacementMap in="SourceGraphic" in2="softMap" scale="150" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap in="SourceGraphic" in2="blurred" scale="70" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </div>
  );
};

export default App;
