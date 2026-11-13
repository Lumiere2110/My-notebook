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
  clock: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
  bullet: 'M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z',
  compose: 'M5 3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7H5V5h7V3H5zm12.78 1a.69.69 0 0 0-.48.2l-1.22 1.21 2.5 2.5L19.8 6.7c.26-.26.26-.7 0-.95L18.25 4.2c-.13-.13-.3-.2-.47-.2zm-2.41 2.12L8 13.5V16h2.5l7.37-7.38-2.5-2.5z',
  draw: 'M4.59 6.89c.7-.71 1.4-1.35 1.71-1.22.5.2 0 1.03-.3 1.52-.25.42-2.86 3.89-2.86 6.31 0 1.28.48 2.34 1.34 2.98.75.56 1.74.73 2.64.46 1.07-.31 1.95-1.4 3.06-2.77 1.21-1.49 2.83-3.44 4.08-3.44 1.63 0 1.65 1.01 1.76 1.79-3.78.64-5.38 3.67-5.38 5.37 0 1.7 1.44 3.09 3.21 3.09 1.63 0 4.29-1.33 4.69-6.1H21v-2.5h-2.47c-.15-1.65-1.09-4.2-4.03-4.2-2.25 0-4.18 1.91-4.94 2.84-.58.73-2.06 2.48-2.29 2.72-.25.3-.68.84-1.11.84-.45 0-.72-.83-.36-1.92.35-1.09 1.4-2.86 1.85-3.52.78-1.14 1.3-1.92 1.3-3.28C8.95 3.69 7.31 3 6.44 3 5.12 3 3.97 4 3.72 4.25c-.36.36-.66.66-.88.93l1.75 1.71zm9.29 11.66c-.31 0-.74-.26-.74-.72 0-.6.73-2.2 2.87-2.76-.3 2.69-1.43 3.48-2.13 3.48z',
  phone: 'M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z',
  tablet: 'M18.5 0h-14C3.12 0 2 1.12 2 2.5v19C2 22.88 3.12 24 4.5 24h14c1.38 0 2.5-1.12 2.5-2.5v-19C21 1.12 19.88 0 18.5 0zm-7 23c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm7.5-4H4V3h15v16z',
  laptop: 'M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z',
  finger: 'M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z',
  more: 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
  copy: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
  box: 'M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4l16-.02V7z',
  folder: 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z',
  zoomIn: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm.5-7H9v2H7v1h2v2h1v-2h2V9h-2z',
  zoomOut: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z',
  folderOpen: 'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z',
  arrowR: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z",
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
  multi: 'M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z',
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
/* 用紙のサイズ（ページの中の座標の大きさ。A4 = 900×1272 を基準に、ほかは同じ縮尺） */
const SIZES = [
  ["a4", "A4", 900, 1272], ["a5", "A5", 634, 900], ["b5", "B5", 780, 1101], ["b4", "B4", 1101, 1559], ["a3", "A3", 1272, 1800],
  ["letter", "レター", 926, 1196], ["square", "正方形", 900, 900], ["wide", "ワイド 16:9", 1600, 900], ["long", "縦長（2倍）", 900, 2544], ["custom", "自由に決める", 0, 0],
];
function baseDims(page) {
  if (page?.size === "custom" && page.cw > 0 && page.ch > 0) return { w: page.cw, h: page.ch };
  const s = SIZES.find((x) => x[0] === page?.size && x[2]);
  return s ? { w: s[2], h: s[3] } : { w: PAGE_W, h: PAGE_H };
}
function dims(page) { const d = baseDims(page); return page?.orient === "land" ? { w: d.h, h: d.w } : d; }
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
function newPage(bg = "lined", paper = PAPER_COLORS[0][0], orient = "port", size = "a4", cw, ch) {
  const p = { id: uid(), bg, paper, orient, size, items: [], strokes: [], conns: [] };
  if (size === "custom") { p.cw = cw; p.ch = ch; }
  return p;
}
/* ページを複製したとき、アイテムの新しい id に合わせて矢印のつなぎ先も付け替える */
function remapPage(p) {
  const map = new Map();
  p.id = uid();
  p.items.forEach((x) => { const n = uid(); map.set(x.id, n); x.id = n; });
  p.strokes.forEach((x) => { x.id = uid(); });
  p.conns = (p.conns || []).filter((c) => map.has(c.from) && map.has(c.to)).map((c) => ({ ...c, id: uid(), from: map.get(c.from), to: map.get(c.to) }));
  return p;
}

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
  device: pref('device', ''),
  theme: pref('theme', 'auto'),
};
let ED = null;            // 開いているメモファイルのエディター
let NV = null;            // スマホのメモ画面（文字だけで書く）

const boxById = (id) => S.boxes.find((b) => b.id === id);
const folderById = (id) => S.folders.find((f) => f.id === id);
const fileById = (id) => S.files.find((f) => f.id === id);
const boxAlive = (b) => !!b && !b.trashedAt;
/* フォルダは複数のボックスに、メモファイルは複数のフォルダに入れられる。
   boxId / folderId が最初に入れた場所、alsoBoxes / alsoFolders がほかに入れている場所 */
