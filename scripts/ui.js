
// Header collapsing + simple helpers
(function(){
  const header = document.querySelector('.header');
  if (!header) return;
  let last = 0;
  window.addEventListener('scroll',()=>{
    const y = window.scrollY || 0;
    header.classList.toggle('shrink', y>24);
    last = y;
  },{passive:true});
})();
