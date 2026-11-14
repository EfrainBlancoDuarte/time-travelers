import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MAX_STARS } from '../data/missions';

/** Row of stars. `animate` makes them pop in one by one (results screen). */
@Component({
  selector: 'app-stars',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="row" [class.animate]="animate()" role="img" [attr.aria-label]="value() + ' of ' + max + ' stars'">
      @for (filled of slots(); track $index) {
        <svg
          viewBox="0 0 24 24"
          [attr.width]="size()"
          [attr.height]="size()"
          [class.on]="filled"
          [style.animation-delay]="0.25 + $index * 0.18 + 's'"
        >
          <path
            d="M11.5 2.3a.53.53 0 0 1 .95 0l2.31 4.68a2.12 2.12 0 0 0 1.6 1.16l5.16.76a.53.53 0 0 1 .3.9l-3.74 3.64a2.12 2.12 0 0 0-.61 1.88l.88 5.14a.53.53 0 0 1-.77.56l-4.62-2.43a2.12 2.12 0 0 0-1.97 0L6.4 21.01a.53.53 0 0 1-.77-.56l.88-5.14a2.12 2.12 0 0 0-.61-1.88L2.16 9.8a.53.53 0 0 1 .3-.9l5.16-.76a2.12 2.12 0 0 0 1.6-1.16z"
          />
        </svg>
      }
    </div>
  `,
  styles: `
    .row {
      display: inline-flex;
      gap: 4px;
      align-items: center;
    }
    svg {
      fill: rgba(42, 27, 18, 0.12);
      stroke: rgba(42, 27, 18, 0.18);
      stroke-width: 1.2;
      flex-shrink: 0;
    }
    svg.on {
      fill: var(--gold);
      stroke: var(--gold-dark);
      filter: drop-shadow(0 2px 2px rgba(224, 154, 0, 0.35));
    }
    .animate svg {
      animation: pop 0.5s cubic-bezier(0.3, 1.6, 0.5, 1) both;
    }
    @keyframes pop {
      from {
        transform: scale(0) rotate(-40deg);
        opacity: 0;
      }
      to {
        transform: none;
        opacity: 1;
      }
    }
  `,
})
export class StarsComponent {
  readonly value = input.required<number>();
  readonly size = input(20);
  readonly animate = input(false);

  readonly max = MAX_STARS;
  readonly slots = computed(() => Array.from({ length: this.max }, (_, i) => i < this.value()));
}
