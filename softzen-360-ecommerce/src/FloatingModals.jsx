import React, { useState, useEffect, useRef, useCallback } from 'react';

// Dedicated, high-performance 360 interactive turntable canvas
function Modern360Turntable({
  productId,
  angle,
  onAngleChange,
  isAutoSpin,
  onUserInteraction,
}) {
  const canvasRef = useRef(null);
  const imagesCacheRef = useRef(new Map());
  const [loadedCount, setLoadedCount] = useState(0);

  // Preload all 36 frames for this product
  useEffect(() => {
    let isCancelled = false;
    const cache = imagesCacheRef.current;

    for (let i = 0; i < 36; i++) {
      const frameStr = String(i).padStart(2, '0');
      const url = `/garments/${productId}/t/${frameStr}.webp?v=p1`;

      if (!cache.has(url)) {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          if (!isCancelled) {
            cache.set(url, img);
            setLoadedCount((c) => c + 1);
          }
        };
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [productId]);

  // Render the current frame on canvas with Retina scaling and zoom
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Normalizing angle to 0 - 360
    const normalizedAngle = ((angle % 360) + 360) % 360;
    // 36 frames total: 10 degrees per frame
    const frameIndex = Math.round(normalizedAngle / 10) % 36;
    const frameStr = String(frameIndex).padStart(2, '0');
    const url = `/garments/${productId}/t/${frameStr}.webp?v=p1`;

    const img = imagesCacheRef.current.get(url);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Match internal pixel resolution to client dimensions * DPR
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);

    if (w && h && (canvas.width !== w || canvas.height !== h)) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (img && img.complete && img.naturalWidth > 0) {
      // Scale by 1.42x so the garment fills the container nicely without excess padding
      const zoom = 1.42;
      const drawW = canvas.width * zoom;
      const drawH = canvas.height * zoom;
      const drawX = (canvas.width - drawW) / 2;
      const drawY = (canvas.height - drawH) / 2 - 12 * dpr;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }
  }, [angle, productId]);

  useEffect(() => {
    renderFrame();
  }, [renderFrame, loadedCount]);

  // Pointer drag interactions
  const dragRef = useRef(null);

  const handlePointerDown = (e) => {
    dragRef.current = { x: e.clientX, a: angle };
    onUserInteraction(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (dragRef.current) {
      const delta = e.clientX - dragRef.current.x;
      // Sensitivity: ~360 degrees rotation over 400px drag
      const newAngle = dragRef.current.a + (delta * 360) / 400;
      onAngleChange(newAngle);
    }
  };

  const handlePointerUp = (e) => {
    dragRef.current = null;
    onUserInteraction(false);
  };

  return (
    <div
      className="floating-p-canvas-wrap"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: 'none' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '440px',
          maxHeight: '480px',
          display: 'block',
        }}
      />
    </div>
  );
}

