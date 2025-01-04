import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule
  ]
})
export class ProfileComponent implements OnInit {
  user = {
    name: 'John Doe',
    email: 'john.doe@test.com',
    role: 'Admin',
  };

  profileForm!: FormGroup;
  changePasswordForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initializing form groups for profile information and password change
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      role: [this.user.role, Validators.required],
    });

    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }
    this.user = { ...this.profileForm.value };
    alert('Profile updated successfully!');
  }

  changePassword(): void {
    if (this.changePasswordForm.invalid) {
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = this.changePasswordForm.value;

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    alert('Password changed successfully!');
    this.changePasswordForm.reset();
  }

  logout(): void {
    alert('Logged out successfully!');
    this.router.navigate(['/auth']);
  }

  editProfile() {
    this.router.navigate(['/profile/edit']);
  }
}
