(() => {
  if (window.__qwiklitFabricInteraction) return;
  window.__qwiklitFabricInteraction = true;

  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!finePointer.matches || reducedMotion.matches || document.body.classList.contains('page-id-10486')) return;

  const body = document.body;
  body.classList.add('qw-fabric-ready');
  let x = -500;
  let y = -500;
  let targetX = x;
  let targetY = y;
  let frame = 0;
  let fadeTimer = 0;

  const draw = () => {
    frame = 0;
    x += (targetX - x) * 0.22;
    y += (targetY - y) * 0.22;
    body.style.setProperty('--qw-fabric-x', `${x.toFixed(1)}px`);
    body.style.setProperty('--qw-fabric-y', `${y.toFixed(1)}px`);
    if (Math.abs(targetX - x) > 0.4 || Math.abs(targetY - y) > 0.4) frame = requestAnimationFrame(draw);
  };

  const fade = () => body.style.setProperty('--qw-fabric-opacity', '0');
  document.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    const overContent = event.target.closest('a, button, input, textarea, select, .masthead, .entry-content, .qw-home-hero-inner, .qw-home-card, .sidebar .widget, #pum-10527');
    if (overContent) {
      fade();
      return;
    }
    targetX = event.clientX;
    targetY = event.clientY;
    body.style.setProperty('--qw-fabric-opacity', '0.72');
    if (!frame) frame = requestAnimationFrame(draw);
    clearTimeout(fadeTimer);
    fadeTimer = setTimeout(fade, 2200);
  }, { passive: true });
  document.addEventListener('pointerleave', fade);
  window.addEventListener('blur', fade);
  reducedMotion.addEventListener('change', (event) => {
    if (event.matches) fade();
  });
})();
