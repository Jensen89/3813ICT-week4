import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


export interface User {
  username: string;
  birthdate: string;
  age: number;
  email: string;
  valid: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/user'; // Replace with your backend API URL
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
};

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrl, { email, password }, this.httpOptions);
  }

  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile/update`, user, this.httpOptions);
  }

  storeUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getStoredUser(): User | null {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      return JSON.parse(userString) as User;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.getStoredUser() !== null;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  clearStorage(): void {
    localStorage.clear();
  }
  
}
