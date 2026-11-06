/* My notebook — メモと画像を記録するノート。入力した文字はそのまま保存し、自動変換はしない。 */
'use strict';

/* ===== アイコン ===== */
const ICONS = {
  menu: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  search: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  close: 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  grid: 'M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm8-2h8v8h-8v-8zm2 2v4h4v-4h-4z',
  list: 'M3 4h18v7H3V4zm2 2v3h14V6H5zm-2 7h18v7H3v-7zm2 2v3h14v-3H5z',
  bulb: 'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z',
  pin: 'M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z',
  label: 'M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z',
  archive: 'M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5 6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z',
  unarchive: 'M20.55 5.22l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.15.55L3.46 5.22C3.17 5.57 3 6.01 3 6.5V19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6.5c0-.49-.17-.93-.45-1.28zM12 9.5l5.5 5.5H14v2h-4v-2H6.5L12 9.5zM5.12 5l.82-1h12l.93 1H5.12z',
  trash: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4h-3.5z',
  image: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z',
  palette: 'M12 3a9 9 0 0 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  checkbox: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  boxEmpty: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
  restore: 'M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18z',
  download: 'M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z',
  upload: 'M5 20h14v-2H5v2zm0-10h4v6h6v-6h4l-7-7-7 7z',
  moon: 'M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z',
  sun: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM2 13h2a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2zm18 0h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2zM11 2v2a1 1 0 0 0 2 0V2a1 1 0 0 0-2 0zm0 18v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-2 0zM5.99 4.58a1 1 0 0 0-1.41 1.41l1.06 1.06a1 1 0 0 0 1.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 0 0-1.41 1.41l1.06 1.06a1 1 0 0 0 1.41-1.41l-1.06-1.06zm1.06-10.96a1 1 0 0 0-1.41-1.41l-1.06 1.06a1 1 0 0 0 1.41 1.41l1.06-1.06zM7.05 18.36a1 1 0 0 0-1.41-1.41l-1.06 1.06a1 1 0 0 0 1.41 1.41l1.06-1.06z',
  auto: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 17.93V4.07A8 8 0 0 1 13 19.93z',
  edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  plus: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  more: 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
  copy: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
  check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  noColor: 'M12 3a9 9 0 0 0-7.03 14.62L17.62 4.97A8.95 8.95 0 0 0 12 3zm7.03 3.38L6.38 19.03A9 9 0 0 0 19.03 6.38z',
};
const SVGNS = 'http://www.w3.org/2000/svg';
function icon(name) {
  const svg = document.createElementNS(SVGNS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('class', 'ic');
  const p = document.createElementNS(SVGNS, 'path');
  p.setAttribute('d', ICONS[name]);
  svg.appendChild(p);
  return svg;
}

/* ===== 小さな道具 ===== */
const $ = (sel, root = document) => root.querySelector(sel);
const PROPS = new Set(['value', 'checked', 'disabled', 'readOnly', 'hidden', 'multiple']);
function el(tag, props = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === 'class') e.className = v;
    else if (k === 'text') e.textContent = v;
    else if (k === 'dataset') Object.assign(e.dataset, v);
    else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
    else if (PROPS.has(k)) e[k] = v;
    else e.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kids.flat()) {
    if (c == null || c === false) continue;
    e.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return e;
}
function iconBtn(name, title, onclick, cls = '') {
  return el('button', { class: 'icon-btn ' + cls, type: 'button', title, 'aria-label': title, onclick }, icon(name));
}
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 10); }
function pref(key, fallback) { try { return localStorage.getItem('mn.' + key) ?? fallback; } catch { return fallback; } }
function setPref(key, value) { try { localStorage.setItem('mn.' + key, value); } catch { /* 保存できなくても動く */ } }
function fmtDate(t) {
  const d = new Date(t), now = new Date();
  const time = d.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  if (d.toDateString() === now.toDateString()) return '今日 ' + time;
  const opts = d.getFullYear() === now.getFullYear() ? { month: 'long', day: 'numeric' } : { year: 'numeric', month: 'long', day: 'numeric' };
  return d.toLocaleDateString('ja-JP', opts) + ' ' + time;
}
function autosize(ta) { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; }

const COLORS = [
  ['default', '色なし'], ['red', '赤'], ['orange', 'オレンジ'], ['yellow', '黄'], ['green', '緑'], ['teal', '青緑'],
  ['blue', '水色'], ['navy', '青'], ['purple', '紫'], ['pink', 'ピンク'], ['brown', '茶'], ['gray', 'グレー'],
];

/* ===== 状態 ===== */
const S = {
  notes: [],
  labels: [],
  view: 'notes',          // notes | archive | trash | label:<名前>
  query: '',
  layout: pref('layout', 'grid'),
  theme: pref('theme', 'auto'),
};
let ED = null;            // 開いているエディター

/* ===== 保存 ===== */
async function saveNote(n) {
  if (!S.notes.includes(n)) S.notes.push(n);
  try { await DB.put('notes', n); } catch (err) { saveFailed(err); }
}
async function saveLabels() {
  try { await DB.put('meta', { key: 'labels', value: S.labels }); } catch (err) { saveFailed(err); }
}
function saveFailed(err) {
  console.error(err);
  toast('保存できませんでした。ブラウザの空き容量を確認してください。');
}
function newNote(extra = {}) {
  const t = Date.now();
  const labels = S.view.startsWith('label:') && !S.query ? [S.view.slice(6)] : [];
  return { id: uid(), title: '', body: '', items: [], images: [], color: 'default', labels, pinned: false, archived: false, trashed: false, trashedAt: null, created: t, updated: t, ...extra };
}
function isEmpty(n) {
  return !n.title.trim() && !n.body.trim() && !n.items.some((i) => i.text.trim()) && n.images.length === 0;
}

