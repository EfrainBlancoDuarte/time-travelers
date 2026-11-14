import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './auth.scss',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  name = '';
  password = '';
  readonly showPassword = signal(false);
  readonly error = signal<string | null>(null);

  submit(): void {
    const error = this.auth.login(this.name, this.password);
    this.error.set(error);
    if (!error) this.router.navigateByUrl('/map');
  }
}
