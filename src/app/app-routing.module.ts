import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/security/login/login.component";
import {RegistrationComponent} from "./components/security/registration/registration.component";
import {ConfirmationComponent} from "./components/security/confirmation/confirmation.component";
import {AdministrationComponent} from "./components/administration/administration.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "user/verification", component:ConfirmationComponent},
  {path: "administration", component:AdministrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
