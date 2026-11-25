import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import webPhoto from './OSAH2023-original.2f4567c88a1f1cdeeac8.jpeg';
import resumePDF from './Moaz_Sholook_SWE_Fall_2026_Resume.pdf';
import shopifyLogo from './shopify-logo.png';
import isedLogo from './ISED_Canada_Logo.jpg';
import biocareLogo from './logos/biocare-logo-full.png';
import terminalLogo from './terminal-logo.svg';
import ecolensImg from './ecolens-screenshot.png';
import jingeImg from './jinge-gallery.jpg';
import wchewsImg from './wchews-screenshot.jpg';
import batchhatchImg from './batchhatch-screenshot.jpg';

/* ---------------------------------- data ---------------------------------- */

const roles = [
  'Incoming SWE Intern @ Terminal (YC S23)',
  'CS Student @ Carleton University',
  'Full-Stack Developer',
  'AI/ML + CV Tinkerer',
];

interface WorkCard {
  company: string;
  sub?: string;
  role: string;
  dates?: string;
  logo: string;
  link: string;
  incoming?: boolean;
  tech: string[];
}

const workCards: WorkCard[] = [
  {
    company: 'Terminal',
    sub: 'YC S23 · Toronto',
    role: 'Software Engineering Intern — Backend',
    dates: 'Jan 2027 – Apr 2027',
    logo: terminalLogo,
    link: 'https://withterminal.com',
    incoming: true,
    tech: ['Backend', 'Winter 2027'],
  },
  {
    company: 'Shopify',
    role: 'Software Engineering Intern',
    logo: shopifyLogo,
    link: 'https://shopify.com',
    tech: ['Ruby', 'Rails', 'React', 'TypeScript', 'GraphQL'],
  },
  {
    company: 'ISED Canada',
    role: 'Software Engineering Intern',
    logo: isedLogo,
    link: 'https://ised-isde.canada.ca',
    tech: ['JavaScript', 'Spring Boot', 'Node.js'],
  },
];

interface ProjectLink {
  label: string;
  url: string;
}

interface Project {
  name: string;
  badge: string;
  description: string;
  tech: string[];
  image?: string;
  links: ProjectLink[];
}

const projects: Project[] = [
  {
    name: 'Wchews',
    badge: 'Stupid Ideas Hackathon 2026 · Solo Build',
    description:
      'Scan a meal and get a 0–100 score with a verdict from CERTIFIED L NIBBLES to ABSOLUTE CINEMA. No ML — every stat is a hand-built OpenCV measurement, served with a roast, a meme and Discord sharing.',
    tech: ['Python', 'Flask', 'OpenCV', 'NumPy'],
    image: wchewsImg,
    links: [
      { label: 'Live Demo', url: 'https://wchews.onrender.com' },
      { label: 'Devpost', url: 'https://devpost.com/software/wchews' },
    ],
  },
  {
    name: 'Jinge',
    badge: 'Stupid Ideas Hackathon 2026 · Team of 4',
    description:
      "Find love. Protect shareholder value. A dating sim where every dialogue choice moves hearts and the stock price. Branching chats, date rounds, and one rule: don't tank the stock.",
    tech: ['TypeScript', 'Next.js', 'CSS'],
    image: jingeImg,
    links: [
      { label: 'GitHub', url: 'https://github.com/catOnKeyboardd/TheAffair' },
      { label: 'Demo', url: 'https://youtu.be/tUfkN8cRu10' },
      { label: 'Devpost', url: 'https://devpost.com/software/jinge' },
    ],
  },
  {
    name: 'BatchHatch',
    badge: 'Hack the Hill 2026 · CGI Challenge',
    description:
      "Fix the bill while the customer is still on the phone. A browser-based billing correction tool that runs a port of a 1998 COBOL rating engine in 15 ms and queues the fix as an 80-column batch record.",
    tech: ['TypeScript', 'Next.js', 'COBOL port'],
    image: batchhatchImg,
    links: [
      { label: 'GitHub', url: 'https://github.com/omarismail-cs/BatchHatch' },
      { label: 'Devpost', url: 'https://devpost.com/software/batchhatch' },
    ],
  },
  {
    name: 'EcoLens',
    badge: 'uOttaHack 2026',
    description:
      'Scan any product to see its carbon footprint, discover alternatives, and build your EcoScore.',
    tech: ['React', 'Python', 'AI/ML'],
    image: ecolensImg,
    links: [
      { label: 'GitHub', url: 'https://github.com/ismailahmed1/eco-lens' },
      {
        label: 'Demo',
        url: 'https://www.linkedin.com/feed/update/urn:li:activity:7419584688849260544/',
      },
    ],
  },
  {
    name: 'Brightspace MCP Server',
    badge: '20+ Active Users',
    description:
      'Open-source MCP server connecting D2L Brightspace with AI assistants like Claude and Cursor.',
    tech: ['TypeScript', 'Playwright', 'MCP'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Yxxxxs/Brightspace-mcp-server' },
    ],
  },

];

