import { ChangeDetectionStrategy, Component, computed, inject, input, numberAttribute, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { getMission } from '../../data/missions';
import { ProgressService } from '../../services/progress.service';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-challenge',
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.scss',
})
export class ChallengeComponent {
  private readonly router = inject(Router);
  private readonly progress = inject(ProgressService);

  readonly id = input.required({ transform: numberAttribute });
  readonly mission = computed(() => getMission(this.id())!);

  readonly letters = ['A', 'B', 'C', 'D'];
  readonly step = signal(0);
  /** Chosen option per question (-1 = not answered yet). */
  readonly answers = signal<number[]>([]);

  readonly question = computed(() => this.mission().questions[this.step()]);
  readonly total = computed(() => this.mission().questions.length);
  readonly isLast = computed(() => this.step() === this.total() - 1);
  readonly selected = computed(() => this.answers()[this.step()] ?? -1);

  choose(option: number): void {
    const next = [...this.answers()];
    next[this.step()] = option;
    this.answers.set(next);
  }

  back(): void {
    this.step.update((s) => s - 1);
  }

  next(): void {
    if (this.selected() < 0) return;
    if (!this.isLast()) {
      this.step.update((s) => s + 1);
      window.scrollTo({ top: 0 });
      return;
    }
    this.progress.saveAttempt(this.id(), this.answers());
    this.router.navigate(['/mission', this.id(), 'result'], { replaceUrl: true });
  }
}
