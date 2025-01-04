import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Add email validation
      password: ['', [Validators.required, Validators.minLength(6)]] // Add password validation
    });
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    // Prepare the login credentials to send to the backend
    const loginData = { email, password };

    this.http.post('http://localhost:3000/users/login', loginData)
      .subscribe(
        (response: any)=>{
          if(response.token){
            localStorage.setItem('token', response.token);  // Store the JWT token in local storage
            this.router.navigate(['dashboard']).then(r => console.log(r));
          }
          else{
            alert('Invalid email or password.');
          }
        }
      )
  }
}
