(function(){
  document.getElementById('year').textContent = new Date().getFullYear();

  var toggle = document.querySelector('.nav-toggle'), nav = document.getElementById('nav');
  function setMenu(open){ nav.classList.toggle('open', open); toggle.setAttribute('aria-expanded', open); }
  toggle.addEventListener('click', function(){ setMenu(!nav.classList.contains('open')); });
  nav.addEventListener('click', function(e){ if(e.target.tagName==='A') setMenu(false); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') setMenu(false); });

  // Show a labelled placeholder (never a fake image) if a file is missing
  document.querySelectorAll('.portrait img, .shot img').forEach(function(img){
    function miss(){ img.style.display='none'; img.parentElement.classList.add('empty'); if(img.dataset.label) img.parentElement.dataset.label=img.dataset.label; }
    if(img.complete && img.naturalWidth===0) miss(); else img.addEventListener('error', miss);
  });

  // Gentle fade-in on section content
  var items = document.querySelectorAll('.section .wrap');
  items.forEach(function(el){ el.classList.add('reveal'); });
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }); },{threshold:.12});
    items.forEach(function(el){ io.observe(el); });
  } else { items.forEach(function(el){ el.classList.add('in'); }); }

  // Highlight current section in nav
  var links = document.querySelectorAll('nav a');
  if('IntersectionObserver' in window){
    var so = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ links.forEach(function(l){ l.classList.toggle('active', l.getAttribute('href')==='#'+e.target.id); }); } }); },{rootMargin:'-45% 0px -50% 0px'});
    document.querySelectorAll('main section[id]').forEach(function(s){ so.observe(s); });
  }
})();
