

import { Component} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule,Validators,ReactiveFormsModule } from '@angular/forms';
 import { CommonModule } from '@angular/common';
import { AuthServicesService } from '../../services/auth-services.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { users } from '../../interface/userInterface';
// interface registerDetails{
//   userName:string;
//   email: string;
//   password: string

// }


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {

  signUpForm!: FormGroup;
  successMessage: string = '';
  showSuccessMessage:boolean = false;

  constructor(private fb:FormBuilder, public apiConnect:AuthServicesService,  private router: Router){

    this.signUpForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]+$')]],

    });
  }

  onSubmit() {

      if (this.signUpForm.valid) {

        const details: users= this.signUpForm.value;
        this.apiConnect.signUpUser(details).subscribe(response => {
          console.log(response);


        });

        this.successMessage = 'Signup successful';
        this.showSuccessMessage = true;

        this.signUpForm.reset();


          setTimeout(() => {
              this.showSuccessMessage = false;
              this.router.navigate((['/login']));
          }, 2000);



    }
     else {
      this.signUpForm.markAllAsTouched();
    }
  }

  Tologins(){
    this.router.navigate((['/login']));
  }


}

