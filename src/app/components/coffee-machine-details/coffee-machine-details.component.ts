import {Component} from '@angular/core';
import {MachineFull} from "../../models/coffeeMachine";
import {CoffeeMachineService} from "../../services/coffee-machine.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-coffee-machine-details',
  templateUrl: './coffee-machine-details.component.html',
  styleUrls: ['./coffee-machine-details.component.css']
})
export class CoffeeMachineDetailsComponent {

  machine: MachineFull;

  constructor(private activatedRoute: ActivatedRoute,
              private machineService: CoffeeMachineService) {
    let machineId = this.activatedRoute.snapshot.paramMap.get('machineId');
    this.machine = new MachineFull(0,"","","","","","",[]);

    if (machineId != null) {
      machineService.getMachineById(machineId).subscribe(response => {
        this.machine = response.result;
        console.log(JSON.stringify(this.machine))
      })
    }
  }
}
