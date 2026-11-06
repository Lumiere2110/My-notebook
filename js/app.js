/* My notebook — ボックス › フォルダ › メモファイル › ページ の形でメモを整理するノート。
   ページにはテキストボックス・付箋・画像を置けて、ペンやマーカーで書き込める。入力した文字はそのまま保存し、自動変換はしない。 */
'use strict';

/* ===== アイコン ===== */
const ICONS = {
  menu: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  search: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  close: 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  grid: 'M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm8-2h8v8h-8v-8zm2 2v4h4v-4h-4z',
  list: 'M3 4h18v7H3V4zm2 2v3h14V6H5zm-2 7h18v7H3v-7zm2 2v3h14v-3H5z',
  trash: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4h-3.5z',
  image: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z',
  download: 'M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z',
  upload: 'M5 20h14v-2H5v2zm0-10h4v6h6v-6h4l-7-7-7 7z',
  moon: 'M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z',
  sun: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM2 13h2a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2zm18 0h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2zM11 2v2a1 1 0 0 0 2 0V2a1 1 0 0 0-2 0zm0 18v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-2 0zM5.99 4.58a1 1 0 0 0-1.41 1.41l1.06 1.06a1 1 0 0 0 1.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 0 0-1.41 1.41l1.06 1.06a1 1 0 0 0 1.41-1.41l-1.06-1.06zm1.06-10.96a1 1 0 0 0-1.41-1.41l-1.06 1.06a1 1 0 0 0 1.41 1.41l1.06-1.06zM7.05 18.36a1 1 0 0 0-1.41-1.41l-1.06 1.06a1 1 0 0 0 1.41 1.41l1.06-1.06z',
  auto: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 17.93V4.07A8 8 0 0 1 13 19.93z',
  edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  plus: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  more: 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
  copy: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
  box: 'M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4l16-.02V7z',
  folder: 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z',
  folders: 'M3 6H1v13c0 1.1.9 2 2 2h17v-2H3V6zm18-2h-7l-2-2H7c-1.1 0-1.99.9-1.99 2L5 15c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z',
  file: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
  addPage: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z',
  moveTo: 'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 12v-3h-4v-4h4V8l5 5-5 5z',
  select: 'M7 2l12 11.2-5.8.5 3.3 7.3-2.2 1-3.2-7.4L7 18.5V2z',
  text: 'M5 4v3h5.5v12h3V7H19V4z',
  sticky: 'M19 3H4.99C3.89 3 3 3.9 3 5l.01 14c0 1.1.89 2 1.99 2h10l6-6V5c0-1.1-.9-2-2-2zM7 8h10v2H7V8zm5 6H7v-2h5v2zm2 5.5V14h5.5L14 19.5z',
  pen: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  marker: 'M6 14l3 3v5h6v-5l3-3V9H6v5zm5-12h2v3h-2V2zM3.5 5.88l1.41-1.41 2.12 2.12L5.62 8 3.5 5.88zm13.46.71 2.12-2.12 1.41 1.41L18.38 8l-1.42-1.41z',
  eraser: 'M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.77-.78 2.04 0 2.83L5.03 20h7.66l8.72-8.72c.79-.77.79-2.04 0-2.83l-4.85-4.86c-.39-.39-.91-.59-1.42-.59zM6.44 18l-2.44-2.44 3.76-3.76 4.88 4.88L11.12 18H6.44z',
  undo: 'M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z',
  redo: 'M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z',
  back: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
  up: 'M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z',
  down: 'M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z',
  pageBg: 'M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z',
  move4: 'M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z',
  front: 'M4 4h11v11H4V4zm5 13h11v-9h-3v6.99L9 15v2z',
  back2: 'M9 9h11v11H9V9zM4 15V4h11v3H7v8H4z',
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
function svgEl(tag, attrs = {}) {
  const e = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) if (v != null) e.setAttribute(k, v);
  return e;
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
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const r1 = (v) => Math.round(v * 10) / 10;
const isTyping = () => /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;

/* ===== ページの決まりごと ===== */
const PAGE_W = 900, PAGE_H = 1272;          // A4 の縦横比。ページの中はこの大きさの座標で記録する
const BGS = [['plain', '無地'], ['lined', '罫線'], ['grid', '方眼'], ['dot', 'ドット']];
const INK = [['#222222', '黒'], ['#e53935', '赤'], ['#1e66d0', '青'], ['#2e9b4a', '緑'], ['#f08c00', 'オレンジ'], ['#8e44ad', '紫'], ['#8a8a8a', 'グレー']];
const MARK = [['#ffe14d', '黄'], ['#8be28b', '緑'], ['#ff9ecb', 'ピンク'], ['#8fd0ff', '水色'], ['#ffb366', 'オレンジ']];
const STICKY = [['yellow', '黄'], ['pink', 'ピンク'], ['blue', '水色'], ['green', '緑'], ['orange', 'オレンジ'], ['purple', '紫']];
const PEN_W = [[2, '細'], [4, '中'], [8, '太']];
const MARK_W = [[14, '細'], [24, '中'], [40, '太']];
const TEXT_SIZES = [[18, '小'], [24, '中'], [34, '大'], [48, '特大']];
const TOOLS = [
  ['select', 'select', '選択', 'V'], ['text', 'text', 'テキスト', 'T'], ['sticky', 'sticky', '付箋', 'S'],
  ['pen', 'pen', 'ペン', 'P'], ['marker', 'marker', 'マーカー', 'M'], ['eraser', 'eraser', '消しゴム', 'E'],
];
function newPage(bg = 'lined') { return { id: uid(), bg, items: [], strokes: [] }; }

/* ===== 状態 ===== */
const S = {
  boxes: [], folders: [], files: [],
  route: { name: 'home' },
  query: '',
  layout: pref('layout', 'grid'),
  theme: pref('theme', 'auto'),
};
let ED = null;            // 開いているメモファイルのエディター

const boxById = (id) => S.boxes.find((b) => b.id === id);
const folderById = (id) => S.folders.find((f) => f.id === id);
const fileById = (id) => S.files.find((f) => f.id === id);
const foldersOf = (boxId) => S.folders.filter((f) => f.boxId === boxId).sort((a, b) => a.created - b.created);
const filesOf = (boxId, folderId = 'all') => S.files.filter((f) => f.boxId === boxId && (folderId === 'all' || f.folderId === folderId)).sort((a, b) => b.updated - a.updated);
const boxName = (b) => (b ? b.name + 'ボックス' : '');
function cleanBoxName(v) { return String(v || '').trim().replace(/\s*ボックス$/, '').trim(); }

/* ===== 保存 ===== */
function saveFailed(err) {
  console.error(err);
  toast('保存できませんでした。ブラウザの空き容量を確認してください。');
}
const put = (store, v) => DB.put(store, v).catch(saveFailed);
function touch(obj, store) { obj.updated = Date.now(); return put(store, obj); }

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
  const img = el('img', { alt: '', decoding: 'async', draggable: 'false', ...attrs });
  imageURL(id).then((u) => { if (u) img.src = u; });
  return img;
}
async function storeImage(f) {
  const id = uid();
  await DB.put('images', { id, blob: f, name: f.name || 'image', type: f.type, created: Date.now() });
  return id;
}
async function imageSize(blob) {
  try { const bmp = await createImageBitmap(blob); const s = { w: bmp.width, h: bmp.height }; bmp.close?.(); return s; } catch { return { w: 400, h: 300 }; }
}
function imageFilesFrom(dt) { return dt ? [...(dt.files || [])].filter((f) => f.type.startsWith('image/')) : []; }

