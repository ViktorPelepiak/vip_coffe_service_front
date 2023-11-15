import { Component } from '@angular/core';
import {TemplateShort} from "../../models/coffeeMachine";
import {CoffeeMachineService} from "../../services/coffee-machine.service";

@Component({
  selector: 'app-coffee-machine-all',
  templateUrl: './coffee-machine-all.component.html',
  styleUrls: ['./coffee-machine-all.component.css']
})
export class CoffeeMachineAllComponent {

  templates : TemplateShort[] = [];


  constructor(private coffeeMachineService : CoffeeMachineService) {
    this.coffeeMachineService.getAllTemplates().subscribe( response => {
      this.templates = response.result;

      console.log(JSON.stringify("templates => " + this.templates))
    })
  }
}