/* ===== 画像 ===== */
const urlCache = new Map();
async function imageURL(id) {
  if (urlCache.has(id)) return urlCache.get(id);
  const rec = await DB.get('images', id).catch(() => null);
  if (!rec) return null;
  const url = URL.createObjectURL(rec.blob);
  urlCache.set(id, url);
  return url;
}
function imgEl(id, attrs = {}) {
  const img = el('img', { alt: '', loading: 'lazy', decoding: 'async', ...attrs });
  imageURL(id).then((u) => { if (u) img.src = u; });
  return img;
}
async function storeImages(files) {
  const ids = [];
  for (const f of files) {
    if (!f.type.startsWith('image/')) continue;
    const id = uid();
    try {
      await DB.put('images', { id, blob: f, name: f.name || 'image', type: f.type, created: Date.now() });
      ids.push(id);
    } catch (err) { saveFailed(err); break; }
  }
  if (files.length && !ids.length) toast('画像ファイルを選んでください');
  return ids;
}
async function deleteImages(ids) {
  if (!ids.length) return;
  ids.forEach((id) => { const u = urlCache.get(id); if (u) URL.revokeObjectURL(u); urlCache.delete(id); });
  await DB.delMany('images', ids).catch(console.error);
}
function imageFilesFrom(dt) {
  if (!dt) return [];
  return [...(dt.files || [])].filter((f) => f.type.startsWith('image/'));
}

/* ===== 一覧の絞り込み ===== */
function matches(n, q) {
  const hay = [n.title, n.body, ...n.items.map((i) => i.text), ...n.labels].join('\n').toLowerCase();
  return q.split(/\s+/).filter(Boolean).every((w) => hay.includes(w));
}
function visibleNotes() {
  const q = S.query.trim().toLowerCase();
  const list = S.notes.filter((n) => {
    if (q) return !n.trashed && matches(n, q);
    if (S.view === 'trash') return n.trashed;
    if (n.trashed) return false;
    if (S.view === 'archive') return n.archived;
    if (S.view.startsWith('label:')) return n.labels.includes(S.view.slice(6));
    return !n.archived;
  });
  if (S.view === 'trash' && !q) list.sort((a, b) => (b.trashedAt || 0) - (a.trashedAt || 0));
  else list.sort((a, b) => b.updated - a.updated);
  return list;
}

/* ===== サイドバー ===== */
function renderNav() {
  const nav = $('#sidebar');
  nav.replaceChildren();
  const item = (view, ic, label, count) => el('button', {
    class: 'nav-item' + (S.view === view && !S.query ? ' active' : ''), type: 'button', title: label,
    onclick: () => go(view),
  }, icon(ic), el('span', { class: 'nav-label', text: label }), count ? el('span', { class: 'nav-count', text: count }) : null);

  nav.append(item('notes', 'bulb', 'メモ'));
  for (const l of S.labels) {
    const c = S.notes.filter((n) => !n.trashed && n.labels.includes(l)).length;
    nav.append(item('label:' + l, 'label', l, c || ''));
  }
  nav.append(el('button', { class: 'nav-item', type: 'button', title: 'ラベルを編集', onclick: openLabelEditor }, icon('edit'), el('span', { class: 'nav-label', text: 'ラベルを編集' })));
  nav.append(item('archive', 'archive', 'アーカイブ'));
  const tc = S.notes.filter((n) => n.trashed).length;
  nav.append(item('trash', 'trash', 'ゴミ箱', tc || ''));
}
function go(view) {
  S.view = view;
  S.query = '';
  $('#search').value = '';
  $('#searchClear').hidden = true;
  closeNav();
  render();
  $('#main').scrollTop = 0;
  window.scrollTo(0, 0);
}
function isNarrow() { return window.matchMedia('(max-width: 860px)').matches; }
function toggleNav() {
  if (isNarrow()) {
    const open = !document.body.classList.contains('nav-open');
    document.body.classList.toggle('nav-open', open);
    $('#scrim').hidden = !open;
  } else {
    const mini = !document.body.classList.contains('nav-mini');
    document.body.classList.toggle('nav-mini', mini);
    setPref('navMini', mini ? '1' : '0');
  }
}
function closeNav() { document.body.classList.remove('nav-open'); $('#scrim').hidden = true; }