/* ===== 画面の切り替え（URL の # で場所を表す） ===== */
function parseRoute() {
  const p = location.hash.replace(/^#\/?/, '').split('/').map((s) => decodeURIComponent(s));
  if (p[0] === 'b' && p[1]) return { name: 'box', boxId: p[1], folderId: p[2] || 'all' };
  if (p[0] === 'f' && p[1]) return { name: 'file', fileId: p[1] };
  return { name: 'home' };
}
function go(hash) {
  if (location.hash === hash) { S.route = parseRoute(); render(); } else location.hash = hash;
}
const boxHash = (boxId, folderId = 'all') => `#/b/${boxId}` + (folderId && folderId !== 'all' ? '/' + folderId : '');

/* ===== サイドバー ===== */
function renderNav() {
  const nav = $('#sidebar');
  nav.replaceChildren();
  const r = S.route;
  const curBox = r.name === 'box' ? r.boxId : r.name === 'file' ? fileById(r.fileId)?.boxId : null;
  nav.append(el('div', { class: 'nav-head', text: 'ボックス' }));
  for (const b of [...S.boxes].sort((a, c) => a.created - c.created)) {
    const c = S.files.filter((f) => f.boxId === b.id).length;
    nav.append(el('button', {
      class: 'nav-item' + (curBox === b.id && !S.query ? ' active' : ''), type: 'button', title: boxName(b),
      onclick: () => { closeNav(); clearSearch(); go(boxHash(b.id)); },
    }, icon('box'), el('span', { class: 'nav-label', text: boxName(b) }), c ? el('span', { class: 'nav-count', text: c }) : null));
  }
  nav.append(el('button', { class: 'nav-item add', type: 'button', title: '新しいボックス', onclick: () => { closeNav(); createBox(); } },
    icon('plus'), el('span', { class: 'nav-label', text: '新しいボックス' })));
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

/* ===== 縮小表示（ページを入れ物の幅に合わせる） ===== */
const fitRO = new ResizeObserver((entries) => { for (const e of entries) fitStage(e.target); });
function fitStage(box) {
  const st = box.querySelector(':scope > .stage');
  if (!st) return;
  const s = (box.clientWidth || PAGE_W) / PAGE_W;
  st.style.transform = `scale(${s})`;
  st.style.setProperty('--inv', String(1 / s));
}

/* ===== メイン ===== */
function render() {
  closePopover();
  const r = S.route;
  const q = S.query.trim();
  if (ED && (r.name !== 'file' || r.fileId !== ED.file.id || q)) closeEditor();
  document.body.classList.toggle('editing', r.name === 'file' && !q);
  renderNav();
  if (ED) return;                       // 開いているエディターはそのまま
  fitRO.disconnect();
  const main = $('#main');
  main.replaceChildren();
  if (q) return renderSearch(main, q);
  if (r.name === 'file') {
    const f = fileById(r.fileId);
    if (f) return openEditor(f);
    return goHome(true);
  }
  if (r.name === 'box') {
    const b = boxById(r.boxId);
    if (!b) return goHome(true);
    if (r.folderId !== 'all' && folderById(r.folderId)?.boxId !== b.id) { history.replaceState(null, '', boxHash(b.id)); r.folderId = 'all'; }
    setPref('lastBox', b.id);
    S.lastBoxHash = boxHash(b.id, r.folderId);
    return renderBox(main, b, r.folderId);
  }
  goHome(false);
}
function goHome(replace) {
  const last = boxById(pref('lastBox', '')) || [...S.boxes].sort((a, b) => a.created - b.created)[0];
  if (last) {
    history.replaceState(null, '', boxHash(last.id));
    S.route = parseRoute();
    return render();
  }
  if (replace) history.replaceState(null, '', '#/');
  S.route = { name: 'home' };
  document.body.classList.remove('editing');
  renderNav();
  $('#main').replaceChildren(el('div', { class: 'empty-state' }, icon('box'),
    el('p', { text: 'ボックスを作ってメモを整理しましょう' }),
    el('p', { class: 'hint', text: 'ボックスの中にフォルダ、フォルダの中にメモファイルを作れます。' }),
    el('button', { class: 'btn primary', type: 'button', onclick: createBox }, icon('plus'), '新しいボックスを作る')));
}

/* --- ボックスの画面 --- */
function renderBox(main, box, folderId) {
  const folders = foldersOf(box.id);
  const all = filesOf(box.id);
  main.append(el('h1', { class: 'view-title' }, icon('box'), boxName(box),
    el('span', { class: 'sub', text: `フォルダ ${folders.length} · メモファイル ${all.length}` }),
    iconBtn('more', 'ボックスのメニュー', (e) => { e.stopPropagation(); boxMenu(e.currentTarget, box); }, 'sm')));

  const folderBtn = (id, name, count, ic) => el('button', {
    class: 'folder-item' + (folderId === id ? ' active' : ''), type: 'button', title: name,
    onclick: () => go(boxHash(box.id, id)),
  }, icon(ic), el('span', { class: 'folder-name', text: name }), el('span', { class: 'count', text: count }));

  const side = el('aside', { class: 'folders', 'aria-label': 'フォルダ' },
    folderBtn('all', 'すべてのフォルダ', all.length, 'folders'),
    folders.map((f) => folderBtn(f.id, f.name, all.filter((x) => x.folderId === f.id).length, 'folder')),
    el('button', { class: 'folder-item add', type: 'button', onclick: () => createFolder(box) }, icon('plus'), el('span', { text: '新しいフォルダ' })));

  const folder = folderId === 'all' ? null : folderById(folderId);
  const list = filesOf(box.id, folderId);
  const head = el('div', { class: 'files-head' },
    el('h2', {}, icon(folder ? 'folder' : 'folders'), folder ? folder.name : 'すべてのフォルダ'),
    folder ? iconBtn('more', 'フォルダのメニュー', (e) => { e.stopPropagation(); folderMenu(e.currentTarget, folder); }, 'sm') : null,
    el('span', { class: 'spacer' }),
    el('button', { class: 'btn primary', type: 'button', onclick: () => createFile(box, folderId) }, icon('plus'), '新しいメモファイル'));

  let body;
  if (list.length) body = el('div', { class: 'file-grid' }, list.map((f) => fileCard(f, !folder)));
  else if (!folders.length) body = el('div', { class: 'empty-state small' }, icon('folder'), el('p', { text: 'まだフォルダがありません' }),
    el('button', { class: 'btn', type: 'button', onclick: () => createFolder(box) }, icon('plus'), 'フォルダを作る'));
  else body = el('div', { class: 'empty-state small' }, icon('file'), el('p', { text: 'メモファイルはまだありません' }));

  main.append(el('div', { class: 'box-layout' }, side, el('section', { class: 'files' }, head, body)));
}

/* --- 検索結果 --- */
function fileText(f) { return f.pages.flatMap((p) => p.items.map((i) => i.text || '')).join('\n'); }
function renderSearch(main, q) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const list = S.files.filter((f) => {
    const hay = [f.name, fileText(f), folderById(f.folderId)?.name, boxName(boxById(f.boxId))].join('\n').toLowerCase();
    return words.every((w) => hay.includes(w));
  }).sort((a, b) => b.updated - a.updated);
  main.append(el('h1', { class: 'view-title' }, '検索結果', el('span', { class: 'sub', text: list.length + '件' })));
  main.append(list.length ? el('div', { class: 'file-grid wide' }, list.map((f) => fileCard(f, true, true)))
    : el('div', { class: 'empty-state' }, icon('search'), el('p', { text: '見つかりませんでした' })));
}

/* --- メモファイルのカード --- */
function fileCard(f, showFolder, showBox) {
  const thumb = el('div', { class: 'thumb' }, buildStage(f.pages[0] || newPage(), false));
  fitRO.observe(thumb);
  const where = [showBox ? boxName(boxById(f.boxId)) : null, showFolder ? folderById(f.folderId)?.name : null].filter(Boolean).join(' › ');
  const open = () => { clearSearch(); go('#/f/' + f.id); };
  return el('div', { class: 'file-card', tabindex: 0, role: 'link', 'aria-label': f.name, onclick: open, onkeydown: (e) => { if (e.key === 'Enter') open(); } },
    thumb,
    el('div', { class: 'file-info' },
      el('div', { class: 'file-name', text: f.name || '無題のメモ' }),
      el('div', { class: 'file-meta', text: `${f.pages.length}ページ · ${fmtDate(f.updated)}` }),
      where ? el('div', { class: 'file-path' }, icon('folder'), el('span', { text: where })) : null),
    iconBtn('more', 'メモファイルのメニュー', (e) => { e.stopPropagation(); fileMenu(e.currentTarget, f); }, 'sm file-more'));
}

/* ===== ボックス・フォルダ・メモファイルの操作 ===== */
async function createBox() {
  const v = await dialog({ title: '新しいボックス', note: '「〇〇ボックス」の〇〇の部分を自由に決められます。', fields: [{ key: 'name', label: '名前', placeholder: '例: 仕事', suffix: 'ボックス', maxlength: 40 }], ok: '作成' });
  if (!v) return;
  const name = cleanBoxName(v.name);
  if (!name) { toast('名前を入れてください'); return; }
  const t = Date.now();
  const b = { id: uid(), name, created: t, updated: t };
  S.boxes.push(b); await put('boxes', b);
  go(boxHash(b.id));
  toast(`${boxName(b)}を作りました`);
}
async function renameBox(b) {
  const v = await dialog({ title: 'ボックスの名前を変更', fields: [{ key: 'name', label: '名前', value: b.name, suffix: 'ボックス', maxlength: 40 }], ok: '変更' });
  if (!v) return;
  const name = cleanBoxName(v.name);
  if (!name) { toast('名前を入れてください'); return; }
  b.name = name; await touch(b, 'boxes'); render();
}
async function deleteBox(b) {
  const folders = S.folders.filter((f) => f.boxId === b.id), files = S.files.filter((f) => f.boxId === b.id);
  if (!confirm(`${boxName(b)}を削除します。\n中のフォルダ ${folders.length} 個・メモファイル ${files.length} 個も一緒に消えます。`)) return;
  S.boxes = S.boxes.filter((x) => x !== b);
  S.folders = S.folders.filter((x) => !folders.includes(x));
  S.files = S.files.filter((x) => !files.includes(x));
  if (pref('lastBox', '') === b.id) setPref('lastBox', '');
  await Promise.all([DB.del('boxes', b.id), DB.delMany('folders', folders.map((x) => x.id)), DB.delMany('files', files.map((x) => x.id))]).catch(saveFailed);
  go('#/');
  toast(`${boxName(b)}を削除しました`, '元に戻す', async () => {
    S.boxes.push(b); S.folders.push(...folders); S.files.push(...files);
    await Promise.all([put('boxes', b), DB.putMany('folders', folders), DB.putMany('files', files)]).catch(saveFailed);
    go(boxHash(b.id));
  });
}
function boxMenu(anchor, b) {
  menu(anchor, [['edit', '名前を変更', () => renameBox(b)], ['trash', 'ボックスを削除', () => deleteBox(b), true]]);
}

async function createFolder(box) {
  const v = await dialog({ title: '新しいフォルダ', note: `${boxName(box)}の中に作ります。`, fields: [{ key: 'name', label: 'フォルダ名', placeholder: '例: アイデア', maxlength: 60 }], ok: '作成' });
  if (!v) return;
  const name = v.name.trim();
  if (!name) { toast('名前を入れてください'); return; }
  const f = makeFolder(box, name);
  go(boxHash(box.id, f.id));
}
function makeFolder(box, name) {
  const t = Date.now();
  const f = { id: uid(), boxId: box.id, name, created: t, updated: t };
  S.folders.push(f); put('folders', f);
  return f;
}
async function renameFolder(f) {
  const v = await dialog({ title: 'フォルダの名前を変更', fields: [{ key: 'name', label: 'フォルダ名', value: f.name, maxlength: 60 }], ok: '変更' });
  if (!v || !v.name.trim()) return;
  f.name = v.name.trim(); await touch(f, 'folders'); render();
}
async function deleteFolder(f) {
  const files = S.files.filter((x) => x.folderId === f.id);
  if (files.length && !confirm(`フォルダ「${f.name}」を削除します。\n中のメモファイル ${files.length} 個も一緒に消えます。`)) return;
  S.folders = S.folders.filter((x) => x !== f);
  S.files = S.files.filter((x) => !files.includes(x));
  await Promise.all([DB.del('folders', f.id), DB.delMany('files', files.map((x) => x.id))]).catch(saveFailed);
  go(boxHash(f.boxId));
  toast(`フォルダ「${f.name}」を削除しました`, '元に戻す', async () => {
    S.folders.push(f); S.files.push(...files);
    await Promise.all([put('folders', f), DB.putMany('files', files)]).catch(saveFailed);
    go(boxHash(f.boxId, f.id));
  });
}
function folderMenu(anchor, f) {
  menu(anchor, [['edit', '名前を変更', () => renameFolder(f)], ['trash', 'フォルダを削除', () => deleteFolder(f), true]]);
}

async function createFile(box, folderId) {
  let folders = foldersOf(box.id);
  const fields = [{ key: 'name', label: 'メモファイルの名前', placeholder: '無題のメモ', maxlength: 80 }];
  if (folderId === 'all') {
    if (!folders.length) { makeFolder(box, 'メモ'); folders = foldersOf(box.id); toast('フォルダ「メモ」を作りました'); }
    fields.push({ key: 'folder', type: 'select', label: '入れるフォルダ', value: folders[0].id, options: folders.map((f) => [f.id, f.name]) });
  }
  const v = await dialog({ title: '新しいメモファイル', fields, ok: '作成' });
  if (!v) { if (folderId === 'all') render(); return; }
  const t = Date.now();
  const f = { id: uid(), boxId: box.id, folderId: v.folder || folderId, name: v.name.trim() || '無題のメモ', pages: [newPage()], created: t, updated: t };
  S.files.push(f); await put('files', f);
  go('#/f/' + f.id);
}
async function renameFile(f) {
  const v = await dialog({ title: 'メモファイルの名前を変更', fields: [{ key: 'name', label: '名前', value: f.name, maxlength: 80 }], ok: '変更' });
  if (!v) return;
  f.name = v.name.trim() || '無題のメモ'; await touch(f, 'files');
  if (ED?.file === f) $('.ed-name').value = f.name; else render();
}
async function moveFile(f) {
  const opts = [];
  for (const b of [...S.boxes].sort((a, c) => a.created - c.created)) for (const fo of foldersOf(b.id)) opts.push([fo.id, `${boxName(b)} › ${fo.name}`]);
  const v = await dialog({ title: `「${f.name}」を移動`, fields: [{ key: 'folder', type: 'select', label: '移動先のフォルダ', value: f.folderId, options: opts }], ok: '移動' });
  if (!v || v.folder === f.folderId) return;
  const fo = folderById(v.folder);
  f.folderId = fo.id; f.boxId = fo.boxId; await touch(f, 'files');
  if (ED?.file === f) {
    ED.back = boxHash(fo.boxId, fo.id);
    $('.ed-where').replaceChildren(icon('box'), boxName(boxById(fo.boxId)), ' › ', fo.name);
    renderNav();
  } else render();
  toast(`「${fo.name}」へ移動しました`);
}
function cloneFile(f) {
  const t = Date.now();
  const pages = JSON.parse(JSON.stringify(f.pages)).map((p) => ({ ...p, id: uid(), items: p.items.map((i) => ({ ...i, id: uid() })), strokes: p.strokes.map((s) => ({ ...s, id: uid() })) }));
  const c = { ...f, id: uid(), name: f.name + ' のコピー', pages, created: t, updated: t };
  S.files.push(c); put('files', c);
  if (!ED) render();
  toast('コピーを作りました', '開く', () => go('#/f/' + c.id));
}
async function deleteFile(f) {
  S.files = S.files.filter((x) => x !== f);
  if (ED?.file === f) { clearTimeout(ED.saveT); ED.saveT = null; clearTimeout(ED.commitT); ED.commitT = null; }
  await DB.del('files', f.id).catch(saveFailed);
  if (S.route.name === 'file' && S.route.fileId === f.id) { ED = null; go(boxHash(f.boxId, f.folderId)); } else render();
  toast(`「${f.name}」を削除しました`, '元に戻す', async () => { S.files.push(f); await put('files', f); render(); });
}
function fileMenu(anchor, f) {
  menu(anchor, [
    ['edit', '名前を変更', () => renameFile(f)],
    ['moveTo', '別のフォルダへ移動', () => moveFile(f)],
    ['copy', 'コピーを作る', () => cloneFile(f)],
    ['trash', '削除', () => deleteFile(f), true],
  ]);
}

/* ===== ページの描画（エディターとカードの縮小表示で共通） ===== */
function strokeD(p) {
  if (!p.length) return '';
  if (p.length === 1) return `M${p[0][0]} ${p[0][1]}l0.01 0`;
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 1; i < p.length - 1; i++) d += `Q${p[i][0]} ${p[i][1]} ${r1((p[i][0] + p[i + 1][0]) / 2)} ${r1((p[i][1] + p[i + 1][1]) / 2)}`;
  const l = p[p.length - 1];
  return d + `L${l[0]} ${l[1]}`;
}
function strokeEl(s) {
  return svgEl('path', {
    d: strokeD(s.pts), fill: 'none', stroke: s.color, 'stroke-width': s.width, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
    class: s.kind === 'marker' ? 'mark' : null, 'data-id': s.id,
  });
}
function placeItem(d, it) {
  d.style.left = it.x + 'px';
  d.style.top = it.y + 'px';
  d.style.width = it.w + 'px';
  if (it.type !== 'text') d.style.height = it.h + 'px';
}
function itemEl(it, edit) {
  const d = el('div', { class: `item item-${it.type}`, dataset: { id: it.id } });
  if (it.type === 'sticky') d.dataset.color = it.color;
  if (it.type === 'text') d.style.color = it.color;
  if (it.type !== 'image') d.style.fontSize = it.size + 'px';
  placeItem(d, it);
  if (it.type === 'image') d.append(imgEl(it.imageId));
  else if (edit) {
    const ta = el('textarea', { value: it.text, readOnly: true, rows: 1, spellcheck: 'false', placeholder: it.type === 'sticky' ? '付箋' : 'テキストを入力', 'aria-label': it.type === 'sticky' ? '付箋' : 'テキストボックス' });
    d.append(ta);
  } else d.append(el('div', { class: 'txt', text: it.text }));
  if (edit) d.append(el('div', { class: 'h-move', title: '移動' }, icon('move4')), el('div', { class: 'h-resize', title: '大きさを変える' }));
  return d;
}
function buildStage(page, edit) {
  const stage = el('div', { class: 'stage bg-' + page.bg, dataset: { page: page.id } });
  const items = el('div', { class: 'items' }, page.items.map((it) => itemEl(it, edit)));
  const ink = svgEl('svg', { class: 'ink', viewBox: `0 0 ${PAGE_W} ${PAGE_H}`, 'aria-hidden': 'true' });
  for (const s of page.strokes) ink.append(strokeEl(s));
  stage.append(items, ink);
  return stage;
}

