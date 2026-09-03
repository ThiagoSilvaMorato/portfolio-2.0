import { useEffect, useRef } from "react";

const GLOW_HALF = 150;
const EASING = 0.08;
const GRID_PARALLAX = 30;
const SETTLE_PX = 0.1;

export function NeonCursorField() {
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let running = false;
    let viewportW = window.innerWidth;
    let viewportH = window.innerHeight;
    let targetX = viewportW / 2;
    let targetY = viewportH / 2;
    let x = targetX;
    let y = targetY;

    const render = () => {
      x += (targetX - x) * EASING;
      y += (targetY - y) * EASING;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x - GLOW_HALF}px, ${y - GLOW_HALF}px, 0)`;
      }
      if (gridRef.current) {
        const px = (x / viewportW - 0.5) * GRID_PARALLAX;
        const py = (y / viewportH - 0.5) * GRID_PARALLAX;
        gridRef.current.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      }

      if (Math.abs(targetX - x) < SETTLE_PX && Math.abs(targetY - y) < SETTLE_PX) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(render);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      start();
    };

    const onResize = () => {
      viewportW = window.innerWidth;
      viewportH = window.innerHeight;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    start();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      data-slot='neon-cursor-field'
      aria-hidden
      className='pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background'
    >
      <div ref={gridRef} className='neon-grid' />
      <div className='neon-scan' />
      <div className='neon-ring' />
      <div className='neon-ring neon-ring--2' />
      <div className='neon-glitch' />
      <div className='neon-beam neon-beam--1' />
      <div className='neon-beam neon-beam--2' />
      <div className='neon-beam neon-beam--3' />
      <div ref={glowRef} className='neon-glow' />
      <div className='neon-vignette' />
    </div>
  );
}
