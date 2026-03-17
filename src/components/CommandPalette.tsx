import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  onClose: () => void;
}

const commands = [
  { icon: '→', label: 'Projects', sub: '#projects', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
  { icon: '→', label: 'Metrics', sub: '#metrics', action: () => document.getElementById('metrics')?.scrollIntoView({ behavior: 'smooth' }) },
  { icon: '→', label: 'Stack', sub: '#stack', action: () => document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' }) },
  { icon: '→', label: 'About', sub: '#about', action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
  { icon: '→', label: 'Contact', sub: '#contact', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  { icon: '↗', label: 'GitHub', sub: '@Retr01-sudo', action: () => window.open('https://github.com/Retr01-sudo', '_blank') },
  { icon: '↗', label: 'LinkedIn', sub: 'Harsh Aghara', action: () => window.open('https://linkedin.com/in/harsh-aghara', '_blank') },
  { icon: '@', label: 'Email', sub: 'harsh@example.com', action: () => window.location.href = 'mailto:harsh@example.com' },
];

const CommandPalette: React.FC<Props> = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter(c => 
    c.label.toLowerCase().includes(query.toLowerCase()) || 
    c.sub.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => (i + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => (i - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filtered, selectedIndex, onClose]);

  const highlightMatch = (text: string, term: string) => {
    if (!term) return text;
    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === term.toLowerCase() 
        ? <span key={i} className="text-blue font-bold">{part}</span> 
        : part
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/65 backdrop-blur-sm z-[2000] flex items-start justify-center pt-[14vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            className="w-[520px] bg-bg2 border border-white/[0.07] rounded-xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center px-4 h-14 border-b border-white/[0.05]">
              <span className="text-t2 font-mono text-sm mr-4 tracking-tighter">›</span>
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="bg-transparent border-none outline-none text-t0 font-mono text-[12px] flex-1 placeholder:text-t3"
              />
            </div>

            <div className="max-h-[280px] overflow-y-auto py-2">
              {filtered.map((cmd, i) => (
                <div
                  key={cmd.label}
                  className={`flex items-center px-4 h-12 gap-4 cursor-none transition-colors ${i === selectedIndex ? 'bg-white/[0.06]' : ''}`}
                  onMouseEnter={() => setSelectedIndex(i)}
                  onClick={() => { cmd.action(); onClose(); }}
                >
                  <span className="text-t2 text-sm w-4">{cmd.icon}</span>
                  <span className="text-t0 text-[13px] font-medium flex-1">
                    {highlightMatch(cmd.label, query)}
                  </span>
                  <span className="text-t3 text-[11px] font-mono">
                    {highlightMatch(cmd.sub, query)}
                  </span>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-t3 text-[13px]">No results found.</div>
              )}
            </div>

            <div className="h-10 bg-bg1/50 border-t border-white/[0.05] px-4 flex items-center gap-6 text-t3 text-[10px] uppercase tracking-widest font-medium">
              <span>↑↓ navigate</span>
              <span>↵ open</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
