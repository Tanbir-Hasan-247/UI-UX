import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { PRODUCTS, LOOKS, findProductVariant } from '../data/runwayCatalog.js';
import { playSound, startAmbientRunway, stopAmbientRunway } from '../utils/audio.js';

const STORAGE_KEY = 'runway-styling-bag-v3';
const ORDERS_STORAGE_KEY = 'runway-orders-history-v1';
const WISHLIST_STORAGE_KEY = 'runway-wishlist-v1';
const CURRENCY_STORAGE_KEY = 'runway-currency-v1';
const MOOD_STORAGE_KEY = 'runway-mood-v1';

const RunwayContext = createContext(null);

const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1, label: 'USD ($)', decimals: 2 },
  BDT: { symbol: '৳', rate: 120, label: 'BDT (৳)', decimals: 0 },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)', decimals: 2 },
};

export const RunwayProvider = ({ children }) => {
  // Currency State - Default to BDT (৳)
  const [currency, setCurrencyState] = useState(() => {
    try {
      const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (saved && saved !== 'USD') return saved;
    } catch (_) {}
    return 'BDT';
  });

  const setCurrency = (c) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, c);
    } catch (_) {}
  };

  // Format price helper with active currency
  const formatPrice = useCallback(
    (usdAmount) => {
      const info = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
      const converted = usdAmount * info.rate;
      if (currency === 'BDT') {
        return `${info.symbol}${Math.round(converted).toLocaleString('en-US')}`;
      } else if (currency === 'EUR') {
        return `${info.symbol}${converted.toFixed(2)}`;
      }
      return `${info.symbol}${converted.toFixed(2)}`;
    },
    [currency]
  );

  // Runway Lighting Ambience Mode
  const [runwayMood, setRunwayMoodState] = useState(() => {
    try {
      return localStorage.getItem(MOOD_STORAGE_KEY) || 'studio';
    } catch (_) {}
    return 'studio';
  });

  const setRunwayMood = (mood) => {
    setRunwayMoodState(mood);
    try {
      localStorage.setItem(MOOD_STORAGE_KEY, mood);
    } catch (_) {}
  };

  // Sound & Ambient Audio State
  const [isMuted, setIsMuted] = useState(false);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const toggleAmbient = () => {
    if (isAmbientPlaying) {
      stopAmbientRunway();
      setIsAmbientPlaying(false);
    } else {
      startAmbientRunway();
      setIsAmbientPlaying(true);
    }
  };

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) return saved;
    } catch (_) {}
    return [];
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const toggleWishlist = useCallback(
    (productId) => {
      setWishlist((prev) => {
        const next = prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId];
        try {
          localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(next));
        } catch (_) {}
        return next;
      });
      playSound('click', isMuted);
    },
    [isMuted]
  );

  const isWishlisted = useCallback((productId) => wishlist.includes(productId), [wishlist]);

  // Bag Entries
  const [bagEntries, setBagEntries] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) {
        return saved
          .filter(
            (e) =>
              e &&
              Number.isSafeInteger(e.id) &&
              Number.isSafeInteger(e.quantity) &&
              e.quantity > 0 &&
              e.quantity <= 20 &&
              findProductVariant(e.id)
          )
          .slice(0, 50);
      }
    } catch (_) {}
    return [];
  });

  // Placed Orders History
  const [orders, setOrders] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) return saved;
    } catch (_) {}
    return [];
  });

  // Modals visibility
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Promo code & discount
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0); // decimal percentage, e.g. 0.10 for 10%
  const [promoAppliedCode, setPromoAppliedCode] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef(null);

  // Active Look index (0-5)
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [prevLookIndex, setPrevLookIndex] = useState(0);

  // Autoplay
  const [isPlaying, setIsPlaying] = useState(true);
  const [engaged, setEngaged] = useState(false);
  const [isPanelHovered, setIsPanelHovered] = useState(false);

  // Still state (ring at rest)
  const [isStill, setIsStill] = useState(true);

  // Zoom / Lightbox
  const [isZoomed, setIsZoomed] = useState(false);

  // Pin & Card highlighting
  const [hotPin, setHotPin] = useState(null);
  const [hotCard, setHotCard] = useState(null);

  // Added cards tracking: lookIndex -> Set of cardIds
  const [addedItems, setAddedItems] = useState({});

  // Which picker is open: `${lookIndex}-${cardId}` or null
  const [openPickerKey, setOpenPickerKey] = useState(null);

  // Selected options for each card: `${lookIndex}-${cardId}` -> variantId
  const [selectedVariants, setSelectedVariants] = useState(() => {
    const init = {};
    LOOKS.forEach((look, lIdx) => {
      look.products.forEach((prod) => {
        const productData = PRODUCTS[prod.productId];
        if (productData && productData.variants && productData.variants[0]) {
          init[`${lIdx}-${prod.cardId}`] = productData.variants[0].id;
        }
      });
    });
    return init;
  });

  // Touched state: whether user interacted with size picker
  const [touchedCards, setTouchedCards] = useState({});

  // Save bag entries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bagEntries));
    } catch (_) {}
  }, [bagEntries]);

  // Save orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (_) {}
  }, [orders]);

  // Toast helper
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  }, []);

  // Haptic feedback
  const buzz = useCallback(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate(12);
      } catch (_) {}
    }
  }, []);

  // Add items to styling bag
  const addBagItems = useCallback(
    (items) => {
      for (const item of items) {
        if (!Number.isSafeInteger(item.id) || !findProductVariant(item.id)) {
          throw new Error('Please choose an available size.');
        }
      }

      setBagEntries((prev) => {
        const next = [...prev];
        for (const item of items) {
          const existing = next.find((e) => e.id === item.id);
          if (existing) {
            existing.quantity = Math.min(20, existing.quantity + 1);
          } else {
            next.push({ id: item.id, quantity: 1 });
          }
        }
        return next;
      });

      buzz();
      playSound('add', isMuted);
      showToast(items.length === 1 ? 'Piece saved to your bag' : 'Look saved to your bag');
    },
    [buzz, showToast, isMuted]
  );

  // Update quantity in bag
  const updateBagQuantity = useCallback(
    (variantId, newQuantity) => {
      playSound('click', isMuted);
      if (newQuantity <= 0) {
        setBagEntries((prev) => prev.filter((e) => e.id !== variantId));
      } else {
        setBagEntries((prev) =>
          prev.map((e) => (e.id === variantId ? { ...e, quantity: Math.min(20, newQuantity) } : e))
        );
      }
    },
    [isMuted]
  );

  // Remove item from styling bag
  const removeBagItem = useCallback(
    (variantId) => {
      playSound('click', isMuted);
      setBagEntries((prev) => prev.filter((e) => e.id !== variantId));
    },
    [isMuted]
  );

  // Clear entire bag
  const clearBag = useCallback(() => {
    setBagEntries([]);
  }, []);

  // Promo code validation
  const applyPromo = useCallback((code) => {
    const clean = (code || '').trim().toUpperCase();
    if (clean === 'RUNWAY10' || clean === 'NIKE10') {
      setPromoDiscount(0.1);
      setPromoAppliedCode(clean);
      return { success: true, message: '10% discount applied!' };
    } else if (clean === 'RUNWAY20' || clean === 'VIP20') {
      setPromoDiscount(0.2);
      setPromoAppliedCode(clean);
      return { success: true, message: '20% VIP discount applied!' };
    } else if (clean === 'FREESHIP') {
      setPromoDiscount(0.001);
      setPromoAppliedCode(clean);
      return { success: true, message: 'Free Shipping unlocked!' };
    }
    return { success: false, message: 'Invalid promo code. Try "RUNWAY10" or "VIP20"' };
  }, []);

  const removePromo = useCallback(() => {
    setPromoDiscount(0);
    setPromoAppliedCode('');
    setPromoCode('');
  }, []);

  // Place Order function
  const placeOrder = useCallback(
    (orderFormData) => {
      const rawSubtotal = bagEntries.reduce((sum, e) => {
        const item = findProductVariant(e.id);
        return sum + (item ? item.product.price * e.quantity : 0);
      }, 0);

      const discountAmount = promoDiscount > 0.001 ? Math.round(rawSubtotal * promoDiscount) : 0;
      const isFreeShip =
        promoAppliedCode === 'FREESHIP' ||
        (orderFormData.shippingMethod === 'standard' && rawSubtotal >= 200);
      const shippingCost = isFreeShip ? 0 : orderFormData.shippingMethod === 'express' ? 25 : 12;
      const totalAmount = rawSubtotal - discountAmount + shippingCost;

      const orderItems = bagEntries
        .map((entry) => {
          const item = findProductVariant(entry.id);
          if (!item) return null;
          return {
            variantId: entry.id,
            productId: item.product.id,
            name: item.product.name,
            type: item.product.type,
            image: item.product.image,
            size: item.variant.o.join(' / '),
            quantity: entry.quantity,
            unitPrice: item.product.price,
            totalPrice: item.product.price * entry.quantity,
          };
        })
        .filter(Boolean);

      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const orderId = `DLK-2026-${randomNum}`;
      const now = new Date();

      const newOrder = {
        orderId,
        date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        timestamp: now.getTime(),
        status: 'Processing',
        customer: {
          fullName: `${orderFormData.firstName} ${orderFormData.lastName}`.trim(),
          email: orderFormData.email,
          phone: orderFormData.phone,
        },
        shippingAddress: {
          addressLine: orderFormData.address,
          apartment: orderFormData.apartment || '',
          city: orderFormData.city,
          state: orderFormData.state,
          postalCode: orderFormData.postalCode,
          country: orderFormData.country || 'Bangladesh',
          notes: orderFormData.notes || '',
        },
        shippingMethod:
          orderFormData.shippingMethod === 'express'
            ? 'Express Priority Courier (1-2 Days)'
            : 'Standard Delivery (3-5 Days)',
        shippingCost,
        paymentMethod: orderFormData.paymentMethod,
        paymentDetails: orderFormData.paymentDetails || {},
        items: orderItems,
        subtotal: rawSubtotal,
        discount: discountAmount,
        promoCode: promoAppliedCode,
        total: totalAmount,
        estimatedDelivery: new Date(
          Date.now() + (orderFormData.shippingMethod === 'express' ? 2 : 4) * 86400000
        ).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        }),
      };

      setOrders((prev) => [newOrder, ...prev]);
      setLatestOrder(newOrder);
      setBagEntries([]);
      setIsCheckoutOpen(false);
      setIsBagOpen(false);
      setIsOrderSuccessOpen(true);
      showToast(`🎉 Order ${orderId} confirmed successfully!`);
      playSound('success', isMuted);
      buzz();

      return newOrder;
    },
    [bagEntries, promoDiscount, promoAppliedCode, showToast, buzz, isMuted]
  );

  // Advance order status for testing/demo lifecycle
  const advanceOrderStatus = useCallback(
    (orderId) => {
      const cycle = ['Processing', 'Dispatched', 'Out for Delivery', 'Delivered'];
      setOrders((prev) =>
        prev.map((ord) => {
          if (ord.orderId !== orderId) return ord;
          const currentIdx = cycle.indexOf(ord.status);
          const nextStatus =
            currentIdx >= 0 && currentIdx < cycle.length - 1 ? cycle[currentIdx + 1] : ord.status;
          return { ...ord, status: nextStatus };
        })
      );
      setLatestOrder((prev) => {
        if (!prev || prev.orderId !== orderId) return prev;
        const currentIdx = cycle.indexOf(prev.status);
        const nextStatus =
          currentIdx >= 0 && currentIdx < cycle.length - 1 ? cycle[currentIdx + 1] : prev.status;
        return { ...prev, status: nextStatus };
      });
      playSound('click', isMuted);
      showToast('Order status updated in tracking pipeline');
    },
    [showToast, isMuted]
  );

  // Cancel an order if still in Processing
  const cancelOrder = useCallback(
    (orderId) => {
      setOrders((prev) =>
        prev.map((ord) => (ord.orderId === orderId ? { ...ord, status: 'Cancelled' } : ord))
      );
      setLatestOrder((prev) =>
        prev && prev.orderId === orderId ? { ...prev, status: 'Cancelled' } : prev
      );
      playSound('click', isMuted);
      showToast(`Order ${orderId} has been cancelled`);
    },
    [showToast, isMuted]
  );

  // Re-order items into cart
  const reorder = useCallback(
    (orderId) => {
      const orderToReorder = orders.find((o) => o.orderId === orderId);
      if (!orderToReorder) return;
      const itemsToAdd = orderToReorder.items.map((i) => ({
        id: i.variantId,
        quantity: i.quantity,
      }));
      addBagItems(itemsToAdd);
      setIsOrderHistoryOpen(false);
      setIsBagOpen(true);
      playSound('add', isMuted);
    },
    [orders, addBagItems, isMuted]
  );

  // Export shortlist txt
  const exportBagShortlist = useCallback(() => {
    const textLines = [
      'RUNWAY — STYLING SHORTLIST',
      'Reference prices; no order or payment has been placed.',
      '',
      ...bagEntries.map((e) => {
        const item = findProductVariant(e.id);
        if (!item) return '';
        const { product, variant } = item;
        return `${product.name} · Size ${variant.o.join(' / ')} · Quantity ${e.quantity}\n${product.url}`;
      }),
    ];
    const blob = new Blob([textLines.join('\n\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'runway-outfit-shortlist.txt';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [bagEntries]);

  // Ref to track activeLookIndex without triggering recreations
  const activeLookIndexRef = useRef(0);
  activeLookIndexRef.current = activeLookIndex;

  // Navigate to look
  const changeLook = useCallback(
    (newIndex) => {
      const n = LOOKS.length;
      const normalized = ((newIndex % n) + n) % n;
      setPrevLookIndex(activeLookIndexRef.current);
      setActiveLookIndex(normalized);
      setIsZoomed(false);
      setOpenPickerKey(null);
      setHotPin(null);
      setHotCard(null);
      playSound('swipe', isMuted);
    },
    [isMuted]
  );

  const nextLook = useCallback(() => {
    setActiveLookIndex((prev) => {
      const n = LOOKS.length;
      const next = (prev + 1) % n;
      setPrevLookIndex(prev);
      setIsZoomed(false);
      setOpenPickerKey(null);
      setHotPin(null);
      setHotCard(null);
      playSound('swipe', isMuted);
      return next;
    });
  }, [isMuted]);

  const prevLook = useCallback(() => {
    setActiveLookIndex((prev) => {
      const n = LOOKS.length;
      const prevIdx = ((prev - 1) % n + n) % n;
      setPrevLookIndex(prev);
      setIsZoomed(false);
      setOpenPickerKey(null);
      setHotPin(null);
      setHotCard(null);
      playSound('swipe', isMuted);
      return prevIdx;
    });
  }, [isMuted]);

  // Total cart badge count
  const cartCount = bagEntries.reduce((sum, e) => sum + e.quantity, 0);

  // Subtotal of bag
  const bagTotal = bagEntries.reduce((sum, e) => {
    const item = findProductVariant(e.id);
    return sum + (item ? item.product.price * e.quantity : 0);
  }, 0);

  return (
    <RunwayContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        runwayMood,
        setRunwayMood,
        isMuted,
        toggleMute,
        isAmbientPlaying,
        toggleAmbient,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isWishlistOpen,
        setIsWishlistOpen,
        bagEntries,
        cartCount,
        bagTotal,
        updateBagQuantity,
        clearBag,
        orders,
        placeOrder,
        advanceOrderStatus,
        cancelOrder,
        reorder,
        latestOrder,
        setLatestOrder,
        isBagOpen,
        setIsBagOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        isOrderHistoryOpen,
        setIsOrderHistoryOpen,
        quickViewProduct,
        setQuickViewProduct,
        promoCode,
        setPromoCode,
        promoDiscount,
        promoAppliedCode,
        applyPromo,
        removePromo,
        addBagItems,
        removeBagItem,
        exportBagShortlist,
        toastMessage,
        toastVisible,
        showToast,
        activeLookIndex,
        prevLookIndex,
        changeLook,
        nextLook,
        prevLook,
        isPlaying,
        setIsPlaying,
        engaged,
        setEngaged,
        isPanelHovered,
        setIsPanelHovered,
        isStill,
        setIsStill,
        isZoomed,
        setIsZoomed,
        hotPin,
        setHotPin,
        hotCard,
        setHotCard,
        addedItems,
        setAddedItems,
        openPickerKey,
        setOpenPickerKey,
        selectedVariants,
        setSelectedVariants,
        touchedCards,
        setTouchedCards,
      }}
    >
      {children}
    </RunwayContext.Provider>
  );
};

export const useRunway = () => {
  const context = useContext(RunwayContext);
  if (!context) throw new Error('useRunway must be used within RunwayProvider');
  return context;
};
