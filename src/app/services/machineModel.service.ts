import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CustomResponse} from "../models/customResponse";
import {HTTP_OPTIONS, SERVER_URL} from "../config/http-config";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class MachineModelService {

  constructor(private http: HttpClient) {
  }

  getAllBrands() : Observable<CustomResponse> {
    return this.http.get<CustomResponse>(SERVER_URL + `/machine/brand/`, HTTP_OPTIONS);
  }

  saveBrandName(newBrandName: string) : Observable<CustomResponse> {
    return this.http.post<CustomResponse>(
      SERVER_URL + `/machine/brand/`,
      {
        "newBrandName" : newBrandName
      },
      HTTP_OPTIONS
    )
  }

  editBrandName(brandId: bigint, newValue: string) : Observable<CustomResponse> {
    return this.http.put<CustomResponse>(
      SERVER_URL + `/machine/brand/`,
      {
        "brandId" : brandId,
        "newValue" : newValue
      },
      HTTP_OPTIONS
    );
  }
  deleteBrand(brandId: bigint) : Observable<CustomResponse> {
    return this.http.delete<CustomResponse>(
      SERVER_URL + `/machine/brand/` + brandId,
      HTTP_OPTIONS
    );
  }
}
