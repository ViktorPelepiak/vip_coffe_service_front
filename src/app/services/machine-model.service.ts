import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CustomResponse} from "../models/customResponse";
import {HTTP_OPTIONS, SERVER_URL} from "../config/http-config";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class MachineModelService {

  constructor(private http: HttpClient) {
  }

  getAllModels() : Observable<CustomResponse> {
    return this.http.get<CustomResponse>(SERVER_URL + `/machine/models/`, HTTP_OPTIONS);
  }

  saveModel(newBrandName: String, newModelName: String) : Observable<CustomResponse> {
    return this.http.post<CustomResponse>(
      SERVER_URL + `/machine/models/`,
      {
        "brand" : newBrandName,
        "model" : newModelName
      },
      HTTP_OPTIONS
    )
  }

  editModel(modelId: bigint, brandName: string, modelName:string) : Observable<CustomResponse> {
    return this.http.put<CustomResponse>(
      SERVER_URL + '/machine/models/',
      {
        "id" : modelId,
        "brandName" : brandName,
        "modelName" : modelName
      },
      HTTP_OPTIONS
    )
  }

  deleteModel(modelId : bigint) : Observable<CustomResponse> {
    return this.http.delete<CustomResponse>(
      SERVER_URL + `/machine/models/` + modelId,
      HTTP_OPTIONS
    );
  }

  getAllModelsForBrandWithId(brandId: number) {
    return this.http.get<CustomResponse>(SERVER_URL + `/machine/models/for_brand/` + brandId, HTTP_OPTIONS);
  }
}
