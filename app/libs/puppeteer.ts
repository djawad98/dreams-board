import { PuppeteerBrowserService } from './puppeteer-v2.js';
export class PuppeteerScrapper {

  static async puppeteerBrowser() {
    const instance = await PuppeteerBrowserService.getInstance()
    return instance.connect('https://agitated-noyce-fhuaal7y-m.liara.run/?token=q-bEyMgsgN7tnOihxXo', { defaultViewport: { height: 1080, width: 1920, isLandscape: true, isMobile: false, hasTouch: false } })
  }


  static async getFootballTicketPriceInIRT(): Promise<string> {
    try {

      const url = 'https://seatpick.com/old-trafford-football-ground-tickets'
      const page = await (await PuppeteerScrapper.puppeteerBrowser()).newPage()
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36');
      await page.goto(url, { waitUntil: 'networkidle2' })
      const selector = `[class*='styles_LisItem']:first-of-type > [class*='styles_Link__'] > span`;
      await page.waitForSelector(selector)
      const price = await page.$eval(selector, el => el.innerHTML);
      page.close()
      return price.split(/[\$\€]/ig)[1]
    } catch (e) {
      console.log(e)
      return '0'
    }
  }

  static async getFootballTicketPrice2(): Promise<string> {
    try {
      const url = 'https://www.livefootballtickets.com/english-premiership/liverpool-tickets.html'
      const page = await (await PuppeteerScrapper.puppeteerBrowser()).newPage()
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36');
      await page.goto(url, { waitUntil: 'networkidle2' })
      const selector = `a:where(li:first-child [data-testid]) [aria-label]`;
      await page.waitForSelector(selector)
      const price = await page.$eval(selector, el => el.innerHTML);
      page.close()
      return price
    } catch (e) {
      console.log(e)
      return '0'
    }
  }

  static async getCurrencyPriceInIRT(): Promise<{ dolor: string, euro: string }> {

    // Replace this with your target URL
    const url = 'https://www.tgju.org/%D9%82%DB%8C%D9%85%D8%AA-%D8%AF%D9%84%D8%A7%D8%B1';

    try {
      const page = await (await PuppeteerScrapper.puppeteerBrowser()).newPage()
      // Go to the page and wait until it fully loads
      await page.goto(url);

      // Wait for the element to appear in the DOM
      await page.waitForSelector('#l-price_dollar_rl .info-price');
      await page.waitForSelector('#l-price_eur .info-price');

      // Extract the value of the element
      const price = await page.$eval('#l-price_dollar_rl .info-price', el => el.innerHTML);
      const euroPrice = await page.$eval('#l-price_eur .info-price', el => el.innerHTML);

      page.close()
      return { dolor: price.replace(",", ""), euro: euroPrice.replace(",", "") }
    } catch (e) {
      return { dolor: '0', euro: '0' }
    }

  }
}
