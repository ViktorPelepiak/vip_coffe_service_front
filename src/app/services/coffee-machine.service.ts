import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HTTP_OPTIONS, SERVER_URL} from "../config/http-config";
import {PartTypeWithCharacteristic} from "../models/partTypeWithCharacteristic";
import {Observable} from "rxjs";
import {CustomResponse} from "../models/customResponse";

@Injectable({providedIn: 'root'})
export class CoffeeMachineService {

  constructor(private http: HttpClient) {
  }

  getAllMachines() : Observable<CustomResponse> {
    return this.http.get<CustomResponse>(SERVER_URL + '/machines', HTTP_OPTIONS);
  }

  getAllTemplates() : Observable<CustomResponse> {
    return this.http.get<CustomResponse>(SERVER_URL + '/machines/template', HTTP_OPTIONS);
  }

  saveTemplate(modelId: number, partTypesWithCharacteristics: PartTypeWithCharacteristic[]): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(
      SERVER_URL + '/machines/template',
      {
        "modelId": modelId,
        "partTypesWithCharacteristics": partTypesWithCharacteristics
      },
      HTTP_OPTIONS)
  }

  saveMachine(modelId: number, partTypesWithCharacteristics: PartTypeWithCharacteristic[], uniqMachineNumber: string,
  warrantyEndDate: string, additionalInformation: string): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(
      SERVER_URL + '/machines',
      {
        "modelId": modelId,
        "uniqMachineNumber" : uniqMachineNumber,
        "warrantyEndDate" : warrantyEndDate,
        "partTypesWithCharacteristics": partTypesWithCharacteristics,
        "additionalInformation" : additionalInformation
      },
      HTTP_OPTIONS
    )
  }

  getTemplateById(templateId : string) : Observable<CustomResponse> {
    return this.http.get<CustomResponse>(SERVER_URL + '/machines/template/' + templateId, HTTP_OPTIONS)
  }

  isMachineWithUniqNumberExist(uniqNumber : string) : Observable<CustomResponse> {
    return this.http.get<CustomResponse>(SERVER_URL + '/machines/exist/' + uniqNumber, HTTP_OPTIONS)
  }

  getMachineById(machineId: string) : Observable<CustomResponse> {
    return this.http.get<CustomResponse>(SERVER_URL + '/machines/' + machineId, HTTP_OPTIONS)
  }

  getMyMachines() : Observable<CustomResponse> {
    return this.http.get<CustomResponse>(SERVER_URL + '/machines/my', HTTP_OPTIONS)
  }

  addMachineWithNumber(uniqNumber: string) : Observable<CustomResponse> {
    return this.http.post<CustomResponse>(SERVER_URL + '/machines/add', uniqNumber, HTTP_OPTIONS);
  }
}