/* ===== エディター ===== */
function openEditor(file) {
  ED = {
    file, tool: 'select', sel: null, editId: null,
    undo: [], redo: [], snap: JSON.stringify(file.pages), saveT: null, commitT: null,
    pen: { color: INK[0][0], width: PEN_W[1][0] }, marker: { color: MARK[0][0], width: MARK_W[1][0] },
    textSize: TEXT_SIZES[1][0], textColor: INK[0][0], stickyColor: STICKY[0][0],
    back: S.lastBoxHash && S.lastBoxHash.startsWith(boxHash(file.boxId)) ? S.lastBoxHash : boxHash(file.boxId, file.folderId),
  };
  const nameInput = el('input', { class: 'ed-name', value: file.name, maxlength: 80, 'aria-label': 'メモファイルの名前', placeholder: '無題のメモ' });
  nameInput.addEventListener('input', () => { file.name = nameInput.value; scheduleSave(); });
  nameInput.addEventListener('change', () => { if (!nameInput.value.trim()) { file.name = nameInput.value = '無題のメモ'; scheduleSave(); } });
  nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.isComposing) nameInput.blur(); });

  const where = el('div', { class: 'ed-where' }, icon('box'), boxName(boxById(file.boxId)), ' › ', folderById(file.folderId)?.name || '');
  ED.toolBtns = TOOLS.map(([key, ic, label, k]) => el('button', {
    class: 'tool', type: 'button', title: `${label}（${k}）`, 'aria-pressed': key === ED.tool ? 'true' : 'false', dataset: { tool: key },
    onclick: () => setTool(key),
  }, icon(ic), el('span', { text: label })));
  const imgBtn = el('button', { class: 'tool', type: 'button', title: '画像を追加', onclick: () => $('#imgFile').click() }, icon('image'), el('span', { text: '画像' }));
  ED.undoBtn = iconBtn('undo', '元に戻す（Ctrl+Z）', undo);
  ED.redoBtn = iconBtn('redo', 'やり直す（Ctrl+Y）', redo);
  ED.sub = el('div', { class: 'ed-sub' });
  ED.pagesBox = el('div', { class: 'pages' });
  ED.root = el('div', { class: 'ed tool-select' },
    el('div', { class: 'ed-top' },
      el('div', { class: 'ed-bar' },
        iconBtn('back', '戻る', () => go(ED.back)),
        el('div', { class: 'ed-title' }, nameInput, where),
        el('div', { class: 'ed-hist' }, ED.undoBtn, ED.redoBtn,
          iconBtn('more', 'その他', (e) => { e.stopPropagation(); editorMenu(e.currentTarget); })),
        el('div', { class: 'tools', role: 'toolbar', 'aria-label': 'ツール' }, ED.toolBtns, imgBtn)),
      ED.sub),
    ED.pagesBox);
  $('#main').replaceChildren(ED.root);
  bindEditor(ED.root);
  renderPages();
  renderSub();
  updateHist();
  window.scrollTo(0, 0);
}
function closeEditor() {
  if (!ED) return;
  document.activeElement?.blur?.();
  if (!ED) return;
  if (ED.commitT) commit();
  flushSave();
  ED = null;
  document.body.classList.remove('editing');
}
function scheduleSave() {
  if (!ED) return;
  clearTimeout(ED.saveT);
  const f = ED.file;
  ED.saveT = setTimeout(() => { if (ED) ED.saveT = null; touch(f, 'files'); }, 500);
}
function flushSave() {
  if (ED?.saveT) { clearTimeout(ED.saveT); ED.saveT = null; touch(ED.file, 'files'); }
}
/* 変更を確定して「元に戻す」の履歴に積む */
function commit() {
  if (!ED) return;
  clearTimeout(ED.commitT); ED.commitT = null;
  const now = JSON.stringify(ED.file.pages);
  if (now === ED.snap) { updateHist(); return; }
  ED.undo.push(ED.snap);
  if (ED.undo.length > 200) ED.undo.shift();
  ED.snap = now; ED.redo = [];
  scheduleSave(); updateHist();
}
function commitSoon() { clearTimeout(ED.commitT); ED.commitT = setTimeout(commit, 800); }
function restore(json) {
  ED.file.pages = JSON.parse(json);
  ED.snap = json; ED.sel = null; ED.editId = null;
  renderPages(); renderSub(); scheduleSave(); updateHist();
}
function undo() {
  if (!ED) return;
  if (ED.commitT) commit();
  if (!ED.undo.length) return;
  ED.redo.push(ED.snap); restore(ED.undo.pop());
}
function redo() {
  if (!ED || !ED.redo.length) return;
  ED.undo.push(ED.snap); restore(ED.redo.pop());
}
function updateHist() { if (!ED) return; ED.undoBtn.disabled = !ED.undo.length && !ED.commitT; ED.redoBtn.disabled = !ED.redo.length; }

