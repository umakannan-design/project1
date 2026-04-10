import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserRegister } from '../../../../shared/model/user-register';
import { finalize } from 'rxjs/operators';
import { MaterialModule } from '../../../../shared/material.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MaterialModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  form!: FormGroup;
  loading = signal(false); 
  errorMsg: string = '';
  successMsg: string = '';
  roleArray = [
    { name: 'Admin', value: 'Admin' },
    { name: 'Manager', value: 'Manager' },
    { name: 'Employee', value: 'Employee' }
  ];

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.formInitialise();
  }

  formInitialise(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['User']
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.errorMsg = '';

    const user: UserRegister = this.form.value;

    this.auth.userRegistration(user).subscribe({
      next: (data: any) => {
        this.loading.set(false);
        console.log(data);

        this.successMsg = data.message;
        this.errorMsg = ''; // clear error
        this.form.reset();
        this.router.navigate(['login']);
      },

      error: (err) => {
        this.loading.set(false);

        console.log('Full Error:', err);

        this.errorMsg =
          err?.error?.message ||
          err?.error ||
          err?.message ||
          'Something went wrong!';
        console.log( this.errorMsg);
        this.successMsg = '';
      }
    });
  }
}