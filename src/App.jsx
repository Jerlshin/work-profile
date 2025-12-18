import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  BookOpen, 
  Award, 
  Code, 
  Cpu, 
  Brain, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  Menu, 
  X,
  ChevronRight,
  Download,
  Terminal,
  Sparkles,
  ArrowUpRight,
  Layers,
  Database,
  Network,
  Minus,
  Square,
  Sun,
  Moon,
  X as CloseIcon
} from 'lucide-react';

import portfolioData from './portfolioData.json';

// --- STYLES & ANIMATIONS ---
const styles = `
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }

  @keyframes float-delayed {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }
  
  .animate-blob {
    animation: blob 7s infinite;
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float-delayed 5s ease-in-out infinite;
    animation-delay: 1s;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }

  .bg-grid-pattern {
    background-image: linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  
  /* Blinking cursor for the terminal */
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  .animate-blink {
    animation: blink 1s step-end infinite;
  }
`;

// --- COMPONENTS ---

const SectionTitle = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-12 animate-fade-in-up">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-indigo-100 dark:ring-indigo-800/50">
        <Icon size={24} />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
    </div>
    {subtitle && (
      <p className="text-slate-500 dark:text-slate-400 ml-14 text-lg max-w-2xl font-light">
        {subtitle}
      </p>
    )}
  </div>
);

const TechBadge = ({ children }) => (
  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
    {children}
  </span>
);