function pageById(id) { return ED.file.pages.find((p) => p.id === id); }
function stageOf(pageId) { return ED.pagesBox.querySelector(`.stage[data-page="${pageId}"]`); }
function itemDiv(id) { return ED.pagesBox.querySelector(`.item[data-id="${id}"]`); }
function selected() {
  if (!ED?.sel) return null;
  const page = pageById(ED.sel.pageId);
  const it = page?.items.find((i) => i.id === ED.sel.itemId);
  return it ? { page, it } : null;
}

/* --- ページ一覧 --- */
function renderPages() {
  const pages = ED.file.pages;
  ED.editId = null;
  ED.pagesBox.replaceChildren();
  pages.forEach((p, i) => {
    const frame = el('div', { class: 'page' }, buildStage(p, true));
    const head = el('div', { class: 'page-head' },
      el('span', { class: 'page-no', text: `${i + 1} / ${pages.length}` }),
      el('span', { class: 'spacer' }),
      iconBtn('up', '前へ移動', () => movePage(i, -1), 'sm' + (i === 0 ? ' dim' : '')),
      iconBtn('down', '後ろへ移動', () => movePage(i, 1), 'sm' + (i === pages.length - 1 ? ' dim' : '')),
      iconBtn('pageBg', 'ページの背景', (e) => { e.stopPropagation(); bgMenu(e.currentTarget, p); }, 'sm'),
      iconBtn('copy', 'ページを複製', () => dupPage(i), 'sm'),
      iconBtn('addPage', 'この後にページを追加', () => addPage(i), 'sm'),
      iconBtn('trash', 'ページを削除', () => deletePage(i), 'sm'));
    ED.pagesBox.append(el('div', { class: 'page-wrap' }, head, frame));
    fitRO.observe(frame);
    fitStage(frame);
  });
  ED.pagesBox.append(el('button', { class: 'add-page', type: 'button', onclick: () => addPage(pages.length - 1) }, icon('addPage'), 'ページを追加'));
  requestAnimationFrame(() => ED?.pagesBox.querySelectorAll('.item-text textarea').forEach(autosizeText));
  markSel();
}
function renderPage(page) {
  const old = stageOf(page.id);
  if (!old) return renderPages();
  const st = buildStage(page, true);
  st.style.cssText = old.style.cssText;
  old.replaceWith(st);
  st.querySelectorAll('.item-text textarea').forEach(autosizeText);
  markSel();
}
function autosizeText(ta) { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; }
function addPage(i) {
  const bg = ED.file.pages[i]?.bg || 'lined';
  const p = newPage(bg);
  ED.file.pages.splice(i + 1, 0, p);
  commit(); renderPages();
  stageOf(p.id)?.closest('.page-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function dupPage(i) {
  const src = ED.file.pages[i];
  const p = JSON.parse(JSON.stringify(src));
  p.id = uid(); p.items.forEach((x) => { x.id = uid(); }); p.strokes.forEach((x) => { x.id = uid(); });
  ED.file.pages.splice(i + 1, 0, p);
  commit(); renderPages();
  toast(`${i + 2}ページ目に複製しました`);
}
function movePage(i, d) {
  const pages = ED.file.pages, j = i + d;
  if (j < 0 || j >= pages.length) return;
  [pages[i], pages[j]] = [pages[j], pages[i]];
  commit(); renderPages();
}
function deletePage(i) {
  const pages = ED.file.pages;
  const p = pages[i];
  if (pages.length === 1) {
    if (!p.items.length && !p.strokes.length) return;
    if (!confirm('このページの中身をすべて消しますか？')) return;
    p.items = []; p.strokes = [];
  } else {
    pages.splice(i, 1);
  }
  commit(); renderPages();
  toast('ページを削除しました', '元に戻す', undo);
}
function bgMenu(anchor, p) {
  showPopover(anchor, [el('div', { class: 'pop-title', text: 'ページの背景' }), BGS.map(([k, label]) => el('button', {
    class: 'menu-item' + (p.bg === k ? ' checked' : ''), type: 'button',
    onclick: () => { closePopover(); p.bg = k; commit(); renderPage(p); },
  }, el('span', { class: 'bg-sample bg-' + k }), label)),
  el('div', { class: 'menu-sep' }),
  el('button', { class: 'menu-item', type: 'button', onclick: () => { closePopover(); ED.file.pages.forEach((x) => { x.bg = p.bg; }); commit(); renderPages(); } }, icon('pageBg'), 'すべてのページをこの背景にする')]);
}
function editorMenu(anchor) {
  const f = ED.file;
  menu(anchor, [
    ['addPage', 'ページを追加', () => addPage(f.pages.length - 1)],
    ['edit', '名前を変更', () => renameFile(f)],
    ['moveTo', '別のフォルダへ移動', () => moveFile(f)],
    ['copy', 'コピーを作る', () => cloneFile(f)],
    ['trash', 'このメモファイルを削除', () => deleteFile(f), true],
  ]);
}

/* --- ツール --- */
function setTool(t) {
  if (!ED) return;
  ED.tool = t;
  ED.toolBtns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.tool === t ? 'true' : 'false'));
  ED.root.className = 'ed tool-' + t;
  if (t !== 'select') {
    if (document.activeElement?.closest?.('.stage')) document.activeElement.blur();
    select(null);
  } else renderSub();
}
function swatches(list, cur, onPick, cls = 'dot-btn') {
  return el('div', { class: 'swatches' }, list.map(([v, label]) => el('button', {
    class: cls + (v === cur ? ' sel' : ''), type: 'button', title: label, 'aria-label': label, 'aria-pressed': v === cur ? 'true' : 'false',
    style: cls === 'dot-btn' ? `background:${v}` : null, dataset: cls === 'dot-btn' ? {} : { color: v },
    onclick: () => { onPick(v); renderSub(); },
  })));
}
function seg(list, cur, onPick) {
  return el('div', { class: 'seg' }, list.map(([v, label]) => el('button', {
    class: v === cur ? 'sel' : '', type: 'button', text: label, 'aria-pressed': v === cur ? 'true' : 'false',
    onclick: () => { onPick(v); renderSub(); },
  })));
}
function hint(t) { return el('span', { class: 'sub-hint', text: t }); }
function renderSub() {
  if (!ED) return;
  const s = ED.sub, t = ED.tool;
  s.replaceChildren();
  const sel = selected();
  if (t === 'pen' || t === 'marker') {
    const cfg = ED[t];
    s.append(el('span', { class: 'sub-label', text: t === 'pen' ? 'ペン' : 'マーカー' }),
      swatches(t === 'pen' ? INK : MARK, cfg.color, (v) => { cfg.color = v; }),
      seg(t === 'pen' ? PEN_W : MARK_W, cfg.width, (v) => { cfg.width = v; }),
      hint('ページの上をなぞって書き込めます'));
  } else if (t === 'eraser') {
    s.append(el('span', { class: 'sub-label', text: '消しゴム' }), hint('なぞった線を消します'),
      el('button', { class: 'btn small', type: 'button', text: '見えているページの書き込みを全部消す', onclick: () => {
        const p = currentPage().page;
        if (!p.strokes.length) return;
        p.strokes = []; commit(); renderPage(p); toast('書き込みを消しました', '元に戻す', undo);
      } }));
  } else if (t === 'text') {
    s.append(el('span', { class: 'sub-label', text: 'テキストボックス' }),
      seg(TEXT_SIZES, ED.textSize, (v) => { ED.textSize = v; }), swatches(INK, ED.textColor, (v) => { ED.textColor = v; }),
      hint('置きたい場所をクリック'));
  } else if (t === 'sticky') {
    s.append(el('span', { class: 'sub-label', text: '付箋' }), swatches(STICKY, ED.stickyColor, (v) => { ED.stickyColor = v; }, 'sticky-btn'),
      hint('貼りたい場所をクリック'));
  } else if (sel) {
    const { page, it } = sel;
    const label = { text: 'テキストボックス', sticky: '付箋', image: '画像' }[it.type];
    const restyle = (fn) => (v) => { fn(v); commit(); renderPage(page); };
    s.append(el('span', { class: 'sub-label', text: label }));
    if (it.type === 'text') s.append(seg(TEXT_SIZES, it.size, restyle((v) => { it.size = v; ED.textSize = v; })), swatches(INK, it.color, restyle((v) => { it.color = v; ED.textColor = v; })));
    if (it.type === 'sticky') s.append(swatches(STICKY, it.color, restyle((v) => { it.color = v; ED.stickyColor = v; }), 'sticky-btn'),
      seg(TEXT_SIZES.slice(0, 3), it.size, restyle((v) => { it.size = v; })));
    s.append(el('span', { class: 'spacer' }),
      iconBtn('front', '前面へ', () => { page.items = page.items.filter((x) => x !== it).concat(it); commit(); renderPage(page); }, 'sm'),
      iconBtn('back2', '背面へ', () => { page.items = [it, ...page.items.filter((x) => x !== it)]; commit(); renderPage(page); }, 'sm'),
      iconBtn('copy', '複製', () => duplicateItem(page, it), 'sm'),
      iconBtn('trash', '削除（Delete）', () => deleteSelected(), 'sm'));
  } else {
    s.append(hint('ツールを選んでページに書き込みます。ダブルクリックでテキストボックス、画像は貼り付け（Ctrl+V）やドラッグでも追加できます。'));
  }
}