const skillCategories = [
  { name: 'Languages', items: ['Ruby', 'TypeScript', 'JavaScript', 'Python', 'Java', 'C/C++', 'SQL', 'Go', 'Swift', 'HTML/CSS'] },
  { name: 'Frameworks', items: ['Ruby on Rails', 'React.js', 'Node.js/Express', 'Next.js', 'Angular', 'Spring Boot', 'Flask', 'FastAPI'] },
  { name: 'Libraries & APIs', items: ['GraphQL', 'OpenCV', 'Tailwind CSS', 'Playwright', 'React Polaris', 'TensorFlow', 'PyTorch'] },
  { name: 'Developer Tools', items: ['Git', 'Linux', 'Docker', 'BigQuery', 'AWS', 'Azure', 'Postman', 'JIRA', 'Jenkins'] },
  { name: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'] },
  { name: 'AI Tools', items: ['Claude Code', 'Codex', 'Cursor'] },
];

const palette = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080',
  '#800080', '#808040', '#004040', '#0080ff', '#004080', '#8000ff', '#804000',
  '#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff',
  '#ff00ff', '#ffff80', '#00ff80', '#80ffff', '#8080ff', '#ff0080', '#ff8040',
];

const tools = [
  { id: 'select', label: 'Select', cursor: 'default' },
  { id: 'eraser', label: 'Eraser', cursor: 'cell' },
  { id: 'fill', label: 'Fill With Color', cursor: 'crosshair' },
  { id: 'pick', label: 'Pick Color', cursor: 'crosshair' },
  { id: 'zoom', label: 'Magnifier', cursor: 'zoom-in' },
  { id: 'pencil', label: 'Pencil', cursor: 'crosshair' },
  { id: 'brush', label: 'Brush', cursor: 'crosshair' },
  { id: 'airbrush', label: 'Airbrush', cursor: 'crosshair' },
  { id: 'text', label: 'Text', cursor: 'text' },
  { id: 'line', label: 'Line', cursor: 'crosshair' },
  { id: 'curve', label: 'Curve', cursor: 'crosshair' },
  { id: 'rect', label: 'Rectangle', cursor: 'crosshair' },
  { id: 'polygon', label: 'Polygon', cursor: 'crosshair' },
  { id: 'ellipse', label: 'Ellipse', cursor: 'crosshair' },
];

