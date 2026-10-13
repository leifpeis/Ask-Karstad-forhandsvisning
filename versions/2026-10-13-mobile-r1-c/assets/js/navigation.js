/* Direction-aware preview navigation. No tracking or network requests. */
(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const position = () => Math.max(0, Math.min(scrollY, document.documentElement.scrollHeight - innerHeight));
  let previous = position(), direction = 0, distance = 0, scheduled = false;
  const show = () => header.classList.remove('ak-menu-hidden');
  const update = () => {
    scheduled = false;
    const current = position(), delta = current - previous;
    previous = current;
    if (current < header.offsetHeight + 40 || header.querySelector('details[open], :focus-visible')) {
      show(); distance = 0; direction = 0; return;
    }
    if (!delta) return;
    const nextDirection = Math.sign(delta);
    if (nextDirection !== direction) { distance = 0; direction = nextDirection; }
    distance += Math.abs(delta);
    if (distance >= (direction > 0 ? 16 : 10)) {
      header.classList.toggle('ak-menu-hidden', direction > 0);
      distance = 0;
    }
  };
  addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }, { passive: true });
  header.addEventListener('focusin', show);
  const mobile = document.querySelector('.ak-preview-mobile');
  if (mobile) {
    mobile.addEventListener('toggle', () => { mobile.querySelector('summary').textContent = mobile.open ? 'Lukk' : 'Meny'; });
    mobile.addEventListener('click', event => { if (event.target.closest('a')) mobile.open = false; });
  }
  document.querySelectorAll('[data-preview-contact]').forEach(button => button.addEventListener('click', () => { location.href = 'https://www.askkarstad.no/#kontakt'; }));
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const open = document.querySelector('.ak-preview-mobile[open]') || header.querySelector('details[open]');
    if (open) { open.open = false; open.querySelector('summary').focus(); }
  });
})();
