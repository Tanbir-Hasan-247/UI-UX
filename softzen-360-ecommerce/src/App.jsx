import * as React from 'react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { FloatingProductModal, FloatingCartModal, FloatingCheckoutModal, FloatingWishlistModal } from './FloatingModals.jsx';

const g = React;
const o = { jsx: _jsx, jsxs: _jsxs, Fragment: _Fragment };
const _m = BrowserRouter;
const Sm = Routes;
const We = Route;
const D = Link;
const An = useLocation;
const Un = useNavigate;
const sm = useParams;
const Fm = useSearchParams;

const Im = [
    {
      id: "tees",
      label: "Tees",
      blurb: "Heavyweight cotton, cut to sit right.",
    },
    {
      id: "hoodies",
      label: "Hoodies",
      blurb: "Brushed fleece, double-layer hoods.",
    },
    {
      id: "jerseys",
      label: "Jerseys",
      blurb: "Football shirts for people who never played.",
    },
    {
      id: "sweatshirts",
      label: "Sweatshirts",
      blurb: "Loopback crews for cool evenings.",
    },
    {
      id: "longsleeves",
      label: "Long sleeves",
      blurb: "The tee, with more sleeve.",
    },
  ],
  $m = [
    {
      id: "alba-tee",
      name: "Alba",
      title: "Alba, essential tee",
      subtitle: "Heavy cotton tee · Chalk white",
      category: "tees",
      categoryLabel: "T-shirt unisex",
      price: 45,
      colorName: "Chalk white",
      sizes: ["XS", "S", "M", "L", "XL"],
      description:
        "Our everyday tee in 240 gsm combed cotton with a small orange star stitched on the chest. Boxy through the body, clean through the shoulder.",
      details: [
        "100% organic cotton, 240 gsm",
        "Boxy fit, true to size",
        "Embroidered star on chest",
        "Garment-dyed and pre-shrunk",
      ],
      sku: "ORV-TS-001",
      badge: "Bestseller",
      art: {
        kind: "tee",
        color: "#F4F2EC",
        texture: "jersey-knit",
        seed: 11,
        front: [{ type: "glyph", x: 612, y: 400, size: 34, color: "#FF4A14" }],
        back: [
          {
            type: "text",
            text: "ORVA",
            font: "sans",
            size: 15,
            y: 318,
            weight: 700,
            tracking: 6,
            color: "#9a968d",
          },
        ],
      },
    },
    {
      id: "mare-jersey",
      name: "Maré",
      title: "Maré, football jersey",
      subtitle: "Football jersey · Black",
      category: "jerseys",
      categoryLabel: "Jersey unisex",
      price: 75,
      colorName: "Black / Pink",
      sizes: ["S", "M", "L", "XL"],
      description:
        "A heavyweight mesh football jersey with a blackletter chest graphic, pink tipping on the collar and a number on the back. Made for the stands, not the pitch.",
      details: [
        "Recycled polyester jacquard mesh",
        "Relaxed fit",
        "Printed number 07 on back",
        "Woven neck label",
      ],
      sku: "ORV-JR-007",
      badge: "New",
      art: {
        kind: "jersey",
        color: "#161618",
        trim: "#F0388B",
        texture: "mesh",
        seed: 23,
        front: [
          {
            type: "text",
            text: "Maré",
            font: "blackletter",
            size: 150,
            y: 500,
            color: "#F4F2EC",
          },
          {
            type: "patch",
            x: 512,
            y: 575,
            w: 210,
            h: 30,
            color: "#161618",
            text: "ORVA · LISBOA",
            textColor: "#F0388B",
          },
          { type: "glyph", x: 650, y: 360, size: 34, color: "#F0388B" },
        ],
        back: [
          {
            type: "text",
            text: "LISBOA",
            font: "sans",
            size: 34,
            y: 380,
            weight: 800,
            tracking: 10,
            color: "#F4F2EC",
          },
          {
            type: "text",
            text: "07",
            font: "sport",
            size: 300,
            y: 610,
            color: "#F4F2EC",
          },
        ],
      },
    },
    {
      id: "areia-tee",
      name: "Areia",
      title: "Areia, relaxed tee",
      subtitle: "Relaxed tee · Sand",
      category: "tees",
      categoryLabel: "T-shirt unisex",
      price: 45,
      colorName: "Sand",
      sizes: ["XS", "S", "M", "L", "XL"],
      description:
        "Warm sand-coloured tee with a tonal embroidered wordmark. The one you reach for first.",
      details: [
        "100% organic cotton, 220 gsm",
        "Relaxed fit",
        "Tonal embroidery",
        "Made in Portugal",
      ],
      sku: "ORV-TS-002",
      art: {
        kind: "tee",
        color: "#E9D9C8",
        texture: "slub",
        seed: 37,
        front: [
          {
            type: "text",
            text: "orva",
            font: "serif",
            size: 40,
            x: 600,
            y: 410,
            color: "#8a6e57",
            weight: 600,
          },
        ],
        back: [],
      },
    },
    {
      id: "sintra-hoodie",
      name: "Sintra",
      title: "Sintra, heavyweight hoodie",
      subtitle: "Hoodie · Forest green",
      category: "hoodies",
      categoryLabel: "Hoodie unisex",
      price: 105,
      colorName: "Forest green",
      sizes: ["S", "M", "L", "XL"],
      description:
        "Brushed-back 480 gsm fleece in a deep forest green, with a double-layer hood and an arched back print named after the hills outside the city.",
      details: [
        "80% cotton, 20% recycled polyester, 480 gsm",
        "Double-layer hood, flat drawcords",
        "Kangaroo pocket",
        "Puff print on back",
      ],
      sku: "ORV-HD-003",
      badge: "New",
      art: {
        kind: "hoodie",
        color: "#1E6B45",
        texture: "fleece",
        seed: 41,
        front: [
          {
            type: "text",
            text: "ORVA",
            font: "sans",
            size: 30,
            x: 600,
            y: 470,
            weight: 800,
            tracking: 6,
            color: "#F1EBDD",
          },
        ],
        back: [
          {
            type: "text",
            text: "SINTRA",
            font: "sans",
            size: 92,
            y: 560,
            weight: 900,
            tracking: 6,
            arc: 900,
            color: "#F1EBDD",
          },
          { type: "glyph", x: 512, y: 660, size: 46, color: "#F1EBDD" },
        ],
      },
    },
    {
      id: "noite-hoodie",
      name: "Noite",
      title: "Noite, heavyweight hoodie",
      subtitle: "Hoodie · Washed black",
      category: "hoodies",
      categoryLabel: "Hoodie unisex",
      price: 105,
      colorName: "Washed black",
      sizes: ["S", "M", "L", "XL"],
      description:
        "A washed-black hoodie for late tram rides home. Tonal star on the chest, small 03:00 print across the back.",
      details: [
        "80% cotton, 20% recycled polyester, 480 gsm",
        "Garment washed for a soft hand",
        "Ribbed cuffs and hem",
        "Screen print on back",
      ],
      sku: "ORV-HD-004",
      art: {
        kind: "hoodie",
        color: "#2B2B2D",
        texture: "fleece",
        seed: 53,
        front: [{ type: "glyph", x: 610, y: 470, size: 34, color: "#d9d6cf" }],
        back: [
          {
            type: "text",
            text: "NOITE",
            font: "sans",
            size: 64,
            y: 520,
            weight: 900,
            tracking: 18,
            color: "#d9d6cf",
          },
          {
            type: "text",
            text: "LISBOA — 03:00",
            font: "sans",
            size: 20,
            y: 580,
            weight: 600,
            tracking: 6,
            color: "#d9d6cf",
          },
        ],
      },
    },
    {
      id: "rosa-hoodie",
      name: "Rosa",
      title: "Rosa, heavyweight hoodie",
      subtitle: "Hoodie · Dusty pink",
      category: "hoodies",
      categoryLabel: "Hoodie women",
      price: 99,
      colorName: "Dusty pink",
      sizes: ["XS", "S", "M", "L"],
      description:
        "Soft dusty pink fleece with a hand-written script on the chest. Slightly cropped, generously cut.",
      details: [
        "80% cotton, 20% recycled polyester, 420 gsm",
        "Slightly cropped fit",
        "Embroidered script",
        "Made in Portugal",
      ],
      sku: "ORV-HD-005",
      art: {
        kind: "hoodie",
        color: "#EBCFC6",
        texture: "fleece",
        seed: 67,
        front: [
          {
            type: "text",
            text: "Rosa",
            font: "script",
            size: 84,
            y: 500,
            rotate: -6,
            color: "#7d3b3b",
          },
        ],
        back: [],
      },
    },
    {
      id: "calcada-sweat",
      name: "Calçada",
      title: "Calçada, crewneck sweatshirt",
      subtitle: "Crewneck · Oat",
      category: "sweatshirts",
      categoryLabel: "Sweatshirt unisex",
      price: 89,
      colorName: "Oat",
      sizes: ["S", "M", "L", "XL"],
      description:
        "Loopback crewneck with a chest print borrowed from the wave-pattern pavements of the old town.",
      details: [
        "100% cotton loopback, 400 gsm",
        "Regular fit",
        "Water-based print",
        "Ribbed collar, cuffs and hem",
      ],
      sku: "ORV-SW-006",
      art: {
        kind: "sweat",
        color: "#EFE5D7",
        texture: "fleece",
        seed: 71,
        front: [
          {
            type: "pattern",
            name: "calcada",
            x: 512,
            y: 470,
            w: 250,
            h: 150,
            color: "#2f2a25",
          },
          {
            type: "text",
            text: "CALÇADA",
            font: "sans",
            size: 22,
            y: 580,
            weight: 800,
            tracking: 10,
            color: "#2f2a25",
          },
        ],
        back: [],
      },
    },
    {
      id: "tejo-tee",
      name: "Tejo",
      title: "Tejo, essential tee",
      subtitle: "Heavy cotton tee · Navy",
      category: "tees",
      categoryLabel: "T-shirt unisex",
      price: 45,
      colorName: "Navy",
      sizes: ["XS", "S", "M", "L", "XL"],
      description:
        "Deep river navy with a small pink stitched logo. Heavy, soft and built to fade nicely.",
      details: [
        "100% organic cotton, 240 gsm",
        "Boxy fit",
        "Embroidered chest logo",
        "Garment-dyed",
      ],
      sku: "ORV-TS-008",
      art: {
        kind: "tee",
        color: "#2C3157",
        texture: "jersey-knit",
        seed: 83,
        front: [
          {
            type: "patch",
            x: 612,
            y: 400,
            w: 64,
            h: 26,
            color: "#F0388B",
            text: "ORVA",
            textColor: "#2C3157",
          },
        ],
        back: [
          {
            type: "text",
            text: "TEJO",
            font: "sans",
            size: 15,
            y: 318,
            weight: 700,
            tracking: 6,
            color: "#8f93b8",
          },
        ],
      },
    },
    {
      id: "cupido-tee",
      name: "Cupido",
      title: "Cupido, women’s oversize tee",
      subtitle: "Oversize tee · Charcoal",
      category: "tees",
      categoryLabel: "T-shirt women",
      price: 50,
      colorName: "Charcoal",
      sizes: ["S", "M", "L"],
      description:
        "Oversized charcoal tee with a hand-drawn chest illustration and the line “Lisboa loves you”. Designed and produced in Portugal.",
      details: [
        "100% cotton, 230 gsm",
        "Oversize, dropped shoulder",
        "Hand-drawn print",
        "Designed and produced in Portugal",
      ],
      sku: "ORV-TS-009",
      art: {
        kind: "oversize",
        color: "#3A3C45",
        texture: "slub",
        seed: 97,
        front: [
          {
            type: "doodle",
            name: "arrow-heart",
            x: 512,
            y: 470,
            scale: 1,
            color: "#E9E7F2",
          },
          {
            type: "text",
            text: "Lisboa",
            font: "script",
            size: 62,
            x: 430,
            y: 420,
            rotate: -8,
            color: "#E9E7F2",
          },
          {
            type: "text",
            text: "loves you",
            font: "script",
            size: 56,
            x: 590,
            y: 560,
            rotate: -6,
            color: "#E9E7F2",
          },
        ],
        back: [],
      },
    },
    {
      id: "eletrico-jersey",
      name: "Elétrico",
      title: "Elétrico 28, football jersey",
      subtitle: "Football jersey · Tram yellow",
      category: "jerseys",
      categoryLabel: "Jersey unisex",
      price: 75,
      colorName: "Tram yellow",
      sizes: ["S", "M", "L", "XL"],
      description:
        "Tram-yellow jersey with black tipping and the number of the city’s most famous tram line on the back.",
      details: [
        "Recycled polyester jacquard mesh",
        "Relaxed fit",
        "Printed number 28 on back",
        "Contrast collar",
      ],
      sku: "ORV-JR-028",
      art: {
        kind: "jersey",
        color: "#F2C230",
        trim: "#151515",
        texture: "mesh",
        seed: 101,
        front: [
          {
            type: "text",
            text: "Elétrico",
            font: "serif",
            size: 96,
            y: 500,
            weight: 800,
            rotate: -4,
            color: "#151515",
          },
          { type: "glyph", x: 650, y: 360, size: 30, color: "#151515" },
        ],
        back: [
          {
            type: "text",
            text: "LINHA",
            font: "sans",
            size: 34,
            y: 380,
            weight: 800,
            tracking: 10,
            color: "#151515",
          },
          {
            type: "text",
            text: "28",
            font: "sport",
            size: 300,
            y: 610,
            color: "#151515",
          },
        ],
      },
    },
    {
      id: "bairro-longsleeve",
      name: "Bairro",
      title: "Bairro, long sleeve tee",
      subtitle: "Long sleeve · Bone",
      category: "longsleeves",
      categoryLabel: "Long sleeve unisex",
      price: 59,
      colorName: "Bone",
      sizes: ["XS", "S", "M", "L", "XL"],
      description:
        "Long sleeve tee in bone white with BAIRRO ALTO running down the sleeve and a small chest mark.",
      details: [
        "100% organic cotton, 220 gsm",
        "Regular fit",
        "Sleeve print",
        "Ribbed cuffs",
      ],
      sku: "ORV-LS-010",
      art: {
        kind: "longsleeve",
        color: "#F1EEE6",
        texture: "jersey-knit",
        seed: 113,
        front: [
          { type: "glyph", x: 610, y: 420, size: 30, color: "#1f1f1f" },
          { type: "sleeve-text", text: "BAIRRO ALTO", color: "#1f1f1f" },
        ],
        back: [
          {
            type: "text",
            text: "ORVA",
            font: "sans",
            size: 15,
            y: 318,
            weight: 700,
            tracking: 6,
            color: "#9a968d",
          },
        ],
      },
    },
    {
      id: "azulejo-tee",
      name: "Azulejo",
      title: "Azulejo, graphic tee",
      subtitle: "Graphic tee · White / Cobalt",
      category: "tees",
      categoryLabel: "T-shirt unisex",
      price: 55,
      colorName: "White / Cobalt",
      sizes: ["XS", "S", "M", "L", "XL"],
      description:
        "A square of hand-painted-style tiles printed on the chest, in the cobalt blue you see on every other façade.",
      details: [
        "100% organic cotton, 240 gsm",
        "Boxy fit",
        "Water-based print",
        "Made in Portugal",
      ],
      sku: "ORV-TS-012",
      badge: "Limited",
      art: {
        kind: "tee",
        color: "#F6F5F1",
        texture: "jersey-knit",
        seed: 127,
        front: [
          {
            type: "pattern",
            name: "azulejo",
            x: 512,
            y: 520,
            w: 230,
            h: 230,
            color: "#1E4FA8",
          },
        ],
        back: [
          {
            type: "text",
            text: "AZULEJO",
            font: "sans",
            size: 15,
            y: 318,
            weight: 700,
            tracking: 6,
            color: "#9a968d",
          },
        ],
      },
    },
  ],
  C = {
    name: "ORVA",
    city: "Lisboa",
    country: "Portugal",
    tagline: "From Lisboa, with love.",
    metaDescription:
      "ORVA is an independent clothing label from Lisboa. Heavy cotton, small runs, made in Portugal.",
    currency: { code: "EUR", locale: "en-IE" },
    freeShippingOver: 80,
    colors: {
      bg: "#FAFAF8",
      surface: "#EDEDEB",
      ink: "#111111",
      muted: "#777777",
      line: "#E3E3E0",
      accent: "#FF4A14",
      link: "#E65100",
      cta: "#1E9E5A",
    },
    marquee: [
      "From Lisboa, with love",
      "Designed & produced in Portugal",
      "ORVA Lisboa",
      "Free shipping over €80",
    ],
    rail: {
      label: "On the rail",
      hint: "Hover to turn. Click to explore.",
      hintTouch: "Swipe the rail. Drag to turn. Tap to explore.",
      cta: "Explore ORVA",
      products: [
        "alba-tee",
        "mare-jersey",
        "areia-tee",
        "sintra-hoodie",
        "noite-hoodie",
        "rosa-hoodie",
        "calcada-sweat",
        "tejo-tee",
      ],
    },
    story: {
      kicker: "The story",
      title: "Small runs, sewn ten minutes from the river.",
      body: [
        "ORVA started in 2019 as twelve tees screen-printed in a garage in Marvila. Today we work with two family-run factories in the north of Portugal and still print every graphic within walking distance of the studio.",
        "We make fewer things, in heavier fabrics, and we keep them in stock until they sell out. No seasons, no markdown cycles. Just good clothes made close to home.",
      ],
      stats: [
        { value: "2019", label: "Founded in Lisboa" },
        { value: "100%", label: "Made in Portugal" },
        { value: "240 gsm", label: "Our lightest tee" },
      ],
    },
    lookbook: {
      kicker: "Lookbook",
      title: "Volume 04 — Tram 28",
      items: [
        {
          product: "mare-jersey",
          caption: "Maré jersey, after the match",
          tone: "#1b1b1d",
        },
        {
          product: "sintra-hoodie",
          caption: "Sintra hoodie, foggy morning",
          tone: "#d9e2d6",
        },
        {
          product: "eletrico-jersey",
          caption: "Elétrico 28, uphill",
          tone: "#f6e7b4",
        },
        {
          product: "rosa-hoodie",
          caption: "Rosa hoodie, Sunday market",
          tone: "#f3e3dd",
        },
        {
          product: "cupido-tee",
          caption: "Cupido tee, late light",
          tone: "#c9cbd6",
        },
      ],
    },
    featured: {
      kicker: "Featured",
      title: "The heavyweights",
      products: ["sintra-hoodie", "cupido-tee", "mare-jersey", "calcada-sweat"],
    },
    newsletter: {
      title: "Get the next drop first.",
      body: "One email per drop. No spam, unsubscribe anytime.",
    },
    contact: {
      email: "hello@orva.example",
      phone: "+351 210 000 000",
      address: "Rua das Flores 32, 1200-195 Lisboa",
      hours: "Mon–Fri 10:00–20:00 · Sat 10:00–18:00",
      instagram: "@orva.lisboa",
    },
    delivery: [
      {
        title: "Delivery in Portugal",
        text: "Delivered by CTT in 2–3 working days, €4. Orders over €80 ship free. Express delivery within 24–48 h for €7.",
      },
      {
        title: "Delivery worldwide",
        text: "Available to most countries, delivered in about 1–2 weeks. The price depends on the destination and is calculated at checkout.",
      },
      {
        title: "Pick up in store",
        text: "Pick up your order 48 hours after ordering at Rua das Flores 32, Lisboa. Mon–Fri 10:00–20:00 & Sat 10:00–18:00.",
      },
    ],
    sizeChart: {
      unit: "cm",
      columns: ["Size", "Chest width", "Body length", "Sleeve"],
      rows: [
        ["XS", "50", "67", "20"],
        ["S", "53", "70", "21"],
        ["M", "56", "72", "22"],
        ["L", "59", "74", "23"],
        ["XL", "62", "76", "24"],
      ],
      note: "Measured flat, garment laid on a table. If you are between sizes, take the smaller size for a regular fit or the larger for an oversized look.",
    },
    categories: Im,
    products: $m,
  },
  On = C.products,
  Dm = new Map(On.map((e) => [e.id, e]));