/* --- 選択 --- */
function select(pageId, itemId) {
  if (!ED) return;
  ED.sel = pageId ? { pageId, itemId } : null;
  markSel(); renderSub();
}
function markSel() {
  ED.pagesBox.querySelectorAll('.item.selected').forEach((d) => d.classList.remove('selected'));
  if (ED.sel) itemDiv(ED.sel.itemId)?.classList.add('selected');
}
function deleteSelected() {
  const s = selected();
  if (!s) return;
  s.page.items = s.page.items.filter((x) => x !== s.it);
  ED.editId = null;
  itemDiv(s.it.id)?.remove();
  select(null); commit();
}
function duplicateItem(page, it) {
  const c = { ...it, id: uid(), x: clamp(it.x + 28, 0, PAGE_W - 40), y: clamp(it.y + 28, 0, PAGE_H - 40) };
  page.items.push(c);
  commit(); renderPage(page); select(page.id, c.id);
}
function startEditing(page, it) {
  if (!ED) return;
  const d = itemDiv(it.id);
  const ta = d?.querySelector('textarea');
  if (!ta) return;
  ED.editId = it.id;
  d.classList.add('editing');
  ta.readOnly = false;
  ta.focus({ preventScroll: true });
  const n = ta.value.length; ta.setSelectionRange(n, n);
}
function stopEditing(page, it, d, ta) {
  if (!ED || ED.editId !== it.id) return;
  ED.editId = null;
  d.classList.remove('editing');
  ta.readOnly = true;
  if (it.type === 'text' && !it.text.trim() && page.items.includes(it)) {
    page.items = page.items.filter((x) => x !== it);
    d.remove();
    if (ED.sel?.itemId === it.id) select(null);
  }
  commit();
}

