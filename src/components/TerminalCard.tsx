import React, { useState, useEffect, useRef } from 'react';
import { termLines } from '../data/termLines';

const TerminalCard: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typedText, setTypedText] = useState<string[]>(termLines.map(() => ''));
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const typeLine = async (index: number) => {
      if (index >= termLines.length) return;

      const line = termLines[index];
      let currentText = '';
      
      for (let i = 0; i <= line.text.length; i++) {
        currentText = line.text.slice(0, i);
        setTypedText(prev => {
          const next = [...prev];
          next[index] = currentText;
          return next;
        });
        await new Promise(r => setTimeout(r, line.delay));
      }

      setVisibleLines(prev => prev + 1);
      typeLine(index + 1);
    };

    typeLine(0);
  }, []);

  return (
    <div className="w-full h-full bg-bg1 border border-white/[0.1] rounded-lg shadow-[0_0_50px_-12px_rgba(59,130,246,0.15)] overflow-hidden flex flex-col font-mono relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[10] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      <div className="h-9 bg-bg2 flex items-center px-4 justify-between border-b border-white/[0.05]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="text-[11px] text-t2 font-medium">system — bash</div>
        <div className="w-12" />
      </div>
      
      <div className="p-5 text-[12.5px] leading-relaxed overflow-y-auto">
        {typedText.map((text, i) => (
          text || i < visibleLines ? (
            <div key={i} className={`
              ${termLines[i].cls === 'p' ? 'text-green' : ''}
              ${termLines[i].cls === 'dim' ? 'text-t2' : ''}
              ${termLines[i].cls === 't1' ? 'text-t1' : ''}
              ${termLines[i].cls === 'hi' ? 'text-t0' : ''}
              ${termLines[i].cls === 'ok' ? 'text-green' : ''}
              ${termLines[i].cls === 'warn' ? 'text-amber' : ''}
              min-h-[1.5em] whitespace-pre-wrap
            `}>
              {text}
            </div>
          ) : null
        ))}
        <div className="inline-block w-[7px] h-[13px] bg-t1 animate-cblink translate-y-[2px] ml-1" />
      </div>
    </div>
  );
};

export default TerminalCard;
