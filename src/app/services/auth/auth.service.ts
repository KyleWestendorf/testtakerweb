import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async login(username: string, password: string): Promise<boolean> {
    if(this.isAuthenticated()) {
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
    return (
      !!this.auth.currentUser
    );
  }

  logout(): void {
    this.auth.signOut();
  }
}
