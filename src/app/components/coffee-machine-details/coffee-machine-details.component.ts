import {Component} from '@angular/core';
import {MachineFull} from "../../models/coffeeMachine";
import {CoffeeMachineService} from "../../services/coffee-machine.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskShort} from "../../models/task";
import {TaskService} from "../../services/task.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-coffee-machine-details',
  templateUrl: './coffee-machine-details.component.html',
  styleUrls: ['./coffee-machine-details.component.css']
})
export class CoffeeMachineDetailsComponent {

  machine: MachineFull;
  tasks : TaskShort[] = [];
  isLoggedUserAdminOrMaster : boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthenticationService,
              private machineService: CoffeeMachineService,
              private router: Router,
              private taskService: TaskService) {
    this.isLoggedUserAdminOrMaster = authService.isMaster() || authService.isAdmin();
    let machineId = this.activatedRoute.snapshot.paramMap.get('machineId');
    this.machine = new MachineFull(0,"","","","","","",[]);

    if (machineId != null) {
      machineService.getMachineById(machineId).subscribe(response => {
        this.machine = response.result;
      })

      this.taskService.getAllForMachineWithId(machineId).subscribe( response => {
        this.tasks = response.result;
      })
    }
  }

  showTaskDetails(taskId: number) {
    this.router.navigate(['/coffee_machine/' + this.machine.id + '/task/' + taskId]);
  }

  addTask() {
    this.router.navigate(['/coffee_machine/' + this.machine.id + '/task']);
  }
}
