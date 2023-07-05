import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {APP_CONFIG, IAppConfig} from '../app.config';
import {HTTP_OPTIONS, SERVER_URL} from "../config/http-config";
import {CustomResponse} from "../models/customResponse";

@Injectable({providedIn: 'root'})
export class UserService {

  // constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  constructor(private http: HttpClient) {
  }

  public getFirst(): Observable<User> {
    return this.http.get<User>(SERVER_URL + '/user');
  }

  public postUser(user: User): Observable<User> {
    return this.http.post<User>(SERVER_URL + '/user', user);
  }

  public register(user: User): Observable<User> {
    console.log(user);
    // return this.http.post<User>(SERVER_URL + `/registration`, user);
    return this.http.post<User>(SERVER_URL + `/security/registration`, user, HTTP_OPTIONS);
  }
  public confirmRegistration(token: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(SERVER_URL + `/security/token/verification?token=` + token, HTTP_OPTIONS);
  }

  public resendConfirmationToken(token: string): Observable<string> {
    return this.http.get(SERVER_URL + `/security/token/update?token=` + token, {responseType: 'text'});
  }
}