function ToolIcon({ id }: { id: string }) {
  switch (id) {
    case 'select':
      return (<svg viewBox="0 0 16 16"><rect x="2" y="2" width="12" height="12" fill="none" stroke="#000" strokeDasharray="2 1" /></svg>);
    case 'eraser':
      return (<svg viewBox="0 0 16 16"><rect x="3" y="8" width="9" height="6" fill="#ff80c0" stroke="#000" /><rect x="5" y="5" width="7" height="3" fill="#fff" stroke="#000" /></svg>);
    case 'fill':
      return (<svg viewBox="0 0 16 16"><path d="M4 2 h6 v4 h-6 z" fill="#000" /><path d="M10 4 l3 3 -6 6 -3 -3 z" fill="#808080" stroke="#000" /><rect x="12" y="12" width="2" height="2" fill="#000" /></svg>);
    case 'pick':
      return (<svg viewBox="0 0 16 16"><path d="M2 14 L9 7" stroke="#000" strokeWidth="1.5" /><path d="M8 8 L12 4 L13 5 L9 9 Z" fill="#000" /><path d="M11 3 L14 6" stroke="#000" strokeWidth="1.5" /></svg>);
    case 'zoom':
      return (<svg viewBox="0 0 16 16"><circle cx="6" cy="6" r="4" fill="none" stroke="#000" strokeWidth="1.5" /><path d="M9 9 L14 14" stroke="#000" strokeWidth="2" /></svg>);
    case 'pencil':
      return (<svg viewBox="0 0 16 16"><path d="M2 14 L3.5 10.5 L11 3 L13 5 L5.5 12.5 Z" fill="#000" /><path d="M2 14 L3 13 L2.5 12.5 Z" fill="#000" /></svg>);
    case 'brush':
      return (<svg viewBox="0 0 16 16"><path d="M3 13 L10 6 L12 8 L5 15 L2 15 Z" fill="#000" /><rect x="10" y="3" width="4" height="3" transform="rotate(45 12 4.5)" fill="#000" /></svg>);
    case 'airbrush':
      return (<svg viewBox="0 0 16 16"><rect x="2" y="9" width="5" height="4" fill="#000" /><rect x="8" y="6" width="1.5" height="1.5" fill="#000" /><rect x="11" y="4" width="1.5" height="1.5" fill="#000" /><rect x="13" y="7" width="1.5" height="1.5" fill="#000" /><rect x="10" y="9" width="1.5" height="1.5" fill="#000" /><rect x="13" y="1" width="1.5" height="1.5" fill="#000" /></svg>);
    case 'text':
      return (<svg viewBox="0 0 16 16"><text x="3" y="13" fontSize="13" fontFamily="Tahoma, sans-serif" fill="#000">A</text></svg>);
    case 'line':
      return (<svg viewBox="0 0 16 16"><path d="M2 14 L14 2" stroke="#000" strokeWidth="1.5" /></svg>);
    case 'curve':
      return (<svg viewBox="0 0 16 16"><path d="M2 13 Q 8 1 14 13" fill="none" stroke="#000" strokeWidth="1.5" /></svg>);
    case 'rect':
      return (<svg viewBox="0 0 16 16"><rect x="2" y="4" width="12" height="9" fill="none" stroke="#000" strokeWidth="1.5" /></svg>);
    case 'polygon':
      return (<svg viewBox="0 0 16 16"><path d="M8 2 L14 7 L11 14 L4 13 L2 6 Z" fill="none" stroke="#000" strokeWidth="1.5" /></svg>);
    case 'ellipse':
      return (<svg viewBox="0 0 16 16"><ellipse cx="8" cy="8" rx="6" ry="4.5" fill="none" stroke="#000" strokeWidth="1.5" /></svg>);
    default:
      return null;
  }
}


/* ------------------------------ drawing layer ------------------------------ */

type DrawHandle = { clear: () => void; save: () => void };

const DrawLayer = React.forwardRef<
  DrawHandle,
  { tool: string; color: string; onPick: (c: string) => void; onText: () => string | null }
