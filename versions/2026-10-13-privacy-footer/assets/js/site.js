/* No tracking, no localStorage and no network requests. */
(function () {
  'use strict';
  if (!('HTMLDialogElement' in window)) return; // Fallback: normal in-page anchors.
  const sources = document.querySelectorAll('.ak-site .service-dialog[id]');
  if (!sources.length) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'ak-info-dialog ak-site';
  const close = document.createElement('button');
  close.type = 'button'; close.className = 'ak-dialog-close'; close.setAttribute('aria-label', 'Lukk dialog'); close.textContent = '×';
  const body = document.createElement('div');
  dialog.append(close, body); document.body.append(dialog);
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  document.documentElement.classList.add('ak-has-dialog');
  let trigger = null;
  dialog.addEventListener('close', () => { if (trigger && trigger.isConnected) trigger.focus({preventScroll:true}); });
  sources.forEach(source => {
    document.querySelectorAll('a[href="#' + CSS.escape(source.id) + '"]').forEach(link => {
      link.setAttribute('aria-haspopup', 'dialog');
      link.addEventListener('click', event => {
        event.preventDefault(); trigger = link;
        body.replaceChildren(...Array.from(source.childNodes).map(node => node.cloneNode(true)));
        // Avoid duplicate IDs in cloned editor-created content.
        body.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
        const title = body.querySelector('h2');
        if (title) { title.id = 'ak-dialog-title'; dialog.setAttribute('aria-labelledby', title.id); }
        else { dialog.removeAttribute('aria-labelledby'); dialog.setAttribute('aria-label', 'Mer informasjon'); }
        const contact = body.querySelector('a[href="#kontakt"]');
        if (contact) contact.addEventListener('click', e => {
          e.preventDefault(); const service = source.id.replace('tjeneste-', '');
          const select = document.getElementById('service-select');
          if (select) select.value = ['nybygg','rehab','tegning','soknad'].includes(service) ? service : '';
          trigger = null; dialog.close();
          const target = document.getElementById('kontakt');
          if (target) { target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}); const input=target.querySelector('input'); if(input) input.focus({preventScroll:true}); }
        });
        dialog.showModal(); close.focus();
      });
    });
  });
})();