/* ===== メイン ===== */
let sizer = null;
function render() {
  renderNav();
  const main = $('#main');
  main.replaceChildren();
  const q = S.query.trim();
  const list = visibleNotes();

  if (q) {
    main.append(el('h1', { class: 'view-title' }, '検索結果', el('span', { class: 'sub', text: list.length + '件' })));
  } else if (S.view === 'archive') {
    main.append(el('h1', { class: 'view-title', text: 'アーカイブ' }));
  } else if (S.view === 'trash') {
    main.append(el('h1', { class: 'view-title' }, 'ゴミ箱',
      el('span', { class: 'sub', text: '自分で削除するまで残ります' }),
      list.length ? el('button', { class: 'btn danger', type: 'button', text: 'ゴミ箱を空にする', onclick: emptyTrash }) : null));
  } else if (S.view.startsWith('label:')) {
    main.append(el('h1', { class: 'view-title' }, icon('label'), S.view.slice(6)));
  }

  if (!q && (S.view === 'notes' || S.view.startsWith('label:'))) main.append(composer());

  if (!list.length) {
    main.append(emptyState(q));
  } else if (!q && S.view !== 'trash' && list.some((n) => n.pinned)) {
    const pinned = list.filter((n) => n.pinned), others = list.filter((n) => !n.pinned);
    main.append(el('div', { class: 'section-label', text: '固定' }), grid(pinned));
    if (others.length) main.append(el('div', { class: 'section-label', text: 'その他' }), grid(others));
  } else {
    main.append(grid(list));
  }

  sizer?.disconnect();
  sizer = new ResizeObserver((entries) => {
    for (const en of entries) {
      const c = en.target;
      c.style.gridRowEnd = 'span ' + Math.ceil(c.getBoundingClientRect().height + parseFloat(getComputedStyle(c.parentElement).columnGap || 14));
    }
  });
  main.querySelectorAll('.card').forEach((c) => sizer.observe(c));
}
function emptyState(q) {
  const [ic, msg] = q ? ['search', '一致するメモはありません']
    : S.view === 'archive' ? ['archive', 'アーカイブしたメモはここに表示されます']
    : S.view === 'trash' ? ['trash', 'ゴミ箱は空です']
    : S.view.startsWith('label:') ? ['label', 'このラベルのメモはまだありません']
    : ['bulb', '追加したメモはここに表示されます'];
  return el('div', { class: 'empty-state' }, icon(ic), el('p', { text: msg }));
}
function composer() {
  const pick = el('input', { type: 'file', accept: 'image/*', multiple: true, hidden: true, onchange: async (e) => {
    const ids = await storeImages([...e.target.files]);
    e.target.value = '';
    if (ids.length) openEditor(newNote({ images: ids }), { isNew: true });
  } });
  return el('div', { class: 'composer' },
    el('button', { class: 'composer-input', type: 'button', text: 'メモを入力…', onclick: () => openEditor(newNote(), { isNew: true, focus: 'body' }) }),
    iconBtn('checkbox', '新しいリスト', () => openEditor(newNote({ items: [{ id: uid(), text: '', done: false }] }), { isNew: true, focus: 'item' })),
    iconBtn('image', '画像付きの新しいメモ', () => pick.click()),
    pick);
}
function grid(notes) {
  return el('div', { class: 'grid' }, notes.map(card));
}

/* ===== カード ===== */
function card(n) {
  const c = el('article', {
    class: 'card' + (n.images.length ? ' has-img' : ''), tabindex: 0, dataset: { color: n.color, id: n.id },
    'aria-label': n.title || n.body.slice(0, 40) || 'メモ',
    onclick: () => openEditor(n),
    onkeydown: (e) => { if (e.key === 'Enter' && e.target === c) openEditor(n); },
  });

  if (n.images.length) {
    const shown = n.images.slice(0, 3);
    const wrap = el('div', { class: 'card-images n' + shown.length });
    shown.forEach((id, i) => {
      const img = imgEl(id);
      if (i === 2 && n.images.length > 3) wrap.append(el('div', { class: 'more-wrap' }, img, el('div', { class: 'more', text: '+' + (n.images.length - 3) })));
      else wrap.append(img);
    });
    c.append(wrap);
  }

  const content = el('div', { class: 'card-content' });
  if (n.title.trim()) content.append(el('h3', { class: 'card-title', text: n.title }));
  if (n.body.trim()) {
    const lines = n.body.split('\n').length;
    content.append(el('p', { class: 'card-body' + (lines <= 8 && n.body.length < 300 ? ' short' : ''), text: n.body }));
  }
  const open = n.items.filter((i) => !i.done && i.text.trim());
  const done = n.items.filter((i) => i.done && i.text.trim());
  if (open.length || done.length) {
    const ul = el('ul', { class: 'card-list' });
    open.slice(0, 8).forEach((i) => ul.append(el('li', {}, el('span', { class: 'box' }), el('span', { text: i.text }))));
    const rest = open.length > 8 ? `他 ${open.length - 8} 項目` : '';
    if (rest || done.length) ul.append(el('li', { class: 'done-count', text: [rest, done.length ? `完了 ${done.length} 項目` : ''].filter(Boolean).join('・') }));
    content.append(ul);
  }
  if (!n.title.trim() && !n.body.trim() && !open.length && !done.length && !n.images.length) {
    content.append(el('p', { class: 'card-empty', text: '空のメモ' }));
  }
  if (n.labels.length) content.append(el('div', { class: 'chips' }, n.labels.map((l) => el('span', { class: 'chip', text: l }))));
  c.append(content);

  const stop = (fn) => (e) => { e.stopPropagation(); fn(e); };
  if (!n.trashed) {
    c.append(iconBtn('pin', n.pinned ? '固定を解除' : '固定する', stop(() => togglePin(n)), 'sm card-pin' + (n.pinned ? ' on' : '')));
  }
  const actions = el('div', { class: 'card-actions' });
  if (n.trashed) {
    actions.append(
      iconBtn('restore', '元に戻す', stop(() => restoreNote(n)), 'sm'),
      iconBtn('trash', '完全に削除', stop(() => deleteForever(n)), 'sm'));
  } else {
    actions.append(
      iconBtn('palette', '背景色', stop((e) => openPalette(e.currentTarget, n, () => { saveNote(n); render(); })), 'sm'),
      iconBtn('label', 'ラベル', stop((e) => openLabelPicker(e.currentTarget, n, () => { saveNote(n); render(); })), 'sm'),
      iconBtn(n.archived ? 'unarchive' : 'archive', n.archived ? 'アーカイブを解除' : 'アーカイブ', stop(() => toggleArchive(n)), 'sm'),
      iconBtn('trash', 'ゴミ箱へ移動', stop(() => trashNote(n)), 'sm'));
  }
  c.append(actions);
  return c;
}

