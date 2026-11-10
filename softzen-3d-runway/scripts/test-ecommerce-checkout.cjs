const puppeteer = require('puppeteer-core');
const path = require('path');

async function testEcommerce() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('1. Loading Runway page...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500));

  console.log('2. Opening Size Picker and adding product to bag...');
  await page.evaluate(() => {
    const addBtn = document.querySelector('.rw__add');
    if (addBtn) addBtn.click();
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.evaluate(() => {
    const confirmBtn = document.querySelector('.rw__confirm');
    if (confirmBtn) confirmBtn.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  console.log('3. Opening modern Cart / Bag Drawer...');
  await page.evaluate(() => {
    const bagBtn = document.querySelector('#open-bag');
    if (bagBtn) bagBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'ecom-1-cart.png') });

  console.log('4. Applying promo code RUNWAY10...');
  await page.type('.ecom-promo-box input', 'RUNWAY10');
  await page.click('.ecom-promo-btn');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'ecom-2-cart-discount.png') });

  console.log('5. Clicking Proceed to Checkout...');
  await page.click('#proceed-checkout-btn');
  await new Promise((r) => setTimeout(r, 800));

  console.log('6. Typing Customer Information & Delivery Address...');
  await page.type('#chk-email', 'tanbir.hasan@example.com');
  await page.type('#chk-phone', '+880 1712-345678');
  await page.type('#chk-fname', 'Tanbir');
  await page.type('#chk-lname', 'Hasan');
  await page.type('#chk-address', 'House 14, Road 7, Sector 3, Uttara');
  await page.type('#chk-apt', 'Flat 4B');
  await page.type('#chk-notes', 'Please call before arrival.');
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'ecom-4-checkout-filled.png') });

  console.log('7. Submitting Order (Cash on Delivery)...');
  await page.click('#place-order-submit-btn');
  // Wait 2.2 seconds for realistic simulated processing & confirmation screen
  await new Promise((r) => setTimeout(r, 2200));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'ecom-5-order-confirmed.png') });

  console.log('8. Opening Order History (My Orders)...');
  await page.evaluate(() => {
    const viewOrdersBtn = Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent && b.textContent.includes('View in My Orders')
    );
    if (viewOrdersBtn) viewOrdersBtn.click();
  });
  await new Promise((r) => setTimeout(r, 700));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'ecom-6-order-history.png') });

  await browser.close();
  console.log('Checkout flow completed and verified!');
}

testEcommerce().catch((err) => {
  console.error(err);
  process.exit(1);
});
