import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: false, 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  genders = [
    { name: 'Male', value: 1 },
    { name: 'Female', value: 2 }
  ];
  
  constructor(private fb: FormBuilder ,private _AuthService: AuthService ,private _router:Router, private _messageService:MessageService) {}

  ngOnInit(): void {
    this.initForm();
  }

  // Initialize the Reactive Form
  initForm() {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]], 
      gender : ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this._AuthService.Register({fristName :formData.firstname ,lastName:formData.lastname ,email:formData.email ,
        Gender : Number(formData.gender),phoneNumber:formData.phoneNumber ,password:formData.password }).subscribe({
        next:(res)=>{
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registration successful!'
          });
          this._router.navigate(['/login']);          
        },
        error: (err) => {
          this._messageService.add({
            severity: 'error',
            summary: 'Registration  Failed',
            detail: err.error?.message || 'An error occurred during login.'
          });
        }
      })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  onlogin() {
    this._router.navigate(['/login']);
  }
    
}