/* ===== メモの操作 ===== */
function togglePin(n) {
  n.pinned = !n.pinned;
  if (n.pinned && n.archived) n.archived = false;
  saveNote(n); render();
}
function toggleArchive(n) {
  const was = n.archived, wasPinned = n.pinned;
  n.archived = !was;
  if (n.archived) n.pinned = false;
  saveNote(n); render();
  toast(n.archived ? 'アーカイブしました' : 'アーカイブを解除しました', '元に戻す', () => { n.archived = was; n.pinned = wasPinned; saveNote(n); render(); });
}
function trashNote(n) {
  n.trashed = true; n.trashedAt = Date.now();
  saveNote(n); render();
  toast('ゴミ箱に移動しました', '元に戻す', () => restoreNote(n, true));
}
function restoreNote(n, quiet) {
  n.trashed = false; n.trashedAt = null;
  saveNote(n); render();
  if (!quiet) toast('メモを元に戻しました');
}
async function deleteForever(n, ask = true) {
  if (ask && !confirm('このメモを完全に削除します。元に戻せません。よろしいですか？')) return false;
  S.notes = S.notes.filter((x) => x !== n);
  await DB.del('notes', n.id).catch(console.error);
  await deleteImages(n.images);
  render();
  return true;
}
async function emptyTrash() {
  const list = S.notes.filter((n) => n.trashed);
  if (!list.length || !confirm(`ゴミ箱の ${list.length} 件のメモを完全に削除します。元に戻せません。よろしいですか？`)) return;
  S.notes = S.notes.filter((n) => !n.trashed);
  await DB.delMany('notes', list.map((n) => n.id)).catch(console.error);
  await deleteImages(list.flatMap((n) => n.images));
  render();
  toast('ゴミ箱を空にしました');
}
function duplicate(n) {
  const t = Date.now();
  const copy = { ...structuredClone(n), id: uid(), created: t, updated: t, pinned: false, items: n.items.map((i) => ({ ...i, id: uid() })) };
  return copy;
}

/* ===== ポップオーバー ===== */
let pop = null;
function closePopover() { if (pop) { pop.remove(); pop = null; } }
function showPopover(anchor, content) {
  closePopover();
  pop = el('div', { class: 'popover', role: 'dialog', onclick: (e) => e.stopPropagation() }, content);
  document.body.append(pop);
  const r = anchor.getBoundingClientRect();
  const w = pop.offsetWidth, h = pop.offsetHeight;
  let left = Math.min(r.left, window.innerWidth - w - 8);
  let top = r.bottom + 4;
  if (top + h > window.innerHeight - 8) top = Math.max(8, r.top - h - 4);
  pop.style.left = Math.max(8, left) + 'px';
  pop.style.top = top + 'px';
  return pop;
}
document.addEventListener('click', (e) => { if (pop && !pop.contains(e.target)) closePopover(); });

function openPalette(anchor, n, onChange) {
  const box = el('div', { class: 'palette' }, COLORS.map(([key, name]) => el('button', {
    class: 'swatch' + (n.color === key ? ' sel' : ''), type: 'button', title: name, 'aria-label': name, dataset: { color: key },
    onclick: () => { n.color = key; closePopover(); onChange(); },
  }, key === 'default' ? icon('noColor') : n.color === key ? icon('check') : null)));
  showPopover(anchor, box);
}

function openLabelPicker(anchor, n, onChange) {
  const input = el('input', { class: 'pop-input', placeholder: 'ラベル名を入力', 'aria-label': 'ラベル名' });
  const listBox = el('div', { class: 'label-pick' });
  const draw = () => {
    const q = input.value.trim();
    listBox.replaceChildren();
    S.labels.filter((l) => l.toLowerCase().includes(q.toLowerCase())).forEach((l) => {
      const on = n.labels.includes(l);
      listBox.append(el('button', { class: 'menu-item' + (on ? ' checked' : ''), type: 'button', onclick: () => {
        n.labels = on ? n.labels.filter((x) => x !== l) : [...n.labels, l];
        onChange(); draw();
      } }, icon(on ? 'checkbox' : 'boxEmpty'), l));
    });
    if (q && !S.labels.includes(q)) {
      listBox.append(el('button', { class: 'menu-item', type: 'button', onclick: () => {
        S.labels.push(q); saveLabels();
        n.labels = [...n.labels, q];
        input.value = '';
        onChange(); draw(); renderNav();
      } }, icon('plus'), `「${q}」を作成`));
    }
  };
  input.addEventListener('input', draw);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); listBox.querySelector('.menu-item')?.click(); }
    if (e.key === 'Escape') { e.stopPropagation(); closePopover(); }
  });
  draw();
  showPopover(anchor, [el('div', { class: 'pop-title', text: 'ラベルを付ける' }), input, listBox]);
  input.focus();
}

