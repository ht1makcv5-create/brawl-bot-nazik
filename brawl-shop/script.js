(function(){
  "use strict";

  /* header scroll state */
  var header = document.getElementById('siteHeader');
  var toTop = document.getElementById('toTopBtn');
  function onScroll(){
    var y = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle('scrolled', y > 10);
    toTop.classList.toggle('show', y > 500);
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  toTop.addEventListener('click', function(){
    window.scrollTo({top:0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  });

  /* mobile menu */
  var burger = document.getElementById('burgerBtn');
  var panel = document.getElementById('mobilePanel');
  function closeMenu(){
    panel.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
  }
  burger.addEventListener('click', function(){
    var open = panel.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  panel.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });

  /* scroll reveal */
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, {threshold:.15, rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(el){ el.classList.add('is-visible'); });
  }
})();