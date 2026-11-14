import { Injectable, computed, signal } from '@angular/core';

/**
 * Simple "database" stored in the browser (localStorage).
 * Data survives closing the browser; it is only lost if the
 * browser data is cleared or in incognito mode.
 */

export interface Attempt {
  /** Index of the option chosen for each question. */
  answers: number[];
  correct: number;
  stars: number;
  date: string;
}

export interface MissionProgress {
  bestStars: number;
  attempts: number;
  last: Attempt;
}

export interface User {
  id: string;
  name: string;
  grade: string;
  password: string;
  createdAt: string;
  progress: Record<number, MissionProgress>;
}

const USERS_KEY = 'tt.users';
const SESSION_KEY = 'tt.session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly users = signal<User[]>(this.read<User[]>(USERS_KEY) ?? []);
  private readonly sessionId = signal<string | null>(this.read<string>(SESSION_KEY));

  /** The student who is logged in (or null). */
  readonly user = computed(() => this.users().find((u) => u.id === this.sessionId()) ?? null);
  readonly isLoggedIn = computed(() => this.user() !== null);

  /** Returns an error message, or null if everything went fine. */
  signUp(name: string, grade: string, password: string): string | null {
    const cleanName = name.trim();
    if (!cleanName) return 'Please write your name.';
    if (!grade) return 'Please choose your grade.';
    if (password.length < 4) return 'Your password needs at least 4 characters.';
    if (this.findByName(cleanName)) return 'That name is already taken. Try adding your last name.';

    const user: User = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      name: cleanName,
      grade,
      password,
      createdAt: new Date().toISOString(),
      progress: {},
    };
    this.saveUsers([...this.users(), user]);
    this.startSession(user.id);
    return null;
  }

  /** Returns an error message, or null if the login worked. */
  login(name: string, password: string): string | null {
    const user = this.findByName(name.trim());
    if (!user || user.password !== password) return 'Wrong name or password. Please try again.';
    this.startSession(user.id);
    return null;
  }

  logout(): void {
    this.sessionId.set(null);
    localStorage.removeItem(SESSION_KEY);
  }

  /** Saves changes made to the current user (used by ProgressService). */
  updateUser(changed: User): void {
    this.saveUsers(this.users().map((u) => (u.id === changed.id ? changed : u)));
  }

  private findByName(name: string): User | undefined {
    const key = name.toLowerCase();
    return this.users().find((u) => u.name.toLowerCase() === key);
  }

  private startSession(id: string): void {
    this.sessionId.set(id);
    localStorage.setItem(SESSION_KEY, JSON.stringify(id));
  }

  private saveUsers(users: User[]): void {
    this.users.set(users);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  private read<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }
}