/* ===== エディター ===== */
function openEditor(n, opts = {}) {
  closePopover();
  if (ED) closeEditor();
  const ro = n.trashed;
  const ed = { note: n, isNew: !!opts.isNew, timer: null, showDone: true };
  ED = ed;

  const wrap = el('div', { class: 'modal-wrap', onmousedown: (e) => { if (e.target === wrap) closeEditor(); } });
  const modal = el('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'メモを編集', dataset: { color: n.color } });
  const scroll = el('div', { class: 'editor-scroll' });
  const imagesBox = el('div', { class: 'ed-images' });
  const title = el('input', { class: 'ed-title', placeholder: 'タイトル', value: n.title, readOnly: ro, 'aria-label': 'タイトル', autocomplete: 'off', spellcheck: 'false' });
  const body = el('textarea', { class: 'ed-body', placeholder: 'メモを入力…', value: n.body, readOnly: ro, 'aria-label': '本文', rows: 3, spellcheck: 'false' });
  const listBox = el('div', { class: 'ed-list' });
  const chips = el('div', { class: 'chips ed-chips' });
  const meta = el('div', { class: 'ed-meta' });
  const pinBtn = ro ? null : iconBtn('pin', '', () => { n.pinned = !n.pinned; if (n.pinned) n.archived = false; drawPin(); persistSoon(); });
  const filePick = el('input', { type: 'file', accept: 'image/*', multiple: true, hidden: true, onchange: async (e) => {
    const ids = await storeImages([...e.target.files]);
    e.target.value = '';
    addImagesToEditor(ids);
  } });

  const changed = () => { n.updated = Date.now(); drawMeta(); persistSoon(); };
  const persistSoon = () => { clearTimeout(ed.timer); ed.timer = setTimeout(() => persist(ed), 350); };
  ed.persistSoon = persistSoon;
  const drawPin = () => {
    if (!pinBtn) return;
    pinBtn.classList.toggle('on', n.pinned);
    pinBtn.title = n.pinned ? '固定を解除' : '固定する';
    pinBtn.setAttribute('aria-label', pinBtn.title);
    pinBtn.style.color = n.pinned ? 'var(--accent)' : '';
  };
  const drawMeta = () => { meta.textContent = (ro ? 'ゴミ箱内のメモは編集できません・' : '') + '編集: ' + fmtDate(n.updated); };

  const drawImages = () => {
    imagesBox.replaceChildren();
    imagesBox.classList.toggle('single', n.images.length === 1);
    n.images.forEach((id) => {
      imagesBox.append(el('div', { class: 'ed-img' },
        imgEl(id, { onclick: () => openLightbox(n, id) }),
        ro ? null : iconBtn('trash', '画像を削除', async () => {
          if (!confirm('この画像を削除しますか？')) return;
          n.images = n.images.filter((x) => x !== id);
          await deleteImages([id]);
          drawImages(); changed();
        }, 'sm')));
    });
  };
  ed.addImages = (ids) => { if (!ids.length) return; n.images.push(...ids); drawImages(); changed(); };

  const drawList = (focusId, caretEnd) => {
    listBox.replaceChildren();
    if (!n.items.length) return;
    const row = (item) => {
      const ta = el('textarea', { rows: 1, value: item.text, readOnly: ro, placeholder: 'リストの項目', 'aria-label': 'リストの項目', spellcheck: 'false', dataset: { id: item.id } });
      ta.addEventListener('input', () => { item.text = ta.value.replace(/\n/g, ' '); if (ta.value !== item.text) ta.value = item.text; autosize(ta); changed(); });
      ta.addEventListener('keydown', (e) => {
        if (ro || e.isComposing) return;
        if (e.key === 'Enter') {
          e.preventDefault();
          const ni = { id: uid(), text: '', done: false };
          n.items.splice(n.items.indexOf(item) + 1, 0, ni);
          changed(); drawList(ni.id);
        } else if (e.key === 'Backspace' && ta.value === '' ) {
          e.preventDefault();
          const visible = [...listBox.querySelectorAll('textarea')];
          const idx = visible.indexOf(ta);
          const prev = visible[idx - 1]?.dataset.id;
          n.items = n.items.filter((x) => x !== item);
          changed(); drawList(prev, true);
          if (!n.items.length) body.focus();
        }
      });
      const cb = el('input', { type: 'checkbox', checked: item.done, disabled: ro, 'aria-label': '完了', onchange: () => { item.done = cb.checked; changed(); drawList(); } });
      return el('div', { class: 'ed-item' + (item.done ? ' done' : '') }, cb, ta,
        ro ? null : iconBtn('close', '項目を削除', () => { n.items = n.items.filter((x) => x !== item); changed(); drawList(); }, 'sm'));
    };
    const open = n.items.filter((i) => !i.done), done = n.items.filter((i) => i.done);
    open.forEach((i) => listBox.append(row(i)));
    if (!ro) listBox.append(el('button', { class: 'ed-add', type: 'button', onclick: () => {
      const ni = { id: uid(), text: '', done: false };
      n.items.push(ni); changed(); drawList(ni.id);
    } }, icon('plus'), 'リストの項目を追加'));
    if (done.length) {
      listBox.append(el('div', { class: 'ed-sep' }));
      listBox.append(el('button', { class: 'ed-done-toggle', type: 'button', text: (ed.showDone ? '▾ ' : '▸ ') + `完了 ${done.length} 項目`, onclick: () => { ed.showDone = !ed.showDone; drawList(); } }));
      if (ed.showDone) done.forEach((i) => listBox.append(row(i)));
    }
    requestAnimationFrame(() => {
      listBox.querySelectorAll('textarea').forEach(autosize);
      if (focusId) {
        const t = listBox.querySelector(`textarea[data-id="${focusId}"]`);
        if (t) { t.focus(); if (caretEnd) t.setSelectionRange(t.value.length, t.value.length); }
      }
    });
  };

  const drawChips = () => {
    chips.replaceChildren(...n.labels.map((l) => el('span', { class: 'chip' }, l,
      ro ? null : el('button', { type: 'button', title: 'ラベルを外す', 'aria-label': `ラベル「${l}」を外す`, onclick: () => { n.labels = n.labels.filter((x) => x !== l); drawChips(); persistSoon(); } }, icon('close')))));
    chips.hidden = !n.labels.length;
  };

  title.addEventListener('input', () => { n.title = title.value; changed(); });
  title.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); body.focus(); } });
  body.addEventListener('input', () => { n.body = body.value; autosize(body); changed(); });

  const tools = el('div', { class: 'ed-tools' });
  if (ro) {
    tools.append(
      iconBtn('restore', '元に戻す', () => { closeEditor(); restoreNote(n); }),
      iconBtn('trash', '完全に削除', async () => { if (await deleteForever(n)) { ED = null; wrap.remove(); document.body.style.overflow = ''; } }));
  } else {
    tools.append(
      iconBtn('palette', '背景色', (e) => { e.stopPropagation(); openPalette(e.currentTarget, n, () => { modal.dataset.color = n.color; persistSoon(); }); }),
      iconBtn('image', '画像を追加', () => filePick.click()),
      iconBtn('checkbox', 'チェックリストを追加', () => {
        const ni = { id: uid(), text: '', done: false };
        n.items.push(ni); changed(); drawList(ni.id);
      }),
      iconBtn('label', 'ラベル', (e) => { e.stopPropagation(); openLabelPicker(e.currentTarget, n, () => { drawChips(); persistSoon(); }); }),
      iconBtn(n.archived ? 'unarchive' : 'archive', n.archived ? 'アーカイブを解除' : 'アーカイブ', () => { closeEditor(); if (!isEmpty(n)) toggleArchive(n); }),
      iconBtn('copy', 'コピーを作成', async () => {
        if (isEmpty(n)) return;
        const copy = duplicate(n);
        copy.images = [];
        for (const id of n.images) {
          const rec = await DB.get('images', id).catch(() => null);
          if (rec) { const nid = uid(); await DB.put('images', { ...rec, id: nid }); copy.images.push(nid); }
        }
        closeEditor();
        await saveNote(copy); render();
        toast('コピーを作成しました');
      }),
      iconBtn('trash', 'ゴミ箱へ移動', () => {
        closeEditor();
        if (S.notes.includes(n)) trashNote(n);
      }),
      filePick);
  }
  tools.append(el('span', { class: 'spacer' }), el('button', { class: 'btn', type: 'button', text: '閉じる', onclick: closeEditor }));

  scroll.append(imagesBox, el('div', { class: 'ed-head' }, title, pinBtn), body, listBox, chips, meta);
  modal.append(scroll, tools);
  wrap.append(modal);

  // 画像のドラッグ＆ドロップ（エディターの上）
  if (!ro) {
    modal.addEventListener('dragover', (e) => { if ([...e.dataTransfer.types].includes('Files')) { e.preventDefault(); e.stopPropagation(); modal.classList.add('drop-on'); } });
    modal.addEventListener('dragleave', (e) => { if (!modal.contains(e.relatedTarget)) modal.classList.remove('drop-on'); });
    modal.addEventListener('drop', async (e) => {
      e.preventDefault(); e.stopPropagation(); modal.classList.remove('drop-on'); hideDropHint();
      addImagesToEditor(await storeImages(imageFilesFrom(e.dataTransfer)));
    });
  }

  ed.wrap = wrap;
  document.body.append(wrap);
  document.body.style.overflow = 'hidden';
  drawPin(); drawMeta(); drawImages(); drawList(); drawChips();
  requestAnimationFrame(() => {
    autosize(body);
    if (ro) return;
    if (opts.focus === 'item') listBox.querySelector('textarea')?.focus();
    else if (opts.focus === 'body' || ed.isNew) body.focus();
  });
  if (ed.isNew && n.images.length) persistSoon();
}
function addImagesToEditor(ids) { if (ED && ids.length) ED.addImages(ids); }