const folderBoxIds = (f) => [f.boxId, ...(f.alsoBoxes || [])];
const fileFolderIds = (f) => [f.folderId, ...(f.alsoFolders || [])];
const folderAlive = (f) => !!f && !f.trashedAt && folderBoxIds(f).some((id) => boxAlive(boxById(id)));
const fileAlive = (f) => !!f && !f.trashedAt && fileFolderIds(f).some((id) => folderAlive(folderById(id)));
const folderInBox = (fo, boxId) => !!fo && !fo.trashedAt && folderBoxIds(fo).includes(boxId);
const fileInFolder = (f, folderId) => fileFolderIds(f).includes(folderId) && folderAlive(folderById(folderId));
const fileInBox = (f, boxId) => fileFolderIds(f).some((id) => folderInBox(folderById(id), boxId));
const liveFoldersOfFile = (f) => fileFolderIds(f).map(folderById).filter(folderAlive);
const liveBoxesOfFolder = (fo) => folderBoxIds(fo).map(boxById).filter(boxAlive);
const liveBoxes = () => S.boxes.filter(boxAlive).sort((a, b) => a.created - b.created);
const foldersOf = (boxId) => S.folders.filter((f) => folderInBox(f, boxId)).sort((a, b) => a.created - b.created);
const filesOf = (boxId, folderId = 'all') => S.files.filter((f) => fileAlive(f) && (folderId === 'all' ? fileInBox(f, boxId) : fileInFolder(f, folderId))).sort((a, b) => b.updated - a.updated);
const boxName = (b) => (b ? b.name + 'ボックス' : '');
function cleanBoxName(v) { return String(v || '').trim().replace(/\s*ボックス$/, '').trim(); }
function filePath(f) { return `${boxName(boxById(f.boxId))} › ${folderById(f.folderId)?.name || ''}`; }
/* いま開いているボックス（ほかの場所から開いたメモファイルでも、来たボックスを優先） */
function contextBoxOf(f) {
  const m = /^#\/b\/([^/]+)/.exec(S.lastBoxHash || '');
  if (m && fileInBox(f, m[1])) return m[1];
  if (folderInBox(folderById(f.folderId), f.boxId) && boxAlive(boxById(f.boxId))) return f.boxId;
  const fo = liveFoldersOfFile(f)[0];
  return fo ? liveBoxesOfFolder(fo)[0].id : f.boxId;
}
/* メモファイルから戻る先（来たボックス・フォルダに入っていればそこへ） */
function backFor(f) {
  const m = /^#\/b\/([^/]+)(?:\/([^/]+))?/.exec(S.lastBoxHash || '');
  if (m && fileInBox(f, m[1])) return !m[2] || fileInFolder(f, m[2]) ? S.lastBoxHash : boxHash(m[1]);
  const box = contextBoxOf(f);
  const fo = liveFoldersOfFile(f).find((x) => folderInBox(x, box));
  return boxHash(box, fo?.id);
}

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
  const curBox = r.name === 'box' ? r.boxId : r.name === 'file' && fileById(r.fileId) ? contextBoxOf(fileById(r.fileId)) : null;
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
  if (NV && (r.name !== 'file' || r.fileId !== NV.file.id || q)) closeNote();
  if (r.name !== 'file' || q) S.pageViewFor = null;
  document.body.classList.toggle('editing', r.name === 'file' && !q);
  setViewport(r.name === 'file' && !q);
  renderNav();
  if (ED || NV) return;                 // 開いているエディターはそのまま
  fitRO.disconnect();
  const main = $('#main');
  main.replaceChildren();
  if (q) return renderSearch(main, q);
  if (r.name === 'trash') return renderTrash(main);
  if (r.name === 'file') {
    const f = fileById(r.fileId);
    if (!fileAlive(f)) return goHome(true);
    // スマホは文字で書くメモの画面。「ページで開く」を選んだときだけページ（手書き・付箋）の画面
    if (device() === 'phone' && S.pageViewFor !== f.id) return openNote(f);
    return openEditor(f);
  }
  if (r.name === 'box') {
    const b = boxById(r.boxId);
    if (!boxAlive(b)) return goHome(true);
    if (r.folderId !== 'all' && !(folderInBox(folderById(r.folderId), b.id) && folderAlive(folderById(r.folderId)))) { history.replaceState(null, '', boxHash(b.id)); r.folderId = 'all'; }
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

  const folderBtn = (id, name, count, ic, others) => {
    const on = folderId === id;
    const tip = (on ? `${name}（開いています）` : name) + (others?.length ? `\nほかに入っているボックス: ${others.map(boxName).join('、')}` : '');
    return el('button', {
      class: 'folder-item' + (on ? ' active' : ''), type: 'button', title: tip, 'aria-current': on ? 'true' : null,
      onclick: () => go(boxHash(box.id, id)),
    }, icon(on && ic === 'folder' ? 'folderOpen' : ic), el('span', { class: 'folder-name', text: name }),
      others?.length ? el('span', { class: 'folder-shared', title: `ほかに ${others.length} 個のボックスにも入っています` }, icon('multi')) : null,
      el('span', { class: 'count', text: count }));
  };

  const side = el('aside', { class: 'folders', 'aria-label': 'フォルダ' },
    folderBtn('all', 'すべてのフォルダ', all.length, 'folders'),
    folders.map((f) => folderBtn(f.id, f.name, all.filter((x) => fileInFolder(x, f.id)).length, 'folder', liveBoxesOfFolder(f).filter((b) => b.id !== box.id))),
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
  if (list.length) body = el('div', { class: 'file-grid' }, list.map((f) => fileCard(f, !folder, false, box.id)));
  else if (!folders.length) body = el('div', { class: 'empty-state small' }, icon('folder'), el('p', { text: 'まだフォルダがありません' }),
    el('button', { class: 'btn', type: 'button', onclick: () => createFolder(box) }, icon('plus'), 'フォルダを作る'));
  else body = el('div', { class: 'empty-state small' }, icon('file'), el('p', { text: 'メモファイルはまだありません' }));

  main.append(el('div', { class: 'box-layout' }, side, el('section', { class: 'files' }, head, body)),
    el('button', { class: 'fab', type: 'button', title: '新規メモ', 'aria-label': '新規メモ', onclick: quickNote }, icon('compose')));
}

/* --- 検索結果（#タグ でタグを探せる） --- */
function fileText(f) {
  return f.pages.flatMap((p) => [...p.items.flatMap((i) => [i.text || '', i.label || '', ...(i.options || []), ...(i.tags || []).map((t) => '#' + t)]), ...(p.conns || []).map((c) => c.label || '')]).join('\n');
}
function renderSearch(main, q) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const list = S.files.filter((f) => {
    if (!fileAlive(f)) return false;
    const tags = [...fileTags(f)].map((t) => t.toLowerCase());
    const hay = [f.name, fileText(f), ...liveFoldersOfFile(f).map((fo) => fo.name), ...liveFoldersOfFile(f).flatMap(liveBoxesOfFolder).map(boxName)].join('\n').toLowerCase();
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
function fileCard(f, showFolder, showBox, ctxBox) {
  const fos = liveFoldersOfFile(f);
  const here = ctxBox ? fos.filter((fo) => folderInBox(fo, ctxBox)) : fos.slice(0, 1);
  const where = showBox ? `${boxName(liveBoxesOfFolder(here[0] || {})[0] || boxById(f.boxId))} › ${(here[0] || folderById(f.folderId))?.name || ''}`
    : showFolder ? here.map((fo) => fo.name).join('・') : '';
  const allPaths = fos.flatMap((fo) => liveBoxesOfFolder(fo).map((b) => `${boxName(b)} › ${fo.name}`));
  const more = allPaths.length - (showBox ? 1 : showFolder ? here.length : 1);
  const open = () => { if (ctxBox) S.lastBoxHash = boxHash(ctxBox, S.route.folderId); clearSearch(); go('#/f/' + f.id); };
  const tags = [...fileTags(f)].slice(0, 4);
  return el('div', { class: 'file-card' + (hasPageContent(f) ? ' has-ink' : ''), tabindex: 0, role: 'link', 'aria-label': f.name, onclick: open, onkeydown: (e) => { if (e.key === 'Enter') open(); } },
    el('div', { class: 'thumb-wrap' }, thumbOf(f.pages[0] || newPage())),
    el('div', { class: 'file-info' },
      el('div', { class: 'file-name', text: f.name || '無題のメモ' }),
      el('div', { class: 'file-meta', text: `${f.pages.length}ページ · ${fmtDate(f.updated)}` }),
      el('div', { class: 'file-snippet' }, el('span', { class: 'file-date', text: fmtDate(f.updated) }), ' ', noteSnippet(f) || '追加のテキストなし'),
      where || more > 0 ? el('div', { class: 'file-path', title: allPaths.length > 1 ? '入っている場所:\n' + allPaths.join('\n') : null }, icon(more > 0 ? 'multi' : 'folder'),
        where ? el('span', { text: where }) : null, more > 0 ? el('span', { class: 'file-more-places', text: where ? `ほか${more}か所` : `ほかに${more}か所` }) : null) : null,
      tags.length ? el('div', { class: 'file-tags' }, tags.map((t) => el('span', { class: 'chip', text: '#' + t }))) : null),
    iconBtn('more', 'メモファイルのメニュー', (e) => { e.stopPropagation(); fileMenu(e.currentTarget, f); }, 'sm file-more'));
}

/* ===== ゴミ箱ボックス ===== */
function trashLists() {
  return {
    boxes: S.boxes.filter((b) => b.trashedAt),
    folders: S.folders.filter((f) => f.trashedAt && folderBoxIds(f).some((id) => boxAlive(boxById(id)))),
    files: S.files.filter((f) => f.trashedAt && fileFolderIds(f).some((id) => folderAlive(folderById(id)))),
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
    section('フォルダ', t.folders.map((f) => row('folder', f, 'folder', f.name, `${boxName(boxById(f.boxId))} · メモファイル ${S.files.filter((x) => fileFolderIds(x).includes(f.id)).length} 入り`))),
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
  if (!quiet) toast('元に戻しました', '開く', () => go(kind === 'box' ? boxHash(obj.id) : kind === 'folder' ? boxHash((liveBoxesOfFolder(obj)[0] || obj).id === obj.id ? obj.boxId : liveBoxesOfFolder(obj)[0].id, obj.id) : '#/f/' + obj.id));
  render();
}
async function purge(kind, obj) {
  /* ほかのボックス・フォルダにも入っているものは消さずに、そちらに残す */
  const changedFolders = new Set(), changedFiles = new Set();
  let folders = [];
  if (kind === 'box') {
    for (const fo of S.folders) {
      if (!folderBoxIds(fo).includes(obj.id)) continue;
      const rest = folderBoxIds(fo).filter((id) => id !== obj.id && boxById(id));
      if (!rest.length) { folders.push(fo); continue; }
      fo.boxId = rest[0]; fo.alsoBoxes = rest.slice(1); changedFolders.add(fo);
    }
  } else if (kind === 'folder') folders = [obj];
  const gone = new Set(folders.map((fo) => fo.id));
  let files = [];
  if (kind === 'file') files = [obj];
  else for (const f of S.files) {
    const ids = fileFolderIds(f);
    if (!ids.some((id) => gone.has(id))) { if (changedFolders.has(folderById(f.folderId))) { f.boxId = folderById(f.folderId).boxId; changedFiles.add(f); } continue; }
    const rest = ids.filter((id) => !gone.has(id) && folderById(id));
    if (!rest.length) { files.push(f); continue; }
    f.folderId = rest[0]; f.alsoFolders = rest.slice(1); f.boxId = folderById(rest[0]).boxId; changedFiles.add(f);
  }
  S.files = S.files.filter((f) => !files.includes(f));
  S.folders = S.folders.filter((f) => !folders.includes(f));
  if (kind === 'box') S.boxes = S.boxes.filter((b) => b !== obj);
  await Promise.all([DB.delMany('files', files.map((f) => f.id)), DB.delMany('folders', folders.map((f) => f.id)), kind === 'box' ? DB.del('boxes', obj.id) : null,
    changedFolders.size ? DB.putMany('folders', [...changedFolders]) : null, changedFiles.size ? DB.putMany('files', [...changedFiles]) : null]).catch(saveFailed);
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
  const cur = S.route.name === 'box' ? S.route.boxId : f.boxId;
  trashItem('folder', f, `フォルダ「${f.name}」`);
  go(boxHash(cur));
}
/* フォルダを入れるボックスを選ぶ（複数可） */
async function placeFolder(fo) {
  const boxes = liveBoxes();
  const v = await dialog({
    title: `「${fo.name}」を入れるボックス`, note: 'チェックしたボックスすべてに、このフォルダが出ます（中身は同じです。どこで書き換えても全部に反映されます）。', ok: '決定',
    fields: [{ key: 'boxes', type: 'checks', label: 'ボックス', value: folderBoxIds(fo), options: boxes.map((b) => [b.id, boxName(b)]) }],
  });
  if (!v) return;
  if (!v.boxes.length) { toast('ボックスを1つ以上選んでください'); return; }
  const dead = folderBoxIds(fo).filter((id) => !boxes.some((b) => b.id === id)); // ゴミ箱の中のボックスは残しておく
  const keep = v.boxes.includes(fo.boxId) ? fo.boxId : v.boxes[0];
  fo.boxId = keep; fo.alsoBoxes = [...v.boxes.filter((id) => id !== keep), ...dead];
  await touch(fo, 'folders');
  if (S.route.name === 'box' && !folderInBox(fo, S.route.boxId)) go(boxHash(S.route.boxId)); else render();
  toast(v.boxes.length > 1 ? `${v.boxes.length} 個のボックスに入れました` : `${boxName(boxById(keep))}に入れました`);
}
async function removeFolderFromBox(fo, boxId) {
  const rest = folderBoxIds(fo).filter((id) => id !== boxId);
  if (!rest.length) return;
  fo.boxId = rest[0]; fo.alsoBoxes = rest.slice(1);
  await touch(fo, 'folders');
  go(boxHash(boxId));
  toast(`フォルダ「${fo.name}」を${boxName(boxById(boxId))}から外しました（ほかのボックスには残っています）`);
}
function folderMenu(anchor, f) {
  const cur = S.route.name === 'box' ? S.route.boxId : null;
  menu(anchor, [
    ['edit', '名前を変更', () => renameFolder(f)],
    ['multi', '入れるボックスを選ぶ（複数可）', () => placeFolder(f)],
    cur && folderBoxIds(f).length > 1 ? ['close', 'このボックスから外す', () => removeFolderFromBox(f, cur)] : null,
    ['trash', 'フォルダを削除（ゴミ箱へ）', () => deleteFolder(f), true],
  ].filter(Boolean));
}
/* すべてのフォルダの選択肢（ボックスごと。複数のボックスに入っているフォルダは最初の1回だけ） */
function folderChoices() {
  const seen = new Set(), out = [];
  for (const b of liveBoxes()) {
    const fos = foldersOf(b.id).filter((fo) => !seen.has(fo.id));
    if (!fos.length) continue;
    out.push([null, boxName(b)]);
    for (const fo of fos) { seen.add(fo.id); out.push([fo.id, fo.name, `${boxName(b)} › ${fo.name}`]); }
  }
  return out;
}
/* メモファイルを入れるフォルダを選ぶ（複数可） */
async function placeFile(f) {
  const choices = folderChoices();
  const v = await dialog({
    title: `「${f.name}」を入れるフォルダ`, note: 'チェックしたフォルダすべてに、このメモファイルが出ます（コピーではなく同じメモです。どこで書き換えても全部に反映されます）。', ok: '決定',
    fields: [{ key: 'folders', type: 'checks', label: 'フォルダ', value: fileFolderIds(f), options: choices.map(([id, name]) => [id, name]) }],
  });
  if (!v) return;
  if (!v.folders.length) { toast('フォルダを1つ以上選んでください'); return; }
  const dead = fileFolderIds(f).filter((id) => !choices.some(([c]) => c === id));
  const keep = v.folders.includes(f.folderId) ? f.folderId : v.folders[0];
  f.folderId = keep; f.alsoFolders = [...v.folders.filter((id) => id !== keep), ...dead]; f.boxId = folderById(keep).boxId;
  await touch(f, 'files');
  afterPlaceChange(f);
  toast(v.folders.length > 1 ? `${v.folders.length} 個のフォルダに入れました` : `「${folderById(keep).name}」に入れました`);
}
async function removeFileFromFolder(f, folderId) {
  const rest = fileFolderIds(f).filter((id) => id !== folderId);
  if (!rest.length) return;
  f.folderId = rest[0]; f.alsoFolders = rest.slice(1); f.boxId = folderById(rest[0])?.boxId || f.boxId;
  await touch(f, 'files');
  afterPlaceChange(f);
  toast(`「${f.name}」をフォルダ「${folderById(folderId)?.name || ''}」から外しました（ほかのフォルダには残っています）`);
}
function afterPlaceChange(f) {
  if (ED?.file === f) {
    ED.back = backFor(f);
    $('.ed-where')?.replaceWith(whereEl(f));
    renderNav();
  } else render();
}
function whereEl(f) {
  const box = contextBoxOf(f);
  const fo = liveFoldersOfFile(f).find((x) => folderInBox(x, box)) || folderById(f.folderId);
  const n = liveFoldersOfFile(f).flatMap(liveBoxesOfFolder).length;
  const paths = liveFoldersOfFile(f).flatMap((x) => liveBoxesOfFolder(x).map((b) => `${boxName(b)} › ${x.name}`));
  return el('div', { class: 'ed-where', title: n > 1 ? '入っている場所:\n' + paths.join('\n') : null }, icon('box'), boxName(boxById(box)), ' › ', fo?.name || '',
    n > 1 ? el('span', { class: 'where-more' }, ` ほか${n - 1}か所`) : null);
}

async function createFile(box, folderId) {
  let folders = foldersOf(box.id);
  const fields = [{ key: 'name', label: 'メモファイルの名前', placeholder: '無題のメモ', maxlength: 80 }];
  if (folderId === 'all') {
    if (!folders.length) { makeFolder(box, 'メモ'); folders = foldersOf(box.id); toast('フォルダ「メモ」を作りました'); }
    fields.push({ key: 'folder', type: 'select', label: '入れるフォルダ', value: folders[0].id, options: folders.map((f) => [f.id, f.name]) });
  }
  fields.push({ key: 'paper', type: 'select', label: '用紙', value: pref('paper', 'lined'), options: PAPERS });
  fields.push({ key: "size", type: "select", label: "サイズ", value: pref("pageSize", "a4"), options: SIZES.filter((s) => s[2]).map(([k, l, w, h]) => [k, `${l}（${w}×${h}）`]) });
  const v = await dialog({ title: '新しいメモファイル', fields, ok: '作成' });
  if (!v) { if (folderId === 'all') render(); return; }
  setPref("paper", v.paper); setPref("pageSize", v.size);
  const t = Date.now();
  const f = { id: uid(), boxId: box.id, folderId: v.folder || folderId, name: v.name.trim() || '無題のメモ', pages: [newPage(v.paper, undefined, "port", v.size)], created: t, updated: t };
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
  /* いま見ているフォルダ（なければ最初に入れたフォルダ）から、別のフォルダへ移す。ほかに入れている場所はそのまま */
  const from = S.route.name === 'box' && fileFolderIds(f).includes(S.route.folderId) ? S.route.folderId : f.folderId;
  const opts = folderChoices().filter(([id]) => id).map(([id, , path]) => [id, path]);
  const v = await dialog({ title: `「${f.name}」を移動`, fields: [{ key: 'folder', type: 'select', label: '移動先のフォルダ', value: from, options: opts }], ok: '移動' });
  if (!v || v.folder === from) return;
  const fo = folderById(v.folder);
  const ids = fileFolderIds(f).map((id) => (id === from ? fo.id : id)).filter((id, i, a) => a.indexOf(id) === i);
  f.folderId = ids[0]; f.alsoFolders = ids.slice(1); f.boxId = folderById(ids[0]).boxId;
  await touch(f, 'files');
  if (ED?.file === f) {
    ED.back = boxHash(fo.boxId, fo.id); S.lastBoxHash = ED.back;
    $('.ed-where')?.replaceWith(whereEl(f));
    renderNav();
  } else if (NV?.file === f) {
    NV.back = boxHash(fo.boxId, fo.id); S.lastBoxHash = NV.back;
    const lb = NV.root.querySelector('.note-back span'); if (lb) lb.textContent = fo.name;
  } else render();
  toast(`「${fo.name}」へ移動しました`);
}
function cloneFile(f) {
  const t = Date.now();
  const pages = JSON.parse(JSON.stringify(f.pages)).map(remapPage);
  const c = { ...f, alsoFolders: [...(f.alsoFolders || [])], id: uid(), name: f.name + ' のコピー', pages, created: t, updated: t, trashedAt: null };
  S.files.push(c); put('files', c);
  if (!ED) render();
  toast('コピーを作りました', '開く', () => go('#/f/' + c.id));
}
function deleteFile(f) {
  const back = ED?.file === f ? ED.back : NV?.file === f ? NV.back : null;
  if (ED?.file === f) { if (ED.commitT) commit(); flushSave(); ED = null; }
  trashItem('file', f, `「${f.name}」`);
  if (S.route.name === 'file' && S.route.fileId === f.id) go(back || backFor(f)); else render();
}
function fileMenu(anchor, f) {
  const cur = S.route.name === 'box' && S.route.folderId !== 'all' ? S.route.folderId : null;
  menu(anchor, [
    ['edit', '名前を変更', () => renameFile(f)],
    ['multi', '入れるフォルダを選ぶ（複数可）', () => placeFile(f)],
    ['moveTo', '別のフォルダへ移動', () => moveFile(f)],
    cur && fileFolderIds(f).includes(cur) && fileFolderIds(f).length > 1 ? ['close', 'このフォルダから外す', () => removeFileFromFolder(f, cur)] : null,
    ['copy', 'コピーを作る', () => cloneFile(f)],
    ['trash', '削除（ゴミ箱へ）', () => deleteFile(f), true],
  ].filter(Boolean));
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
  if (it.type === "sticky" || it.type === "image" || it.vert) d.style.height = it.h + "px";
  d.style.transform = (dx || dy ? `translate(${dx}px, ${dy}px) ` : '') + (it.rot ? `rotate(${it.rot}deg)` : '');
}
/* 文字を書き換えたとき、チェックの付いた行がずれないように付け直す（前後の変わらない行を手がかりにする） */
function remapChecks(oldText, newText, checks) {
  const a = oldText.split('\n'), b = newText.split('\n');
  let p = 0;
  while (p < a.length && p < b.length && a[p] === b[p]) p++;
  let s = 0;
  while (s < a.length - p && s < b.length - p && a[a.length - 1 - s] === b[b.length - 1 - s]) s++;
  const out = Array(b.length).fill(false);
  for (let i = 0; i < p; i++) out[i] = !!checks[i];
  for (let k = 0; k < s; k++) out[b.length - 1 - k] = !!checks[a.length - 1 - k];
  if (a.length === b.length) for (let i = p; i < b.length - s; i++) out[i] = !!checks[i];   // 行の中を書き換えただけ
  return out;
}
/* ===== 1つのテキストボックスの中で、一部の文字だけ大きさを変える =====
   文字は今までどおり it.text（ただの文字）に入れて、大きさだけ it.spans = [{ s, e, z }]（s〜e 文字目を z px）で持つ */
const FONT_STEPS = [12, 14, 16, 18, 20, 24, 28, 34, 40, 48, 56, 64, 72, 96];
function normSpans(spans, len) {
  const out = [];
  for (const sp of [...(spans || [])].sort((a, b) => a.s - b.s)) {
    const s = Math.max(0, Math.min(len, sp.s)), e = Math.max(0, Math.min(len, sp.e));
    if (e <= s || !sp.z) continue;
    const last = out[out.length - 1];
    if (last && last.e >= s && last.z === sp.z) last.e = Math.max(last.e, e); else out.push({ s, e, z: sp.z });
  }
  return out;
}
function setSpanSize(it, a, b, z) {
  const out = [];
  for (const sp of it.spans || []) {
    if (sp.e <= a || sp.s >= b) { out.push(sp); continue; }
    if (sp.s < a) out.push({ s: sp.s, e: a, z: sp.z });
    if (sp.e > b) out.push({ s: b, e: sp.e, z: sp.z });
  }
  if (z && z !== it.size) out.push({ s: a, e: b, z });
  it.spans = normSpans(out, String(it.text || '').length);
  if (!it.spans.length) delete it.spans;
}
/* ただの文字の欄で書きかえたとき、大きさを変えた部分の位置をずらして合わせる（スマホのメモ画面） */
function shiftSpans(it, oldText, newText) {
  if (!it.spans?.length) return;
  let p = 0;
  while (p < oldText.length && p < newText.length && oldText[p] === newText[p]) p++;
  let q = 0;
  while (q < oldText.length - p && q < newText.length - p && oldText[oldText.length - 1 - q] === newText[newText.length - 1 - q]) q++;
  const oldEnd = oldText.length - q, d = newText.length - oldText.length;
  const map = (x) => (x <= p ? x : x >= oldEnd ? x + d : p);
  it.spans = normSpans(it.spans.map((sp) => ({ s: map(sp.s), e: map(sp.e), z: sp.z })), newText.length);
  if (!it.spans.length) delete it.spans;
}
function sizeAt(it, i) { return (it.spans || []).find((sp) => sp.s <= i && i < sp.e)?.z || it.size || 24; }
/* text の from〜to 文字目を、大きさを変えた部分は <span> で包んで返す。mk は1つの区切りの文字から中身を作る */
function sizedPieces(it, from, to, mk) {
  const cuts = new Set([from, to]);
  for (const sp of it.spans || []) { if (sp.s > from && sp.s < to) cuts.add(sp.s); if (sp.e > from && sp.e < to) cuts.add(sp.e); }
  const xs = [...cuts].sort((a, b) => a - b), text = String(it.text || ''), out = [];
  for (let k = 0; k < xs.length - 1; k++) {
    const x = xs[k], y = xs[k + 1];
    if (y <= x) continue;
    const z = (it.spans || []).find((sp) => sp.s <= x && x < sp.e)?.z;
    const inner = mk(text.slice(x, y));
    out.push(z ? el('span', { class: 'fs', dataset: { z }, style: `font-size:${z}px` }, inner) : inner);
  }
  return out;
}
const sizedRich = (it, from, to) => sizedPieces(it, from, to, (t) => richText(t, it.urls !== false));

/* --- 入力中の欄（いろいろな大きさの文字をそのまま見せるため、textarea ではなく文字を直接書ける欄にする） --- */
const CE_TYPES = new Set(['text', 'sticky']);
function fillCedit(ce, it) {
  ce.replaceChildren(...sizedPieces(it, 0, String(it.text || '').length, (t) => document.createTextNode(t)));
  if (String(it.text || '').endsWith('\n')) ce.append(el('br', { dataset: { tail: '1' } }));   // 最後の空の行を見せる
}
/* 欄の中身から、文字と大きさを読み取る */
function readCedit(root, base) {
  let text = '';
  const spans = [];
  const walk = (n, z) => {
    for (const c of n.childNodes) {
      if (c.nodeType === 3) {
        const t = c.data.replace(/\u200b/g, '');
        if (t) { if (z && z !== base) spans.push({ s: text.length, e: text.length + t.length, z }); text += t; }
      } else if (c.nodeName === 'BR') {
        if (!(c.dataset?.tail && c === root.lastChild)) text += '\n';
      } else if (c.nodeType === 1) {
        if (/^(DIV|P)$/.test(c.nodeName) && text && !text.endsWith('\n')) text += '\n';
        walk(c, c.dataset?.z ? +c.dataset.z : c.style?.fontSize ? parseFloat(c.style.fontSize) : z);
      }
    }
  };
  walk(root, null);
  return { text, spans: normSpans(spans, text.length) };
}
/* 欄の中の位置（ノードと位置）→ 何文字目か */
function ceOffset(ce, node, off) {
  const r = document.createRange();
  r.selectNodeContents(ce);
  try { r.setEnd(node, off); } catch { return 0; }
  const box = document.createElement('div');
  box.append(r.cloneContents());
  return readCedit(box, 0).text.length;
}
/* 何文字目か → 欄の中の位置 */
function ceLocate(ce, i) {
  let left = i;
  const find = (n) => {
    for (const c of n.childNodes) {
      if (c.nodeType === 3) { if (left <= c.data.length) return [c, left]; left -= c.data.length; }
      else if (c.nodeName === 'BR') { if (left === 0) return [n, [...n.childNodes].indexOf(c)]; left -= 1; }
      else if (c.nodeType === 1) { const r = find(c); if (r) return r; }
    }
    return null;
  };
  return find(ce) || [ce, ce.childNodes.length];
}
function ceSelect(ce, a, b = a) {
  const [n1, o1] = ceLocate(ce, a), [n2, o2] = ceLocate(ce, b);
  const r = document.createRange();
  r.setStart(n1, o1); r.setEnd(n2, o2);
  const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
}
/* 入力中の欄で選んでいる文字の範囲（何文字目〜何文字目）を覚えておく。ボタンを押してフォーカスが外れても使えるように */
document.addEventListener('selectionchange', () => {
  if (!ED?.editId) return;
  const sel = getSelection();
  const ce = sel.rangeCount && sel.anchorNode && (sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentElement)?.closest?.('.cedit');
  if (!ce) return;
  const r = sel.getRangeAt(0);
  const a = ceOffset(ce, r.startContainer, r.startOffset), b = ceOffset(ce, r.endContainer, r.endOffset);
  ED.lastSel = { id: ED.editId, a: Math.min(a, b), b: Math.max(a, b) };
  ED.sub.classList.toggle('has-textsel', a !== b);
  // 大きさのボタンの印を、選んでいる文字（選んでいなければ全体）の大きさに合わせる
  const it = selected()?.it;
  if (it?.id === ED.editId) {
    const z = a !== b ? sizeAt(it, Math.min(a, b)) : it.size;
    ED.sub.querySelectorAll('.size-ctl .seg button').forEach((x) => { const on = +x.dataset.v === z; x.classList.toggle('sel', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
  }
});
/* 大きさのボタン: 文字を選んでいたらその文字だけ、選んでいなければテキストボックス全体 */
function textSel(it) { const s = ED?.lastSel; return s && s.id === it.id && s.a < s.b ? s : null; }
function applySize(page, it, z) {
  const s = textSel(it);
  if (!s) {                                                     // 全体の大きさ（大きさを変えた部分はそのまま）
    it.size = z; if (it.type === 'text') ED.textSize = z;
    if (it.spans) { it.spans = it.spans.filter((sp) => sp.z !== z); if (!it.spans.length) delete it.spans; }
    commit(); renderPage(page); return;
  }
  setSpanSize(it, s.a, s.b, z);
  commit(); renderPage(page);
  const ce = itemDiv(it.id)?.querySelector('.cedit');
  if (ce) { ce.focus({ preventScroll: true }); ceSelect(ce, s.a, s.b); ED.lastSel = { ...s }; ED.sub.classList.add('has-textsel'); }
}
function stepSize(page, it, d) {
  const s = textSel(it);
  const cur = s ? sizeAt(it, s.a) : it.size || 24;
  const i = FONT_STEPS.findIndex((z) => z >= cur);
  const next = d > 0 ? FONT_STEPS.find((z) => z > cur) ?? FONT_STEPS[FONT_STEPS.length - 1] : [...FONT_STEPS].reverse().find((z) => z < cur) ?? FONT_STEPS[0];
  if (i < 0 && d > 0) return;
  if (s) applySize(page, it, next);
  else applySize(page, it, next), renderSub();
}

function textView(it) {
  if (it.type === 'sticky' && it.list && it.text) {               // 付箋のチェックリスト: 1行ごとにチェックボックス
    return el('div', { class: 'txt list' }, String(it.text).split('\n').map((ln, i) => (ln.trim()
      ? el('div', { class: 'li' + (it.checks?.[i] ? ' done' : '') },
        el('input', { type: 'checkbox', class: 'ctl', checked: !!it.checks?.[i], dataset: { line: i }, 'aria-label': `${ln} をチェック` }),
        el('span', { class: 'li-t' }, sizedRich(it, lineStart(it.text, i), lineStart(it.text, i) + ln.length)))
      : el('div', { class: 'li empty' }, ' '))));
  }
  return el('div', { class: 'txt' }, sizedRich(it, 0, String(it.text || '').length), it.text ? null : el('span', { class: 'ph', text: PLACEHOLDER[it.type] || '' }));
}
function lineStart(text, i) { let p = 0; for (let k = 0; k < i; k++) p = String(text).indexOf('\n', p) + 1; return p; }
function tagChips(it) {
  return it.tags?.length ? el('div', { class: 'item-tags' }, it.tags.map((t) => el('span', { class: 'tag', dataset: { tag: t }, title: `#${t} で探す` }, '#' + t))) : null;
}
function itemEl(it, edit) {
  const d = el('div', { class: `item item-${it.type}` + (it.locked ? ' locked' : '') + (it.type === "check" && it.checked ? " checked" : "") + (it.vert ? " vert" : ""), dataset: { id: it.id } });
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
  if (edit) d.append(el('div', { class: 'h-move', title: '移動' }, icon('move4')), el('div', { class: 'h-resize', title: '大きさを変える' }), el("div", { class: "h-del", title: "削除" }, icon("trash")), el("div", { class: "h-conn", title: "ドラッグして別の付箋につなぐ（矢印）" }, icon("arrowR")), el('div', { class: 'lock-badge', title: '固定中' }, icon('lock')));
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
  drawConns(stage, page);
  return stage;
}

/* ===== 付箋どうしをつなぐ矢印（一方向・双方向・線だけ、補足文字つき） ===== */
const CONN_DIR = [['one', '→ 一方向'], ['both', '⇄ 双方向'], ['none', '― 線だけ']];
const CONN_W = [[2, '細'], [3, '中'], [5, '太']];
function estH(it) {
  if (TEXTY.has(it.type)) return Math.max(30, String(it.text || '').split('\n').length * (it.size || 24) * 1.5 + 10);
  return (it.size || 24) * 1.8;
}
function itemRect(stage, it) {
  let h = it.h;
  if (h == null) h = stage?.querySelector(`.item[data-id="${it.id}"]`)?.offsetHeight || estH(it);
  return { x: it.x, y: it.y, w: it.w, h };
}
/* 箱の中心から相手の方向へ伸ばした線が、箱のふちと交わる点（少しすき間をあける） */
function edgePt(r, tx, ty, gap) {
  const cx = r.x + r.w / 2, cy = r.y + r.h / 2, dx = tx - cx, dy = ty - cy;
  const L = Math.hypot(dx, dy);
  if (!L) return [cx, cy];
  const t = Math.min(dx ? r.w / 2 / Math.abs(dx) : Infinity, dy ? r.h / 2 / Math.abs(dy) : Infinity);
  return [cx + dx * t + (dx / L) * gap, cy + dy * t + (dy / L) * gap];
}
function connGeom(stage, page, c) {
  const A = page.items.find((i) => i.id === c.from), B = page.items.find((i) => i.id === c.to);
  if (!A || !B) return null;
  const ra = itemRect(stage, A), rb = itemRect(stage, B);
  const ca = [ra.x + ra.w / 2, ra.y + ra.h / 2], cb = [rb.x + rb.w / 2, rb.y + rb.h / 2];
  return { a: edgePt(ra, cb[0], cb[1], 6), b: edgePt(rb, ca[0], ca[1], 6) };
}
function headD(tip, from, size) {
  const ang = Math.atan2(tip[1] - from[1], tip[0] - from[0]), sp = 0.45;
  const p1 = [tip[0] - Math.cos(ang - sp) * size, tip[1] - Math.sin(ang - sp) * size];
  const p2 = [tip[0] - Math.cos(ang + sp) * size, tip[1] - Math.sin(ang + sp) * size];
  return `M${r1(tip[0])} ${r1(tip[1])}L${r1(p1[0])} ${r1(p1[1])}L${r1(p2[0])} ${r1(p2[1])}Z`;
}
function connEl(stage, page, c) {
  const g = connGeom(stage, page, c);
  if (!g) return null;
  const { a, b } = g;
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  if (len < 4) return null;
  const ux = (b[0] - a[0]) / len, uy = (b[1] - a[1]) / len;
  const size = 12 + c.width * 2.5, heads = [];
  let a2 = a, b2 = b;
  if (c.dir !== 'none') { heads.push(headD(b, a, size)); b2 = [b[0] - ux * size * 0.7, b[1] - uy * size * 0.7]; }
  if (c.dir === 'both') { heads.push(headD(a, b, size)); a2 = [a[0] + ux * size * 0.7, a[1] + uy * size * 0.7]; }
  const line = `M${r1(a2[0])} ${r1(a2[1])}L${r1(b2[0])} ${r1(b2[1])}`;
  const sel = ED?.csel?.id === c.id;
  const grp = svgEl('g', { class: 'conn' + (sel ? ' sel' : ''), 'data-cid': c.id });
  if (sel) grp.append(svgEl('path', { d: line, fill: 'none', stroke: '#2f6fd6', 'stroke-opacity': 0.35, 'stroke-width': c.width + 12, 'stroke-linecap': 'round' }));
  grp.append(svgEl('path', { d: line, fill: 'none', stroke: c.color, 'stroke-width': c.width, 'stroke-linecap': 'round', 'stroke-dasharray': c.dash ? `${c.width * 3} ${c.width * 2.5}` : null }));
  if (heads.length) grp.append(svgEl('path', { d: heads.join(''), fill: c.color, stroke: c.color, 'stroke-width': c.width * 0.6, 'stroke-linejoin': 'round' }));
  if (c.label) {                                                // 補足文字は線のまん中に（紙の色でふちどりして読みやすく）
    const fs = c.lsize || 20, lines = String(c.label).split('\n');
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    const t = svgEl('text', { x: r1(mx), y: r1(my - ((lines.length - 1) * fs * 1.25) / 2), 'font-size': fs, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: c.color, class: 'conn-label', stroke: page.paper || PAPER_COLORS[0][0], 'stroke-width': fs * 0.35, 'paint-order': 'stroke', 'stroke-linejoin': 'round' });
    lines.forEach((ln, i) => { const sp = svgEl('tspan', { x: r1(mx), dy: i ? fs * 1.25 : 0 }); sp.textContent = ln; t.append(sp); });
    grp.append(t);
  }
  return grp;
}
function drawConns(stage, page) {
  const ink = stage?.querySelector('.ink');
  if (!ink) return;
  ink.querySelectorAll('.conn').forEach((n) => n.remove());
  const first = ink.firstChild;
  for (const c of page.conns || []) { const g = connEl(stage, page, c); if (g) ink.insertBefore(g, first); }
}
function hitConn(stage, page, pt) {
  return (page.conns || []).slice().reverse().find((c) => {
    const g = connGeom(stage, page, c);
    if (!g) return false;
    if (distSeg(pt.x, pt.y, g.a, g.b) < c.width / 2 + 10) return true;
    if (!c.label) return false;
    const fs = c.lsize || 20, lines = String(c.label).split('\n');
    const w = Math.max(...lines.map((l) => l.length)) * fs * 0.55 + 10, h = lines.length * fs * 1.25 + 8;
    return Math.abs(pt.x - (g.a[0] + g.b[0]) / 2) < w && Math.abs(pt.y - (g.a[1] + g.b[1]) / 2) < h / 2 + 4;
  });
}
function addConn(page, from, to) {
  if (from === to) return;
  page.conns = page.conns || [];
  if (page.conns.some((c) => (c.from === from && c.to === to) || (c.from === to && c.to === from))) { toast('もうつながっています'); return; }
  const c = { id: uid(), from, to, dir: pref('connDir', 'one'), color: '#555555', width: 3, label: '' };
  page.conns.push(c);
  commit();
  selectConn(page, c.id);
  toast('矢印でつなぎました。上のバーで向き（一方向・双方向）や補足文字を変えられます');
}
function selectConn(page, id) {
  select(null);
  ED.csel = { pageId: page.id, id };
  drawConns(stageOf(page.id), page);
  renderSub();
}
function clearConnSel() {
  if (!ED?.csel) return;
  const p = pageById(ED.csel.pageId);
  ED.csel = null;
  if (p) drawConns(stageOf(p.id), p);
}
function deleteConn() {
  const page = ED.csel && pageById(ED.csel.pageId);
  if (!page) return;
  page.conns = (page.conns || []).filter((c) => c.id !== ED.csel.id);
  ED.csel = null;
  commit(); drawConns(stageOf(page.id), page); renderSub();
}
function renderConnSub(s) {
  const page = pageById(ED.csel.pageId), c = page?.conns?.find((x) => x.id === ED.csel.id);
  if (!c) { ED.csel = null; renderSub(); return; }
  const redraw = () => drawConns(stageOf(page.id), page);
  const upd = (fn) => (v) => { fn(v); commit(); redraw(); };
  const lb = el('input', { class: 'sub-input', value: c.label || '', placeholder: '補足文字（例: 理由、だから、次に）', 'aria-label': '矢印の補足文字', maxlength: 60 });
  lb.addEventListener('input', () => { c.label = lb.value; redraw(); scheduleSave(); commitSoon(); updateHist(); });
  lb.addEventListener('change', () => commit());
  lb.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.isComposing) lb.blur(); });
  s.append(el('span', { class: 'sub-label', text: '矢印' }),
    seg(CONN_DIR, c.dir, upd((v) => { c.dir = v; setPref('connDir', v); })),
    el('button', { class: 'btn small', type: 'button', text: '向きを反対に', onclick: () => { [c.from, c.to] = [c.to, c.from]; commit(); redraw(); } }),
    lb,
    seg([[16, '小'], [20, '中'], [28, '大']], c.lsize || 20, upd((v) => { c.lsize = v; })),
    colorRow(INK, c.color, upd((v) => { c.color = v; })),
    seg(CONN_W, c.width, upd((v) => { c.width = v; })),
    seg([['solid', '実線'], ['dash', '点線']], c.dash ? 'dash' : 'solid', upd((v) => { c.dash = v === 'dash'; })),
    el('span', { class: 'spacer' }),
    iconBtn('trash', '矢印を削除（Delete）', deleteConn, 'sm'));
  return lb;
}
function dragConn(e, stage, page, it) {
  const loc = localizer(stage), ink = stage.querySelector('.ink');
  const r = itemRect(stage, it);
  const tmp = svgEl('path', { class: 'conn-temp', d: '' });
  ink.append(tmp);
  const target = (ev) => {
    const t = document.elementFromPoint(ev.clientX, ev.clientY)?.closest('.item');
    return t && stage.contains(t) && t.dataset.id !== it.id ? t : null;
  };
  const unmark = () => stage.querySelectorAll('.item.conn-target').forEach((n) => n.classList.remove('conn-target'));
  track(e, (ev) => {
    const p = loc(ev), a = edgePt(r, p.x, p.y, 6);
    tmp.setAttribute('d', `M${r1(a[0])} ${r1(a[1])}L${r1(p.x)} ${r1(p.y)}`);
    unmark(); target(ev)?.classList.add('conn-target');
  }, (ev) => {
    tmp.remove(); unmark();
    const t = target(ev);
    if (t) addConn(page, it.id, t.dataset.id);
    else toast('つなぎたい付箋の上で離してください');
  });
}

/* ===== 使う端末（スマホ・iPad・PC）。端末ごとに画面と操作を変える ===== */
const DEVICES = [
  ['phone', 'phone', 'スマホ', ['ツールは画面の下（親指で届く場所）', 'メモを開くとページを画面いっぱいに', '指で書く・2本指で拡大とスクロール', 'ボタンを大きく']],
  ['tablet', 'tablet', 'iPad・タブレット', ['ツールは左の縦の欄', 'Apple Pencil で書いて、指でスクロール（切り替えできます）', '2本指で拡大・縮小', 'ボタンを少し大きく']],
  ['pc', 'laptop', 'PC', ['ツールは上の欄', 'マウスとキーボードで操作（ショートカット・Ctrl+ホイールで拡大）', 'たくさんのメモを一覧で']],
];
function guessDevice() {
  const coarse = matchMedia('(pointer: coarse)').matches;
  const ipad = navigator.maxTouchPoints > 1 && /Macintosh|iPad/.test(navigator.userAgent);
  if (!coarse && !ipad) return 'pc';
  return Math.min(screen.width, screen.height) < 600 ? 'phone' : 'tablet';
}
function device() { return S.device || 'pc'; }
function applyDevice() {
  const d = device();
  for (const [k] of DEVICES) document.body.classList.toggle('dev-' + k, k === d);
  if (ED) closeEditorAndReopen();
  else if (NV) { closeNote(); render(); }
}
/* 端末を変えたら、開いているメモファイルを開き直して画面を作り直す */
function closeEditorAndReopen() {
  if (!ED) return;
  if (ED.commitT) commit();
  flushSave();
  closeEditor();
  render();
}
/* 端末を選ぶ画面。first = 初めて開いたとき（選ぶまで閉じられない） */
function chooseDevice(first = false) {
  return new Promise((resolve) => {
    const guess = guessDevice(), cur = S.device;
    const wrap = el('div', { class: 'modal-wrap device-wrap' });
    const done = (v) => {
      document.removeEventListener('keydown', esc, true);
      wrap.remove();
      if (v) {
        const changed = v !== S.device;
        S.device = v; setPref('device', v); applyDevice();
        if (changed && !first) toast(`「${DEVICES.find((x) => x[0] === v)[2]}」用の表示にしました`);
      }
      resolve(v);
    };
    const esc = (e) => { if (e.key === 'Escape' && !first) { e.stopPropagation(); done(null); } };
    const cards = DEVICES.map(([k, ic, name, feats]) => el('button', {
      class: 'device-card' + (k === (cur || guess) ? ' sel' : ''), type: 'button', dataset: { device: k }, onclick: () => done(k),
    },
    el('span', { class: 'device-ic' }, icon(ic)),
    el('span', { class: 'device-name' }, name,
      k === guess ? el('span', { class: 'device-badge', text: 'この端末におすすめ' }) : null,
      k === cur ? el('span', { class: 'device-badge now', text: 'いま使用中' }) : null),
    el('ul', { class: 'device-feats' }, feats.map((f) => el('li', { text: f })))));
    const box = el('div', { class: 'modal device-dialog', role: 'dialog', 'aria-modal': 'true', 'aria-label': '使う端末を選ぶ' },
      el('h2', { text: first ? 'ようこそ！ どの端末で使いますか？' : '使う端末を変える' }),
      el('p', { class: 'note', text: '端末に合わせて、画面の並びや操作のしかたを変えます。あとから右上の「︙」→「使う端末を変える」でいつでも変えられます。' }),
      el('div', { class: 'device-list' }, cards),
      first ? null : el('div', { class: 'dialog-foot' }, el('button', { class: 'btn', type: 'button', text: 'キャンセル', onclick: () => done(null) })));
    if (!first) wrap.addEventListener('mousedown', (e) => { if (e.target === wrap) done(null); });
    document.addEventListener('keydown', esc, true);
    wrap.append(box); document.body.append(wrap);
    box.querySelector('.device-card.sel')?.focus();
  });
}
/* iPad: 指でも書くか（オフのときは Apple Pencil で書いて、指はスクロール） */
function fingerDraw() { return device() !== 'tablet' || pref('fingerDraw', '0') === '1'; }

/* スマホでメモファイルを開いている間は、ブラウザ自体の拡大を止める（ページの拡大は2本指のピンチで行う）。
   iPhone で文字を入力しようとしたときに画面が勝手に拡大されるのも防ぐ */
function setViewport(editing) {
  const m = document.querySelector('meta[name="viewport"]');
  if (m) m.content = 'width=device-width, initial-scale=1' + (editing ? ', maximum-scale=1' : '');
}

/* ===== スマホのメモ画面（iPhone の「メモ」のように、タイトルと本文を文字で書く） =====
   本文はページの中の「本文」テキストボックス（body: true）として保存するので、PC・iPad ではページの上に見える */
function bodyItem(f) {
  for (const p of f.pages) { const it = p.items.find((i) => i.body); if (it) return { page: p, it }; }
  return null;
}
/* 本文以外に書いてあるもの（手書き・付箋・画像など）があるか */
function hasPageContent(f) {
  return f.pages.some((p) => p.strokes?.length || p.items.some((i) => !i.body));
}
function makeBody(f) {
  let page = f.pages[0];
  if (!page || page.items.length || page.strokes?.length) {   // 1ページ目に何か書いてあれば、本文用のページを先頭に足す
    const p0 = f.pages[0];
    page = p0 ? newPage(p0.bg, p0.paper, p0.orient, p0.size, p0.cw, p0.ch) : newPage();
    f.pages.unshift(page);
  }
  const { w } = dims(page);
  const it = { id: uid(), type: 'text', body: true, x: 50, y: 50, w: w - 100, text: '', size: 24, color: INK[0][0] };
  page.items.push(it);
  return { page, it };
}
function noteSnippet(f) {
  const b = bodyItem(f);
  const text = b ? b.it.text : fileText(f);
  return String(text || '').split('\n').map((l) => l.trim()).find(Boolean) || '';
}
function openNote(file) {
  const fo = liveFoldersOfFile(file).find((x) => folderInBox(x, contextBoxOf(file))) || liveFoldersOfFile(file)[0];
  NV = { file, back: backFor(file), saveT: null };
  const autoGrow = (ta) => { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; };
  const save = () => { clearTimeout(NV.saveT); const f = NV.file; NV.saveT = setTimeout(() => { if (NV) NV.saveT = null; touch(f, 'files'); }, 500); };

  const title = el('textarea', { class: 'note-title', rows: 1, maxlength: 80, placeholder: 'タイトル', 'aria-label': 'タイトル', value: file.name === '無題のメモ' ? '' : file.name });
  title.addEventListener('input', () => { title.value = title.value.replace(/\n/g, ''); file.name = title.value.trim() || '無題のメモ'; autoGrow(title); save(); });
  title.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); body.focus(); body.setSelectionRange(0, 0); } });

  const b0 = bodyItem(file);
  const body = el('textarea', { class: 'note-body', placeholder: 'メモを入力', 'aria-label': '本文', value: b0 ? b0.it.text : '' });
  const setText = (v) => {
    let b = bodyItem(file);
    if (!b) { if (!v) return; b = makeBody(file); }
    shiftSpans(b.it, b.it.text || '', v);
    b.it.text = v; save();
  };
  body.addEventListener('input', () => { setText(body.value); autoGrow(body); });
  // 行の頭の「☐」をトンと押したらチェック
  body.addEventListener('click', () => {
    const pos = body.selectionStart;
    if (pos !== body.selectionEnd) return;
    const ls = body.value.lastIndexOf('\n', pos - 1) + 1;
    const c = body.value[ls];
    if (pos - ls > 1 || (c !== '☐' && c !== '☑')) return;
    body.setRangeText(c === '☐' ? '☑' : '☐', ls, ls + 1, 'preserve');
    body.setSelectionRange(Math.min(ls + 2, body.value.length), Math.min(ls + 2, body.value.length));
    setText(body.value);
  });
  // 改行したら、チェックリスト・箇条書きを次の行にも続ける（中身がない行で改行したら終わり）
  body.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || e.isComposing || e.shiftKey) return;
    const pos = body.selectionStart, v = body.value;
    const ls = v.lastIndexOf('\n', pos - 1) + 1;
    const m = /^(☐ |☑ |・ )/.exec(v.slice(ls, pos));
    if (!m) return;
    e.preventDefault();
    if (v.slice(ls, pos).trim() === m[1].trim() && !v.slice(pos).split('\n')[0].trim()) {
      body.setRangeText('', ls, pos, 'end');              // 空の行 → 箇条書きを終わる
    } else {
      body.setRangeText('\n' + (m[1] === '☑ ' ? '☐ ' : m[1]), pos, body.selectionEnd, 'end');
    }
    setText(body.value); autoGrow(body);
  });
  /* カーソルのある行（選んでいる行）の頭に、しるしを付けたり外したりする */
  const toggleLines = (mark) => {
    const v = body.value;
    let a = body.selectionStart, z = body.selectionEnd;
    const ls = v.lastIndexOf('\n', a - 1) + 1;
    let le = v.indexOf('\n', z); if (le < 0) le = v.length;
    const lines = v.slice(ls, le).split('\n');
    const strip = (l) => l.replace(/^(☐ |☑ |・ )/, '');
    const allHave = lines.every((l) => (mark === '☐ ' ? /^(☐ |☑ )/.test(l) : l.startsWith(mark)));
    const out = lines.map((l) => (allHave ? strip(l) : mark + strip(l))).join('\n');
    body.setRangeText(out, ls, le, 'end');
    body.focus();
    setText(body.value); autoGrow(body);
  };
  const insertNow = () => {
    const d = new Date();
    const t = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    body.focus(); body.setRangeText(t, body.selectionStart, body.selectionEnd, 'end');
    setText(body.value); autoGrow(body);
  };
  const openPages = () => { noteFlush(); S.pageViewFor = file.id; closeNote(); render(); };

  // 手書き・付箋などがあれば、下にページの縮小表示を出す（押すとページの画面へ）
  const extra = hasPageContent(file) ? el('button', { class: 'note-pages', type: 'button', onclick: openPages },
    el('span', { class: 'note-pages-label' }, icon('draw'), `手書き・付箋など（${file.pages.length}ページ）`, el('span', { class: 'note-pages-open', text: 'ページで開く ›' })),
    el('div', { class: 'note-pages-row' }, file.pages.filter((p) => p.strokes?.length || p.items.some((i) => !i.body)).slice(0, 3).map((p) => el('div', { class: 'thumb-wrap' }, thumbOf(p))))) : null;

  const done = el('button', { class: 'note-done', type: 'button', text: '完了', onclick: () => document.activeElement?.blur() });
  const tool = (ic, label, fn) => el('button', { class: 'note-tool', type: 'button', title: label, 'aria-label': label,
    onmousedown: (e) => e.preventDefault(), onclick: fn }, icon(ic), el('span', { text: label }));
  NV.root = el('div', { class: 'note' },
    el('div', { class: 'note-bar' },
      el('button', { class: 'note-back', type: 'button', onclick: () => go(NV.back) }, icon('back'), el('span', { text: fo?.name || '戻る' })),
      el('span', { class: 'spacer' }),
      done,
      iconBtn('more', 'その他', (e) => { e.stopPropagation(); noteMenu(e.currentTarget, file, openPages); })),
    el('div', { class: 'note-scroll' },
      el('div', { class: 'note-date', text: fmtLong(file.updated) }),
      title, body, extra),
    el('div', { class: 'note-tools' },
      tool('checkbox', 'チェック', () => toggleLines('☐ ')),
      tool('bullet', '箇条書き', () => toggleLines('・ ')),
      tool('clock', '日時', insertNow),
      tool('draw', '手書き', openPages),
      tool('compose', '新規メモ', () => { noteFlush(); quickNote(); })));
  NV.title = title; NV.body = body;
  $('#main').replaceChildren(NV.root);
  document.body.classList.add('note-mode');
  autoGrow(title); autoGrow(body);
  NV.focusIn = () => NV?.root.classList.add('typing');
  NV.focusOut = () => setTimeout(() => { if (NV && !NV.root.contains(document.activeElement)) NV.root.classList.remove('typing'); }, 0);
  NV.root.addEventListener('focusin', NV.focusIn);
  NV.root.addEventListener('focusout', NV.focusOut);
  // キーボードが出たら、下のツールをキーボードのすぐ上に出す
  NV.vv = () => { const v = window.visualViewport; if (!v || !NV) return; NV.root.style.setProperty('--kb', Math.max(0, innerHeight - v.height - v.offsetTop) + 'px'); };
  window.visualViewport?.addEventListener('resize', NV.vv);
  window.visualViewport?.addEventListener('scroll', NV.vv);
  // 新しく作ったメモはすぐに書けるように
  if (NV.fresh || (file.name === '無題のメモ' && !b0?.it.text && !hasPageContent(file))) title.focus();
  window.scrollTo(0, 0);
}
function fmtLong(t) {
  const d = new Date(t);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}
