import React from 'react';
import { useRunway } from '../context/RunwayContext.jsx';

export const BagToast = () => {
  const { toastMessage, toastVisible } = useRunway();

  return (
    <div
      id="bag-status"
      role="status"
      aria-live="polite"
      className={toastVisible ? 'is-on' : ''}
    >
      {toastMessage}
    </div>
  );
};
