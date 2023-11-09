import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomResponse} from "../models/customResponse";
import {HTTP_OPTIONS, SERVER_URL} from "../config/http-config";

@Injectable({providedIn: 'root'})
export class CharacteristicTypeService {

  constructor(private http: HttpClient) {
  }

  getAllCharacteristicTypes(): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(SERVER_URL + `/machine/characteristic_type/`, HTTP_OPTIONS);
  }

  saveCharacteristicType(newCharacteristicType: string, newMeasurementUnit: string): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(SERVER_URL + `/machine/characteristic_type/`,
      {
        "characteristicType" : newCharacteristicType,
        "measurementUnit" : newMeasurementUnit
      },
      HTTP_OPTIONS
    )
  }

  editCharacteristicType(characteristicTypeId: bigint, characteristicTypeName : string, measurementUnit : string)
  :Observable<CustomResponse> {
    return this.http.put<CustomResponse>(
      SERVER_URL + `/machine/characteristic_type/`,
      {
        id : characteristicTypeId,
        newType : characteristicTypeName,
        newMeasurementUnit : measurementUnit
      },
      HTTP_OPTIONS
    )
  }

  deleteCharacteristicType(characteristicTypeId: bigint): Observable<CustomResponse> {
    return this.http.delete<CustomResponse>(
      SERVER_URL + `/machine/characteristic_type/` + characteristicTypeId,
      HTTP_OPTIONS
    );
  }

}
