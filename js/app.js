/* My notebook — ボックス › フォルダ › メモファイル › ページ の形でメモを整理するノート。
   ページにはテキストボックス・付箋・画像・機能アイテム（メモへ移動ボタン・チェックボックス・プルダウン）を置けて、
   ペンやマーカーで書き込める。入力した文字はそのまま保存し、表示のときだけ URL と #タグ を見分ける。 */
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
  folderOpen: 'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z',
  shape: 'M12 2l-5.5 9h11L12 2zm5.5 11c-2.49 0-4.5 2.01-4.5 4.5S15.01 22 17.5 22s4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zM3 21.5h8v-8H3v8z',
  folders: 'M3 6H1v13c0 1.1.9 2 2 2h17v-2H3V6zm18-2h-7l-2-2H7c-1.1 0-1.99.9-1.99 2L5 15c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z',
  file: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
  addPage: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z',
  moveTo: 'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 12v-3h-4v-4h4V8l5 5-5 5z',
  select: 'M7 2l12 11.2-5.8.5 3.3 7.3-2.2 1-3.2-7.4L7 18.5V2z',
  lasso: 'M12 3C6.48 3 2 6.13 2 10c0 2.38 1.71 4.48 4.33 5.75-.21.39-.33.83-.33 1.25 0 1.66 1.34 3 3 3 .27 0 .53-.05.78-.12L11 21.5l1.6-1.2-1.03-1.36c.27-.43.43-.93.43-1.44v-.04c.33.02.66.04 1 .04 5.52 0 10-3.13 10-7S17.52 3 12 3zM9 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3-3.5c-.4 0-.79-.02-1.17-.05A2.99 2.99 0 0 0 7.16 14C5.24 13.07 4 11.6 4 10c0-2.71 3.66-5 8-5s8 2.29 8 5-3.66 4.5-8 4.5z',
  text: 'M5 4v3h5.5v12h3V7H19V4z',
  sticky: 'M19 3H4.99C3.89 3 3 3.9 3 5l.01 14c0 1.1.89 2 1.99 2h10l6-6V5c0-1.1-.9-2-2-2zM7 8h10v2H7V8zm5 6H7v-2h5v2zm2 5.5V14h5.5L14 19.5z',
  pen: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  marker: 'M6 14l3 3v5h6v-5l3-3V9H6v5zm5-12h2v3h-2V2zM3.5 5.88l1.41-1.41 2.12 2.12L5.62 8 3.5 5.88zm13.46.71 2.12-2.12 1.41 1.41L18.38 8l-1.42-1.41z',
  eraser: 'M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.77-.78 2.04 0 2.83L5.03 20h7.66l8.72-8.72c.79-.77.79-2.04 0-2.83l-4.85-4.86c-.39-.39-.91-.59-1.42-.59zM6.44 18l-2.44-2.44 3.76-3.76 4.88 4.88L11.12 18H6.44z',
  undo: 'M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z',
  redo: 'M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.050-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z',
  back: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
  up: 'M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z',
  down: 'M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z',
  pageBg: 'M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z',
  move4: 'M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z',
  front: 'M4 4h11v11H4V4zm5 13h11v-9h-3v6.99L9 15v2z',
  back2: 'M9 9h11v11H9V9zM4 15V4h11v3H7v8H4z',
  restore: 'M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18z',
  widgets: 'M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z',
  link: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z',
  checkbox: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  dropdown: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 12-4-4h8l-4 4z',
  ruler: 'M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z',
  grip: 'M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
  open: 'M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z',
  palette: 'M12 3a9 9 0 0 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  lock: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z',
  unlock: 'M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z',
  rotL: 'M7.11 8.53 5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z',
  rotR: 'M15.55 5.55 11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42 1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z',
  tag: 'M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z',
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
function isDark(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return false;
  const n = parseInt(m[1], 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
}

/* ===== ページの決まりごと ===== */
const PAGE_W = 900, PAGE_H = 1272;          // A4 の縦横比。ページの中はこの大きさの座標で記録する（横向きは入れ替え）
function dims(page) { return page?.orient === 'land' ? { w: PAGE_H, h: PAGE_W } : { w: PAGE_W, h: PAGE_H }; }
const PAPERS = [
  ['plain', '白紙'], ['lined', '罫線'], ['narrow', '細い罫線'], ['margin', '余白付き罫線'], ['twocol', '2段罫線'],
  ['grid', '方眼'], ['gridS', '細かい方眼'], ['gridL', '大きい方眼'], ['dot', 'ドット'], ['vertical', '縦罫線'],
  ['cornell', 'コーネル'], ['todo', 'ToDo'], ['weekly', '週間予定'], ['staff', '五線譜'], ['genkou', '原稿用紙'],
];
const PAPER_COLORS = [['#fffefb', '白'], ['#fdf6e3', 'クリーム'], ['#fffbe0', 'レモン'], ['#fff0f3', 'ピンク'], ['#f1f8ea', '若草'], ['#eef5ff', '水色'], ['#f3effa', 'ラベンダー'], ['#f1f1f1', 'グレー']];
const INK = [
  ['#222222', '黒'], ['#555555', '濃いグレー'], ['#8a8a8a', 'グレー'], ['#c4c4c4', '薄いグレー'], ['#ffffff', '白'], ['#7b1f1f', 'えんじ'],
  ['#e53935', '赤'], ['#ff6f61', 'サーモン'], ['#d81b60', 'ローズ'], ['#f06292', 'ピンク'], ['#f08c00', 'オレンジ'], ['#f9a825', '山吹'],
  ['#fdd835', '黄'], ['#9e9d24', 'オリーブ'], ['#7cb342', '黄緑'], ['#2e9b4a', '緑'], ['#00897b', '青緑'], ['#00acc1', '水色'],
  ['#1e88e5', '青'], ['#1a3e8c', '紺'], ['#5e35b1', '藍'], ['#8e44ad', '紫'], ['#795548', '茶'], ['#c8a27a', 'ベージュ'],
];
const MARK = [
  ['#ffe14d', '黄'], ['#fff176', 'レモン'], ['#ffcc80', 'オレンジ'], ['#ffab91', 'サーモン'], ['#ff9ecb', 'ピンク'], ['#f48fb1', 'ローズ'],
  ['#ce93d8', '紫'], ['#b39dff', 'ラベンダー'], ['#8fd0ff', '水色'], ['#81d4fa', '空色'], ['#80deea', 'シアン'], ['#7fe3d4', 'ミント'],
  ['#8be28b', '緑'], ['#c5e1a5', '黄緑'], ['#d7ccc8', 'ベージュ'], ['#cfcfcf', 'グレー'],
];
const STICKY = [
  ['#fff1a6', '黄'], ['#fff8c9', 'レモン'], ['#ffe0a3', '山吹'], ['#ffdcb0', 'オレンジ'], ['#ffc9c0', 'サーモン'], ['#ffd3e0', 'ピンク'],
  ['#f8c8dc', 'ローズ'], ['#f3d1ff', 'ラベンダー'], ['#e5d6ff', '紫'], ['#d6dcff', '藍'], ['#cfe6ff', '水色'], ['#c8f0f0', 'ミント'],
  ['#d6f3c8', '緑'], ['#eef5c0', '黄緑'], ['#e8d9c5', 'ベージュ'], ['#ffffff', '白'], ['#e6e6e6', 'グレー'], ['#cfd8dc', '青灰'],
];
const OLD_STICKY = { yellow: '#fff1a6', pink: '#ffd3e0', blue: '#cfe6ff', green: '#d6f3c8', orange: '#ffdcb0', purple: '#e5d6ff' };
const stickyBg = (c) => OLD_STICKY[c] || c || STICKY[0][0];
const PEN_W = [[1.5, '極細'], [3, '細'], [5, '中'], [9, '太'], [16, '極太']];
const MARK_W = [[12, '細'], [22, '中'], [36, '太'], [56, '極太']];
const ERASER_W = [[12, '細'], [28, '中'], [56, '太'], [110, '特大']];
const TEXT_SIZES = [[18, '小'], [24, '中'], [34, '大'], [48, '特大']];
const TOOLS = [
  ['select', 'select', '選択', 'V'], ['lasso', 'lasso', '範囲選択', 'L'], ['text', 'text', 'テキスト', 'T'], ['sticky', 'sticky', '付箋', 'S'],
  ['pen', 'pen', 'ペン', 'P'], ['marker', 'marker', 'マーカー', 'M'], ['shape', 'shape', '図形', 'G'], ['eraser', 'eraser', '消しゴム', 'E'],
];
const SHAPES = [['rect', '四角'], ['round', '角丸'], ['ellipse', '円'], ['tri', '三角'], ['diamond', 'ひし形'], ['star', '星'], ['line', '直線'], ['arrow', '矢印']];
const FILLS = [['none', '塗りなし'], ['soft', 'うすく塗る'], ['solid', '塗る']];
const OPEN_SHAPES = new Set(['line', 'arrow']);
const TEXTY = new Set(['text', 'sticky', 'check']);
const ITEM_LABEL = { text: 'テキストボックス', sticky: '付箋', image: '画像', check: 'チェックボックス', select: 'プルダウン', link: 'メモへ移動ボタン' };
const PLACEHOLDER = { text: 'テキストを入力', sticky: '付箋', check: '項目' };
function newPage(bg = 'lined', paper = PAPER_COLORS[0][0], orient = 'port') { return { id: uid(), bg, paper, orient, items: [], strokes: [] }; }

/* ===== 用紙の模様（SVG） ===== */
const paperCache = new Map();
function paperSVG(bg, w, h, g = 1, sw = 1) {
  const L = '#c5d3e6', G = '#dfe5ee', D = '#aeb8c6';
  let s = '';
  const ln = (x1, y1, x2, y2, c = L, wd = 2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${wd * sw}"/>`;
  const rows = (from, step, x1 = 0, x2 = w, c = L, to = h - 30 * g) => { for (let y = from; y < to; y += step) s += ln(x1, y, x2, y, c); };
  const gridLines = (step, c, wd, every = 0, c2 = c, wd2 = wd) => {
    for (let i = 0, x = 0; x <= w; x += step, i++) s += ln(x, 0, x, h, every && i % every === 0 ? c2 : c, every && i % every === 0 ? wd2 : wd);
    for (let i = 0, y = 0; y <= h; y += step, i++) s += ln(0, y, w, y, every && i % every === 0 ? c2 : c, every && i % every === 0 ? wd2 : wd);
  };
  switch (bg) {
    case 'lined': rows(96 * g, 48 * g); break;
    case 'narrow': rows(84 * g, 36 * g); break;
    case 'margin': rows(96 * g, 48 * g); s += ln(110 * g, 0, 110 * g, h, '#f0a8a8', 2); break;
    case 'twocol': rows(96 * g, 48 * g, 40 * g, w / 2 - 20 * g); rows(96 * g, 48 * g, w / 2 + 20 * g, w - 40 * g); s += ln(w / 2, 60 * g, w / 2, h - 40 * g, D, 2); break;
    case 'grid': gridLines(36 * g, G, 1.6); break;
    case 'gridS': gridLines(18 * g, '#e8edf3', 1, 5, '#c9d3e0', 1.8); break;
    case 'gridL': gridLines(72 * g, G, 2); break;
    case 'dot': for (let y = 18 * g; y < h; y += 36 * g) for (let x = 18 * g; x < w; x += 36 * g) s += `<circle cx="${x}" cy="${y}" r="${2.4 * sw}" fill="#bfc5ce"/>`; break;
    case 'vertical': for (let x = w - 96 * g; x > 40 * g; x -= 48 * g) s += ln(x, 50 * g, x, h - 50 * g); break;
    case 'cornell': {
      const top = 130 * g, bottom = h - 240 * g, left = 250 * g;
      s += ln(0, top, w, top, D, 3) + ln(left, top, left, bottom, D, 3) + ln(0, bottom, w, bottom, D, 3);
      rows(top + 48 * g, 48 * g, left, w, L, bottom);
      break;
    }
    case 'todo': for (let y = 120 * g; y < h - 40 * g; y += 64 * g) { s += ln(96 * g, y, w - 50 * g, y); s += `<rect x="${44 * g}" y="${y - 36 * g}" width="${28 * g}" height="${28 * g}" rx="${5 * g}" fill="none" stroke="${D}" stroke-width="${2.5 * sw}"/>`; } break;
    case 'weekly': {
      const days = ['月', '火', '水', '木', '金', '土', '日'];
      const top = 100 * g, rh = (h - top - 30 * g) / 7;
      days.forEach((d, i) => {
        const y = top + i * rh;
        s += ln(0, y, w, y, D, 2.5);
        s += `<text x="${24 * g}" y="${y + 40 * g}" font-size="${26 * g}" font-family="sans-serif" fill="${i >= 5 ? '#e08a8a' : '#9aa4b2'}">${d}</text>`;
      });
      s += ln(0, h - 30 * g, w, h - 30 * g, D, 2.5);
      break;
    }
    case 'staff': for (let y0 = 120 * g; y0 + 48 * g < h - 60 * g; y0 += 130 * g) for (let i = 0; i < 5; i++) s += ln(50 * g, y0 + i * 12 * g, w - 50 * g, y0 + i * 12 * g, '#98a2b0', 1.5); break;
    case 'genkou': {
      const cols = 20, rows_ = 20, gap = 8 * g;
      const cell = Math.min((w - 80 * g - gap * (cols - 1)) / cols, (h - 160 * g) / rows_);
      const tw = cols * cell + (cols - 1) * gap, th = rows_ * cell;
      const x0 = (w - tw) / 2, y0 = (h - th) / 2;
      const c = '#9cc8a6';
      s += `<rect x="${x0 - 10 * g}" y="${y0 - 10 * g}" width="${tw + 20 * g}" height="${th + 20 * g}" fill="none" stroke="${c}" stroke-width="${3 * sw}"/>`;
      for (let i = 0; i < cols; i++) {
        const x = x0 + i * (cell + gap);
        s += `<rect x="${x}" y="${y0}" width="${cell}" height="${th}" fill="none" stroke="${c}" stroke-width="${1.6 * sw}"/>`;
        for (let j = 1; j < rows_; j++) s += ln(x, y0 + j * cell, x + cell, y0 + j * cell, c, 1.2);
      }
      break;
    }
    default: return '';
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`;
}
function paperURL(bg, w, h) {
  const key = `${bg}|${w}|${h}`;
  if (!paperCache.has(key)) {
    const svg = paperSVG(bg, w, h);
    paperCache.set(key, svg ? `url("data:image/svg+xml,${encodeURIComponent(svg)}")` : '');
  }
  return paperCache.get(key);
}
function paperPreview(bg, orient) {
  const w = orient === 'land' ? PAGE_H : PAGE_W, h = orient === 'land' ? PAGE_W : PAGE_H;
  const svg = paperSVG(bg, w, h, 2.4, 7) || `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"/>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

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
const boxAlive = (b) => !!b && !b.trashedAt;
const folderAlive = (f) => !!f && !f.trashedAt && boxAlive(boxById(f.boxId));
const fileAlive = (f) => !!f && !f.trashedAt && folderAlive(folderById(f.folderId));
const liveBoxes = () => S.boxes.filter(boxAlive).sort((a, b) => a.created - b.created);
const foldersOf = (boxId) => S.folders.filter((f) => f.boxId === boxId && !f.trashedAt).sort((a, b) => a.created - b.created);
const filesOf = (boxId, folderId = 'all') => S.files.filter((f) => f.boxId === boxId && fileAlive(f) && (folderId === 'all' || f.folderId === folderId)).sort((a, b) => b.updated - a.updated);
const boxName = (b) => (b ? b.name + 'ボックス' : '');
function cleanBoxName(v) { return String(v || '').trim().replace(/\s*ボックス$/, '').trim(); }
function filePath(f) { return `${boxName(boxById(f.boxId))} › ${folderById(f.folderId)?.name || ''}`; }

/* ===== タグ ===== */
const HASHTAG = /#([^\s#、。，．,.!?！？()（）「」『』【】\[\]{}<>"'`]+)/g;
function itemTags(it) {
  const set = new Set(it.tags || []);
  for (const m of String(it.text || '').matchAll(HASHTAG)) set.add(m[1]);
  return set;
}
function fileTags(f) {
  const set = new Set();
  for (const p of f.pages) for (const it of p.items) itemTags(it).forEach((t) => set.add(t));
  return set;
}
function allTags() {
  const count = new Map();
  for (const f of S.files) if (fileAlive(f)) for (const t of fileTags(f)) count.set(t, (count.get(t) || 0) + 1);
  return [...count].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ja'));
}
function parseTags(v) { return [...new Set(String(v || '').split(/[\s,、，]+/).map((t) => t.replace(/^#/, '').trim()).filter(Boolean))]; }

/* 表示用: URL をリンクに、#タグ をタグにする（保存する文字は変えない） */
const RICH = /(https?:\/\/[^\s<>"「」『』（）、。]+|www\.[^\s<>"「」『』（）、。]+)|#([^\s#、。，．,.!?！？()（）「」『』【】\[\]{}<>"'`]+)/g;
function richText(text, urls) {
  const out = [];
  let last = 0;
  for (const m of String(text).matchAll(RICH)) {
    if (m[1] && !urls) continue;
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      const url = m[1].replace(/[)\].,!?！？]+$/, '');
      const href = /^https?:/i.test(url) ? url : 'https://' + url;
      out.push(el('a', { class: 'url', href, target: '_blank', rel: 'noopener noreferrer', title: href }, url));
      if (url.length < m[1].length) out.push(m[1].slice(url.length));
    } else out.push(el('span', { class: 'tag', dataset: { tag: m[2] }, title: `#${m[2]} で探す` }, '#' + m[2]));
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

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
  if (p[0] === 'trash') return { name: 'trash' };
  return { name: 'home' };
}
function go(hash) {
  if (location.hash === hash) { S.route = parseRoute(); render(); } else location.hash = hash;
}
const boxHash = (boxId, folderId = 'all') => `#/b/${boxId}` + (folderId && folderId !== 'all' ? '/' + folderId : '');
function searchFor(q) {
  S.query = q;
  $('#search').value = q;
  $('#searchClear').hidden = !q;
  closeNav();
  render();
}

/* ===== サイドバー ===== */
function renderNav() {
  const nav = $('#sidebar');
  nav.replaceChildren();
  const r = S.route;
  const curBox = r.name === 'box' ? r.boxId : r.name === 'file' ? fileById(r.fileId)?.boxId : null;
  nav.append(el('div', { class: 'nav-head', text: 'ボックス' }));
  for (const b of liveBoxes()) {
    const c = filesOf(b.id).length;
    nav.append(el('button', {
      class: 'nav-item' + (curBox === b.id && !S.query ? ' active' : ''), type: 'button', title: boxName(b),
      onclick: () => { closeNav(); clearSearch(); go(boxHash(b.id)); },
    }, icon('box'), el('span', { class: 'nav-label', text: boxName(b) }), c ? el('span', { class: 'nav-count', text: c }) : null));
  }
  nav.append(el('button', { class: 'nav-item add', type: 'button', title: '新しいボックス', onclick: () => { closeNav(); createBox(); } },
    icon('plus'), el('span', { class: 'nav-label', text: '新しいボックス' })));
  const tc = trashCount();
  nav.append(el('div', { class: 'nav-sep' }), el('button', {
    class: 'nav-item' + (r.name === 'trash' && !S.query ? ' active' : ''), type: 'button', title: 'ゴミ箱ボックス',
    onclick: () => { closeNav(); clearSearch(); go('#/trash'); },
  }, icon('trash'), el('span', { class: 'nav-label', text: 'ゴミ箱ボックス' }), tc ? el('span', { class: 'nav-count', text: tc }) : null));
  const tags = allTags();
  if (tags.length) {
    nav.append(el('div', { class: 'nav-sep' }), el('div', { class: 'nav-head', text: 'タグ' }));
    for (const [t, c] of tags.slice(0, 40)) {
      nav.append(el('button', {
        class: 'nav-item tag-item' + (S.query.trim() === '#' + t ? ' active' : ''), type: 'button', title: '#' + t,
        onclick: () => searchFor('#' + t),
      }, icon('tag'), el('span', { class: 'nav-label', text: t }), el('span', { class: 'nav-count', text: c })));
    }
  }
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
  const w = +st.dataset.w || PAGE_W;
  const s = (box.clientWidth || w) / w;
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
  if (r.name === 'trash') return renderTrash(main);
  if (r.name === 'file') {
    const f = fileById(r.fileId);
    if (fileAlive(f)) return openEditor(f);
    return goHome(true);
  }
  if (r.name === 'box') {
    const b = boxById(r.boxId);
    if (!boxAlive(b)) return goHome(true);
    if (r.folderId !== 'all' && !(folderAlive(folderById(r.folderId)) && folderById(r.folderId).boxId === b.id)) { history.replaceState(null, '', boxHash(b.id)); r.folderId = 'all'; }
    setPref('lastBox', b.id);
    S.lastBoxHash = boxHash(b.id, r.folderId);
    return renderBox(main, b, r.folderId);
  }
  goHome(false);
}
function goHome(replace) {
  const lb = boxById(pref('lastBox', ''));
  const last = boxAlive(lb) ? lb : liveBoxes()[0];
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

  const folderBtn = (id, name, count, ic) => {
    const on = folderId === id;
    return el('button', {
      class: 'folder-item' + (on ? ' active' : ''), type: 'button', title: on ? `${name}（開いています）` : name, 'aria-current': on ? 'true' : null,
      onclick: () => go(boxHash(box.id, id)),
    }, icon(on && ic === 'folder' ? 'folderOpen' : ic), el('span', { class: 'folder-name', text: name }), el('span', { class: 'count', text: count }));
  };

  const side = el('aside', { class: 'folders', 'aria-label': 'フォルダ' },
    folderBtn('all', 'すべてのフォルダ', all.length, 'folders'),
    folders.map((f) => folderBtn(f.id, f.name, all.filter((x) => x.folderId === f.id).length, 'folder')),
    el('button', { class: 'folder-item add', type: 'button', onclick: () => createFolder(box) }, icon('plus'), el('span', { text: '新しいフォルダ' })));

  const folder = folderId === 'all' ? null : folderById(folderId);
  const list = filesOf(box.id, folderId);
  const head = el('div', { class: 'files-head' },
    el('div', { class: 'files-title' },
      el('div', { class: 'crumb' }, icon('box'), boxName(box), ' ›'),
      el('h2', {}, icon(folder ? 'folderOpen' : 'folders'), el('span', { text: folder ? folder.name : 'すべてのフォルダ' }),
        el('span', { class: 'count-badge', text: `${list.length}件` }))),
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

/* --- 検索結果（#タグ でタグを探せる） --- */
function fileText(f) {
  return f.pages.flatMap((p) => p.items.flatMap((i) => [i.text || '', i.label || '', ...(i.options || []), ...(i.tags || []).map((t) => '#' + t)])).join('\n');
}
function renderSearch(main, q) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const list = S.files.filter((f) => {
    if (!fileAlive(f)) return false;
    const tags = [...fileTags(f)].map((t) => t.toLowerCase());
    const hay = [f.name, fileText(f), folderById(f.folderId)?.name, boxName(boxById(f.boxId))].join('\n').toLowerCase();
    return words.every((w) => (w.startsWith('#') && w.length > 1 ? tags.some((t) => t.includes(w.slice(1))) : hay.includes(w)));
  }).sort((a, b) => b.updated - a.updated);
  const isTag = /^#\S+$/.test(q);
  main.append(el('h1', { class: 'view-title' }, isTag ? icon('tag') : null, isTag ? q.slice(1) : '検索結果', el('span', { class: 'sub', text: list.length + '件' })));
  main.append(list.length ? el('div', { class: 'file-grid wide' }, list.map((f) => fileCard(f, true, true)))
    : el('div', { class: 'empty-state' }, icon('search'), el('p', { text: '見つかりませんでした' })));
}

/* --- メモファイルのカード --- */
function thumbOf(page) {
  const { w, h } = dims(page);
  const thumb = el('div', { class: 'thumb', style: `aspect-ratio:${w} / ${h}` }, buildStage(page, false));
  fitRO.observe(thumb);
  return thumb;
}
function fileCard(f, showFolder, showBox) {
  const where = [showBox ? boxName(boxById(f.boxId)) : null, showFolder ? folderById(f.folderId)?.name : null].filter(Boolean).join(' › ');
  const open = () => { clearSearch(); go('#/f/' + f.id); };
  const tags = [...fileTags(f)].slice(0, 4);
  return el('div', { class: 'file-card', tabindex: 0, role: 'link', 'aria-label': f.name, onclick: open, onkeydown: (e) => { if (e.key === 'Enter') open(); } },
    el('div', { class: 'thumb-wrap' }, thumbOf(f.pages[0] || newPage())),
    el('div', { class: 'file-info' },
      el('div', { class: 'file-name', text: f.name || '無題のメモ' }),
      el('div', { class: 'file-meta', text: `${f.pages.length}ページ · ${fmtDate(f.updated)}` }),
      where ? el('div', { class: 'file-path' }, icon('folder'), el('span', { text: where })) : null,
      tags.length ? el('div', { class: 'file-tags' }, tags.map((t) => el('span', { class: 'chip', text: '#' + t }))) : null),
    iconBtn('more', 'メモファイルのメニュー', (e) => { e.stopPropagation(); fileMenu(e.currentTarget, f); }, 'sm file-more'));
}

/* ===== ゴミ箱ボックス ===== */
function trashLists() {
  return {
    boxes: S.boxes.filter((b) => b.trashedAt),
    folders: S.folders.filter((f) => f.trashedAt && boxAlive(boxById(f.boxId))),
    files: S.files.filter((f) => f.trashedAt && folderAlive(folderById(f.folderId))),
  };
}
function trashCount() { const t = trashLists(); return t.boxes.length + t.folders.length + t.files.length; }
function renderTrash(main) {
  const t = trashLists();
  const total = t.boxes.length + t.folders.length + t.files.length;
  main.append(el('h1', { class: 'view-title' }, icon('trash'), 'ゴミ箱ボックス',
    el('span', { class: 'sub', text: '削除したボックス・フォルダ・メモファイルはここに入ります。元に戻すこともできます。' }),
    total ? el('button', { class: 'btn danger', type: 'button', text: 'ゴミ箱を空にする', onclick: emptyTrash }) : null));
  if (!total) { main.append(el('div', { class: 'empty-state' }, icon('trash'), el('p', { text: 'ゴミ箱は空です' }))); return; }
  const row = (kind, obj, ic, name, where, thumb) => el('div', { class: 'trash-row' },
    thumb || el('div', { class: 'trash-ic' }, icon(ic)),
    el('div', { class: 'trash-info' }, el('div', { class: 'trash-name', text: name }),
      el('div', { class: 'trash-meta', text: `${where}${where ? ' · ' : ''}${fmtDate(obj.trashedAt)}に削除` })),
    el('button', { class: 'btn', type: 'button', onclick: () => restoreItem(kind, obj) }, icon('restore'), '元に戻す'),
    el('button', { class: 'btn danger', type: 'button', onclick: () => purgeItem(kind, obj) }, icon('trash'), '完全に削除'));
  const section = (title, rows) => (rows.length ? el('section', { class: 'trash-section' }, el('h2', { text: title }), el('div', { class: 'trash-list' }, rows)) : null);
  main.append(el('div', { class: 'trash-wrap' },
    section('ボックス', t.boxes.map((b) => row('box', b, 'box', boxName(b), `フォルダ ${S.folders.filter((f) => f.boxId === b.id).length}・メモファイル ${S.files.filter((f) => f.boxId === b.id).length} 入り`))),
    section('フォルダ', t.folders.map((f) => row('folder', f, 'folder', f.name, `${boxName(boxById(f.boxId))} · メモファイル ${S.files.filter((x) => x.folderId === f.id).length} 入り`))),
    section('メモファイル', t.files.map((f) => row('file', f, 'file', f.name, filePath(f), el('div', { class: 'trash-thumb' }, thumbOf(f.pages[0] || newPage())))))));
}
const STORE = { box: 'boxes', folder: 'folders', file: 'files' };
function trashItem(kind, obj, label) {
  obj.trashedAt = Date.now();
  put(STORE[kind], obj);
  toast(`${label}をゴミ箱ボックスに入れました`, '元に戻す', () => restoreItem(kind, obj, true));
}
function restoreItem(kind, obj, quiet) {
  obj.trashedAt = null;
  put(STORE[kind], obj);
  if (!quiet) toast('元に戻しました', '開く', () => go(kind === 'box' ? boxHash(obj.id) : kind === 'folder' ? boxHash(obj.boxId, obj.id) : '#/f/' + obj.id));
  render();
}
async function purge(kind, obj) {
  const files = kind === 'file' ? [obj] : S.files.filter((f) => (kind === 'box' ? f.boxId === obj.id : f.folderId === obj.id));
  const folders = kind === 'box' ? S.folders.filter((f) => f.boxId === obj.id) : kind === 'folder' ? [obj] : [];
  S.files = S.files.filter((f) => !files.includes(f));
  S.folders = S.folders.filter((f) => !folders.includes(f));
  if (kind === 'box') S.boxes = S.boxes.filter((b) => b !== obj);
  await Promise.all([DB.delMany('files', files.map((f) => f.id)), DB.delMany('folders', folders.map((f) => f.id)), kind === 'box' ? DB.del('boxes', obj.id) : null]).catch(saveFailed);
}
async function purgeItem(kind, obj) {
  const name = kind === 'box' ? boxName(obj) : obj.name;
  if (!confirm(`「${name}」を完全に削除します。中身も含めて元に戻せません。よろしいですか？`)) return;
  await purge(kind, obj);
  render();
  toast(`「${name}」を完全に削除しました`);
}
async function emptyTrash() {
  const t = trashLists();
  const n = t.boxes.length + t.folders.length + t.files.length;
  if (!confirm(`ゴミ箱ボックスの ${n} 個を完全に削除します。元に戻せません。よろしいですか？`)) return;
  for (const b of t.boxes) await purge('box', b);
  for (const f of t.folders) await purge('folder', f);
  for (const f of t.files) await purge('file', f);
  render();
  toast('ゴミ箱を空にしました');
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
function deleteBox(b) {
  if (pref('lastBox', '') === b.id) setPref('lastBox', '');
  trashItem('box', b, boxName(b));
  go('#/');
}
function boxMenu(anchor, b) {
  menu(anchor, [['edit', '名前を変更', () => renameBox(b)], ['trash', 'ボックスを削除（ゴミ箱へ）', () => deleteBox(b), true]]);
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
function deleteFolder(f) {
  trashItem('folder', f, `フォルダ「${f.name}」`);
  go(boxHash(f.boxId));
}
function folderMenu(anchor, f) {
  menu(anchor, [['edit', '名前を変更', () => renameFolder(f)], ['trash', 'フォルダを削除（ゴミ箱へ）', () => deleteFolder(f), true]]);
}

async function createFile(box, folderId) {
  let folders = foldersOf(box.id);
  const fields = [{ key: 'name', label: 'メモファイルの名前', placeholder: '無題のメモ', maxlength: 80 }];
  if (folderId === 'all') {
    if (!folders.length) { makeFolder(box, 'メモ'); folders = foldersOf(box.id); toast('フォルダ「メモ」を作りました'); }
    fields.push({ key: 'folder', type: 'select', label: '入れるフォルダ', value: folders[0].id, options: folders.map((f) => [f.id, f.name]) });
  }
  fields.push({ key: 'paper', type: 'select', label: '用紙', value: pref('paper', 'lined'), options: PAPERS });
  const v = await dialog({ title: '新しいメモファイル', fields, ok: '作成' });
  if (!v) { if (folderId === 'all') render(); return; }
  setPref('paper', v.paper);
  const t = Date.now();
  const f = { id: uid(), boxId: box.id, folderId: v.folder || folderId, name: v.name.trim() || '無題のメモ', pages: [newPage(v.paper)], created: t, updated: t };
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
  for (const b of liveBoxes()) for (const fo of foldersOf(b.id)) opts.push([fo.id, `${boxName(b)} › ${fo.name}`]);
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
  const c = { ...f, id: uid(), name: f.name + ' のコピー', pages, created: t, updated: t, trashedAt: null };
  S.files.push(c); put('files', c);
  if (!ED) render();
  toast('コピーを作りました', '開く', () => go('#/f/' + c.id));
}
function deleteFile(f) {
  if (ED?.file === f) { if (ED.commitT) commit(); flushSave(); ED = null; }
  trashItem('file', f, `「${f.name}」`);
  if (S.route.name === 'file' && S.route.fileId === f.id) go(boxHash(f.boxId, f.folderId)); else render();
}
function fileMenu(anchor, f) {
  menu(anchor, [
    ['edit', '名前を変更', () => renameFile(f)],
    ['moveTo', '別のフォルダへ移動', () => moveFile(f)],
    ['copy', 'コピーを作る', () => cloneFile(f)],
    ['trash', '削除（ゴミ箱へ）', () => deleteFile(f), true],
  ]);
}

/* ===== ページの描画（エディターとカードの縮小表示で共通） ===== */
function strokeD(p, sharp) {
  if (!p.length) return '';
  if (p.length === 1) return `M${p[0][0]} ${p[0][1]}l0.01 0`;
  if (sharp) {
    const f = p[0], l = p[p.length - 1];
    const closed = p.length > 3 && f[0] === l[0] && f[1] === l[1];      // 閉じた形は Z で閉じて角まで尖らせる
    return 'M' + (closed ? p.slice(0, -1) : p).map((q) => q[0] + ' ' + q[1]).join('L') + (closed ? 'Z' : '');
  }
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 1; i < p.length - 1; i++) d += `Q${p[i][0]} ${p[i][1]} ${r1((p[i][0] + p[i + 1][0]) / 2)} ${r1((p[i][1] + p[i + 1][1]) / 2)}`;
  const l = p[p.length - 1];
  return d + `L${l[0]} ${l[1]}`;
}
function strokeEl(s) {
  return svgEl('path', {
    d: strokeD(s.pts, s.sharp), fill: s.fill || 'none', 'fill-opacity': s.fill ? (s.fillA ?? 1) : null,
    stroke: s.color, 'stroke-width': s.width, 'stroke-linecap': 'round',
    'stroke-linejoin': s.join || (s.sharp ? 'miter' : 'round'), 'stroke-miterlimit': s.sharp ? 8 : null,
    class: s.kind === 'marker' ? 'mark' : null, 'data-id': s.id,
  });
}
function placeItem(d, it, dx = 0, dy = 0) {
  d.style.left = it.x + 'px';
  d.style.top = it.y + 'px';
  d.style.width = it.w + 'px';
  if (it.type === 'sticky' || it.type === 'image') d.style.height = it.h + 'px';
  d.style.transform = (dx || dy ? `translate(${dx}px, ${dy}px) ` : '') + (it.rot ? `rotate(${it.rot}deg)` : '');
}
function textView(it) {
  return el('div', { class: 'txt' }, richText(it.text || '', it.urls !== false), it.text ? null : el('span', { class: 'ph', text: PLACEHOLDER[it.type] || '' }));
}
function tagChips(it) {
  return it.tags?.length ? el('div', { class: 'item-tags' }, it.tags.map((t) => el('span', { class: 'tag', dataset: { tag: t }, title: `#${t} で探す` }, '#' + t))) : null;
}
function itemEl(it, edit) {
  const d = el('div', { class: `item item-${it.type}` + (it.locked ? ' locked' : '') + (it.type === 'check' && it.checked ? ' checked' : ''), dataset: { id: it.id } });
  if (it.size) d.style.fontSize = it.size + 'px';
  if (it.color && it.type !== 'sticky') d.style.color = it.color;
  if (it.type === 'sticky') {
    const bg = stickyBg(it.color);
    d.style.setProperty('--sticky', bg);
    if (isDark(bg)) d.classList.add('dark');
  }
  placeItem(d, it);
  switch (it.type) {
    case 'image': d.append(imgEl(it.imageId)); break;
    case 'check': d.append(el('input', { type: 'checkbox', class: 'ctl', checked: !!it.checked, disabled: !edit, 'aria-label': 'チェック' }), textView(it)); break;
    case 'select': d.append(el('span', { class: 'grip' }, icon('grip')), el('select', { class: 'ctl', disabled: !edit, 'aria-label': 'プルダウン' },
      el('option', { value: '', text: '選んでください' }), (it.options || []).map((o) => el('option', { value: o, text: o, selected: o === it.value })))); break;
    case 'link': {
      const t = fileById(it.target);
      d.append(el('span', { class: 'grip' }, icon('grip')), el('span', { class: 'link-btn' + (fileAlive(t) ? '' : ' broken'), title: fileAlive(t) ? `「${t.name}」を開く` : 'リンク先がありません' },
        icon('file'), el('span', { class: 'link-label', text: it.label || t?.name || 'メモファイル' })));
      break;
    }
    default: d.append(textView(it));
  }
  if (TEXTY.has(it.type)) { const c = tagChips(it); if (c) d.append(c); }
  if (edit) d.append(el('div', { class: 'h-move', title: '移動' }, icon('move4')), el('div', { class: 'h-resize', title: '大きさを変える' }), el("div", { class: "h-del", title: "削除" }, icon("trash")), el('div', { class: 'lock-badge', title: '固定中' }, icon('lock')));
  return d;
}
function buildStage(page, edit) {
  const { w, h } = dims(page);
  const stage = el('div', { class: 'stage', dataset: { page: page.id, w } });
  stage.style.width = w + 'px';
  stage.style.height = h + 'px';
  stage.style.backgroundColor = page.paper || PAPER_COLORS[0][0];
  const bg = paperURL(page.bg, w, h);
  if (bg) stage.style.backgroundImage = bg;
  const items = el('div', { class: 'items' }, page.items.map((it) => itemEl(it, edit)));
  const ink = svgEl('svg', { class: 'ink', viewBox: `0 0 ${w} ${h}`, 'aria-hidden': 'true' });
  for (const s of page.strokes) ink.append(strokeEl(s));
  stage.append(items, ink);
  return stage;
}

/* ===== エディター ===== */
function openEditor(file) {
  ED = {
    file, tool: 'select', sel: null, editId: null, lasso: null,
    undo: [], redo: [], snap: JSON.stringify(file.pages), saveT: null, commitT: null,
    pen: { color: INK[0][0], width: PEN_W[1][0] }, marker: { color: MARK[0][0], width: MARK_W[1][0] },
    eraser: { size: ERASER_W[1][0], mode: 'part' },
    shape: { kind: "rect", color: INK[0][0], width: PEN_W[1][0], fill: "none" },
    ruler: pref('ruler', '0') === '1',
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
  const funcBtn = el('button', { class: 'tool', type: 'button', title: '機能アイテム', onclick: (e) => { e.stopPropagation(); funcMenu(e.currentTarget); } }, icon('widgets'), el('span', { text: '機能' }));
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
        el('div', { class: 'tools', role: 'toolbar', 'aria-label': 'ツール' }, ED.toolBtns, imgBtn, funcBtn)),
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
  ED.snap = json; ED.sel = null; ED.editId = null; ED.lasso = null;
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
function itemH(it) { return it.h ?? (itemDiv(it.id)?.offsetHeight || 40); }
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
    const { w, h } = dims(p);
    const frame = el('div', { class: 'page', style: `aspect-ratio:${w} / ${h}` }, buildStage(p, true));
    const head = el('div', { class: 'page-head' },
      el('span', { class: 'page-no', text: `${i + 1} / ${pages.length}` }),
      el('span', { class: 'spacer' }),
      iconBtn('up', '前へ移動', () => movePage(i, -1), 'sm' + (i === 0 ? ' dim' : '')),
      iconBtn('down', '後ろへ移動', () => movePage(i, 1), 'sm' + (i === pages.length - 1 ? ' dim' : '')),
      iconBtn('pageBg', '用紙（種類・色・向き）', (e) => { e.stopPropagation(); paperMenu(e.currentTarget, p); }, 'sm'),
      iconBtn('copy', 'ページを複製', () => dupPage(i), 'sm'),
      iconBtn('addPage', 'この後にページを追加', () => addPage(i), 'sm'),
      iconBtn('trash', 'ページを削除', () => deletePage(i), 'sm'));
    ED.pagesBox.append(el('div', { class: 'page-wrap' + (p.orient === 'land' ? ' land' : '') }, head, frame));
    fitRO.observe(frame);
    fitStage(frame);
  });
  ED.pagesBox.append(el('button', { class: 'add-page', type: 'button', onclick: () => addPage(pages.length - 1) }, icon('addPage'), 'ページを追加'));
  markSel();
  drawLassoBox();
}
function renderPage(page) {
  const old = stageOf(page.id);
  if (!old) return renderPages();
  const st = buildStage(page, true);
  st.style.transform = old.style.transform;
  st.style.setProperty('--inv', old.style.getPropertyValue('--inv'));
  old.replaceWith(st);
  if (ED.editId && !itemDiv(ED.editId)) ED.editId = null;
  markSel();
  drawLassoBox();
}
function autosizeText(ta) { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; }
function addPage(i) {
  const src = ED.file.pages[i];
  const p = newPage(src?.bg || 'lined', src?.paper, src?.orient);
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
    if (!confirm('このページの中身をすべて消しますか？（固定したものも消えます）')) return;
    p.items = []; p.strokes = [];
  } else {
    pages.splice(i, 1);
  }
  ED.lasso = null;
  commit(); renderPages();
  toast('ページを削除しました', '元に戻す', undo);
}
function paperMenu(anchor, p) {
  const r = anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : anchor;
  const pos = { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
  const apply = (fn) => { fn(); commit(); renderPages(); paperMenu(pos, p); };
  showPopover(pos, [
    el('div', { class: 'pop-title', text: '用紙の種類' }),
    el('div', { class: 'paper-grid' }, PAPERS.map(([k, label]) => el('button', {
      class: 'paper-opt' + (p.bg === k ? ' sel' : ''), type: 'button', title: label, 'aria-pressed': p.bg === k ? 'true' : 'false',
      onclick: () => apply(() => { p.bg = k; }),
    }, el('img', { src: paperPreview(k, p.orient), alt: '', class: p.orient === 'land' ? 'land' : '', style: `background:${p.paper}` }), el('span', { text: label })))),
    el('div', { class: 'pop-title', text: '紙の色' }),
    el('div', { class: 'pop-row' }, PAPER_COLORS.map(([c, label]) => el('button', {
      class: 'swatch-btn' + (p.paper === c ? ' sel' : ''), type: 'button', title: label, 'aria-label': label, style: `background:${c}`,
      onclick: () => apply(() => { p.paper = c; }),
    }))),
    el('div', { class: 'pop-title', text: '向き' }),
    el('div', { class: 'pop-row' }, seg([['port', '縦'], ['land', '横']], p.orient || 'port', (v) => apply(() => { p.orient = v; }), () => {})),
    el('div', { class: 'menu-sep' }),
    el('button', { class: 'menu-item', type: 'button', onclick: () => { closePopover(); ED.file.pages.forEach((x) => { x.bg = p.bg; x.paper = p.paper; x.orient = p.orient; }); commit(); renderPages(); toast('すべてのページを同じ用紙にしました'); } },
      icon('pageBg'), 'すべてのページをこの用紙にする'),
  ], 'paper-pop');
}
function editorMenu(anchor) {
  const f = ED.file;
  menu(anchor, [
    ['addPage', 'ページを追加', () => addPage(f.pages.length - 1)],
    ['edit', '名前を変更', () => renameFile(f)],
    ['moveTo', '別のフォルダへ移動', () => moveFile(f)],
    ['copy', 'コピーを作る', () => cloneFile(f)],
    ['trash', 'このメモファイルを削除（ゴミ箱へ）', () => deleteFile(f), true],
  ]);
}

/* --- ツール --- */
function setTool(t) {
  if (!ED) return;
  ED.tool = t;
  ED.toolBtns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.tool === t ? 'true' : 'false'));
  ED.root.className = 'ed tool-' + t;
  if (ED.lasso && t !== "lasso" && t !== "select") clearLasso();
  if (t !== 'select') {
    if (document.activeElement?.closest?.('.stage')) document.activeElement.blur();
    select(null);
  } else renderSub();
}

/* 色: よく使う色＋パレット（たくさんの色・自由な色・最近使った色） */
function recentColors() { try { return JSON.parse(pref('recentColors', '[]')).slice(0, 10); } catch { return []; } }
function addRecent(c) { setPref('recentColors', JSON.stringify([c, ...recentColors().filter((x) => x !== c)].slice(0, 10))); }
function colorRow(list, cur, onPick, quick = 6) {
  const shown = list.slice(0, quick);
  if (cur && !shown.some(([v]) => v.toLowerCase() === cur.toLowerCase())) shown.push([cur, '選んでいる色']);
  return el('div', { class: 'swatches' },
    shown.map(([v, label]) => el('button', {
      class: 'swatch-btn' + (v.toLowerCase() === (cur || '').toLowerCase() ? ' sel' : ''), type: 'button', title: label, 'aria-label': label, style: `background:${v}`,
      onclick: () => { onPick(v); renderSub(); },
    })),
    el('button', { class: 'more-colors', type: 'button', title: 'ほかの色', 'aria-label': 'ほかの色', onclick: (e) => { e.stopPropagation(); paletteMenu(e.currentTarget, list, cur, onPick); } }, icon('palette')));
}
function paletteMenu(anchor, list, cur, onPick) {
  const pick = (v) => { closePopover(); onPick(v); renderSub(); };
  const grid = (arr) => el('div', { class: 'palette-grid' }, arr.map(([v, label]) => el('button', {
    class: 'swatch-btn' + (v.toLowerCase() === (cur || '').toLowerCase() ? ' sel' : ''), type: 'button', title: label, 'aria-label': label, style: `background:${v}`,
    onclick: () => pick(v),
  })));
  const inp = el('input', { type: 'color', value: /^#[0-9a-f]{6}$/i.test(cur || '') ? cur : '#222222', 'aria-label': '自由に色を選ぶ' });
  inp.addEventListener('change', () => { addRecent(inp.value); pick(inp.value); });
  const recent = recentColors();
  showPopover(anchor, [
    el('div', { class: 'pop-title', text: '色を選ぶ' }), grid(list),
    recent.length ? [el('div', { class: 'pop-title', text: '最近使った自由な色' }), grid(recent.map((c) => [c, c]))] : null,
    el('label', { class: 'menu-item custom-color' }, inp, 'その他の色（自由に選ぶ）'),
  ]);
}
function seg(list, cur, onPick, after = renderSub) {
  return el('div', { class: 'seg' }, list.map(([v, label]) => el('button', {
    class: v === cur ? 'sel' : '', type: 'button', text: label, 'aria-pressed': v === cur ? 'true' : 'false',
    onclick: () => { onPick(v); after(); },
  })));
}
function toggleBtn(ic, label, on, onClick, title) {
  return el('button', { class: 'toggle', type: 'button', 'aria-pressed': on ? 'true' : 'false', title: title || label, onclick: onClick }, icon(ic), label);
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
      colorRow(t === 'pen' ? INK : MARK, cfg.color, (v) => { cfg.color = v; }),
      seg(t === 'pen' ? PEN_W : MARK_W, cfg.width, (v) => { cfg.width = v; }),
      toggleBtn('ruler', '定規モード', ED.ruler, () => { ED.ruler = !ED.ruler; setPref('ruler', ED.ruler ? '1' : '0'); renderSub(); }),
      hint(ED.ruler ? '描き終えると、まっすぐな線・なめらかな曲線・円・四角などに整えます（Shift を押しながらで角度を固定した直線）' : 'ページの上をなぞって書き込めます'));
  } else if (t === 'eraser') {
    s.append(el('span', { class: 'sub-label', text: '消しゴム' }),
      seg(ERASER_W, ED.eraser.size, (v) => { ED.eraser.size = v; }),
      seg([['part', '部分消し'], ['stroke', '線ごと']], ED.eraser.mode, (v) => { ED.eraser.mode = v; }),
      hint(ED.eraser.mode === 'part' ? 'なぞった部分だけ消えます' : 'ふれた線をまるごと消します'),
      el('button', { class: 'btn small', type: 'button', text: '見えているページの書き込みを全部消す', onclick: () => {
        const p = currentPage().page;
        const keep = p.strokes.filter((x) => x.locked);
        if (keep.length === p.strokes.length) return;
        p.strokes = keep; commit(); renderPage(p);
        toast(keep.length ? '書き込みを消しました（固定したものは残しています）' : '書き込みを消しました', '元に戻す', undo);
      } }));
  } else if (t === 'text') {
    s.append(el('span', { class: 'sub-label', text: 'テキストボックス' }),
      seg(TEXT_SIZES, ED.textSize, (v) => { ED.textSize = v; }), colorRow(INK, ED.textColor, (v) => { ED.textColor = v; }),
      hint('置きたい場所をクリック'));
  } else if (t === 'sticky') {
    s.append(el('span', { class: 'sub-label', text: '付箋' }), colorRow(STICKY, ED.stickyColor, (v) => { ED.stickyColor = v; }),
      hint('貼りたい場所をクリック'));
  } else if (t === 'shape') {
    const cfg = ED.shape;
    s.append(el('span', { class: 'sub-label', text: '図形' }),
      seg(SHAPES, cfg.kind, (v) => { cfg.kind = v; }),
      colorRow(INK, cfg.color, (v) => { cfg.color = v; }),
      seg(PEN_W, cfg.width, (v) => { cfg.width = v; }),
      OPEN_SHAPES.has(cfg.kind) ? null : seg(FILLS, cfg.fill, (v) => { cfg.fill = v; }),
      hint('ドラッグで描きます（Shift で正円・正方形、直線は15°ずつ）。クリックだけで決まった大きさに置けます'));
  } else if (t === 'lasso' || ED.lasso) {
    renderLassoSub(s);
  } else if (sel) {
    renderItemSub(s, sel.page, sel.it);
  } else {
    s.append(hint('ツールを選んでページに書き込みます。ダブルクリックでテキストボックス。線や図形はクリックで選べます。選んだものは赤いゴミ箱ボタンか Delete キーで削除できます。'));
  }
}
function renderItemSub(s, page, it) {
  s.append(el('span', { class: 'sub-label', text: ITEM_LABEL[it.type] }));
  if (it.locked) {
    s.append(el('span', { class: 'sub-hint' }, icon('lock'), ' 固定中です。動かしたり消したりするには固定を解除してください。'),
      el('span', { class: 'spacer' }),
      toggleBtn('unlock', '固定を解除', false, () => { it.locked = false; commit(); renderPage(page); renderSub(); }));
    return;
  }
  const restyle = (fn) => (v) => { fn(v); commit(); renderPage(page); };
  if (it.type === 'text' || it.type === 'check') s.append(seg(TEXT_SIZES, it.size, restyle((v) => { it.size = v; ED.textSize = v; })), colorRow(INK, it.color, restyle((v) => { it.color = v; ED.textColor = v; })));
  if (it.type === 'sticky') s.append(colorRow(STICKY, stickyBg(it.color), restyle((v) => { it.color = v; ED.stickyColor = v; })),
    seg(TEXT_SIZES.slice(0, 3), it.size, restyle((v) => { it.size = v; })));
  if (TEXTY.has(it.type)) {
    s.append(toggleBtn('link', 'URL判定', it.urls !== false, () => { it.urls = it.urls === false; commit(); renderPage(page); renderSub(); }, '文字の中の URL をクリックできるリンクにする'),
      el('button', { class: 'btn small', type: 'button', onclick: () => editItemTags(page, it) }, icon('tag'), it.tags?.length ? 'タグ: ' + it.tags.map((x) => '#' + x).join(' ') : 'タグを付ける'));
  }
  if (it.type === 'select') {
    s.append(seg(TEXT_SIZES.slice(0, 3), it.size, restyle((v) => { it.size = v; })),
      el('button', { class: 'btn small', type: 'button', text: '選択肢を編集', onclick: async () => {
        const v = await dialog({ title: 'プルダウンの選択肢', fields: [{ key: 'opts', type: 'textarea', label: '選択肢（1行に1つ）', value: it.options.join('\n') }], ok: '保存' });
        if (!v || !ED) return;
        const opts = v.opts.split('\n').map((x) => x.trim()).filter(Boolean);
        if (!opts.length) { toast('選択肢を1つ以上入れてください'); return; }
        it.options = opts; if (!opts.includes(it.value)) it.value = '';
        commit(); renderPage(page);
      } }));
  }
  if (it.type === 'link') {
    const sl = el('select', { class: 'sub-select', 'aria-label': '移動先のメモファイル' }, linkOptions(it.target).map(([v, l]) => el('option', { value: v, text: l, selected: v === it.target })));
    sl.addEventListener('change', () => { it.target = sl.value; commit(); renderPage(page); });
    const lb = el('input', { class: 'sub-input', value: it.label || '', placeholder: 'ボタンの文字（空なら移動先の名前）', 'aria-label': 'ボタンの文字' });
    lb.addEventListener('change', () => { it.label = lb.value.trim(); commit(); renderPage(page); });
    s.append(sl, lb, seg(TEXT_SIZES.slice(0, 3), it.size, restyle((v) => { it.size = v; })),
      el('button', { class: 'btn small', type: 'button', onclick: () => openLink(it) }, icon('open'), '開く'));
  }
  s.append(el('span', { class: 'spacer' }),
    iconBtn('rotL', '左に15°回転', () => { it.rot = r1(((it.rot || 0) - 15) % 360); commit(); renderPage(page); }, 'sm'),
    iconBtn('rotR', '右に15°回転', () => { it.rot = r1(((it.rot || 0) + 15) % 360); commit(); renderPage(page); }, 'sm'),
    iconBtn('front', '前面へ', () => { page.items = page.items.filter((x) => x !== it).concat(it); commit(); renderPage(page); }, 'sm'),
    iconBtn('back2', '背面へ', () => { page.items = [it, ...page.items.filter((x) => x !== it)]; commit(); renderPage(page); }, 'sm'),
    iconBtn('copy', '複製', () => duplicateItem(page, it), 'sm'),
    iconBtn('lock', '固定', () => { it.locked = true; if (ED.editId === it.id) document.activeElement?.blur(); commit(); renderPage(page); renderSub(); }, 'sm'),
    iconBtn('trash', '削除（Delete）', () => deleteSelected(), 'sm'));
}
async function editItemTags(page, it) {
  const v = await dialog({ title: 'タグ', note: 'スペースか「、」で区切ります。文字の中に #タグ と書いてもタグになります。', fields: [{ key: 'tags', label: 'タグ', value: (it.tags || []).join(' '), placeholder: '例: 仕事 アイデア' }], ok: '保存' });
  if (!v || !ED) return;
  it.tags = parseTags(v.tags);
  commit(); renderPage(page); renderSub(); renderNav();
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
  if (s.it.locked) { toast('固定されています。消すには固定を解除してください'); return; }
  s.page.items = s.page.items.filter((x) => x !== s.it);
  ED.editId = null;
  itemDiv(s.it.id)?.remove();
  select(null); commit(); renderNav();
}
function duplicateItem(page, it) {
  const { w, h } = dims(page);
  const c = { ...JSON.parse(JSON.stringify(it)), id: uid(), x: clamp(it.x + 28, 0, w - 40), y: clamp(it.y + 28, 0, h - 40), locked: false };
  page.items.push(c);
  commit(); renderPage(page); select(page.id, c.id);
}
/* 文字の入力: 表示用の .txt を入力欄に入れ替える */
function startEditing(page, it) {
  if (!ED || it.locked) return;
  const d = itemDiv(it.id);
  const view = d?.querySelector('.txt');
  if (!view) return;
  const ta = el('textarea', { value: it.text || '', rows: 1, spellcheck: 'false', placeholder: PLACEHOLDER[it.type], 'aria-label': ITEM_LABEL[it.type] });
  view.replaceWith(ta);
  ED.editId = it.id;
  d.classList.add('editing');
  if (it.type !== 'sticky') autosizeText(ta);
  ta.focus({ preventScroll: true });
  const n = ta.value.length; ta.setSelectionRange(n, n);
}
function stopEditing(page, it, d, ta) {
  if (!ED || ED.editId !== it.id) return;
  ED.editId = null;
  d.classList.remove('editing');
  if (it.type === 'text' && !it.text.trim() && page.items.includes(it)) {
    page.items = page.items.filter((x) => x !== it);
    d.remove();
    if (ED.sel?.itemId === it.id) select(null);
  } else {
    ta.replaceWith(textView(it));
    d.querySelector('.item-tags')?.remove();
    const c = tagChips(it); if (c) d.querySelector('.h-move')?.before(c);
  }
  commit();
  renderNav();
}

/* --- ページ上の操作 --- */
function localizer(stage) {
  const r = stage.getBoundingClientRect();
  const s = r.width / (+stage.dataset.w || PAGE_W);
  return (e) => ({ x: (e.clientX - r.left) / s, y: (e.clientY - r.top) / s, s });
}
function toLocal(e, stage) { return localizer(stage)(e); }
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
  root.addEventListener('click', (e) => {
    const tag = e.target.closest('.stage .tag');
    if (tag && ED.tool === 'select' && !ED.editId) { e.preventDefault(); searchFor('#' + tag.dataset.tag); }
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
    if (it.type !== 'sticky') autosizeText(ta);
    scheduleSave(); commitSoon(); updateHist();
  });
  root.addEventListener('change', (e) => {
    const c = e.target;
    if (!c.classList?.contains('ctl')) return;
    const d = c.closest('.item'), stage = c.closest('.stage');
    const it = pageById(stage.dataset.page)?.items.find((x) => x.id === d.dataset.id);
    if (!it) return;
    if (c.type === 'checkbox') { it.checked = c.checked; d.classList.toggle('checked', c.checked); } else it.value = c.value;
    commit();
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
  if (tool === 'shape') { e.preventDefault(); return drawShape(e, stage, page, pt); }
  const lb = e.target.closest('.lasso-box');
  if (lb && ED.lasso?.pageId === page.id && (tool === 'lasso' || tool === 'select')) { e.preventDefault(); return lassoTransform(e, stage, page, pt, lb); }
  if (tool === 'lasso') { e.preventDefault(); return startLasso(e, stage, page, pt); }
  if (e.target.closest('a.url')) return;                      // リンクはそのまま開く
  if (e.target.closest('.tag') && !e.target.closest('.editing')) return;
  const d = e.target.closest('.item');
  if (d) { if (ED.lasso) clearLasso(); return onItemDown(e, stage, page, d, pt); }
  if (document.activeElement?.closest?.('.stage')) document.activeElement.blur();
  if (tool === 'text' || tool === 'sticky') { e.preventDefault(); createItem(page, tool, pt); setTool('select'); return; }
  // 選択ツールで線や図形をクリック → その線を選ぶ（そのままドラッグで移動もできる）
  if (ED.lasso) clearLasso();
  const hit = [...page.strokes].reverse().find((x) => hitStroke(x, pt, x.width / 2 + 8) || (x.fill && x.pts.length > 2 && inPoly(pt.x, pt.y, x.pts)));
  if (hit) {
    e.preventDefault();
    select(null);
    ED.lasso = { pageId: page.id, strokes: new Set([hit.id]), items: new Set() };
    drawLassoBox(); renderSub();
    const box = stage.querySelector('.lasso-box');
    if (box && !hit.locked) lassoTransform(e, stage, page, pt, box);
    return;
  }
  select(null);
  renderSub();
}
/* --- 図形（四角・円・三角・ひし形・星・直線・矢印）。線として描くので消しゴム・範囲選択・固定がそのまま使える --- */
function shapePts(kind, a, b, width = 3) {
  const x0 = Math.min(a[0], b[0]), x1 = Math.max(a[0], b[0]), y0 = Math.min(a[1], b[1]), y1 = Math.max(a[1], b[1]);
  const w = x1 - x0, h = y1 - y0, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  const close = (p) => [...p, p[0].slice()];
  switch (kind) {
    case 'rect': return close([[x0, y0], [x1, y0], [x1, y1], [x0, y1]]);
    case 'round': {
      const r = Math.min(w, h) * 0.2, out = [];
      const arc = (ccx, ccy, from) => { for (let i = 0; i <= 8; i++) { const t = from + (i / 8) * (Math.PI / 2); out.push([ccx + Math.cos(t) * r, ccy + Math.sin(t) * r]); } };
      arc(x1 - r, y0 + r, -Math.PI / 2); arc(x1 - r, y1 - r, 0); arc(x0 + r, y1 - r, Math.PI / 2); arc(x0 + r, y0 + r, Math.PI);
      return close(out);
    }
    case 'ellipse': { const out = []; for (let i = 0; i < 96; i++) { const t = (i / 96) * Math.PI * 2; out.push([cx + Math.cos(t) * w / 2, cy + Math.sin(t) * h / 2]); } return close(out); }
    case 'tri': return close([[cx, y0], [x1, y1], [x0, y1]]);
    case 'diamond': return close([[cx, y0], [x1, cy], [cx, y1], [x0, cy]]);
    case 'star': {
      const out = [];
      for (let i = 0; i < 10; i++) { const t = -Math.PI / 2 + (i * Math.PI) / 5, k = i % 2 ? 0.4 : 1; out.push([cx + Math.cos(t) * (w / 2) * k, cy + 0.08 * h + Math.sin(t) * (h / 2) * k * 1.05]); }
      return close(out);
    }
    case 'line': return [a.slice(), b.slice()];
    case 'arrow': {
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
      const hl = Math.min(len * 0.45, clamp(len * 0.22, 14, 44) + width * 1.5), sp = 0.48;
      const h1 = [b[0] - Math.cos(ang - sp) * hl, b[1] - Math.sin(ang - sp) * hl], h2 = [b[0] - Math.cos(ang + sp) * hl, b[1] - Math.sin(ang + sp) * hl];
      return [a.slice(), b.slice(), h1, b.slice(), h2];
    }
  }
  return [a, b];
}
function drawShape(e, stage, page, pt) {
  const cfg = ED.shape, kind = cfg.kind;
  const loc = localizer(stage);
  const a = [pt.x, pt.y];
  const s = { id: uid(), kind: 'pen', shape: kind, color: cfg.color, width: cfg.width, pts: [a.slice()], sharp: true };
  if (!OPEN_SHAPES.has(kind) && cfg.fill !== 'none') { s.fill = cfg.color; s.fillA = cfg.fill === 'soft' ? 0.22 : 1; }
  if (kind === 'arrow') s.join = 'round';
  const path = strokeEl(s);
  stage.querySelector('.ink').append(path);
  let end = null;
  track(e, (ev) => {
    const p = loc(ev);
    let b = [p.x, p.y];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    if (ev.shiftKey) {
      if (OPEN_SHAPES.has(kind)) b = snapAngle(a, b, Math.PI / 12);
      else { const m = Math.max(Math.abs(dx), Math.abs(dy)); b = [a[0] + Math.sign(dx || 1) * m, a[1] + Math.sign(dy || 1) * m]; }
    }
    end = b;
    s.pts = shapePts(kind, a, b, s.width).map((q) => q.map(r1));
    path.setAttribute('d', strokeD(s.pts, true));
  }, () => {
    if (!end || Math.hypot(end[0] - a[0], end[1] - a[1]) < 8) {      // クリックだけなら決まった大きさで置く
      const hw = OPEN_SHAPES.has(kind) ? 100 : 80, hh = kind === 'ellipse' || kind === 'star' ? 80 : OPEN_SHAPES.has(kind) ? 0 : 60;
      s.pts = shapePts(kind, [a[0] - hw, a[1] - hh], [a[0] + hw, a[1] + hh], s.width).map((q) => q.map(r1));
      path.setAttribute('d', strokeD(s.pts, true));
    }
    page.strokes.push(s);
    commit();
  });
}
function createItem(page, type, pt) {
  const { w, h } = dims(page);
  let it;
  if (type === 'text') {
    const x = clamp(pt.x - 8, 0, w - 120);
    it = { id: uid(), type: 'text', x: Math.round(x), y: Math.round(clamp(pt.y - ED.textSize * 0.9, 0, h - 60)), w: Math.round(Math.min(420, w - x)), text: '', size: ED.textSize, color: ED.textColor };
  } else {
    it = { id: uid(), type: 'sticky', x: Math.round(clamp(pt.x - 120, 0, w - 240)), y: Math.round(clamp(pt.y - 20, 0, h - 220)), w: 240, h: 220, text: '', size: 24, color: ED.stickyColor };
  }
  page.items.push(it);
  renderPage(page);
  select(page.id, it.id);
  if (type === 'sticky') commit();
  startEditing(page, it);
}
function openLink(it) {
  const f = fileById(it.target);
  if (!fileAlive(f)) { toast('リンク先のメモファイルが見つかりません（ゴミ箱にある場合は元に戻してください）'); return; }
  go('#/f/' + f.id);
}
function onItemDown(e, stage, page, d, pt) {
  const it = page.items.find((x) => x.id === d.dataset.id);
  if (!it) return;
  if (e.target.closest(".h-del")) { e.preventDefault(); if (ED.editId === it.id) ED.editId = null; select(page.id, it.id); deleteSelected(); return; }
  const handle = e.target.closest('.h-resize') ? 'resize' : e.target.closest('.h-move') ? 'move' : null;
  if (!handle && ED.editId === it.id && e.target.tagName === 'TEXTAREA') return;   // 入力中の文字の操作はそのまま
  if (ED.editId && ED.editId !== it.id) document.activeElement?.blur();
  if (!handle && e.target.closest('.ctl')) { if (ED.sel?.itemId !== it.id) select(page.id, it.id); return; }   // チェック・プルダウンはそのまま使える
  e.preventDefault();
  if (ED.sel?.itemId !== it.id) select(page.id, it.id);
  const onGrip = !!e.target.closest('.grip');
  if (it.locked) {                                             // 固定中は動かさない（リンクは開ける）
    track(e, () => {}, () => { if (it.type === 'link' && !onGrip) openLink(it); });
    return;
  }
  const { w: W, h: H } = dims(page);
  const r0 = stage.getBoundingClientRect();
  const s0 = r0.width / W;
  const o = { x: it.x, y: it.y, w: it.w, h: it.h ?? d.offsetHeight };
  const ratio = it.type === 'image' ? it.h / it.w : 0;
  let moved = false;
  d.classList.add('dragging');
  track(e, (ev) => {
    const dx = (ev.clientX - e.clientX) / s0, dy = (ev.clientY - e.clientY) / s0;
    if (!moved && Math.hypot(dx, dy) * s0 < 4) return;
    moved = true;
    if (handle === 'resize') {
      if (it.type === 'sticky') { it.w = Math.round(clamp(o.w + dx, 100, W)); it.h = Math.round(clamp(o.h + dy, 80, H)); }
      else if (it.type === 'image') { it.w = Math.round(clamp(o.w + dx, 30, W * 1.5)); it.h = Math.round(it.w * ratio); }
      else it.w = Math.round(clamp(o.w + dx, 80, W * 1.5));
      placeItem(d, it);
      const ta = d.querySelector('textarea'); if (ta && it.type !== 'sticky') autosizeText(ta);
    } else {
      // 動かしている間は transform だけ変える（レイアウトを計算し直さないので速い）
      it.x = Math.round(clamp(o.x + dx, 40 - it.w, W - 40));
      it.y = Math.round(clamp(o.y + dy, -20, H - 40));
      placeItem(d, { ...it, x: o.x, y: o.y }, it.x - o.x, it.y - o.y);
    }
  }, () => {
    d.classList.remove('dragging');
    if (moved) { placeItem(d, it); commit(); if (ED?.editId === it.id) d.querySelector('textarea')?.focus({ preventScroll: true }); }
    else if (!handle) {
      if (it.type === 'link' && !onGrip) openLink(it);
      else if (TEXTY.has(it.type) && ED?.editId !== it.id) startEditing(page, it);
    }
  });
}

/* --- ペン・マーカー（定規モードで線を整える） --- */
function pathLen(p) { let l = 0; for (let i = 1; i < p.length; i++) l += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); return l; }
function distSeg(px, py, a, b) {
  const vx = b[0] - a[0], vy = b[1] - a[1];
  const l = vx * vx + vy * vy;
  const t = l ? clamp(((px - a[0]) * vx + (py - a[1]) * vy) / l, 0, 1) : 0;
  return Math.hypot(px - (a[0] + t * vx), py - (a[1] + t * vy));
}
function rdp(pts, eps) {
  if (pts.length < 3) return pts.slice();
  const a = pts[0], b = pts[pts.length - 1];
  let dmax = 0, idx = 0;
  for (let i = 1; i < pts.length - 1; i++) { const d = distSeg(pts[i][0], pts[i][1], a, b); if (d > dmax) { dmax = d; idx = i; } }
  if (dmax > eps) return rdp(pts.slice(0, idx + 1), eps).slice(0, -1).concat(rdp(pts.slice(idx), eps));
  return [a, b];
}
function snapAngle(a, b, step) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const ang = Math.round(Math.atan2(b[1] - a[1], b[0] - a[0]) / step) * step;
  return [r1(a[0] + Math.cos(ang) * len), r1(a[1] + Math.sin(ang) * len)];
}
function snapLine(a, b) {
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const near = Math.round(ang / (Math.PI / 4)) * (Math.PI / 4);
  return Math.abs(ang - near) < (5 * Math.PI) / 180 ? [a, snapAngle(a, b, Math.PI / 4)] : [a, b];
}
function catmull(P, closed) {
  const n = P.length, out = [];
  const get = (i) => (closed ? P[(i + n) % n] : P[clamp(i, 0, n - 1)]);
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
    const steps = Math.max(4, Math.ceil(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / 6));
    for (let t = 0; t < steps; t++) {
      const u = t / steps, u2 = u * u, u3 = u2 * u;
      out.push([0, 1].map((k) => r1(0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * u + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * u2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * u3))));
    }
  }
  out.push(closed ? out[0].slice() : P[n - 1].map(r1));
  return out;
}
function dropFlat(c) {
  let changed = true;
  while (changed && c.length > 3) {
    changed = false;
    for (let i = 0; i < c.length; i++) {
      const a = c[(i - 1 + c.length) % c.length], b = c[i], d = c[(i + 1) % c.length];
      const t1 = Math.atan2(b[1] - a[1], b[0] - a[0]), t2 = Math.atan2(d[1] - b[1], d[0] - b[0]);
      let turn = Math.abs(t2 - t1); if (turn > Math.PI) turn = 2 * Math.PI - turn;
      if (turn < (28 * Math.PI) / 180) { c = c.filter((_, j) => j !== i); changed = true; break; }
    }
  }
  return c;
}
/* 定規モード: 手で描いた線を、直線・多角形・円（楕円）・なめらかな曲線のどれかに整える */
function beautify(pts) {
  if (pts.length < 3) return { pts };
  const a = pts[0], b = pts[pts.length - 1];
  const len = pathLen(pts), chord = Math.hypot(b[0] - a[0], b[1] - a[1]);
  if (len < 12) return { pts };
  let dev = 0;
  for (const p of pts) dev = Math.max(dev, distSeg(p[0], p[1], a, b));
  if (chord > len * 0.85 && dev < Math.max(8, chord * 0.07)) return { pts: snapLine(a, b).map((q) => q.map(r1)), sharp: true };
  const closed = len > 120 && chord < Math.max(36, len * 0.15);
  if (closed) {
    let c = rdp(pts, Math.max(12, len * 0.03));
    if (c.length > 2 && Math.hypot(c[c.length - 1][0] - c[0][0], c[c.length - 1][1] - c[0][1]) < Math.max(36, len * 0.15)) c = c.slice(0, -1);
    c = dropFlat(c);
    if (c.length >= 3 && c.length <= 6) {
      const edges = c.map((q, i) => [q, c[(i + 1) % c.length]]);
      const err = pts.reduce((s, p) => s + Math.min(...edges.map(([u, v]) => distSeg(p[0], p[1], u, v))), 0) / pts.length;
      if (err < Math.max(6, len * 0.014)) {
        if (c.length === 4) {                     // ほぼ水平・垂直の四角はきれいな長方形にする
          const axis = edges.every(([u, v]) => { const t = Math.abs(Math.atan2(v[1] - u[1], v[0] - u[0])) % (Math.PI / 2); return t < 0.17 || t > Math.PI / 2 - 0.17; });
          if (axis) {
            const xs = c.map((q) => q[0]), ys = c.map((q) => q[1]);
            const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
            return { pts: [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]].map((q) => q.map(r1)), sharp: true };
          }
        }
        return { pts: [...c, c[0]].map((q) => q.map(r1)), sharp: true };
      }
    }
    const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const rx = (Math.max(...xs) - Math.min(...xs)) / 2, ry = (Math.max(...ys) - Math.min(...ys)) / 2;
    if (rx > 8 && ry > 8) {
      const err = pts.reduce((s, p) => s + Math.abs(Math.hypot((p[0] - cx) / rx, (p[1] - cy) / ry) - 1), 0) / pts.length;
      if (err < 0.13) {
        const round = Math.abs(rx - ry) < Math.max(rx, ry) * 0.12;     // ほぼ円ならまん丸に
        const R = (rx + ry) / 2;
        const out = [];
        for (let i = 0; i <= 96; i++) { const t = (i / 96) * Math.PI * 2; out.push([r1(cx + Math.cos(t) * (round ? R : rx)), r1(cy + Math.sin(t) * (round ? R : ry))]); }
        return { pts: out, sharp: true };
      }
    }
  }
  // それ以外: 角（急に曲がる所）で区切り、区間ごとに「まっすぐなら直線」「曲がっていればなめらかな曲線」にする
  const R = resample(pts, clamp(len / 90, 2.5, 7));
  const cuts = [0, ...cornerIdx(R), R.length - 1];
  let out = [];
  for (let i = 0; i < cuts.length - 1; i++) {
    const piece = fitPiece(R.slice(cuts[i], cuts[i + 1] + 1));
    out = out.length ? out.concat(piece.slice(1)) : piece;
  }
  if (out.length === 2) out = snapLine(out[0], out[1]);
  if (closed) out[out.length - 1] = out[0].slice();
  return { pts: out.map((q) => q.map(r1)), sharp: true };
}
/* 線を同じ間隔の点に並べ直す */
function resample(pts, step) {
  const out = [pts[0].slice()];
  let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    let a = pts[i - 1];
    const b = pts[i];
    let d = Math.hypot(b[0] - a[0], b[1] - a[1]);
    while (d > 0 && acc + d >= step) {
      const t = (step - acc) / d;
      const q = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      out.push(q); a = q; d = Math.hypot(b[0] - a[0], b[1] - a[1]); acc = 0;
    }
    acc += d;
  }
  const l = pts[pts.length - 1], o = out[out.length - 1];
  if (Math.hypot(l[0] - o[0], l[1] - o[1]) > step * 0.3) out.push(l.slice()); else out[out.length - 1] = l.slice();
  return out;
}
/* 急に向きが変わる点（角）を見つける */
function cornerIdx(R) {
  const k = 4, n = R.length, turn = new Array(n).fill(0);
  for (let i = k; i < n - k; i++) {
    const a = R[i - k], b = R[i], c = R[i + k];
    let t = Math.abs(Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(b[1] - a[1], b[0] - a[0]));
    if (t > Math.PI) t = 2 * Math.PI - t;
    turn[i] = t;
  }
  const out = [];
  for (let i = k; i < n - k; i++) {
    if (turn[i] < 0.9 || turn[i] < turn[i - 1] || turn[i] < turn[i + 1]) continue;   // 約50°以上曲がる所だけ
    if (out.length && i - out[out.length - 1] <= k) { if (turn[i] > turn[out[out.length - 1]]) out[out.length - 1] = i; }
    else out.push(i);
  }
  return out;
}
/* 角と角の間: ほぼまっすぐなら直線、そうでなければ揺れをならしてなめらかな曲線に */
function fitPiece(P) {
  const a = P[0], b = P[P.length - 1];
  const chord = Math.hypot(b[0] - a[0], b[1] - a[1]);
  let dev = 0;
  for (const p of P) dev = Math.max(dev, distSeg(p[0], p[1], a, b));
  if (P.length < 4 || dev < Math.max(5, chord * 0.06)) return [a, b];
  let Q = P.map((q) => q.slice());
  for (let it = 0; it < 10; it++) Q = Q.map((q, i) => (i === 0 || i === Q.length - 1 ? q : [(Q[i - 1][0] + 2 * q[0] + Q[i + 1][0]) / 4, (Q[i - 1][1] + 2 * q[1] + Q[i + 1][1]) / 4]));
  const simp = rdp(Q, Math.max(1.5, pathLen(Q) * 0.006));
  return simp.length <= 2 ? [a, b] : catmull(simp, false);
}
function drawStroke(e, stage, page, pt) {
  const cfg = ED[ED.tool];
  const loc = localizer(stage);
  const s = { id: uid(), kind: ED.tool, color: cfg.color, width: cfg.width, pts: [[r1(pt.x), r1(pt.y)]] };
  const path = strokeEl(s);
  stage.querySelector('.ink').append(path);
  let straight = null;
  const add = (ev) => {
    const p = loc(ev);
    const last = s.pts[s.pts.length - 1];
    if (Math.hypot(p.x - last[0], p.y - last[1]) < 1.2) return;
    s.pts.push([r1(p.x), r1(p.y)]);
  };
  track(e, (ev) => {
    if (ED.ruler && ev.shiftKey) {
      const p = loc(ev);
      straight = snapAngle(s.pts[0], [p.x, p.y], Math.PI / 12);
      path.setAttribute('d', strokeD([s.pts[0], straight], true));
      return;
    }
    straight = null;
    (ev.getCoalescedEvents?.() || [ev]).forEach(add);
    path.setAttribute('d', strokeD(s.pts));
  }, () => {
    if (ED.ruler) {
      if (straight) { s.pts = [s.pts[0], straight]; s.sharp = true; }
      else { const b = beautify(s.pts); s.pts = b.pts; if (b.sharp) s.sharp = true; }
      path.setAttribute('d', strokeD(s.pts, s.sharp));
    }
    page.strokes.push(s);
    commit();
  });
}

