import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../services/auth';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})


export class Profile implements OnInit {
  user: User | null = null;
  editMode: boolean = false;
  successMessage: string = '';

  editUsername: string = '';
  editBirthdate: string = '';
  editAge: number | null = null;
  editEmail: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    const storedUser = this.authService.getStoredUser();

    if (storedUser) {
      this.user = storedUser;
      this.loadEditValues();
    } else {
      // If no user is stored, redirect to login
      console.log('No user found, redirecting to login.');
      this.router.navigate(['/login']);
    }
  }

  loadEditValues(): void {
    if (this.user) {
      this.editUsername = this.user.username;
      this.editBirthdate = this.user.birthdate;
      this.editAge = this.user.age;
      this.editEmail = this.user.email;
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.successMessage = '';

    if (this.editMode) {
      this.loadEditValues();
    }
  }

  saveProfile(): void {
    if (this.user) {
      const updatedUser: User = {
        username: this.editUsername,
        birthdate: this.editBirthdate,
        age: this.editAge || 0,
        email: this.editEmail,
        valid: true // This field is not used in update but required by interface
      };

      this.authService.updateProfile(updatedUser).subscribe({
        next: (response) => {
          this.user = response;
          this.authService.storeUser(response);
          this.successMessage = 'Profile updated successfully!';
          this.editMode = false;

          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          console.error('Profile update error:', error);
          alert('An error occurred while updating the profile. Please try again later.');
        }
      });
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.successMessage = '';
    this.loadEditValues(); //Reset values to stored user data
  }

}
