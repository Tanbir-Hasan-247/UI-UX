export const MODELS_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_042056_1a704ff7-b0e5-4a9f-bbda-62392b819fb6.png&w=3840&q=85';

export const PIECES_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_042057_080e85b0-b4aa-4072-8eb9-2304c7baf42b.png&w=2400&q=85';

// Each model's box on the 960 x 540 sheet: [x0, x1]
export const LOOKS: [number, number][] = [
  [12, 176],
  [178, 330],
  [331, 470],
  [476, 633],
  [634, 767],
  [767, 956],
];

export const Y0 = 48;
export const Y1 = 496;
export const FIRST_LOOK_NUM = 15;

export interface ItemData {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  name: string;
  price: string;
}

// Each piece's box on the 960 x 720 sheet: x0, x1, y0, y1, name, price
export const ITEMS: ItemData[] = [
  { x0: 26, x1: 224, y0: 28, y1: 214, name: 'Feather Jacket', price: '$2,900' },
  { x0: 304, x1: 412, y0: 22, y1: 236, name: 'Satin Wide Leg Trousers', price: '$1,450' },
  { x0: 530, x1: 666, y0: 12, y1: 242, name: 'Pleated Dress', price: '$2,200' },
  { x0: 752, x1: 922, y0: 100, y1: 146, name: 'Gold Waist Belt', price: '$420' },
  { x0: 70, x1: 176, y0: 246, y1: 466, name: 'Satin Trench Dress', price: '$2,350' },
  { x0: 294, x1: 422, y0: 294, y1: 432, name: 'Top Handle Bag', price: '$980' },
  { x0: 508, x1: 688, y0: 240, y1: 452, name: 'Billow Sleeve Blouse', price: '$860' },
  { x0: 780, x1: 890, y0: 252, y1: 466, name: 'Tie Waist Trousers', price: '$740' },
  { x0: 64, x1: 178, y0: 484, y1: 698, name: 'Powder Long Coat', price: '$1,980' },
  { x0: 316, x1: 396, y0: 482, y1: 698, name: 'Ivory Straight Trousers', price: '$690' },
  { x0: 530, x1: 672, y0: 508, y1: 682, name: 'Sculpted Ruffle Top', price: '$1,120' },
  { x0: 754, x1: 916, y0: 484, y1: 700, name: 'Pleated Maxi Skirt', price: '$1,340' },
];

// Depth stops from d = -1 (leaving past the rail) to d = 5 (arriving out of the haze)
export const KX = [1.2, 0.744, 0.496, 0.346, 0.235, 0.15, 0.085];
export const KF = [1.14, 0.89, 0.777, 0.704, 0.651, 0.616, 0.59];
export const KH = [1.18, 0.832, 0.574, 0.436, 0.334, 0.258, 0.19];
export const KB = [0, 0, 1.5, 4, 8, 12, 17];
export const KO = [1, 1, 1, 1, 0.86, 0.5, 0];
