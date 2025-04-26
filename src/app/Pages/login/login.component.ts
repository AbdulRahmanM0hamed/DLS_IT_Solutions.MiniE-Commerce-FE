import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder ,private _AuthService: AuthService ,private _router:Router, private _messageService:MessageService) {}

  ngOnInit(): void {
    this.initForm();
  }

  // Initialize the Reactive Form
  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this._AuthService.login({email: formData.email, password: formData.password }).subscribe({
        next:(res)=>{
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login successful!'
          });
          this._router.navigate(['/Products']);          
        },
        error: (err) => {
          this._messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: err.error?.message || 'An error occurred during login.'
          });
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onRegister() {
    this._router.navigate(['/register']);
  }
}