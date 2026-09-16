/* =========================================================
   EDIT HERE: your GitHub username (e.g. "anurionyeukwu").
   Leave it empty until you have one; the GitHub buttons
   and the live repo list switch on automatically once set.
   ========================================================= */
const GITHUB_USERNAME = "Onyeukwu-A";
const REPOS_TO_SHOW = 4;

(function(){
  var views = document.querySelectorAll('[data-view]');
  var names = {home:'Anuri Onyeukwu | Product Manager', taggrid:'TagGrid case study · Anuri Onyeukwu', abara:'Abara Care case study · Anuri Onyeukwu', pennywise:'Pennywise case study · Anuri Onyeukwu'};
  function show(target, anchor){
    views.forEach(function(v){ v.hidden = v.getAttribute('data-view') !== target; });
    document.title = names[target];
    var el = anchor ? document.getElementById(anchor) : null;
    if (el) { el.scrollIntoView({behavior:'smooth', block:'start'}); }
    else { window.scrollTo({top:0, behavior:'auto'}); }
    try { document.dispatchEvent(new CustomEvent('viewchange', {detail: target})); } catch (err) {}
  }
  function parse(h){
    var m = (h||'').match(/^#\/(taggrid|abara|pennywise)$/);
    if (m) return {view:m[1], anchor:null};
    return {view:'home', anchor:(h && h.length>1) ? h.slice(1) : null};
  }
  // Handle every in-page link ourselves, so it works inside previews and sandboxed frames too
  document.addEventListener('click', function(e){
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    e.preventDefault();
    var h = a.getAttribute('href');
    var r = parse(h);
    show(r.view, r.anchor === 'top' ? null : r.anchor);
    try { history.replaceState(null, '', h); } catch (err) {}
  });
  window.addEventListener('hashchange', function(){ var r = parse(location.hash); show(r.view, r.anchor); });
  var first = parse(location.hash);
  if (first.view !== 'home' || first.anchor) show(first.view, first.anchor);
})();

/* ---------- GitHub (public API, no key needed) ---------- */
(function(){
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  var user = GITHUB_USERNAME.trim();
  if (!user) return;
  var url = 'https://github.com/' + user;
  document.querySelectorAll('.js-github-link').forEach(function(a){ a.href = url; });
  document.querySelectorAll('.js-github-user').forEach(function(s){ s.textContent = user; });
  var section = document.getElementById('github');
  if (!section || section.hidden) return; // section hidden: skip the live repo list
  Promise.all([
    fetch('https://api.github.com/users/' + user).then(function(r){ return r.ok ? r.json() : null; }),
    fetch('https://api.github.com/users/' + user + '/repos?sort=updated&per_page=20').then(function(r){ return r.ok ? r.json() : []; })
  ]).then(function(res){
    var p = res[0], repos = res[1];
    if (!p) return;
    var stats = document.getElementById('gh-stats');
    [['Public repos', p.public_repos], ['Followers', p.followers]].forEach(function(s){
      var d = document.createElement('div'); d.className = 'gh-stat';
      var b = document.createElement('b'); b.textContent = s[1];
      var t = document.createElement('span'); t.textContent = s[0];
      d.append(b, t); stats.appendChild(d);
    });
    var list = document.getElementById('gh-repos');
    repos.filter(function(r){ return !r.fork; }).slice(0, REPOS_TO_SHOW).forEach(function(r){
      var li = document.createElement('li'), a = document.createElement('a');
      a.href = r.html_url; a.target = '_blank'; a.rel = 'noopener';
      var n = document.createElement('strong'); n.textContent = r.name;
      var s = document.createElement('small'); s.textContent = [r.language, r.description].filter(Boolean).join(' · ') || 'No description yet';
      a.append(n, s); li.appendChild(a); list.appendChild(li);
    });
    document.getElementById('gh-live').hidden = false;
  }).catch(function(){});
})();

/* ---------- TagGrid scope board: show everything vs first release ---------- */
(function(){
  document.querySelectorAll('[data-scope-toggle]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var board = btn.closest('[data-scope]');
      var on = board.classList.toggle('first-release');
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.textContent = on ? 'Show the full wish list' : 'Show only the first release';
    });
  });
})();

/* ---------- Decision desk: pick an option, see the real call ---------- */
(function(){
  var board = document.querySelector('[data-desk]');
  if (!board) return;
  board.classList.add('js-desk');
  var cards = board.querySelectorAll('.dq');
  var count = board.querySelector('.desk-count');
  var prev = board.querySelector('[data-step="-1"]');
  var next = board.querySelector('[data-step="1"]');
  var i = 0;
  var steps = document.createElement('div');
  steps.className = 'desk-steps'; steps.setAttribute('aria-hidden', 'true');
  cards.forEach(function(){ steps.appendChild(document.createElement('i')); });
  board.insertBefore(steps, board.firstChild);
  var marks = steps.querySelectorAll('i');
  function render(){
    cards.forEach(function(c, n){
      c.classList.toggle('on', n === i);
      marks[n].classList.toggle('here', n === i);
      marks[n].classList.toggle('done', c.classList.contains('answered'));
    });
    count.textContent = (i + 1) + ' of ' + cards.length;
    prev.disabled = i === 0;
    next.textContent = i === cards.length - 1 ? 'Start again' : 'Next decision';
  }
  cards.forEach(function(card){
    var reveal = card.querySelector('.reveal');
    var answer = reveal.getAttribute('data-answer');
    card.querySelectorAll('[data-pick]').forEach(function(btn){
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', function(){
        card.querySelectorAll('[data-pick]').forEach(function(b){
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
          b.classList.toggle('correct', b.getAttribute('data-pick') === answer);
        });
        card.querySelector('.match').textContent = btn.getAttribute('data-pick') === answer
          ? 'You would have made the same call.'
          : 'I went the other way. Here is why.';
        card.classList.add('answered');
        render();
      });
    });
  });
  prev.addEventListener('click', function(){ if (i > 0) { i--; render(); } });
  next.addEventListener('click', function(){ i = (i + 1) % cards.length; render(); });
  render();
})();

