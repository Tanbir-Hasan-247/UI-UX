const puppeteer = require('puppeteer-core');
const path = require('path');

async function captureAll() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('1. Capturing Desktop Runway (Default)...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'shot-1-desktop.png') });

  console.log('2. Opening Size Picker on item 1...');
  await page.evaluate(() => {
    const btn = document.querySelector('.rw__add');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'shot-2-picker.png') });

  console.log('3. Selecting Size and Adding to Bag...');
  await page.evaluate(() => {
    // Click confirm button in picker
    const confirm = document.querySelector('.rw__confirm');
    if (confirm) confirm.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'shot-3-added.png') });

  console.log('4. Adding Full Look to Bag...');
  await page.evaluate(() => {
    const bundleBtn = document.querySelector('.rw__bundle .rw__cta');
    if (bundleBtn) bundleBtn.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'shot-4-full-bundle.png') });

  console.log('5. Opening Styling Bag Modal with Added Items...');
  await page.evaluate(() => {
    const bagBtn = document.querySelector('#open-bag');
    if (bagBtn) bagBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'shot-5-bag-filled.png') });

  console.log('6. Closing Styling Bag & Opening Zoom Lightbox...');
  await page.evaluate(() => {
    const closeBag = document.querySelector('#close-bag');
    if (closeBag) closeBag.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.evaluate(() => {
    const zoomBtn = document.querySelector('.rw__hero.is-on .rw__zoom');
    if (zoomBtn) zoomBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'shot-6-zoom.png') });

  console.log('7. Capturing Mobile View (375x812)...');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500));
  await mobilePage.screenshot({ path: path.resolve(__dirname, '..', 'shot-7-mobile-default.png') });

  console.log('8. Opening Mobile Size Picker Bottom Sheet...');
  await mobilePage.evaluate(() => {
    const mobileAdd = document.querySelector('.rw__add');
    if (mobileAdd) mobileAdd.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  await mobilePage.screenshot({ path: path.resolve(__dirname, '..', 'shot-8-mobile-sheet.png') });

  await browser.close();
  console.log('All comprehensive screenshots captured successfully!');
}

captureAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
