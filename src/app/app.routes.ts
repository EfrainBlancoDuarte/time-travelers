import { Routes } from '@angular/router';
import { authGuard, guestGuard, missionGuard } from './guards';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'map' },

  // Public pages
  {
    path: 'login',
    canActivate: [guestGuard],
    title: 'Sign in · Time Travelers',
    loadComponent: () => import('./pages/auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    canActivate: [guestGuard],
    title: 'Sign up · Time Travelers',
    loadComponent: () => import('./pages/auth/signup.component').then((m) => m.SignupComponent),
  },

  // Main pages with the bottom menu
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/shell.component').then((m) => m.ShellComponent),
    children: [
      {
        path: 'map',
        title: 'Travel Map · Time Travelers',
        loadComponent: () => import('./pages/map/map.component').then((m) => m.MapComponent),
      },
      {
        path: 'journal',
        title: 'My Journal · Time Travelers',
        loadComponent: () => import('./pages/journal/journal.component').then((m) => m.JournalComponent),
      },
      {
        path: 'profile',
        title: 'Profile · Time Travelers',
        loadComponent: () => import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
      },
    ],
  },

  // Mission flow: lesson → challenge → result
  {
    path: 'mission/:id',
    canActivate: [authGuard, missionGuard],
    children: [
      {
        path: '',
        title: 'Mission · Time Travelers',
        loadComponent: () => import('./pages/lesson/lesson.component').then((m) => m.LessonComponent),
      },
      {
        path: 'challenge',
        title: 'Challenge · Time Travelers',
        loadComponent: () =>
          import('./pages/challenge/challenge.component').then((m) => m.ChallengeComponent),
      },
      {
        path: 'result',
        title: 'Results · Time Travelers',
        loadComponent: () => import('./pages/result/result.component').then((m) => m.ResultComponent),
      },
    ],
  },

  { path: '**', redirectTo: 'map' },
];
