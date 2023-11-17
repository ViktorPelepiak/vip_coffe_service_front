import { Component } from '@angular/core';
import {MachineShort, TemplateShort} from "../../models/coffeeMachine";
import {CoffeeMachineService} from "../../services/coffee-machine.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-coffee-machine-all',
  templateUrl: './coffee-machine-all.component.html',
  styleUrls: ['./coffee-machine-all.component.css']
})
export class CoffeeMachineAllComponent {

  templates : TemplateShort[] = [];
  machines : MachineShort[] = [];

  constructor(private coffeeMachineService : CoffeeMachineService,
              private router: Router
  ) {
    this.coffeeMachineService.getAllTemplates().subscribe( response => {
      this.templates = response.result;
    })

    this.coffeeMachineService.getAllMachines().subscribe(response => {
      this.machines = response.result;
    })
  }

  createMachineFromTemplate(templateId: number) {
    this.router.navigate([('/coffee_machine/new/' + templateId)]);
  }

  loadDetailInformation(machineId: number) {
    this.router.navigate([('/coffee_machine/' + machineId)]);
  }
}