const ExperienceCard = ({ role, company, location, period, description }) => (
  <div className="relative pl-8 pb-12 border-l-2 border-indigo-100 dark:border-slate-800 last:pb-0 last:border-l-0 group">
    {/* Timeline Node */}
    <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-500 transition-all duration-300 group-hover:scale-125 group-hover:border-indigo-400 shadow-sm z-10"></div>
    
    <div className="group-hover:translate-x-1 transition-transform duration-300">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-3">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {role}
        </h3>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full whitespace-nowrap mt-2 sm:mt-0 border border-slate-200 dark:border-slate-700">
          {period}
        </span>
      </div>
      
      <div className="flex items-center gap-2 mb-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
        <Briefcase size={14} className="text-indigo-500" />
        <span>{company}</span>
        <span className="mx-1 text-slate-300">•</span>
        <span>{location}</span>
      </div>
      
      <div className="bg-white dark:bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:shadow-lg transition-all duration-300">
        <ul className="space-y-3">
          {description.map((item, idx) => (
            <li key={idx} className="flex gap-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              <span className="mt-2 min-w-[6px] h-[6px] rounded-full bg-indigo-400/80"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const ProjectCard = ({ title, tech, description }) => (
  <div className="group relative bg-white dark:bg-slate-800 rounded-2xl p-1 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-500/30 dark:hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    
    <div className="relative p-6 flex flex-col h-full z-10">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-100 dark:ring-indigo-500/20">
          <Code size={24} />
        </div>
        <ExternalLink size={18} className="text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors" />
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {title}
      </h3>
      
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-700/50">
        {tech.map((t, i) => (
          <TechBadge key={i}>{t}</TechBadge>
        ))}
      </div>
    </div>
  </div>
);

const PublicationItem = ({ title, journal, year, authors }) => (
  <div className="group flex gap-5 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
    <div className="absolute inset-0 bg-slate-50 dark:bg-slate-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <div className="mt-1 min-w-[48px] h-[48px] rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform relative z-10">
      <FileText size={24} />
    </div>
    <div className="relative z-10">
      <h4 className="font-bold text-slate-900 dark:text-white leading-snug text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h4>
      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-600 dark:text-slate-400">
        <span className="font-semibold px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 rounded text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
          {year}
        </span>
        <span className="font-medium text-slate-800 dark:text-slate-200 border-b border-dotted border-slate-400">
          {journal}
        </span>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-500 mt-2 italic font-serif">
        {authors}
      </p>
    </div>
  </div>
);

// --- MAIN APP ---

const App = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Default to 'light' mode
  const [theme, setTheme] = useState('light');

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme class to HTML/Body and save preference
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle scroll for navbar glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'research', label: 'Research' },
    { id: 'skills', label: 'Skills' },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/50 overflow-x-hidden relative transition-colors duration-300">
      <style>{styles}</style>
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-[0.03]"></div>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Navbar */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[90%] max-w-5xl transition-all duration-300 rounded-full ${
        scrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 py-2 px-6' : 'bg-transparent py-4 px-2 sm:px-0'
      }`}>
        <div className="flex items-center justify-between">
          <div 
            className="font-bold text-xl tracking-tight text-slate-900 dark:text-white cursor-pointer flex items-center gap-2 group" 
            onClick={() => window.scrollTo(0,0)}
          >
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Terminal size={18} strokeWidth={2.5} />
            </div>
            <span className="hidden sm:inline">Jerlshin<span className="text-indigo-600 dark:text-indigo-400">.ai</span></span>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 bg-white/60 dark:bg-slate-800/60 rounded-full p-1 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    activeSection === link.id 
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-black/5 dark:ring-white/10' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Theme Toggle & Socials (Visible on Desktop & Mobile) */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition-all hover:scale-105 shadow-sm"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon size={20} className="fill-slate-600/10 dark:fill-none" />
                ) : (
                  <Sun size={20} className="fill-slate-400/10 text-amber-400" />
                )}
              </button>

              <div className="hidden sm:flex">
                 <a href={`mailto:${portfolioData.profile.email}`} className="p-2.5 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm">
                   <Mail size={20} />
                 </a>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2.5 text-slate-600 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 rounded-full backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full mt-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xl flex flex-col gap-2 md:hidden animate-fade-in-up">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-48 pb-24 px-6 max-w-7xl mx-auto z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
          
          {/* Left Content */}
          <div className="flex-1 space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-indigo-700 dark:text-indigo-300 text-sm font-semibold border border-indigo-100 dark:border-indigo-500/30 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
              </span>
              Open to Research Collaborations
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Hello, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 bg-[length:200%_auto] animate-gradient">
                {portfolioData.profile.name}
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-light">
              {portfolioData.profile.title}
            </p>
            
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl border-l-4 border-indigo-200 dark:border-slate-700 pl-6">
              {portfolioData.profile.tagline}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href={`mailto:${portfolioData.profile.email}`} className="group flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-300 ring-4 ring-transparent hover:ring-indigo-500/20 dark:hover:ring-white/20">
                Contact Me
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a href={`https://${portfolioData.profile.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-8 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full font-bold hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm hover:shadow-lg">
                <Linkedin size={20} />
                LinkedIn
              </a>
            </div>

            <div className="flex items-center gap-8 text-sm text-slate-500 dark:text-slate-500 pt-6 border-t border-slate-200/60 dark:border-slate-800/50">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400">
                   <MapPin size={14} />
                </div>
                {portfolioData.profile.location}
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400">
                   <Github size={14} />
                </div>
                <a href={`https://${portfolioData.profile.website}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">github.com/Jerlshin</a>
              </div>
            </div>
          </div>
          
          {/* Hero Code Visual - LINUX TERMINAL UI */}
          <div className="w-full lg:w-[45%] relative animate-fade-in-up animation-delay-2000 perspective-1000">
             {/* Floating Elements */}
             <div className="absolute -top-12 -right-8 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl animate-float z-20 border border-slate-100 dark:border-slate-700 hidden lg:block">
                <Brain size={32} className="text-purple-500" />
             </div>
             <div className="absolute -bottom-8 -left-8 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl animate-float-delayed z-20 border border-slate-100 dark:border-slate-700 hidden lg:block">
                <Database size={32} className="text-blue-500" />
             </div>
             <div className="absolute top-1/2 -right-12 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl animate-float z-20 border border-slate-100 dark:border-slate-700 hidden lg:block animation-delay-4000">
                <Network size={28} className="text-emerald-500" />
             </div>

             {/* Glow Effect */}
             <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-30 dark:opacity-50"></div>
             
             {/* Main Terminal Window - Light Glassmorphism Vibe */}
             <div className="relative bg-white/70 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/50 font-mono text-sm transform transition-transform hover:scale-[1.01] duration-500">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-100/80 border-b border-slate-200/60 backdrop-blur-md">
                   <div className="text-slate-500 text-xs font-medium select-none flex items-center gap-2">
                     <Terminal size={12} className="text-slate-400" />
                     jerlshin@portfolio: ~/research
                   </div>
                   <div className="flex items-center gap-2">
                      <Minus size={14} className="text-slate-400 hover:text-slate-600 cursor-pointer" />
                      <Square size={12} className="text-slate-400 hover:text-slate-600 cursor-pointer mt-0.5" />
                      <CloseIcon size={14} className="text-slate-400 hover:text-red-500 cursor-pointer" />
                   </div>
                </div>
                
                {/* Terminal Content Area */}
                <div className="p-4 text-slate-700 min-h-[340px] flex flex-col bg-white/40">
                   {/* Shell Prompt */}
                   <div className="flex flex-wrap gap-2 mb-4 text-[13px]">
                      <span className="text-indigo-600 font-bold">jerlshin@portfolio</span>:<span className="text-blue-600 font-bold">~/research</span>$ vim profile.py
                   </div>

                   {/* Vim UI Wrapper - ALIGNED VERSION */}
                   <div className="flex-grow font-mono text-[13px] leading-6 font-medium">
                     {[
                       { num: 1, content: null },
                       { num: 2, content: <div className="flex"><span className="text-rose-600 font-bold mr-2">class</span><span className="text-amber-600 font-bold">Researcher</span>:</div> },
                       { num: 3, content: <div className="pl-4 flex"><span className="text-rose-600 font-bold mr-2">def</span><span className="text-teal-600 font-bold">__init__</span><span className="text-slate-700">(self):</span></div> },
                       { num: 4, content: <div className="pl-8 text-slate-700">self.name = <span className="text-emerald-600">"{portfolioData.profile.name}"</span></div> },
                       { num: 5, content: <div className="pl-8 text-slate-700">self.focus = [<span className="text-emerald-600">"Multimodal AI"</span>, <span className="text-emerald-600">"Healthcare"</span>]</div> },
                       { num: 6, content: <div className="pl-8 text-slate-700">self.passion = <span className="text-emerald-600">"Human-Centered Intelligence"</span></div> },
                       { num: 7, content: null },
                       { num: 8, content: <div className="pl-4 mt-1 flex"><span className="text-rose-600 font-bold mr-2">async def</span><span className="text-teal-600 font-bold">innovate</span><span className="text-slate-700">(self):</span></div> },
                       { num: 9, content: <div className="pl-8 text-slate-700"><span className="text-rose-600 mr-2">while</span><span className="text-indigo-600">True</span>:</div> },
                       { num: 10, content: <div className="pl-12 text-slate-700"><span className="text-rose-600 mr-2">await</span>self.research(<span className="text-emerald-600">"New Frontiers"</span>)</div> },
                       { num: 11, content: <div className="pl-12 text-slate-400 italic mt-1 flex items-center gap-2"># Always learning...<span className="w-2 h-4 bg-slate-400/50 animate-blink"></span></div> },
                       { num: 12, content: null }
                     ].map((line, idx) => (
                       <div key={idx} className="flex">
                         <div className="w-8 border-r border-slate-200 text-slate-400 text-right pr-3 select-none text-xs leading-6">
                           {line.num}
                         </div>
                         <div className="pl-4 flex-1">
                           {line.content || <div className="h-6"></div>}
                         </div>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Vim Status Bar */}
                <div className="bg-slate-200/90 text-slate-600 px-3 py-1.5 text-xs flex justify-between font-bold border-t border-slate-300/50 backdrop-blur-md">
                  <div className="flex gap-4">
                      <span className="bg-indigo-500 text-white px-2 rounded-sm shadow-sm">NORMAL</span>
                      <span className="flex items-center gap-1"><FileText size={10} /> profile.py</span>
                  </div>
                  <div className="flex gap-4 text-slate-500">
                      <span>utf-8</span>
                      <span>python</span>
                      <span>100%</span>
                      <span>Ln 11, Col 42</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-32 pb-32 z-10 relative">
        
        {/* About Section */}
        <section id="about" className="scroll-mt-32">
          <SectionTitle 
            icon={Brain} 
            title="About Me" 
            subtitle="I sit at the intersection of complex algorithms and real-world human needs."
          />
          <div className="bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-xl border border-white/20 dark:border-slate-700/50 relative overflow-hidden group hover:border-indigo-500/30 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-500"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors duration-500"></div>
            <p className="text-lg lg:text-xl leading-loose text-slate-700 dark:text-slate-200 relative z-10 font-light">
              {portfolioData.profile.about}
            </p>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="scroll-mt-32">
          <SectionTitle 
            icon={Briefcase} 
            title="Research & Experience"
            subtitle="A timeline of my contributions to academic and industrial AI labs."
          />
          <div className="space-y-0 max-w-5xl">
            {portfolioData.experience.map((job, index) => (
              <ExperienceCard key={index} {...job} />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-32">
          <SectionTitle 
            icon={Code} 
            title="Selected Projects" 
            subtitle="Showcasing innovation in multimodal learning and orchestrating AI pipelines."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </section>

        {/* Publications Section */}
        <section id="research" className="scroll-mt-32">
          <SectionTitle 
            icon={BookOpen} 
            title="Publications" 
            subtitle="Peer-reviewed contributions to the scientific community."
          />
          <div className="grid gap-6 max-w-5xl">
            {portfolioData.publications.map((pub, index) => (
              <PublicationItem key={index} {...pub} />
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="scroll-mt-32">
          <SectionTitle icon={Cpu} title="Technical Arsenal" />
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {Object.entries(portfolioData.skills).map(([category, skills]) => (
              <div key={category} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-6 bg-indigo-500 rounded-full group-hover:scale-y-125 transition-transform"></div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-300 hover:border-indigo-200 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Awards Grid */}
        <section className="grid lg:grid-cols-2 gap-12 lg:gap-16 scroll-mt-32">
          {/* Education */}
          <div>
             <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-800/50">
                  <GraduationCap size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Education</h2>
             </div>
             
             {portfolioData.education.map((edu, index) => (
               <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{edu.degree}</h3>
                 <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-1">{edu.institution}</p>
                 <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    {edu.period} 
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    {edu.grade}
                 </p>
                 
                 <div className="p-5 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
                    <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                      <span className="font-semibold not-italic text-emerald-700 dark:text-emerald-400 block mb-1">Thesis Topic:</span>
                      "{edu.thesis}"
                    </p>
                 </div>
               </div>
             ))}
          </div>

          {/* Awards */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-800/50">
                <Award size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Honors & Awards</h2>
            </div>
            
            <div className="space-y-6">
              {portfolioData.awards.map((award, index) => (
                <div key={index} className="flex gap-5 items-start p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group">
                   <div className="mt-1 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-full text-amber-500 group-hover:scale-110 transition-transform">
                      <Sparkles size={18} />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{award.title}</h4>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 mt-1">{award.organization} • {award.date}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{award.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left space-y-2">
              <h3 className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white">Jerlshin J G</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs leading-relaxed">
                Building the future of AI with transparency, ethics, and human-centric design.
              </p>
            </div>
            
            <div className="flex gap-4">
               {[
                 { icon: Mail, href: `mailto:${portfolioData.profile.email}` },
                 { icon: Linkedin, href: `https://${portfolioData.profile.linkedin}` },
                 { icon: Github, href: `https://${portfolioData.profile.website}` }
               ].map((item, i) => (
                 <a 
                    key={i}
                    href={item.href} 
                    className="p-3.5 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all border border-slate-200 dark:border-slate-800 hover:border-indigo-200"
                  >
                   <item.icon size={20} />
                 </a>
               ))}
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© {new Date().getFullYear()} Jerlshin J G. All Rights Reserved.</p>
            <p className="flex items-center gap-2">
              Designed with <span className="text-red-500">♥</span> and React
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;