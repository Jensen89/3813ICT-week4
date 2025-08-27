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
  editAge: number = 0;


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
    console.log('=== SAVE PROFILE CALLED ===');
    console.log('Current edit values:', {
      editUsername: this.editUsername,
      editBirthdate: this.editBirthdate,
      editAge: this.editAge
    });


    if (this.user) {
      const updatedUser: User = {
        username: this.editUsername,
        birthdate: this.editBirthdate,
        age: this.editAge,
        email: this.user.email,
        valid: true 
      };

      console.log('Sending to server:', updatedUser);

      this.authService.updateProfile(updatedUser).subscribe({
        next: (response) => {
          console.log('Server response:', response);

          this.authService.storeUser(response);
          this.user = response;
          this.editMode = false;
          this.successMessage = 'Profile updated successfully!';

          console.log('Profile updated, new user data:', this.user);

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
    this.loadEditValues();
    this.successMessage = '';
  }
}
