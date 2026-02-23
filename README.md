# @bubblav/ai-chatbot-angular

Angular component for embedding the BubblaV AI chatbot widget in your Angular application.

## Installation

```bash
npm install @bubblav/ai-chatbot-angular
# or
yarn add @bubblav/ai-chatbot-angular
# or
pnpm add @bubblav/ai-chatbot-angular
```

## Usage

### Import the Module (Angular 14+ - Standalone)

Since this is a standalone component, you can import it directly in your component:

```ts
import { Component } from '@angular/core';
import { BubblaVWidgetComponent } from '@bubblav/ai-chatbot-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BubblaVWidgetComponent],
  template: `
    <bubblav-widget
      websiteId="your-website-id"
    />
  `
})
export class AppComponent {}
```

### Basic Usage

```html
<bubblav-widget
  websiteId="your-website-id">
</bubblav-widget>
```

### With Custom Styling

```html
<bubblav-widget
  websiteId="your-website-id"
  bubbleColor="#3b82f6"
  bubbleIconColor="#ffffff"
  desktopPosition="bottom-right"
  mobilePosition="bottom-right">
</bubblav-widget>
```

### Dynamic Configuration

```ts
import { Component } from '@angular/core';
import { BubblaVWidgetComponent } from '@bubblav/ai-chatbot-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BubblaVWidgetComponent],
  template: `
    <bubblav-widget
      [websiteId]="websiteId"
      [bubbleColor]="bubbleColor">
    </bubblav-widget>
  `
})
export class AppComponent {
  websiteId = 'your-website-id';
  bubbleColor = '#3b82f6';
}
```

### Using the Service

For programmatic access to the widget SDK, inject the service:

```ts
import { Component, inject } from '@angular/core';
import { BubblaVWidgetService } from '@bubblav/ai-chatbot-angular';

@Component({
  selector: 'app-support',
  template: `
    <button (click)="openChat()">Open Chat</button>
    <button (click)="sendMessage()">Send Help Message</button>
  `
})
export class SupportComponent {
  private bubblav = inject(BubblaVWidgetService);

  openChat() {
    this.bubblav.open();
  }

  sendMessage() {
    this.bubblav.sendMessage('I need help with my order');
  }
}
```

### With Service Initialization

If you want more control, you can initialize the widget manually through the service:

```ts
import { Component, inject, OnInit } from '@angular/core';
import { BubblaVWidgetService } from '@bubblav/ai-chatbot-angular';

@Component({
  selector: 'app-root',
  template: `
    <h1>My App</h1>
  `
})
export class AppComponent implements OnInit {
  private bubblav = inject(BubblaVWidgetService);

  ngOnInit() {
    this.bubblav.initialize({
      websiteId: 'your-website-id',
      bubbleColor: '#3b82f6',
      desktopPosition: 'bottom-right'
    });
  }

  openChat() {
    this.bubblav.open();
  }
}
```

### Observable State

Subscribe to widget state changes:

```ts
import { Component, inject } from '@angular/core';
import { BubblaVWidgetService } from '@bubblav/ai-chatbot-angular';

@Component({
  selector: 'app-widget-status',
  template: `
    <div>Widget is {{ isOpen$ | async ? 'open' : 'closed' }}</div>
  `
})
export class WidgetStatusComponent {
  private bubblav = inject(BubblaVWidgetService);
  isOpen$ = this.bubblav.isOpen$;
}
```

## Inputs

| Input | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `websiteId` | `string` | Yes | - | Your website ID from the BubblaV dashboard |
| `apiUrl` | `string` | No | Production API | Custom API URL (for self-hosted deployments) |
| `bubbleColor` | `string` | No | - | Bubble button color (hex) |
| `bubbleIconColor` | `string` | No | - | Bubble icon color (hex) |
| `desktopPosition` | `'bottom-left' \| 'bottom-right'` | No | `'bottom-right'` | Desktop position |
| `mobilePosition` | `'bottom-left' \| 'bottom-right'` | No | `'bottom-right'` | Mobile position |
| `poweredByVisible` | `boolean` | No | `true` | Show/hide powered by branding |
| `botName` | `string` | No | `'Bot'` | Custom bot name |
| `greetingMessage` | `string` | No | - | Greeting message when widget opens |
| `textboxPlaceholder` | `string` | No | - | Input placeholder text |
| `showActionButtons` | `boolean` | No | `true` | Show/hide action buttons |

## Service Methods

| Method | Description |
|--------|-------------|
| `initialize(config)` | Initialize the widget with configuration |
| `open()` | Open the widget |
| `close()` | Close the widget |
| `toggle()` | Toggle widget open/close |
| `isOpen()` | Check if widget is open |
| `sendMessage(text, conversationId?)` | Send a message programmatically |
| `showGreeting(message?)` | Show greeting message |
| `hideGreeting()` | Hide greeting message |
| `getConfig()` | Get current widget configuration |
| `setDebug(enabled)` | Enable/disable debug mode |
| `on(event, callback)` | Register event listener |
| `off(event, callback)` | Unregister event listener |
| `emit(event, data?)` | Emit event |
| `ready(callback)` | Ready callback for widget loaded |
| `track(eventName, properties?)` | Track analytics event |

## Service Observables

| Observable | Description |
|------------|-------------|
| `isOpen$` | Emits `true` when widget opens, `false` when closes |

## Getting Your Website ID

1. Go to [bubblav.com/dashboard](https://www.bubblav.com/dashboard)
2. Select your website
3. Go to **Installation**
4. Copy your website ID

## Server-Side Rendering (SSR)

This component is SSR-safe. The widget script only loads in the browser.

## Angular Versions

Compatible with Angular 14+ (supports standalone components).

## TypeScript

This package is written in TypeScript and includes full type definitions.

## License

MIT

## Support

- Documentation: [docs.bubblav.com](https://docs.bubblav.com)
- Issues: [GitHub Issues](https://github.com/tonnguyen/botcanchat/issues)
