"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const CHARS = " .:-=+*#%@";

interface Cell {
  x: number;
  y: number;
  charIdx: number;
  r: number;
  g: number;
  b: number;
  activeTime: number;
}

export default function AsciiHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const monoCanvasRef = useRef<HTMLCanvasElement>(null);
  const colorCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  const gridRef = useRef<Cell[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const viewportMouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number | undefined>(undefined);
  const sizeRef = useRef({ width: 0, height: 0, charWidth: 13, charHeight: 15 });

  useEffect(() => {
    const monoCanvas = monoCanvasRef.current;
    const colorCanvas = colorCanvasRef.current;
    if (!monoCanvas || !colorCanvas) return;

    const mCtx = monoCanvas.getContext("2d", { alpha: false });
    const cCtx = colorCanvas.getContext("2d", { alpha: true });
    if (!mCtx || !cCtx) return;

    const img = new window.Image();
    img.src = "/me.jpg";
    
    const renderCanvases = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      sizeRef.current.width = width;
      sizeRef.current.height = height;
      
      monoCanvas.width = width;
      monoCanvas.height = height;
      colorCanvas.width = width;
      colorCanvas.height = height;
      
      const charWidth = sizeRef.current.charWidth; 
      const charHeight = sizeRef.current.charHeight; 
      const cols = Math.ceil(width / charWidth);
      const rows = Math.ceil(height / charHeight);
      
      mCtx.font = `bold ${charHeight}px "Geist Mono", monospace`;
      mCtx.textBaseline = "top";
      mCtx.fillStyle = "#111113";
      mCtx.fillRect(0, 0, width, height);

      cCtx.font = `bold ${charHeight}px "Geist Mono", monospace`;
      cCtx.textBaseline = "top";
      cCtx.clearRect(0, 0, width, height);
      
      const hiddenCanvas = document.createElement("canvas");
      hiddenCanvas.width = cols;
      hiddenCanvas.height = rows;
      const hCtx = hiddenCanvas.getContext("2d");
      if (!hCtx) return;
      
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;
      let drawWidth = img.width;
      let drawHeight = img.height;
      let startX = 0;
      let startY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = img.height * canvasRatio;
        startX = (img.width - drawWidth) / 2;
      } else {
        drawHeight = img.width / canvasRatio;
        startY = (img.height - drawHeight) / 2;
      }
      
      hCtx.drawImage(img, startX, startY, drawWidth, drawHeight, 0, 0, cols, rows);
      const imgData = hCtx.getImageData(0, 0, cols, rows).data;
      
      const monoR = 30, monoG = 30, monoB = 35;
      const newGrid: Cell[] = [];
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const idx = (y * cols + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          const charIdx = Math.floor(lum * (CHARS.length - 1));
          const char = CHARS[charIdx];
          
          const px = x * charWidth;
          const py = y * charHeight;

          // Draw Mono (dimmer, structural) background once
          const ambient = lum * 0.3;
          const mR = Math.round(monoR + (r - monoR) * ambient);
          const mG = Math.round(monoG + (g - monoG) * ambient);
          const mB = Math.round(monoB + (b - monoB) * ambient);
          mCtx.fillStyle = `rgb(${mR}, ${mG}, ${mB})`;
          mCtx.fillText(char, px, py);

          newGrid.push({
            x: px,
            y: py,
            charIdx,
            r, g, b,
            activeTime: 0
          });
        }
      }
      
      gridRef.current = newGrid;
      setIsLoaded(true);
    };

    img.onload = renderCanvases;
    window.addEventListener("resize", renderCanvases);
    
    const handleGlobalMouseMove = (e: MouseEvent) => {
      viewportMouseRef.current.x = e.clientX;
      viewportMouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    
    let lastMouse = { x: -1000, y: -1000 };

    const animate = () => {
      const { width, height } = sizeRef.current;
      if (width === 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      
      if (viewportMouseRef.current.x !== -1000 && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current.x = viewportMouseRef.current.x - rect.left;
        mouseRef.current.y = viewportMouseRef.current.y - rect.top;
      }

      cCtx.clearRect(0, 0, width, height);
      
      const now = Date.now();
      const { x: mx, y: my } = mouseRef.current;
      const grid = gridRef.current;
      
      const dxMouse = mx - lastMouse.x;
      const dyMouse = my - lastMouse.y;
      const speed = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      
      const lineX1 = lastMouse.x;
      const lineY1 = lastMouse.y;
      const lineX2 = mx;
      const lineY2 = my;
      
      lastMouse = { x: mx, y: my };
      
      const radius = 65; // Set to 65
      
      for (let i = 0; i < grid.length; i++) {
        const cell = grid[i];
        
        const cx = cell.x + sizeRef.current.charWidth / 2;
        const cy = cell.y + sizeRef.current.charHeight / 2;
        
        // Calculate distance from cell to the mouse movement line segment
        // This ensures a fluid, continuous trail even if the mouse moves very fast
        let dist = 0;
        if (speed === 0 || lineX1 === -1000) {
           dist = Math.sqrt((cx - mx) ** 2 + (cy - my) ** 2);
        } else {
           const l2 = speed * speed;
           let t = ((cx - lineX1) * (lineX2 - lineX1) + (cy - lineY1) * (lineY2 - lineY1)) / l2;
           t = Math.max(0, Math.min(1, t));
           const projX = lineX1 + t * (lineX2 - lineX1);
           const projY = lineY1 + t * (lineY2 - lineY1);
           dist = Math.sqrt((cx - projX) ** 2 + (cy - projY) ** 2);
        }
        
        // Wake up cells if the mouse is moving nearby
        if (dist < radius && speed > 0.5) {
          const intensity = 1 - (dist / radius);
          // The edge of the brush gets an older timestamp, making it fade sooner
          // This creates a smooth, fluid stroke rather than a hard circle.
          const newTime = now - (1 - intensity) * 300;
          if (newTime > cell.activeTime) {
            cell.activeTime = newTime;
          }
        }
        
        const timeSinceActive = now - cell.activeTime;
        const falloffTime = 1320; // Increased to 1320ms
        
        if (timeSinceActive < falloffTime) {
          const progress = timeSinceActive / falloffTime;
          const alpha = 1 - Math.pow(progress, 1.2); // Smooth ease out
          
          cCtx.globalAlpha = alpha;
          cCtx.fillStyle = `rgb(${cell.r}, ${cell.g}, ${cell.b})`;
          
          let offsetX = 0, offsetY = 0;
          // Jiggle only when the exact pointer collides (approx within 15px of character center)
          const pointerDist = Math.sqrt((cx - mx) ** 2 + (cy - my) ** 2);
          if (pointerDist < 15) {
            // Reduce frequency by skipping some frames (glitch effect)
            if (Math.random() > 0.6) {
              // Increase magnitude by 5% (from 3 to 3.15)
              offsetX = (Math.random() - 0.5) * 3.15;
              offsetY = (Math.random() - 0.5) * 3.15;
            }
          }
          
          cCtx.fillText(CHARS[cell.charIdx], cell.x + offsetX, cell.y + offsetY);
        }
      }
      
      cCtx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", renderCanvases);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      style={{ y, opacity }}
      className={`relative h-[100vh] w-full overflow-hidden bg-bg-primary transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Background Monochromatic Canvas */}
      <canvas 
        ref={monoCanvasRef} 
        className="absolute inset-0 h-full w-full object-cover" 
      />
      
      {/* Foreground Color Canvas with Dynamic Particle Rendering */}
      <canvas 
        ref={colorCanvasRef} 
        className="absolute inset-0 h-full w-full object-cover pointer-events-none transition-opacity duration-300"
      />
      
      {/* Bottom gradient to blend smoothly into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none" />
      
      {/* Scroll indicator overlay */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-10">
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-12 w-[1px] bg-gradient-to-b from-text-secondary to-transparent" 
        />
        <span className="font-mono text-[11px] tracking-[0.3em] text-text-secondary">SCROLL</span>
      </div>
    </motion.div>
  );
}

