
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

step:number=1;
private readonly _AuthService=inject(AuthService)
private readonly _Router=inject(Router)


verifyEmail:FormGroup=new FormGroup({
email:new FormControl(null,[Validators.required,Validators.email])


})
verifyCode: FormGroup = new FormGroup({
  restCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{0,9}$/)])
});



resetPassword:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]),
  
  newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)])
  })
 
  


  verifyEmailSubmit():void{
this._AuthService.setEmailVerfiy(this.verifyEmail.value).subscribe({
  next: (res) => {console.log(res);

    if(res.statusMsg==="success"){
this.step=2;
    }
  },
  error: (err) => {console.log(err)}

})
  }




  // verifycodeSubmit(): void {
  //   console.log(this.verifyCode.value);  // Debugging line to check form values
  //   this._AuthService.setcodeVerfiy(this.verifyCode.value).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       if (res.status=== "Success") {
  //         this.step = 3;
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }
  verifycodeSubmit(): void {
    console.log('Form value before submission:', this.verifyCode.value);  // Add this line to debug
  
    if (this.verifyCode.invalid) {
      console.error('Form is invalid:', this.verifyCode.errors);
      return;
    }
  
    this._AuthService.setcodeVerfiy(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log('API response:', res);
        if (res.status === "Success") {
          this.step = 3;
        }
      },
      error: (err) => {
        console.error('API error:', err);  // Log the error from API
      }
    });
  }


  resetPasswordSubmit():void{
this._AuthService.setRestPassword(this.resetPassword.value).subscribe({
  next: (res) => {console.log(res);

   localStorage.setItem('userToken',res.token)

this._AuthService.saveUserData()

   this._Router.navigate(['/home'])
  },
  error: (err) => {console.log(err)}

})
  }








}
