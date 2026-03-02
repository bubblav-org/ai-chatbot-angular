import { Injectable } from '@angular/core';

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
  private get api(): BubblaVAPI | null {
    if (typeof window === 'undefined') return null;
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
