import React from 'react';

interface SvgCropProps {
  href: string;
  x0: number;
  y0: number;
  w: number;
  h: number;
  sheetW: number;
  sheetH: number;
}

export const SvgCrop: React.FC<SvgCropProps> = ({
  href,
  x0,
  y0,
  w,
  h,
  sheetW,
  sheetH,
}) => {
  return (
    <svg viewBox={`${x0} ${y0} ${w} ${h}`} aria-hidden="true">
      <svg x={x0} y={y0} width={w} height={h} viewBox={`${x0} ${y0} ${w} ${h}`}>
        <image href={href} width={sheetW} height={sheetH} />
      </svg>
    </svg>
  );
};
