# @bubblav/ai-chatbot-angular

Official Angular package for the [BubblaV](https://www.bubblav.com) AI chatbot widget.

## Installation

```bash
npm install @bubblav/ai-chatbot-angular
```

## Usage

```ts
// app.component.ts
import { Component } from '@angular/core';
import { BubblaVWidgetComponent } from '@bubblav/ai-chatbot-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BubblaVWidgetComponent],
  template: `
    <router-outlet />
    <bubblav-widget websiteId="your-website-id"></bubblav-widget>
  `,
})
export class AppComponent {}
```

Get your `websiteId` from the [BubblaV dashboard](https://www.bubblav.com/dashboard).

## Programmatic control

```ts
import { Component, inject } from '@angular/core';
import { BubblaVWidgetService } from '@bubblav/ai-chatbot-angular';

@Component({ /* ... */ })
export class SupportComponent {
  private bubblav = inject(BubblaVWidgetService);

  openChat() {
    this.bubblav.open();
  }
}
```

## Documentation

Full guide: [docs.bubblav.com/user-guide/installation](https://docs.bubblav.com/user-guide/installation)
