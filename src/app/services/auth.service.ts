import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private apiUrl = 'http://localhost:3000/users'; // db.json users endpoint

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          this.isAuthenticated = true;
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('loggedInUser');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('loggedInUser');
  }
}
