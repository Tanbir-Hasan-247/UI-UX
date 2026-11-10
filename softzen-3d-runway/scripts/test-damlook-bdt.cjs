const puppeteer = require('puppeteer-core');
const path = require('path');

const ARTIFACTS_DIR = 'C:\\Users\\Tanbir Hasan\\.gemini\\antigravity\\brain\\306ca1fa-486e-49a1-a2a3-5751aee64861';

async function runTest() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('1. Loading Damlook Runway Store...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500));

  console.log('2. Screenshot Header & Hero (Verifying Damlook Logo, Removed Nike Orbit / Hand Rail Pro / Sound, BDT prices)...');
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'damlook-1-header-runway.png') });

  console.log('3. Scrolling to Collection Grid with BDT Prices...');
  await page.evaluate(() => {
    const el = document.getElementById('shop-catalog') || document.querySelector('.ecom-grid-section');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'damlook-2-collection-bdt.png') });

  console.log('4. Adding product to Bag from Grid...');
  const addBtn = await page.$('.ecom-card-add-btn');
  if (addBtn) {
    await addBtn.click();
    await new Promise((r) => setTimeout(r, 600));
  }

  console.log('5. Opening BagDialog to verify BDT pricing...');
  await page.click('#open-bag');
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'damlook-3-bag-bdt.png') });

  console.log('6. Proceeding to Checkout Modal...');
  await page.click('#proceed-checkout-btn');
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'damlook-4-checkout-modal.png') });

  console.log('7. Filling Checkout Form...');
  await page.type('#chk-email', 'tanbir@example.com');
  await page.type('#chk-phone', '01712345678');
  await page.type('#chk-fname', 'Tanbir');
  await page.type('#chk-lname', 'Hasan');
  await page.type('#chk-address', 'Road 11, Banani, Block D');
  await page.type('#chk-city', 'Dhaka');
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'damlook-5-checkout-filled.png') });

  console.log('8. Placing Order...');
  await page.click('#place-order-submit-btn');
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'damlook-6-order-confirmed.png') });

  console.log('9. All screenshots captured successfully in artifacts directory!');
  await browser.close();
}

runTest().catch((err) => {
  console.error('Error in test:', err);
  process.exit(1);
});
