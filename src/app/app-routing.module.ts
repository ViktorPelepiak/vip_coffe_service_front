import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/security/login/login.component";
import {RegistrationComponent} from "./components/security/registration/registration.component";
import {ConfirmationComponent} from "./components/security/confirmation/confirmation.component";
import {AdministrationBrandsComponent} from "./components/administration-brands/administration-brands.component";
import {AdministrationModelsComponent} from "./components/administration-models/administration-models.component";
import {
  AdministrationPartTypesComponent
} from "./components/administration-part-types/administration-part-types.component";
import {
  AdministrationCharacteristicTypesComponent
} from "./components/administration-characteristic-types/administration-characteristic-types.component";
import {CoffeeMachineNewComponent} from "./components/coffee-machine-new/coffee-machine-new.component";
import {CoffeeMachineAllComponent} from "./components/coffee-machine-all/coffee-machine-all.component";
import {CoffeeMachineDetailsComponent} from "./components/coffee-machine-details/coffee-machine-details.component";
import {ServiceTaskComponent} from "./components/service-task/service-task.component";
import {CoffeeMachinesMyComponent} from "./components/coffee-machines-my/coffee-machines-my.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "user/verification", component:ConfirmationComponent},
  {path: "administration/brands", component:AdministrationBrandsComponent},
  {path: "administration/models", component:AdministrationModelsComponent},
  {path: "administration/part_types", component:AdministrationPartTypesComponent},
  {path: "administration/characteristics", component:AdministrationCharacteristicTypesComponent},
  {path: "coffee_machines/new", component: CoffeeMachineNewComponent},
  {path: "coffee_machines/new/:templateId", component: CoffeeMachineNewComponent},
  {path: "coffee_machines", component:CoffeeMachineAllComponent},
  {path: "coffee_machines/:machineId", component: CoffeeMachineDetailsComponent},
  {path: "coffee_machines/:machineId/task", component: ServiceTaskComponent},
  {path: "coffee_machines/:machineId/task/:taskId", component: ServiceTaskComponent},
  {path: "my_machines", component: CoffeeMachinesMyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
