/**
 * BubblaVWidget Service
 *
 * Injectable service for programmatic access to the BubblaV SDK.
 *
 * @example
 * ```ts
 * constructor(private bubblav: BubblaVWidgetService) {
 *   bubblav.open();
 *   bubblav.sendMessage('Hello');
 * }
 * ```
 */

import { Injectable, NgZone, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable } from 'rxjs';
import { BubblaVWidgetSDK, BubblaVWidgetConfig, BubblaVSDK } from './types';
import {
  getWidgetScriptUrl,
  validateWebsiteId,
  propsToDataAttributes,
  getConfigProps,
  isBrowser,
  isScriptLoaded,
} from './utils';

@Injectable({
  providedIn: 'root',
})
export class BubblaVWidgetService implements BubblaVWidgetSDK {
  private ngZone = inject(NgZone);
  private destroyRef = inject(DestroyRef);

  private sdk: BubblaVSDK | null = null;
  private scriptElement: HTMLScriptElement | null = null;
  private isInitialized = false;

  // Track widget state
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  public readonly isOpen$ = this.isOpenSubject.asObservable();

  constructor() {
    // Initialize SDK if already available
    if (isBrowser() && window.BubblaV) {
      this.sdk = window.BubblaV;
      this.setupEventListeners();
    }
  }

  /**
   * Initialize the widget with configuration
   */
  initialize(config: BubblaVWidgetConfig): void {
    if (!isBrowser()) {
      return;
    }

    if (this.isInitialized) {
      console.warn('[BubblaV] Widget already initialized');
      return;
    }

    // Validate website ID
    if (!validateWebsiteId(config.websiteId)) {
      console.warn(
        `[BubblaV] Invalid website ID format: "${config.websiteId}". ` +
        `Please check your website ID in the BubblaV dashboard.`
      );
      return;
    }

    // Get script URL
    const scriptUrl = getWidgetScriptUrl(config.apiUrl);

    // Check if script is already loaded
    if (isScriptLoaded(scriptUrl)) {
      console.warn(
        `[BubblaV] Widget script already loaded. ` +
        `Only one widget instance should be active.`
      );
      if (window.BubblaV) {
        this.sdk = window.BubblaV;
        this.setupEventListeners();
      }
      return;
    }

    // Mark as initialized
    this.isInitialized = true;

    // Create script element
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.defer = true;

    // Set data attributes
    script.setAttribute('data-site-id', config.websiteId);

    // Set optional config as data attributes
    const configProps = getConfigProps(config);
    const dataAttrs = propsToDataAttributes(configProps);
    for (const [key, value] of Object.entries(dataAttrs)) {
      script.setAttribute(key, value);
    }

    // Handle load event
    script.onload = () => {
      this.ngZone.run(() => {
        if (window.BubblaV) {
          this.sdk = window.BubblaV;
          this.setupEventListeners();
        }
      });
    };

    // Handle error event
    script.onerror = () => {
      console.error(
        `[BubblaV] Failed to load widget script from ${scriptUrl}. ` +
        `Please check your network connection and ensure the URL is correct.`
      );
      this.isInitialized = false;
    };

    // Add script to document
    document.body.appendChild(script);
    this.scriptElement = script;
  }

  /**
   * Setup event listeners for widget state changes
   */
  private setupEventListeners(): void {
    if (!this.sdk) return;

    this.sdk.on('widget_opened', () => {
      this.ngZone.run(() => {
        this.isOpenSubject.next(true);
      });
    });

    this.sdk.on('widget_closed', () => {
      this.ngZone.run(() => {
        this.isOpenSubject.next(false);
      });
    });
  }

  /**
   * Cleanup widget
   */
  destroy(): void {
    if (this.scriptElement && this.scriptElement.parentNode) {
      this.scriptElement.parentNode.removeChild(this.scriptElement);
    }
    this.scriptElement = null;
    this.sdk = null;
    this.isInitialized = false;
  }

  // SDK Methods

  open(): void {
    this.sdk?.open();
  }

  close(): void {
    this.sdk?.close();
  }

  toggle(): void {
    this.sdk?.toggle();
  }

  isOpen(): boolean {
    return this.sdk?.isOpen() ?? false;
  }

  sendMessage(text: string, conversationId?: string): void {
    this.sdk?.sendMessage(text, conversationId);
  }

  showGreeting(message?: string): void {
    this.sdk?.showGreeting(message);
  }

  hideGreeting(): void {
    this.sdk?.hideGreeting();
  }

  getConfig(): Record<string, unknown> {
    return this.sdk?.getConfig() ?? {};
  }

  setDebug(enabled: boolean): void {
    this.sdk?.setDebug(enabled);
  }

  // Event methods

  /**
   * Listen to widget events
   */
  on(event: string, callback: (...args: unknown[]) => void): void {
    this.sdk?.on(event, callback);
  }

  /**
   * Unregister event listener
   */
  off(event: string, callback: (...args: unknown[]) => void): void {
    this.sdk?.off(event, callback);
  }

  /**
   * Emit event
   */
  emit(event: string, data?: unknown): void {
    this.sdk?.emit(event, data);
  }

  /**
   * Ready callback for widget loaded
   */
  ready(callback: () => void): void {
    this.sdk?.ready(callback);
  }

  /**
   * Track analytics event
   */
  track(eventName: string, properties?: Record<string, unknown>): void {
    this.sdk?.track(eventName, properties);
  }
}
