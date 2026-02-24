import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const WIDGET_SRC = 'https://www.bubblav.com/widget.js';
const SCRIPT_ATTR = 'data-bubblav-widget';

/**
 * BubblaVWidgetComponent — injects the BubblaV chat widget script into the page.
 *
 * Add to your root AppComponent or a shared layout component.
 * Mark it as standalone and import it in your component's `imports` array.
 *
 * @example
 * // app.component.ts
 * imports: [BubblaVWidgetComponent]
 *
 * // app.component.html
 * <bubblav-widget websiteId="your-website-id"></bubblav-widget>
 */
@Component({
  selector: 'bubblav-widget',
  standalone: true,
  template: '',
})
export class BubblaVWidgetComponent implements OnInit, OnDestroy {
  /** Your website ID from the BubblaV dashboard */
  @Input({ required: true }) websiteId!: string;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Avoid injecting the script twice
    if (document.querySelector(`script[${SCRIPT_ATTR}]`)) return;

    const script = document.createElement('script');
    script.src = WIDGET_SRC;
    script.async = true;
    script.setAttribute('data-site-id', this.websiteId);
    script.setAttribute(SCRIPT_ATTR, 'true');
    document.body.appendChild(script);
  }

  ngOnDestroy(): void {
    const s = document.querySelector<HTMLScriptElement>(`script[${SCRIPT_ATTR}]`);
    if (s) s.remove();
  }
}
