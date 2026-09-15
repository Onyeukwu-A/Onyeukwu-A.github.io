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
