

import { Routes } from '@angular/router';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AdminComponent } from './component/admin/admin.component';
import { UsersComponent } from './component/users/users.component';



export const routes: Routes = [
    {path:'', component: LandingPageComponent},
    {path:'signup', component: RegisterComponent},
    {path:'login', component: LoginComponent},
    {path:'users', component: UsersComponent},
    {path:'admin', component: AdminComponent}



];
