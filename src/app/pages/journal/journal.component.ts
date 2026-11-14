import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MISSIONS } from '../../data/missions';
import { ProgressService } from '../../services/progress.service';
import { IconComponent } from '../../shared/icon.component';
import { StarsComponent } from '../../shared/stars.component';

/** "My Journal": the missions the student already finished, with their score. */
@Component({
  selector: 'app-journal',
  imports: [RouterLink, DatePipe, IconComponent, StarsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="top">
      <h1 class="fade-up">My Journal <span aria-hidden="true">📖</span></h1>
      <p class="fade-up">Your finished missions. Open one to review what you learned.</p>
    </header>

    <section class="content">
      @for (e of entries(); track e.mission.id; let i = $index) {
        <a class="entry fade-up" [routerLink]="['/mission', e.mission.id, 'result']" [style.animation-delay]="0.08 + i * 0.08 + 's'" [style.--accent]="e.mission.color">
          <img [src]="e.mission.thumb" [alt]="e.mission.civilization" width="96" height="96" />
          <div class="info">
            <p class="kicker">Mission {{ e.mission.id }} · {{ e.mission.civilization }}</p>
            <h2>{{ e.mission.title }}</h2>
            <app-stars [value]="e.progress.bestStars" [size]="18" />
            <p class="meta">
              Last try: {{ e.progress.last.correct }}/{{ e.mission.questions.length }} correct ·
              {{ e.progress.last.date | date: 'MMM d' }}
            </p>
            <span class="review">Review answers <app-icon name="next" [size]="16" [stroke]="2.6" /></span>
          </div>
        </a>
      } @empty {
        <div class="empty fade-up">
          <div class="empty-icon" aria-hidden="true">🗺️</div>
          <h2>Your journal is empty</h2>
          <p>Finish your first mission and it will appear here, with your stars and answers.</p>
          <a class="btn btn-primary" routerLink="/map">Go to the map <app-icon name="map" /></a>
        </div>
      }
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .top {
      padding: calc(28px + var(--safe-top)) 22px 26px;
      background: linear-gradient(160deg, #e0682a 0%, var(--clay) 60%, #a8401a 100%);
      color: #fff;
      border-radius: 0 0 34px 34px;
      box-shadow: var(--shadow);

      h1 {
        font-size: 2rem;
        font-weight: 700;
      }
      p {
        opacity: 0.92;
        margin-top: 4px;
      }
    }
    .content {
      padding: 22px 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .entry {
      display: flex;
      gap: 14px;
      padding: 12px;
      background: var(--paper);
      border-radius: var(--r-lg);
      box-shadow: var(--shadow-sm);
      text-decoration: none;
      color: inherit;
      border-left: 6px solid var(--accent);
      transition: transform 0.12s;

      &:active {
        transform: scale(0.98);
      }

      img {
        width: 96px;
        height: 96px;
        object-fit: cover;
        border-radius: var(--r);
        flex-shrink: 0;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      gap: 3px;
      min-width: 0;
    }
    .kicker {
      font-size: 0.72rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--accent);
    }
    h2 {
      font-size: 1.12rem;
    }
    .meta {
      font-size: 0.82rem;
      color: var(--ink-soft);
      font-weight: 600;
    }
    .review {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-top: 2px;
      font-weight: 800;
      font-size: 0.88rem;
      color: var(--portal-dark);
    }
    .empty {
      text-align: center;
      padding: 36px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      h2 {
        font-size: 1.4rem;
        color: var(--clay-dark);
      }
      p {
        color: var(--ink-soft);
        max-width: 300px;
        margin-bottom: 10px;
      }
    }
    .empty-icon {
      width: 110px;
      height: 110px;
      display: grid;
      place-items: center;
      font-size: 3.6rem;
      border-radius: 50%;
      background: var(--sand-2);
    }
  `,
})
export class JournalComponent {
  private readonly progress = inject(ProgressService);

  readonly entries = computed(() =>
    MISSIONS.flatMap((mission) => {
      const progress = this.progress.get(mission.id);
      return progress ? [{ mission, progress }] : [];
    }),
  );
}