function noteFlush() {
  if (NV?.saveT) { clearTimeout(NV.saveT); NV.saveT = null; touch(NV.file, 'files'); }
}
function closeNote() {
  if (!NV) return;
  noteFlush();
  window.visualViewport?.removeEventListener('resize', NV.vv);
  window.visualViewport?.removeEventListener('scroll', NV.vv);
  const f = NV.file;
  // 何も書かずに閉じた新しいメモは片付ける（ゴミ箱にも入れない）
  if (f.name === '無題のメモ' && !bodyItem(f)?.it.text && !hasPageContent(f) && Date.now() - f.created < 10 * 60 * 1000 && f.pages.length <= 1) {
    S.files = S.files.filter((x) => x !== f);
    DB.del?.('files', f.id);
  }
  NV = null;
  document.body.classList.remove('note-mode');
}
function noteMenu(anchor, f, openPages) {
  menu(anchor, [
    ['draw', 'ページで開く（手書き・付箋）', openPages],
    ['moveTo', '別のフォルダへ移動', () => moveFile(f)],
    ['copy', 'コピーを作る', () => cloneFile(f)],
    [DEVICES.find((x) => x[0] === device())[1], '使う端末を変える', () => chooseDevice()],
    ['trash', 'このメモを削除（ゴミ箱へ）', () => deleteFile(f), true],
  ]);
}
/* すぐに書きはじめる新しいメモ（いま見ているフォルダ、なければ最初のフォルダに入れる） */
function quickNote() {
  const r = S.route;
  let box = r.name === 'box' ? boxById(r.boxId) : NV ? boxById(contextBoxOf(NV.file)) : boxById(pref('lastBox', '')) || S.boxes.find(boxAlive);
  if (!box) return createBox();
  let folderId = r.name === 'box' && r.folderId !== 'all' ? r.folderId : NV ? (liveFoldersOfFile(NV.file).find((x) => folderInBox(x, box.id)) || {}).id : null;
  if (!folderId) {
    const folders = foldersOf(box.id);
    folderId = (folders[0] || makeFolder(box, 'メモ')).id;
  }
  const t = Date.now();
  const f = { id: uid(), boxId: box.id, folderId, name: '無題のメモ', pages: [newPage(pref('paper', 'lined'), undefined, 'port', pref('pageSize', 'a4'))], created: t, updated: t };
  S.files.push(f); put('files', f);
  S.lastBoxHash = boxHash(box.id, r.name === 'box' ? r.folderId : folderId);
  go('#/f/' + f.id);
}