async function persist(ed) {
  clearTimeout(ed.timer);
  const n = ed.note;
  if (ed.isNew && isEmpty(n)) return;
  await saveNote(n);
}
function closeEditor() {
  if (!ED) return;
  const ed = ED;
  ED = null;
  closePopover();
  ed.wrap.remove();
  document.body.style.overflow = '';
  const n = ed.note;
  // 空のリスト項目は片付ける
  n.items = n.items.filter((i) => i.text.trim());
  if (ed.isNew && isEmpty(n)) {
    deleteImages(n.images);
    S.notes = S.notes.filter((x) => x !== n);
    DB.del('notes', n.id).catch(() => {});
  } else {
    persist(ed);
  }
  render();
}

/* ===== 画像ビューア ===== */
function openLightbox(n, id) {
  let idx = n.images.indexOf(id);
  const img = el('img', { alt: '' });
  const dl = el('a', { class: 'icon-btn', title: '画像を保存', 'aria-label': '画像を保存' }, icon('download'));
  const show = async () => {
    const cur = n.images[idx];
    const u = await imageURL(cur);
    img.src = u || '';
    dl.href = u || '#';
    const rec = await DB.get('images', cur).catch(() => null);
    dl.download = rec?.name || 'image';
  };
  const box = el('div', { class: 'lightbox', role: 'dialog', 'aria-label': '画像', onclick: (e) => { if (e.target === box) close(); } },
    img,
    el('div', { class: 'lightbox-bar' }, dl, iconBtn('close', '閉じる', () => close())));
  const key = (e) => {
    if (e.key === 'Escape') { e.stopPropagation(); close(); }
    if (e.key === 'ArrowRight' && n.images.length > 1) { idx = (idx + 1) % n.images.length; show(); }
    if (e.key === 'ArrowLeft' && n.images.length > 1) { idx = (idx - 1 + n.images.length) % n.images.length; show(); }
  };
  const close = () => { box.remove(); document.removeEventListener('keydown', key, true); };
  document.addEventListener('keydown', key, true);
  document.body.append(box);
  show();
}

