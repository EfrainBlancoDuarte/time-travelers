import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup.component.html',
  styleUrl: './auth.scss',
})
export class SignupComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly grades = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th'].map(
    (g) => `${g} grade`,
  );

  name = '';
  grade = '';
  password = '';
  readonly showPassword = signal(false);
  readonly error = signal<string | null>(null);

  submit(): void {
    const error = this.auth.signUp(this.name, this.grade, this.password);
    this.error.set(error);
    if (!error) this.router.navigateByUrl('/map');
  }
}
