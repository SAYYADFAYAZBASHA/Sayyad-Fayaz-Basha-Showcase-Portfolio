// Lightweight global interaction utilities: IntersectionObserver reveal and cursor glow
export function initInteractions() {
  // Reveal on scroll using IntersectionObserver
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
        } else {
          el.classList.remove('is-visible');
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
  );

  document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => io.observe(el));

  // Optional cursor glow effect following the mouse, attached to body background
  let glowEl = document.getElementById('cursor-glow');
  if (!glowEl) {
    glowEl = document.createElement('div');
    glowEl.id = 'cursor-glow';
    glowEl.style.position = 'fixed';
    glowEl.style.pointerEvents = 'none';
    glowEl.style.inset = '0';
    glowEl.style.zIndex = '0';
    glowEl.style.background = 'radial-gradient(200px circle at 0 0, hsl(var(--primary)/0.12), transparent 60%)';
    document.body.appendChild(glowEl);
  }

  let raf = 0;
  let x = 0, y = 0;
  const onMove = (e: MouseEvent) => {
    x = e.clientX; y = e.clientY;
    if (!raf) {
      raf = requestAnimationFrame(() => {
        raf = 0;
        glowEl!.style.background = `radial-gradient(200px circle at ${x}px ${y}px, hsl(var(--primary)/0.12), transparent 60%)`;
      });
    }
  };

  window.addEventListener('mousemove', onMove, { passive: true });

  // Return cleanup
  return () => {
    io.disconnect();
    window.removeEventListener('mousemove', onMove);
    glowEl?.remove();
  };
}