const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES = [
  // Products - Footwear
  { url: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/jordan-retro-high.jpg' },
  { url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/air-dunk-low.jpg' },
  { url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/jordan-chicago-mid.jpg' },
  { url: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/air-force-shadow.jpg' },
  
  // Products - Hoodies & Fleece
  { url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/tech-fleece-hoodie.jpg' },
  { url: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/grey-oversized-hoodie.jpg' },
  { url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/olive-french-terry.jpg' },
  
  // Products - T-Shirts & Tops
  { url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/heavyweight-boxy-tee.jpg' },
  { url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/minimal-black-tee.jpg' },
  { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/vintage-athletic-tee.jpg' },

  // Products - Pants & Denim
  { url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/wide-leg-washed-denim.jpg' },
  { url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/stealth-utility-cargo.jpg' },
  { url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/heavy-fleece-jogger.jpg' },

  // Editorial Banners
  { url: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1200&q=80', dest: 'public/images/editorial/jordan-vault.jpg' },
  { url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80', dest: 'public/images/editorial/fleece-lab.jpg' },
  { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80', dest: 'public/images/editorial/street-utility.jpg' },

  // Community Lookbook Gallery (#NikeRunway)
  { url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80', dest: 'public/images/community/tokyo-street.jpg' },
  { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', dest: 'public/images/community/soho-newyork.jpg' },
  { url: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80', dest: 'public/images/community/london-underground.jpg' },
  { url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80', dest: 'public/images/community/paris-minimal.jpg' },
  { url: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80', dest: 'public/images/community/berlin-edge.jpg' },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(__dirname, '..', dest);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const file = fs.createWriteStream(fullPath);
    const get = (targetUrl) => {
      https.get(targetUrl, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          get(response.headers.location);
          return;
        }
        if (response.statusCode !== 200) {
          file.close();
          fs.unlinkSync(fullPath);
          return reject(new Error(`Failed to get ${targetUrl}: ${response.statusCode}`));
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            console.log(`✓ Downloaded: ${dest}`);
            resolve();
          });
        });
      }).on('error', (err) => {
        file.close();
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        reject(err);
      });
    };
    get(url);
  });
}

async function run() {
  console.log(`Starting download of ${IMAGES.length} curated theme images...`);
  for (const item of IMAGES) {
    try {
      await downloadFile(item.url, item.dest);
    } catch (err) {
      console.error(`Error downloading ${item.dest}:`, err.message);
    }
  }
  console.log('All image downloads completed!');
}

run();