>(function DrawLayer({ tool, color, onPick, onText }, ref) {
  const cvs = useRef<HTMLCanvasElement>(null);
  const snap = useRef<ImageData | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const air = useRef<number | null>(null);
  const active = ['pencil', 'brush', 'airbrush', 'eraser', 'line', 'rect', 'ellipse', 'fill', 'pick', 'text'].includes(tool);

  React.useImperativeHandle(ref, () => ({
    clear: () => {
      const c = cvs.current;
      c?.getContext('2d')?.clearRect(0, 0, c.width, c.height);
    },
    save: () => {
      const c = cvs.current;
      if (!c) return;
      const out = document.createElement('canvas');
      out.width = c.width;
      out.height = c.height;
      const o = out.getContext('2d')!;
      o.fillStyle = '#fff';
      o.fillRect(0, 0, out.width, out.height);
      o.drawImage(c, 0, 0);
      const a = document.createElement('a');
      a.download = 'moaz_portfolio_doodle.png';
      a.href = out.toDataURL('image/png');
      a.click();
    },
  }));

  /* keep the bitmap sized to the page */
  useEffect(() => {
    const c = cvs.current;
    const parent = c?.parentElement;
    if (!c || !parent) return;
    const fit = () => {
      const w = parent.clientWidth;
      const h = parent.scrollHeight;
      if (c.width === w && c.height === h) return;
      const old = document.createElement('canvas');
      old.width = c.width;
      old.height = c.height;
      if (c.width && c.height) old.getContext('2d')!.drawImage(c, 0, 0);
      c.width = w;
      c.height = h;
      c.getContext('2d')!.drawImage(old, 0, 0);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    const iv = setInterval(fit, 1500);
    return () => { ro.disconnect(); clearInterval(iv); };
  }, []);

  const pos = (e: React.PointerEvent) => {
    const r = cvs.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const floodFill = (x0: number, y0: number) => {
    const c = cvs.current!;
    const ctx = c.getContext('2d')!;
    const img = ctx.getImageData(0, 0, c.width, c.height);
    const d = img.data;
    const x = Math.floor(x0), y = Math.floor(y0);
    const idx = (y * c.width + x) * 4;
    const t = [d[idx], d[idx + 1], d[idx + 2], d[idx + 3]];
    const n = parseInt(color.slice(1), 16);
    const f = [(n >> 16) & 255, (n >> 8) & 255, n & 255, 255];
    if (t.every((v, i) => v === f[i])) return;
    const same = (i: number) => d[i] === t[0] && d[i + 1] === t[1] && d[i + 2] === t[2] && d[i + 3] === t[3];
    const stack = [x, y];
    let count = 0;
    while (stack.length && count < c.width * c.height * 0.3) {
      const cy = stack.pop()!, cx = stack.pop()!;
      if (cx < 0 || cy < 0 || cx >= c.width || cy >= c.height) continue;
      const i = (cy * c.width + cx) * 4;
      if (!same(i)) continue;
      d[i] = f[0]; d[i + 1] = f[1]; d[i + 2] = f[2]; d[i + 3] = 255;
      count++;
      stack.push(cx + 1, cy, cx - 1, cy, cx, cy + 1, cx, cy - 1);
    }
    if (count < c.width * c.height * 0.3) ctx.putImageData(img, 0, 0);
  };

  const stroke = (ctx: CanvasRenderingContext2D, a: { x: number; y: number }, b: { x: number; y: number }) => {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = tool === 'brush' ? 8 : 2;
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 16;
    }
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
  };

  const spray = (pt: { x: number; y: number }) => {
    const ctx = cvs.current!.getContext('2d')!;
    ctx.fillStyle = color;
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 12;
      ctx.fillRect(pt.x + Math.cos(a) * r, pt.y + Math.sin(a) * r, 1.5, 1.5);
    }
  };

  const down = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = cvs.current!;
    const ctx = c.getContext('2d')!;
    const pt = pos(e);
    if (tool === 'pick') {
      const px = ctx.getImageData(Math.floor(pt.x), Math.floor(pt.y), 1, 1).data;
      if (px[3] > 0) {
        onPick('#' + [px[0], px[1], px[2]].map((v) => v.toString(16).padStart(2, '0')).join(''));
      }
      return;
    }
    if (tool === 'fill') { floodFill(pt.x, pt.y); return; }
    if (tool === 'text') {
      const t = onText();
      if (t) {
        ctx.fillStyle = color;
        ctx.font = 'bold 22px "Comic Sans MS", Tahoma, sans-serif';
        ctx.fillText(t, pt.x, pt.y);
      }
      return;
    }
    c.setPointerCapture(e.pointerId);
    start.current = pt;
    last.current = pt;
    snap.current = ctx.getImageData(0, 0, c.width, c.height);
    if (tool === 'airbrush') {
      spray(pt);
      air.current = window.setInterval(() => last.current && spray(last.current), 30);
    } else if (tool === 'pencil' || tool === 'brush' || tool === 'eraser') {
      stroke(ctx, pt, { x: pt.x + 0.1, y: pt.y + 0.1 });
    }
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!start.current) return;
    const c = cvs.current!;
    const ctx = c.getContext('2d')!;
    const pt = pos(e);
    if (tool === 'pencil' || tool === 'brush' || tool === 'eraser') {
      stroke(ctx, last.current!, pt);
    } else if (tool === 'airbrush') {
      spray(pt);
    } else if (snap.current) {
      ctx.putImageData(snap.current, 0, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      const s0 = start.current;
      ctx.beginPath();
      if (tool === 'line') {
        ctx.moveTo(s0.x, s0.y);
        ctx.lineTo(pt.x, pt.y);
      } else if (tool === 'rect') {
        ctx.rect(s0.x, s0.y, pt.x - s0.x, pt.y - s0.y);
      } else if (tool === 'ellipse') {
        ctx.ellipse((s0.x + pt.x) / 2, (s0.y + pt.y) / 2, Math.abs(pt.x - s0.x) / 2, Math.abs(pt.y - s0.y) / 2, 0, 0, Math.PI * 2);
      }
      ctx.stroke();
    }
    last.current = pt;
  };

  const up = () => {
    start.current = null;
    snap.current = null;
    if (air.current) { clearInterval(air.current); air.current = null; }
  };

  return (
    <canvas
      ref={cvs}
      className={`draw-layer ${active ? 'draw-active' : ''}`}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
    />
  );
});

/* ---------------------------------- app ---------------------------------- */

