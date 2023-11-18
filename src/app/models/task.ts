export class TaskShort {
  id : number;
  type : string;
  status : string;
  startDate : string;
  endDate : string;
  dueDate : string;
  assignee : string;


  constructor(id: number, type: string, status: string, startDate: string, endDate: string, dueDate: string, assignee: string) {
    this.id = id;
    this.type = type;
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate;
    this.dueDate = dueDate;
    this.assignee = assignee;
  }
}

export class TaskFull {
  id : number;
  type : string;
  status : string;
  estimation : string;
  startDate : string;
  endDate : string;
  dueDate : string;
  assignee : string;
  inputInformation : string;
  outputInformation : string;

  constructor(id: number, type: string, status: string, estimation: string, startDate: string, endDate: string, dueDate: string, assignee: string, inputInformation: string, outputInformation: string) {
    this.id = id;
    this.type = type;
    this.status = status;
    this.estimation = estimation;
    this.startDate = startDate;
    this.endDate = endDate;
    this.dueDate = dueDate;
    this.assignee = assignee;
    this.inputInformation = inputInformation;
    this.outputInformation = outputInformation;
  }
}