/* ===== ラベルの編集 ===== */
function openLabelEditor() {
  closeNav();
  const wrap = el('div', { class: 'modal-wrap', onmousedown: (e) => { if (e.target === wrap) close(); } });
  const listBox = el('div');
  const add = el('input', { placeholder: '新しいラベルを作成', 'aria-label': '新しいラベル名', maxlength: 50 });
  const create = () => {
    const v = add.value.trim();
    if (!v) return;
    if (S.labels.includes(v)) { toast('同じ名前のラベルがあります'); return; }
    S.labels.push(v); saveLabels(); add.value = ''; draw(); renderNav();
  };
  add.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.isComposing) create(); });
  const draw = () => {
    listBox.replaceChildren(...S.labels.map((l) => {
      const inp = el('input', { value: l, 'aria-label': 'ラベル名', maxlength: 50 });
      const commit = () => {
        const v = inp.value.trim();
        if (v === l) return;
        if (!v || S.labels.includes(v)) { inp.value = l; if (v) toast('同じ名前のラベルがあります'); return; }
        S.labels[S.labels.indexOf(l)] = v;
        S.notes.forEach((n) => { if (n.labels.includes(l)) { n.labels = n.labels.map((x) => (x === l ? v : x)); saveNote(n); } });
        if (S.view === 'label:' + l) S.view = 'label:' + v;
        saveLabels(); draw(); renderNav();
      };
      inp.addEventListener('change', commit);
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.isComposing) inp.blur(); });
      return el('div', { class: 'dialog-row' }, icon('label'), inp,
        iconBtn('trash', 'ラベルを削除', () => {
          if (!confirm(`ラベル「${l}」を削除します。メモは削除されず、ラベルだけが外れます。`)) return;
          S.labels = S.labels.filter((x) => x !== l);
          S.notes.forEach((n) => { if (n.labels.includes(l)) { n.labels = n.labels.filter((x) => x !== l); saveNote(n); } });
          if (S.view === 'label:' + l) S.view = 'notes';
          saveLabels(); draw(); renderNav();
        }, 'sm'));
    }));
  };
  const close = () => { wrap.remove(); document.removeEventListener('keydown', esc, true); render(); };
  const esc = (e) => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
  document.addEventListener('keydown', esc, true);
  wrap.append(el('div', { class: 'modal dialog', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'ラベルの編集' },
    el('h2', { text: 'ラベルの編集' }),
    el('div', { class: 'dialog-row' }, icon('plus'), add, iconBtn('check', '作成', create, 'sm')),
    listBox,
    el('div', { class: 'dialog-foot' }, el('button', { class: 'btn', type: 'button', text: '完了', onclick: close }))));
  draw();
  document.body.append(wrap);
  add.focus();
}

/* ===== バックアップ ===== */
function blobToDataURL(blob) {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(r.error); r.readAsDataURL(blob); });
}
async function exportData() {
  closePopover();
  toast('バックアップを作成しています…');
  const images = [];
  for (const rec of await DB.all('images')) {
    images.push({ id: rec.id, name: rec.name, type: rec.type, created: rec.created, data: await blobToDataURL(rec.blob) });
  }
  const data = { app: 'my-notebook', version: 1, exportedAt: new Date().toISOString(), labels: S.labels, notes: S.notes, images };
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const a = el('a', { href: URL.createObjectURL(blob), download: `my-notebook-${new Date().toISOString().slice(0, 10)}.json` });
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  toast(`メモ ${S.notes.length} 件・画像 ${images.length} 枚を書き出しました`);
}
async function importData(file) {
  let data;
  try { data = JSON.parse(await file.text()); } catch { toast('読み込めないファイルです'); return; }
  if (data?.app !== 'my-notebook' || !Array.isArray(data.notes)) { toast('My notebook のバックアップではありません'); return; }
  if (!confirm(`メモ ${data.notes.length} 件を読み込みます。同じメモがある場合は上書きされます。よろしいですか？`)) return;
  try {
    const imgs = [];
    for (const im of data.images || []) {
      const blob = await (await fetch(im.data)).blob();
      imgs.push({ id: im.id, name: im.name, type: im.type, created: im.created, blob });
      const old = urlCache.get(im.id); if (old) { URL.revokeObjectURL(old); urlCache.delete(im.id); }
    }
    if (imgs.length) await DB.putMany('images', imgs);
    const notes = data.notes.map(normalize);
    await DB.putMany('notes', notes);
    const ids = new Set(notes.map((n) => n.id));
    S.notes = S.notes.filter((n) => !ids.has(n.id)).concat(notes);
    for (const l of [...(data.labels || []), ...notes.flatMap((n) => n.labels)]) if (!S.labels.includes(l)) S.labels.push(l);
    await saveLabels();
    render();
    toast(`メモ ${notes.length} 件を読み込みました`);
  } catch (err) { saveFailed(err); }
}
function normalize(n) {
  const t = Date.now();
  return {
    id: String(n.id || uid()), title: String(n.title || ''), body: String(n.body || ''),
    items: Array.isArray(n.items) ? n.items.map((i) => ({ id: String(i.id || uid()), text: String(i.text || ''), done: !!i.done })) : [],
    images: Array.isArray(n.images) ? n.images.map(String) : [],
    color: COLORS.some(([k]) => k === n.color) ? n.color : 'default',
    labels: Array.isArray(n.labels) ? n.labels.map(String) : [],
    pinned: !!n.pinned, archived: !!n.archived, trashed: !!n.trashed, trashedAt: n.trashedAt || null,
    created: n.created || t, updated: n.updated || t,
  };
}

/* ===== トースト ===== */
function toast(msg, actionLabel, action) {
  const box = $('#toasts');
  const t = el('div', { class: 'toast', role: 'status' }, el('span', { text: msg }),
    actionLabel ? el('button', { class: 'btn', type: 'button', text: actionLabel, onclick: () => { t.remove(); action(); } }) : null);
  while (box.children.length >= 3) box.firstChild.remove();
  box.append(t);
  setTimeout(() => t.remove(), actionLabel ? 6000 : 3500);
}

/* ===== ドロップ表示 ===== */
let dropHint = null, dragDepth = 0;
function showDropHint() { if (!dropHint) { dropHint = el('div', { class: 'drop-hint', text: 'ここに画像をドロップして新しいメモを作成' }); document.body.append(dropHint); } }
function hideDropHint() { dropHint?.remove(); dropHint = null; dragDepth = 0; }

