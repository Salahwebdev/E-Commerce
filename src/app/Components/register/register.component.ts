import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

private readonly _AuthService=inject(AuthService);
private readonly _FormBuilder=inject(FormBuilder);
private readonly _Router=inject(Router);


msgSuccess:boolean=false;
msgError:string="";
isLoading:boolean=false; 
registerForm:FormGroup=this._FormBuilder.group({


  name:[null ,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
  email:[null ,[Validators.required,Validators.email]],
  password:[null ,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
  rePassword:[null ],
  phone:[null ,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
},{validator:[this.confirmPassword]})






registerSub!:Subscription


registerSubmit():void{

  if(this.registerForm.valid){

this.isLoading=true;

  this.registerSub=  this._AuthService.setRegisterForm(this.registerForm.value).subscribe({

      next:(res)=>{
        if(res.message === 'success'){
          this.msgSuccess=true;
         setTimeout(() => {
          this._Router.navigate(['/login'])
         }, 2000);
        }

        this.isLoading=false;
        
      },
      error:(err:HttpErrorResponse)=>{
        this.msgError=err.error.message;
        console.log(err);
        this.isLoading=false;
        
      }
    })
    console.log(this.registerForm);




  }else{
    this.registerForm.setErrors({mismatch:true})
    this.registerForm.markAllAsTouched()
  }
  
  
}

ngOnDestroy(): void {
  this.registerSub?.unsubscribe();
}

// custom validation
confirmPassword(g:AbstractControl){

  if(g.get('password')?.value===g.get('rePassword')?.value)
  {
return null
  }
  else{
    return {mismatch:true}
  }
}



}
