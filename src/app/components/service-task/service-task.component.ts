import { Component } from '@angular/core';
import {TaskFull} from "../../models/task";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {PairOfStrings} from "../../models/PairOfStrings";

@Component({
  selector: 'app-service-task',
  templateUrl: './service-task.component.html',
  styleUrls: ['./service-task.component.css']
})
export class ServiceTaskComponent {
  taskInfo : TaskFull;
  taskId : string |null;
  machineId : string |null;

  types : PairOfStrings[] = [];
  statuses: PairOfStrings[] = [];
  masters : PairOfStrings[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private taskService: TaskService) {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('taskId');
    this.machineId = this.activatedRoute.snapshot.paramMap.get('machineId');

    taskService.getAllTaskTypes().subscribe( response => {
      this.types = response.result;
    })

    taskService.getAllTaskStatuses().subscribe( response => {
      this.statuses = response.result;
    })

    taskService.getAllMasters().subscribe(response => {
      this.masters = response.result;
    })


    this.taskInfo = new TaskFull(0, "", "", "", "", "", "", "", "", "");
    if (this.taskId == null) {
      return;
    }

    taskService.getTaskInfoById(this.taskId).subscribe( response => {
      this.taskInfo = response.result;

      console.log("type => " + this.taskInfo.type)
      this.setValueForFieldWithId("typeSelect", this.taskInfo.type);
      this.setValueForFieldWithId("statusSelect", this.taskInfo.status);
      this.setValueForFieldWithId("assigneeSelect", this.taskInfo.assignee);
      this.setValueForFieldWithId("estimation", this.taskInfo.estimation);
      this.setValueForFieldWithId("startDate", this.taskInfo.startDate);
      this.setValueForFieldWithId("endDate", this.taskInfo.endDate);
      this.setValueForFieldWithId("dueDate", this.taskInfo.dueDate);
      this.setValueForFieldWithId("inputInfo", this.taskInfo.inputInformation);
      this.setValueForFieldWithId("outputInfo", this.taskInfo.outputInformation);
    })
  }

  sendSaveRequest() {
    this.taskService.save(this.prepareSaveRequestBody()).subscribe( response => {
      if (response.success) {
        this.router.navigate(['/coffee_machine/' + this.machineId])
      }
    })
  }

  sendEditRequest() {
    this.taskService.edit(this.prepareEditRequestBody()).subscribe( response => {
      if (response.success) {
        this.router.navigate(['/coffee_machine/' + this.machineId])
      }
    })
  }

  private prepareSaveRequestBody() {
    // @ts-ignore
    var type = document.getElementById("typeSelect").value;
    // @ts-ignore
    var status = document.getElementById("statusSelect").value;
    // @ts-ignore
    var estimation = document.getElementById("estimation").value;
    // @ts-ignore
    var startDate = document.getElementById("startDate").value;
    // @ts-ignore
    var endDate = document.getElementById("endDate").value;
    // @ts-ignore
    var dueDate = document.getElementById("dueDate").value;
    // @ts-ignore
    var assignee = document.getElementById("assigneeSelect").value;
    // @ts-ignore
    var inputInformation = document.getElementById("inputInfo").value;
    // @ts-ignore
    var outputInformation = document.getElementById("outputInfo").value;

    return {
      "machineId" : this.machineId,
      "type" : type,
      "status" : status,
      "estimation" : estimation,
      "startDate" : startDate,
      "endDate" : endDate,
      "dueDate" : dueDate,
      "assignee" : assignee,
      "inputInformation" : inputInformation,
      "outputInformation" : outputInformation
    }
  }

  private prepareEditRequestBody() {
    var requestBody = this.prepareSaveRequestBody();
    // @ts-ignore
    requestBody["id"] = this.taskId;
    return requestBody;
  }

  private setValueForFieldWithId(field_id : string, value : string) {
    // @ts-ignore
    document.getElementById(field_id).value = value;
  }
}