function App() {
  const [typed, setTyped] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [accent, setAccent] = useState('#0000ff');
  const [activeTool, setActiveTool] = useState('select');
  const [zoomed, setZoomed] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const drawRef = useRef<DrawHandle>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [dialog, setDialog] = useState<string | null>(null);
  const [coords, setCoords] = useState('0, 0');
  const [now, setNow] = useState(new Date());
  const canvasRef = useRef<HTMLDivElement>(null);

  /* typewriter */
  useEffect(() => {
    const current = roles[roleIndex % roles.length];
    let delay = isDeleting ? 30 : 60;
    if (!isDeleting && typed === current) delay = 1800;
    if (isDeleting && typed === '') delay = 400;
    const t = setTimeout(() => {
      if (!isDeleting && typed === current) {
        setIsDeleting(true);
      } else if (isDeleting && typed === '') {
        setIsDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      } else {
        setTyped(current.substring(0, typed.length + (isDeleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [typed, isDeleting, roleIndex]);

  /* taskbar clock */
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 5000);
    return () => clearInterval(t);
  }, []);

  const activeCursor = tools.find((t) => t.id === activeTool)?.cursor || 'default';

  const clockText = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  const toolHints: Record<string, string> = {
    select: 'Select: click links as normal. Pick a drawing tool to doodle on this page.',
    pencil: 'Pencil: drag anywhere on the page to draw.',
    brush: 'Brush: drag to paint thick strokes.',
    airbrush: 'Airbrush: hold and drag to spray paint.',
    eraser: 'Eraser: rubs out your doodles, not my content.',
    fill: 'Fill With Color: click inside a closed shape you drew.',
    pick: 'Pick Color: click a doodle to grab its color.',
    line: 'Line: drag to draw a straight line.',
    rect: 'Rectangle: drag to draw a box.',
    ellipse: 'Ellipse: drag to draw an oval.',
    text: 'Text: click to place a message.',
    zoom: 'Magnifier: click to zoom the page in and out.',
    curve: 'Curve: still wet. Try the pencil.',
    polygon: 'Polygon: still wet. Try the pencil.',
  };

  const pickTool = (id: string) => {
    if (id === 'zoom') { setZoomed((z) => !z); setActiveTool('select'); return; }
    setActiveTool(id);
  };

  const wetPaint = (name: string) =>
    setDialog(`${name} is still wet. Check back once the paint dries.`);

  return (
    <div className="desktop">
      {openMenu && <div className="menu-overlay" onClick={() => setOpenMenu(null)} />}

      <div className="window raise">
        {/* title bar */}
        <div className="titlebar">
          <div className="titlebar-left">
            <svg className="titlebar-icon" viewBox="0 0 16 16" aria-hidden>
              <rect x="1" y="6" width="9" height="8" fill="#fff" stroke="#000" />
              <path d="M4 6 C4 2 8 1 10 1 L10 3 C8 3 6 4 6 6 Z" fill="#c0c0c0" stroke="#000" />
              <rect x="3" y="9" width="2" height="2" fill="#0000ff" />
              <rect x="6" y="9" width="2" height="2" fill="#ff0000" />
              <rect x="3" y="11" width="2" height="2" fill="#ffff00" />
              <rect x="6" y="11" width="2" height="2" fill="#00ff00" />
            </svg>
            <span>moaz_portfolio.bmp - Paint</span>
          </div>
          <div className="titlebar-btns">
            <button className="tb-btn raise-btn" aria-label="Minimize" onClick={() => setDialog('Minimizing is for quitters.')}>
              <svg viewBox="0 0 10 10"><rect x="1" y="7" width="6" height="2" fill="#000" /></svg>
            </button>
            <button className="tb-btn raise-btn" aria-label="Maximize" onClick={() => setDialog('Already as big as it gets.')}>
              <svg viewBox="0 0 10 10"><rect x="1" y="1" width="8" height="8" fill="none" stroke="#000" /><rect x="1" y="1" width="8" height="2" fill="#000" /></svg>
            </button>
            <button className="tb-btn raise-btn" aria-label="Close" onClick={() => setDialog("You can't close me that easily.")}>
              <svg viewBox="0 0 10 10"><path d="M1 1 L9 9 M9 1 L1 9" stroke="#000" strokeWidth="1.5" /></svg>
            </button>
          </div>
        </div>

        {/* menu bar */}
        <div className="menubar">
          <div className="menu-item-wrap">
            <button
              className={`menu-item ${openMenu === 'file' ? 'open' : ''}`}
              onClick={() => setOpenMenu(openMenu === 'file' ? null : 'file')}
            >
              <u>F</u>ile
            </button>
            {openMenu === 'file' && (
              <div className="dropdown raise">
                <a className="dropdown-item" href={resumePDF} target="_blank" rel="noopener noreferrer">Open Resume</a>
                <a className="dropdown-item" href="mailto:msholook@gmail.com">Send by Email</a>
                <div className="dropdown-sep" />
                <button className="dropdown-item" onClick={() => { setOpenMenu(null); drawRef.current?.save(); }}>Save My Doodle...</button>
              </div>
            )}
          </div>
          <div className="menu-item-wrap">
            <button
              className={`menu-item ${openMenu === 'view' ? 'open' : ''}`}
              onClick={() => setOpenMenu(openMenu === 'view' ? null : 'view')}
            >
              <u>V</u>iew
            </button>
            {openMenu === 'view' && (
              <div className="dropdown raise">
                {['About', 'Work', 'Extracurriculars', 'Skills', 'Projects', 'Contact'].map((s) => (
                  <a key={s} className="dropdown-item" href={`#${s.toLowerCase()}`} onClick={() => setOpenMenu(null)}>{s}</a>
                ))}
              </div>
            )}
          </div>
          <div className="menu-item-wrap">
            <button className={`menu-item ${openMenu === 'edit' ? 'open' : ''}`} onClick={() => setOpenMenu(openMenu === 'edit' ? null : 'edit')}>
              <u>E</u>dit
            </button>
            {openMenu === 'edit' && (
              <div className="dropdown raise">
                <button className="dropdown-item" onClick={() => { setOpenMenu(null); drawRef.current?.clear(); }}>Clear Image</button>
              </div>
            )}
          </div>
          <div className="menu-item-wrap">
            <button className={`menu-item ${openMenu === 'help' ? 'open' : ''}`} onClick={() => setOpenMenu(openMenu === 'help' ? null : 'help')}>
              <u>H</u>elp
            </button>
            {openMenu === 'help' && (
              <div className="dropdown raise">
                <button className="dropdown-item" onClick={() => { setOpenMenu(null); setDialog('This page is a real canvas. Pick a tool on the left, a color on the bottom, and draw on it. Edit > Clear Image wipes it, File > Save My Doodle keeps it.'); }}>Help Topics</button>
                <button className="dropdown-item" onClick={() => { setOpenMenu(null); setDialog('Moaz Sholook Paint, version 4.0 (portfolio edition).'); }}>About Paint</button>
              </div>
            )}
          </div>
          {['Image', 'Colors'].map((m) => (
            <button key={m} className="menu-item" onClick={() => wetPaint(m)}>
              {m}
            </button>
          ))}
        </div>

        {/* body: toolbox + canvas */}
        <div className="paint-body">
          <div className="toolbox">
            {tools.map((t) => (
              <button
                key={t.id}
                title={t.label}
                aria-label={t.label}
                className={`tool ${activeTool === t.id ? 'tool-active' : 'raise-btn'}`}
                onClick={() => pickTool(t.id)}
              >
                <ToolIcon id={t.id} />
              </button>
            ))}
          </div>

          <div
            className="canvas sunken"
            ref={canvasRef}
            style={{ cursor: activeCursor, zoom: zoomed ? 1.25 : 1 } as React.CSSProperties}
            onMouseMove={(e) => {
              const r = canvasRef.current?.getBoundingClientRect();
              if (r) setCoords(`${Math.round(e.clientX - r.left)}, ${Math.round(e.clientY - r.top)}`);
            }}
          >
            <DrawLayer
              ref={drawRef}
              tool={activeTool}
              color={accent}
              onPick={setAccent}
              onText={() => window.prompt('Text to paint:')}
            />
            {/* hero */}
            <section className="hero">
              <svg className="doodle-sun" viewBox="0 0 60 60" aria-hidden>
                <circle cx="30" cy="30" r="12" fill="#ffff00" stroke="#000" strokeWidth="1.5" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                  <line key={a} x1="30" y1="10" x2="30" y2="16" stroke="#000" strokeWidth="1.5" transform={`rotate(${a} 30 30)`} />
                ))}
              </svg>
              <div className="paint-textbox">
                <span className="handle tl" /><span className="handle tr" /><span className="handle bl" /><span className="handle br" />
                <p className="hero-hi">Hi, I'm</p>
                <h1 className="hero-name">Moaz Sholook</h1>
                <svg className="squiggle" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 6 Q 10 2, 18 6 T 34 6 T 50 6 T 66 6 T 82 6 T 98 6 T 114 6 T 130 6 T 146 6 T 162 6 T 178 6 T 194 6" stroke={accent} fill="none" strokeWidth="2.5" />
                </svg>
                <p className="hero-role">
                  {typed}
                  <span className="block-cursor" />
                </p>
              </div>
              <div className="hero-btns">
                <a className="btn95 raise-btn" href={resumePDF} target="_blank" rel="noopener noreferrer">Open Resume</a>
                <a className="btn95 raise-btn" href="https://github.com/moazsholook" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className="btn95 raise-btn" href="https://www.linkedin.com/in/moazsholook/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a className="btn95 raise-btn" href="mailto:msholook@gmail.com">Email</a>
              </div>
              <p className="hint-line">Psst: this page is a real canvas. Grab the pencil on the left, pick a color below, and doodle on me.</p>
            </section>

            {/* about */}
            <section className="section" id="about">
              <h2 className="section-title">About</h2>
              <div className="about-grid">
                <div className="photo-frame">
                  <div className="paint-textbox photo-select">
                    <span className="handle tl" /><span className="handle tr" /><span className="handle bl" /><span className="handle br" />
                    <img src={webPhoto} alt="Moaz Sholook" />
                  </div>
                </div>
                <div className="about-text">
                  <p>
                    Fourth-year Computer Science student at Carleton University specializing in
                    Software Engineering &amp; AI/ML. I build things that ship — from billing
                    infrastructure at scale to fraud automation to open-source developer tools.
                  </p>
                  <p>
                    This winter I'm joining <strong>Terminal (YC S23)</strong> in Toronto as a
                    Software Engineering Intern on the backend team.
                  </p>
                  <p>
                    When I'm not coding, you'll find me on a hike, at the gym, or playing sports.
                  </p>
                </div>
              </div>
            </section>

            {/* work */}
            <section className="section" id="work">
              <h2 className="section-title">Work</h2>
              <p className="section-sub">Some of the places I've worked at.</p>
              <div className="card-list">
                {workCards.map((w) => (
                  <a key={w.company} className="card raise work-card" href={w.link} target="_blank" rel="noopener noreferrer">
                    <div className="logo-tile sunken">
                      <img src={w.logo} alt={`${w.company} logo`} />
                    </div>
                    <div className="card-body">
                      <div className="card-head">
                        <h3>{w.company}</h3>
                        {w.incoming && <span className="badge badge-incoming">Incoming</span>}
                      </div>
                      {w.sub && <p className="card-sub">{w.sub}</p>}
                      <p className="card-role">{w.role}</p>
                      {w.dates && <p className="card-dates">{w.dates}</p>}
                      <div className="chips">
                        {w.tech.map((t) => <span key={t} className="chip">{t}</span>)}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* extracurriculars */}
            <section className="section" id="extracurriculars">
              <h2 className="section-title">Extracurriculars</h2>
              <div className="card-list">
                <div className="card raise work-card">
                  <div className="logo-tile sunken">
                    <img src={biocareLogo} alt="Carleton BioCARE logo" />
                  </div>
                  <div className="card-body">
                    <div className="card-head"><h3>Carleton BioCARE</h3></div>
                    <p className="card-role">Software Lead</p>
                    <p className="card-dates">Mar 2025 – Present</p>
                  </div>
                </div>
              </div>
            </section>

            {/* skills */}
            <section className="section" id="skills">
              <h2 className="section-title">Skills</h2>
              <div className="skills-grid">
                {skillCategories.map((c) => (
                  <div key={c.name} className="skill-group raise">
                    <h3>{c.name}</h3>
                    <div className="chips">
                      {c.items.map((i) => <span key={i} className="chip">{i}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* projects */}
            <section className="section" id="projects">
              <h2 className="section-title">Projects</h2>
              <p className="section-sub">Some of the projects I've worked on.</p>
              <div className="card-list">
                {projects.map((p) => (
                  <div key={p.name} className="card raise project-card">
                    {p.image && (
                      <div className="project-img sunken">
                        <img src={p.image} alt={`${p.name} screenshot`} />
                      </div>
                    )}
                    <div className="card-body">
                      <div className="card-head">
                        <h3>{p.name}</h3>
                        <span className="badge">{p.badge}</span>
                      </div>
                      <p className="card-desc">{p.description}</p>
                      <div className="chips">
                        {p.tech.map((t) => <span key={t} className="chip">{t}</span>)}
                      </div>
                      <div className="card-links">
                        {p.links.map((l) => (
                          <a key={l.label} className="btn95 btn95-sm raise-btn" href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* contact */}
            <section className="section" id="contact">
              <h2 className="section-title">Get in Touch</h2>
              <p className="section-sub">Always open to discussing new projects and opportunities.</p>
              <div className="hero-btns">
                <a className="btn95 raise-btn" href="mailto:msholook@gmail.com">msholook@gmail.com</a>
                <a className="btn95 raise-btn" href="https://www.linkedin.com/in/moazsholook/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a className="btn95 raise-btn" href="https://github.com/moazsholook" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </section>

            <p className="footer-line">Made with ♥ by Moaz Sholook</p>
          </div>
        </div>

        {/* color palette */}
        <div className="palette-row">
          <div className="current-color raise">
            <div className="cc-front" style={{ background: accent }} />
            <div className="cc-back" />
          </div>
          <div className="palette sunken">
            {palette.map((c) => (
              <button
                key={c}
                className={`swatch ${accent === c ? 'swatch-active' : ''}`}
                style={{ background: c }}
                aria-label={`Color ${c}`}
                onClick={() => setAccent(c)}
              />
            ))}
          </div>
        </div>

        {/* status bar */}
        <div className="statusbar">
          <span className="status-cell status-wide">{toolHints[activeTool] || ''}</span>
          <span className="status-cell">{coords}px</span>
          <span className="status-cell">{accent.toUpperCase()}</span>
        </div>
      </div>

      {/* taskbar */}
      <div className="taskbar">
        {startOpen && (
          <>
            <div className="menu-overlay" onClick={() => setStartOpen(false)} />
            <div className="start-menu raise">
              <div className="start-side"><span>Moaz 95</span></div>
              <div className="start-items">
                {['About', 'Work', 'Extracurriculars', 'Skills', 'Projects', 'Contact'].map((sec) => (
                  <a key={sec} className="dropdown-item" href={`#${sec.toLowerCase()}`} onClick={() => setStartOpen(false)}>{sec}</a>
                ))}
                <div className="dropdown-sep" />
                <a className="dropdown-item" href="https://wchews.onrender.com" target="_blank" rel="noopener noreferrer" onClick={() => setStartOpen(false)}>Run Wchews...</a>
                <a className="dropdown-item" href={resumePDF} target="_blank" rel="noopener noreferrer" onClick={() => setStartOpen(false)}>Open Resume</a>
                <button className="dropdown-item" onClick={() => { setStartOpen(false); drawRef.current?.clear(); }}>Clear Doodles</button>
              </div>
            </div>
          </>
        )}
        <button className="start-btn raise-btn" onClick={() => setStartOpen((o) => !o)}>
          <span className="start-logo" aria-hidden>
            <i className="p1" /><i className="p2" /><i className="p3" /><i className="p4" />
          </span>
          <strong>Start</strong>
        </button>
        <div className="task-btn sunken-btn">
          <svg viewBox="0 0 16 16" aria-hidden>
            <rect x="1" y="6" width="9" height="8" fill="#fff" stroke="#000" />
            <path d="M4 6 C4 2 8 1 10 1 L10 3 C8 3 6 4 6 6 Z" fill="#c0c0c0" stroke="#000" />
          </svg>
          <span>moaz_portfolio.bmp - Paint</span>
        </div>
        <div className="taskbar-spacer" />
        <div className="tray sunken">{clockText}</div>
      </div>

      {/* dialog */}
      {dialog && (
        <div className="dialog-overlay" onClick={() => setDialog(null)}>
          <div className="dialog raise" onClick={(e) => e.stopPropagation()} role="alertdialog" aria-label="Paint">
            <div className="titlebar">
              <div className="titlebar-left"><span>Paint</span></div>
              <div className="titlebar-btns">
                <button className="tb-btn raise-btn" aria-label="Close dialog" onClick={() => setDialog(null)}>
                  <svg viewBox="0 0 10 10"><path d="M1 1 L9 9 M9 1 L1 9" stroke="#000" strokeWidth="1.5" /></svg>
                </button>
              </div>
            </div>
            <div className="dialog-body">
              <svg className="dialog-icon" viewBox="0 0 32 32" aria-hidden>
                <rect x="4" y="8" width="24" height="20" fill="#ffff00" stroke="#000" />
                <rect x="14" y="13" width="3" height="8" fill="#000" />
                <rect x="14" y="23" width="3" height="3" fill="#000" />
              </svg>
              <p>{dialog}</p>
            </div>
            <div className="dialog-btns">
              <button className="btn95 raise-btn" onClick={() => setDialog(null)} autoFocus>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
