import * as puppeteer from 'puppeteer-core';
import { Browser, ConnectOptions } from 'puppeteer-core';

/**
 * PuppeteerBrowserService - A singleton class for managing Puppeteer browser connections
 * using browserWSEndpoint to prevent creating multiple browser instances
 */
export class PuppeteerBrowserService {
  private static instance: PuppeteerBrowserService | null = null;
  private browser: Browser | null = null;
  private browserWSEndpoint: string = "";
  private connecting: boolean = false;
  private connectionPromise: Promise<Browser> | null = null;
  
  /**
   * Private constructor to prevent direct instantiation
   */
  private constructor() {}
  
  /**
   * Get the singleton instance of PuppeteerBrowserService
   */
  public static getInstance(): PuppeteerBrowserService {
    if (!PuppeteerBrowserService.instance) {
      PuppeteerBrowserService.instance = new PuppeteerBrowserService();
    }
    return PuppeteerBrowserService.instance;
  }
  
  /**
   * Connect to the Puppeteer browser using browserWSEndpoint
   * @param browserWSEndpoint The browser WebSocket endpoint to connect to
   * @param options Additional connection options
   * @returns A promise that resolves to the Browser instance
   */
  public async connect(browserWSEndpoint: string, options: ConnectOptions = {}): Promise<Browser> {
    // If already connected to this endpoint, return existing browser
    if (this.browser && this.browserWSEndpoint === browserWSEndpoint) {
      return this.browser;
    }
    
    // If already connecting, return the existing promise
    if (this.connecting && this.connectionPromise) {
      return this.connectionPromise;
    }
    
    // Store the endpoint
    this.browserWSEndpoint = browserWSEndpoint;
    this.connecting = true;
    
    // Create a connection promise
    this.connectionPromise = new Promise<Browser>(async (resolve, reject) => {
      try {
        // Disconnect existing browser if needed
        if (this.browser) {
          await this.disconnect();
        }
        
        // Connect to the browser
        console.log(`Connecting to Puppeteer browser at: ${browserWSEndpoint}`);
        this.browser = await puppeteer.connect({
          browserWSEndpoint,
          ...options
        });
        
        // Handle browser disconnection
        this.browser.on('disconnected', () => {
          console.log('Browser disconnected');
          this.browser = null;
        });
        
        console.log('Successfully connected to Puppeteer browser');
        resolve(this.browser);
      } catch (error) {
        console.error('Failed to connect to Puppeteer browser:', error);
        this.browser = null;
        reject(error);
      } finally {
        this.connecting = false;
      }
    });
    
    return this.connectionPromise;
  }
  
  /**
   * Get the current browser instance, connecting if necessary
   * @param browserWSEndpoint Optional endpoint to connect to if not already connected
   * @param options Additional connection options
   * @returns A promise that resolves to the Browser instance
   */
  public async getBrowser(browserWSEndpoint?: string, options?: ConnectOptions): Promise<Browser> {
    if (this.browser) {
      return this.browser;
    }
    
    if (!browserWSEndpoint && !this.browserWSEndpoint) {
      throw new Error('No browserWSEndpoint provided and no existing connection available');
    }
    
    return this.connect(browserWSEndpoint || this.browserWSEndpoint, options);
  }
  
  /**
   * Disconnect from the browser
   * @returns A promise that resolves when disconnection is complete
   */
  public async disconnect(): Promise<void> {
    if (this.browser) {
      try {
        await this.browser.close();
      } catch (error) {
        console.error('Error closing browser:', error);
      } finally {
        this.browser = null;
      }
    }
  }
  
  /**
   * Check if the browser is currently connected
   * @returns Whether the browser is connected
   */
  public isConnected(): boolean {
    return this.browser !== null && this.browser.connected;
  }
  
  /**
   * Create a new page in the browser
   * @returns A promise that resolves to the new Page object
   */
  public async newPage() {
    const browser = await this.getBrowser();
    return browser.newPage();
  }
  
  /**
   * Get all pages currently open in the browser
   * @returns A promise that resolves to an array of Page objects
   */
  public async pages() {
    const browser = await this.getBrowser();
    return browser.pages();
  }
  
  /**
   * Access the raw browser instance
   * Warning: Be careful with direct access to avoid bypassing the singleton pattern
   * @returns The current browser instance or null if not connected
   */
  public getRawBrowser(): Browser | null {
    return this.browser;
  }
}