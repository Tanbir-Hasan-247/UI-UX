import React from 'react';

export const PoweredByBadge: React.FC = () => {
  return (
    <a
      href="https://softzenit.com"
      target="_blank"
      rel="noopener noreferrer"
      className="powered-by-fixed-badge"
      aria-label="Powered by Softzen IT"
      title="Powered by Softzen IT"
    >
      <span className="powered-text">POWERED BY</span>
      <img
        src="/softzen-it-logo-transparent.png"
        alt="Softzen IT"
        className="powered-logo"
      />
    </a>
  );
};
