import React, { useState, useEffect } from 'react';

export const PoweredByBadge = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isPastHero = window.scrollY > 350;
      const isNearBottom = window.innerHeight + window.scrollY >= (document.documentElement.scrollHeight - 160);
      setVisible(isPastHero && !isNearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="https://softzenit.com"
      target="_blank"
      rel="noopener noreferrer"
      className="softzen-floating-badge"
      title="Powered by SoftZen IT"
      aria-label="Powered by SoftZen IT"
    >
      <span className="softzen-badge-label">Powered by</span>
      <img
        src="/images/softzen-it-logo-transparent.png"
        alt="SoftZen IT"
        className="softzen-badge-img"
      />
    </a>
  );
};