/* --- 消しゴム（太さを選べて、なぞった部分だけ消せる。固定した線は消えない） --- */
function densify(pts, step) {
  if (pts.length < 2) return pts.slice();
  const out = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step));
    for (let k = 1; k <= n; k++) out.push([r1(a[0] + ((b[0] - a[0]) * k) / n), r1(a[1] + ((b[1] - a[1]) * k) / n)]);
  }
  return out;
}
function hitStroke(s, p, r) {
  const pts = s.pts;
  if (pts.length === 1) return Math.hypot(p.x - pts[0][0], p.y - pts[0][1]) < r;
  for (let i = 1; i < pts.length; i++) if (distSeg(p.x, p.y, pts[i - 1], pts[i]) < r) return true;
  return false;
}
function eraseAt(page, ink, p, R, whole) {
  let changed = false, lockedHit = false;
  const out = [];
  for (const s of page.strokes) {
    const r = R + s.width / 2;
    if (!hitStroke(s, p, r)) { out.push(s); continue; }
    if (s.locked) { lockedHit = true; out.push(s); continue; }
    changed = true;
    const old = ink.querySelector(`[data-id="${s.id}"]`);
    if (!whole) {
      const runs = [];
      let run = [];
      for (const q of densify(s.pts, 3)) {
        if (Math.hypot(q[0] - p.x, q[1] - p.y) < r) { if (run.length > 1) runs.push(run); run = []; } else run.push(q);
      }
      if (run.length > 1) runs.push(run);
      for (const pts of runs) {
        const n = { id: uid(), kind: s.kind, color: s.color, width: s.width, pts, sharp: s.sharp || undefined, join: s.join };
        const pe = strokeEl(n);
        if (old) old.before(pe); else ink.append(pe);
        out.push(n);
      }
    }
    old?.remove();
  }
  page.strokes = out;
  return { changed, lockedHit };
}
function erase(e, stage, page, pt) {
  const R = ED.eraser.size / 2, whole = ED.eraser.mode === 'stroke';
  const loc = localizer(stage);
  const ink = stage.querySelector('.ink');
  const cur = svgEl('circle', { class: 'eraser-cursor', cx: pt.x, cy: pt.y, r: R });
  ink.append(cur);
  let changed = false, lockedHit = false;
  const hit = (p) => {
    cur.setAttribute('cx', p.x); cur.setAttribute('cy', p.y);
    const r = eraseAt(page, ink, p, R, whole);
    changed ||= r.changed; lockedHit ||= r.lockedHit;
  };
  hit(pt);
  track(e, (ev) => (ev.getCoalescedEvents?.() || [ev]).forEach((x) => hit(loc(x))), () => {
    cur.remove();
    if (changed) commit();
    if (lockedHit) toast('固定された線は消せません（範囲選択で固定を解除できます）');
  });
}

