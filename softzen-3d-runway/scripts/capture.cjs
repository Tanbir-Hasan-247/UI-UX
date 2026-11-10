const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleLogs = [];
  page.on('console', (msg) => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    console.log(`[BROWSER ${msg.type()}]:`, msg.text());
  });

  page.on('pageerror', (err) => {
    consoleLogs.push(`[PAGE ERROR] ${err.toString()}`);
    console.error(`[PAGE ERROR]:`, err);
  });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Wait 1 second for animations/initial paint
  await new Promise((r) => setTimeout(r, 1000));

  const screenshotPath = path.resolve(__dirname, '..', 'runway-react.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log('Screenshot saved to:', screenshotPath);

  const title = await page.title();
  console.log('Page Title:', title);

  const rootHtml = await page.evaluate(() => {
    const root = document.getElementById('root');
    return root ? root.innerHTML.slice(0, 500) : 'NO ROOT';
  });
  console.log('Root HTML snippet:', rootHtml);

  await browser.close();
}

run().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});
