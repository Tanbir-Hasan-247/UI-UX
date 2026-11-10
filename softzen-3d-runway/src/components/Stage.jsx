import React, { useRef, useEffect } from 'react';
import { useRunway } from '../context/RunwayContext.jsx';
import { LOOKS } from '../data/runwayCatalog.js';

const FEEL = { soft: [60, 0.05], balanced: [95, 0.04], snappy: [160, 0.03] };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const TAU = Math.PI * 2;

export const Stage = ({ isMobile, runwayRef }) => {
  const {
    activeLookIndex,
    changeLook,
    nextLook,
    prevLook,
    isPlaying,
    setIsPlaying,
    isZoomed,
    setIsZoomed,
    hotPin,
    setHotPin,
    setHotCard,
    setEngaged,
    engaged,
    isPanelHovered,
    setIsStill,
  } = useRunway();

  const stageRef = useRef(null);
  const cursorRef = useRef(null);
  const actorsRef = useRef([]);
  const heroesRef = useRef([]);
  const lbRef = useRef(null);
  const lbStageRef = useRef(null);

  // Engine instance stored in ref to completely isolate 60fps RAF loop from React state
  const engineRef = useRef({
    ready: false,
    raf: null,
    visible: true,
    index: 0,
    target: 0,
    cur: 0,
    vel: 0,
    w: 0,
    h: 0,
    sim: [],
  });

  // Keep activeLookIndex synchronized with engine target
  useEffect(() => {
    const eng = engineRef.current;
    if (!eng.ready) return;
    if (eng.index !== activeLookIndex) {
      eng.goToLook(activeLookIndex);
    }
  }, [activeLookIndex]);

  // Main simulation lifecycle
  useEffect(() => {
    const stage = stageRef.current;
    const runway = runwayRef.current;
    const lb = lbRef.current;
    const lbStage = lbStageRef.current;
    const cursor = cursorRef.current;
    if (!stage || !runway) return;

    const n = 6;
    const N = n * Math.ceil(8 / n); // 12
    const mobile = isMobile;
    const f = FEEL.balanced;
    const K = f[0];
    const C = 2 * Math.sqrt(f[0]);
    const lag = f[1];
    const blurOn = true;
    const motionBlur = true;

    const eng = engineRef.current;
    eng.n = n;
    eng.N = N;
    eng.K = K;
    eng.C = C;
    eng.lag = lag;
    eng.blurOn = blurOn;
    eng.motionBlur = motionBlur;
    eng.speed = 5000;
    eng.visible = true;

    // Build sim bodies array
    const start = 1.15;
    eng.sim = actorsRef.current.map((el, a) => ({
      el,
      a,
      look: a % n,
      hit: el ? el.querySelector('[data-rw-go]') : null,
      x: a + start,
      v: 0,
      g: a + start,
      prev: a,
      trip: false,
      from: 0,
      blur: -1,
      w: 0,
    }));
    eng.cur = -start;
    eng.target = activeLookIndex;
    eng.index = activeLookIndex;
    eng.vel = 0;

    // Header height calculation
    const headerHeight = () => {
      let h = 0;
      document
        .querySelectorAll(
          '.site-header, .shopify-section-group-header-group, #shopify-section-header, #shopify-section-announcement-bar'
        )
        .forEach((el) => {
          if (el.contains(runway)) return;
          const cs = getComputedStyle(el);
          if (cs.display !== 'none' && cs.position !== 'absolute') {
            h += el.getBoundingClientRect().height;
          }
        });
      return Math.round(h) || 60;
    };

    // Measure layout
    const measure = () => {
      const isMob = window.matchMedia('(max-width: 749px)').matches;
      eng.mobile = isMob;
      eng.mode = isMob ? 'classic' : 'ring';

      const vh = window.innerHeight;
      const hdrH = headerHeight();
      const frameH = Math.max(380, vh - hdrH);
      runway.style.setProperty('--rw-frame-h', Math.round(frameH) + 'px');

      const r = stage.getBoundingClientRect();
      eng.W = r.width || 600;
      eng.H = r.height || 600;
      eng.fs = eng.mode === 'ring' ? 1.08 : 1;

      const room =
        eng.mode === 'ring'
          ? (eng.H - 34 - 18) / eng.fs
          : eng.mode === 'classic'
          ? eng.H - (isMob ? 24 : 36) - 18
          : eng.H - (isMob ? 20 : 30) - 18;
      eng.modelH = Math.max(200, Math.round(room));
      stage.style.setProperty('--rw-model-h', eng.modelH + 'px');
      runway.style.setProperty('--rw-fs', eng.fs);

      if (eng.mode === 'classic') {
        eng.Cl = isMob
          ? { ax: 0.3, ay: 22, sx: 0.32, sy: 22, sr: 0.76, ex: 0.55, d: 4 }
          : { ax: 0.4, ay: 36, sx: 0.125, sy: 58, sr: 0.76, ex: 0.38, d: 5 };
        eng.unit = Math.max(90, eng.W * eng.Cl.sx * 1.6);
        eng.hx = eng.W * eng.Cl.ax;
        eng.hy = eng.Cl.ay;
      } else {
        eng.cx = eng.W * 0.5;
        eng.R = eng.W * (isMob ? 0.72 : 0.62);
        eng.P = eng.W * (isMob ? 1.9 : 1.65);
        eng.floor = eng.H - 34;
        eng.horizon = eng.H * 0.36;
        eng.unit = Math.max(isMob ? 90 : 120, eng.W * 0.3);
        eng.hx = eng.cx;
        eng.hy = 34;
      }

      stage.style.setProperty('--rw-hx', eng.hx.toFixed(1) + 'px');
      stage.style.setProperty('--rw-hy', eng.hy + 'px');
      runway.style.setProperty('--rw-ax', ((eng.hx / (eng.W || 1)) * 100).toFixed(2) + '%');

      eng.sim.forEach((s) => {
        if (s.el) {
          s.w = s.el.offsetWidth || s.w;
          s.blur = -1;
        }
      });
      renderAll();
    };

    // Body placement
    const put = (s, x, bottom, sc, o, blur, z) => {
      if (!s.el) return;
      const half = (s.w || 200) * sc * 0.5;
      if (x + half < -4 || x - half > eng.W + 4) o = 0;
      const st = s.el.style;
      st.transform = `translate3d(${x.toFixed(2)}px,${(-bottom).toFixed(2)}px,0) translateX(-50%) scale(${sc.toFixed(4)})`;
      st.opacity = o.toFixed(3);
      st.zIndex = String(z);
      st.visibility = o < 0.01 ? 'hidden' : 'visible';
      st.pointerEvents = o < 0.5 ? 'none' : '';
      const bb = Math.round(blur * 10) / 10;
      if (bb !== s.blur) {
        st.filter = bb > 0.05 ? `blur(${bb}px)` : '';
        s.blur = bb;
      }
    };

    const placeRing = (s) => {
      const stepVal = TAU / N;
      let phi = ((s.a - eng.cur) * stepVal) % TAU;
      if (phi > Math.PI) phi -= TAU;
      if (phi < -Math.PI) phi += TAU;
      const z = eng.R * (1 - Math.cos(phi));
      const sl = Math.abs(phi) / stepVal;
      const p = (eng.P / (eng.P + z)) * (1 + (eng.fs - 1) * clamp(1 - sl, 0, 1));
      const x = eng.cx + eng.R * Math.sin(phi) * (eng.P / (eng.P + z));
      const feet = eng.horizon + (eng.floor - eng.horizon) * (eng.P / (eng.P + z));
      let blur = 0;
      if (blurOn) blur = sl <= 1 ? 1.8 * sl : Math.min(1.8 + (sl - 1) * 2, 6.5);
      let o = clamp((Math.cos(phi) + 0.55) / 0.3, 0, 1);
      if (eng.still && sl < 0.02) o = 0;
      put(s, x, eng.H - feet, p, o, blur, Math.round(p * 1000));
    };

    const placeClassic = (s) => {
      const C = eng.Cl;
      if (!C) return;
      let k = s.x,
        e = -1;
      if (s.trip) {
        const goal = s.prev,
          fwd = goal > s.from;
        const u = clamp(Math.abs(s.x - s.from) / (Math.abs(goal - s.from) || 1), 0, 1);
        if (fwd) {
          if (u < 0.5) e = u * 2 * 1.4;
          else k = goal + (1 - u) * 2;
        } else {
          if (u < 0.5) k = s.from + u * 2;
          else e = (1 - u) * 2 * 1.4;
        }
      } else if (k < 0) e = Math.min(-k, 1.4);

      let x,
        b,
        sc,
        o,
        blur = 0,
        z;
      if (e >= 0) {
        x = eng.W * (C.ax - C.ex * e);
        b = C.ay - 22 * e;
        sc = 1 + 0.14 * e;
        o = Math.max(0, 1 - e * 1.05);
        if (blurOn) blur = 4 * Math.min(e, 1);
        z = 1100;
      } else {
        x = eng.W * (C.ax + C.sx * k);
        b = C.ay + C.sy * k;
        sc = Math.pow(C.sr, k);
        o = k <= C.d - 1 ? 1 - 0.13 * k : Math.max(0, (1 - 0.13 * (C.d - 1)) * (C.d - k));
        if (blurOn) blur = Math.min(k * 0.9, 3.2);
        if (eng.still && Math.abs(k) < 0.02) o = 0;
        z = 1000 - Math.round(k * 10);
      }
      put(s, x, b, sc, o, blur, z);
    };

    const renderAll = () => {
      if (eng.mode === 'ring') eng.sim.forEach(placeRing);
      else eng.sim.forEach(placeClassic);
    };

    const setStill = (on) => {
      eng.still = on;
      setIsStill(on);
      runway.classList.toggle('rw--still', on);
    };

    const kick = () => {
      if (eng.raf || !eng.visible) return;
      eng.last = 0;
      eng.raf = requestAnimationFrame(step);
    };

    const step = (t) => {
      const dt = eng.last ? Math.min(0.034, (t - eng.last) / 1000) : 1 / 60;
      eng.last = t;
      let busy = false;
      const sub = 3,
        h = dt / sub;

      if (eng.mode === 'ring') {
        const k2 = K,
          c2 = 2 * Math.sqrt(k2);
        for (let j = 0; j < sub; j++) {
          const acc = -k2 * (eng.cur - eng.target) - c2 * eng.vel;
          eng.vel += acc * h;
          eng.cur += eng.vel * h;
        }
        if (Math.abs(eng.cur - eng.target) > 0.0005 || Math.abs(eng.vel) > 0.0005) busy = true;
        else {
          eng.cur = eng.target;
          eng.vel = 0;
        }
        renderAll();
      } else {
        for (const s of eng.sim) {
          const wrapN = (v) => ((v % N) + N) % N;
          const goal = wrapN(s.a - eng.target);
          if (Math.abs(goal - s.prev) > N / 2) {
            s.trip = true;
            s.from = s.x;
          }
          s.prev = goal;
          const tau = eng.dragging ? 0.016 : s.trip ? 0.1 : 0.03 + lag * Math.min(goal, 4);
          s.g += (goal - s.g) * (1 - Math.exp(-dt / tau));
          for (let j = 0; j < sub; j++) {
            const acc = -K * (s.x - s.g) - C * s.v;
            s.v += acc * h;
            s.x += s.v * h;
          }
          if (s.trip && Math.abs(s.x - goal) < 0.02) s.trip = false;
          if (
            Math.abs(s.x - goal) > 0.0006 ||
            Math.abs(s.v) > 0.0006 ||
            Math.abs(s.g - goal) > 0.0006
          )
            busy = true;
          else {
            s.x = s.g = goal;
            s.v = 0;
            s.trip = false;
          }
          placeClassic(s);
        }
      }

      const moving = busy || eng.dragging;
      if (moving) setStill(false);
      if (moving && eng.visible && !document.hidden) {
        eng.raf = requestAnimationFrame(step);
      } else {
        eng.raf = null;
        if (!moving) setStill(true);
      }
    };

    const wrapN = (v) => ((v % N) + N) % N;
    const rankOf = (s) => {
      if (eng.mode === 'ring') {
        let k = wrapN(s.a - Math.round(eng.target));
        if (k > N / 2) k -= N;
        return k;
      }
      return wrapN(s.a - Math.round(eng.target));
    };

    const updateHits = () => {
      eng.sim.forEach((s) => {
        const k = rankOf(s);
        const near = k !== 0 && Math.abs(k) <= (eng.mode === 'ring' ? 2 : 3);
        if (s.hit) {
          s.hit.tabIndex = near ? 0 : -1;
          s.hit.setAttribute('aria-hidden', near ? 'false' : 'true');
        }
        if (s.el) {
          if (near) s.el.removeAttribute('aria-hidden');
          else s.el.setAttribute('aria-hidden', 'true');
        }
      });
    };

    eng.goToLook = (i) => {
      const mod = (val) => ((val % n) + n) % n;
      let d = mod(i - eng.index);
      if (d > n / 2) d -= n;
      eng.target = Math.round(eng.target) + d;
      eng.index = mod(i);
      setStill(false);
      updateHits();
      kick();
    };

    // Cut-out foot measurement
    const findFeet = (hero, lookIndex) => {
      const url = hero?.dataset?.probe;
      if (!url) return;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const w = 48,
            h = Math.max(1, Math.round((w * img.naturalHeight) / img.naturalWidth));
          const c = document.createElement('canvas');
          c.width = w;
          c.height = h;
          const ctx = c.getContext('2d', { willReadFrequently: true });
          ctx.drawImage(img, 0, 0, w, h);
          const d = ctx.getImageData(0, 0, w, h).data;
          let last = -1;
          for (let y = h - 1; y >= 0 && last < 0; y--) {
            for (let x = 0; x < w; x++) {
              if (d[(y * w + x) * 4 + 3] > 40) {
                last = y;
                break;
              }
            }
          }
          if (last < 0) return;
          const foot = clamp((h - 1 - last) / h, 0, 0.4).toFixed(4);
          hero.style.setProperty('--rw-foot', foot);
          eng.sim.forEach((s) => {
            if (s.look === lookIndex && s.el) s.el.style.setProperty('--rw-foot', foot);
          });
        } catch (_) {}
      };
      img.src = url;
    };

    heroesRef.current.forEach((h, i) => findFeet(h, i));

    // IntersectionObserver
    eng.io = new IntersectionObserver(
      (entries) => {
        eng.visible = entries[0].isIntersecting;
        if (eng.visible) kick();
      },
      { threshold: 0 }
    );
    eng.io.observe(stage);

    // Initial measure and kick
    measure();
    updateHits();
    kick();
    eng.ready = true;

    // Window resize
    let rzTimer;
    const onResize = () => {
      clearTimeout(rzTimer);
      rzTimer = setTimeout(() => {
        measure();
        kick();
      }, 100);
    };
    window.addEventListener('resize', onResize);

    // Custom Cursor
    let cursorRaf = null;
    const isFineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (cursor && isFineHover) {
      runway.classList.add('rw--cursor');
      const st = { x: 0, y: 0, tx: 0, ty: 0 };
      const loop = () => {
        st.x += (st.tx - st.x) * 0.18;
        st.y += (st.ty - st.y) * 0.18;
        cursor.style.transform = `translate3d(${st.x.toFixed(1)}px,${st.y.toFixed(1)}px,0)`;
        if (Math.abs(st.tx - st.x) + Math.abs(st.ty - st.y) > 0.2) {
          cursorRaf = requestAnimationFrame(loop);
        } else {
          cursorRaf = null;
        }
      };

      const onPointerMove = (e) => {
        if (e.pointerType !== 'mouse') return;
        const r = stage.getBoundingClientRect();
        st.tx = e.clientX - r.left;
        st.ty = e.clientY - r.top;
        cursor.classList.add('is-on');
        const isView = !eng.dragging && !!e.target.closest('.rw__zoom');
        const isLink = !eng.dragging && !isView && !!e.target.closest('.rw__pin, .rw__hit');
        cursor.classList.toggle('is-view', isView);
        cursor.classList.toggle('is-link', isLink);
        if (!cursorRaf) cursorRaf = requestAnimationFrame(loop);
      };

      const onPointerLeave = () => {
        cursor.classList.remove('is-on', 'is-link', 'is-view');
      };

      stage.addEventListener('pointermove', onPointerMove);
      stage.addEventListener('pointerleave', onPointerLeave);
    }

    // Drag / Swipe handling
    const onStagePointerDown = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      eng.drag = {
        x: e.clientX,
        y: e.clientY,
        t: eng.target,
        id: e.pointerId,
        samples: [{ x: e.clientX, time: e.timeStamp }],
      };
    };

    const onStagePointerMove = (e) => {
      const d = eng.drag;
      if (!d || e.pointerId !== d.id) return;
      const dx = e.clientX - d.x;
      const dy = e.clientY - d.y;
      if (!eng.dragging) {
        if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.2) {
          eng.dragging = true;
          runway.classList.add('is-dragging');
          try {
            stage.setPointerCapture(e.pointerId);
          } catch (_) {}
        } else if (Math.abs(dy) > 10) {
          eng.drag = null;
          return;
        } else return;
      }

      d.samples.push({ x: e.clientX, time: e.timeStamp });
      if (d.samples.length > 6) d.samples.shift();
      d.dx = dx;

      eng.target = d.t - dx / eng.unit;
      kick();
    };

    const onStagePointerEnd = (e) => {
      const d = eng.drag;
      if (!d || (e.pointerId !== undefined && e.pointerId !== d.id)) return;
      eng.drag = null;
      if (!eng.dragging) return;

      eng.dragging = false;
      runway.classList.remove('is-dragging');
      eng.suppress = true;
      setTimeout(() => {
        eng.suppress = false;
      }, 60);

      const a = d.samples[0],
        z = d.samples[d.samples.length - 1];
      const vx = z.time > a.time ? (z.x - a.x) / (z.time - a.time) : 0;
      const from = Math.round(d.t);

      if (eng.mobile) {
        if (Math.abs(d.dx || 0) > 30 || Math.abs(vx) > 0.3) {
          const nextIdx = ((from - ((d.dx || vx) > 0 ? 1 : -1) % n) + n) % n;
          changeLook(nextIdx);
        } else {
          changeLook(((from % n) + n) % n);
        }
        return;
      }

      let i = Math.round(eng.target - (vx * 160) / eng.unit);
      if (i === from && Math.abs(vx) > 0.3) i -= vx > 0 ? 1 : -1;
      i = clamp(i, from - 2, from + 2);
      changeLook(((i % n) + n) % n);
    };

    stage.addEventListener('pointerdown', onStagePointerDown);
    stage.addEventListener('pointermove', onStagePointerMove);
    stage.addEventListener('pointerup', onStagePointerEnd);
    stage.addEventListener('pointercancel', onStagePointerEnd);

    // Trackpad horizontal swipe
    let acc = 0,
      lock = 0;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const now = performance.now();
      if (now < lock) return;
      acc += e.deltaX;
      if (Math.abs(acc) > 45) {
        if (acc > 0) nextLook();
        else prevLook();
        acc = 0;
        lock = now + 520;
      }
    };
    stage.addEventListener('wheel', onWheel, { passive: false });

    // Keyboard navigation
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextLook();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevLook();
      }
    };
    stage.addEventListener('keydown', onKeyDown);

    return () => {
      if (eng.raf) {
        cancelAnimationFrame(eng.raf);
        eng.raf = null;
      }
      if (cursorRaf) cancelAnimationFrame(cursorRaf);
      window.removeEventListener('resize', onResize);
      stage.removeEventListener('pointerdown', onStagePointerDown);
      stage.removeEventListener('pointermove', onStagePointerMove);
      stage.removeEventListener('pointerup', onStagePointerEnd);
      stage.removeEventListener('pointercancel', onStagePointerEnd);
      stage.removeEventListener('wheel', onWheel);
      stage.removeEventListener('keydown', onKeyDown);
      if (eng.io) eng.io.disconnect();
      eng.ready = false;
    };
  }, [runwayRef, isMobile, changeLook, nextLook, prevLook, setIsStill]);

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying || isZoomed || isPanelHovered) return;
    const timer = setTimeout(() => {
      nextLook();
    }, 5000);
    return () => clearTimeout(timer);
  }, [isPlaying, isZoomed, isPanelHovered, activeLookIndex, nextLook]);

  // Sweep animation on look change
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.classList.remove('is-sweep');
    void stage.offsetWidth;
    stage.classList.add('is-sweep');
  }, [activeLookIndex]);

  // FLIP animation for Lightbox Zoom
  useEffect(() => {
    const lb = lbRef.current;
    const lbStage = lbStageRef.current;
    const activeHero = heroesRef.current[activeLookIndex];
    if (!lb || !lbStage || !activeHero) return;

    if (isZoomed) {
      // Calculate lb model height to fill container
      const fig = activeHero.querySelector('.rw__figure');
      if (fig) {
        const ar = 0.5625;
        const r = lbStage.getBoundingClientRect();
        const h = Math.max(160, Math.min(r.height || 600, (r.width || 500) / ar));
        const lbModel = lbStage.querySelector('.rw__lb-model');
        if (lbModel) {
          lbModel.style.setProperty('--rw-model-h', Math.round(h) + 'px');
          // FLIP
          const a = fig.getBoundingClientRect();
          const b = lbModel.querySelector('.rw__figure')?.getBoundingClientRect();
          if (a && b && a.height && b.height) {
            const at = `translate3d(${(a.left - b.left).toFixed(1)}px,${(
              a.bottom - b.bottom
            ).toFixed(1)}px,0) scale(${(a.height / b.height).toFixed(4)})`;
            lbModel.style.transformOrigin = '0 100%';
            lbModel.style.transition = 'none';
            lbModel.style.transform = at;
            void lbModel.offsetWidth;
            lbModel.style.transition = '';
            lbModel.style.transform = '';
          }
        }
      }
    }
  }, [isZoomed, activeLookIndex]);

  // Decode images helper
  useEffect(() => {
    const decode = (img) => {
      if (!img) return;
      const reveal = () => img.classList.add('is-decoded');
      if (img.complete && img.naturalWidth) reveal();
      else img.addEventListener('load', reveal, { once: true });
      try {
        img.decode().then(reveal).catch(reveal);
      } catch (_) {
        reveal();
      }
    };

    document.querySelectorAll('img[data-model-image]').forEach(decode);
  });
  const activeLook = LOOKS[activeLookIndex];

  return (
    <div className="rw__left">
      <div className="rw__head">
        <div className="rw__intro">
          <h2 className="rw__title">Try the Look.</h2>
          <p className="rw__sub">Six looks, styled head to toe. Tap a pin to see the piece.</p>
        </div>
        <span className="rw__sr" aria-live="polite" aria-atomic="true" data-rw-live>
          {activeLook.label}
        </span>
      </div>

      <div
        className="rw__stage"
        ref={stageRef}
        data-rw-stage
        tabIndex="0"
        role="region"
        aria-roledescription="carousel"
        aria-label="Try the Look. — use arrow keys or swipe to change look"
      >
        {/* 12 Queue Models in the 3D ring / line */}
        <div className="rw__actors" data-rw-actors>
          {Array.from({ length: 12 }).map((_, a) => {
            const lookIdx = a % 6;
            const lookData = LOOKS[lookIdx];
            return (
              <div
                key={a}
                ref={(el) => (actorsRef.current[a] = el)}
                className="rw__model"
                data-rw-model
                data-index={lookIdx}
                aria-hidden="true"
              >
                <span className="rw__shadow" aria-hidden="true"></span>
                <div className="rw__figure" style={{ '--rw-ar': lookData.ar }}>
                  <div className="rw__art">
                    <img
                      src={lookData.image}
                      srcSet={`${lookData.image} 640w, ${lookData.originalImage} 1080w`}
                      sizes="(min-width: 1800px) 540px, (min-width: 750px) 420px, 320px"
                      loading={a < 6 ? 'eager' : 'lazy'}
                      decoding="async"
                      data-model-image
                      className="is-decoded"
                      alt={lookData.name}
                      width={lookData.width}
                      height={lookData.height}
                      draggable="false"
                      onLoad={(e) => e.currentTarget.classList.add('is-decoded')}
                    />
                    <button
                      type="button"
                      className="rw__hit"
                      data-rw-go={lookIdx}
                      aria-label={`Look ${lookIdx + 1}: ${lookData.name}`}
                      tabIndex="-1"
                      onClick={() => {
                        if (engineRef.current.suppress) return;
                        if (lookIdx === activeLookIndex) {
                          setIsZoomed(true);
                          setEngaged(true);
                        } else {
                          changeLook(lookIdx);
                        }
                      }}
                    ></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 6 Front Heroes with Interactive Hot-Pins */}
        <div className="rw__heroes" data-rw-heroes>
          {LOOKS.map((look, j) => {
            const isActive = j === activeLookIndex;
            const isWas = j === (activeLookIndex === 0 ? 5 : activeLookIndex - 1);

            return (
              <div
                key={look.lookId}
                ref={(el) => (heroesRef.current[j] = el)}
                className={`rw__hero ${isActive ? 'is-on' : ''} ${isWas ? 'was' : ''}`}
                data-rw-hero
                data-index={j}
                data-name={look.name}
                data-label={look.label}
                data-probe={look.probe}
                aria-hidden={!isActive}
              >
                <div className="rw__morph">
                  <span className="rw__shadow" aria-hidden="true"></span>
                  <div className="rw__figure" style={{ '--rw-ar': look.ar }}>
                    <div className="rw__art">
                      <img
                        src={look.image}
                        srcSet={`${look.image} 640w, ${look.originalImage} 1080w`}
                        sizes="(min-width: 1800px) 540px, (min-width: 750px) 420px, 320px"
                        loading="eager"
                        decoding="async"
                        data-model-image
                        className="is-decoded"
                        alt={look.name}
                        width={look.width}
                        height={look.height}
                        draggable="false"
                        onLoad={(e) => e.currentTarget.classList.add('is-decoded')}
                      />
                      <button
                        type="button"
                        className="rw__zoom"
                        data-rw-zoom
                        aria-label={`View look: ${look.name}`}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => {
                          if (engineRef.current.suppress) return;
                          setIsZoomed(true);
                          setEngaged(true);
                        }}
                      ></button>
                      <div className="rw__pins">
                        {look.products.map((p) => {
                          const isHot = hotPin === p.cardId;
                          return (
                            <button
                              key={p.cardId}
                              type="button"
                              className={`rw__pin ${isHot ? 'is-hot' : ''}`}
                              data-rw-pin={p.cardId}
                              data-tip={p.pin.tip}
                              style={{
                                left: p.pin.left,
                                top: p.pin.top,
                                '--pi': p.cardId,
                              }}
                              aria-label={`${p.cardId}: ${p.pin.tip}`}
                              tabIndex={isActive ? 0 : -1}
                              onClick={() => {
                                setEngaged(true);
                                setHotPin(p.cardId);
                                setHotCard(p.cardId);
                              }}
                              onPointerEnter={() => {
                                setHotPin(p.cardId);
                                setHotCard(p.cardId);
                              }}
                              onPointerLeave={() => {
                                setHotPin(null);
                                setHotCard(null);
                              }}
                            >
                              <span className="rw__pin-dot" aria-hidden="true">
                                {p.cardId}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <span className="rw__sweep" aria-hidden="true"></span>

        {/* Custom cursor with inertia */}
        <span className="rw__cursor" ref={cursorRef} data-rw-cursor aria-hidden="true">
          <span className="rw__cursor-in">
            <span className="rw__cursor-label rw__cursor-drag">Drag</span>
            <span className="rw__cursor-label rw__cursor-view">View</span>
          </span>
        </span>

        <span className="rw__walk" aria-hidden="true">
          <span className="rw__walk-line"></span>
        </span>
      </div>

      {/* Carousel Controls */}
      <div className="rw__controls">
        <button
          type="button"
          className="rw__icon"
          data-rw-prev
          aria-label="Previous look"
          onClick={prevLook}
        >
          <svg
            width="26"
            height="14"
            viewBox="0 0 26 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M25 7H1M7 1L1 7l6 6" />
          </svg>
        </button>

        <div className="rw__ticks">
          {LOOKS.map((look, j) => {
            const isCurrent = j === activeLookIndex;
            const isPast = j < activeLookIndex;
            return (
              <button
                key={look.lookId}
                type="button"
                className={`rw__tick ${isCurrent && isPlaying ? 'is-run' : ''} ${
                  isPast ? 'is-past' : ''
                }`}
                data-rw-tick={j}
                aria-current={isCurrent ? 'true' : 'false'}
                aria-label={look.label}
                onClick={() => changeLook(j)}
              >
                <span className="rw__tick-bar" aria-hidden="true"></span>
                <span className="rw__tick-label" aria-hidden="true">
                  {look.tickNum}
                  <span className="rw__tick-name">&nbsp;&nbsp;{look.name}</span>
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="rw__icon rw__auto"
          data-rw-auto
          aria-pressed={isPlaying ? 'true' : 'false'}
          aria-label={isPlaying ? 'Pause Runway' : 'Auto-run Runway'}
          title={isPlaying ? 'Pause Autoplay' : 'Play Autoplay'}
          onClick={() => {
            setIsPlaying((prev) => !prev);
            setEngaged(false);
            setIsPanelHovered(false);
          }}
        >
          <svg
            className="rw__i-play"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M7 4.5v15l12.5-7.5z" />
          </svg>
          <svg
            className="rw__i-pause"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M6.5 4.5h3.5v15H6.5zM14 4.5h3.5v15H14z" />
          </svg>
        </button>

        <button
          type="button"
          className="rw__icon"
          data-rw-next
          aria-label="Next look"
          onClick={nextLook}
        >
          <svg
            width="26"
            height="14"
            viewBox="0 0 26 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M1 7h24M19 1l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Lightbox / Zoom Dialog */}
      <div
        className="rw__lb"
        ref={lbRef}
        data-rw-lb
        data-word="Look"
        role="region"
        aria-label="View look"
        aria-hidden={!isZoomed}
        onClick={(e) => {
          if (e.target === e.currentTarget || e.target === lbStageRef.current) {
            setIsZoomed(false);
          }
        }}
      >
        <div className="rw__lb-stage" ref={lbStageRef} data-rw-lb-stage>
          {isZoomed && (
            <div className="rw__lb-model">
              <span className="rw__shadow" aria-hidden="true"></span>
              <div className="rw__figure" style={{ '--rw-ar': activeLook.ar }}>
                <div className="rw__art">
                  <img
                    src={activeLook.image}
                    srcSet={`${activeLook.image} 640w, ${activeLook.originalImage} 1080w`}
                    sizes="600px"
                    loading="eager"
                    decoding="async"
                    alt={activeLook.name}
                    width={activeLook.width}
                    height={activeLook.height}
                    draggable="false"
                  />
                  <div className="rw__pins">
                    {activeLook.products.map((p) => {
                      const isHot = hotPin === p.cardId;
                      return (
                        <button
                          key={p.cardId}
                          type="button"
                          className={`rw__pin ${isHot ? 'is-hot' : ''}`}
                          data-rw-pin={p.cardId}
                          data-tip={p.pin.tip}
                          style={{
                            left: p.pin.left,
                            top: p.pin.top,
                            '--pi': p.cardId,
                          }}
                          aria-label={`${p.cardId}: ${p.pin.tip}`}
                          tabIndex="0"
                          onClick={() => {
                            setHotPin(p.cardId);
                            setHotCard(p.cardId);
                          }}
                        >
                          <span className="rw__pin-dot" aria-hidden="true">
                            {p.cardId}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="rw__lb-top">
          <p className="rw__lb-cap">
            <span className="rw__lb-kicker" data-rw-lb-kicker>
              {`Look 0${activeLookIndex + 1}`}
            </span>
            <span className="rw__lb-name" data-rw-lb-name>
              {activeLook.name}
            </span>
          </p>
          <button
            type="button"
            className="rw__lb-close"
            data-rw-zoom-close
            aria-label="Close"
            onClick={() => setIsZoomed(false)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>
        <p className="rw__lb-hint">Tap a dot to shop the piece</p>
      </div>
    </div>
  );
};