/* ===== 見た目の設定 ===== */
function applyTheme() {
  if (S.theme === 'auto') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', S.theme);
  const btn = $('#themeBtn');
  const next = { auto: ['auto', 'テーマ: 自動（クリックでライト）'], light: ['sun', 'テーマ: ライト（クリックでダーク）'], dark: ['moon', 'テーマ: ダーク（クリックで自動）'] }[S.theme];
  btn.replaceChildren(icon(next[0]));
  btn.title = next[1]; btn.setAttribute('aria-label', next[1]);
  const dark = S.theme === 'dark' || (S.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  $('meta[name="theme-color"]').content = dark ? '#1b1b1a' : '#f7f6f2';
}
function applyLayout() {
  document.body.classList.toggle('layout-list', S.layout === 'list');
  const btn = $('#layoutBtn');
  const isList = S.layout === 'list';
  btn.replaceChildren(icon(isList ? 'grid' : 'list'));
  btn.title = isList ? 'グリッド表示' : 'リスト表示';
  btn.setAttribute('aria-label', btn.title);
}

/* ===== 起動 ===== */
async function init() {
  $('#navToggle').append(icon('menu'));
  $('#searchIc').append(icon('search'));
  $('#searchClear').append(icon('close'));
  $('#moreBtn').append(icon('more'));
  if (pref('navMini', '0') === '1') document.body.classList.add('nav-mini');
  applyTheme(); applyLayout();

  $('#navToggle').addEventListener('click', toggleNav);
  $('#scrim').addEventListener('click', closeNav);
  $('#brand').addEventListener('click', (e) => { e.preventDefault(); go('notes'); });
  $('#layoutBtn').addEventListener('click', () => { S.layout = S.layout === 'list' ? 'grid' : 'list'; setPref('layout', S.layout); applyLayout(); render(); });
  $('#themeBtn').addEventListener('click', () => { S.theme = { auto: 'light', light: 'dark', dark: 'auto' }[S.theme]; setPref('theme', S.theme); applyTheme(); });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
  $('#moreBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    showPopover(e.currentTarget, [
      el('button', { class: 'menu-item', type: 'button', onclick: exportData }, icon('download'), 'バックアップを書き出す'),
      el('button', { class: 'menu-item', type: 'button', onclick: () => { closePopover(); $('#importFile').click(); } }, icon('upload'), 'バックアップから読み込む'),
      el('button', { class: 'menu-item', type: 'button', onclick: () => { closePopover(); openLabelEditor(); } }, icon('label'), 'ラベルを編集'),
    ]);
    const r = e.currentTarget.getBoundingClientRect();
    pop.style.left = Math.max(8, r.right - pop.offsetWidth) + 'px';
  });
  $('#importFile').addEventListener('change', (e) => { const f = e.target.files[0]; e.target.value = ''; if (f) importData(f); });

  const search = $('#search');
  search.addEventListener('input', () => { S.query = search.value; $('#searchClear').hidden = !search.value; render(); });
  search.addEventListener('keydown', (e) => { if (e.key === 'Escape') { search.value = ''; S.query = ''; $('#searchClear').hidden = true; render(); search.blur(); } });
  $('#searchClear').addEventListener('click', () => { search.value = ''; S.query = ''; $('#searchClear').hidden = true; render(); search.focus(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (pop) { closePopover(); return; }
      if (ED) { closeEditor(); return; }
      closeNav();
      return;
    }
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if (typing || e.ctrlKey || e.metaKey || e.altKey || ED || document.querySelector('.modal-wrap, .lightbox')) return;
    if (e.key === '/') { e.preventDefault(); search.focus(); }
    else if (e.key === 'c' && (S.view === 'notes' || S.view.startsWith('label:'))) { e.preventDefault(); openEditor(newNote(), { isNew: true, focus: 'body' }); }
  });

  // 画像の貼り付け
  document.addEventListener('paste', async (e) => {
    const files = [...(e.clipboardData?.items || [])].filter((i) => i.kind === 'file' && i.type.startsWith('image/')).map((i) => i.getAsFile()).filter(Boolean);
    if (!files.length) return;
    if (ED && ED.note.trashed) return;
    e.preventDefault();
    const ids = await storeImages(files);
    if (!ids.length) return;
    if (ED) addImagesToEditor(ids);
    else if (S.view !== 'trash') openEditor(newNote({ images: ids }), { isNew: true });
  });

  // 画像のドラッグ＆ドロップ（一覧の上）
  const hasFiles = (e) => [...(e.dataTransfer?.types || [])].includes('Files');
  document.addEventListener('dragenter', (e) => { if (!hasFiles(e) || ED) return; dragDepth++; showDropHint(); });
  document.addEventListener('dragleave', () => { if (dropHint && --dragDepth <= 0) hideDropHint(); });
  document.addEventListener('dragover', (e) => { if (hasFiles(e)) e.preventDefault(); });
  document.addEventListener('drop', async (e) => {
    if (!hasFiles(e)) return;
    e.preventDefault(); hideDropHint();
    if (ED) return;
    const ids = await storeImages(imageFilesFrom(e.dataTransfer));
    if (ids.length) openEditor(newNote({ images: ids }), { isNew: true });
  });

  window.addEventListener('resize', () => { if (!isNarrow()) closeNav(); });
  window.addEventListener('beforeunload', () => { if (ED) persist(ED); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && ED) persist(ED); });

  try {
    const [notes, labelsRec] = await Promise.all([DB.all('notes'), DB.get('meta', 'labels')]);
    S.notes = notes.map(normalize);
    S.labels = labelsRec?.value || [];
    navigator.storage?.persist?.().catch(() => {});
  } catch (err) {
    console.error(err);
    toast('このブラウザではメモを保存できません（プライベートブラウズでは保存されないことがあります）');
  }
  render();
}

init();