function et(e) {
  return e ? Dm.get(e) : void 0;
}
function Io(e) {
  var t;
  return (
    ((t = C.categories.find((n) => n.id === e)) == null ? void 0 : t.label) ?? e
  );
}
const Am = new Intl.NumberFormat(C.currency.locale, {
  style: "currency",
  currency: C.currency.code,
  minimumFractionDigits: 2,
});
function K(e) {
  return Am.format(e);
}
function $d(e) {
  const t = parseInt(e.replace("#", ""), 16),
    n = (t >> 16) & 255,
    r = (t >> 8) & 255,
    l = t & 255;
  return 0.2126 * n + 0.7152 * r + 0.0722 * l < 110;
}
function Um(e, t = 4) {
  const n = On.filter((l) => l.id !== e.id && l.category === e.category),
    r = On.filter((l) => l.id !== e.id && l.category !== e.category);
  return [...n, ...r].slice(0, t);
}
function Dd(e) {
  const t = e.trim().toLowerCase();
  if (!t) return [];
  const n = t.split(/\s+/);
  return On.map((r) => {
    const l =
      `${r.name} ${r.title} ${r.subtitle} ${r.category} ${Io(r.category)} ${r.colorName} ${r.categoryLabel} ${r.description}`.toLowerCase();
    let i = 0;
    for (const s of n) {
      if (!l.includes(s)) return null;
      (r.name.toLowerCase().startsWith(s) && (i += 5),
        r.title.toLowerCase().includes(s) && (i += 2),
        (i += 1));
    }
    return { p: r, score: i };
  })
    .filter(Boolean)
    .sort((r, l) => l.score - r.score)
    .map((r) => r.p);
}
const $o = `${C.name.toLowerCase().replace(/\W+/g, "-")}-cart-v1`,
  Ad = g.createContext(null);
function iu() {
  try {
    const e = JSON.parse(localStorage.getItem($o) || "null");
    if (e && Array.isArray(e.lines))
      return { lines: e.lines.filter((t) => et(t.id)), promo: e.promo ?? null };
  } catch {}
  return { lines: [], promo: null };
}
function Bm({ children: e }) {
  const [t, n] = g.useState(iu);
  (g.useEffect(() => {
    localStorage.setItem($o, JSON.stringify(t));
  }, [t]),
    g.useEffect(() => {
      const c = (h) => h.key === $o && n(iu());
      return (
        window.addEventListener("storage", c),
        () => window.removeEventListener("storage", c)
      );
    }, []));
  const r = g.useCallback((c, h, p = 1) => {
      n((v) => {
        const x = v.lines.findIndex((j) => j.id === c && j.size === h),
          k = [...v.lines];
        return (
          x >= 0
            ? (k[x] = { ...k[x], qty: Math.min(99, k[x].qty + p) })
            : k.push({ id: c, size: h, qty: p }),
          { ...v, lines: k }
        );
      });
    }, []),
    l = g.useCallback((c, h, p) => {
      n((v) => ({
        ...v,
        lines: v.lines.map((x) =>
          x.id === c && x.size === h
            ? { ...x, qty: Math.max(1, Math.min(99, p)) }
            : x,
        ),
      }));
    }, []),
    i = g.useCallback((c, h) => {
      n((p) => ({
        ...p,
        lines: p.lines.filter((v) => !(v.id === c && v.size === h)),
      }));
    }, []),
    s = g.useCallback(() => n({ lines: [], promo: null }), []),
    a = g.useCallback((c) => {
      const h = c.trim().toUpperCase() === `${C.name.toUpperCase()}10`;
      return (h && n((p) => ({ ...p, promo: c.trim().toUpperCase() })), h);
    }, []),
    u = g.useMemo(() => {
      const c = t.lines.reduce((v, x) => v + x.qty, 0),
        h = t.lines.reduce((v, x) => {
          var k;
          return v + (((k = et(x.id)) == null ? void 0 : k.price) ?? 0) * x.qty;
        }, 0),
        p = t.promo ? Math.round(h * 0.1 * 100) / 100 : 0;
      return {
        lines: t.lines,
        count: c,
        subtotal: h,
        add: r,
        setQty: l,
        remove: i,
        clear: s,
        promo: t.promo,
        applyPromo: a,
        discount: p,
      };
    }, [t, r, l, i, s, a]);
  return o.jsx(Ad.Provider, { value: u, children: e });
}
function on() {
  const e = g.useContext(Ad);
  if (!e) throw new Error("useCart outside provider");
  return e;
}
const Ud = g.createContext(null);
function Wm({ children: e }) {
  const [t, n] = g.useState(null),
    [r, l] = g.useState(null),
    [i, s] = g.useState(null),
    [a, u] = g.useState(0),
    [floatingProduct, setFloatingProduct] = g.useState(null),
    [floatingCart, setFloatingCart] = g.useState(false),
    [floatingCheckout, setFloatingCheckout] = g.useState(false),
    [floatingWishlist, setFloatingWishlist] = g.useState(false),
    [wishlist, setWishlist] = g.useState(() => {
      try {
        return JSON.parse(localStorage.getItem('orva-wishlist') || '[]');
      } catch {
        return [];
      }
    });

  g.useEffect(() => {
    localStorage.setItem('orva-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = g.useCallback((pid) => {
    setWishlist((prev) =>
      prev.includes(pid) ? prev.filter((id) => id !== pid) : [...prev, pid]
    );
  }, []);

  const isInWishlist = g.useCallback((pid) => wishlist.includes(pid), [wishlist]);
  const c = g.useRef();
  const h = g.useCallback((x, k) => {
    window.clearTimeout(c.current);
    s({ id: Date.now(), text: x, action: k });
    u((j) => j + 1);
    c.current = window.setTimeout(() => s(null), 4800);
  }, []);
  const p = g.useCallback(() => s(null), []);
  const v = g.useMemo(
      () => ({
        overlay: t,
        open: n,
        close: () => n(null),
        quick: r,
        setQuick: l,
        banner: i,
        showBanner: h,
        hideBanner: p,
        bump: a,
        floatingProduct,
        setFloatingProduct,
        floatingCart,
        setFloatingCart,
        floatingCheckout,
        setFloatingCheckout,
        floatingWishlist,
        setFloatingWishlist,
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        openProduct: (id) => {
          setFloatingProduct(id);
          setFloatingCart(false);
          setFloatingCheckout(false);
          setFloatingWishlist(false);
        },
        openCart: () => {
          setFloatingCart(true);
          setFloatingProduct(null);
          setFloatingCheckout(false);
          setFloatingWishlist(false);
        },
        openCheckout: () => {
          setFloatingCheckout(true);
          setFloatingCart(false);
          setFloatingProduct(null);
          setFloatingWishlist(false);
        },
        openWishlist: () => {
          setFloatingWishlist(true);
          setFloatingCart(false);
          setFloatingProduct(null);
          setFloatingCheckout(false);
        },
        closeModals: () => {
          setFloatingProduct(null);
          setFloatingCart(false);
          setFloatingCheckout(false);
          setFloatingWishlist(false);
        },
      }),
      [t, r, i, h, p, a, floatingProduct, floatingCart, floatingCheckout, floatingWishlist, wishlist, toggleWishlist, isInWishlist],
    );
  return o.jsx(Ud.Provider, { value: v, children: e });
}
function Ae() {
  const e = g.useContext(Ud);
  if (!e) throw new Error("useUI outside provider");
  return e;
}
const At = (e = 20) => ({
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  }),
  Vm = ({ size: e }) =>
    o.jsx("svg", {
      ...At(e),
      children: o.jsx("path", { d: "M3 7h18M3 12h18M3 17h18" }),
    }),
  Fr = ({ size: e }) =>
    o.jsx("svg", {
      ...At(e),
      children: o.jsx("path", { d: "M6 6l12 12M18 6L6 18" }),
    }),
  Hm = ({ size: e }) =>
    o.jsxs("svg", {
      ...At(e),
      children: [
        o.jsx("circle", { cx: "11", cy: "11", r: "6.5" }),
        o.jsx("path", { d: "M20 20l-4.2-4.2" }),
      ],
    }),
  Qm = ({ size: e }) =>
    o.jsxs("svg", {
      ...At(e),
      children: [
        o.jsx("path", { d: "M5 8h14l-1 12H6L5 8z" }),
        o.jsx("path", { d: "M9 8V6.5a3 3 0 016 0V8" }),
      ],
    }),
  Is = ({ size: e = 14 }) =>
    o.jsx("svg", {
      ...At(e),
      children: o.jsx("path", { d: "M7 7l10 10M17 9v8H9" }),
    }),
  _t = ({ size: e = 16 }) =>
    o.jsx("svg", {
      ...At(e),
      children: o.jsx("path", { d: "M4 12h15M13 6l6 6-6 6" }),
    }),
  Xm = ({ size: e = 16 }) =>
    o.jsx("svg", {
      ...At(e),
      children: o.jsx("path", { d: "M20 12H5M11 6l-6 6 6 6" }),
    }),
  $s = ({ size: e = 16 }) =>
    o.jsxs("svg", {
      ...At(e),
      children: [
        o.jsx("path", { d: "M3 12a9 4 0 0018 0" }),
        o.jsx("path", { d: "M21 12a9 4 0 00-15.5-2.8" }),
        o.jsx("path", { d: "M6.5 6.5L5 9.5l3.2.6" }),
      ],
    });
function Bd({ size: e = 16, color: t = "currentColor" }) {
  return o.jsx("svg", {
    width: e,
    height: e,
    viewBox: "-1 -1 2 2",
    "aria-hidden": !0,
    children: o.jsx("path", {
      d: "M0 -1 Q0.13 -0.13 1 0 Q0.13 0.13 0 1 Q-0.13 0.13 -1 0 Q-0.13 -0.13 0 -1Z",
      fill: t,
    }),
  });
}
function Ds({ onClick: e }) {
  return o.jsxs(D, {
    to: "/",
    className: "logo",
    "aria-label": `${C.name} home`,
    onClick: e,
    children: [o.jsx(Bd, { size: 15 }), o.jsx("span", { children: C.name })],
  });
}
function qm() {
  const { count: e } = on(),
    { open: t, bump: n, openCart, openWishlist, wishlistCount } = Ae(),
    [r, l] = g.useState(!1);
  return (
    g.useEffect(() => {
      const i = () => l(window.scrollY > 4);
      return (
        i(),
        window.addEventListener("scroll", i, { passive: !0 }),
        () => window.removeEventListener("scroll", i)
      );
    }, []),
    o.jsxs("header", {
      className: `header ${r ? "scrolled" : ""}`,
      children: [
        o.jsxs("div", {
          className: "header-left",
          children: [
            o.jsxs("button", {
              className: "header-btn",
              onClick: () => t("menu"),
              "aria-label": "Open menu",
              children: [
                o.jsx(Vm, { size: 20 }),
                o.jsx("span", { className: "hide-sm", children: "Menu" }),
              ],
            }),
            o.jsx("button", {
              className: "header-btn",
              onClick: () => t("search"),
              "aria-label": "Search",
              children: o.jsx(Hm, { size: 19 }),
            }),
          ],
        }),
        o.jsx(Ds, {}),
        o.jsxs("div", {
          className: "header-right",
          children: [
            o.jsxs(D, {
              to: "/shop",
              className: "header-btn hide-sm",
              children: ["Shop ", o.jsx(Is, {})],
            }),
            o.jsxs("button", {
              className: "header-btn wishlist-btn",
              onClick: () => {
                if (typeof openWishlist === 'function') openWishlist();
              },
              "aria-label": `Wishlist, ${wishlistCount} items`,
              title: "Saved Wishlist",
              children: [
                o.jsx("svg", {
                  width: "20",
                  height: "20",
                  viewBox: "0 0 24 24",
                  fill: wishlistCount > 0 ? "#ff3b30" : "none",
                  stroke: wishlistCount > 0 ? "#ff3b30" : "currentColor",
                  strokeWidth: "1.8",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  children: o.jsx("path", {
                    d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  }),
                }),
                wishlistCount > 0 &&
                  o.jsx("span", {
                    className: "wishlist-badge pop",
                    children: wishlistCount,
                  }),
              ],
            }),
            o.jsxs("button", {
              className: "header-btn bag",
              onClick: () => {
                if (typeof openCart === 'function') openCart();
                else t("cart");
              },
              "aria-label": `Cart, ${e} items`,
              children: [
                o.jsx(Qm, { size: 21 }),
                e > 0 &&
                  o.jsx(
                    "span",
                    {
                      className: "bag-badge pop",
                      "data-testid": "cart-badge",
                      children: e,
                    },
                    n,
                  ),
              ],
            }),
          ],
        }),
      ],
    })
  );
}
function Ym() {
  const e = [...C.marquee, ...C.marquee],
    t = (n) =>
      o.jsx(
        g.Fragment,
        {
          children: e.map((r, l) =>
            o.jsxs(
              g.Fragment,
              {
                children: [
                  o.jsx("span", { children: r }),
                  o.jsx(Bd, { size: 10, color: "#fff" }),
                ],
              },
              n + l,
            ),
          ),
        },
        n,
      );
  return o.jsx("div", {
    className: "marquee",
    "aria-hidden": !0,
    children: o.jsxs("div", {
      className: "marquee-track",
      style: { alignItems: "center" },
      children: [t("a"), t("b")],
    }),
  });
}
function Km() {
  const [e, t] = g.useState(""),
    [n, r] = g.useState(!1);
  return o.jsxs("section", {
    className: "news",
    children: [
      o.jsxs("div", {
        children: [
          o.jsx("h2", { children: C.newsletter.title }),
          o.jsx("p", { children: C.newsletter.body }),
        ],
      }),
      n
        ? o.jsx("div", {
            className: "ok",
            children:
              "You’re on the list. We’ll write when the next drop lands.",
          })
        : o.jsxs("form", {
            onSubmit: (l) => {
              if ((l.preventDefault(), !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)))
                return;
              const i = `${C.name.toLowerCase()}-news`,
                s = JSON.parse(localStorage.getItem(i) || "[]");
              (s.push({ email: e, at: Date.now() }),
                localStorage.setItem(i, JSON.stringify(s)),
                r(!0));
            },
            children: [
              o.jsx("input", {
                type: "email",
                required: !0,
                placeholder: "Email address",
                value: e,
                onChange: (l) => t(l.target.value),
                "aria-label": "Email address",
              }),
              o.jsx("button", { type: "submit", children: "Sign up" }),
            ],
          }),
    ],
  });
}
function Gm() {
  return o.jsx("footer", {
    className: "footer",
    children: o.jsxs("div", {
      className: "wrap",
      children: [
        o.jsx(Km, {}),
        o.jsxs("div", {
          className: "footer-grid",
          children: [
            o.jsxs("div", {
              children: [
                o.jsx("h4", { children: C.name }),
                o.jsx("p", {
                  style: { color: "var(--muted)", maxWidth: 280 },
                  children: C.metaDescription,
                }),
              ],
            }),
            o.jsxs("div", {
              children: [
                o.jsx("h4", { children: "Shop" }),
                o.jsxs("ul", {
                  children: [
                    o.jsx("li", {
                      children: o.jsx(D, {
                        to: "/shop",
                        children: "All products",
                      }),
                    }),
                    C.categories.map((e) =>
                      o.jsx(
                        "li",
                        {
                          children: o.jsx(D, {
                            to: `/shop?cat=${e.id}`,
                            children: e.label,
                          }),
                        },
                        e.id,
                      ),
                    ),
                  ],
                }),
              ],
            }),
            o.jsxs("div", {
              children: [
                o.jsx("h4", { children: "House" }),
                o.jsxs("ul", {
                  children: [
                    o.jsx("li", {
                      children: o.jsx(D, {
                        to: "/about",
                        children: "Our story",
                      }),
                    }),
                    o.jsx("li", {
                      children: o.jsx(D, {
                        to: "/lookbook",
                        children: "Lookbook",
                      }),
                    }),
                    o.jsx("li", {
                      children: o.jsx(D, {
                        to: "/contact",
                        children: "Contact",
                      }),
                    }),
                    o.jsx("li", {
                      children: o.jsx(D, { to: "/cart", children: "Cart" }),
                    }),
                  ],
                }),
              ],
            }),
            o.jsxs("div", {
              children: [
                o.jsx("h4", { children: "Visit" }),
                o.jsxs("ul", {
                  children: [
                    o.jsx("li", { children: C.contact.address }),
                    o.jsx("li", { children: C.contact.hours }),
                    o.jsx("li", {
                      children: o.jsx("a", {
                        href: `mailto:${C.contact.email}`,
                        children: C.contact.email,
                      }),
                    }),
                    o.jsx("li", { children: C.contact.instagram }),
                  ],
                }),
              ],
            }),
          ],
        }),
        o.jsxs("div", {
          className: "footer-note",
          children: [
            o.jsxs("span", {
              children: [
                "© ",
                new Date().getFullYear(),
                " ",
                C.name,
                " — ",
                C.city,
                ". Demo store, no real payments.",
              ],
            }),
            o.jsxs("span", {
              children: ["Designed & produced in ", C.country, "."],
            }),
          ],
        }),
      ],
    }),
  });
}
const Tt = 36,
  Ul = 7,
  qt = (Ul * 360) / Tt,
  Wd = "/".replace(/\/$/, ""),
  Vd = "p1",
  ae = (e, t) => `${Wd}/garments/${e}/${t}.webp?v=${Vd}`,
  Rr = (e, t) =>
    `${Wd}/garments/${e}/t/${String(((t % Tt) + Tt) % Tt).padStart(2, "0")}.webp?v=${Vd}`,
  Bl = new Map(),
  Hd = new Set(),
  Do = new Set();
