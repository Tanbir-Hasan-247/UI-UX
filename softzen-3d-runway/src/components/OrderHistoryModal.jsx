import React from 'react';
import { useRunway } from '../context/RunwayContext.jsx';
import { formatMoney } from '../data/runwayCatalog.js';

export const OrderHistoryModal = () => {
  const { isOrderHistoryOpen, setIsOrderHistoryOpen, orders, setLatestOrder, setIsOrderSuccessOpen } = useRunway();

  if (!isOrderHistoryOpen) return null;

  return (
    <div
      className="ecom-dialog-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOrderHistoryOpen(false);
      }}
    >
      <div className="ecom-history-modal" role="dialog" aria-modal="true" aria-label="My Orders">
        <div className="ecom-modal-header">
          <h2>
            My Orders
            {orders.length > 0 && <span className="ecom-badge">{orders.length}</span>}
          </h2>
          <button
            type="button"
            className="ecom-close-btn"
            aria-label="Close"
            onClick={() => setIsOrderHistoryOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="ecom-modal-body">
          {orders.length === 0 ? (
            <div className="ecom-empty-state">
              <svg
                className="ecom-empty-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              <h3>No past orders found</h3>
              <p>You haven’t placed any orders yet. Build your outfit on the runway and checkout anytime.</p>
              <button
                type="button"
                className="ecom-btn-secondary"
                onClick={() => setIsOrderHistoryOpen(false)}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {orders.map((ord) => (
                <div className="ecom-order-card" key={ord.orderId}>
                  <div className="ecom-order-header">
                    <div>
                      <strong style={{ fontSize: '14px', letterSpacing: '0.02em' }}>{ord.orderId}</strong>
                      <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                        Placed on {ord.date} at {ord.time}
                      </div>
                    </div>
                    <span className={`ecom-status-tag ${ord.status.toLowerCase()}`}>
                      {ord.status}
                    </span>
                  </div>

                  {/* Items in order */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
                    {ord.items.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '44px 1fr auto',
                          gap: '12px',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '44px',
                            height: '50px',
                            objectFit: 'contain',
                            background: '#f8f8f8',
                            borderRadius: '4px',
                          }}
                        />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600 }}>{item.name}</div>
                          <div style={{ fontSize: '11px', color: '#666' }}>
                            Size: {item.size} • Qty: {item.quantity}
                          </div>
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 700 }}>
                          {formatMoney(item.totalPrice)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '12px',
                      borderTop: '1px solid #f0f0f0',
                      fontSize: '13px',
                    }}
                  >
                    <div>
                      <span style={{ color: '#666' }}>Total: </span>
                      <strong>{formatMoney(ord.total)}</strong>
                    </div>

                    <button
                      type="button"
                      style={{
                        background: 'none',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setLatestOrder(ord);
                        setIsOrderHistoryOpen(false);
                        setIsOrderSuccessOpen(true);
                      }}
                    >
                      View Receipt & Tracker
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
