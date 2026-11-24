import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly registerForm = this.fb.nonNullable.group({
    name: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    password: ['', [
      Validators.required,
      Validators.minLength(6)
    ]],

    confirmPassword: ['', [
      Validators.required
    ]]
  });
  isPasswordMismatch(): boolean {
  const password = this.registerForm.controls.password.value;
  const confirmPassword = this.registerForm.controls.confirmPassword.value;

  return password !== confirmPassword;
}

  onSubmit(): void {

  if (this.registerForm.invalid || this.isPasswordMismatch()) {
    this.registerForm.markAllAsTouched();
    return;
  }

  const { name, email, password } =
    this.registerForm.getRawValue();

  const success = this.authService.register(
    name,
    email,
    password
  );

  if (success) {
    this.router.navigate(['/chat']);
  }
 }

}