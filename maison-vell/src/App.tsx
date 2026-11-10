import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import {
  LOOKS,
  Y0,
  Y1,
  ITEMS,
  KX,
  KF,
  KH,
  KB,
  KO,
  MODELS_IMAGE,
  PIECES_IMAGE,
} from './data/runwayData.ts';
import { CATALOG_PRODUCTS, CatalogProduct } from './data/catalogData.ts';
import { Header } from './components/Header.tsx';
import { Stage } from './components/Stage.tsx';
import { Rail } from './components/Rail.tsx';
import { EditorialSection } from './components/EditorialSection.tsx';
import { CatalogSection } from './components/CatalogSection.tsx';
import { LookbookSection } from './components/LookbookSection.tsx';
import { CraftsmanshipSection } from './components/CraftsmanshipSection.tsx';
import { Footer } from './components/Footer.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { CartDrawer, CartItem } from './components/CartDrawer.tsx';
import { WishlistDrawer } from './components/WishlistDrawer.tsx';
import { QuickViewModal } from './components/QuickViewModal.tsx';

const N = LOOKS.length;
const wrap = (x: number, n: number) => ((x % n) + n) % n;
const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

export default function App() {
  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'coat-cocoon',
      name: 'Cashmere Cocoon Coat',
      price: '$3,400',
      priceNumber: 3400,
      image: '/products/coat-cocoon.jpg',
      quantity: 1,
      size: 'IT 38',
      color: 'Powder Blue',
    },
  ]);
  const [savedItemIds, setSavedItemIds] = useState<Set<string>>(
    new Set(['dress-pleated', 'bag-sculpted', 'belt-gold'])
  );
  const [railFavs, setRailFavs] = useState<Record<number, boolean>>({});

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<CatalogProduct | null>(null);

  const [loaded, setLoaded] = useState(false);

  // Runway stage refs
  const stageRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLElement | null>(null);
  const rollRef = useRef<HTMLSpanElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const modelRefs = useRef<(HTMLElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const filtersRef = useRef<string[]>([]);
  const opacitiesRef = useRef<string[]>([]);

  const pRef = useRef(0);
  const targetRef = useRef(0);
  const lastRef = useRef(0);
  const dirtyRef = useRef(true);

  const mxRef = useRef(0);
  const myRef = useRef(0);
  const cxRef = useRef(0);
  const cyRef = useRef(0);

  const downRef = useRef(false);
  const sxRef = useRef(0);
  const stRef = useRef(0);
  const movedRef = useRef(0);
  const wheelTRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cart operations
  const cartCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  const handleAddToCart = useCallback(
    (product: CatalogProduct, size?: string, color?: string) => {
      setCartItems((prev) => {
        const existingIndex = prev.findIndex(
          (item) =>
            item.id === product.id &&
            (!size || item.size === size) &&
            (!color || item.color === color)
        );
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex].quantity += 1;
          return updated;
        }
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            priceNumber: product.priceNumber,
            image: product.image,
            quantity: 1,
            size: size || (product.sizes ? product.sizes[0] : undefined),
            color: color || (product.colors ? product.colors[0] : undefined),
          },
        ];
      });
      setIsCartOpen(true);
    },
    []
  );

  const handleAddMultipleToCart = useCallback((products: CatalogProduct[]) => {
    products.forEach((p) => {
      setCartItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === p.id);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex].quantity += 1;
          return updated;
        }
        return [
          ...prev,
          {
            id: p.id,
            name: p.name,
            price: p.price,
            priceNumber: p.priceNumber,
            image: p.image,
            quantity: 1,
            size: p.sizes ? p.sizes[0] : undefined,
            color: p.colors ? p.colors[0] : undefined,
          },
        ];
      });
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateCartQty = useCallback((id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  }, []);

  const handleRemoveCartItem = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleCheckout = useCallback(() => {
    alert(
      'Maison Vell Concierge: Proceeding to Encrypted Private Checkout with Complimentary White Glove Shipping.'
    );
  }, []);

  // Wishlist operations
  const handleToggleSaved = useCallback((product: CatalogProduct) => {
    setSavedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
      } else {
        next.add(product.id);
      }
      return next;
    });
  }, []);

  const handleRemoveSaved = useCallback((id: string) => {
    setSavedItemIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const savedProductsList = useMemo(
    () => CATALOG_PRODUCTS.filter((p) => savedItemIds.has(p.id)),
    [savedItemIds]
  );

  // Rail handlers
  const handleToggleRailFav = useCallback((index: number) => {
    setRailFavs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    const railItem = ITEMS[index];
    if (railItem) {
      const matched = CATALOG_PRODUCTS.find((p) =>
        p.name.toLowerCase().includes(railItem.name.toLowerCase())
      );
      if (matched) {
        handleToggleSaved(matched);
      }
    }
  }, [handleToggleSaved]);

  const handleAddRailToCart = useCallback(() => {
    const defaultProduct = CATALOG_PRODUCTS[0];
    handleAddToCart(defaultProduct);
  }, [handleAddToCart]);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Runway Stage Physics Loop
  useEffect(() => {
    const stage = stageRef.current;
    const rail = railRef.current;
    if (!stage) return;

    const PULL = () => Math.max(150, stage.clientWidth * 0.2);

    const size = () => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const base = H * 1.2;
      const side = window.innerWidth <= 820;

      modelRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = (LOOKS[i][1] - LOOKS[i][0]) / (Y1 - Y0);
        el.style.width = `${base * r}px`;
        el.style.height = `${base}px`;
      });

      const cardS = side ? 160 : (rail?.clientHeight || 0) / 3;
      cardRefs.current.forEach((c) => {
        if (c) c.style.height = side ? '100%' : `${cardS}px`;
      });

      if (rollRef.current?.firstElementChild) {
        const h = rollRef.current.firstElementChild.getBoundingClientRect().height;
        rollRef.current.style.setProperty('--h', `${h}`);
      }
      dirtyRef.current = true;
    };

    const paint = () => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const base = H * 1.2;
      const side = window.innerWidth <= 820;
      const p = pRef.current;

      modelRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = (LOOKS[i][1] - LOOKS[i][0]) / (Y1 - Y0);
        let d = wrap(i - p, N);
        if (d > N - 1) d -= N;
        const k = clamp(d + 1, 0, 6);
        const a = Math.floor(k);
        const b = Math.min(6, a + 1);
        const t = k - a;
        const mix = (A: number[]) => A[a] + (A[b] - A[a]) * t;
        const h = mix(KH) * H;
        const s = h / (base || 1);
        const w = h * r;
        const x = mix(KX) * W - w / 2;
        const y = mix(KF) * H - h;
        el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${s.toFixed(4)})`;

        const f = mix(KB) / s;
        const fs = f < 0.2 ? 'none' : `blur(${f.toFixed(1)}px)`;
        const o = mix(KO).toFixed(3);

        if (fs !== filtersRef.current[i]) {
          filtersRef.current[i] = fs;
          el.style.filter = fs;
        }
        if (o !== opacitiesRef.current[i]) {
          opacitiesRef.current[i] = o;
          el.style.opacity = o;
        }
        el.style.zIndex = `${100 - Math.round(d * 10)}`;
      });

      const cardS = side ? 160 : (rail?.clientHeight || 0) / 3;
      const all = cardS * ITEMS.length;
      cardRefs.current.forEach((c, i) => {
        if (!c) return;
        let y = wrap(i * cardS - p * 2 * cardS, all);
        if (y > all - cardS) y -= all;
        c.style.transform = side
          ? `translate3d(${y.toFixed(1)}px,0,0)`
          : `translate3d(0,${y.toFixed(1)}px,0)`;
      });

      const rollEl = rollRef.current;
      if (rollEl) {
        const firstChild = rollEl.firstElementChild as HTMLElement | null;
        const rollH = firstChild ? firstChild.offsetHeight : 38;
        rollEl.style.transform = `translate3d(0,${(-wrap(p, N) * rollH).toFixed(1)}px,0)`;
      }
    };

    const calm = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    const frame = (now: number) => {
      const dt = Math.min(50, now - lastRef.current) || 16;
      lastRef.current = now;
      const was = pRef.current;
      if (calm) {
        pRef.current = targetRef.current;
      } else {
        pRef.current += (targetRef.current - pRef.current) * (1 - Math.exp(-dt * 0.0072));
      }
      if (Math.abs(targetRef.current - pRef.current) < 0.0004) {
        pRef.current = targetRef.current;
      }
      if (pRef.current !== was || dirtyRef.current) {
        dirtyRef.current = false;
        paint();
      }
      cxRef.current += (mxRef.current - cxRef.current) * 0.32;
      cyRef.current += (myRef.current - cyRef.current) * 0.32;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${cxRef.current.toFixed(1)}px,${cyRef.current.toFixed(1)}px,0)`;
      }
    };

    let animId: number;
    const loop = (t: number) => {
      frame(t);
      animId = requestAnimationFrame(loop);
    };

    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && ringRef.current) {
        ringRef.current.classList.add('show');
      }
    };

    const onPointerLeave = () => {
      if (ringRef.current) {
        ringRef.current.classList.remove('show');
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      mxRef.current = e.clientX - r.left;
      myRef.current = e.clientY - r.top;
      if (!downRef.current) return;
      const dx = e.clientX - sxRef.current;
      movedRef.current = Math.max(movedRef.current, Math.abs(dx));
      targetRef.current = stRef.current + dx / PULL();
    };

    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) return;
      downRef.current = true;
      sxRef.current = e.clientX;
      stRef.current = targetRef.current;
      movedRef.current = 0;
      stage.setPointerCapture(e.pointerId);
      if (ringRef.current) {
        ringRef.current.classList.add('drag');
      }
    };

    const release = (e: PointerEvent) => {
      if (!downRef.current) return;
      downRef.current = false;
      if (ringRef.current) {
        ringRef.current.classList.remove('drag');
      }
      if (movedRef.current < 6) {
        const hit = document
          .elementsFromPoint(e.clientX, e.clientY)
          .find((x) => x.classList && x.classList.contains('m')) as HTMLElement | undefined;
        if (hit && hit.dataset.i !== undefined) {
          let d = wrap(+hit.dataset.i - targetRef.current, N);
          d = Math.round(d);
          if (d > 0 && d < N) {
            targetRef.current = Math.round(targetRef.current) + d;
          }
        }
      } else {
        targetRef.current = Math.round(targetRef.current);
      }
    };

    const onWheel = (e: WheelEvent) => {
      // If horizontal scroll or shiftKey, rotate runway
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault();
        targetRef.current += clamp(e.deltaX, -120, 120) / 420;
        if (wheelTRef.current) clearTimeout(wheelTRef.current);
        wheelTRef.current = setTimeout(() => {
          targetRef.current = Math.round(targetRef.current);
        }, 150);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown'].includes(e.key) && window.scrollY < 200) {
        targetRef.current = Math.round(targetRef.current) + 1;
      }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key) && window.scrollY < 200) {
        targetRef.current = Math.round(targetRef.current) - 1;
      }
    };

    const onResize = () => {
      size();
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);

    stage.addEventListener('pointerenter', onPointerEnter);
    stage.addEventListener('pointerleave', onPointerLeave);
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('pointerup', release);
    stage.addEventListener('pointercancel', release);
    stage.addEventListener('wheel', onWheel, { passive: false });

    // Initial layout
    size();
    paint();
    animId = requestAnimationFrame(loop);

    // Preload assets & wait for fonts
    Promise.all(
      [MODELS_IMAGE, PIECES_IMAGE].map((u) => {
        const img = new Image();
        img.src = u;
        return img.decode().catch(() => {});
      })
    )
      .then(() => document.fonts?.ready || Promise.resolve())
      .then(() => {
        size();
        paint();
        setLoaded(true);
      });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
      stage.removeEventListener('pointerenter', onPointerEnter);
      stage.removeEventListener('pointerleave', onPointerLeave);
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerdown', onPointerDown);
      stage.removeEventListener('pointerup', release);
      stage.removeEventListener('pointercancel', release);
      stage.removeEventListener('wheel', onWheel);
      if (wheelTRef.current) clearTimeout(wheelTRef.current);
    };
  }, []);

  return (
    <div className="maison-app">
      {/* Flagship Hero 3D Runway Section */}
      <div className="hero-viewport" id="runway">
        <Header
          cartCount={cartCount}
          wishlistCount={savedItemIds.size}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
        <main className="hero-main">
          <Stage
            stageRef={stageRef}
            modelRefs={modelRefs}
            rollRef={rollRef}
            ringRef={ringRef}
            onShopLookClick={() => {
              document.querySelector('#lookbook')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <Rail
            railRef={railRef}
            cardRefs={cardRefs}
            savedItems={railFavs}
            onToggleFav={handleToggleRailFav}
            onAddToCart={handleAddRailToCart}
          />
        </main>
      </div>

      {/* Extended Luxury Sections */}
      <EditorialSection />

      <CatalogSection
        onQuickView={(p) => setQuickViewProduct(p)}
        onAddToCart={(p) => handleAddToCart(p)}
        savedItemIds={savedItemIds}
        onToggleSaved={handleToggleSaved}
      />

      <LookbookSection
        onQuickView={(p) => setQuickViewProduct(p)}
        onAddToCart={(p) => handleAddToCart(p)}
        onAddMultipleToCart={handleAddMultipleToCart}
      />

      <CraftsmanshipSection />

      <Footer />

      {/* Interactive Drawers & Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedProducts={savedProductsList}
        onRemoveFromWishlist={handleRemoveSaved}
        onMoveToCart={(p) => {
          handleAddToCart(p);
          handleRemoveSaved(p.id);
        }}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, size, color) => handleAddToCart(p, size, color)}
        isSaved={quickViewProduct ? savedItemIds.has(quickViewProduct.id) : false}
        onToggleSaved={handleToggleSaved}
      />

      {/* Initial Preload Curtain */}
      <div className={`wait ${loaded ? 'gone' : ''}`} id="wait" />
    </div>
  );
}
