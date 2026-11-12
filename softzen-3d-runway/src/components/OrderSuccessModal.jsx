import React from 'react';
import { useRunway } from '../context/RunwayContext.jsx';
import { formatMoney } from '../data/runwayCatalog.js';

export const OrderSuccessModal = () => {
  const {
    isOrderSuccessOpen,
    setIsOrderSuccessOpen,
    latestOrder,
    setIsOrderHistoryOpen,
  } = useRunway();

  if (!isOrderSuccessOpen || !latestOrder) return null;

  const handlePrintReceipt = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (!printWindow) {
      window.print();
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - Order ${latestOrder.orderId}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #111; max-width: 650px; margin: 0 auto; line-height: 1.5; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #111; padding-bottom: 20px; margin-bottom: 24px; }
          .brand { font-size: 26px; font-weight: 900; letter-spacing: -0.04em; }
          .receipt-title { font-size: 14px; text-transform: uppercase; color: #666; letter-spacing: 0.1em; }
          .order-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px; font-size: 13px; }
          .meta-block strong { display: block; font-size: 11px; text-transform: uppercase; color: #777; margin-bottom: 4px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
          th { text-align: left; padding: 10px 0; border-bottom: 1px solid #ddd; font-size: 11px; text-transform: uppercase; color: #666; }
          td { padding: 12px 0; border-bottom: 1px solid #eee; }
          .totals { margin-left: auto; width: 260px; font-size: 13px; }
          .total-row { display: flex; justify-content: space-between; padding: 6px 0; }
          .total-row.grand { font-size: 16px; font-weight: 800; border-top: 2px solid #111; margin-top: 8px; padding-top: 10px; }
          .footer { text-align: center; margin-top: 48px; padding-top: 24px; border-top: 1px dashed #ddd; font-size: 12px; color: #777; }
        </style>
      </head>
      <body>
        <div class="header">
          <div style="display: flex; align-items: center; gap: 14px;">
            <img src="/images/noxvelyn-logo.png" alt="NOXVELYN" style="height: 36px; width: auto;" />
            <div>
              <div class="brand">NOXVELYN RUNWAY</div>
              <div style="font-size: 13px; color: #555;">Official Order Receipt</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 16px; font-weight: 700;">${latestOrder.orderId}</div>
            <div style="font-size: 12px; color: #666;">${latestOrder.date} ${latestOrder.time}</div>
          </div>
        </div>

        <div class="order-meta">
          <div class="meta-block">
            <strong>Customer & Contact</strong>
            ${latestOrder.customer.fullName}<br>
            ${latestOrder.customer.email}<br>
            ${latestOrder.customer.phone}
          </div>
          <div class="meta-block">
            <strong>Shipping Destination</strong>
            ${latestOrder.shippingAddress.addressLine} ${latestOrder.shippingAddress.apartment}<br>
            ${latestOrder.shippingAddress.city}, ${latestOrder.shippingAddress.state} ${latestOrder.shippingAddress.postalCode}<br>
            ${latestOrder.shippingAddress.country}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Size</th>
              <th>Qty</th>
              <th style="text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${latestOrder.items
              .map(
                (item) => `
              <tr>
                <td><strong>${item.name}</strong></td>
                <td>${item.size}</td>
                <td>${item.quantity}</td>
                <td style="text-align: right;">${formatMoney(item.totalPrice)}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>

        <div class="totals">
          <div class="total-row"><span>Subtotal:</span><span>${formatMoney(latestOrder.subtotal)}</span></div>
          ${latestOrder.discount > 0 ? `<div class="total-row"><span>Discount:</span><span>-${formatMoney(latestOrder.discount)}</span></div>` : ''}
          <div class="total-row"><span>Shipping (${latestOrder.shippingMethod}):</span><span>${latestOrder.shippingCost === 0 ? 'FREE' : formatMoney(latestOrder.shippingCost)}</span></div>
          <div class="total-row grand"><span>Total:</span><span>${formatMoney(latestOrder.total)}</span></div>
        </div>

        <div class="footer">
          <p>Thank you for choosing NOXVELYN Runway.<br>For questions or support, contact support@noxvelyn.com.</p>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div
      className="ecom-dialog-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOrderSuccessOpen(false);
      }}
    >
      <div className="ecom-success-modal" role="dialog" aria-modal="true" aria-label="Order Confirmation">
        {/* Header */}
        <div className="ecom-modal-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <div></div>
          <button
            type="button"
            className="ecom-close-btn"
            aria-label="Close"
            onClick={() => setIsOrderSuccessOpen(false)}
          >
            ×
          </button>
        </div>

        {/* Success Content */}
        <div className="ecom-success-body">
          <div className="ecom-success-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <h2>Thank You For Your Order!</h2>
          <p style={{ margin: '0 0 16px', color: '#555', fontSize: '14px', maxWidth: '440px' }}>
            We've received your order and our team is preparing it for dispatch. A confirmation has been registered for <strong>{latestOrder.customer.email}</strong>.
          </p>

          <div className="ecom-order-id-badge">
            <span>ORDER NUMBER:</span>
            <strong>{latestOrder.orderId}</strong>
          </div>

          {/* Interactive Delivery Step Bar */}
          <div className="ecom-track-bar">
            <div className="ecom-track-fill"></div>
            <div className="ecom-track-step is-done">
              <div className="ecom-track-dot">✓</div>
              <span className="ecom-track-label">Placed</span>
            </div>
            <div className="ecom-track-step is-active">
              <div className="ecom-track-dot">2</div>
              <span className="ecom-track-label">Processing</span>
            </div>
            <div className="ecom-track-step">
              <div className="ecom-track-dot">3</div>
              <span className="ecom-track-label">Dispatched</span>
            </div>
            <div className="ecom-track-step">
              <div className="ecom-track-dot">4</div>
              <span className="ecom-track-label">Delivered</span>
            </div>
          </div>

          {/* Receipt Info Box */}
          <div className="ecom-receipt-box">
            <div className="ecom-receipt-header">Order Summary & Delivery Details</div>

            <div className="ecom-receipt-row">
              <span>Estimated Delivery:</span>
              <strong>{latestOrder.estimatedDelivery}</strong>
            </div>

            <div className="ecom-receipt-row">
              <span>Deliver To:</span>
              <strong>
                {latestOrder.customer.fullName} ({latestOrder.customer.phone})
              </strong>
            </div>

            <div className="ecom-receipt-row">
              <span>Shipping Address:</span>
              <span>
                {latestOrder.shippingAddress.addressLine}, {latestOrder.shippingAddress.city}
              </span>
            </div>

            <div className="ecom-receipt-row">
              <span>Payment Option:</span>
              <strong>
                {latestOrder.paymentMethod === 'cod'
                  ? '💵 Cash on Delivery (COD)'
                  : latestOrder.paymentMethod === 'bkash'
                  ? '📱 Mobile Banking'
                  : '💳 Credit/Debit Card'}
              </strong>
            </div>

            <div className="ecom-receipt-row" style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed #ddd' }}>
              <span>Total Amount:</span>
              <strong style={{ fontSize: '16px' }}>{formatMoney(latestOrder.total)}</strong>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
            <button
              type="button"
              className="ecom-btn-primary"
              onClick={handlePrintReceipt}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              <span>Download / Print Receipt</span>
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                className="ecom-btn-secondary"
                onClick={() => {
                  setIsOrderSuccessOpen(false);
                  setIsOrderHistoryOpen(true);
                }}
              >
                View in My Orders
              </button>
              <button
                type="button"
                className="ecom-btn-secondary"
                onClick={() => setIsOrderSuccessOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
