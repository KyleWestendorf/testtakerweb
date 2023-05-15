import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, user, User} from '@angular/fire/auth';
import { Router } from '@angular/router';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User | null = null;
  constructor(private auth: Auth, private router: Router) {
    this.userStream().subscribe((user) => {
      this.currentUser = user;
      this.router.navigate(['/testing']);
    });
  }

  async login(username: string, password: string): Promise<boolean> {
    if (this.isAuthenticated()) {
      return true;
    }

    try {
      await signInWithEmailAndPassword(this.auth, username, password);
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  userStream(): Observable<User | null> {
    return user(this.auth);
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }
}
