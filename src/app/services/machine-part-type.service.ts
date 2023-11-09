import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomResponse} from "../models/customResponse";
import {HTTP_OPTIONS, SERVER_URL} from "../config/http-config";

@Injectable({providedIn: 'root'})
export class PartTypeService {

  constructor(private http: HttpClient) {
  }

  getAllPartTypes(): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(SERVER_URL + `/machine/part_type/`, HTTP_OPTIONS);
  }

  savePartType(newPartTypeName: string): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(
      SERVER_URL + `/machine/part_type/`,
      {
        "newPartType": newPartTypeName
      },
      HTTP_OPTIONS
    )
  }

  editPartTypeName(partTypeId: bigint, newValue: string): Observable<CustomResponse> {
    return this.http.put<CustomResponse>(
      SERVER_URL + `/machine/part_type/`,
      {
        "id": partTypeId,
        "newValue": newValue
      },
      HTTP_OPTIONS
    );
  }

  deletePartType(partTypeId: bigint): Observable<CustomResponse> {
    return this.http.delete<CustomResponse>(
      SERVER_URL + `/machine/part_type/` + partTypeId,
      HTTP_OPTIONS
    );
  }
}
