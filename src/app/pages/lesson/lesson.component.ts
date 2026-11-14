import { ChangeDetectionStrategy, Component, computed, input, numberAttribute, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getMission } from '../../data/missions';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-lesson',
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss',
})
export class LessonComponent {
  /** Comes from the URL: /mission/:id */
  readonly id = input.required({ transform: numberAttribute });
  readonly mission = computed(() => getMission(this.id())!);

  readonly viewerOpen = signal(false);
  readonly zoomed = signal(false);

  openViewer(): void {
    this.zoomed.set(false);
    this.viewerOpen.set(true);
  }
}
