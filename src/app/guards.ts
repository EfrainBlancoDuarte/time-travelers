import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getMission } from './data/missions';
import { AuthService } from './services/auth.service';
import { ProgressService } from './services/progress.service';

/** Only logged-in students can enter. */
export const authGuard: CanActivateFn = () =>
  inject(AuthService).isLoggedIn() || inject(Router).parseUrl('/login');

/** Logged-in students don't need to see login / sign up again. */
export const guestGuard: CanActivateFn = () =>
  !inject(AuthService).isLoggedIn() || inject(Router).parseUrl('/map');

/** A mission can only be opened if it exists and it is unlocked. */
export const missionGuard: CanActivateFn = (route) => {
  const id = Number(route.paramMap.get('id'));
  const ok = !!getMission(id) && inject(ProgressService).isUnlocked(id);
  return ok || inject(Router).parseUrl('/map');
};
