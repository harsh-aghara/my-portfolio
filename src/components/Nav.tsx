import React from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

interface Props {
  activeSection: string;
  onMenuClick?: () => void;
}

const Nav: React.FC<Props> = ({ activeSection, onMenuClick }) => {
  const navLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#leetcode', label: 'LeetCode' },
    { href: '#stack', label: 'Stack' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  // Set this to your photo URL (e.g., '/images/harsh.jpg') to use a photo instead of initials
  const PROFILE_PHOTO_URL = ""; 

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl h-14 bg-white/[0.03] backdrop-blur-xl border border-white/10 z-[500] px-4 sm:px-8 rounded-full flex items-center justify-between shadow-2xl">
      <div className="flex items-center gap-3">
        {PROFILE_PHOTO_URL ? (
          <img 
            src={PROFILE_PHOTO_URL} 
            alt="Harsh Aghara" 
            className="w-8 h-8 rounded-full border border-white/10 object-cover shadow-sm transition-opacity hover:opacity-80"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white font-mono font-bold text-[10px] tracking-wider shadow-sm transition-colors hover:bg-white/10 hover:border-white/20">
            HA
          </div>
        )}
        <div className="text-white font-bold text-sm tracking-tight hidden sm:block">Harsh Aghara</div>
      </div>
      
      <div className="hidden md:flex gap-8">
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.slice(1);
          return (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                isActive ? 'text-cyan' : 'text-t3 hover:text-white'
              }`}
            >
              {link.label}
              {isActive && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan"
                />
              )}
            </a>
          );
        })}
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {onMenuClick && (
          <button 
            onClick={onMenuClick} 
            className="md:hidden w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
          >
            <Menu size={16} />
          </button>
        )}
        <a 
          href="#contact" 
          className="h-8 px-4 rounded-full bg-white text-black text-[11px] font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center"
        >
          Hire me
        </a>
      </div>
    </nav>
  );
};

export default Nav;