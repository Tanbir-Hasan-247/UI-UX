const puppeteer = require('puppeteer-core');
const path = require('path');

async function testFullStorefront() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('1. Loading Runway Flagship Store...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500));

  console.log('2. Screenshot: Top 3D Runway Hero...');
  await page.screenshot({ path: path.resolve(__dirname, '..', 'full-1-runway-hero.png') });

  console.log('3. Scrolling to Editorial Banners...');
  await page.evaluate(() => {
    const el = document.querySelector('.ecom-editorial-section');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'full-2-editorial-banners.png') });

  console.log('4. Scrolling to Search & Filter Hub...');
  await page.evaluate(() => {
    const el = document.querySelector('.ecom-hub-section');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'full-3-search-filter.png') });

  console.log('5. Scrolling to Full Product Grid...');
  await page.evaluate(() => {
    const el = document.querySelector('.ecom-grid-section');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'full-4-product-grid.png') });

  console.log('6. Testing Live Search with "Jordan"...');
  await page.type('.ecom-search-box input', 'Jordan');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'full-5-search-tested.png') });

  console.log('7. Clearing search and scrolling to Community Lookbook Gallery...');
  await page.click('.ecom-search-clear');
  await new Promise((r) => setTimeout(r, 400));
  await page.evaluate(() => {
    const el = document.querySelector('.ecom-community-section');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'full-6-community-gallery.png') });

  console.log('8. Scrolling to Innovation Story & Customer Reviews...');
  await page.evaluate(() => {
    const el = document.querySelector('.ecom-innovation-section');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'full-7-innovation-reviews.png') });

  console.log('9. Scrolling to Customer Reviews...');
  await page.evaluate(() => {
    const el = document.querySelector('.ecom-reviews-section');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'full-8-reviews.png') });

  console.log('10. Scrolling to VIP Newsletter & Footer...');
  await page.evaluate(() => {
    const el = document.querySelector('.ecom-footer');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'full-9-newsletter-footer.png') });

  console.log('11. Capturing Mobile Storefront (375x812)...');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  // Scroll down to product catalog on mobile
  await mobilePage.evaluate(() => {
    const el = document.querySelector('.ecom-grid-section');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await mobilePage.screenshot({ path: path.resolve(__dirname, '..', 'full-10-mobile-catalog.png') });

  await browser.close();
  console.log('All storefront screenshots captured successfully!');
}

testFullStorefront().catch((err) => {
  console.error(err);
  process.exit(1);
});
