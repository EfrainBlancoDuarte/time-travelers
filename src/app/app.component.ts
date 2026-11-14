import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="app-frame">
      <router-outlet />
    </div>
  `,
  styles: `
    .app-frame {
      position: relative;
      max-width: var(--app-width);
      min-height: 100dvh;
      margin: 0 auto;
      background: var(--sand);
      overflow-x: clip;
    }

    /* On big screens the app looks like a phone in the middle */
    @media (min-width: 560px) {
      .app-frame {
        box-shadow: var(--shadow-lg);
      }
    }
  `,
})
export class AppComponent {}