function Jm(e) {
  return (Do.add(e), () => Do.delete(e));
}
function Ao(e) {
  let t = Bl.get(e);
  return (
    t ||
      ((t = new Image()),
      (t.decoding = "async"),
      (t.onload = () => {
        (Hd.add(e), Do.forEach((n) => n()));
      }),
      (t.src = e),
      Bl.set(e, t)),
    t
  );
}
function Ii(e) {
  return Hd.has(e);
}
const ar = [];
let $i = 0;
const bm = 6;
function Qd() {
  for (; $i < bm && ar.length;) {
    ar.sort((r, l) => r.prio - l.prio);
    const e = ar.shift();
    if (Bl.has(e.url)) continue;
    $i++;
    const t = Ao(e.url),
      n = () => {
        ($i--, Qd());
      };
    (t.addEventListener("load", n, { once: !0 }),
      t.addEventListener("error", n, { once: !0 }));
  }
}
function tn(e, t = 5) {
  if (Bl.has(e)) return;
  const n = ar.find((r) => r.url === e);
  (n ? (n.prio = Math.min(n.prio, t)) : ar.push({ url: e, prio: t }), Qd());
}
function Ir(e, t = 5, n = "all") {
  for (let r = 0; r <= Ul; r++) tn(Rr(e, r), t);
  if (n === "all")
    for (let r = Tt - 1; r > Ul; r--) tn(Rr(e, r), t + (r % 2 ? 2 : 1));
}
function Wl(e) {
  const [t, n] = g.useState(
    () => typeof window < "u" && window.matchMedia(e).matches,
  );
  return (
    g.useEffect(() => {
      const r = window.matchMedia(e),
        l = () => n(r.matches);
      return (
        l(),
        r.addEventListener("change", l),
        () => r.removeEventListener("change", l)
      );
    }, [e]),
    t
  );
}
function Zm() {
  const e = Wl("(hover: none), (pointer: coarse)"),
    t = Wl("(max-width: 820px)");
  return e || t;
}
function oi(e) {
  g.useEffect(() => {
    if (!e) return;
    const t = window.scrollY,
      n = document.body.style,
      r = { overflow: n.overflow, paddingRight: n.paddingRight },
      l = window.innerWidth - document.documentElement.clientWidth;
    return (
      (n.overflow = "hidden"),
      l > 0 && (n.paddingRight = `${l}px`),
      () => {
        ((n.overflow = r.overflow),
          (n.paddingRight = r.paddingRight),
          window.scrollTo(0, t));
      }
    );
  }, [e]);
}
function $r(e, t = !0) {
  g.useEffect(() => {
    if (!t) return;
    const n = (r) => r.key === "Escape" && e();
    return (
      window.addEventListener("keydown", n),
      () => window.removeEventListener("keydown", n)
    );
  }, [e, t]);
}
function tt(e) {
  g.useEffect(() => {
    document.title = e;
  }, [e]);
}
const ev = (e) => ((e % 360) + 360) % 360,
  Dr = g.forwardRef(function (
    { id: t, initialAngle: n = 0, hiRes: r, className: l, style: i },
    s,
  ) {
    const a = g.useRef(null),
      u = g.useRef(n),
      c = g.useRef(""),
      h = g.useRef(0),
      p = g.useCallback(() => {
        h.current = 0;
        const x = a.current;
        if (!x) return;
        const k = ev(u.current),
          j = Math.round(k / (360 / Tt)) % Tt;
        let N = "";
        if (r) {
          const y = Math.min(k, 360 - k) < 4.5,
            S = Math.abs(k - 180) < 4.5,
            w = y ? ae(t, "qv-front") : S ? ae(t, "qv-back") : "";
          w && (Ao(w), Ii(w) && (N = w));
        }
        if (!N) {
          const y = Rr(t, j);
          if ((tn(y, 0), Ii(y))) N = y;
          else
            for (let S = 1; S <= Tt / 2 && !N; S++)
              for (const w of [j + S, j - S]) {
                const R = Rr(t, w);
                if (Ii(R)) {
                  N = R;
                  break;
                }
              }
        }
        if (!N) return;
        const f = `${N}|${x.width}x${x.height}`;
        if (f === c.current) return;
        const d = Ao(N),
          m = x.getContext("2d");
        m &&
          (m.clearRect(0, 0, x.width, x.height),
          (m.imageSmoothingQuality = "high"),
          m.drawImage(d, 0, 0, x.width, x.height),
          (c.current = f));
      }, [t, r]),
      v = g.useCallback(() => {
        h.current || (h.current = requestAnimationFrame(p));
      }, [p]);
    return (
      g.useImperativeHandle(
        s,
        () => ({
          setAngle: (x) => {
            ((u.current = x), v());
          },
          getAngle: () => u.current,
          el: () => a.current,
        }),
        [v],
      ),
      g.useEffect(() => {
        ((c.current = ""), v());
        const x = Jm(() => v());
        return () => {
          (x(), cancelAnimationFrame(h.current), (h.current = 0));
        };
      }, [t, v]),
      g.useEffect(() => {
        const x = a.current;
        if (!x) return;
        const k = new ResizeObserver(() => {
          const j = Math.min(window.devicePixelRatio || 1, 2),
            N = x.getBoundingClientRect(),
            f = Math.max(1, Math.round(x.offsetWidth * j)),
            d = Math.max(1, Math.round(x.offsetHeight * j));
          f &&
            d &&
            (x.width !== f || x.height !== d) &&
            N &&
            ((x.width = f),
            (x.height = d),
            (c.current = ""),
            cancelAnimationFrame(h.current),
            p());
        });
        return (k.observe(x), () => k.disconnect());
      }, [v, p]),
      o.jsx("canvas", { ref: a, className: l, style: i })
    );
  });
