import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import webPhoto from './OSAH2023-original.2f4567c88a1f1cdeeac8.jpeg';
import resumePDF from './Moaz_Sholook_SWE_Fall_2026_Resume.pdf';
import shopifyLogo from './shopify-logo.png';
import isedLogo from './ISED_Canada_Logo.jpg';
import biocareLogo from './logos/biocare-logo-full.png';
import ecolensImg from './ecolens-screenshot.png';
import insulinPumpImg from './insulin-pump-screenshot.png';
import { IconContext } from 'react-icons';
import {
  FaEnvelope, FaLinkedin, FaGithub, FaMoon, FaSun,
  FaBars, FaTimes, FaExternalLinkAlt, FaPlay,
  FaTrophy, FaUsers, FaArrowRight, FaChevronDown
} from 'react-icons/fa';

function AnimateOnScroll({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-in ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const workCards = [
  {
    company: 'Shopify',
    role: 'Software Engineering Intern',
    logo: shopifyLogo,
    bgColor: '#95bf47',
    borderColor: '#7da83c',
    invertLogo: true,
    tech: ['Ruby', 'Rails', 'React', 'TypeScript', 'GraphQL'],
    link: 'https://shopify.com',
  },
  {
    company: 'ISED Canada',
    role: 'Software Engineering Intern',
    logo: isedLogo,
    bgColor: '#ffffff',
    borderColor: '#e8112d',
    tech: ['JavaScript', 'Spring Boot', 'Node.js'],
    link: 'https://ised-isde.canada.ca',
  },
];

const projects = [
  {
    name: 'EcoLens',
    badge: 'Hackathon',
    badgeIcon: <FaTrophy />,
    description: 'Scan any product to see its carbon footprint, discover alternatives, and build your EcoScore.',
    tech: ['React', 'Python', 'AI/ML'],
    github: 'https://github.com/ismailahmed1/eco-lens',
    demo: 'https://www.linkedin.com/feed/update/urn:li:activity:7419584688849260544/',
    event: 'uOttaHack 2026',
    image: ecolensImg,
    borderColor: '#36ae57',
  },
  {
    name: 'Brightspace MCP Server',
    badge: '20+ Active Users',
    badgeIcon: <FaUsers />,
    description: 'Open-source MCP server connecting D2L Brightspace with AI assistants like Claude and Cursor.',
    tech: ['TypeScript', 'Playwright', 'MCP'],
    github: 'https://github.com/Yxxxxs/Brightspace-mcp-server',
    borderColor: '#0066ff',
  },
  {
    name: 'Insulin Pump Simulator',
    badge: 'Demo',
    badgeIcon: <FaPlay />,
    description: 'Full-featured t:slim insulin pump simulator with complete UI and control logic.',
    tech: ['Qt', 'C++'],
    github: 'https://github.com/moazsholook/COMP3004_Proj',
    demo: 'https://www.youtube.com/watch?v=2lVR6Kb2LBk',
    image: insulinPumpImg,
    borderColor: '#8b5cf6',
  },
];

const skillCategories = [
  { name: 'Languages', items: ['Ruby', 'TypeScript', 'JavaScript', 'Python', 'Java', 'C/C++', 'SQL', 'Go', 'Swift', 'HTML/CSS'] },
  { name: 'Frameworks', items: ['Ruby on Rails', 'React.js', 'Node.js/Express', 'Next.js', 'Angular', 'Spring Boot', 'Flask', 'FastAPI'] },
  { name: 'Libraries & APIs', items: ['GraphQL', 'Tailwind CSS', 'Playwright', 'React Polaris', 'TensorFlow', 'PyTorch'] },
  { name: 'Developer Tools', items: ['Git', 'Linux', 'Docker', 'BigQuery', 'AWS', 'Azure', 'Postman', 'JIRA', 'Jenkins'] },
  { name: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'] },
  { name: 'AI Tools', items: ['Claude Code', 'Codex', 'Cursor'] },
];

const roles = ['Software Engineering Intern @ Shopify', 'CS Student @ Carleton University', 'Full-Stack Developer', 'AI/ML Enthusiast'];

function App() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setIsLightMode(prev => !prev);
    document.body.classList.toggle('light-mode');
  };

  const closeMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 30 : 60;
    const pause = isDeleting && typedText === '' ? 300 : (!isDeleting && typedText === current ? 2000 : speed);

    const timer = setTimeout(() => {
      if (!isDeleting && typedText === current) {
        setIsDeleting(true);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else if (isDeleting) {
        setTypedText(current.substring(0, typedText.length - 1));
      } else {
        setTypedText(current.substring(0, typedText.length + 1));
      }
    }, pause);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty('--mx', `${e.clientX}px`);
      spotlightRef.current.style.setProperty('--my', `${e.clientY}px`);
    }
  }, []);

  return (
    <IconContext.Provider value={{ className: 'react-icon' }}>
      <div className={`App ${isLightMode ? 'light-mode' : ''}`} onMouseMove={handleMouseMove} ref={spotlightRef}>
        <div className="cursor-spotlight" />
        <nav className="navbar">
          <div className="nav-content">
            <a href="#home" className="nav-logo">
              <svg className="nav-logo-svg" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#00d4ff" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <path d="M18 2 L32.5 10.5 L32.5 25.5 L18 34 L3.5 25.5 L3.5 10.5 Z" stroke="url(#logoGrad)" strokeWidth="2" fill="none" />
                <path d="M11 23 L11 13 L18 19 L25 13 L25 23" stroke="url(#logoGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </a>
            <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
              <a href="#about" onClick={closeMenu}>About</a>
              <a href="#work" onClick={closeMenu}>Work</a>
              <a href="#skills" onClick={closeMenu}>Skills</a>
              <a href="#projects" onClick={closeMenu}>Projects</a>
              <a href="#contact" onClick={closeMenu}>Contact</a>
              <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                {isLightMode ? <FaMoon /> : <FaSun />}
              </button>
            </div>
          </div>
        </nav>

        <main>
          {/* Hero */}
          <section id="home" className="hero">
            <div className="hero-deco hero-deco-1" />
            <div className="hero-deco hero-deco-2" />
            <div className="hero-content">
              <p className="hero-greeting">Hi, I'm</p>
              <h1 className="hero-name">Moaz Sholook</h1>
              <h2 className="hero-role">
                <span className="typed-text">{typedText}</span>
                <span className="typed-cursor">|</span>
              </h2>
              <div className="cta-buttons">
                <a href={resumePDF} target="_blank" rel="noopener noreferrer" className="btn btn-gradient">
                  <span className="btn-inner">Resume <FaArrowRight /></span>
                </a>
                <a href="#contact" className="btn btn-ghost">Get in Touch</a>
              </div>
            </div>
            <div className="scroll-indicator">
              <span>scroll</span>
              <FaChevronDown className="scroll-arrow" />
              <FaChevronDown className="scroll-arrow scroll-arrow-2" />
            </div>
          </section>

          {/* About */}
          <section id="about" className="section section-dark">
            <div className="section-inner">
              <AnimateOnScroll>
                <h2 className="section-title section-title-center">About</h2>
              </AnimateOnScroll>
              <div className="about-container">
                <AnimateOnScroll delay={100}>
                  <div className="about-content">
                    <p>
                      Fourth-year Computer Science student at Carleton University specializing in Software Engineering &amp; AI/ML.
                      I build things that ship — from billing infrastructure at scale to fraud automation to open-source developer tools.
                    </p>
                    <p>
                      When I'm not coding, you'll find me on a hike, at the gym, or playing sports.
                    </p>
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll delay={250}>
                  <div className="about-image-wrapper">
                    <div className="about-image-ring">
                      <img src={webPhoto} alt="Moaz Sholook" />
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </section>

          {/* Work */}
          <section id="work" className="section section-pattern">
            <div className="section-inner">
              <AnimateOnScroll>
                <h2 className="section-title section-title-center">Work</h2>
                <p className="section-subtitle">Some of the places I've worked at.</p>
              </AnimateOnScroll>
              <div className="work-grid">
                {workCards.map((card, i) => (
                  <AnimateOnScroll key={i} delay={i * 150}>
                    <div
                      className="hero-card"
                      style={{
                        backgroundColor: card.bgColor,
                        borderColor: card.borderColor,
                      }}
                    >
                      <div className="hero-card-visual">
                        <img
                          src={card.logo}
                          alt={card.company}
                          className={`hero-card-logo ${card.invertLogo ? 'hero-card-logo-invert' : ''}`}
                        />
                      </div>
                      <div className="hero-card-bottom">
                        <div className="hero-card-info">
                          <h3 className="hero-card-title">{card.company}</h3>
                          <span className="hero-card-role">{card.role}</span>
                        </div>
                        <div className="hero-card-tags">
                          {card.tech.map((t, j) => (
                            <span className="hero-card-tag" key={j} style={{ borderColor: card.borderColor + '80' }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </section>

          {/* Extracurriculars */}
          <section id="extracurriculars" className="section section-dark">
            <div className="section-inner">
              <AnimateOnScroll>
                <h2 className="section-title section-title-center">Extracurriculars</h2>
              </AnimateOnScroll>
              <AnimateOnScroll delay={100}>
                <div className="extra-card">
                  <div className="extra-card-logo-wrap">
                    <img src={biocareLogo} alt="Carleton BioCare" className="extra-card-logo" />
                  </div>
                  <div className="extra-card-info">
                    <h3 className="extra-card-company">Carleton BioCare</h3>
                    <span className="extra-card-role">Software Lead</span>
                    <span className="extra-card-date">Mar 2025 – Present</span>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </section>

          {/* Skills */}
          <section id="skills" className="section section-pattern" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="orbit-animation orbit-section">
              <div className="orbit-tilt orbit-tilt-1">
                <div className="orbit"><div className="orbit-dot" /></div>
              </div>
              <div className="orbit-tilt orbit-tilt-2">
                <div className="orbit orbit-reverse"><div className="orbit-dot orbit-dot-accent" /></div>
              </div>
              <div className="orbit-tilt orbit-tilt-3">
                <div className="orbit orbit-slow"><div className="orbit-dot" /></div>
              </div>
              <div className="orbit-center" />
            </div>
            <div className="section-inner">
              <AnimateOnScroll>
                <h2 className="section-title section-title-center">Skills</h2>
              </AnimateOnScroll>
              <div className="skills-grid">
                {skillCategories.map((cat, i) => (
                  <AnimateOnScroll key={i} delay={i * 80}>
                    <div className="skill-group">
                      <h3 className="skill-group-title">{cat.name}</h3>
                      <div className="skill-pills">
                        {cat.items.map((item, j) => (
                          <span className="skill-pill" key={j}>{item}</span>
                        ))}
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="section section-dark">
            <div className="section-inner">
              <AnimateOnScroll>
                <h2 className="section-title section-title-center">Projects</h2>
                <p className="section-subtitle">Some of the projects I've worked on.</p>
              </AnimateOnScroll>
              <div className="projects-grid">
                {projects.map((proj, i) => (
                  <AnimateOnScroll key={i} delay={i * 150}>
                    <div
                      className="hero-card"
                      style={{
                        borderColor: proj.borderColor,
                        backgroundColor: proj.image ? '#111' : 'var(--bg-2)',
                      }}
                    >
                      <div
                        className="hero-card-visual hero-card-visual-img"
                        style={proj.image ? {
                          backgroundImage: `url(${proj.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center top',
                        } : undefined}
                      >
                        {!proj.image && (
                          <div className="hero-card-badge-center">
                            {proj.badgeIcon}
                            <span>{proj.badge}</span>
                          </div>
                        )}
                      </div>
                      <div className="hero-card-bottom">
                        <div className="hero-card-info">
                          <h3 className="hero-card-title">{proj.name}</h3>
                          <span className="hero-card-role">{proj.description}</span>
                        </div>
                        <div className="hero-card-bottom-row">
                          <div className="hero-card-tags">
                            {proj.tech.map((t, j) => (
                              <span className="hero-card-tag" key={j} style={{ borderColor: proj.borderColor + '80' }}>{t}</span>
                            ))}
                          </div>
                          <div className="hero-card-links">
                            <a href={proj.github} target="_blank" rel="noopener noreferrer" className="hero-card-link">
                              <FaGithub />
                            </a>
                            {proj.demo && (
                              <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="hero-card-link">
                                <FaExternalLinkAlt />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="section section-dark">
            <div className="section-inner">
              <AnimateOnScroll>
                <h2 className="section-title section-title-center">Get in Touch</h2>
                <p className="section-subtitle">Always open to discussing new projects and opportunities.</p>
                <div className="contact-links">
                  <a href="mailto:sholookmoaz@gmail.com" className="contact-link" aria-label="Email">
                    <FaEnvelope />
                  </a>
                  <a href="https://linkedin.com/in/moazsholook" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="LinkedIn">
                    <FaLinkedin />
                  </a>
                  <a href="https://github.com/moazsholook" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="GitHub">
                    <FaGithub />
                  </a>
                </div>
              </AnimateOnScroll>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="footer-inner">
            <p>Made with <span className="footer-heart">&hearts;</span> by Moaz Sholook</p>
            <div className="footer-links">
              <a href="https://linkedin.com/in/moazsholook" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="https://github.com/moazsholook" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a href="mailto:sholookmoaz@gmail.com" aria-label="Email"><FaEnvelope /></a>
            </div>
          </div>
        </footer>
      </div>
    </IconContext.Provider>
  );
}

export default App;
