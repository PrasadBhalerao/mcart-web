// login.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service'; // Create this service
import { Router, RouterModule } from '@angular/router'; // For routing
import { CommonModule } from '@angular/common'; // For *ngIf, etc.

@Component({
  selector: 'app-login',
  standalone: true, // Make it standalone
  imports: [ReactiveFormsModule, CommonModule, RouterModule], // Import necessary modules
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder); // Inject FormBuilder
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  ngOnInit() { // Use ngOnInit for initialization
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.errorMessage = '';
    this.isLoading = true;

    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Login successful:', response);
          this.router.navigate(['products']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Invalid email or password.';
          console.error('Login error:', error);
        }
      });
    } else {
      this.isLoading = false;
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
}