/* ---------- Motion: nav, reading progress, scroll reveals, timeline, diagrams ---------- */
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;
  var nav = document.querySelector('.nav');
  var bar = document.createElement('span');
  bar.className = 'progress'; bar.setAttribute('aria-hidden', 'true');
  if (nav) nav.appendChild(bar);
  var lastY = window.scrollY || 0, ticking = false;

  function frame(){
    ticking = false;
    var y = window.scrollY || 0;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
    if (nav) {
      nav.classList.toggle('scrolled', y > 8);
      if (!reduce) {
        var keep = nav.contains(document.activeElement);
        if (y > lastY + 4 && y > 480 && !keep) nav.classList.add('tuck');
        else if (y < lastY - 4 || y < 480) nav.classList.remove('tuck');
      }
    }
    lastY = y;
    // timeline fills as you read it
    var tl = document.querySelector('main:not([hidden]) .timeline');
    if (tl) {
      var r = tl.getBoundingClientRect(), line = window.innerHeight * 0.62;
      var p = Math.max(0, Math.min(1, (line - r.top) / r.height));
      tl.style.setProperty('--p', p.toFixed(3));
      tl.querySelectorAll(':scope > li').forEach(function(li){
        li.classList.toggle('lit', li.getBoundingClientRect().top + 30 < line);
      });
    }
    // portrait drifts a little against the scroll
    if (!reduce) {
      var img = document.querySelector('main:not([hidden]) .front .portrait img');
      if (img) {
        var fr = img.parentNode.getBoundingClientRect();
        if (fr.bottom > 0 && fr.top < window.innerHeight) {
          var off = Math.max(-12, Math.min(12, (fr.top + fr.height / 2 - window.innerHeight / 2) * -0.05));
          img.style.translate = '0 ' + off.toFixed(1) + 'px';
        }
      }
    }
  }
  function onScroll(){ if (!ticking) { ticking = true; window.requestAnimationFrame(frame); } }
  window.addEventListener('scroll', onScroll, {passive: true});
  window.addEventListener('resize', onScroll);
  frame();

  if (reduce || !hasIO) return;

  // Things that rise into place as they scroll into view
  var SEL = [
    '.sec-head', '.index .entry', '.desk-board', '.principles article', '.together',
    '.timeline > li', '.skills > div', '.about h2', '.about .copy > p', '.faq-wrap h2',
    '.faq details', '.contact h2', '.contact .wrap > p', '.ways a',
    '.brief', '.opener', '.prose > h2', '.prose > p', '.prose > figure', '.prose > .layers',
    '.prose > blockquote', '.prose > ul', '.cs-side .decisions', '.nextcase'
  ].join(',');
  var io = new IntersectionObserver(function(entries){
    var n = 0;
    entries.forEach(function(e){
      if (!e.isIntersecting) return;
      e.target.style.setProperty('--d', (n++ * 80) + 'ms');
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, {rootMargin: '0px 0px -8% 0px', threshold: 0.08});
  function arm(root){
    root.querySelectorAll(SEL).forEach(function(el){
      if (el.classList.contains('rv')) return;
      var r = el.getBoundingClientRect();
      if (!r.width && !r.height) return;            // not on screen at all (hidden view)
      if (r.top < window.innerHeight * 0.9) return; // already visible: leave it alone
      el.classList.add('rv');
      io.observe(el);
    });
  }
  arm(document.querySelector('main[data-view="home"]'));

  // Diagram lines draw themselves, bars grow, when they come into view
  var dio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('drawn'); dio.unobserve(e.target); }
    });
  }, {threshold: 0.3});
  document.querySelectorAll('.draw, .grow').forEach(function(g){
    (g.tagName.toLowerCase() === 'path' ? [g] : g.querySelectorAll('path')).forEach(function(p){ p.setAttribute('pathLength', '1'); });
    g.classList.add('armed');
    dio.observe(g.tagName.toLowerCase() === 'g' || g.tagName.toLowerCase() === 'path' ? (g.ownerSVGElement || g) : g);
  });

  document.addEventListener('viewchange', function(e){
    var view = document.querySelector('main[data-view="' + e.detail + '"]');
    if (view) window.requestAnimationFrame(function(){ arm(view); onScroll(); });
  });
})();
