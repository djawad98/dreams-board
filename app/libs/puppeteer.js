import puppeteer from 'puppeteer-core';

(async () => {
  // Launch browser
  const browser = await puppeteer.connect({ browserWSEndpoint: 'https://dreams-board-scrapper-a2vjd74og.liara.run/?token=AL77J10q1zeMeYAoqio' });
  const page = await browser.newPage();

  // Replace this with your target URL
  const url = 'https://www.tgju.org/%D9%82%DB%8C%D9%85%D8%AA-%D8%AF%D9%84%D8%A7%D8%B1';

  // Go to the page and wait until it fully loads
  await page.goto(url);

  // Wait for the element to appear in the DOM
  await page.waitForSelector('#l-price_dollar_rl .info-price');

  // Extract the value of the element
  const price = await page.$eval('#l-price_dollar_rl .info-price', el => el.innerHTML);

  
  await browser.close();
  console.log('Price:', price);
})();
