import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private users = [
    { email: 'user1@example.com', password: 'password123' },
    { email: 'admin@example.com', password: 'admin123' },
    { email: 'test@example.com', password: 'test123' }
  ];

  constructor(private router: Router) { }

  login(): void {

    //Clear previous error message
    this.errorMessage = '';

    const validUser = this.users.find(user => user.email === this.email && user.password === this.password);

    if (validUser) {
      // Navigate to profile page on successful login
      this.router.navigate(['/profile']);
    } else {
      // Show error message on failed login
      this.errorMessage = 'Invalid email or password. Please try again.';
      this.password = ''; // Clear password field
    }
  }
}

