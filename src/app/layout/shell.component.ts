import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IconComponent, IconName } from '../shared/icon.component';

/** Layout for the main pages: content + bottom navigation menu. */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <router-outlet />
    </main>

    <nav class="tabbar" aria-label="Main menu">
      @for (tab of tabs; track tab.path) {
        <a [routerLink]="tab.path" routerLinkActive="active" #rla="routerLinkActive" [attr.aria-current]="rla.isActive ? 'page' : null">
          <span class="pill"><app-icon [name]="tab.icon" [size]="22" /></span>
          <span class="label">{{ tab.label }}</span>
        </a>
      }
    </nav>
  `,
  styles: `
    main {
      padding-bottom: calc(96px + var(--safe-bottom));
    }
    .tabbar {
      position: fixed;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      width: 100%;
      max-width: var(--app-width);
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 8px 12px calc(10px + var(--safe-bottom));
      background: rgba(255, 253, 248, 0.94);
      backdrop-filter: blur(12px);
      border-top: 1px solid rgba(200, 80, 30, 0.12);
      box-shadow: 0 -8px 24px rgba(74, 35, 12, 0.08);
      z-index: 20;
    }
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      text-decoration: none;
      color: var(--ink-faint);
      font-weight: 800;
      font-size: 0.76rem;
      padding: 4px 0;
      transition: color 0.2s;
    }
    .pill {
      width: 56px;
      height: 32px;
      border-radius: 999px;
      display: grid;
      place-items: center;
      transition: background 0.25s;
    }
    a.active {
      color: var(--clay);
    }
    a.active .pill {
      background: var(--clay-soft);
    }
  `,
})
export class ShellComponent {
  readonly tabs: { path: string; label: string; icon: IconName }[] = [
    { path: '/map', label: 'Map', icon: 'map' },
    { path: '/journal', label: 'Journal', icon: 'book' },
    { path: '/profile', label: 'Profile', icon: 'user' },
  ];
}
