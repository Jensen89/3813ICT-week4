import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

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

  constructor(private router: Router, private authService: AuthService) { }

  login(): void {

    //Clear previous error message
    this.errorMessage = '';

    //Call the AuthService to perform login
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.valid) {
          this.authService.storeUser(response);
          console.log('Login successful');

          // Navigate to profile page on successful login
          this.router.navigate(['/profile']);
        } else {
          this.errorMessage = 'Invalid email or password. Please try again.';
          this.password = ''; // Clear password field
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'An error occurred during login. Please try again later.';
        this.password = ''; // Clear password field
      }
    });
  }
}