/* ===== エディター ===== */
function openEditor(file) {
  ED = {
    file, tool: device() === 'phone' ? 'text' : 'select', sel: null,   // スマホはテキスト入力から始める editId: null, lasso: null,
    undo: [], redo: [], snap: JSON.stringify(file.pages), saveT: null, commitT: null,
    pen: { color: INK[0][0], width: PEN_W[1][0] }, marker: { color: MARK[0][0], width: MARK_W[1][0] },
    eraser: { size: ERASER_W[1][0], mode: 'part' },
    shape: { kind: "rect", color: INK[0][0], width: PEN_W[1][0], fill: "none" },
    ruler: pref('ruler', '0') === '1',
    textVert: pref("textVert", "0") === "1", textSize: TEXT_SIZES[1][0], textColor: INK[0][0], stickyColor: STICKY[0][0],
    back: backFor(file),
  };
  const nameInput = el('input', { class: 'ed-name', value: file.name, maxlength: 80, 'aria-label': 'メモファイルの名前', placeholder: '無題のメモ' });
  nameInput.addEventListener('input', () => { file.name = nameInput.value; scheduleSave(); });
  nameInput.addEventListener('change', () => { if (!nameInput.value.trim()) { file.name = nameInput.value = '無題のメモ'; scheduleSave(); } });
  nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.isComposing) nameInput.blur(); });

  const where = whereEl(file);
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
  ED.scroller = el('div', { class: 'pages-scroll' }, ED.pagesBox);
  ED.zoom = clamp(+pref('zoom', '1') || 1, ZOOMS[0], ZOOMS[ZOOMS.length - 1]);
  ED.zoomBtn = el('button', { class: 'zoom-label', type: 'button', title: '拡大率（クリックで選ぶ）', onclick: (e) => { e.stopPropagation(); zoomMenu(e.currentTarget); } });
  ED.root = el('div', { class: 'ed tool-' + ED.tool },
    el('div', { class: 'ed-top' },
      el('div', { class: 'ed-bar' },
        iconBtn('back', '戻る', () => {
          if (device() === 'phone' && S.pageViewFor === file.id) { S.pageViewFor = null; closeEditorAndReopen(); return; }   // スマホ: メモの画面に戻る
          go(ED.back);
        }),
        el('div', { class: 'ed-title' }, nameInput, where),
        el('div', { class: 'ed-hist' },
          el('div', { class: 'zoom' }, iconBtn('zoomOut', '縮小（Ctrl + -）', () => stepZoom(-1), 'sm'), ED.zoomBtn, iconBtn('zoomIn', '拡大（Ctrl + +）', () => stepZoom(1), 'sm')),
          el('button', { class: 'btn primary ed-done', type: 'button', text: '完了', title: '入力を終える', onclick: () => document.activeElement?.blur() }),
          ED.undoBtn, ED.redoBtn,
          iconBtn('more', 'その他', (e) => { e.stopPropagation(); editorMenu(e.currentTarget); })),
        makeTools([...ED.toolBtns, imgBtn, funcBtn])),
      ED.sub),
    ED.scroller);
  $('#main').replaceChildren(ED.root);
  applyZoom();
  // Ctrl + ホイール（ノートパソコンではピンチ）で、カーソルの位置を中心に拡大・縮小
  ED.scroller.addEventListener('wheel', (e) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const z = clamp(ED.zoom * Math.exp(-e.deltaY * 0.0025), ZOOMS[0], ZOOMS[ZOOMS.length - 1]);
    setZoom(z, e.clientX, e.clientY);
  }, { passive: false });
  if (device() !== 'phone') restoreTools();          // スマホのツールは画面の下に固定
  if (!fingerDraw()) { ED.penSeen = true; ED.root.classList.add('pen-seen'); }
  bindTouch(ED.root);
  bindEditor(ED.root);
  // 文字を入力中に上のバーのボタン（大きさ・色など）を押しても、入力欄からフォーカスを外さない
  ED.root.querySelector('.ed-top').addEventListener('mousedown', (e) => { if (ED?.editId && e.target.closest('button')) e.preventDefault(); });
  renderPages();
  renderSub();
  updateHist();
  window.scrollTo(0, 0);
}
/* --- ページの拡大・縮小 --- */
const ZOOMS = [0.25, 0.5, 0.67, 0.75, 0.9, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4];
function applyZoom() {
  if (!ED) return;
  const avail = Math.max(240, ED.scroller.clientWidth - 32);
  const base = Math.min(880, avail);                       // 100% = いつもの幅
  ED.pagesBox.style.width = Math.round(base * ED.zoom) + 'px';
  ED.zoomBtn.textContent = Math.round(ED.zoom * 100) + '%';
}
/* cx, cy（画面の座標）の場所が動かないように拡大率を変える。省略したら表示している場所のまん中 */
function setZoom(z, cx, cy) {
  if (!ED) return;
  z = Math.round(clamp(z, ZOOMS[0], ZOOMS[ZOOMS.length - 1]) * 100) / 100;
  if (z === ED.zoom) return;
  const sc = ED.scroller, r = sc.getBoundingClientRect();
  const px = (cx ?? r.left + r.width / 2) - r.left, py = (cy ?? r.top + r.height / 2) - r.top;
  const pr = ED.pagesBox.getBoundingClientRect();
  const fx = (r.left + px - pr.left) / pr.width, fy = (sc.scrollTop + py) / sc.scrollHeight;
  ED.zoom = z;
  setPref('zoom', String(z));
  applyZoom();
  ED.pagesBox.querySelectorAll('.page').forEach((f) => fitStage(f));
  const pr2 = ED.pagesBox.getBoundingClientRect();
  sc.scrollLeft += pr2.left + fx * pr2.width - (r.left + px);
  sc.scrollTop = fy * sc.scrollHeight - py;
}
function stepZoom(d) {
  const i = ZOOMS.findIndex((z) => z >= ED.zoom - 0.001);
  const cur = i < 0 ? ZOOMS.length - 1 : i;
  const next = d > 0 ? ZOOMS.find((z) => z > ED.zoom + 0.001) : [...ZOOMS].reverse().find((z) => z < ED.zoom - 0.001);
  setZoom(next ?? ZOOMS[cur]);
}
function zoomMenu(anchor) {
  showPopover(anchor, [
    el('div', { class: 'pop-title', text: '拡大率' }),
    ZOOMS.map((z) => el('button', { class: 'menu-item' + (Math.abs(z - ED.zoom) < 0.001 ? ' checked' : ''), type: 'button', onclick: () => { closePopover(); setZoom(z); } },
      icon(Math.abs(z - ED.zoom) < 0.001 ? 'checkbox' : z < 1 ? 'zoomOut' : 'zoomIn'), `${Math.round(z * 100)}%` + (z === 1 ? '（いつもの大きさ）' : ''))),
  ]);
}
/* --- ツールの欄（選択・範囲選択…）: 左端のつまみをドラッグすると好きな場所に動かせる --- */
function makeTools(btns) {
  const grip = el('div', { class: 'tools-grip', title: 'ドラッグでツールの欄を動かす（ダブルクリックで元の場所に戻す）', 'aria-label': 'ツールの欄を動かす' }, icon('grip'));
  const vert = el('button', { class: 'tools-mini', type: 'button', title: '縦並び／横並びを切り替え', 'aria-label': '縦並び／横並びを切り替え' }, icon('rotR'));
  const dock = el('button', { class: 'tools-mini', type: 'button', title: '元の場所に戻す', 'aria-label': '元の場所に戻す' }, icon('close'));
  const tools = el('div', { class: 'tools', role: 'toolbar', 'aria-label': 'ツール' }, grip, btns, el('div', { class: 'tools-extra' }, vert, dock));
  dock.classList.add('tools-dock');
  vert.addEventListener('click', () => {
    if (!tools.classList.contains('floating')) {                // 元の場所で押したら、左に縦並びで浮かせる
      setPref('toolsVert', '1');
      setToolsFloat(tools, true, { x: 8, y: tools.getBoundingClientRect().bottom + 60 });
      return;
    }
    const v = !tools.classList.contains('vertical');
    tools.classList.toggle('vertical', v);
    setPref('toolsVert', v ? '1' : '0');
    placeTools(tools, parseFloat(tools.style.left) || 8, parseFloat(tools.style.top) || 80, true);
  });
  dock.addEventListener('click', () => setToolsFloat(tools, false));
  grip.addEventListener('dblclick', () => setToolsFloat(tools, false));
  grip.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    e.preventDefault();
    const r = tools.getBoundingClientRect();
    const ox = e.clientX - r.left, oy = e.clientY - r.top;
    try { grip.setPointerCapture(e.pointerId); } catch { /* なくても動く */ }
    let moved = tools.classList.contains('floating');
    const mv = (ev) => {
      if (!moved) {
        if (Math.hypot(ev.clientX - e.clientX, ev.clientY - e.clientY) < 4) return;
        moved = true;
        tools.classList.add('floating');
        tools.classList.toggle('vertical', pref('toolsVert', '0') === '1');
      }
      placeTools(tools, ev.clientX - ox, ev.clientY - oy);
    };
    const up = () => {
      grip.removeEventListener('pointermove', mv); grip.removeEventListener('pointerup', up); grip.removeEventListener('pointercancel', up);
      if (moved && tools.classList.contains('floating')) setToolsFloat(tools, true, { x: parseFloat(tools.style.left), y: parseFloat(tools.style.top) });
    };
    grip.addEventListener('pointermove', mv); grip.addEventListener('pointerup', up); grip.addEventListener('pointercancel', up);
  });
  return tools;
}
function placeTools(tools, x, y, save) {
  const w = tools.offsetWidth, h = tools.offsetHeight;
  x = clamp(x, 4, Math.max(4, document.documentElement.clientWidth - w - 4));
  y = clamp(y, 4, Math.max(4, innerHeight - h - 4));
  tools.style.left = x + 'px'; tools.style.top = y + 'px';
  if (save) setPref('toolsPos', JSON.stringify({ x, y }));
  return { x, y };
}
function setToolsFloat(tools, on, pos) {
  tools.classList.toggle('floating', on);
  setPref('toolsFloat', on ? '1' : '0');
  if (!on) { tools.classList.remove('vertical'); tools.style.left = tools.style.top = ''; return; }
  tools.classList.toggle('vertical', pref('toolsVert', '0') === '1');
  placeTools(tools, pos.x, pos.y, true);
}
function restoreTools() {
  const tools = ED?.root.querySelector('.tools');
  if (!tools || pref('toolsFloat', '0') !== '1') return;
  let pos = { x: 8, y: 140 };
  try { pos = { ...pos, ...JSON.parse(pref('toolsPos', '{}')) }; } catch { /* 初期位置のまま */ }
  setToolsFloat(tools, true, pos);
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
  for (const p of ED.file.pages) if (p.conns?.length) {          // 消えたアイテムにつながった矢印は片付ける
    const ids = new Set(p.items.map((i) => i.id));
    p.conns = p.conns.filter((c) => ids.has(c.from) && ids.has(c.to));
  }
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
    const frame = el("div", { class: "page", style: `aspect-ratio:${w} / ${h}; width:${r1(clamp(w / PAGE_W, 0.35, 1) * 100)}%; margin: 0 auto` }, buildStage(p, true));
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
    if (p.conns?.length) drawConns(frame.querySelector('.stage'), p);
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
  const editing = ED.editId;
  ED.rerendering = true;                                        // 描き直しで入力欄が消えても「入力をやめた」扱いにしない
  try { old.replaceWith(st); } finally { ED.rerendering = false; }
  if (page.conns?.length) drawConns(st, page);
  ED.editId = null;
  markSel();
  drawLassoBox();
  const it = editing && page.items.find((i) => i.id === editing);
  if (it && TEXTY.has(it.type)) startEditing(page, it);         // 入力中だったら入力を続けられるようにする
}
function autosizeText(ta) { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; }
function addPage(i) {
  const src = ED.file.pages[i];
  const p = newPage(src?.bg || "lined", src?.paper, src?.orient, src?.size, src?.cw, src?.ch);
  ED.file.pages.splice(i + 1, 0, p);
  commit(); renderPages();
  stageOf(p.id)?.closest('.page-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function dupPage(i) {
  const src = ED.file.pages[i];
  const p = JSON.parse(JSON.stringify(src));
  remapPage(p);
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
    el('div', { class: 'pop-row' }, seg([['port', '縦'], ['land', '横']], p.orient || 'port', (v) => apply(() => { p.orient = v; fitItems(p); }), () => {})),
    el('div', { class: 'pop-title' }, 'サイズ', el('span', { class: 'pop-sub', text: `（いま ${dims(p).w}×${dims(p).h}）` })),
    el('div', { class: 'size-grid' }, SIZES.map(([k, label, w, h]) => el('button', {
      class: 'size-opt' + ((p.size || 'a4') === k ? ' sel' : ''), type: 'button', 'aria-pressed': (p.size || 'a4') === k ? 'true' : 'false',
      title: w ? `${label}（${w}×${h}）` : '幅と高さを自分で決める',
      onclick: () => {
        if (k === 'custom') { closePopover(); customSize(p); return; }
        apply(() => { p.size = k; delete p.cw; delete p.ch; fitItems(p); });
      },
    }, label))),
    el('div', { class: 'menu-sep' }),
    el('button', { class: 'menu-item', type: 'button', onclick: () => { closePopover(); ED.file.pages.forEach((x) => { x.bg = p.bg; x.paper = p.paper; x.orient = p.orient; x.size = p.size; x.cw = p.cw; x.ch = p.ch; fitItems(x); }); commit(); renderPages(); toast('すべてのページを同じ用紙にしました'); } },
      icon('pageBg'), 'すべてのページをこの用紙にする'),
  ], 'paper-pop');
}
/* サイズを変えてページの外に出たものを、ページの中に戻す */
function fitItems(p) {
  const { w, h } = dims(p);
  for (const it of p.items) {
    it.x = Math.round(clamp(it.x, 0, Math.max(0, w - Math.min(it.w, w))));
    it.y = Math.round(clamp(it.y, 0, Math.max(0, h - 40)));
    if (it.w > w) it.w = w;
  }
}
async function customSize(p) {
  const cur = dims(p);
  const v = await dialog({ title: 'ページのサイズを決める', note: 'A4 の幅が 900 です（目安: A5 = 634×900、A3 = 1272×1800）。300〜3000 の数で入れてください。', fields: [
    { key: 'w', label: '幅', value: String(cur.w), maxlength: 4 },
    { key: 'h', label: '高さ', value: String(cur.h), maxlength: 4 },
  ], ok: '変更' });
  if (!v || !ED) return;
  const w = Math.round(+v.w), h = Math.round(+v.h);
  if (!(w >= 300 && w <= 3000 && h >= 300 && h <= 3000)) { toast('幅と高さは 300〜3000 の数で入れてください'); return; }
  p.size = 'custom'; p.cw = w; p.ch = h; p.orient = 'port';
  fitItems(p);
  commit(); renderPages();
  toast(`ページのサイズを ${w}×${h} にしました`);
}
function editorMenu(anchor) {
  const f = ED.file;
  menu(anchor, [
    ['addPage', 'ページを追加', () => addPage(f.pages.length - 1)],
    ['edit', '名前を変更', () => renameFile(f)],
    ['moveTo', '別のフォルダへ移動', () => moveFile(f)],
    ['copy', 'コピーを作る', () => cloneFile(f)],
    [DEVICES.find((x) => x[0] === device())[1], '使う端末を変える', () => chooseDevice()],
    ['trash', 'このメモファイルを削除（ゴミ箱へ）', () => deleteFile(f), true],
  ]);
}

