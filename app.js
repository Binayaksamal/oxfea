let dramas = [], categories = [];
let genreFilter = 'All', streamFilter = 'All', watchOnly = false, query = '';
const $ = (s) => document.querySelector(s);
const saved = JSON.parse(localStorage.getItem('oxfea-watchlist') || '[]');
const watchlist = new Set(saved);
const saveWatch = () => localStorage.setItem('oxfea-watchlist', JSON.stringify([...watchlist]));

function catColor(name) {
  const c = categories.find(x => x.name === name);
  return c ? c.color : '#F7F4EE';
}
function genreOf(d) { return (d.genres || []).join(' '); }
function matches(d) {
  if (watchOnly && !watchlist.has(d.id)) return false;
  if (genreFilter !== 'All' && !(d.genres || []).includes(genreFilter)) return false;
  if (streamFilter !== 'All' && d.streaming !== streamFilter) return false;
  if (query) {
    const hay = [d.title, d.korean_title || '', d.aka || '', d.tagline || '', d.mood || '', genreOf(d), d.streaming || '', d.network || ''].join(' ').toLowerCase();
    if (!hay.includes(query)) return false;
  }
  return true;
}
function renderChips() {
  const genres = ['All', ...new Set(dramas.flatMap(d => d.genres || []))];
  $('#chips').innerHTML = genres.map(g =>
    `<button class="chip ${g === genreFilter ? 'active' : ''}" data-g="${g}">${g}</button>`).join('');
  document.querySelectorAll('#chips .chip').forEach(b => b.onclick = () => { genreFilter = b.dataset.g; render(); });
  const streams = ['All', ...new Set(dramas.map(d => d.streaming).filter(Boolean))];
  $('#streams').innerHTML = streams.map(s => `<option ${s === streamFilter ? 'selected' : ''}>${s}</option>`).join('');
}
function card(d) {
  const inList = watchlist.has(d.id);
  const badges = (d.genres || []).map(g =>
    `<span class="badge" style="background:${catColor(g)}22">${g}</span>`).join('');
  const line = d.tagline || d.mood || '';
  return `<article class="card" data-id="${d.id}">
    <div>${badges}${d.streaming ? `<span class="badge">${d.streaming}</span>` : ''}</div>
    <h3>${d.title}</h3>
    ${d.korean_title ? `<div class="meta">${d.korean_title}</div>` : ''}
    ${line ? `<p>${line}</p>` : ''}
    <div class="meta">${d.episodes ? `${d.episodes} episodes · ` : ''}${d.network || ''} ${d.schedule || ''}</div>
    <button class="watch" data-watch="${d.id}">${inList ? '✓ In watchlist — tap to remove' : '+ Add to watchlist'}</button>
  </article>`;
}
function render() {
  renderChips();
  const list = dramas.filter(matches);
  $('#count').textContent = `${list.length} of ${dramas.length} dramas · ${watchlist.size} in your watchlist`;
  $('#grid').innerHTML = list.length ? list.map(card).join('') : '<div class="note">No matches. Try clearing a filter, or add a drama in content/dramas.json.</div>';
  document.querySelectorAll('[data-watch]').forEach(b => b.onclick = (e) => {
    e.stopPropagation();
    const id = b.dataset.watch;
    watchlist.has(id) ? watchlist.delete(id) : watchlist.add(id);
    saveWatch(); render();
  });
  document.querySelectorAll('.card').forEach(c => c.onclick = () => openDetail(c.dataset.id));
}
function openDetail(id) {
  const d = dramas.find(x => x.id === id);
  if (!d) return;
  const rows = [['Korean title', d.korean_title], ['Also known as', d.aka], ['Episodes', d.episodes],
    ['Network', d.network], ['Streaming', d.streaming], ['Schedule', d.schedule],
    ['Premiere', d.premiere], ['Genres', (d.genres || []).join(', ') || null],
    ['Tagline / mood', d.tagline || d.mood]]
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join('');
  $('#detailBox').innerHTML = `<button class="close" id="closeDetail">✕</button>
    <div class="eyebrow">Drama detail</div><h2>${d.title}</h2>${rows}
    <button id="detailWatch">${watchlist.has(d.id) ? 'Remove from watchlist' : 'Add to watchlist'}</button>`;
  $('#detail').classList.add('open');
  $('#closeDetail').onclick = () => $('#detail').classList.remove('open');
  $('#detailWatch').onclick = () => {
    watchlist.has(d.id) ? watchlist.delete(d.id) : watchlist.add(d.id);
    saveWatch(); render(); openDetail(id);
  };
}
$('#detail').onclick = (e) => { if (e.target.id === 'detail') $('#detail').classList.remove('open'); };
$('#search').oninput = (e) => { query = e.target.value.trim().toLowerCase(); render(); };
$('#streams').onchange = (e) => { streamFilter = e.target.value; render(); };
$('#watchBtn').onclick = () => { watchOnly = !watchOnly; $('#watchBtn').classList.toggle('active', watchOnly); render(); };
$('#pickBtn').onclick = () => {
  const list = dramas.filter(matches);
  if (!list.length) return;
  openDetail(list[Math.floor(Math.random() * list.length)].id);
};
Promise.all([
  fetch('content/dramas.json').then(r => r.json()),
  fetch('content/categories.json').then(r => r.json())
]).then(([dj, cj]) => {
  dramas = dj.dramas; categories = cj.categories; render();
}).catch(() => {
  $('#grid').innerHTML = `<div class="note"><strong>Run it with a local server, not by double-clicking the file</strong> — browsers block loading JSON from file://.<br>
  In this folder run: <code>python3 -m http.server 8000</code> then open <code>http://localhost:8000</code>.<br>
  The same folder works as-is on GitHub Pages.</div>`;
});
