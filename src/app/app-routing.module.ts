import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/security/login/login.component";
import {RegistrationComponent} from "./components/security/registration/registration.component";
import {ConfirmationComponent} from "./components/security/confirmation/confirmation.component";
import {AdministrationComponent} from "./components/administration/administration.component";
import {AdministrationBrandsComponent} from "./components/administration-brands/administration-brands.component";
import {AdministrationModelsComponent} from "./components/administration-models/administration-models.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "user/verification", component:ConfirmationComponent},
  {path: "administration", component:AdministrationComponent},
  {path: "administration/brands", component:AdministrationBrandsComponent},
  {path: "administration/models", component:AdministrationModelsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