function tv() {
  const { quick: e, setQuick: t } = Ae(),
    n = Un(),
    [r, l] = g.useState(null),
    [i, s] = g.useState("front"),
    a = g.useRef(null),
    u = g.useRef(0),
    c = g.useRef(null),
    h = g.useRef(!1);
  (g.useEffect(() => {
    if (!e || r) return;
    ((u.current = e.angle),
      s("front"),
      l({
        ids: e.ids,
        index: e.index,
        from: e.from ?? new DOMRect(),
        phase: "in",
        angle: e.angle,
      }));
    const y = window.setTimeout(
      () => l((S) => S && { ...S, phase: "open" }),
      30,
    );
    return () => clearTimeout(y);
  }, [e]),
    g.useEffect(() => {
      if (!r || r.phase !== "open") return;
      const y = i === "front" ? 0 : 180;
      let S = 0;
      const w = () => {
        var R, L;
        if (!c.current) {
          const $ = y - u.current,
            F = $ - Math.round($ / 360) * 360;
          Math.abs(F) > 0.4
            ? ((u.current += F * 0.09),
              (R = a.current) == null || R.setAngle(u.current),
              (S = requestAnimationFrame(w)))
            : ((u.current = y), (L = a.current) == null || L.setAngle(y));
        }
      };
      return ((S = requestAnimationFrame(w)), () => cancelAnimationFrame(S));
    }, [i, r == null ? void 0 : r.phase]));
  const p = () => {
    var R, L;
    if (!r || h.current) return;
    h.current = !0;
    const y = r.ids[r.index],
      S =
        ((R = e == null ? void 0 : e.getRect) == null
          ? void 0
          : R.call(e, y)) ?? r.from,
      w =
        ((L = e == null ? void 0 : e.getAngle) == null
          ? void 0
          : L.call(e, y)) ?? u.current;
    (l(($) => $ && { ...$, phase: "out", from: S ?? $.from, angle: w }),
      window.setTimeout(() => {
        ((h.current = !1), l(null), t(null));
      }, 620));
  };
  if (($r(p, !!r && r.phase !== "out"), !r)) return null;
  const v = et(r.ids[r.index]);
  if (!v) return null;
  const x = r.phase === "open",
    k = r.from,
    j = k.left + k.width / 2,
    N = k.top + k.height / 2,
    f = (y) => {
      x &&
        ((c.current = { x: y.clientX, a: u.current }),
        y.currentTarget.setPointerCapture(y.pointerId));
    },
    d = (y) => {
      var S;
      c.current &&
        ((u.current =
          c.current.a +
          ((y.clientX - c.current.x) * 360) / (window.innerWidth * 0.9)),
        (S = a.current) == null || S.setAngle(u.current));
    },
    m = () => {
      if (!c.current) return;
      c.current = null;
      const y = ((u.current % 360) + 360) % 360;
      s(y > 90 && y < 270 ? "back" : "front");
    };
  return o.jsxs("div", {
    className: `qv ${r.phase}`,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": `${v.title} quick view`,
    children: [
      o.jsxs("button", {
        className: "qv-close header-btn",
        onClick: p,
        style: { opacity: x ? 1 : 0 },
        children: ["Close ", o.jsx(Fr, { size: 18 })],
      }),
      o.jsx("div", {
        className: "qv-stage",
        style: {
          left: x ? "50%" : `${j}px`,
          top: x ? "var(--qv-top)" : `${N}px`,
          width: x ? "var(--qv-w)" : `${k.width}px`,
          height: x ? "var(--qv-h)" : `${k.height}px`,
        },
        onPointerDown: f,
        onPointerMove: d,
        onPointerUp: m,
        onPointerCancel: m,
        "data-testid": "quickview-stage",
        children: o.jsx(Dr, {
          ref: a,
          id: v.id,
          initialAngle: r.angle,
          hiRes: !0,
        }),
      }),
      o.jsxs("div", {
        className: "qv-copy",
        style: {
          opacity: x ? 1 : 0,
          transform: x ? "none" : "translateY(12px)",
        },
        children: [
          o.jsxs("div", {
            className: "qv-count",
            children: [
              String(r.index + 1).padStart(2, "0"),
              " / ",
              String(r.ids.length).padStart(2, "0"),
            ],
          }),
          o.jsx("div", { className: "qv-kicker", children: v.subtitle }),
          o.jsx("h2", { children: v.title }),
          o.jsxs("div", {
            className: "qv-toggle",
            role: "tablist",
            "aria-label": "View",
            children: [
              o.jsx("span", { className: `qv-knob ${i}` }),
              ["front", "back"].map((y) =>
                o.jsx(
                  "button",
                  {
                    role: "tab",
                    "aria-selected": i === y,
                    className: i === y ? "on" : "",
                    onClick: () => {
                      (s(y),
                        tn(
                          ae(v.id, y === "front" ? "qv-front" : "qv-back"),
                          0,
                        ));
                    },
                    children: y === "front" ? "Front" : "Back",
                  },
                  y,
                ),
              ),
            ],
          }),
          o.jsxs("button", {
            className: "link-orange",
            onClick: () => {
              (p(), n(`/product/${v.id}`));
            },
            "data-testid": "view-in-shop",
            children: ["View in the shop ", o.jsx(_t, { size: 14 })],
          }),
        ],
      }),
      o.jsxs("div", {
        className: "qv-foot",
        style: { opacity: x ? 1 : 0 },
        children: [
          o.jsx("span", { children: C.name }),
          o.jsxs("button", {
            className: "header-btn",
            onClick: () => {
              (p(), n("/shop"));
            },
            children: ["Shop ", o.jsx(_t, { size: 14 })],
          }),
        ],
      }),
    ],
  });
}
function Xd({ id: e, size: t, qty: n }) {
  const r = et(e),
    { setQty: l, remove: i } = on();
  return r
    ? o.jsxs("div", {
        className: "line",
        children: [
          o.jsx(D, {
            to: `/product/${r.id}`,
            children: o.jsx("img", { src: ae(r.id, "card"), alt: "" }),
          }),
          o.jsxs("div", {
            children: [
              o.jsx("h4", { children: r.title }),
              o.jsxs("div", {
                className: "sub",
                children: [r.colorName, " · Size ", t],
              }),
              o.jsxs("div", {
                className: "qty",
                style: { marginTop: 8, height: 34 },
                children: [
                  o.jsx("button", {
                    "aria-label": "Decrease",
                    onClick: () => (n > 1 ? l(e, t, n - 1) : i(e, t)),
                    children: "–",
                  }),
                  o.jsx("input", {
                    "aria-label": "Quantity",
                    value: n,
                    onChange: (s) => l(e, t, Number(s.target.value) || 1),
                  }),
                  o.jsx("button", {
                    "aria-label": "Increase",
                    onClick: () => l(e, t, n + 1),
                    children: "+",
                  }),
                ],
              }),
              o.jsx("button", {
                className: "remove",
                onClick: () => i(e, t),
                children: "Remove",
              }),
            ],
          }),
          o.jsx("div", { className: "price", children: K(r.price * n) }),
        ],
      })
    : null;
}
function nv() {
  const { overlay: e, close: t } = Ae(),
    { lines: n, subtotal: r, discount: l } = on(),
    i = e === "cart";
  return (
    oi(i),
    $r(t, i),
    i
      ? o.jsxs(o.Fragment, {
          children: [
            o.jsx("div", { className: "drawer-scrim", onClick: t }),
            o.jsxs("aside", {
              className: "drawer",
              role: "dialog",
              "aria-modal": "true",
              "aria-label": "Cart",
              "data-testid": "cart-drawer",
              children: [
                o.jsxs("div", {
                  className: "drawer-head",
                  children: [
                    o.jsxs("span", {
                      children: [
                        "Your cart (",
                        n.reduce((s, a) => s + a.qty, 0),
                        ")",
                      ],
                    }),
                    o.jsx("button", {
                      className: "header-btn",
                      onClick: t,
                      "aria-label": "Close cart",
                      children: o.jsx(Fr, {}),
                    }),
                  ],
                }),
                o.jsxs("div", {
                  className: "drawer-body",
                  children: [
                    n.length === 0 &&
                      o.jsxs("div", {
                        className: "empty",
                        children: [
                          o.jsx("p", { children: "Your cart is empty." }),
                          o.jsx(D, {
                            to: "/shop",
                            className: "pill",
                            onClick: t,
                            children: "Browse the shop",
                          }),
                        ],
                      }),
                    n.map((s) => o.jsx(Xd, { ...s }, s.id + s.size)),
                  ],
                }),
                n.length > 0 &&
                  o.jsxs("div", {
                    className: "drawer-foot",
                    children: [
                      l > 0 &&
                        o.jsxs("div", {
                          className: "subtotal",
                          style: { fontWeight: 500 },
                          children: [
                            o.jsx("span", { children: "Discount" }),
                            o.jsxs("span", { children: ["−", K(l)] }),
                          ],
                        }),
                      o.jsxs("div", {
                        className: "subtotal",
                        children: [
                          o.jsx("span", { children: "Subtotal" }),
                          o.jsx("span", { children: K(r - l) }),
                        ],
                      }),
                      o.jsx("div", {
                        style: { color: "var(--muted)", fontSize: 12.5 },
                        children: "Shipping calculated at checkout.",
                      }),
                      o.jsx(D, {
                        to: "/cart",
                        className: "pill",
                        onClick: t,
                        children: "View cart",
                      }),
                      o.jsx(D, {
                        to: "/checkout",
                        className: "btn-cta",
                        style: {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                        onClick: t,
                        children: "Checkout",
                      }),
                    ],
                  }),
              ],
            }),
          ],
        })
      : null
  );
}
const rv = [
  { to: "/shop", label: "Shop" },
  { to: "/shop?cat=tees", label: "Tees" },
  { to: "/shop?cat=hoodies", label: "Hoodies" },
  { to: "/shop?cat=jerseys", label: "Jerseys" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/about", label: "Story" },
  { to: "/contact", label: "Contact" },
];
function lv() {
  const { overlay: e, close: t } = Ae(),
    n = e === "menu";
  return (
    oi(n),
    $r(t, n),
    n
      ? o.jsxs("div", {
          className: "overlay",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "Menu",
          "data-testid": "menu-overlay",
          children: [
            o.jsxs("div", {
              className: "overlay-head",
              children: [
                o.jsx(Ds, { onClick: t }),
                o.jsxs("button", {
                  className: "header-btn",
                  onClick: t,
                  children: ["Close ", o.jsx(Fr, { size: 18 })],
                }),
              ],
            }),
            o.jsx("nav", {
              className: "menu-nav",
              children: rv.map((r) =>
                o.jsx(D, { to: r.to, onClick: t, children: r.label }, r.to),
              ),
            }),
            o.jsxs("div", {
              className: "menu-foot",
              children: [
                o.jsx("span", { children: C.contact.address }),
                o.jsx("span", { children: C.contact.hours }),
                o.jsx("a", {
                  href: `mailto:${C.contact.email}`,
                  children: C.contact.email,
                }),
              ],
            }),
          ],
        })
      : null
  );
}
function iv() {
  const { overlay: e, close: t } = Ae(),
    n = e === "search",
    [r, l] = g.useState(""),
    i = Un();
  (oi(n), $r(t, n));
  const s = g.useMemo(
    () => (r.trim() ? Dd(r).slice(0, 8) : C.products.slice(0, 4)),
    [r],
  );
  return n
    ? o.jsxs("div", {
        className: "overlay",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Search",
        children: [
          o.jsxs("div", {
            className: "overlay-head",
            children: [
              o.jsx(Ds, { onClick: t }),
              o.jsxs("button", {
                className: "header-btn",
                onClick: t,
                children: ["Close ", o.jsx(Fr, { size: 18 })],
              }),
            ],
          }),
          o.jsx("div", {
            className: "search-box",
            children: o.jsx("input", {
              autoFocus: !0,
              value: r,
              onChange: (a) => l(a.target.value),
              placeholder: `Search ${C.name}…`,
              "aria-label": "Search products",
              "data-testid": "search-input",
            }),
          }),
          s.length === 0
            ? o.jsxs("div", {
                className: "search-empty",
                children: [
                  "Nothing matches “",
                  r,
                  "”. Try a colour, a category or a name.",
                ],
              })
            : o.jsx("div", {
                className: "search-results",
                children: s.map((a) =>
                  o.jsxs(
                    D,
                    {
                      to: `/product/${a.id}`,
                      onClick: t,
                      className: "card",
                      children: [
                        o.jsx("div", {
                          className: "card-img",
                          children: o.jsx("img", {
                            src: ae(a.id, "card"),
                            alt: "",
                          }),
                        }),
                        o.jsx("h3", { children: a.name }),
                        o.jsxs("div", {
                          className: "meta",
                          children: [
                            o.jsx("span", { children: a.colorName }),
                            o.jsx("span", { children: K(a.price) }),
                          ],
                        }),
                      ],
                    },
                    a.id,
                  ),
                ),
              }),
          o.jsx("div", {
            style: { padding: "0 22px 24px" },
            children: o.jsx("button", {
              className: "link-orange",
              onClick: () => {
                (t(), i(`/shop?q=${encodeURIComponent(r)}`));
              },
              children: "See all results",
            }),
          }),
        ],
      })
    : null;
}
function ov() {
  const { overlay: e, close: t } = Ae(),
    n = e === "sizechart";
  if ((oi(n), $r(t, n), !n)) return null;
  const r = C.sizeChart;
  return o.jsx("div", {
    className: "modal-scrim",
    onClick: t,
    children: o.jsxs("div", {
      className: "modal",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Size chart",
      onClick: (l) => l.stopPropagation(),
      children: [
        o.jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          },
          children: [
            o.jsx("h3", { children: "Size chart" }),
            o.jsx("button", {
              className: "header-btn",
              onClick: t,
              "aria-label": "Close",
              children: o.jsx(Fr, {}),
            }),
          ],
        }),
        o.jsxs("p", {
          className: "note",
          children: ["All measurements in ", r.unit, ", garment laid flat."],
        }),
        o.jsxs("table", {
          children: [
            o.jsx("thead", {
              children: o.jsx("tr", {
                children: r.columns.map((l) => o.jsx("th", { children: l }, l)),
              }),
            }),
            o.jsx("tbody", {
              children: r.rows.map((l) =>
                o.jsx(
                  "tr",
                  {
                    children: l.map((i, s) => o.jsx("td", { children: i }, s)),
                  },
                  l[0],
                ),
              ),
            }),
          ],
        }),
        o.jsx("p", { className: "note", children: r.note }),
      ],
    }),
  });
}
function sv() {
  const { banner: e, hideBanner: t, open: n } = Ae(),
    r = Un();
  return (
    g.useEffect(() => {}, [e == null ? void 0 : e.id]),
    e
      ? o.jsxs("div", {
          className: "banner",
          role: "status",
          "data-testid": "cart-banner",
          children: [
            o.jsx("span", { children: e.text }),
            e.action &&
              o.jsx("button", {
                className: "link",
                onClick: () => {
                  var l, i;
                  (t(),
                    (l = e.action) != null && l.overlay
                      ? n(e.action.overlay)
                      : (i = e.action) != null && i.to && r(e.action.to));
                },
                children: e.action.label,
              }),
          ],
        })
      : null
  );
}
const qd = () => C.rail.products.map((e) => et(e)).filter(Boolean),
  Yd = (e) => `${e.name} — ${e.subtitle.split("·")[0].trim()}`;
function Kd(e) {
  g.useEffect(() => {
    e.forEach((n) => tn(Rr(n.id, Ul), 0));
    const t = window.setTimeout(
      () => e.forEach((n) => Ir(n.id, 3, "turn")),
      300,
    );
    return () => clearTimeout(t);
  }, [e]);
}
const ou = (e, t) => e - Math.round((e - t) / 360) * 360;
function av() {
  return Zm() ? o.jsx(hv, {}) : o.jsx(uv, {});
}
function Gd() {
  return o.jsxs("div", {
    className: "rack-labels",
    children: [
      o.jsx("b", { children: C.rail.label }),
      o.jsx("i", {}),
      o.jsxs("span", { children: [C.name, " / ", C.city] }),
    ],
  });
}
function uv() {
  const e = g.useMemo(qd, []),
    t = g.useMemo(() => e.map((N) => N.id), [e]),
    n = Ae(),
    [r, l] = g.useState(null),
    i = g.useRef(null),
    s = g.useRef([]),
    a = g.useRef([]),
    u = g.useRef(e.map(() => qt)),
    c = g.useRef({ enterX: 0, offset: 0 }),
    h = g.useRef(!1);
  ((h.current = !!n.quick), Kd(e));
  const p = g.useCallback(
    (N, f = 0) => {
      if (i.current === N) return;
      const d = i.current;
      (d !== null && (u.current[d] = ou(u.current[d], qt)),
        (i.current = N),
        (c.current = { enterX: f, offset: 0 }),
        N !== null &&
          ((u.current[N] = ou(u.current[N], 0)),
          Ir(e[N].id, 1, "all"),
          tn(ae(e[N].id, "qv-front"), 2)),
        l(N));
    },
    [e],
  );
  g.useEffect(() => {
    let N = 0;
    const f = () => {
      var d;
      for (let m = 0; m < e.length; m++) {
        const y = i.current === m ? c.current.offset : qt;
        let S = u.current[m];
        const w = y - S;
        Math.abs(w) > 0.05 &&
          ((S += w * 0.11),
          (u.current[m] = S),
          (d = s.current[m]) == null || d.setAngle(S));
      }
      N = requestAnimationFrame(f);
    };
    return ((N = requestAnimationFrame(f)), () => cancelAnimationFrame(N));
  }, [e]);
  const v = (N) => {
      if (h.current) return;
      const f = i.current;
      if (f === null) return;
      const d = a.current[f],
        m = d ? d.offsetWidth : 300;
      c.current.offset = ((N.clientX - c.current.enterX) * 360) / (m * 1.25);
    },
    x = (N) => {
      var d;
      const f = (d = s.current[N]) == null ? void 0 : d.el();
      f &&
        n.setQuick({
          ids: t,
          index: N,
          from: f.getBoundingClientRect(),
          angle: u.current[N],
          getRect: (m) => {
            var S, w;
            const y = t.indexOf(m);
            return y >= 0
              ? (((w = (S = s.current[y]) == null ? void 0 : S.el()) == null
                  ? void 0
                  : w.getBoundingClientRect()) ?? null)
              : null;
          },
          getAngle: (m) => {
            const y = t.indexOf(m);
            return y >= 0 ? u.current[y] : null;
          },
        });
    },
    k = n.quick ? n.quick.ids[n.quick.index] : null,
    j = r !== null ? e[r] : null;
  return o.jsxs("section", {
    className: "rack-hero",
    "aria-label": "Featured products on the rail",
    children: [
      o.jsx(Gd, {}),
      o.jsxs("div", {
        className: "rack-stage",
        onMouseMove: v,
        onMouseLeave: () => !h.current && p(null),
        children: [
          o.jsxs("div", {
            className: "rail",
            children: [
              o.jsx("span", { className: "rail-mount l" }),
              o.jsx("span", { className: "rail-mount r" }),
            ],
          }),
          o.jsx("div", {
            className: `slots ${r !== null ? "has-focus" : ""}`,
            children: e.map((N, f) =>
              o.jsx(
                "div",
                {
                  ref: (d) => (a.current[f] = d),
                  className: `slot ${r === f ? "focus" : ""} ${k === N.id ? "away" : ""}`,
                  onMouseEnter: (d) => !h.current && p(f, d.clientX),
                  onClick: (d) => (i.current === f ? x(f) : p(f, d.clientX)),
                  onKeyDown: (d) => {
                    (d.key === "Enter" || d.key === " ") &&
                      (d.preventDefault(), x(f));
                  },
                  onFocus: () => p(f),
                  tabIndex: 0,
                  role: "button",
                  "aria-label": `${N.title}, ${N.subtitle}. Open quick view`,
                  "data-testid": `rack-slot-${f}`,
                  children: o.jsx("div", {
                    className: "garment",
                    children: o.jsx(Dr, {
                      ref: (d) => (s.current[f] = d),
                      id: N.id,
                      initialAngle: qt,
                      hiRes: !0,
                    }),
                  }),
                },
                N.id,
              ),
            ),
          }),
        ],
      }),
      o.jsxs("div", {
        className: "rack-info",
        "aria-live": "polite",
        children: [
          o.jsx(
            "div",
            { className: "rack-title", children: j ? Yd(j) : C.tagline },
            (j == null ? void 0 : j.id) ?? "none",
          ),
          o.jsxs(
            "div",
            {
              className: "rack-sub",
              children: [j ? j.subtitle + " · " : "", C.rail.hint],
            },
            ((j == null ? void 0 : j.id) ?? "none") + "s",
          ),
        ],
      }),
      o.jsx("div", {
        className: "rack-cta",
        children: o.jsxs(D, {
          to: "/shop",
          className: "pill",
          children: [C.rail.cta, " ", o.jsx(Is, {})],
        }),
      }),
    ],
  });
}
const su = 2800,
  au = 4e3,
  cv = 2600,
  dv = 16,
  fv = 5600,
  pv = (e) => {
    const t = Math.sin(e * Math.PI * 2),
      n = Math.max(0, Math.abs(t) - 0.3) / 0.7;
    return Math.sign(t) * n * n * (3 - 2 * n);
  };
