import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomResponse} from "../models/customResponse";
import {HTTP_OPTIONS, SERVER_URL} from "../config/http-config";

@Injectable({providedIn: 'root'})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  getAllTaskTypes() : Observable<CustomResponse> {
    return this.http.get<CustomResponse>(SERVER_URL + '/task/types', HTTP_OPTIONS);
  }

  getAllTaskStatuses() : Observable<CustomResponse> {
    return this.http.get<CustomResponse>(SERVER_URL + '/task/statuses', HTTP_OPTIONS);
  }

  getAllMasters() : Observable<CustomResponse> {
    return this.http.get<CustomResponse>(SERVER_URL + '/task/masters', HTTP_OPTIONS);
  }

  getAllForMachineWithId(machineId: string) : Observable<CustomResponse> {
    return this.http.get<CustomResponse>(SERVER_URL + `/task/for_machine/` + machineId, HTTP_OPTIONS);
  }

  getTaskInfoById(taskId : string) : Observable<CustomResponse> {
    return this.http.get<CustomResponse>(SERVER_URL + '/task/' + taskId, HTTP_OPTIONS);
  }

  save(saveRequestBody: any) : Observable<CustomResponse> {
    return this.http.post<CustomResponse>(SERVER_URL + '/task', saveRequestBody, HTTP_OPTIONS);
  }

  edit(editRequestBody: any) : Observable<CustomResponse> {
    return this.http.put<CustomResponse>(SERVER_URL + '/task', editRequestBody, HTTP_OPTIONS);
  }
}
