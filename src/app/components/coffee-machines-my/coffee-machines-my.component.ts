import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MachineShort} from "../../models/coffeeMachine";
import {CoffeeMachineService} from "../../services/coffee-machine.service";

@Component({
  selector: 'app-coffee-machines-my',
  templateUrl: './coffee-machines-my.component.html',
  styleUrls: ['./coffee-machines-my.component.css']
})
export class CoffeeMachinesMyComponent {

  machines : MachineShort[] = [];

  constructor(private router: Router,
              private machineService: CoffeeMachineService
  ) {
    machineService.getMyMachines().subscribe( response => {
      this.machines = response.result;
    })
  }

  loadDetailInformation(machineId: number) {
    this.router.navigate([('/coffee_machines/' + machineId)]);
  }

  sendSaveRequest() {
    // @ts-ignore
    let uniqNumber = document.getElementById("uniqNumber").value;
    if (uniqNumber.length > 0) {
      this.machineService.addMachineWithNumber(uniqNumber).subscribe(response => {
        if (response.success) {
          this.machineService.getMyMachines().subscribe( response => {
            this.machines = response.result;
          })
        } else {
          alert("Кавового апарата з таким номером не знайдено або він зареєстрований на іншого користувача.\nБудь ласка, зверніться до адміністратора")
        }
      })
    }

  }
}
