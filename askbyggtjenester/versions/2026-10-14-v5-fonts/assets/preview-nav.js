// Minimal, review-only interactions. No analytics or form data transfer.
document.addEventListener('DOMContentLoaded', () => {
 document.querySelectorAll('form').forEach(form=>form.addEventListener('submit',event=>{
  event.preventDefault(); window.location.href='https://www.askbyggtjenester.no/kontakt/';
 }));
 document.querySelectorAll('.menu-toggle,.ast-mobile-menu-trigger-minimal,button[aria-controls="ast-mobile-header"]').forEach(toggle=>{
  toggle.addEventListener('click',()=>{
   const opening=toggle.getAttribute('aria-expanded')!=='true';
   toggle.setAttribute('aria-expanded',String(opening));
   document.querySelectorAll('.main-header-bar-navigation,.ast-mobile-header-content').forEach(x=>{
    x.style.display=opening?'block':'none'; x.hidden=!opening;
   });
   document.body.classList.toggle('ast-main-header-nav-open',opening);
  });
 });
 document.querySelectorAll('.elementor-accordion .elementor-tab-title').forEach(el=>{
  el.addEventListener('click',()=>{
    const target=document.getElementById(el.getAttribute('aria-controls')||'');
    if(target){const active=el.getAttribute('aria-expanded')==='true';el.setAttribute('aria-expanded',String(!active));target.style.display=active?'none':'block'}
  });
 });
});