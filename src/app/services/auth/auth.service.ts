import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }

  login(username: string, password: string): Observable<boolean> {
    // TODO: Maybe move this logic to the backend service?
    if (username === 'admin' && password === 'test') {
      this.cookieService.set('access_token', 'your-access-token');
      return of(true);
    }
    return of(false);
  }

  isAuthenticated(): boolean {
    return this.cookieService.check('access_token') && this.cookieService.get('access_token') === 'your-access-token';
  }

  logout(): void {
    this.cookieService.delete('access_token');
  }
}