/* --- 範囲選択（囲んで選ぶ → 色・角度・大きさ・固定・複製・削除） --- */
function inPoly(x, y, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}
function clearLasso() { if (!ED) return; ED.lasso = null; ED.pagesBox.querySelectorAll('.lasso-box').forEach((n) => n.remove()); }
function lassoParts(page, L) {
  return { strokes: page.strokes.filter((s) => L.strokes.has(s.id)), items: page.items.filter((i) => L.items.has(i.id)) };
}
function groupBox(page, L) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const { strokes, items } = lassoParts(page, L);
  for (const s of strokes) for (const q of s.pts) { const r = s.width / 2; x0 = Math.min(x0, q[0] - r); y0 = Math.min(y0, q[1] - r); x1 = Math.max(x1, q[0] + r); y1 = Math.max(y1, q[1] + r); }
  for (const it of items) { const h = itemH(it); x0 = Math.min(x0, it.x); y0 = Math.min(y0, it.y); x1 = Math.max(x1, it.x + it.w); y1 = Math.max(y1, it.y + h); }
  if (!isFinite(x0)) return null;
  const pad = 10;
  return { x: x0 - pad, y: y0 - pad, w: x1 - x0 + pad * 2, h: y1 - y0 + pad * 2 };
}
function groupLockState(page, L) {
  const { strokes, items } = lassoParts(page, L);
  const all = [...strokes, ...items];
  return { any: all.some((x) => x.locked), all: all.length > 0 && all.every((x) => x.locked), count: all.length };
}
function drawLassoBox() {
  if (!ED) return;
  ED.pagesBox.querySelectorAll('.lasso-box').forEach((n) => n.remove());
  const L = ED.lasso;
  if (!L) return;
  const page = pageById(L.pageId), st = stageOf(L.pageId);
  if (!page || !st) { ED.lasso = null; return; }
  const b = groupBox(page, L);
  if (!b) { ED.lasso = null; return; }
  L.box = b;
  const lk = groupLockState(page, L);
  const box = el("div", { class: "lasso-box" + (lk.any ? " locked" : "") + (b.y < 45 ? " rot-below" : "") },
    el('div', { class: 'lb-rot', title: '回して角度を変える（Shift で15°ずつ）' }, icon('rotR')),
    el('div', { class: 'lb-scale', title: '大きさを変える' }), el("div", { class: "lb-del", title: "削除" }, icon("trash")),
    lk.any ? el('div', { class: 'lb-lock', title: '固定中' }, icon('lock')) : null);
  Object.assign(box.style, { left: b.x + 'px', top: b.y + 'px', width: b.w + 'px', height: b.h + 'px' });
  st.append(box);
}
function startLasso(e, stage, page, pt) {
  clearLasso();
  if (ED.sel) select(null);
  const loc = localizer(stage);
  const poly = [[pt.x, pt.y]];
  const ink = stage.querySelector('.ink');
  const path = svgEl('path', { class: 'lasso-path', d: '' });
  ink.append(path);
  const tapItem = e.target.closest('.item');
  track(e, (ev) => {
    const p = loc(ev);
    const l = poly[poly.length - 1];
    if (Math.hypot(p.x - l[0], p.y - l[1]) < 3) return;
    poly.push([p.x, p.y]);
    path.setAttribute('d', 'M' + poly.map((q) => q.join(' ')).join('L') + 'Z');
  }, () => {
    path.remove();
    const L = { pageId: page.id, strokes: new Set(), items: new Set() };
    if (pathLen(poly) < 12) {                                   // タップ: その場所のものを1つ選ぶ
      if (tapItem) L.items.add(tapItem.dataset.id);
      else { const s = [...page.strokes].reverse().find((x) => hitStroke(x, pt, x.width / 2 + 8)); if (s) L.strokes.add(s.id); }
    } else {
      for (const s of page.strokes) { const n = s.pts.filter((q) => inPoly(q[0], q[1], poly)).length; if (n && n >= s.pts.length * 0.5) L.strokes.add(s.id); }
      for (const it of page.items) if (inPoly(it.x + it.w / 2, it.y + itemH(it) / 2, poly)) L.items.add(it.id);
    }
    if (L.strokes.size || L.items.size) { ED.lasso = L; drawLassoBox(); }
    renderSub();
  });
}
function groupSnapshot(page, L) {
  const { strokes, items } = lassoParts(page, L);
  return {
    strokes: new Map(strokes.map((s) => [s.id, s.pts.map((q) => q.slice())])),
    items: new Map(items.map((it) => [it.id, { x: it.x, y: it.y, w: it.w, h: it.h, hpx: itemH(it), rot: it.rot || 0, size: it.size }])),
  };
}
function applyGroup(page, L, snap, t) {
  const stage = stageOf(page.id);
  let f;
  if (t.rot != null) { const cs = Math.cos(t.rot), sn = Math.sin(t.rot), [cx, cy] = t.C; f = (q) => [cx + (q[0] - cx) * cs - (q[1] - cy) * sn, cy + (q[0] - cx) * sn + (q[1] - cy) * cs]; }
  else if (t.scale != null) { const k = t.scale, [cx, cy] = t.C; f = (q) => [cx + (q[0] - cx) * k, cy + (q[1] - cy) * k]; }
  else f = (q) => [q[0] + t.dx, q[1] + t.dy];
  for (const s of page.strokes) {
    const o = snap.strokes.get(s.id);
    if (!o) continue;
    s.pts = o.map((q) => f(q).map(r1));
    stage?.querySelector(`.ink [data-id="${s.id}"]`)?.setAttribute('d', strokeD(s.pts, s.sharp));
  }
  for (const it of page.items) {
    const o = snap.items.get(it.id);
    if (!o) continue;
    const k = t.scale ?? 1;
    const w = o.w * k, hp = o.hpx * k;
    const c = f([o.x + o.w / 2, o.y + o.hpx / 2]);
    it.w = Math.round(w);
    if (o.h != null) it.h = Math.round(o.h * k);
    if (o.size && t.scale != null) it.size = Math.max(8, Math.round(o.size * k));
    if (t.rot != null) it.rot = r1(((o.rot + (t.rot * 180) / Math.PI) % 360 + 360) % 360);
    it.x = Math.round(c[0] - w / 2); it.y = Math.round(c[1] - hp / 2);
    const d = itemDiv(it.id);
    if (d) { placeItem(d, it); if (it.size) d.style.fontSize = it.size + 'px'; }
  }
}
function lassoTransform(e, stage, page, pt, lb) {
  const L = ED.lasso;
  if (e.target.closest(".lb-del")) { lassoDelete(); return; }
  if (groupLockState(page, L).any) { toast('固定されています。動かすには「固定を解除」してください'); return; }
  const mode = e.target.closest('.lb-rot') ? 'rot' : e.target.closest('.lb-scale') ? 'scale' : 'move';
  const snap = groupSnapshot(page, L);
  const b = L.box, C = [b.x + b.w / 2, b.y + b.h / 2];
  const loc = localizer(stage);
  const a0 = Math.atan2(pt.y - C[1], pt.x - C[0]), d0 = Math.hypot(pt.x - C[0], pt.y - C[1]) || 1;
  let moved = false;
  track(e, (ev) => {
    const p = loc(ev);
    moved = true;
    if (mode === 'move') {
      const dx = p.x - pt.x, dy = p.y - pt.y;
      applyGroup(page, L, snap, { dx, dy });
      lb.style.transform = `translate(${dx}px, ${dy}px)`;
    } else if (mode === 'rot') {
      let th = Math.atan2(p.y - C[1], p.x - C[0]) - a0;
      if (ev.shiftKey) th = Math.round(th / (Math.PI / 12)) * (Math.PI / 12);
      applyGroup(page, L, snap, { rot: th, C });
      lb.style.transform = `rotate(${th}rad)`;
    } else {
      const k = clamp(Math.hypot(p.x - C[0], p.y - C[1]) / d0, 0.1, 10);
      applyGroup(page, L, snap, { scale: k, C });
      lb.style.transform = `scale(${k})`;
    }
  }, () => { if (moved) { commit(); renderPage(page); } else drawLassoBox(); });
}
function lassoRotate(deg) {
  const L = ED.lasso, page = pageById(L.pageId);
  const b = L.box;
  applyGroup(page, L, groupSnapshot(page, L), { rot: (deg * Math.PI) / 180, C: [b.x + b.w / 2, b.y + b.h / 2] });
  commit(); renderPage(page);
}
function renderLassoSub(s) {
  const L = ED.lasso;
  const page = L && pageById(L.pageId);
  if (!L || !page) {
    s.append(el('span', { class: 'sub-label', text: '範囲選択' }), hint('選びたい部分をぐるっと囲んでください。タップで1つだけ選べます。選んだあとは枠をドラッグで移動、上の丸で回転、右下の丸で拡大・縮小できます。'));
    return;
  }
  const lk = groupLockState(page, L);
  s.append(el('span', { class: 'sub-label', text: `範囲選択（${lk.count}個）` }));
  if (lk.any) {
    s.append(el('span', { class: 'sub-hint' }, icon('lock'), lk.all ? ' 固定中です' : ' 固定されたものが入っています'), el('span', { class: 'spacer' }),
      toggleBtn('unlock', '固定を解除', false, () => { setGroupLock(page, L, false); }));
    return;
  }
  const { strokes, items } = lassoParts(page, L);
  const first = strokes[0]?.color || items.find((i) => i.color)?.color;
  s.append(colorRow(INK, first, (v) => {
    for (const st of strokes) { st.color = v; if (st.fill) st.fill = v; }
    for (const it of items) if (it.type === 'text' || it.type === 'check' || it.type === 'sticky') it.color = v;
    commit(); renderPage(page);
  }),
  el('span', { class: 'spacer' }),
  iconBtn('rotL', '左に15°回転', () => lassoRotate(-15), 'sm'),
  iconBtn('rotR', '右に15°回転', () => lassoRotate(15), 'sm'),
  el('button', { class: 'btn small', type: 'button', text: '90°', title: '右に90°回転', onclick: () => lassoRotate(90) }),
  iconBtn('copy', '複製', () => lassoDuplicate(page, L), 'sm'),
  toggleBtn('lock', '固定', false, () => setGroupLock(page, L, true), '固定すると、解除するまで動かしたり消したりできません'),
  iconBtn('trash', '削除（Delete）', () => lassoDelete(), 'sm'));
}
function setGroupLock(page, L, on) {
  const { strokes, items } = lassoParts(page, L);
  for (const x of [...strokes, ...items]) { if (on) x.locked = true; else delete x.locked; }
  commit(); renderPage(page); renderSub();
  toast(on ? '固定しました。解除するまで動かしたり消したりできません' : '固定を解除しました');
}
function lassoDuplicate(page, L) {
  const { strokes, items } = lassoParts(page, L);
  const N = { pageId: page.id, strokes: new Set(), items: new Set() };
  for (const s of strokes) { const c = { ...s, id: uid(), pts: s.pts.map((q) => [q[0] + 24, q[1] + 24]) }; page.strokes.push(c); N.strokes.add(c.id); }
  for (const it of items) { const c = { ...JSON.parse(JSON.stringify(it)), id: uid(), x: it.x + 24, y: it.y + 24 }; page.items.push(c); N.items.add(c.id); }
  ED.lasso = N;
  commit(); renderPage(page); renderSub();
}
function lassoDelete() {
  const L = ED.lasso, page = L && pageById(L.pageId);
  if (!page) return;
  if (groupLockState(page, L).any) { toast('固定されたものは消せません。先に固定を解除してください'); return; }
  page.strokes = page.strokes.filter((s) => !L.strokes.has(s.id));
  page.items = page.items.filter((i) => !L.items.has(i.id));
  ED.lasso = null;
  commit(); renderPage(page); renderSub(); renderNav();
}