function hv() {
  const e = g.useMemo(qd, []),
    t = g.useMemo(() => e.map((O) => O.id), [e]),
    n = Ae(),
    r = g.useRef(null),
    l = g.useRef([]),
    i = g.useRef([]),
    s = g.useRef([]),
    a = g.useRef(e.map(() => qt)),
    u = g.useRef(e.map(() => 0)),
    c = g.useRef(e.map(() => 0)),
    [h, p] = g.useState(0),
    v = g.useRef(0),
    x = g.useRef(null),
    k = g.useRef(null),
    j = g.useRef(null),
    N = Wl("(prefers-reduced-motion: reduce)"),
    f = g.useRef({
      nextAt: performance.now() + cv,
      touching: !1,
      visible: !0,
      wrapping: !1,
      idle: 0,
    }),
    d = g.useRef(!1),
    m = !!n.quick,
    y = !!n.overlay,
    S = g.useRef({ quickOpen: m, overlayOpen: y, reduced: N });
  ((S.current = { quickOpen: m, overlayOpen: y, reduced: N }), Kd(e));
  const w = g.useCallback(() => {
    f.current.nextAt = Math.max(f.current.nextAt, performance.now() + au);
  }, []);
  (g.useEffect(() => {
    const O = r.current,
      T = l.current[1];
    O &&
      T &&
      (O.scrollLeft = T.offsetLeft - (O.clientWidth - T.offsetWidth) / 2);
  }, []),
    g.useEffect(() => {
      let O = 0;
      const T = () => {
        const E = r.current;
        if (E) {
          const _ = E.scrollLeft + E.clientWidth / 2;
          let M = 0,
            U = -1;
          e.forEach((Te, W) => {
            var Us;
            const Ue = l.current[W];
            if (!Ue) return;
            const Ne = Ue.offsetLeft + Ue.offsetWidth / 2,
              Ce = Math.max(0, 1 - Math.abs(Ne - _) / Ue.offsetWidth),
              pt = Ce * Ce * (3 - 2 * Ce);
            ((c.current[W] = pt), Ce > U && ((U = Ce), (M = W)));
            const si = i.current[W];
            (si &&
              (si.style.setProperty("--s", String(0.84 + 0.32 * pt)),
              (si.style.opacity = String(0.38 + 0.62 * pt))),
              pt < 0.5 && !x.current && (u.current[W] *= 0.9));
            const ef =
                W === v.current
                  ? f.current.idle * dv * pv(performance.now() / fv)
                  : 0,
              tf = qt * (1 - pt) + u.current[W] + ef * pt,
              ai = a.current[W] + (tf - a.current[W]) * 0.35;
            Math.abs(ai - a.current[W]) > 0.02 &&
              ((a.current[W] = ai),
              (Us = s.current[W]) == null || Us.setAngle(ai));
          });
          const V = f.current;
          ((V.idle +=
            ((d.current || S.current.reduced ? 0 : 1) - V.idle) *
            (d.current ? 0.12 : 0.02)),
            M !== v.current &&
              ((v.current = M),
              p(M),
              Ir(e[M].id, 1, "all"),
              tn(ae(e[M].id, "qv-front"), 2)));
        }
        O = requestAnimationFrame(T);
      };
      return ((O = requestAnimationFrame(T)), () => cancelAnimationFrame(O));
    }, [e]));
  const R = (O) => {
      const T = r.current,
        E = l.current[O];
      return T && E ? E.offsetLeft - (T.clientWidth - E.offsetWidth) / 2 : 0;
    },
    L = (O) => {
      const T = r.current;
      !T || !l.current[O] || T.scrollTo({ left: R(O), behavior: "smooth" });
    },
    $ = g.useCallback(() => {
      const O = r.current,
        T = j.current;
      if (!O || !T) return;
      const E = f.current;
      E.wrapping = !0;
      const _ = Math.round(O.clientWidth * 0.18);
      ((T.style.transition =
        "transform .34s cubic-bezier(.55,0,.8,.3), opacity .3s ease-in"),
        (T.style.transform = `translate3d(${-_}px,0,0)`),
        (T.style.opacity = "0"),
        window.setTimeout(() => {
          (O.scrollTo({ left: R(0), behavior: "instant" }),
            (T.style.transition = "none"),
            (T.style.transform = `translate3d(${_}px,0,0)`),
            T.offsetWidth,
            (T.style.transition =
              "transform .6s cubic-bezier(.2,.75,.25,1), opacity .4s ease-out"),
            (T.style.transform = ""),
            (T.style.opacity = ""),
            window.setTimeout(() => {
              ((T.style.transition = ""), (E.wrapping = !1));
            }, 650));
        }, 340));
    }, []);
  g.useEffect(() => {
    const O = f.current,
      T = r.current,
      E = k.current;
    if (!T || !E) return;
    const _ = () => {
        ((O.touching = !0), w());
      },
      M = () => {
        ((O.touching = !1), w());
      };
    (T.addEventListener("touchstart", _, { passive: !0 }),
      T.addEventListener("pointerdown", _),
      window.addEventListener("touchend", M, { passive: !0 }),
      window.addEventListener("touchcancel", M, { passive: !0 }),
      window.addEventListener("pointerup", M),
      window.addEventListener("pointercancel", M),
      T.addEventListener("wheel", w, { passive: !0 }));
    const U = new IntersectionObserver(
      ([Te]) => {
        O.visible = Te.isIntersecting && Te.intersectionRatio >= 0.35;
      },
      { threshold: [0, 0.35, 0.6] },
    );
    U.observe(E);
    const V = window.setInterval(() => {
      const Te = performance.now(),
        W = S.current,
        Ue = O.touching || !!x.current,
        Ne =
          W.reduced ||
          document.hidden ||
          !O.visible ||
          Ue ||
          W.quickOpen ||
          W.overlayOpen ||
          O.wrapping;
      if (
        ((d.current = Ne),
        (E.dataset.autoplay = W.reduced ? "off" : Ne ? "paused" : "on"),
        Ne)
      ) {
        const pt = Ue || W.quickOpen || W.overlayOpen ? au : su;
        O.nextAt = Math.max(O.nextAt, Te + pt);
        return;
      }
      if (Te < O.nextAt) return;
      O.nextAt = Te + su;
      const Ce = v.current + 1;
      Ce >= e.length ? $() : L(Ce);
    }, 150);
    return () => {
      (clearInterval(V),
        U.disconnect(),
        T.removeEventListener("touchstart", _),
        T.removeEventListener("pointerdown", _),
        window.removeEventListener("touchend", M),
        window.removeEventListener("touchcancel", M),
        window.removeEventListener("pointerup", M),
        window.removeEventListener("pointercancel", M),
        T.removeEventListener("wheel", w));
    };
  }, [e, w, $]);
  const F = (O) => {
      var E;
      const T = (E = s.current[O]) == null ? void 0 : E.el();
      T &&
        n.setQuick({
          ids: t,
          index: O,
          from: T.getBoundingClientRect(),
          angle: a.current[O],
          getRect: (_) => {
            var U, V;
            const M = t.indexOf(_);
            return M >= 0
              ? (((V = (U = s.current[M]) == null ? void 0 : U.el()) == null
                  ? void 0
                  : V.getBoundingClientRect()) ?? null)
              : null;
          },
          getAngle: (_) => {
            const M = t.indexOf(_);
            return M >= 0 ? a.current[M] : null;
          },
        });
    },
    Se = (O) => (T) => {
      var E, _;
      O === v.current &&
        ((x.current = {
          id: T.pointerId,
          x: T.clientX,
          y: T.clientY,
          t: performance.now(),
          start: u.current[O],
          moved: !1,
        }),
        (_ = (E = T.currentTarget).setPointerCapture) == null ||
          _.call(E, T.pointerId));
    },
    Ut = (O) => (T) => {
      const E = x.current;
      if (!E || E.id !== T.pointerId || O !== v.current) return;
      const _ = T.clientX - E.x;
      (Math.abs(_) > 6 && (E.moved = !0),
        (u.current[O] = E.start + (_ * 360) / (window.innerWidth * 0.85)));
    },
    Bt = (O) => (T) => {
      const E = x.current;
      if (((x.current = null), O !== v.current)) {
        L(O);
        return;
      }
      E &&
        !E.moved &&
        performance.now() - E.t < 450 &&
        Math.abs(T.clientY - E.y) < 10 &&
        F(O);
    },
    Ar = n.quick ? n.quick.ids[n.quick.index] : null,
    sn = e[h];
  return o.jsxs("section", {
    className: "rack-hero rack-touch",
    "aria-label": "Featured products on the rail",
    ref: k,
    "data-autoplay": "on",
    children: [
      o.jsx(Gd, {}),
      o.jsxs("div", {
        className: "rail-wrap",
        children: [
          o.jsxs("div", {
            className: "rail full",
            children: [
              o.jsx("span", { className: "rail-mount l" }),
              o.jsx("span", { className: "rail-mount r" }),
            ],
          }),
          o.jsx("div", {
            className: "rail-scroll",
            ref: r,
            "data-testid": "rail-scroll",
            children: o.jsx("div", {
              className: "rail-track",
              ref: j,
              children: e.map((O, T) =>
                o.jsx(
                  "div",
                  {
                    ref: (E) => (l.current[T] = E),
                    className: `tslot slot ${h === T ? "focus" : ""} ${Ar === O.id ? "away" : ""}`,
                    onPointerDown: Se(T),
                    onPointerMove: Ut(T),
                    onPointerUp: Bt(T),
                    onPointerCancel: () => (x.current = null),
                    role: "button",
                    "aria-label": `${O.title}. ${h === T ? "Tap to open, drag to turn" : "Tap to focus"}`,
                    "data-testid": `rail-slot-${T}`,
                    children: o.jsx("div", {
                      className: "garment",
                      ref: (E) => (i.current[T] = E),
                      children: o.jsx(Dr, {
                        ref: (E) => (s.current[T] = E),
                        id: O.id,
                        initialAngle: qt,
                        hiRes: !0,
                      }),
                    }),
                  },
                  O.id,
                ),
              ),
            }),
          }),
        ],
      }),
      o.jsxs("div", {
        className: "rack-info",
        "aria-live": "polite",
        children: [
          o.jsx("div", { className: "rack-title", children: Yd(sn) }, sn.id),
          o.jsx(
            "div",
            { className: "rack-sub", children: sn.subtitle },
            sn.id + "s",
          ),
        ],
      }),
      o.jsxs("div", {
        className: "touch-nav",
        children: [
          o.jsx("button", {
            onClick: () => {
              (w(), L(Math.max(0, h - 1)));
            },
            "aria-label": "Previous garment",
            children: o.jsx(Xm, {}),
          }),
          o.jsxs("span", {
            children: [
              String(h + 1).padStart(2, "0"),
              " / ",
              String(e.length).padStart(2, "0"),
            ],
          }),
          o.jsx("button", {
            onClick: () => {
              (w(), L(Math.min(e.length - 1, h + 1)));
            },
            "aria-label": "Next garment",
            children: o.jsx(_t, {}),
          }),
        ],
      }),
      o.jsxs("div", {
        className: "rack-sub touch-hint",
        style: { marginTop: 10 },
        children: [o.jsx($s, { size: 14 }), " ", C.rail.hintTouch],
      }),
      o.jsx("div", {
        className: "rack-cta",
        style: { marginTop: 12 },
        children: o.jsxs(D, {
          to: "/shop",
          className: "pill",
          children: [C.rail.cta, " ", o.jsx(Is, {})],
        }),
      }),
    ],
  });
}
function As({ p: e, quickAdd: t = !0 }) {
  const { add: n } = on(),
    { showBanner: r, openProduct, openCart, toggleWishlist, isInWishlist } = Ae(),
    [l, i] = g.useState(!1),
    [s, a] = g.useState(!1),
    isSaved = isInWishlist(e.id),
    u = (c) => {
      (n(e.id, c, 1),
        r(`1 × ‘${e.title}’ (${c}) has been added to your cart.`, {
          label: "View cart",
          onClick: () => openCart(),
        }));
    };
  const handleProductClick = (c) => {
    c.preventDefault();
    openProduct(e.id);
    window.history.pushState(null, '', `/product/${e.id}`);
  };
  return o.jsxs("article", {
    className: `card ${s ? "qa-open" : ""}`,
    onMouseEnter: () => i(!0),
    onMouseLeave: () => {
      (i(!1), a(!1));
    },
    children: [
      o.jsxs("div", {
        style: { position: 'relative' },
        children: [
          o.jsxs("a", {
            href: `/product/${e.id}`,
            onClick: handleProductClick,
            className: "card-img",
            "aria-label": e.title,
            style: { cursor: 'pointer' },
            children: [
              o.jsx("img", {
                src: ae(e.id, "card"),
                alt: e.title,
                loading: "lazy",
              }),
              o.jsx("img", {
                className: "hover-img",
                src: l ? ae(e.id, "card-back") : void 0,
                alt: "",
              }),
              e.badge &&
                o.jsx("span", { className: "card-badge", children: e.badge }),
              t &&
                o.jsx("button", {
                  className: "qa-toggle",
                  "aria-label": s ? "Close quick add" : "Quick add",
                  onClick: (c) => {
                    (c.preventDefault(), c.stopPropagation(), a((h) => !h));
                  },
                  children: s ? "×" : "+",
                }),
              t &&
                o.jsx("div", {
                  className: "quick-add",
                  onClick: (c) => { c.preventDefault(); c.stopPropagation(); },
                  children: e.sizes.slice(0, 5).map((c) =>
                    o.jsx(
                      "button",
                      {
                        onClick: (h) => {
                          (h.preventDefault(), h.stopPropagation(), u(c), a(!1));
                        },
                        "aria-label": `Add size ${c}`,
                        children: c,
                      },
                      c,
                    ),
                  ),
                }),
            ],
          }),
          o.jsx("button", {
            type: "button",
            className: `card-wishlist-btn ${isSaved ? 'active' : ''}`,
            onClick: (c) => {
              c.preventDefault();
              c.stopPropagation();
              toggleWishlist(e.id);
            },
            "aria-label": isSaved ? "Remove from wishlist" : "Add to wishlist",
            title: isSaved ? "Remove from wishlist" : "Add to wishlist",
            children: o.jsx("svg", {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: isSaved ? "#ff3b30" : "none",
              stroke: isSaved ? "#ff3b30" : "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: o.jsx("path", {
                d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              }),
            }),
          }),
        ],
      }),
      o.jsx("a", {
        href: `/product/${e.id}`,
        onClick: handleProductClick,
        style: { cursor: 'pointer' },
        children: o.jsx("h3", { children: e.name }),
      }),
      o.jsxs("div", {
        className: "meta",
        children: [
          o.jsx("span", { children: e.colorName }),
          o.jsx("span", { children: K(e.price) }),
        ],
      }),
    ],
  });
}
function mv() {
  var r;
  tt(`${C.name} — ${C.tagline}`);
  const e = C.featured.products.map((l) => et(l)).filter(Boolean),
    t = C.categories
      .slice(0, 4)
      .map((l) => ({ ...l, p: On.find((i) => i.category === l.id) }))
      .filter((l) => l.p),
    n = C.lookbook.items.slice(0, 3);
  return o.jsxs(o.Fragment, {
    children: [
      o.jsx(av, {}),
      o.jsxs("div", {
        className: "wrap",
        children: [
          o.jsxs("section", {
            className: "featured",
            children: [
              o.jsxs("div", {
                className: "section-head",
                children: [
                  o.jsxs("div", {
                    children: [
                      o.jsx("div", {
                        className: "kicker",
                        children: C.featured.kicker,
                      }),
                      o.jsx("h2", {
                        className: "h-display section-title",
                        children: C.featured.title,
                      }),
                    ],
                  }),
                  o.jsxs(D, {
                    to: "/shop",
                    className: "link-orange",
                    children: ["Shop all ", o.jsx(_t, { size: 14 })],
                  }),
                ],
              }),
              o.jsx("div", {
                className: "grid",
                children: e.map((l) => o.jsx(As, { p: l }, l.id)),
              }),
            ],
          }),
          o.jsx("section", {
            className: "cats",
            children: t.map((l) =>
              o.jsxs(
                D,
                {
                  to: `/shop?cat=${l.id}`,
                  className: "cat-tile",
                  children: [
                    o.jsx("img", {
                      src: ae(l.p.id, "card"),
                      alt: "",
                      loading: "lazy",
                    }),
                    o.jsxs("div", {
                      children: [
                        o.jsx("b", { children: l.label }),
                        o.jsx("span", { children: l.blurb }),
                      ],
                    }),
                  ],
                },
                l.id,
              ),
            ),
          }),
          o.jsxs("section", {
            className: "story",
            children: [
              o.jsxs("div", {
                children: [
                  o.jsx("div", {
                    className: "kicker",
                    children: C.story.kicker,
                  }),
                  o.jsx("h2", {
                    className: "h-display section-title",
                    style: { fontSize: "clamp(32px, 4vw, 54px)" },
                    children: C.story.title,
                  }),
                  C.story.body.map((l, i) => o.jsx("p", { children: l }, i)),
                  o.jsx("div", {
                    className: "stats",
                    children: C.story.stats.map((l) =>
                      o.jsxs(
                        "div",
                        {
                          className: "stat",
                          children: [
                            o.jsx("b", { children: l.value }),
                            o.jsx("span", { children: l.label }),
                          ],
                        },
                        l.label,
                      ),
                    ),
                  }),
                  o.jsx("div", {
                    style: { marginTop: 26 },
                    children: o.jsxs(D, {
                      to: "/about",
                      className: "pill",
                      children: ["Read our story ", o.jsx(_t, { size: 14 })],
                    }),
                  }),
                ],
              }),
              o.jsxs("div", {
                className: "story-visual",
                children: [
                  o.jsx("img", {
                    src: ae(C.rail.products[1], "angle"),
                    alt: "",
                    loading: "lazy",
                  }),
                  o.jsxs("span", {
                    className: "story-tag",
                    children: [
                      C.city,
                      " · Est. ",
                      (r = C.story.stats[0]) == null ? void 0 : r.value,
                    ],
                  }),
                ],
              }),
            ],
          }),
          o.jsxs("section", {
            className: "lookbook",
            children: [
              o.jsxs("div", {
                className: "section-head",
                children: [
                  o.jsxs("div", {
                    children: [
                      o.jsx("div", {
                        className: "kicker",
                        children: C.lookbook.kicker,
                      }),
                      o.jsx("h2", {
                        className: "h-display section-title",
                        children: C.lookbook.title,
                      }),
                    ],
                  }),
                  o.jsxs(D, {
                    to: "/lookbook",
                    className: "link-orange",
                    children: ["Open lookbook ", o.jsx(_t, { size: 14 })],
                  }),
                ],
              }),
              o.jsx("div", {
                className: "lb-grid",
                children: n.map((l, i) =>
                  o.jsxs(
                    D,
                    {
                      to: `/product/${l.product}`,
                      className: `lb-tile ${$d(l.tone) ? "dark" : ""}`,
                      style: { background: l.tone },
                      children: [
                        o.jsx("img", {
                          src: ae(l.product, i === 0 ? "back" : "angle"),
                          alt: "",
                          loading: "lazy",
                        }),
                        o.jsxs("figcaption", {
                          children: [
                            String(i + 1).padStart(2, "0"),
                            " — ",
                            l.caption,
                          ],
                        }),
                      ],
                    },
                    l.product,
                  ),
                ),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const vv = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "Newest" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "name", label: "Name A–Z" },
];
function gv() {
  const [e, t] = Fm(),
    n = e.get("cat") || "all",
    r = e.get("sort") || "featured",
    l = e.get("q") || "",
    i = C.categories.find((u) => u.id === n);
  tt(`${i ? i.label : "Shop"} — ${C.name}`);
  const s = g.useMemo(() => {
      let u = l ? Dd(l) : [...On];
      return (
        n !== "all" && (u = u.filter((c) => c.category === n)),
        r === "price-asc"
          ? u.sort((c, h) => c.price - h.price)
          : r === "price-desc"
            ? u.sort((c, h) => h.price - c.price)
            : r === "name"
              ? u.sort((c, h) => c.name.localeCompare(h.name))
              : r === "new" &&
                u.sort((c, h) => +(h.badge === "New") - +(c.badge === "New")),
        u
      );
    }, [n, r, l]),
    a = (u, c) => {
      const h = new URLSearchParams(e);
      (c === null || c === "all" || (u === "sort" && c === "featured")
        ? h.delete(u)
        : h.set(u, c),
        t(h, { replace: !0 }));
    };
  return o.jsxs("div", {
    className: "wrap page",
    children: [
      o.jsxs("div", {
        className: "shop-hero",
        children: [
          o.jsxs("div", {
            className: "crumbs",
            children: [
              o.jsx("a", { href: "/", children: "Home" }),
              " › ",
              o.jsx("span", { children: "Shop" }),
              i &&
                o.jsxs(o.Fragment, {
                  children: [" › ", o.jsx("span", { children: i.label })],
                }),
            ],
          }),
          o.jsx("h1", {
            className: "h-display shop-title",
            children: l ? `Results for “${l}”` : i ? i.label : "All products",
          }),
          o.jsx("p", {
            className: "shop-blurb",
            children: i
              ? i.blurb
              : `Everything we make, designed in ${C.city} and produced in ${C.country}.`,
          }),
        ],
      }),
      o.jsxs("div", {
        className: "shop-bar",
        children: [
          o.jsxs("div", {
            className: "filters",
            role: "tablist",
            "aria-label": "Categories",
            children: [
              o.jsx("button", {
                className: `chip ${n === "all" ? "on" : ""}`,
                onClick: () => a("cat", "all"),
                children: "All",
              }),
              C.categories.map((u) =>
                o.jsx(
                  "button",
                  {
                    className: `chip ${n === u.id ? "on" : ""}`,
                    onClick: () => a("cat", u.id),
                    "data-testid": `filter-${u.id}`,
                    children: u.label,
                  },
                  u.id,
                ),
              ),
            ],
          }),
          o.jsxs("div", {
            style: { display: "flex", gap: 12, alignItems: "center" },
            children: [
              o.jsxs("span", {
                style: { color: "var(--muted)", fontSize: 13 },
                children: [
                  s.length,
                  " ",
                  s.length === 1 ? "product" : "products",
                ],
              }),
              o.jsx("select", {
                className: "sort",
                value: r,
                onChange: (u) => a("sort", u.target.value),
                "aria-label": "Sort products",
                children: vv.map((u) =>
                  o.jsx("option", { value: u.id, children: u.label }, u.id),
                ),
              }),
            ],
          }),
        ],
      }),
      l &&
        o.jsx("button", {
          className: "link-orange",
          style: { marginBottom: 16 },
          onClick: () => a("q", null),
          children: "Clear search",
        }),
      o.jsx("div", {
        className: "grid",
        children: s.map((u) => o.jsx(As, { p: u }, u.id)),
      }),
      s.length === 0 &&
        o.jsx("div", { className: "empty", children: "No products here yet." }),
    ],
  });
}
function Jd() {
  tt(`Page not found — ${C.name}`);
  const e = g.useRef(null),
    t = C.rail.products[4] ?? C.products[0].id;
  return (
    g.useEffect(() => {
      Ir(t, 0, "all");
      let n = 0,
        r = 0;
      const l = () => {
        var i;
        ((n += 0.6),
          (i = e.current) == null || i.setAngle(n),
          (r = requestAnimationFrame(l)));
      };
      return ((r = requestAnimationFrame(l)), () => cancelAnimationFrame(r));
    }, [t]),
    o.jsxs("div", {
      className: "notfound page",
      children: [
        o.jsxs("div", {
          className: "nf-rail",
          children: [
            o.jsx("span", {
              className: "rail",
              style: { position: "absolute", left: 0, right: 0, top: 0 },
            }),
            o.jsx(Dr, { ref: e, id: t, className: "nf-garment" }),
          ],
        }),
        o.jsx("h1", { children: "404" }),
        o.jsx("p", {
          style: { color: "var(--muted)", maxWidth: 420 },
          children:
            "This hanger is empty. The page you’re looking for has moved or sold out.",
        }),
        o.jsxs("div", {
          style: { display: "flex", gap: 10 },
          children: [
            o.jsx(D, { to: "/", className: "pill", children: "Back home" }),
            o.jsx(D, {
              to: "/shop",
              className: "pill solid",
              children: "Shop all",
            }),
          ],
        }),
      ],
    })
  );
}
const Di = ["front", "back", "angle", "detail", "360"];
function yv({ id: e }) {
  const t = g.useRef(null),
    n = g.useRef(0),
    r = g.useRef(null),
    l = g.useRef(!0);
  return (
    g.useEffect(() => {
      Ir(e, 0, "all");
      let i = 0;
      const s = () => {
        var a;
        (!r.current &&
          l.current &&
          ((n.current += 0.35),
          (a = t.current) == null || a.setAngle(n.current)),
          (i = requestAnimationFrame(s)));
      };
      return ((i = requestAnimationFrame(s)), () => cancelAnimationFrame(i));
    }, [e]),
    o.jsxs("div", {
      className: "spin",
      onPointerDown: (i) => {
        ((r.current = { x: i.clientX, a: n.current }),
          (l.current = !1),
          i.currentTarget.setPointerCapture(i.pointerId));
      },
      onPointerMove: (i) => {
        var s;
        r.current &&
          ((n.current = r.current.a + ((i.clientX - r.current.x) * 360) / 520),
          (s = t.current) == null || s.setAngle(n.current));
      },
      onPointerUp: () => (r.current = null),
      onPointerCancel: () => (r.current = null),
      "data-testid": "pdp-360",
      children: [
        o.jsx(Dr, { ref: t, id: e }),
        o.jsxs("span", {
          className: "spin-hint",
          children: [o.jsx($s, { size: 14 }), " Drag to rotate"],
        }),
      ],
    })
  );
}
function xv() {
  const { id: e } = sm(),
    t = et(e),
    { add: n } = on(),
    { showBanner: r, open: l } = Ae(),
    [i, s] = g.useState("front"),
    [a, u] = g.useState(""),
    [c, h] = g.useState(1),
    [p, v] = g.useState(!1),
    x = g.useRef(null),
    [k, j] = g.useState(!1),
    N = Wl("(max-width: 680px)"),
    f = g.useRef(null),
    [d, m] = g.useState(0);
  if (
    (tt(t ? `${t.title} — ${C.name}` : `Not found — ${C.name}`),
    g.useEffect(() => {
      var w;
      (s("front"),
        u(""),
        h(1),
        m(0),
        (w = f.current) == null || w.scrollTo({ left: 0 }));
    }, [e]),
    g.useEffect(() => {
      const w = x.current;
      if (!w) return;
      const R = new IntersectionObserver(
        ([L]) =>
          j(!L.isIntersecting && L.boundingClientRect.top < window.innerHeight),
        { threshold: 0 },
      );
      return (R.observe(w), () => R.disconnect());
    }, [e]),
    !t)
  )
    return o.jsx(Jd, {});
  const y = () => {
      var w;
      if (!a) {
        (v(!0),
          window.setTimeout(() => v(!1), 900),
          (w = document.getElementById("size-select")) == null || w.focus());
        return;
      }
      (n(t.id, a, c),
        r(
          `${c} × ‘${t.title}’ ${c > 1 ? "have" : "has"} been added to your cart.`,
          { label: "View cart", to: "/cart" },
        ));
    },
    S = (w) =>
      w === "360"
        ? o.jsx(yv, { id: t.id })
        : o.jsx("img", { src: ae(t.id, w), alt: `${t.title}, ${w} view` });
  return o.jsxs("div", {
    className: "wrap page",
    children: [
      o.jsxs("div", {
        className: "pdp",
        children: [
          o.jsx("div", {
            className: "gallery",
            children: N
              ? o.jsxs(o.Fragment, {
                  children: [
                    o.jsx("div", {
                      className: "gallery-swipe",
                      ref: f,
                      onScroll: (w) => {
                        const R = w.currentTarget;
                        m(Math.round(R.scrollLeft / R.clientWidth));
                      },
                      children: Di.map((w) =>
                        o.jsx(
                          "div",
                          { className: "gallery-main", children: S(w) },
                          w,
                        ),
                      ),
                    }),
                    o.jsx("div", {
                      className: "dots",
                      children: Di.map((w, R) =>
                        o.jsx(
                          "button",
                          {
                            className: R === d ? "on" : "",
                            "aria-label": `Image ${R + 1}`,
                            onClick: () => {
                              var L;
                              return (L = f.current) == null
                                ? void 0
                                : L.scrollTo({
                                    left: R * f.current.clientWidth,
                                    behavior: "smooth",
                                  });
                            },
                            children: w === "360" ? "360°" : "",
                          },
                          w,
                        ),
                      ),
                    }),
                  ],
                })
              : o.jsxs(o.Fragment, {
                  children: [
                    o.jsx("div", {
                      className: "gallery-main",
                      "data-testid": "pdp-main",
                      children: S(i),
                    }),
                    o.jsx("div", {
                      className: "thumbs",
                      children: Di.map((w) =>
                        o.jsx(
                          "button",
                          {
                            className: i === w ? "on" : "",
                            onClick: () => s(w),
                            "aria-label": `Show ${w} view`,
                            children:
                              w === "360"
                                ? o.jsxs("span", {
                                    className: "thumb-360",
                                    children: [o.jsx($s, { size: 18 }), "360°"],
                                  })
                                : o.jsx("img", {
                                    src: ae(
                                      t.id,
                                      w === "front"
                                        ? "card"
                                        : w === "back"
                                          ? "card-back"
                                          : w,
                                    ),
                                    alt: "",
                                  }),
                          },
                          w,
                        ),
                      ),
                    }),
                  ],
                }),
          }),
          o.jsxs("div", {
            className: "pdp-info",
            children: [
              o.jsxs("div", {
                className: "crumbs",
                children: [
                  o.jsx(D, { to: "/shop", children: "Categories" }),
                  " › ",
                  o.jsx(D, {
                    to: `/shop?cat=${t.category}`,
                    children: Io(t.category),
                  }),
                  " › ",
                  o.jsx("span", { children: t.categoryLabel }),
                ],
              }),
              o.jsx("h1", { className: "pdp-title", children: t.title }),
              o.jsxs("p", {
                className: "pdp-price",
                children: [
                  K(t.price),
                  t.compareAt && o.jsx("s", { children: K(t.compareAt) }),
                ],
              }),
              o.jsx("p", { className: "pdp-desc", children: t.description }),
              o.jsxs("p", {
                className: "pdp-desc",
                style: { color: "var(--muted)" },
                children: [
                  "Designed in ",
                  C.city,
                  ", produced in ",
                  C.country,
                  ".",
                ],
              }),
              o.jsx("button", {
                className: "link-orange",
                onClick: () => l("sizechart"),
                "data-testid": "size-chart",
                children: "Size chart",
              }),
              o.jsxs("div", {
                style: { marginTop: 16 },
                children: [
                  o.jsxs("div", {
                    className: "size-row",
                    children: [
                      o.jsx("label", {
                        htmlFor: "size-select",
                        className: "label-sm",
                        children: "Size",
                      }),
                      a &&
                        o.jsx("button", {
                          className: "clear-link",
                          onClick: () => u(""),
                          children: "Clear",
                        }),
                    ],
                  }),
                  o.jsxs("div", {
                    className: `size-select ${p ? "nudge" : ""}`,
                    children: [
                      o.jsxs("select", {
                        id: "size-select",
                        value: a,
                        onChange: (w) => u(w.target.value),
                        "data-testid": "size-select",
                        children: [
                          o.jsx("option", {
                            value: "",
                            children: "Choose an option",
                          }),
                          t.sizes.map((w) =>
                            o.jsx("option", { value: w, children: w }, w),
                          ),
                        ],
                      }),
                      o.jsx("span", { className: "chev", children: "▾" }),
                    ],
                  }),
                ],
              }),
              o.jsxs("div", {
                style: { marginTop: 14 },
                children: [
                  o.jsx("span", {
                    className: "label-sm",
                    children: "Quantity",
                  }),
                  o.jsxs("div", {
                    className: "qty-row",
                    children: [
                      o.jsxs("div", {
                        className: "qty",
                        children: [
                          o.jsx("button", {
                            onClick: () => h((w) => Math.max(1, w - 1)),
                            "aria-label": "Decrease quantity",
                            children: "–",
                          }),
                          o.jsx("input", {
                            value: c,
                            onChange: (w) =>
                              h(
                                Math.max(
                                  1,
                                  Math.min(99, Number(w.target.value) || 1),
                                ),
                              ),
                            "aria-label": "Quantity",
                            "data-testid": "qty-input",
                          }),
                          o.jsx("button", {
                            onClick: () => h((w) => Math.min(99, w + 1)),
                            "aria-label": "Increase quantity",
                            children: "+",
                          }),
                        ],
                      }),
                      o.jsx("button", {
                        ref: x,
                        className: "btn-cta",
                        onClick: y,
                        "aria-disabled": !a,
                        style: { opacity: a ? 1 : 0.55 },
                        "data-testid": "add-to-cart",
                        children: "Add to cart",
                      }),
                    ],
                  }),
                ],
              }),
              o.jsxs("div", {
                className: "sku",
                children: [
                  "SKU: ",
                  t.sku,
                  " · Colour: ",
                  t.colorName,
                  " · Category: ",
                  Io(t.category),
                ],
              }),
              o.jsx("div", {
                className: "delivery",
                children: C.delivery.map((w) =>
                  o.jsxs(
                    "div",
                    {
                      children: [
                        o.jsx("h4", { children: w.title }),
                        o.jsx("p", { children: w.text }),
                      ],
                    },
                    w.title,
                  ),
                ),
              }),
              o.jsxs("details", {
                className: "details",
                open: !0,
                children: [
                  o.jsx("summary", { children: "Details" }),
                  o.jsx("ul", {
                    children: t.details.map((w) =>
                      o.jsx("li", { children: w }, w),
                    ),
                  }),
                ],
              }),
              o.jsxs("details", {
                className: "details",
                children: [
                  o.jsx("summary", { children: "Care" }),
                  o.jsxs("ul", {
                    children: [
                      o.jsx("li", { children: "Wash cold, inside out" }),
                      o.jsx("li", { children: "Do not tumble dry" }),
                      o.jsx("li", {
                        children: "Iron on reverse, avoid the print",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      o.jsxs("section", {
        className: "related",
        children: [
          o.jsx("div", {
            className: "section-head",
            children: o.jsx("h2", {
              className: "h-display section-title",
              children: "You may also like",
            }),
          }),
          o.jsx("div", {
            className: "grid",
            children: Um(t).map((w) => o.jsx(As, { p: w }, w.id)),
          }),
        ],
      }),
      o.jsxs("div", {
        className: `sticky-atc ${k ? "show" : ""}`,
        "aria-hidden": !k,
        children: [
          o.jsxs("div", {
            style: { flex: "0 0 auto" },
            children: [
              o.jsx("div", {
                style: {
                  fontWeight: 600,
                  fontSize: 14,
                  maxWidth: 110,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
                children: t.name,
              }),
              o.jsx("div", {
                style: { color: "var(--muted)", fontSize: 13 },
                children: K(t.price),
              }),
            ],
          }),
          o.jsxs("select", {
            className: "sort",
            style: { height: 46, borderRadius: 8, flex: "0 0 92px" },
            value: a,
            onChange: (w) => u(w.target.value),
            "aria-label": "Size",
            children: [
              o.jsx("option", { value: "", children: "Size" }),
              t.sizes.map((w) => o.jsx("option", { value: w, children: w }, w)),
            ],
          }),
          o.jsx("button", {
            className: "btn-cta",
            onClick: y,
            style: { opacity: a ? 1 : 0.55 },
            "data-testid": "sticky-add",
            children: "Add to cart",
          }),
        ],
      }),
    ],
  });
}
function bd(e, t = "standard") {
  return t === "pickup"
    ? 0
    : t === "express"
      ? 7
      : e >= C.freeShippingOver
        ? 0
        : 4;
}
function wv() {
  tt(`Cart — ${C.name}`);
  const { lines: e, subtotal: t, discount: n, applyPromo: r, promo: l } = on(),
    [i, s] = g.useState(""),
    [a, u] = g.useState(""),
    c = bd(t - n),
    h = C.freeShippingOver - (t - n);
  return o.jsxs("div", {
    className: "wrap page",
    children: [
      o.jsx("h1", {
        className: "h-display shop-title",
        style: { paddingTop: 28 },
        children: "Your cart",
      }),
      e.length === 0
        ? o.jsxs("div", {
            className: "empty",
            children: [
              o.jsx("p", { children: "Your cart is empty." }),
              o.jsx(D, {
                to: "/shop",
                className: "pill",
                children: "Browse the shop",
              }),
            ],
          })
        : o.jsxs("div", {
            className: "cart-page",
            children: [
              o.jsxs("div", {
                "data-testid": "cart-lines",
                children: [
                  h > 0
                    ? o.jsxs("div", {
                        className: "ship-bar",
                        children: [
                          o.jsxs("span", {
                            children: [
                              "You’re ",
                              K(h),
                              " away from free shipping.",
                            ],
                          }),
                          o.jsx("i", {
                            style: {
                              width: `${Math.min(100, ((t - n) / C.freeShippingOver) * 100)}%`,
                            },
                          }),
                        ],
                      })
                    : o.jsxs("div", {
                        className: "ship-bar done",
                        children: [
                          o.jsx("span", {
                            children: "Free shipping unlocked.",
                          }),
                          o.jsx("i", { style: { width: "100%" } }),
                        ],
                      }),
                  e.map((p) => o.jsx(Xd, { ...p }, p.id + p.size)),
                ],
              }),
              o.jsxs("aside", {
                className: "summary",
                children: [
                  o.jsx("h3", { children: "Summary" }),
                  o.jsxs("div", {
                    className: "summary-row",
                    children: [
                      o.jsx("span", { children: "Subtotal" }),
                      o.jsx("span", { children: K(t) }),
                    ],
                  }),
                  n > 0 &&
                    o.jsxs("div", {
                      className: "summary-row",
                      children: [
                        o.jsxs("span", { children: ["Discount (", l, ")"] }),
                        o.jsxs("span", { children: ["−", K(n)] }),
                      ],
                    }),
                  o.jsxs("div", {
                    className: "summary-row",
                    children: [
                      o.jsx("span", { children: "Shipping" }),
                      o.jsx("span", { children: c === 0 ? "Free" : K(c) }),
                    ],
                  }),
                  o.jsxs("div", {
                    className: "summary-row total",
                    children: [
                      o.jsx("span", { children: "Total" }),
                      o.jsx("span", {
                        "data-testid": "cart-total",
                        children: K(t - n + c),
                      }),
                    ],
                  }),
                  !l &&
                    o.jsxs("form", {
                      className: "promo",
                      onSubmit: (p) => {
                        (p.preventDefault(),
                          u(
                            r(i)
                              ? "Code applied: 10% off."
                              : "That code is not valid.",
                          ));
                      },
                      children: [
                        o.jsx("input", {
                          placeholder: "Promo code",
                          value: i,
                          onChange: (p) => s(p.target.value),
                          "aria-label": "Promo code",
                        }),
                        o.jsx("button", { type: "submit", children: "Apply" }),
                      ],
                    }),
                  a &&
                    o.jsx("div", {
                      style: {
                        fontSize: 13,
                        color: "var(--muted)",
                        marginBottom: 10,
                      },
                      children: a,
                    }),
                  o.jsxs("div", {
                    style: {
                      fontSize: 12.5,
                      color: "var(--muted)",
                      marginBottom: 14,
                    },
                    children: [
                      "Try code ",
                      o.jsxs("b", { children: [C.name.toUpperCase(), "10"] }),
                      " for 10% off.",
                    ],
                  }),
                  o.jsx(D, {
                    to: "/checkout",
                    className: "btn-cta",
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                    "data-testid": "to-checkout",
                    children: "Checkout",
                  }),
                  o.jsx(D, {
                    to: "/shop",
                    className: "pill",
                    style: { width: "100%", marginTop: 10 },
                    children: "Continue shopping",
                  }),
                ],
              }),
            ],
          }),
    ],
  });
}
const Zd = `${C.name.toLowerCase()}-last-order`;
function kv() {
  var d, m;
  tt(`Checkout — ${C.name}`);
  const { lines: e, subtotal: t, discount: n, clear: r } = on(),
    l = Un(),
    [i, s] = g.useState("standard"),
    [a, u] = g.useState(!1),
    [c, h] = g.useState({}),
    [p, v] = g.useState({
      email: "",
      first: "",
      last: "",
      address: "",
      city: "",
      zip: "",
      country: C.country,
      phone: "",
      card: "",
      exp: "",
      cvc: "",
      name: "",
    }),
    x = bd(t - n, i),
    k = t - n + x,
    j = (y) => (S) => {
      let w = S.target.value;
      (y === "card" &&
        (w = w
          .replace(/\D/g, "")
          .slice(0, 16)
          .replace(/(.{4})/g, "$1 ")
          .trim()),
        y === "exp" &&
          (w = w
            .replace(/\D/g, "")
            .slice(0, 4)
            .replace(/^(\d{2})(\d)/, "$1/$2")),
        y === "cvc" && (w = w.replace(/\D/g, "").slice(0, 4)),
        v((R) => ({ ...R, [y]: w })));
    };
  if (e.length === 0 && !a)
    return o.jsxs("div", {
      className: "wrap page empty",
      children: [
        o.jsx("h1", {
          className: "h-display shop-title",
          children: "Checkout",
        }),
        o.jsx("p", { children: "Your cart is empty." }),
        o.jsx(D, {
          to: "/shop",
          className: "pill",
          children: "Browse the shop",
        }),
      ],
    });
  const N = (y) => {
      var L;
      y.preventDefault();
      const S = {};
      if (
        (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email) ||
          (S.email = "Enter a valid email"),
        ["first", "last", "city", "zip"].forEach(($) => {
          p[$].trim() || (S[$] = "Required");
        }),
        i !== "pickup" && !p.address.trim() && (S.address = "Required"),
        p.card.replace(/\s/g, "").length < 12 &&
          (S.card = "Enter any 12–16 digits (demo)"),
        /^\d{2}\/\d{2}$/.test(p.exp) || (S.exp = "MM/YY"),
        p.cvc.length < 3 && (S.cvc = "3–4 digits"),
        h(S),
        Object.keys(S).length)
      ) {
        (L = document.querySelector(".field .error")) == null ||
          L.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      u(!0);
      const w = `${C.name.slice(0, 3).toUpperCase()}-${Math.floor(1e5 + Math.random() * 9e5)}`,
        R = {
          no: w,
          at: Date.now(),
          lines: e,
          subtotal: t,
          discount: n,
          ship: x,
          total: k,
          method: i,
          name: `${p.first} ${p.last}`,
          email: p.email,
          address: `${p.address}, ${p.zip} ${p.city}, ${p.country}`,
        };
      window.setTimeout(() => {
        (localStorage.setItem(Zd, JSON.stringify(R)), r(), l(`/order/${w}`));
      }, 1200);
    },
    f = (y, S, w = {}, R = "") =>
      o.jsxs("div", {
        className: `field ${R}`,
        children: [
          o.jsx("label", { htmlFor: `f-${y}`, children: S }),
          o.jsx("input", { id: `f-${y}`, value: p[y], onChange: j(y), ...w }),
          c[y] && o.jsx("span", { className: "error", children: c[y] }),
        ],
      });
  return o.jsxs("div", {
    className: "wrap page",
    children: [
      o.jsxs("div", {
        className: "crumbs",
        style: { paddingTop: 24 },
        children: [
          o.jsx(D, { to: "/cart", children: "Cart" }),
          " › ",
          o.jsx("span", { children: "Checkout" }),
        ],
      }),
      o.jsxs("form", {
        className: "checkout",
        onSubmit: N,
        noValidate: !0,
        children: [
          o.jsxs("div", {
            children: [
              o.jsx("h1", {
                className: "h-display shop-title",
                children: "Checkout",
              }),
              o.jsx("h3", { className: "co-h", children: "Contact" }),
              o.jsx("div", {
                className: "form-grid",
                children: f(
                  "email",
                  "Email",
                  {
                    type: "email",
                    autoComplete: "email",
                    placeholder: "you@example.com",
                  },
                  "full",
                ),
              }),
              o.jsx("h3", { className: "co-h", children: "Delivery" }),
              o.jsx("div", {
                className: "methods",
                children: [
                  [
                    "standard",
                    ((d = C.delivery[0]) == null ? void 0 : d.title) ??
                      "Standard",
                    t - n >= C.freeShippingOver ? "Free" : K(4),
                    "2–3 working days",
                  ],
                  ["express", "Express", K(7), "24–48 h"],
                  [
                    "pickup",
                    ((m = C.delivery[2]) == null ? void 0 : m.title) ??
                      "Pick up in store",
                    "Free",
                    C.contact.address,
                  ],
                ].map(([y, S, w, R]) =>
                  o.jsxs(
                    "label",
                    {
                      className: `method ${i === y ? "on" : ""}`,
                      children: [
                        o.jsx("input", {
                          type: "radio",
                          name: "method",
                          checked: i === y,
                          onChange: () => s(y),
                        }),
                        o.jsxs("span", {
                          children: [
                            o.jsx("b", { children: S }),
                            o.jsx("small", { children: R }),
                          ],
                        }),
                        o.jsx("span", { children: w }),
                      ],
                    },
                    y,
                  ),
                ),
              }),
              o.jsxs("div", {
                className: "form-grid",
                children: [
                  f("first", "First name", { autoComplete: "given-name" }),
                  f("last", "Last name", { autoComplete: "family-name" }),
                  i !== "pickup" &&
                    f(
                      "address",
                      "Address",
                      { autoComplete: "street-address" },
                      "full",
                    ),
                  f("zip", "Postal code", { autoComplete: "postal-code" }),
                  f("city", "City", { autoComplete: "address-level2" }),
                  o.jsxs("div", {
                    className: "field",
                    children: [
                      o.jsx("label", {
                        htmlFor: "f-country",
                        children: "Country",
                      }),
                      o.jsx("select", {
                        id: "f-country",
                        value: p.country,
                        onChange: j("country"),
                        children: [
                          C.country,
                          "Spain",
                          "France",
                          "Germany",
                          "Netherlands",
                          "United Kingdom",
                          "United States",
                          "Other",
                        ].map((y) => o.jsx("option", { children: y }, y)),
                      }),
                    ],
                  }),
                  f("phone", "Phone (optional)", {
                    type: "tel",
                    autoComplete: "tel",
                  }),
                ],
              }),
              o.jsx("h3", { className: "co-h", children: "Payment" }),
              o.jsx("div", {
                className: "demo-note",
                children:
                  "Demo checkout: no payment is taken and nothing is charged. Use any numbers.",
              }),
              o.jsxs("div", {
                className: "form-grid",
                children: [
                  f(
                    "card",
                    "Card number",
                    {
                      inputMode: "numeric",
                      placeholder: "4242 4242 4242 4242",
                      autoComplete: "off",
                    },
                    "full",
                  ),
                  f("exp", "Expiry", {
                    inputMode: "numeric",
                    placeholder: "MM/YY",
                    autoComplete: "off",
                  }),
                  f("cvc", "CVC", {
                    inputMode: "numeric",
                    placeholder: "123",
                    autoComplete: "off",
                  }),
                ],
              }),
              o.jsx("button", {
                className: "btn-cta",
                style: { marginTop: 22 },
                disabled: a,
                "data-testid": "place-order",
                children: a
                  ? o.jsx("span", { className: "spinner" })
                  : `Place order · ${K(k)}`,
              }),
            ],
          }),
          o.jsxs("aside", {
            className: "summary",
            children: [
              o.jsx("h3", { children: "Order summary" }),
              e.map((y) => {
                const S = et(y.id);
                return o.jsxs(
                  "div",
                  {
                    className: "mini-line",
                    children: [
                      o.jsxs("span", {
                        className: "mini-img",
                        children: [
                          o.jsx("img", { src: ae(S.id, "card"), alt: "" }),
                          o.jsx("b", { children: y.qty }),
                        ],
                      }),
                      o.jsxs("span", {
                        style: { flex: 1 },
                        children: [
                          o.jsx("b", {
                            style: { fontWeight: 600 },
                            children: S.title,
                          }),
                          o.jsx("br", {}),
                          o.jsxs("small", {
                            style: { color: "var(--muted)" },
                            children: ["Size ", y.size],
                          }),
                        ],
                      }),
                      o.jsx("span", { children: K(S.price * y.qty) }),
                    ],
                  },
                  y.id + y.size,
                );
              }),
              o.jsxs("div", {
                className: "summary-row",
                style: { marginTop: 14 },
                children: [
                  o.jsx("span", { children: "Subtotal" }),
                  o.jsx("span", { children: K(t) }),
                ],
              }),
              n > 0 &&
                o.jsxs("div", {
                  className: "summary-row",
                  children: [
                    o.jsx("span", { children: "Discount" }),
                    o.jsxs("span", { children: ["−", K(n)] }),
                  ],
                }),
              o.jsxs("div", {
                className: "summary-row",
                children: [
                  o.jsx("span", { children: "Shipping" }),
                  o.jsx("span", { children: x === 0 ? "Free" : K(x) }),
                ],
              }),
              o.jsxs("div", {
                className: "summary-row total",
                children: [
                  o.jsx("span", { children: "Total" }),
                  o.jsx("span", { children: K(k) }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function jv() {
  tt(`Order confirmed — ${C.name}`);
  let e = null;
  try {
    e = JSON.parse(localStorage.getItem(Zd) || "null");
  } catch {}
  return o.jsxs("div", {
    className: "confirm page",
    "data-testid": "order-confirmed",
    children: [
      o.jsx("div", {
        className: "check-anim",
        children: o.jsxs("svg", {
          viewBox: "0 0 52 52",
          children: [
            o.jsx("circle", { cx: "26", cy: "26", r: "24" }),
            o.jsx("path", { d: "M15 27l7 7 15-16" }),
          ],
        }),
      }),
      o.jsxs("div", {
        className: "kicker",
        children: ["Thank you", e ? `, ${e.name.split(" ")[0]}` : ""],
      }),
      o.jsx("h1", { children: "Your order is confirmed." }),
      e && o.jsx("p", { className: "order-no", children: e.no }),
      o.jsxs("p", {
        style: { color: "var(--muted)" },
        children: [
          e
            ? o.jsxs(o.Fragment, {
                children: [
                  "A confirmation would be sent to ",
                  o.jsx("b", { children: e.email }),
                  ". ",
                ],
              })
            : null,
          "This is a demo store: nothing was charged and nothing will ship.",
        ],
      }),
      e &&
        o.jsxs("div", {
          className: "summary",
          style: { position: "static", textAlign: "left", margin: "26px 0" },
          children: [
            e.lines.map((t) => {
              const n = et(t.id);
              return n
                ? o.jsxs(
                    "div",
                    {
                      className: "summary-row",
                      children: [
                        o.jsxs("span", {
                          children: [t.qty, " × ", n.title, " (", t.size, ")"],
                        }),
                        o.jsx("span", { children: K(n.price * t.qty) }),
                      ],
                    },
                    t.id + t.size,
                  )
                : null;
            }),
            o.jsxs("div", {
              className: "summary-row total",
              children: [
                o.jsx("span", { children: "Total paid" }),
                o.jsx("span", { children: K(e.total) }),
              ],
            }),
            o.jsx("div", {
              style: { color: "var(--muted)", fontSize: 13, marginTop: 8 },
              children:
                e.method === "pickup"
                  ? `Pick up at ${C.contact.address}`
                  : `Ships to ${e.address}`,
            }),
          ],
        }),
      o.jsx(D, {
        to: "/shop",
        className: "pill solid",
        children: "Continue shopping",
      }),
    ],
  });
}
function Sv() {
  tt(`Our story — ${C.name}`);
  const e = C.rail.products;
  return o.jsxs("div", {
    className: "page",
    children: [
      o.jsxs("section", {
        className: "about-hero wrap",
        children: [
          o.jsx("div", { className: "kicker", children: C.story.kicker }),
          o.jsx("h1", {
            className: "h-display about-title",
            children: C.tagline,
          }),
        ],
      }),
      o.jsx("div", {
        className: "about-strip",
        children: e.slice(0, 4).map((t, n) => {
          var r;
          return o.jsx(
            "div",
            {
              style: {
                background:
                  ((r = C.lookbook.items[n]) == null ? void 0 : r.tone) ??
                  "var(--surface)",
              },
              children: o.jsx("img", {
                src: ae(t, n % 2 ? "back" : "angle"),
                alt: "",
                loading: "lazy",
              }),
            },
            t,
          );
        }),
      }),
      o.jsxs("section", {
        className: "story wrap",
        children: [
          o.jsx("h2", {
            className: "h-display section-title",
            style: { fontSize: "clamp(30px, 3.6vw, 48px)" },
            children: C.story.title,
          }),
          o.jsxs("div", {
            children: [
              C.story.body.map((t, n) => o.jsx("p", { children: t }, n)),
              o.jsx("div", {
                className: "stats",
                children: C.story.stats.map((t) =>
                  o.jsxs(
                    "div",
                    {
                      className: "stat",
                      children: [
                        o.jsx("b", { children: t.value }),
                        o.jsx("span", { children: t.label }),
                      ],
                    },
                    t.label,
                  ),
                ),
              }),
            ],
          }),
        ],
      }),
      o.jsx("section", {
        className: "wrap values",
        children: [
          [
            "Made close to home",
            `Cut, sewn and printed in ${C.country}, within a few hours of the studio.`,
          ],
          [
            "Small runs",
            "We produce in small batches and restock what you love. No overproduction, no landfill.",
          ],
          [
            "Heavy fabrics",
            "Dense cottons and brushed fleece that get better with every wash.",
          ],
        ].map(([t, n]) =>
          o.jsxs(
            "div",
            {
              className: "value",
              children: [
                o.jsx("h3", { children: t }),
                o.jsx("p", { children: n }),
              ],
            },
            t,
          ),
        ),
      }),
      o.jsx("div", {
        className: "wrap",
        style: { textAlign: "center", padding: "20px 0" },
        children: o.jsxs(D, {
          to: "/shop",
          className: "pill solid",
          children: ["Shop the collection ", o.jsx(_t, { size: 14 })],
        }),
      }),
    ],
  });
}
function Nv() {
  return (
    tt(`Lookbook — ${C.name}`),
    o.jsxs("div", {
      className: "page wrap",
      children: [
        o.jsxs("div", {
          style: { padding: "30px 0 10px" },
          children: [
            o.jsx("div", { className: "kicker", children: C.lookbook.kicker }),
            o.jsx("h1", {
              className: "h-display shop-title",
              children: C.lookbook.title,
            }),
          ],
        }),
        o.jsx("div", {
          className: "lb-editorial",
          children: C.lookbook.items.map((e, t) => {
            const n = et(e.product);
            return n
              ? o.jsxs(
                  D,
                  {
                    to: `/product/${n.id}`,
                    className: `lb-card ${$d(e.tone) ? "dark" : ""}`,
                    style: { background: e.tone },
                    children: [
                      o.jsx("img", {
                        src: ae(n.id, t % 2 ? "back" : "angle"),
                        alt: n.title,
                        loading: "lazy",
                      }),
                      o.jsxs("div", {
                        className: "lb-cap",
                        children: [
                          o.jsx("span", {
                            children: String(t + 1).padStart(2, "0"),
                          }),
                          o.jsx("b", { children: e.caption }),
                          o.jsxs("em", {
                            children: [
                              "Shop ",
                              n.name,
                              " ",
                              o.jsx(_t, { size: 13 }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  },
                  e.product,
                )
              : null;
          }),
        }),
      ],
    })
  );
}
function Cv() {
  var l, i;
  tt(`Contact — ${C.name}`);
  const [e, t] = g.useState(!1),
    [n, r] = g.useState({ name: "", email: "", topic: "Order", msg: "" });
  return o.jsxs("div", {
    className: "page wrap",
    children: [
      o.jsxs("div", {
        style: { padding: "30px 0 0" },
        children: [
          o.jsx("div", { className: "kicker", children: "Contact" }),
          o.jsx("h1", {
            className: "h-display shop-title",
            children: "Say olá.",
          }),
        ],
      }),
      o.jsxs("div", {
        className: "contact-grid",
        children: [
          o.jsxs("div", {
            style: { display: "flex", flexDirection: "column", gap: 14 },
            children: [
              o.jsxs("div", {
                className: "contact-card",
                children: [
                  o.jsx("h3", {
                    style: { marginTop: 0 },
                    children: "Studio & shop",
                  }),
                  o.jsx("p", { children: C.contact.address }),
                  o.jsx("p", {
                    style: { color: "var(--muted)" },
                    children: C.contact.hours,
                  }),
                ],
              }),
              o.jsxs("div", {
                className: "contact-card",
                children: [
                  o.jsx("h3", {
                    style: { marginTop: 0 },
                    children: "Write or call",
                  }),
                  o.jsx("p", {
                    children: o.jsx("a", {
                      href: `mailto:${C.contact.email}`,
                      children: C.contact.email,
                    }),
                  }),
                  o.jsx("p", { children: C.contact.phone }),
                  o.jsx("p", { children: C.contact.instagram }),
                ],
              }),
              o.jsxs("details", {
                className: "details",
                open: !0,
                children: [
                  o.jsx("summary", {
                    children: "How long does delivery take?",
                  }),
                  o.jsx("p", {
                    children: (l = C.delivery[0]) == null ? void 0 : l.text,
                  }),
                ],
              }),
              o.jsxs("details", {
                className: "details",
                children: [
                  o.jsx("summary", { children: "Do you ship worldwide?" }),
                  o.jsx("p", {
                    children: (i = C.delivery[1]) == null ? void 0 : i.text,
                  }),
                ],
              }),
              o.jsxs("details", {
                className: "details",
                children: [
                  o.jsx("summary", { children: "Can I return an item?" }),
                  o.jsx("p", {
                    children:
                      "Yes, within 30 days in unworn condition. Write to us and we’ll send a label.",
                  }),
                ],
              }),
            ],
          }),
          o.jsx("div", {
            className: "contact-card",
            children: e
              ? o.jsxs("div", {
                  className: "empty",
                  style: { color: "var(--ink)" },
                  "data-testid": "contact-sent",
                  children: [
                    o.jsxs("h3", {
                      children: [
                        "Thanks, ",
                        n.name.split(" ")[0] || "friend",
                        ".",
                      ],
                    }),
                    o.jsx("p", {
                      style: { color: "var(--muted)" },
                      children:
                        "Message received (demo). We usually reply within one working day.",
                    }),
                  ],
                })
              : o.jsxs("form", {
                  className: "form-grid",
                  onSubmit: (s) => {
                    (s.preventDefault(), t(!0));
                  },
                  children: [
                    o.jsxs("div", {
                      className: "field",
                      children: [
                        o.jsx("label", { htmlFor: "c-name", children: "Name" }),
                        o.jsx("input", {
                          id: "c-name",
                          required: !0,
                          value: n.name,
                          onChange: (s) => r({ ...n, name: s.target.value }),
                        }),
                      ],
                    }),
                    o.jsxs("div", {
                      className: "field",
                      children: [
                        o.jsx("label", {
                          htmlFor: "c-email",
                          children: "Email",
                        }),
                        o.jsx("input", {
                          id: "c-email",
                          type: "email",
                          required: !0,
                          value: n.email,
                          onChange: (s) => r({ ...n, email: s.target.value }),
                        }),
                      ],
                    }),
                    o.jsxs("div", {
                      className: "field full",
                      children: [
                        o.jsx("label", {
                          htmlFor: "c-topic",
                          children: "Topic",
                        }),
                        o.jsx("select", {
                          id: "c-topic",
                          value: n.topic,
                          onChange: (s) => r({ ...n, topic: s.target.value }),
                          children: [
                            "Order",
                            "Returns",
                            "Wholesale",
                            "Press",
                            "Something else",
                          ].map((s) => o.jsx("option", { children: s }, s)),
                        }),
                      ],
                    }),
                    o.jsxs("div", {
                      className: "field full",
                      children: [
                        o.jsx("label", {
                          htmlFor: "c-msg",
                          children: "Message",
                        }),
                        o.jsx("textarea", {
                          id: "c-msg",
                          rows: 6,
                          required: !0,
                          value: n.msg,
                          onChange: (s) => r({ ...n, msg: s.target.value }),
                        }),
                      ],
                    }),
                    o.jsx("div", {
                      className: "full",
                      children: o.jsx("button", {
                        className: "btn-cta",
                        type: "submit",
                        children: "Send message",
                      }),
                    }),
                  ],
                }),
          }),
        ],
      }),
    ],
  });
}
function Ev() {
  const { pathname: e } = An(),
    navigate = Un(),
    {
      close: t,
      floatingProduct,
      setFloatingProduct,
      floatingCart,
      setFloatingCart,
      floatingCheckout,
      setFloatingCheckout,
      floatingWishlist,
      setFloatingWishlist,
      wishlist,
      toggleWishlist,
      isInWishlist,
      openProduct,
      openCart,
      openCheckout,
      openWishlist,
      closeModals,
    } = Ae(),
    {
      lines: cartLines,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      promo: cartPromo,
      applyPromo,
      update: updateCartQty,
      remove: removeCartItem,
      clear: clearCart,
      add: addToCart,
    } = on();

  // Route synchronization
  g.useEffect(() => {
    t();
    if (e.startsWith('/product/')) {
      const pid = e.split('/')[2];
      setFloatingProduct(pid);
    } else if (e === '/cart') {
      setFloatingCart(true);
    } else if (e === '/checkout') {
      setFloatingCheckout(true);
    } else if (e === '/wishlist') {
      setFloatingWishlist(true);
    }
  }, [e]);

  const handleCloseModal = () => {
    closeModals();
    if (e.startsWith('/product/') || e === '/cart' || e === '/checkout' || e === '/wishlist') {
      navigate('/shop');
    }
  };

  const n = e.split("/")[1] || "home";
  const r = n === "checkout";

  // Active product for modal
  const activeProdObj = floatingProduct ? et(floatingProduct) : null;

  return (
    g.useEffect(() => {
      document.body.dataset.route = n;
    }, [n]),
    o.jsxs(o.Fragment, {
      children: [
        o.jsx(qm, {}),
        o.jsx(
          "main",
          {
            className: "page-anim",
            children: o.jsxs(Sm, {
              children: [
                o.jsx(We, { path: "/", element: o.jsx(mv, {}) }),
                o.jsx(We, { path: "/shop", element: o.jsx(gv, {}) }),
                o.jsx(We, { path: "/product/:id", element: o.jsx(gv, {}) }),
                o.jsx(We, { path: "/cart", element: o.jsx(gv, {}) }),
                o.jsx(We, { path: "/checkout", element: o.jsx(gv, {}) }),
                o.jsx(We, { path: "/order/:no", element: o.jsx(jv, {}) }),
                o.jsx(We, { path: "/about", element: o.jsx(Sv, {}) }),
                o.jsx(We, { path: "/lookbook", element: o.jsx(Nv, {}) }),
                o.jsx(We, { path: "/contact", element: o.jsx(Cv, {}) }),
                o.jsx(We, { path: "*", element: o.jsx(Jd, {}) }),
              ],
            }),
          },
          e,
        ),
        !r && o.jsx(Gm, {}),
        !r && o.jsx(Ym, {}),

        /* FLOATING MODALS */
        activeProdObj && (
          <FloatingProductModal
            product={activeProdObj}
            garmentImgUrl={ae}
            garmentFrameUrl={Rr}
            Canvas360={Dr}
            formatPrice={K}
            onToggleWishlist={toggleWishlist}
            isWishlisted={activeProdObj ? isInWishlist(activeProdObj.id) : false}
            onClose={handleCloseModal}
            onAddToCart={(pid, sz, qty) => {
              addToCart(pid, sz, qty);
              setFloatingProduct(null);
              setFloatingCart(true);
              window.history.pushState(null, '', '/cart');
            }}
            onBuyNow={(pid, sz, qty) => {
              addToCart(pid, sz, qty);
              setFloatingProduct(null);
              setFloatingCheckout(true);
              window.history.pushState(null, '', '/checkout');
            }}
          />
        ),

        floatingCart && (
          <FloatingCartModal
            lines={cartLines}
            subtotal={cartSubtotal}
            discount={cartDiscount}
            promo={cartPromo}
            onApplyPromo={applyPromo}
            onUpdateQty={updateCartQty}
            onRemove={removeCartItem}
            onClose={handleCloseModal}
            onCheckout={() => {
              setFloatingCart(false);
              setFloatingCheckout(true);
              window.history.pushState(null, '', '/checkout');
            }}
            garmentImgUrl={ae}
            formatPrice={K}
            freeShippingOver={C.freeShippingOver}
          />
        ),

        floatingCheckout && (
          <FloatingCheckoutModal
            lines={cartLines}
            subtotal={cartSubtotal}
            discount={cartDiscount}
            onClearCart={clearCart}
            onClose={handleCloseModal}
            garmentImgUrl={ae}
            formatPrice={K}
            country={C.country}
          />
        ),

        floatingWishlist && (
          <FloatingWishlistModal
            wishlistIds={wishlist}
            onToggleWishlist={toggleWishlist}
            onAddToCart={(pid, sz, qty) => {
              addToCart(pid, sz, qty);
            }}
            onOpenProduct={(pid) => {
              openProduct(pid);
              window.history.pushState(null, '', `/product/${pid}`);
            }}
            onClose={handleCloseModal}
            getProduct={et}
            garmentImgUrl={ae}
            formatPrice={K}
          />
        ),

        o.jsx(tv, {}),
        o.jsx(nv, {}),
        o.jsx(lv, {}),
        o.jsx(iv, {}),
        o.jsx(ov, {}),
        o.jsx(sv, {}),

        /* RIGHT BOTTOM CORNER: POWERED BY SOFTZEN IT */
        o.jsxs("a", {
          href: "https://softzenit.com",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "softzen-powered-badge",
          title: "Powered by Softzen IT",
          children: [
            o.jsx("span", { className: "powered-txt", children: "Powered by" }),
            o.jsx("img", {
              src: "/softzen-it-logo-transparent.png",
              alt: "Softzen IT",
            }),
          ],
        }),
      ],
    })
  );
}
const Pv = document.documentElement.style,
  nt = C.colors;
Object.entries({
  bg: nt.bg,
  surface: nt.surface,
  ink: nt.ink,
  muted: nt.muted,
  line: nt.line,
  accent: nt.accent,
  link: nt.link,
  cta: nt.cta,
}).forEach(([e, t]) => Pv.setProperty(`--${e}`, t));

export default function App() {
  return (
    <BrowserRouter>
      <Wm>
        <Bm>
          <Ev />
        </Bm>
      </Wm>
    </BrowserRouter>
  );
}
