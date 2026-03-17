import React, { useState } from 'react';

import { Mail, Github, Linkedin, Copy, Check, Send, Globe } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleEmailCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('example@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    { name: 'GitHub', handle: 'harsh-aghara', href: 'https://github.com/harsh-aghara', icon: <Github size={20} /> },
    { name: 'LinkedIn', handle: 'Harsh Aghara', href: 'https://www.linkedin.com/in/harsh-aghara-2aa223323/', icon: <Linkedin size={20} /> },
    { name: 'Email', handle: 'example@gmail.com', isEmail: true, icon: <Mail size={20} /> },
  ];

  return (
    <section id="contact" className="px-6 lg:px-14 relative z-10 max-w-7xl mx-auto space-y-16 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
              <Globe size={14} />
              Connectivity
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Let's build something <br />
              that <span className="text-t3 italic font-serif">scales.</span>
            </h2>
          </div>
          <p className="text-t1 text-xl leading-relaxed max-w-lg font-light">
            I am currently open to internship opportunities in backend engineering and infrastructure observability. 
            Reach out to start a technical conversation.
          </p>
          
          <div className="flex flex-wrap gap-6 pt-4">
             <button
                onClick={handleEmailCopy}
                className="h-14 px-8 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all flex items-center gap-3 group shadow-xl"
              >
                {copied ? <Check size={18} /> : <Mail size={18} />}
                {copied ? 'Email copied' : 'example@gmail.com'}
              </button>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          {links.map((link) => (
            link.isEmail ? (
              <button
                key={link.name}
                onClick={handleEmailCopy}
                className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-cyan/30 transition-all group flex items-center justify-between shadow-2xl"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-t3 group-hover:text-cyan transition-colors">
                    {link.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold tracking-tight text-lg">{link.name}</div>
                    <div className="text-[10px] text-t3 font-mono uppercase tracking-widest font-bold">{link.handle}</div>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-t3 group-hover:text-white transition-colors">
                   {copied ? <Check size={20} /> : <Copy size={20} />}
                </div>
              </button>
            ) : (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-cyan/30 transition-all group flex items-center justify-between shadow-2xl"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-t3 group-hover:text-cyan transition-colors">
                    {link.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold tracking-tight text-lg">{link.name}</div>
                    <div className="text-[10px] text-t3 font-mono uppercase tracking-widest font-bold">{link.handle}</div>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-t3 group-hover:text-white transition-colors">
                   <Send size={20} className="-rotate-45" />
                </div>
              </a>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;