/* --- ツール --- */
function setTool(t) {
  if (!ED) return;
  ED.tool = t;
  ED.toolBtns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.tool === t ? 'true' : 'false'));
  ED.root.className = ED.root.className.replace(/\btool-\S+/, 'tool-' + t);
  if (ED.lasso && t !== "lasso" && t !== "select") clearLasso(); if (ED.csel) clearConnSel();
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
    class: v === cur ? 'sel' : '', type: 'button', text: label, 'aria-pressed': v === cur ? 'true' : 'false', dataset: { v },
    onclick: () => { onPick(v); after(); },
  })));
}
function toggleBtn(ic, label, on, onClick, title) {
  return el('button', { class: 'toggle', type: 'button', 'aria-pressed': on ? 'true' : 'false', title: title || label, onclick: onClick }, icon(ic), label);
}
function hint(t) { return el('span', { class: 'sub-hint', text: t }); }
function fingerToggle() {
  if (device() !== 'tablet') return null;
  return toggleBtn('finger', '指でも書く', fingerDraw(), () => {
    const on = !fingerDraw();
    setPref('fingerDraw', on ? '1' : '0');
    ED.penSeen = !on; ED.root.classList.toggle('pen-seen', !on);
    toast(on ? '指でも書けるようにしました（スクロールは2本指で）' : 'Apple Pencil で書いて、指でスクロールします');
    renderSub();
  }, '指で書くか、指はスクロールに使うか');
}
function renderSub() {
  if (!ED) return;
  const s = ED.sub, t = ED.tool;
  s.replaceChildren();
  queueMicrotask(() => { if (ED?.sub === s && PEN_ONLY_TOOLS.has(t)) { const b = fingerToggle(); if (b) s.insertBefore(b, s.querySelector('.sub-hint')); } });
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
  } else if (t === 'text' && !sel) {
    s.append(el('span', { class: 'sub-label', text: 'テキストボックス' }),
      seg(TEXT_SIZES, ED.textSize, (v) => { ED.textSize = v; }), colorRow(INK, ED.textColor, (v) => { ED.textColor = v; }),
      seg([["h", "横書き"], ["v", "縦書き"]], ED.textVert ? "v" : "h", (v) => { ED.textVert = v === "v"; setPref("textVert", ED.textVert ? "1" : "0"); }),
      hint('置きたい場所をクリック'));
  } else if (t === 'sticky') {
    s.append(el('span', { class: 'sub-label', text: '付箋' }), colorRow(STICKY, ED.stickyColor, (v) => { ED.stickyColor = v; }),
      hint('貼りたい場所をクリック'));
  } else if (t === 'check') {
    s.append(el('span', { class: 'sub-label', text: 'チェックボックス' }),
      seg(TEXT_SIZES, ED.textSize, (v) => { ED.textSize = v; }), colorRow(INK, ED.textColor, (v) => { ED.textColor = v; }),
      hint('置きたい場所をクリック（Esc でやめる）'));
  } else if (t === 'shape') {
    const cfg = ED.shape;
    s.append(el('span', { class: 'sub-label', text: '図形' }),
      seg(SHAPES, cfg.kind, (v) => { cfg.kind = v; }),
      colorRow(INK, cfg.color, (v) => { cfg.color = v; }),
      seg(PEN_W, cfg.width, (v) => { cfg.width = v; }),
      OPEN_SHAPES.has(cfg.kind) ? null : seg(FILLS, cfg.fill, (v) => { cfg.fill = v; }),
      hint('ドラッグで描きます（Shift で正円・正方形、直線は15°ずつ）。クリックだけで決まった大きさに置けます'));
  } else if (ED.csel) {
    renderConnSub(s);
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
  // 文字の大きさ: 文字を選んでいたらその文字だけ（「選んだ文字」と出る）、選んでいなければ全体
  const sizeCtl = () => el('span', { class: 'size-ctl' },
    el('span', { class: 'sel-size-label', text: '選んだ文字:' }),
    seg(it.type === 'sticky' ? TEXT_SIZES.slice(0, 3) : TEXT_SIZES, textSel(it) ? sizeAt(it, textSel(it).a) : it.size, (v) => applySize(page, it, v)),
    el('span', { class: 'step-btns' },
      el('button', { class: 'step-btn', type: 'button', title: '文字を小さく（文字を選んでいたらその文字だけ）', 'aria-label': '文字を小さく', onclick: () => stepSize(page, it, -1) }, 'A−'),
      el('button', { class: 'step-btn big', type: 'button', title: '文字を大きく（文字を選んでいたらその文字だけ）', 'aria-label': '文字を大きく', onclick: () => stepSize(page, it, 1) }, 'A＋')));
  if (it.type === 'check') s.append(seg(TEXT_SIZES, it.size, restyle((v) => { it.size = v; ED.textSize = v; })), colorRow(INK, it.color, restyle((v) => { it.color = v; ED.textColor = v; })));
  if (it.type === 'text') s.append(sizeCtl(), colorRow(INK, it.color, restyle((v) => { it.color = v; ED.textColor = v; })));
  if (it.type === 'sticky') s.append(colorRow(STICKY, stickyBg(it.color), restyle((v) => { it.color = v; ED.stickyColor = v; })),
    sizeCtl(),
    toggleBtn('checkbox', 'チェックリスト', !!it.list, () => { it.list = !it.list; if (!it.list) delete it.checks; commit(); renderPage(page); renderSub(); }, '1行ごとにチェックボックスを付ける'));
  if (it.type === "text" || it.type === "sticky") s.append(seg([["h", "横書き"], ["v", "縦書き"]], it.vert ? "v" : "h", (v) => setVert(page, it, v === "v")));
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
    el("button", { class: "btn small", type: "button", title: "押したあと、つなぐ先の付箋をクリック", onclick: () => { ED.connectFrom = { pageId: page.id, itemId: it.id }; toast("つなぐ先の付箋をクリックしてください（Esc でやめる）"); } }, icon("arrowR"), "矢印でつなぐ"),
    iconBtn('copy', '複製', () => duplicateItem(page, it), 'sm'),
    iconBtn('lock', '固定', () => { it.locked = true; if (ED.editId === it.id) document.activeElement?.blur(); commit(); renderPage(page); renderSub(); }, 'sm'),
    iconBtn('trash', '削除（Delete）', () => deleteSelected(), 'sm'));
}
/* 横書き ⇔ 縦書き。テキストボックスは縦書きのとき高さを決めておく（付箋はもともと決まっている） */
function setVert(page, it, on) {
  if (!!it.vert === on) return;
  if (on) {
    it.vert = true;
    if (it.type === 'text') { const { h } = dims(page); const old = it.w; it.w = Math.max(120, Math.round(old * 0.45)); it.h = Math.round(clamp(old, 200, h - it.y)); it.x = Math.round(it.x + old - it.w); }
  } else {
    delete it.vert;
    if (it.type === 'text') { const old = it.h; delete it.h; it.x = Math.max(0, it.x + it.w - Math.max(200, old)); it.w = Math.max(200, old); }
  }
  ED.textVert = on; setPref('textVert', on ? '1' : '0');
  commit(); renderPage(page);
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
  if (ED.csel) clearConnSel();
  ED.connectFrom = null;
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
  drawConns(stageOf(s.page.id), s.page);
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
  ED.editId = it.id;
  d.classList.add('editing');
  if (CE_TYPES.has(it.type)) {                                   // テキストボックス・付箋: 大きさの違う文字をそのまま見せる欄
    const ce = el('div', { class: 'txt cedit', spellcheck: 'false', role: 'textbox', 'aria-multiline': 'true', 'aria-label': ITEM_LABEL[it.type], dataset: { ph: PLACEHOLDER[it.type] || '' } });
    ce.contentEditable = 'plaintext-only';
    if (ce.contentEditable !== 'plaintext-only') { ce.contentEditable = 'true'; ce.dataset.rich = '1'; }
    fillCedit(ce, it);
    view.replaceWith(ce);
    ce.focus({ preventScroll: true });
    ceSelect(ce, String(it.text || '').length);
  } else {
    const ta = el('textarea', { value: it.text || '', rows: 1, spellcheck: 'false', placeholder: PLACEHOLDER[it.type], 'aria-label': ITEM_LABEL[it.type] });
    view.replaceWith(ta);
    if (it.type !== "sticky" && !it.vert) autosizeText(ta);
    ta.focus({ preventScroll: true });
    const n = ta.value.length; ta.setSelectionRange(n, n);
  }
  if (device() === 'phone') zoomToRead(d, it);
}
/* スマホ: 文字を入力するときは、文字が読める大きさまでページを拡大する（入力が終わったら元の倍率に戻す） */
function zoomToRead(d, it) {
  const stage = d.closest('.stage');
  if (!stage) return;
  // 指を離した直後にページが動くので、そのあとに来る「クリック」が別のボタン（ページを追加など）に当たらないようにする
  swallowNextClick();
  const sc = ED.scroller, sr = sc.getBoundingClientRect();
  const scale = stage.getBoundingClientRect().width / (+stage.dataset.w || PAGE_W);
  const px = (it.size || 24) * scale;                       // いま画面に出ている文字の大きさ
  if (px < 15) {
    const r = d.getBoundingClientRect();
    let z = ED.zoom * 17 / px;
    z = Math.min(z, ED.zoom * (sr.width - 24) / Math.max(1, r.width));   // 横にはみ出さない大きさまで
    if (z > ED.zoom * 1.1) {
      if (ED.readZoom == null) ED.readZoom = ED.zoom;
      setZoom(z, r.left, r.top);
    }
  }
  // 入力する場所が見えるように（キーボードに隠れないよう上のほうへ）
  const r2 = d.getBoundingClientRect();
  if (r2.left < sr.left || r2.right > sr.right) sc.scrollLeft += r2.left - sr.left - 12;
  if (r2.top < sr.top || r2.top > sr.top + sr.height * 0.35) sc.scrollTop += r2.top - sr.top - 24;
}
function swallowNextClick() {
  const stop = (e) => { e.preventDefault(); e.stopPropagation(); off(); };
  const off = () => { clearTimeout(t); window.removeEventListener('click', stop, true); };
  const t = setTimeout(off, 500);
  window.addEventListener('click', stop, true);
}
function zoomBack() {
  if (!ED || ED.readZoom == null) return;
  const z = ED.readZoom; ED.readZoom = null;
  setTimeout(() => {                                         // 続けて別のアイテムを入力するときは戻さない
    if (!ED) return;
    if (ED.editId) ED.readZoom ??= z; else setZoom(z);
  }, 350);
}
function stopEditing(page, it, d, ta, rel) {
  if (!ED || ED.editId !== it.id) return;
  ED.editId = null;
  setTimeout(() => { if (ED && ED.editId !== it.id && ED.lastSel?.id === it.id) { ED.lastSel = null; ED.sub.classList.remove('has-textsel'); } }, 400);
  d.classList.remove('editing');
  // 空のテキストボックスは片付ける。ただし上のバーやメニューを操作しただけ（文字の大きさ・色を変えるなど）のときは残す
  const toBar = !!rel?.closest?.('.ed-top, .popover, .modal-wrap');
  if ((it.type === 'text' || it.type === 'check') && !it.text.trim() && page.items.includes(it) && !toBar) {
    page.items = page.items.filter((x) => x !== it);
    d.remove();
    if (ED.sel?.itemId === it.id) select(null);
  } else {
    ta.replaceWith(textView(it));
    d.querySelector('.item-tags')?.remove();
    const c = tagChips(it); if (c) d.querySelector('.h-move')?.before(c);
  }
  if (page.conns?.length) drawConns(stageOf(page.id), page);
  commit();
  renderNav();
  zoomBack();
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
/* --- スマホ・タブレット: 2本指でつまむと拡大・縮小、2本指で動かすとスクロール。
   Apple Pencil などのペンを使ったら、指はスクロール用になる（書くのはペンだけ） --- */
const PEN_ONLY_TOOLS = new Set(['pen', 'marker', 'eraser', 'shape', 'lasso']);
function bindTouch(root) {
  const sc = ED.scroller;
  const fingers = new Map();       // 画面にふれている指: pointerId → 最後の位置
  let first = null;                // 1本目の指で始めた操作（2本目が来たら取り消す）
  let pz = null, raf = 0, undoTo = null, synth = false;
  const startPinch = () => {
    if (ED.pinch) return;
    ED.pinch = true;
    root.classList.add('pinching');
    if (!first) return;
    const f = first; first = null;
    const at = fingers.get(f.id) || { x: 0, y: 0 };
    // 1本目の指で書きかけた線などは、なかったことにする
    synth = true;
    try { root.dispatchEvent(new PointerEvent('pointercancel', { pointerId: f.id, pointerType: 'touch', clientX: at.x, clientY: at.y, bubbles: true })); } finally { synth = false; }
    // ページを描き直すと指の操作が途切れるので、取り消しは指を離してから
    if (ED && ED.snap !== f.snap) undoTo = f;
  };
  const endPinch = () => {
    if (!ED) return;
    ED.pinch = false; pz = null; root.classList.remove('pinching');
    const f = undoTo; undoTo = null;
    if (f && ED.undo.length === f.undo + 1) { ED.undo.length = f.undo; ED.redo = f.redo; restore(f.snap); }
  };
  root.addEventListener('pointerdown', (e) => {
    // ペンを使ったら、指はスクロール用に（iPad は「指でも書く」の切り替えで決める）
    if (e.pointerType === 'pen' && !ED.penSeen && device() !== 'tablet') { ED.penSeen = true; root.classList.add('pen-seen'); }
    if (e.pointerType !== 'touch') return;
    fingers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ED.pinch || fingers.size > 1) { e.stopPropagation(); e.preventDefault(); startPinch(); return; }
    if (ED.penSeen && PEN_ONLY_TOOLS.has(ED.tool) && !e.target.closest('.lasso-box, .item.selected')) { e.stopPropagation(); first = null; return; }
    if (ED.commitT) commit();
    first = { id: e.pointerId, snap: ED.snap, undo: ED.undo.length, redo: ED.redo.slice() };
  }, true);
  root.addEventListener('pointermove', (e) => { if (fingers.has(e.pointerId)) fingers.set(e.pointerId, { x: e.clientX, y: e.clientY }); }, true);
  const lift = (e) => {
    if (synth || e.pointerType !== 'touch') return;
    fingers.delete(e.pointerId);
    if (first?.id === e.pointerId) first = null;
    if (!fingers.size) endPinch();
  };
  root.addEventListener('pointerup', lift, true);
  root.addEventListener('pointercancel', lift, true);

  const two = (e) => {
    const [a, b] = e.touches;
    return { d: Math.max(1, Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)), x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 };
  };
  sc.addEventListener('touchstart', (e) => {
    if (e.touches.length < 2) return;
    e.preventDefault();
    startPinch();
    const t = two(e);
    pz = { d0: t.d, z0: ED.zoom, x: t.x, y: t.y, t };
  }, { passive: false });
  sc.addEventListener('touchmove', (e) => {
    if (!pz || e.touches.length < 2) return;
    e.preventDefault();
    pz.t = two(e);
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      if (!ED || !pz) return;
      const t = pz.t;
      setZoom(pz.z0 * t.d / pz.d0, t.x, t.y);
      sc.scrollLeft -= t.x - pz.x; sc.scrollTop -= t.y - pz.y;
      pz.x = t.x; pz.y = t.y;
    });
  }, { passive: false });
  const touchEnd = (e) => {
    if (e.touches.length >= 2 && pz) { const t = two(e); pz = { d0: t.d, z0: ED.zoom, x: t.x, y: t.y, t }; return; }
    pz = null;
    if (!e.touches.length) endPinch();
  };
  sc.addEventListener('touchend', touchEnd);
  sc.addEventListener('touchcancel', touchEnd);
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
    const ce = ta.classList?.contains('cedit');
    if (ta.tagName !== 'TEXTAREA' && !ce) return;
    const d = ta.closest('.item'), stage = ta.closest('.stage');
    const it = pageById(stage.dataset.page)?.items.find((x) => x.id === d.dataset.id);
    if (!it) return;
    const r = ce ? readCedit(ta, it.size) : { text: ta.value };
    if (it.list && it.checks?.length) it.checks = remapChecks(it.text || '', r.text, it.checks);
    it.text = r.text;
    if (ce) { if (r.spans.length) it.spans = r.spans; else delete it.spans; }
    if (!ce && it.type !== "sticky" && !it.vert) autosizeText(ta);
    const page = pageById(stage.dataset.page);
    if (page.conns?.length) drawConns(stage, page);
    scheduleSave(); commitSoon(); updateHist();
  });
  // チェックボックスの中で Shift+Enter → 下に新しいチェックボックスの行を作って続けて書ける
  root.addEventListener('keydown', (e) => {
    const ta = e.target;
    if (ta.tagName !== 'TEXTAREA' || e.key !== 'Enter' || !e.shiftKey || e.isComposing) return;
    const d = ta.closest('.item-check');
    if (!d) return;
    const page = pageById(ta.closest('.stage').dataset.page);
    const it = page?.items.find((x) => x.id === d.dataset.id);
    if (!it) return;
    e.preventDefault();
    const rest = ta.value.slice(ta.selectionEnd);
    it.text = ta.value.slice(0, ta.selectionStart);
    const { h } = dims(page);
    const nx = { id: uid(), type: 'check', x: it.x, y: Math.round(Math.min(it.y + d.offsetHeight + 2, h - 50)), w: it.w, text: rest, checked: false, size: it.size, color: it.color };
    if (it.rot) nx.rot = it.rot;
    page.items.splice(page.items.indexOf(it) + 1, 0, nx);
    ED.editId = null;
    commit(); renderPage(page); select(page.id, nx.id);
    startEditing(page, nx);
    const nta = itemDiv(nx.id)?.querySelector('textarea');
    nta?.setSelectionRange(0, 0);
  });
  root.addEventListener('change', (e) => {
    const c = e.target;
    if (!c.classList?.contains('ctl')) return;
    const d = c.closest('.item'), stage = c.closest('.stage');
    const it = pageById(stage.dataset.page)?.items.find((x) => x.id === d.dataset.id);
    if (!it) return;
    if (c.dataset.line != null) {                                 // 付箋のチェックリストの1行
      const lines = String(it.text || '').split('\n').length;
      it.checks = Array.from({ length: lines }, (_, i) => !!it.checks?.[i]);
      it.checks[+c.dataset.line] = c.checked;
      c.closest('.li')?.classList.toggle('done', c.checked);
    } else if (c.type === 'checkbox') { it.checked = c.checked; d.classList.toggle('checked', c.checked); } else it.value = c.value;
    commit();
  });
  root.addEventListener('focusout', (e) => {
    const ta = e.target;
    if (ta.tagName !== 'TEXTAREA' && !ta.classList?.contains('cedit')) return;
    const d = ta.closest('.item'), stage = ta.closest('.stage');
    const page = stage && pageById(stage.dataset.page);
    const it = page?.items.find((x) => x.id === d.dataset.id);
    if (it && !ED.rerendering) stopEditing(page, it, d, ta, e.relatedTarget);
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
  const busy = !!(ED.editId || ED.sel || ED.lasso);
  if (document.activeElement?.closest?.('.stage')) document.activeElement.blur();
  if (tool === 'text' || tool === 'sticky' || tool === 'check') {
    // スマホのテキスト入力: 置いたあともテキストのまま（続けて書ける）。入力中・選択中に空いた所を押したら、まず入力を終えるだけ
    const stay = device() === 'phone' && tool === 'text';
    if (stay && busy) { e.preventDefault(); if (ED.lasso) clearLasso(); select(null); renderSub(); return; }
    const place = () => { createItem(page, tool, pt); if (!stay) setTool('select'); };
    if (e.pointerType === 'touch') {                            // 指: スクロールだったら置かない。指を離したときに置く
      e.preventDefault();                                       // （スクロールは止まらない。あとのマウスのイベントで入力欄が閉じないように）
      track(e, () => {}, (ev) => { if (ev.type !== 'pointercancel' && ED?.tool === tool) place(); });
      return;
    }
    e.preventDefault(); place(); return;
  }
  // 選択ツールで線や図形をクリック → その線を選ぶ（そのままドラッグで移動もできる）
  if (ED.lasso) clearLasso();
  const ch = hitConn(stage, page, pt);
  if (ch) {                                                    // 矢印をクリック → 選ぶ（ダブルクリックで補足文字の入力へ）
    e.preventDefault();
    selectConn(page, ch.id);
    if (e.detail >= 2) setTimeout(() => ED?.sub.querySelector('.sub-input')?.focus(), 0);
    return;
  }
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
    if (ED.textVert) {                                          // 縦書き: 右上から下へ書き、行は左へ増える
      it.vert = true; it.w = 200;
      it.x = Math.round(clamp(pt.x - 100, 0, w - 200)); it.y = Math.round(clamp(pt.y - 20, 0, h - 120));
      it.h = Math.round(Math.min(480, h - it.y));
    }
  } else if (type === 'check') {
    const x = clamp(pt.x - ED.textSize * 0.7, 0, w - 160);
    it = { id: uid(), type: 'check', x: Math.round(x), y: Math.round(clamp(pt.y - ED.textSize * 0.9, 0, h - 60)), w: Math.round(Math.min(420, w - x)), text: '', checked: false, size: ED.textSize, color: ED.textColor };
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
  if (e.target.closest(".h-conn")) { e.preventDefault(); if (ED.sel?.itemId !== it.id) select(page.id, it.id); return dragConn(e, stage, page, it); }
  if (ED.connectFrom) { const cf = ED.connectFrom; ED.connectFrom = null; if (cf.pageId === page.id && cf.itemId !== it.id) { e.preventDefault(); addConn(page, cf.itemId, it.id); return; } }
  if (e.target.closest(".h-del")) { e.preventDefault(); if (ED.editId === it.id) ED.editId = null; select(page.id, it.id); deleteSelected(); return; }
  const handle = e.target.closest('.h-resize') ? 'resize' : e.target.closest('.h-move') ? 'move' : null;
  if (!handle && ED.editId === it.id && e.target.closest('textarea, .cedit')) return;   // 入力中の文字の操作はそのまま
  if (ED.editId && ED.editId !== it.id) document.activeElement?.blur();
  if (!handle && e.target.closest('.ctl')) { if (ED.sel?.itemId !== it.id) select(page.id, it.id); return; }   // チェック・プルダウンはそのまま使える
  const onGrip = !!e.target.closest('.grip');
  if (e.pointerType === 'touch' && !handle && ED.sel?.itemId !== it.id && (ED.tool === 'select' || ED.tool === 'text')) {
    // 指でまだ選んでいないアイテムにふれたとき: なぞったらページのスクロール、トンと押したら選ぶ（動かすのは選んでから）
    e.preventDefault();
    track(e, () => {}, (ev) => {
      if (ev.type === 'pointercancel' || !ED || !pageById(page.id)?.items.includes(it)) return;
      select(page.id, it.id);
      if (it.type === 'link' && !onGrip && !it.locked) openLink(it);
      else if (TEXTY.has(it.type) && ED.editId !== it.id) startEditing(page, it);
    });
    return;
  }
  e.preventDefault();
  if (ED.sel?.itemId !== it.id) select(page.id, it.id);
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
      if (it.type === "sticky" || it.vert) { it.w = Math.round(clamp(o.w + dx, it.vert ? 50 : 100, W)); it.h = Math.round(clamp(o.h + dy, 80, H)); }
      else if (it.type === 'image') { it.w = Math.round(clamp(o.w + dx, 30, W * 1.5)); it.h = Math.round(it.w * ratio); }
      else it.w = Math.round(clamp(o.w + dx, 80, W * 1.5));
      placeItem(d, it);
      const ta = d.querySelector('textarea'); if (ta && it.type !== "sticky" && !it.vert) autosizeText(ta);
      if (page.conns?.length) drawConns(stage, page);
    } else {
      // 動かしている間は transform だけ変える（レイアウトを計算し直さないので速い）
      it.x = Math.round(clamp(o.x + dx, 40 - it.w, W - 40));
      it.y = Math.round(clamp(o.y + dy, -20, H - 40));
      placeItem(d, { ...it, x: o.x, y: o.y }, it.x - o.x, it.y - o.y);
      if (page.conns?.length) drawConns(stage, page);
    }
  }, () => {
    d.classList.remove('dragging');
    if (moved) { placeItem(d, it); commit(); if (ED?.editId === it.id) d.querySelector('textarea, .cedit')?.focus({ preventScroll: true }); }
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
    if (page.conns?.length) { const n = page.conns.length; page.conns = page.conns.filter((c) => { const g = connGeom(stage, page, c); return !g || distSeg(p.x, p.y, g.a, g.b) >= R + c.width / 2; }); if (page.conns.length !== n) { changed = true; drawConns(stage, page); } }
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
  const closer = svgEl('path', { class: 'lasso-closer', d: '' });
  ink.append(path, closer);
  const tapItem = e.target.closest('.item');
  track(e, (ev) => {
    const p = loc(ev);
    const l = poly[poly.length - 1];
    if (Math.hypot(p.x - l[0], p.y - l[1]) < 3) return;
    poly.push([p.x, p.y]);
    path.setAttribute('d', 'M' + poly.map((q) => q.join(' ')).join('L'));
    closer.setAttribute('d', `M${p.x} ${p.y}L${poly[0][0]} ${poly[0][1]}`);     // 始点と終点を結ぶ線（ここまでが選ぶ範囲）
  }, () => {
    path.remove(); closer.remove();
    const L = { pageId: page.id, strokes: new Set(), items: new Set() };
    if (pathLen(poly) < 12) {                                   // タップ: その場所のものを1つ選ぶ
      if (tapItem) L.items.add(tapItem.dataset.id);
      else { const s = [...page.strokes].reverse().find((x) => hitStroke(x, pt, x.width / 2 + 8)); if (s) L.strokes.add(s.id); }
    } else {
      // なぞった線を周にして（途中で切れていたら始点と終点を結んで）、その中に少しでも入っているものを全部選ぶ
      for (const s of page.strokes) {
        if (densify(s.pts, 4).some((q) => inPoly(q[0], q[1], poly)) || (s.fill && s.pts.length > 2 && poly.some((q) => inPoly(q[0], q[1], s.pts)))) L.strokes.add(s.id);
      }
      for (const it of page.items) {
        const h = itemH(it), x1 = it.x + it.w, y1 = it.y + h;
        const probe = [];
        for (let i = 0; i <= 4; i++) for (let j = 0; j <= 4; j++) probe.push([it.x + (it.w * i) / 4, it.y + (h * j) / 4]);
        if (probe.some((q) => inPoly(q[0], q[1], poly)) || poly.some((q) => q[0] >= it.x && q[0] <= x1 && q[1] >= it.y && q[1] <= y1)) L.items.add(it.id);
      }
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
    if (page.conns?.length) drawConns(stage, page);
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
  const map = new Map(); items.forEach((it, i) => map.set(it.id, [...N.items][i]));
  for (const c of (page.conns || []).filter((c) => map.has(c.from) && map.has(c.to))) page.conns.push({ ...c, id: uid(), from: map.get(c.from), to: map.get(c.to) });
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
  const out = [], seen = new Set();
  for (const b of liveBoxes()) for (const fo of foldersOf(b.id)) for (const f of filesOf(b.id, fo.id)) {
    if (seen.has(f.id)) continue; seen.add(f.id);
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
  } else if (type === 'check') {                                // テキストボックスと同じく、クリックした場所に置く
    setTool('check');
    toast('チェックボックスを置きたい場所をクリックしてください（Esc でやめる）');
    return;
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
  pop = el('div', { class: 'popover ' + cls, role: 'dialog', onclick: (e) => e.stopPropagation(),
    onmousedown: (e) => { if (ED?.editId && e.target.closest('button')) e.preventDefault(); } }, content);
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
      onsubmit: (e) => { e.preventDefault(); const v = {}; for (const [k, inp] of Object.entries(inputs)) v[k] = inp.checks ? inp.checks.filter((c) => c.checked).map((c) => c.value) : inp.value; done(v); },
    },
    el('h2', { text: title }),
    note ? el('p', { class: 'note', text: note }) : null,
    fields.map((f) => {
      let inp;
      if (f.type === 'checks') {
        const checks = [];
        inp = el('div', { class: 'field-checks' }, f.options.map(([v, l]) => (v === null ? el('div', { class: 'checks-head', text: l })
          : el('label', { class: 'check-row' }, (() => { const c = el('input', { type: 'checkbox', value: v }); c.checked = (f.value || []).includes(v); checks.push(c); return c; })(), el('span', { text: l })))));
        inp.checks = checks;
        inputs[f.key] = inp;
        return el('div', { class: 'field' }, el('span', { class: 'field-label', text: f.label }), inp);
      }
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
    if (first?.checks) first.checks[0]?.focus(); else { first?.focus(); first?.select?.(); }
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
function normFolder(f) { const t = Date.now(); return { id: String(f.id || uid()), boxId: String(f.boxId), name: String(f.name || 'フォルダ'), alsoBoxes: Array.isArray(f.alsoBoxes) ? f.alsoBoxes.map(String) : [], created: f.created || t, updated: f.updated || t, trashedAt: f.trashedAt || null }; }
function normFile(f) {
  const t = Date.now();
  const pages = (Array.isArray(f.pages) && f.pages.length ? f.pages : [newPage()]).map((p) => ({
    id: String(p.id || uid()),
    bg: PAPERS.some(([k]) => k === p.bg) ? p.bg : 'plain',
    paper: typeof p.paper === 'string' ? p.paper : PAPER_COLORS[0][0],
    orient: p.orient === 'land' ? 'land' : 'port',
    size: SIZES.some(([k]) => k === p.size) ? p.size : "a4",
    cw: +p.cw || undefined, ch: +p.ch || undefined,
    items: Array.isArray(p.items) ? p.items.filter((i) => ITEM_LABEL[i.type]) : [],
    strokes: Array.isArray(p.strokes) ? p.strokes.filter((s) => Array.isArray(s.pts)) : [],
    conns: Array.isArray(p.conns) ? p.conns.filter((c) => c && c.from && c.to) : [],
  }));
  return { id: String(f.id || uid()), boxId: String(f.boxId), folderId: String(f.folderId), alsoFolders: Array.isArray(f.alsoFolders) ? f.alsoFolders.map(String) : [], name: String(f.name || '無題のメモ'), pages, created: f.created || t, updated: f.updated || t, trashedAt: f.trashedAt || null };
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
  applyTheme(); applyLayout(); applyDevice();

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
      [DEVICES.find((x) => x[0] === device())[1], '使う端末を変える', () => chooseDevice()],
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
        if (ED.csel) { clearConnSel(); renderSub(); return; }
        if (ED.connectFrom) { ED.connectFrom = null; toast("矢印でつなぐのをやめました"); return; }
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
    if (ED && (e.ctrlKey || e.metaKey) && !e.altKey) {           // Ctrl + + / - / 0 でページの拡大・縮小・元の大きさ
      if (e.key === '+' || e.key === '=' || e.key === ';') { e.preventDefault(); stepZoom(1); return; }
      if (e.key === '-') { e.preventDefault(); stepZoom(-1); return; }
      if (e.key === '0') { e.preventDefault(); setZoom(1); return; }
    }
    if (isTyping() || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === '/') { e.preventDefault(); search.focus(); return; }
    if (!ED) return;
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (ED.csel) { e.preventDefault(); deleteConn(); return; }
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
  window.addEventListener('resize', () => {
    if (!isNarrow()) closeNav();
    applyZoom();
    const t = ED?.root.querySelector('.tools.floating');
    if (t) placeTools(t, parseFloat(t.style.left), parseFloat(t.style.top));
  });
  window.addEventListener('beforeunload', () => { if (ED) { if (ED.commitT) commit(); flushSave(); } noteFlush(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { if (ED) flushSave(); noteFlush(); } });

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
  if (!S.device) chooseDevice(true);   // 初めて開いたとき: 使う端末を選んでもらう
  // ホーム画面に追加して、オフラインでも開けるように
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
}

init();
