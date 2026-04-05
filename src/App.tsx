import React from 'react';
import { useScrollSpy } from './hooks/useScrollSpy';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import StackSection from './components/StackSection';
import LeetCodeStats from './components/LeetCodeStats';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';

const App: React.FC = () => {
  const activeSection = useScrollSpy(['home', 'projects', 'leetcode', 'stack', 'about', 'contact']);

  return (
    <div className="bg-bg min-h-screen relative">
      <Nav activeSection={activeSection} />

      <main className="max-w-[1440px] mx-auto relative z-10">
        <Hero />
        <div className="space-y-16 pb-32">
          <ProjectsSection />
          <LeetCodeStats />
          <StackSection />
          <AboutSection />
          <ContactSection />
        </div>
      </main>

      <footer className="py-20 px-14 border-t border-white/[0.05] text-center relative z-10">
        <div className="text-t3 font-mono text-[10px] uppercase tracking-[0.2em]">
          Designed & Engineered by Harsh Aghara · {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default App;