/* --- ページ上の操作 --- */
function toLocal(e, stage) {
  const r = stage.getBoundingClientRect();
  const s = r.width / PAGE_W;
  return { x: (e.clientX - r.left) / s, y: (e.clientY - r.top) / s, s };
}
function track(e, onMove, onUp) {
  const t = e.currentTarget, id = e.pointerId;
  try { t.setPointerCapture(id); } catch { /* 取れなくても動く */ }
  const mv = (ev) => { if (ev.pointerId === id) onMove(ev); };
  const up = (ev) => {
    if (ev.pointerId !== id) return;
    t.removeEventListener('pointermove', mv); t.removeEventListener('pointerup', up); t.removeEventListener('pointercancel', up);
    onUp(ev);
  };
  t.addEventListener('pointermove', mv); t.addEventListener('pointerup', up); t.addEventListener('pointercancel', up);
}
function bindEditor(root) {
  root.addEventListener('pointerdown', (e) => {
    const stage = e.target.closest('.stage');
    if (!stage || (e.button !== 0 && e.pointerType === 'mouse')) return;
    onStageDown(e, stage);
  });
  root.addEventListener('dblclick', (e) => {
    const stage = e.target.closest('.stage');
    if (!stage || ED.tool !== 'select' || e.target.closest('.item')) return;
    createItem(pageById(stage.dataset.page), 'text', toLocal(e, stage));
  });
  root.addEventListener('input', (e) => {
    const ta = e.target;
    if (ta.tagName !== 'TEXTAREA') return;
    const d = ta.closest('.item'), stage = ta.closest('.stage');
    const it = pageById(stage.dataset.page)?.items.find((x) => x.id === d.dataset.id);
    if (!it) return;
    it.text = ta.value;
    if (it.type === 'text') autosizeText(ta);
    scheduleSave(); commitSoon(); updateHist();
  });
  root.addEventListener('focusout', (e) => {
    const ta = e.target;
    if (ta.tagName !== 'TEXTAREA') return;
    const d = ta.closest('.item'), stage = ta.closest('.stage');
    const page = stage && pageById(stage.dataset.page);
    const it = page?.items.find((x) => x.id === d.dataset.id);
    if (it) stopEditing(page, it, d, ta);
  });
  root.addEventListener('drop', (e) => {
    const files = imageFilesFrom(e.dataTransfer);
    if (!files.length) return;
    e.preventDefault(); e.stopPropagation(); hideDropHint();
    const stage = e.target.closest('.stage');
    if (stage) addImages(files, pageById(stage.dataset.page), toLocal(e, stage));
    else addImages(files);
  });
}
function onStageDown(e, stage) {
  const page = pageById(stage.dataset.page);
  if (!page) return;
  const tool = ED.tool;
  const pt = toLocal(e, stage);
  if (tool === 'pen' || tool === 'marker') { e.preventDefault(); return drawStroke(e, stage, page, pt); }
  if (tool === 'eraser') { e.preventDefault(); return erase(e, stage, page, pt); }
  const d = e.target.closest('.item');
  if (d) return onItemDown(e, stage, page, d, pt);
  if (document.activeElement?.closest?.('.stage')) document.activeElement.blur();
  if (tool === 'text' || tool === 'sticky') { e.preventDefault(); createItem(page, tool, pt); setTool('select'); return; }
  select(null);
}
function createItem(page, type, pt) {
  let it;
  if (type === 'text') {
    const x = clamp(pt.x - 8, 0, PAGE_W - 120);
    it = { id: uid(), type: 'text', x: Math.round(x), y: Math.round(clamp(pt.y - ED.textSize * 0.9, 0, PAGE_H - 60)), w: Math.round(Math.min(420, PAGE_W - x)), text: '', size: ED.textSize, color: ED.textColor };
  } else {
    it = { id: uid(), type: 'sticky', x: Math.round(clamp(pt.x - 120, 0, PAGE_W - 240)), y: Math.round(clamp(pt.y - 20, 0, PAGE_H - 220)), w: 240, h: 220, text: '', size: 24, color: ED.stickyColor };
  }
  page.items.push(it);
  renderPage(page);
  select(page.id, it.id);
  if (type === 'sticky') commit();
  startEditing(page, it);
}
function onItemDown(e, stage, page, d, pt) {
  const it = page.items.find((x) => x.id === d.dataset.id);
  if (!it) return;
  const handle = e.target.closest('.h-resize') ? 'resize' : e.target.closest('.h-move') ? 'move' : null;
  if (!handle && ED.editId === it.id && e.target.tagName === 'TEXTAREA') return;   // 入力中の文字の操作はそのまま
  e.preventDefault();
  if (ED.editId && ED.editId !== it.id) document.activeElement?.blur();
  if (ED.sel?.itemId !== it.id) select(page.id, it.id);
  const o = { x: it.x, y: it.y, w: it.w, h: it.h || d.offsetHeight };
  const ratio = it.type === 'image' ? it.h / it.w : 0;
  let moved = false;
  track(e, (ev) => {
    const p = toLocal(ev, stage);
    const dx = p.x - pt.x, dy = p.y - pt.y;
    if (!moved && Math.hypot(dx, dy) * p.s < 4) return;
    moved = true;
    if (handle === 'resize') {
      if (it.type === 'text') it.w = Math.round(clamp(o.w + dx, 80, PAGE_W * 1.5));
      else if (it.type === 'sticky') { it.w = Math.round(clamp(o.w + dx, 100, PAGE_W)); it.h = Math.round(clamp(o.h + dy, 80, PAGE_H)); }
      else { it.w = Math.round(clamp(o.w + dx, 30, PAGE_W * 1.5)); it.h = Math.round(it.w * ratio); }
      placeItem(d, it);
      if (it.type === 'text') autosizeText(d.querySelector('textarea'));
    } else {
      it.x = Math.round(clamp(o.x + dx, 40 - it.w, PAGE_W - 40));
      it.y = Math.round(clamp(o.y + dy, -20, PAGE_H - 40));
      placeItem(d, it);
    }
  }, () => {
    if (moved) { commit(); if (ED?.editId === it.id) d.querySelector('textarea')?.focus({ preventScroll: true }); }
    else if (!handle && it.type !== 'image' && ED?.editId !== it.id) startEditing(page, it);
  });
}
function drawStroke(e, stage, page, pt) {
  const cfg = ED[ED.tool];
  const s = { id: uid(), kind: ED.tool, color: cfg.color, width: cfg.width, pts: [[r1(pt.x), r1(pt.y)]] };
  const path = strokeEl(s);
  stage.querySelector('.ink').append(path);
  const add = (ev) => {
    const p = toLocal(ev, stage);
    const last = s.pts[s.pts.length - 1];
    if (Math.hypot(p.x - last[0], p.y - last[1]) < 1.2) return;
    s.pts.push([r1(p.x), r1(p.y)]);
  };
  track(e, (ev) => {
    (ev.getCoalescedEvents?.() || [ev]).forEach(add);
    path.setAttribute('d', strokeD(s.pts));
  }, () => {
    page.strokes.push(s);
    commit();
  });
}
function distSeg(px, py, a, b) {
  const vx = b[0] - a[0], vy = b[1] - a[1];
  const l = vx * vx + vy * vy;
  const t = l ? clamp(((px - a[0]) * vx + (py - a[1]) * vy) / l, 0, 1) : 0;
  return Math.hypot(px - (a[0] + t * vx), py - (a[1] + t * vy));
}
function erase(e, stage, page, pt) {
  let removed = false;
  const hit = (p) => {
    const before = page.strokes.length;
    page.strokes = page.strokes.filter((s) => {
      const r = s.width / 2 + 10;
      const pts = s.pts;
      const touched = pts.length === 1 ? Math.hypot(p.x - pts[0][0], p.y - pts[0][1]) < r : pts.some((q, i) => i > 0 && distSeg(p.x, p.y, pts[i - 1], q) < r);
      if (touched) stage.querySelector(`.ink [data-id="${s.id}"]`)?.remove();
      return !touched;
    });
    if (page.strokes.length !== before) removed = true;
  };
  hit(pt);
  track(e, (ev) => hit(toLocal(ev, stage)), () => { if (removed) commit(); });
}

