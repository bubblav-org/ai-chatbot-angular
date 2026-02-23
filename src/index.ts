/**
 * @bubblav/ai-chatbot-angular
 *
 * Angular component and service for embedding the BubblaV AI chatbot widget.
 *
 * @example
 * ```ts
 * import { BubblaVWidgetComponent } from '@bubblav/ai-chatbot-angular';
 * ```
 */

// Component export
export { BubblaVWidgetComponent } from './lib/bubblav-widget.component';

// Service export
export { BubblaVWidgetService } from './lib/bubblav-widget.service';

// Type exports
export type {
  BubblaVWidgetConfig,
  BubblaVWidgetSDK,
  BubblaVSDK,
} from './lib/types';

// Utility exports
export {
  propsToDataAttributes,
  getWidgetScriptUrl,
  validateWebsiteId,
  getConfigProps,
  isBrowser,
  isScriptLoaded,
} from './lib/utils';