export function FloatingProductModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  garmentImgUrl,
  formatPrice,
}) {
  const [selectedView, setSelectedView] = useState('360');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'M');
  const [sizeError, setSizeError] = useState(false);
  const [qty, setQty] = useState(1);

  const [angle, setAngle] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const idleTimerRef = useRef(null);

  // Auto-spin on idle
  useEffect(() => {
    if (selectedView !== '360' || !isAutoSpin) return;
    let animId = 0;
    const spinLoop = () => {
      setAngle((prev) => prev + 0.38);
      animId = requestAnimationFrame(spinLoop);
    };
    animId = requestAnimationFrame(spinLoop);
    return () => cancelAnimationFrame(animId);
  }, [selectedView, isAutoSpin]);

  const handleUserInteraction = (isDragging) => {
    if (isDragging) {
      setIsAutoSpin(false);
      clearTimeout(idleTimerRef.current);
    } else {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsAutoSpin(true);
      }, 3500);
    }
  };

  // Escape key to close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!product) return null;

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 800);
      return;
    }
    onAddToCart(product.id, selectedSize, qty);
  };

  const handleBuy = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 800);
      return;
    }
    onBuyNow(product.id, selectedSize, qty);
  };

  const currentPriceFormatted = formatPrice(product.price * qty);

  return (
    <div className="floating-overlay-backdrop" onClick={onClose}>
      <div
        className="floating-modal-card floating-product-grid"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={product.title}
      >
        {/* Sleek Close Button */}
        <button
          className="floating-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* LEFT COLUMN: 360 Viewer / Visual */}
        <div className="floating-p-visual">
          {selectedView === '360' ? (
            <Modern360Turntable
              productId={product.id}
              angle={angle}
              onAngleChange={setAngle}
              isAutoSpin={isAutoSpin}
              onUserInteraction={handleUserInteraction}
            />
          ) : selectedView === 'front' ? (
            <div className="floating-p-canvas-wrap">
              <img
                src={garmentImgUrl(product.id, 'front')}
                alt={`${product.title} front`}
                className="floating-p-img"
              />
            </div>
          ) : (
            <div className="floating-p-canvas-wrap">
              <img
                src={garmentImgUrl(product.id, 'back')}
                alt={`${product.title} back`}
                className="floating-p-img"
              />
            </div>
          )}

          {/* View Switcher Tabs */}
          <div className="floating-view-tabs">
            <button
              className={`floating-view-btn ${selectedView === 'front' ? 'active' : ''}`}
              onClick={() => setSelectedView('front')}
            >
              Front
            </button>
            <button
              className={`floating-view-btn ${selectedView === 'back' ? 'active' : ''}`}
              onClick={() => setSelectedView('back')}
            >
              Back
            </button>
            <button
              className={`floating-view-btn ${selectedView === '360' ? 'active' : ''}`}
              onClick={() => setSelectedView('360')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
              </svg>
              360° Rotate
            </button>
          </div>

          {selectedView === '360' && (
            <div className="floating-spin-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
              Drag mouse / swipe to spin 360°
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Product Details */}
        <div className="floating-p-info">
          <div className="floating-p-brand">
            ORVA · {product.categoryLabel || product.category}
          </div>

          <h2 className="floating-p-title">{product.title || product.name}</h2>

          <div className="floating-p-price">
            {formatPrice(product.price)}
          </div>

          <p className="floating-p-desc">{product.description}</p>

          {/* Feature Checkmark Card */}
          <div className="floating-feature-box">
            <div className="floating-feature-line">
              <span className="floating-chk-icon">✓</span>
              <span>Authentic ORVA design and craftsmanship</span>
            </div>
            <div className="floating-feature-line">
              <span className="floating-chk-icon">✓</span>
              <span>Premium breathable fabric and reinforced stitching</span>
            </div>
            <div className="floating-feature-line">
              <span className="floating-chk-icon">✓</span>
              <span>Free standard shipping on orders over €80</span>
            </div>
            <div className="floating-feature-line">
              <span className="floating-chk-icon">✓</span>
              <span>30-day hassle-free return guarantee</span>
            </div>
          </div>

          {/* Size Selection */}
          <div className="floating-size-header">
            <span className="floating-size-title">Select Size:</span>
          </div>

          <div className="floating-size-list">
            {(product.sizes || ['XS', 'S', 'M', 'L', 'XL']).map((sz) => (
              <button
                key={sz}
                type="button"
                className={`floating-size-circle ${selectedSize === sz ? 'active' : ''} ${sizeError ? 'has-error' : ''}`}
                onClick={() => setSelectedSize(sz)}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Action Buttons: Add to Bag + Wishlist Heart Button */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              className="floating-btn-add"
              style={{ flex: 1 }}
              onClick={handleAdd}
            >
              Add to Bag • {currentPriceFormatted}
            </button>
            {onToggleWishlist && (
              <button
                type="button"
                className={`floating-wishlist-toggle ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist(product.id)}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? "#ff3b30" : "none"} stroke={isWishlisted ? "#ff3b30" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            )}
          </div>

          <button
            type="button"
            className="floating-btn-buy"
            onClick={handleBuy}
          >
            Buy Now (Instant Checkout)
          </button>
        </div>
      </div>
    </div>
  );
}

export function FloatingCartModal({
  lines,
  subtotal,
  discount,
  promo,
  onApplyPromo,
  onUpdateQty,
  onRemove,
  onClose,
  onCheckout,
  garmentImgUrl,
  formatPrice,
  freeShippingOver,
}) {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  const total = Math.max(0, subtotal - discount);
  const remainingForFreeShip = freeShippingOver - total;
  const freeShipPercent = Math.min(100, Math.round((total / freeShippingOver) * 100));

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = onApplyPromo(promoInput.trim());
    if (ok) {
      setPromoMessage('Promo code applied successfully!');
    } else {
      setPromoMessage('Invalid promo code. Try "ORVA10"');
    }
  };

  return (
    <div className="floating-overlay-backdrop" onClick={onClose}>
      <div
        className="floating-modal-card floating-cart-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Your Bag"
      >
        <button
          className="floating-modal-close"
          onClick={onClose}
          aria-label="Close cart"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="floating-cart-head">
          <h2>Your Bag ({lines.reduce((acc, l) => acc + l.qty, 0)})</h2>
        </div>

        {/* Free Shipping Progress */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>
            {remainingForFreeShip <= 0 ? (
              <span style={{ color: '#1e9e5a' }}>✓ You have unlocked free standard shipping!</span>
            ) : (
              <span>Add <b>{formatPrice(remainingForFreeShip)}</b> more for <b>Free Shipping</b></span>
            )}
          </div>
          <div className="floating-free-ship-bar">
            <div className="floating-free-ship-fill" style={{ width: `${freeShipPercent}%` }}></div>
          </div>
        </div>

        {/* Items List */}
        <div className="floating-cart-items">
          {lines.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#777' }}>
              <p style={{ fontSize: 16, marginBottom: 16 }}>Your bag is currently empty.</p>
              <button
                className="floating-btn-buy"
                style={{ width: 'auto', padding: '0 24px', margin: '0 auto' }}
                onClick={onClose}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            lines.map((item) => (
              <div key={`${item.id}-${item.size}`} className="floating-cart-item">
                <img
                  src={garmentImgUrl(item.id, 'card')}
                  alt={item.title || item.name}
                  className="floating-cart-item-img"
                />

                <div className="floating-cart-item-info">
                  <h4>{item.title || item.name}</h4>
                  <div className="floating-cart-item-meta">
                    Size: <b>{item.size}</b> · {formatPrice(item.price)}
                  </div>
                  <div className="floating-qty-ctrl">
                    <button
                      className="floating-qty-btn"
                      onClick={() => onUpdateQty(item.id, item.size, item.qty - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="floating-qty-val">{item.qty}</span>
                    <button
                      className="floating-qty-btn"
                      onClick={() => onUpdateQty(item.id, item.size, item.qty + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>
                    {formatPrice(item.price * item.qty)}
                  </div>
                  <button
                    onClick={() => onRemove(item.id, item.size)}
                    style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: 12 }}
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <div className="floating-cart-foot">
            <div className="floating-cart-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            {discount > 0 && (
              <div className="floating-cart-row" style={{ color: '#1e9e5a' }}>
                <span>Discount</span>
                <span>−{formatPrice(discount)}</span>
              </div>
            )}

            <div className="floating-cart-row total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <button
              type="button"
              className="floating-btn-add"
              onClick={onCheckout}
            >
              Proceed to Instant Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function FloatingCheckoutModal({
  lines,
  subtotal,
  discount,
  onClearCart,
  onClose,
  garmentImgUrl,
  formatPrice,
  country,
}) {
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const [form, setForm] = useState({
    email: 'tanbir.hasan@example.com',
    first: 'Tanbir',
    last: 'Hasan',
    address: 'Avenida da Liberdade 120',
    city: 'Lisboa',
    zip: '1250-142',
    country: country || 'Portugal',
    card: '4242 4242 4242 4242',
    exp: '12/28',
    cvc: '123',
  });

  const shippingCost = shippingMethod === 'express' ? 8 : (subtotal >= 80 ? 0 : 5);
  const total = Math.max(0, subtotal - discount) + shippingCost;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, isSubmitting]);

  const fillDemo = () => {
    setForm({
      email: 'alex.buyer@gmail.com',
      first: 'Alex',
      last: 'Santos',
      address: 'Rua Garrett 44',
      city: 'Lisboa',
      zip: '1200-204',
      country: country || 'Portugal',
      card: '4242 8888 9999 1234',
      exp: '08/29',
      cvc: '789',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const orderNo = 'ORV-' + Math.floor(100000 + Math.random() * 900000);
      setOrderConfirmed({
        orderNo,
        itemsCount: lines.reduce((acc, l) => acc + l.qty, 0),
        total,
        email: form.email,
        address: `${form.address}, ${form.city}`,
      });
      onClearCart();
    }, 1200);
  };

  return (
    <div className="floating-overlay-backdrop" onClick={!isSubmitting ? onClose : undefined}>
      <div
        className="floating-modal-card floating-checkout-grid"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Instant Checkout"
      >
        <button
          className="floating-modal-close"
          onClick={onClose}
          aria-label="Close checkout"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {orderConfirmed ? (
          <div className="floating-confirm-success" style={{ gridColumn: '1 / -1', margin: 'auto' }}>
            <div className="floating-success-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Order Confirmed!</h2>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 20 }}>
              Thank you, <b>{form.first}</b>! Your order <b>#{orderConfirmed.orderNo}</b> has been received.
            </p>
            <div style={{ background: '#f8f8f5', padding: '16px 24px', borderRadius: 14, width: '100%', maxWidth: 420, marginBottom: 24, fontSize: 13.5, color: '#444' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span>Confirmation sent to:</span>
                <b>{orderConfirmed.email}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span>Delivery address:</span>
                <b>{orderConfirmed.address}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total amount:</span>
                <b>{formatPrice(orderConfirmed.total)}</b>
              </div>
            </div>
            <button
              type="button"
              className="floating-btn-add"
              style={{ width: 'auto', padding: '0 32px' }}
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* LEFT: Checkout Form */}
            <div className="floating-ch-form">
              <h2>Instant Checkout</h2>

              <button
                type="button"
                className="floating-demo-fill-btn"
                onClick={fillDemo}
              >
                ⚡ Auto-fill Demo Info
              </button>

              <form onSubmit={handleSubmit}>
                <div className="floating-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="floating-form-row">
                  <div className="floating-form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      required
                      value={form.first}
                      onChange={(e) => setForm({ ...form, first: e.target.value })}
                    />
                  </div>
                  <div className="floating-form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      required
                      value={form.last}
                      onChange={(e) => setForm({ ...form, last: e.target.value })}
                    />
                  </div>
                </div>

                <div className="floating-form-group">
                  <label>Shipping Address</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </div>

                <div className="floating-form-row">
                  <div className="floating-form-group">
                    <label>City</label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                    />
                  </div>
                  <div className="floating-form-group">
                    <label>Postal Code</label>
                    <input
                      type="text"
                      required
                      value={form.zip}
                      onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    />
                  </div>
                </div>

                <div className="floating-form-group">
                  <label>Payment Card (Demo)</label>
                  <input
                    type="text"
                    required
                    value={form.card}
                    onChange={(e) => setForm({ ...form, card: e.target.value })}
                    placeholder="4242 •••• •••• ••••"
                  />
                </div>

                <div className="floating-form-row">
                  <div className="floating-form-group">
                    <label>Expires</label>
                    <input
                      type="text"
                      required
                      value={form.exp}
                      onChange={(e) => setForm({ ...form, exp: e.target.value })}
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="floating-form-group">
                    <label>CVC</label>
                    <input
                      type="text"
                      required
                      value={form.cvc}
                      onChange={(e) => setForm({ ...form, cvc: e.target.value })}
                      placeholder="CVC"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="floating-btn-add"
                  disabled={isSubmitting}
                  style={{ marginTop: 12 }}
                >
                  {isSubmitting ? 'Securing your order...' : `Pay ${formatPrice(total)} & Place Order`}
                </button>
              </form>
            </div>

            {/* RIGHT: Order Summary */}
            <div className="floating-ch-summary">
              <h3>Order Summary ({lines.reduce((acc, l) => acc + l.qty, 0)})</h3>

              <div style={{ maxHeight: 220, overflowY: 'auto', marginBottom: 16 }}>
                {lines.map((l) => (
                  <div key={`${l.id}-${l.size}`} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                    <img
                      src={garmentImgUrl(l.id, 'card')}
                      alt=""
                      style={{ width: 44, height: 52, borderRadius: 8, background: '#fff', objectFit: 'contain' }}
                    />
                    <div style={{ flex: 1, fontSize: 13 }}>
                      <div style={{ fontWeight: 600 }}>{l.title || l.name}</div>
                      <div style={{ color: '#777', fontSize: 12 }}>Size: {l.size} × {l.qty}</div>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>
                      {formatPrice(l.price * l.qty)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #e8e8e2', paddingTop: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, color: '#555', marginBottom: 8 }}>
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, color: '#555', marginBottom: 8 }}>
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, color: '#1e9e5a', marginBottom: 8 }}>
                    <span>Discount</span>
                    <span>−{formatPrice(discount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800, color: '#111', marginTop: 12 }}>
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// 4. FLOATING WISHLIST MODAL
export function FloatingWishlistModal({
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onOpenProduct,
  onClose,
  getProduct,
  garmentImgUrl,
  formatPrice,
}) {
  const products = (wishlistIds || []).map(getProduct).filter(Boolean);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="floating-overlay-backdrop" onClick={onClose}>
      <div
        className="floating-modal-card floating-wishlist-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Your Wishlist"
      >
        <button
          className="floating-modal-close"
          onClick={onClose}
          aria-label="Close wishlist"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="floating-cart-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#ff3b30" stroke="#ff3b30" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <h2>Saved Wishlist ({products.length})</h2>
          </div>
        </div>

        <div className="floating-cart-items">
          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: '#777' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#fff0f0', color: '#ff3b30', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 6 }}>Your wishlist is empty</h3>
              <p style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>Tap the heart on any product to save your favorites here.</p>
              <button
                type="button"
                className="floating-btn-buy"
                style={{ width: 'auto', padding: '0 28px', margin: '0 auto' }}
                onClick={onClose}
              >
                Browse Products
              </button>
            </div>
          ) : (
            products.map((item) => (
              <div key={item.id} className="floating-cart-item">
                <img
                  src={garmentImgUrl(item.id, 'card')}
                  alt={item.title || item.name}
                  className="floating-cart-item-img"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    onClose();
                    onOpenProduct(item.id);
                  }}
                />

                <div className="floating-cart-item-info">
                  <h4
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      onClose();
                      onOpenProduct(item.id);
                    }}
                  >
                    {item.title || item.name}
                  </h4>
                  <div className="floating-cart-item-meta">
                    {item.categoryLabel || item.category} · {item.colorName}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14.5, color: '#111' }}>
                    {formatPrice(item.price)}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                  <button
                    type="button"
                    className="floating-btn-add"
                    style={{ height: 36, padding: '0 16px', fontSize: 13, borderRadius: 18, width: 'auto' }}
                    onClick={() => {
                      onAddToCart(item.id, item.sizes?.[0] || 'M', 1);
                    }}
                  >
                    Add to Bag
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(item.id)}
                    style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: 12 }}
                    aria-label="Remove from wishlist"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {products.length > 0 && (
          <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid #eeeee9', display: 'flex', gap: 12 }}>
            <button
              type="button"
              className="floating-btn-add"
              style={{ flex: 1 }}
              onClick={() => {
                products.forEach((p) => onAddToCart(p.id, p.sizes?.[0] || 'M', 1));
                onClose();
              }}
            >
              Add All to Bag ({products.length})
            </button>
            <button
              type="button"
              className="floating-btn-buy"
              style={{ width: 'auto', padding: '0 20px', marginTop: 0 }}
              onClick={onClose}
            >
              Keep Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