/* --- 見えているページ --- */
function currentPage() {
  const top = ($('.ed-top')?.getBoundingClientRect().bottom) || 0;
  let best = null, bestV = -Infinity;
  for (const st of ED.pagesBox.querySelectorAll('.stage')) {
    const r = st.getBoundingClientRect();
    const v = Math.min(r.bottom, innerHeight) - Math.max(r.top, top);
    if (v > bestV) { bestV = v; best = { stage: st, rect: r }; }
  }
  const page = pageById(best.stage.dataset.page);
  const s = best.rect.width / PAGE_W;
  const vTop = Math.max(best.rect.top, top), vBot = Math.min(best.rect.bottom, innerHeight);
  return { page, cx: PAGE_W / 2, cy: clamp(((vTop + vBot) / 2 - best.rect.top) / s, 100, PAGE_H - 100) };
}
async function addImages(files, page, pt) {
  if (!ED) return;
  const cur = page ? { page, cx: pt.x, cy: pt.y } : currentPage();
  let last = null, n = 0;
  for (const f of files) {
    let id;
    try { id = await storeImage(f); } catch (err) { saveFailed(err); break; }
    const sz = await imageSize(f);
    let w = Math.min(520, sz.w), h = w * sz.h / sz.w;
    if (h > 680) { h = 680; w = h * sz.w / sz.h; }
    const it = { id: uid(), type: 'image', imageId: id, w: Math.round(w), h: Math.round(h), x: 0, y: 0 };
    it.x = Math.round(clamp(cur.cx - w / 2 + n * 24, 0, PAGE_W - 40));
    it.y = Math.round(clamp(cur.cy - h / 2 + n * 24, 0, PAGE_H - 40));
    cur.page.items.push(it); last = it; n++;
  }
  if (!last) { if (files.length) toast('画像ファイルを選んでください'); return; }
  if (!ED) return;
  setTool('select');
  renderPage(cur.page); select(cur.page.id, last.id);
  commit();
}
function addPastedText(text) {
  const { page, cx, cy } = currentPage();
  const it = { id: uid(), type: 'text', x: Math.round(cx - 250), y: Math.round(cy - 40), w: 500, text, size: ED.textSize, color: ED.textColor };
  page.items.push(it);
  commit(); renderPage(page); select(page.id, it.id);
}

/* ===== ポップオーバー・メニュー ===== */
let pop = null;
function closePopover() { if (pop) { pop.remove(); pop = null; } }
function showPopover(anchor, content) {
  closePopover();
  pop = el('div', { class: 'popover', role: 'dialog', onclick: (e) => e.stopPropagation() }, content);
  document.body.append(pop);
  const r = anchor.getBoundingClientRect();
  const w = pop.offsetWidth, h = pop.offsetHeight;
  const left = Math.min(r.left, window.innerWidth - w - 8);
  let top = r.bottom + 4;
  if (top + h > window.innerHeight - 8) top = Math.max(8, r.top - h - 4);
  pop.style.left = Math.max(8, left) + 'px';
  pop.style.top = top + 'px';
  return pop;
}
document.addEventListener('click', (e) => { if (pop && !pop.contains(e.target)) closePopover(); });
function menu(anchor, items) {
  showPopover(anchor, items.map(([ic, label, fn, danger]) => el('button', {
    class: 'menu-item' + (danger ? ' danger' : ''), type: 'button', onclick: () => { closePopover(); fn(); },
  }, icon(ic), label)));
}

/* ===== 入力ダイアログ ===== */
function dialog({ title, note, fields, ok = 'OK' }) {
  return new Promise((resolve) => {
    const inputs = {};
    const wrap = el('div', { class: 'modal-wrap', onmousedown: (e) => { if (e.target === wrap) done(null); } });
    const form = el('form', {
      class: 'modal dialog', role: 'dialog', 'aria-modal': 'true', 'aria-label': title,
      onsubmit: (e) => { e.preventDefault(); const v = {}; for (const [k, inp] of Object.entries(inputs)) v[k] = inp.value; done(v); },
    },
    el('h2', { text: title }),
    note ? el('p', { class: 'note', text: note }) : null,
    fields.map((f) => {
      const inp = f.type === 'select'
        ? el('select', { class: 'field-input' }, f.options.map(([v, l]) => el('option', { value: v, text: l, selected: v === f.value })))
        : el('input', { class: 'field-input', value: f.value || '', placeholder: f.placeholder || '', maxlength: f.maxlength || 80 });
      inputs[f.key] = inp;
      return el('label', { class: 'field' }, el('span', { class: 'field-label', text: f.label }),
        el('span', { class: 'field-row' }, inp, f.suffix ? el('span', { class: 'field-suffix', text: f.suffix }) : null));
    }),
    el('div', { class: 'dialog-foot' },
      el('button', { class: 'btn', type: 'button', text: 'キャンセル', onclick: () => done(null) }),
      el('button', { class: 'btn primary', type: 'submit', text: ok })));
    const esc = (e) => { if (e.key === 'Escape') { e.stopPropagation(); done(null); } };
    function done(v) { document.removeEventListener('keydown', esc, true); wrap.remove(); resolve(v); }
    document.addEventListener('keydown', esc, true);
    wrap.append(form); document.body.append(wrap);
    const first = Object.values(inputs)[0];
    first?.focus(); first?.select?.();
  });
}

/* ===== 旧形式（カード型メモ）からの引き継ぎ ===== */
async function notesToFiles(notes, box, folder) {
  const files = [];
  for (const n of notes) {
    if (n.trashed) continue;
    const t = n.updated || Date.now();
    const pages = [newPage()];
    let page = pages[0], y = 60;
    const lines = [n.body || '', ...(n.items || []).map((i) => (i.done ? '☑ ' : '☐ ') + i.text)].filter((s) => s !== '').join('\n');
    if (lines) {
      page.items.push({ id: uid(), type: 'text', x: 60, y, w: 780, text: lines, size: 24, color: INK[0][0] });
      y += Math.ceil(lines.split('\n').reduce((a, l) => a + Math.max(1, Math.ceil(l.length / 30)), 0) * 36 + 30);
    }
    for (const imgId of n.images || []) {
      const rec = await DB.get('images', imgId).catch(() => null);
      if (!rec) continue;
      const sz = await imageSize(rec.blob);
      let w = Math.min(600, sz.w), h = w * sz.h / sz.w;
      if (h > 900) { h = 900; w = h * sz.w / sz.h; }
      if (y + h > PAGE_H - 40) { page = newPage(); pages.push(page); y = 60; }
      page.items.push({ id: uid(), type: 'image', imageId: imgId, x: Math.round((PAGE_W - w) / 2), y: Math.round(y), w: Math.round(w), h: Math.round(h) });
      y += h + 30;
    }
    files.push({ id: uid(), boxId: box.id, folderId: folder.id, name: n.title?.trim() || (n.body || '').trim().split('\n')[0].slice(0, 30) || '無題のメモ', pages, created: n.created || t, updated: t });
  }
  return files;
}
async function migrateOldNotes() {
  const done = await DB.get('meta', 'migratedV2').catch(() => null);
  if (done) return;
  const notes = await DB.all('notes').catch(() => []);
  if (notes.some((n) => !n.trashed)) {
    const t = Date.now();
    const box = { id: uid(), name: 'マイ', created: t, updated: t };
    const folder = { id: uid(), boxId: box.id, name: '以前のメモ', created: t, updated: t };
    const files = await notesToFiles(notes, box, folder);
    await DB.put('boxes', box); await DB.put('folders', folder); await DB.putMany('files', files);
    S.boxes.push(box); S.folders.push(folder); S.files.push(...files);
    setTimeout(() => toast(`以前のメモ ${files.length} 件を「マイボックス › 以前のメモ」に移しました`), 300);
  }
  await DB.put('meta', { key: 'migratedV2', value: true });
}
/* どのメモファイルからも使われていない古い画像を片付ける */
async function cleanupImages() {
  const used = new Set();
  for (const f of S.files) for (const p of f.pages) for (const i of p.items) if (i.imageId) used.add(i.imageId);
  if (ED) for (const s of ED.undo.concat(ED.redo)) for (const m of s.matchAll(/"imageId":"([^"]+)"/g)) used.add(m[1]);
  for (const n of await DB.all('notes').catch(() => [])) (n.images || []).forEach((id) => used.add(id));
  const old = Date.now() - 2 * 864e5;
  const all = await DB.all('images').catch(() => []);
  const gone = all.filter((r) => !used.has(r.id) && (r.created || 0) < old).map((r) => r.id);
  if (gone.length) await DB.delMany('images', gone).catch(console.error);
}

