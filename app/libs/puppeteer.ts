import puppeteer, { Browser, Page } from 'puppeteer-core';
export class PuppeteerScrapper{
  static browser: Browser | undefined;
  static async newPage(): Promise<Page>{
    // Launch browser
    PuppeteerScrapper.browser = await puppeteer.connect({ browserWSEndpoint: 'https://dreams-board-scrapper-a2vjd74og.liara.run/?token=AL77J10q1zeMeYAoqio' });
    return await PuppeteerScrapper.browser.newPage();
  }


  static async getDollorPriceInIRT(): Promise<string>{

    // Replace this with your target URL
    const url = 'https://www.tgju.org/%D9%82%DB%8C%D9%85%D8%AA-%D8%AF%D9%84%D8%A7%D8%B1';

    const page = await PuppeteerScrapper.newPage()
    // Go to the page and wait until it fully loads
    await page.goto(url);

    // Wait for the element to appear in the DOM
    await page.waitForSelector('#l-price_dollar_rl .info-price');

    // Extract the value of the element
    const price = await page.$eval('#l-price_dollar_rl .info-price', el => el.innerHTML);

    
    await PuppeteerScrapper.browser?.close();
    return price
  }
}
