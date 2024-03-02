import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServicesService } from '../../services/auth-services.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent{

  loginForm!: FormGroup
  displaySuccess=''


  errorMsg!:string
  successMsg!:string

  visible = false
  visible2 = false

    constructor(private fb:FormBuilder, public apiConnect:AuthServicesService, private router:Router){

      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]

      });
    }

    onSubmit() {
      if (this.loginForm.valid) {
        console.log('Form submitted successfully');

        this.apiConnect.loginUser(
          this.loginForm.value.email,
          this.loginForm.value.password
        ).subscribe(response=>{
          console.log(response);
          console.log('happy')
       this.displaySuccess = response.message
       this.errorMsg='Incorrect password'
       let error=response.error
       console.log(error)

       if(response.error){
        this.visible = true
        this.errorMsg = response.error

        setTimeout(() => {
          this.visible = false
        }, 3000);
      }else if(response.message){
        this.visible2 = true
        this.successMsg = response.message
      }







       if(this.loginForm.value.email==='compgodwin@gmail.com'){
        this.router.navigate(['/admin'])
        }
        else{
          this.router.navigate(['/users'])
        }

        if (this.errorMsg) {
          this.errorMsg = response.error;
        }


      })

      setTimeout(() => {
        this.loginForm.reset();
        this.displaySuccess = ''
    }, 2000);



      }

      else {
        console.log('Form has errors');

      }
  }

  Tosignups(){
    this.router.navigate((['/signup']));
  }
}

