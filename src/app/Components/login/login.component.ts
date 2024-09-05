import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  msgSuccess: boolean = false;
  msgError: string = '';
  isLoading: boolean = false;
  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  // loginForm:FormGroup=new FormGroup({

  //   name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  //   email:new FormControl(null,[Validators.required,Validators.email]),
  //   password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  //   rePassword:new FormControl(null),
  //   phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),

  // },this.confirmPassword)

  loginSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this._AuthService.setloginForm(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            console.log(res);

            this.msgSuccess = true;
            setTimeout(() => {
            
              localStorage.setItem('userToken', res.token);
            
            // console.log(this._AuthService.hamad);
            
              this._AuthService.saveUserData();
            // console.log(this._AuthService.userData);
            
              
              this._Router.navigate(['/home']);
            }, 2000);
          }

          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          console.log(err);
          this.isLoading = false;
        },
      });
      // console.log(this.loginForm);
    } else {
      this.loginForm.setErrors({ mismatch: true });
      this.loginForm.markAllAsTouched();
    }
  }
}
