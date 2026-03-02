import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Interface for the BubblaV widget API exposed on the window object
 */
export interface BubblaVAPI {
  open: () => void;
  close: () => void;
  toggle: () => void;
  sendMessage: (message: string) => void;
}

/**
 * BubblaVWidgetService — provides programmatic access to the BubblaV widget API.
 *
 * @example
 * constructor(private bubblav: BubblaVWidgetService) {}
 * this.bubblav.open();
 */
@Injectable({ providedIn: 'root' })
export class BubblaVWidgetService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  private get api(): BubblaVAPI | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return (window as any).BubblaV ?? null;
  }

  open(): void {
    this.api?.open();
  }

  close(): void {
    this.api?.close();
  }

  toggle(): void {
    this.api?.toggle();
  }

  sendMessage(message: string): void {
    this.api?.sendMessage(message);
  }
}
