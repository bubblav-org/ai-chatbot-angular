/**
 * BubblaVWidget Component
 *
 * Standalone Angular component for embedding the BubblaV chat widget.
 *
 * @example
 * ```html
 * <bubblav-widget
 *   websiteId="your-website-id"
 *   bubbleColor="#3b82f6"
 *   desktopPosition="bottom-right">
 * </bubblav-widget>
 * ```
 */

import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { BubblaVWidgetService } from './bubblav-widget.service';
import { BubblaVWidgetConfig } from './types';
import { validateWebsiteId } from './utils';

@Component({
  selector: 'bubblav-widget',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BubblaVWidgetComponent implements OnInit, OnDestroy {
  private service = inject(BubblaVWidgetService);
  private elementRef = inject(ElementRef);

  // Required input
  @Input({ required: true }) websiteId!: string;

  // Optional styling inputs
  @Input() apiUrl?: string;
  @Input() bubbleColor?: string;
  @Input() bubbleIconColor?: string;
  @Input() desktopPosition?: 'bottom-left' | 'bottom-right';
  @Input() mobilePosition?: 'bottom-left' | 'bottom-right';
  @Input() poweredByVisible?: boolean;
  @Input() botName?: string;
  @Input() greetingMessage?: string;
  @Input() textboxPlaceholder?: string;
  @Input() showActionButtons?: boolean;

  private config: BubblaVWidgetConfig = {
    websiteId: '',
  };

  ngOnInit(): void {
    // Validate website ID
    if (!validateWebsiteId(this.websiteId)) {
      console.warn(
        `[BubblaV] Invalid website ID format: "${this.websiteId}". ` +
        `Please check your website ID in the BubblaV dashboard.`
      );
      return;
    }

    // Build config object
    this.config = {
      websiteId: this.websiteId,
      ...(this.apiUrl !== undefined && { apiUrl: this.apiUrl }),
      ...(this.bubbleColor !== undefined && { bubbleColor: this.bubbleColor }),
      ...(this.bubbleIconColor !== undefined && { bubbleIconColor: this.bubbleIconColor }),
      ...(this.desktopPosition !== undefined && { desktopPosition: this.desktopPosition }),
      ...(this.mobilePosition !== undefined && { mobilePosition: this.mobilePosition }),
      ...(this.poweredByVisible !== undefined && { poweredByVisible: this.poweredByVisible }),
      ...(this.botName !== undefined && { botName: this.botName }),
      ...(this.greetingMessage !== undefined && { greetingMessage: this.greetingMessage }),
      ...(this.textboxPlaceholder !== undefined && { textboxPlaceholder: this.textboxPlaceholder }),
      ...(this.showActionButtons !== undefined && { showActionButtons: this.showActionButtons }),
    };

    // Initialize widget
    this.service.initialize(this.config);
  }

  ngOnDestroy(): void {
    // Cleanup widget
    this.service.destroy();
  }
}
