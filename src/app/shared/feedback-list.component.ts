import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Mission } from '../data/missions';
import { Attempt } from '../services/auth.service';
import { IconComponent } from './icon.component';

/**
 * Shows, for each question, what the student chose and why it is right or wrong.
 * If the answer was wrong, it also explains the correct one.
 */
@Component({
  selector: 'app-feedback-list',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (q of mission().questions; track $index; let i = $index) {
      @let chosen = attempt().answers[i];
      @let right = chosen === q.correct;
      <article class="card fade-up" [style.animation-delay]="0.1 + i * 0.12 + 's'">
        <header>
          <span class="num">{{ i + 1 }}</span>
          <h3>{{ q.text }}</h3>
        </header>

        @if (right) {
          <div class="answer ok">
            <div class="tag"><app-icon name="check" [size]="16" [stroke]="3" /> You got it!</div>
            <p class="choice">{{ q.options[chosen].text }}</p>
            <p class="why"><strong>Why?</strong> {{ q.options[chosen].explanation }}</p>
          </div>
        } @else {
          <div class="answer bad">
            <div class="tag"><app-icon name="x" [size]="16" [stroke]="3" /> Your answer</div>
            <p class="choice">{{ q.options[chosen].text }}</p>
            <p class="why"><strong>Why not?</strong> {{ q.options[chosen].explanation }}</p>
          </div>
          <div class="answer ok">
            <div class="tag"><app-icon name="check" [size]="16" [stroke]="3" /> The right answer</div>
            <p class="choice">{{ q.options[q.correct].text }}</p>
            <p class="why"><strong>Why?</strong> {{ q.options[q.correct].explanation }}</p>
          </div>
        }
      </article>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .card {
      background: var(--paper);
      border-radius: var(--r-lg);
      padding: 18px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    header {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }
    .num {
      flex-shrink: 0;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: var(--clay);
      color: #fff;
      font-family: var(--font-display);
      font-weight: 600;
    }
    h3 {
      font-size: 1.08rem;
      padding-top: 3px;
    }
    .answer {
      border-radius: var(--r);
      padding: 12px 14px;
      border: 2px solid;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .answer.ok {
      background: var(--ok-soft);
      border-color: #9fdcb7;
    }
    .answer.bad {
      background: var(--bad-soft);
      border-color: #f4b4ae;
    }
    .tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.78rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.6px;
    }
    .ok .tag {
      color: var(--ok);
    }
    .bad .tag {
      color: var(--bad);
    }
    .choice {
      font-weight: 800;
      font-size: 1.02rem;
    }
    .why {
      color: var(--ink-soft);
      font-size: 0.95rem;
    }
    .why strong {
      color: var(--ink);
    }
  `,
})
export class FeedbackListComponent {
  readonly mission = input.required<Mission>();
  readonly attempt = input.required<Attempt>();
}
