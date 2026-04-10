import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginRequest, LoginResponse } from '../../../../shared/model/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  form!: FormGroup;
  loading = signal(false);
  errorMsg = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formInitializing();
  }

  formInitializing(): void {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.errorMsg = '';

    var loginUser: LoginRequest = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }

    this.auth.loginUser(loginUser).subscribe({
      next: (res: LoginResponse) => {
        const token = res.message.token;
        console.log(res);
        if (token) {
          this.auth.setSession(token);          // save token first
          console.log('Token saved:', localStorage.getItem('token')); // verify
          this.router.navigate(['/dashboard']); // then navigate
        } else {
          this.errorMsg = 'No token received';
        }
        // this.auth.setSession(data);
        // this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Login failed';
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