/* --- 機能アイテム（メモへ移動ボタン・チェックボックス・プルダウン） --- */
function linkOptions(exclude) {
  const out = [];
  for (const b of liveBoxes()) for (const fo of foldersOf(b.id)) for (const f of filesOf(b.id, fo.id)) {
    if (ED && f.id === ED.file.id && f.id !== exclude) continue;
    out.push([f.id, `${boxName(b)} › ${fo.name} › ${f.name}`]);
  }
  return out;
}
function funcMenu(anchor) {
  showPopover(anchor, [
    el('div', { class: 'pop-title', text: '機能アイテム' }),
    el('button', { class: 'menu-item', type: 'button', onclick: () => { closePopover(); addFuncItem('link'); } }, icon('link'), el('span', {}, 'メモへ移動ボタン', el('small', { text: '押すと別のメモファイルを開く' }))),
    el('button', { class: 'menu-item', type: 'button', onclick: () => { closePopover(); addFuncItem('check'); } }, icon('checkbox'), el('span', {}, 'チェックボックス', el('small', { text: 'やること・持ち物チェックに' }))),
    el('button', { class: 'menu-item', type: 'button', onclick: () => { closePopover(); addFuncItem('select'); } }, icon('dropdown'), el('span', {}, 'プルダウン', el('small', { text: '選択肢から1つ選ぶ' }))),
  ]);
}
async function addFuncItem(type) {
  if (!ED) return;
  const cur = currentPage();
  let it;
  if (type === 'link') {
    const opts = linkOptions();
    if (!opts.length) { toast('移動先にできるメモファイルがまだありません'); return; }
    const v = await dialog({ title: 'メモへ移動ボタン', fields: [
      { key: 'target', type: 'select', label: '移動先のメモファイル', value: opts[0][0], options: opts },
      { key: 'label', label: 'ボタンの文字（空なら移動先の名前）', placeholder: '例: 議事録を開く', maxlength: 60 },
    ], ok: '作成' });
    if (!v) return;
    it = { id: uid(), type: 'link', w: 340, target: v.target, label: v.label.trim(), size: 24 };
  } else if (type === 'check') {
    it = { id: uid(), type: 'check', w: 420, text: '', checked: false, size: ED.textSize, color: ED.textColor };
  } else {
    const v = await dialog({ title: 'プルダウンを作る', fields: [{ key: 'opts', type: 'textarea', label: '選択肢（1行に1つ）', value: '選択肢1\n選択肢2\n選択肢3' }], ok: '作成' });
    if (!v) return;
    const options = v.opts.split('\n').map((x) => x.trim()).filter(Boolean);
    if (!options.length) { toast('選択肢を1つ以上入れてください'); return; }
    it = { id: uid(), type: 'select', w: 320, options, value: '', size: 22 };
  }
  if (!ED || !ED.file.pages.includes(cur.page)) return;
  const { w } = dims(cur.page);
  it.x = Math.round(clamp(cur.cx - it.w / 2, 0, w - 60));
  it.y = Math.round(cur.cy - 30);
  cur.page.items.push(it);
  setTool('select');
  commit(); renderPage(cur.page); select(cur.page.id, it.id);
  if (type === 'check') startEditing(cur.page, it);
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
  const { w, h } = dims(page);
  const s = best.rect.width / w;
  const vTop = Math.max(best.rect.top, top), vBot = Math.min(best.rect.bottom, innerHeight);
  return { page, cx: w / 2, cy: clamp(((vTop + vBot) / 2 - best.rect.top) / s, 100, h - 100) };
}
async function addImages(files, page, pt) {
  if (!ED) return;
  const cur = page ? { page, cx: pt.x, cy: pt.y } : currentPage();
  const { w: W, h: H } = dims(cur.page);
  let last = null, n = 0;
  for (const f of files) {
    let id;
    try { id = await storeImage(f); } catch (err) { saveFailed(err); break; }
    const sz = await imageSize(f);
    let w = Math.min(520, sz.w), h = (w * sz.h) / sz.w;
    if (h > 680) { h = 680; w = (h * sz.w) / sz.h; }
    const it = { id: uid(), type: 'image', imageId: id, w: Math.round(w), h: Math.round(h), x: 0, y: 0 };
    it.x = Math.round(clamp(cur.cx - w / 2 + n * 24, 0, W - 40));
    it.y = Math.round(clamp(cur.cy - h / 2 + n * 24, 0, H - 40));
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
  commit(); renderPage(page); select(page.id, it.id); renderNav();
}

/* ===== ポップオーバー・メニュー ===== */
let pop = null;
function closePopover() { if (pop) { pop.remove(); pop = null; } }
function showPopover(anchor, content, cls = '') {
  closePopover();
  pop = el('div', { class: 'popover ' + cls, role: 'dialog', onclick: (e) => e.stopPropagation() }, content);
  document.body.append(pop);
  const r = anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : anchor;
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
      let inp;
      if (f.type === 'select') inp = el('select', { class: 'field-input' }, f.options.map(([v, l]) => el('option', { value: v, text: l, selected: v === f.value })));
      else if (f.type === 'textarea') inp = el('textarea', { class: 'field-input', rows: 6, value: f.value || '' });
      else inp = el('input', { class: 'field-input', value: f.value || '', placeholder: f.placeholder || '', maxlength: f.maxlength || 80 });
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
      page.items.push({ id: uid(), type: 'text', x: 60, y, w: 780, text: lines, size: 24, color: INK[0][0], tags: (n.labels || []).slice() });
      y += Math.ceil(lines.split('\n').reduce((a, l) => a + Math.max(1, Math.ceil(l.length / 30)), 0) * 36 + 30);
    }
    for (const imgId of n.images || []) {
      const rec = await DB.get('images', imgId).catch(() => null);
      if (!rec) continue;
      const sz = await imageSize(rec.blob);
      let w = Math.min(600, sz.w), h = (w * sz.h) / sz.w;
      if (h > 900) { h = 900; w = (h * sz.w) / sz.h; }
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
function normBox(b) { const t = Date.now(); return { id: String(b.id || uid()), name: cleanBoxName(b.name) || '名前なし', created: b.created || t, updated: b.updated || t, trashedAt: b.trashedAt || null }; }
function normFolder(f) { const t = Date.now(); return { id: String(f.id || uid()), boxId: String(f.boxId), name: String(f.name || 'フォルダ'), created: f.created || t, updated: f.updated || t, trashedAt: f.trashedAt || null }; }
function normFile(f) {
  const t = Date.now();
  const pages = (Array.isArray(f.pages) && f.pages.length ? f.pages : [newPage()]).map((p) => ({
    id: String(p.id || uid()),
    bg: PAPERS.some(([k]) => k === p.bg) ? p.bg : 'plain',
    paper: typeof p.paper === 'string' ? p.paper : PAPER_COLORS[0][0],
    orient: p.orient === 'land' ? 'land' : 'port',
    items: Array.isArray(p.items) ? p.items.filter((i) => ITEM_LABEL[i.type]) : [],
    strokes: Array.isArray(p.strokes) ? p.strokes.filter((s) => Array.isArray(s.pts)) : [],
  }));
  return { id: String(f.id || uid()), boxId: String(f.boxId), folderId: String(f.folderId), name: String(f.name || '無題のメモ'), pages, created: f.created || t, updated: f.updated || t, trashedAt: f.trashedAt || null };
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
      ['trash', 'ゴミ箱ボックス', () => { clearSearch(); go('#/trash'); }],
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
        if (ED.lasso) { clearLasso(); renderSub(); return; }
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
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (ED.lasso) { e.preventDefault(); lassoDelete(); return; }
      if (ED.sel) { e.preventDefault(); deleteSelected(); return; }
    }
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