/* ===== バックアップ ===== */
function blobToDataURL(blob) {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(r.error); r.readAsDataURL(blob); });
}
async function exportData() {
  closePopover();
  if (ED) { if (ED.commitT) commit(); flushSave(); }
  toast('バックアップを作成しています…');
  const used = new Set(S.files.flatMap((f) => f.pages.flatMap((p) => p.items.map((i) => i.imageId).filter(Boolean))));
  const images = [];
  for (const rec of await DB.all('images')) {
    if (!used.has(rec.id)) continue;
    images.push({ id: rec.id, name: rec.name, type: rec.type, created: rec.created, data: await blobToDataURL(rec.blob) });
  }
  const data = { app: 'my-notebook', version: 2, exportedAt: new Date().toISOString(), boxes: S.boxes, folders: S.folders, files: S.files, images };
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const a = el('a', { href: URL.createObjectURL(blob), download: `my-notebook-${new Date().toISOString().slice(0, 10)}.json` });
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  toast(`ボックス ${S.boxes.length}・メモファイル ${S.files.length}・画像 ${images.length} 枚を書き出しました`);
}
async function importData(file) {
  let data;
  try { data = JSON.parse(await file.text()); } catch { toast('読み込めないファイルです'); return; }
  if (data?.app !== 'my-notebook') { toast('My notebook のバックアップではありません'); return; }
  const isOld = Array.isArray(data.notes) && !Array.isArray(data.files);
  const msg = isOld ? `以前の形式のメモ ${data.notes.length} 件を、新しい「読み込みボックス」に読み込みます。` : `ボックス ${(data.boxes || []).length}・メモファイル ${(data.files || []).length} 個を読み込みます。同じものがある場合は上書きされます。`;
  if (!confirm(msg + '\nよろしいですか？')) return;
  try {
    const imgs = [];
    for (const im of data.images || []) {
      const blob = await (await fetch(im.data)).blob();
      imgs.push({ id: im.id, name: im.name, type: im.type, created: im.created || Date.now(), blob });
      const old = urlCache.get(im.id); if (old) { URL.revokeObjectURL(old); urlCache.delete(im.id); }
    }
    if (imgs.length) await DB.putMany('images', imgs);
    if (isOld) {
      const t = Date.now();
      const box = { id: uid(), name: '読み込み', created: t, updated: t };
      const folder = { id: uid(), boxId: box.id, name: 'メモ', created: t, updated: t };
      const files = await notesToFiles(data.notes, box, folder);
      await DB.put('boxes', box); await DB.put('folders', folder); await DB.putMany('files', files);
      S.boxes.push(box); S.folders.push(folder); S.files.push(...files);
      go(boxHash(box.id));
      toast(`メモ ${files.length} 件を読み込みました`);
      return;
    }
    const merge = (key, list) => { const ids = new Set(list.map((x) => x.id)); S[key] = S[key].filter((x) => !ids.has(x.id)).concat(list); };
    const boxes = (data.boxes || []).map(normBox), folders = (data.folders || []).map(normFolder), files = (data.files || []).map(normFile);
    await DB.putMany('boxes', boxes); await DB.putMany('folders', folders); await DB.putMany('files', files);
    if (ED && files.some((f) => f.id === ED.file.id)) { ED = null; }
    merge('boxes', boxes); merge('folders', folders); merge('files', files);
    render();
    toast(`メモファイル ${files.length} 個を読み込みました`);
  } catch (err) { saveFailed(err); }
}
function normBox(b) { const t = Date.now(); return { id: String(b.id || uid()), name: cleanBoxName(b.name) || '名前なし', created: b.created || t, updated: b.updated || t }; }
function normFolder(f) { const t = Date.now(); return { id: String(f.id || uid()), boxId: String(f.boxId), name: String(f.name || 'フォルダ'), created: f.created || t, updated: f.updated || t }; }
function normFile(f) {
  const t = Date.now();
  const pages = (Array.isArray(f.pages) && f.pages.length ? f.pages : [newPage()]).map((p) => ({
    id: String(p.id || uid()), bg: BGS.some(([k]) => k === p.bg) ? p.bg : 'plain',
    items: Array.isArray(p.items) ? p.items.filter((i) => ['text', 'sticky', 'image'].includes(i.type)) : [],
    strokes: Array.isArray(p.strokes) ? p.strokes.filter((s) => Array.isArray(s.pts)) : [],
  }));
  return { id: String(f.id || uid()), boxId: String(f.boxId), folderId: String(f.folderId), name: String(f.name || '無題のメモ'), pages, created: f.created || t, updated: f.updated || t };
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
function showDropHint() { if (!dropHint) { dropHint = el('div', { class: 'drop-hint', text: 'ここに画像をドロップしてページに貼る' }); document.body.append(dropHint); } }
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
function clearSearch() {
  if (!S.query) return;
  S.query = ''; $('#search').value = ''; $('#searchClear').hidden = true;
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
  $('#brand').addEventListener('click', (e) => { e.preventDefault(); clearSearch(); go('#/'); });
  $('#layoutBtn').addEventListener('click', () => { S.layout = S.layout === 'list' ? 'grid' : 'list'; setPref('layout', S.layout); applyLayout(); });
  $('#themeBtn').addEventListener('click', () => { S.theme = { auto: 'light', light: 'dark', dark: 'auto' }[S.theme]; setPref('theme', S.theme); applyTheme(); });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
  $('#moreBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    menu(e.currentTarget, [
      ['download', 'バックアップを書き出す', exportData],
      ['upload', 'バックアップから読み込む', () => $('#importFile').click()],
      ['box', '新しいボックス', createBox],
    ]);
    const r = e.currentTarget.getBoundingClientRect();
    pop.style.left = Math.max(8, r.right - pop.offsetWidth) + 'px';
  });
  $('#importFile').addEventListener('change', (e) => { const f = e.target.files[0]; e.target.value = ''; if (f) importData(f); });
  $('#imgFile').addEventListener('change', (e) => { const fs = [...e.target.files]; e.target.value = ''; if (fs.length) addImages(fs); });

  const search = $('#search');
  search.addEventListener('input', () => { S.query = search.value; $('#searchClear').hidden = !search.value; render(); });
  search.addEventListener('keydown', (e) => { if (e.key === 'Escape') { clearSearch(); render(); search.blur(); } });
  $('#searchClear').addEventListener('click', () => { clearSearch(); render(); search.focus(); });

  document.addEventListener('keydown', (e) => {
    if (document.querySelector('.modal-wrap')) return;
    if (e.key === 'Escape') {
      if (pop) { closePopover(); return; }
      if (ED) {
        if (ED.editId) { document.activeElement?.blur(); return; }
        if (ED.sel) { select(null); return; }
        if (ED.tool !== 'select') { setTool('select'); return; }
      }
      closeNav();
      return;
    }
    if (ED && (e.ctrlKey || e.metaKey) && !isTyping()) {
      const k = e.key.toLowerCase();
      if (k === 'z' && !e.shiftKey) { e.preventDefault(); undo(); return; }
      if (k === 'y' || (k === 'z' && e.shiftKey)) { e.preventDefault(); redo(); return; }
    }
    if (isTyping() || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === '/') { e.preventDefault(); search.focus(); return; }
    if (!ED) return;
    if ((e.key === 'Delete' || e.key === 'Backspace') && ED.sel) { e.preventDefault(); deleteSelected(); return; }
    const t = TOOLS.find(([, , , k]) => k === e.key.toUpperCase());
    if (t) { e.preventDefault(); setTool(t[0]); }
  });

  // 貼り付け: 画像はページに、文字は（入力中でなければ）テキストボックスとして置く
  document.addEventListener('paste', (e) => {
    if (!ED || document.querySelector('.modal-wrap')) return;
    const files = [...(e.clipboardData?.items || [])].filter((i) => i.kind === 'file' && i.type.startsWith('image/')).map((i) => i.getAsFile()).filter(Boolean);
    if (files.length) { e.preventDefault(); addImages(files); return; }
    if (isTyping()) return;
    const text = e.clipboardData?.getData('text/plain');
    if (text) { e.preventDefault(); addPastedText(text); }
  });

  // 画像のドラッグ＆ドロップ（エディターの上）
  const hasFiles = (e) => [...(e.dataTransfer?.types || [])].includes('Files');
  document.addEventListener('dragenter', (e) => { if (!hasFiles(e) || !ED) return; dragDepth++; showDropHint(); });
  document.addEventListener('dragleave', () => { if (dropHint && --dragDepth <= 0) hideDropHint(); });
  document.addEventListener('dragover', (e) => { if (hasFiles(e)) e.preventDefault(); });
  document.addEventListener('drop', (e) => {
    if (!hasFiles(e)) return;
    e.preventDefault(); hideDropHint();
    if (ED) addImages(imageFilesFrom(e.dataTransfer));
  });

  window.addEventListener('hashchange', () => { S.route = parseRoute(); render(); });
  window.addEventListener('resize', () => { if (!isNarrow()) closeNav(); });
  window.addEventListener('beforeunload', () => { if (ED) { if (ED.commitT) commit(); flushSave(); } });
  document.addEventListener('visibilitychange', () => { if (document.hidden && ED) flushSave(); });

  try {
    const [boxes, folders, files] = await Promise.all([DB.all('boxes'), DB.all('folders'), DB.all('files')]);
    S.boxes = boxes; S.folders = folders; S.files = files.map(normFile);
    await migrateOldNotes();
    navigator.storage?.persist?.().catch(() => {});
    setTimeout(cleanupImages, 5000);
  } catch (err) {
    console.error(err);
    toast('このブラウザではメモを保存できません（プライベートブラウズでは保存されないことがあります）');
  }
  S.route = parseRoute();
  render();
}

init();
