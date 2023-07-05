import { Component } from '@angular/core';
import {Params, ActivatedRoute, Router} from '@angular/router';
import {UserService} from "../../../services/user.service";
import {CustomResponse} from "../../../models/customResponse";
import {first} from "rxjs/operators";
import {HttpErrorResponse, HttpParams} from "@angular/common/http";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  routeParams: Params | undefined;
  queryParams: Params;
  pageVisible: boolean| undefined;
  isVerificationSucceeded: boolean| undefined;
  reason: string| undefined;
  submitted = false;
  loading = false;
  isWithoutToken = false;

  tokenResend: any;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private formBuilder: FormBuilder,){
    this.queryParams = new HttpParams();
    this.getRouteParams();

  }

  ngOnInit() {

    if (this.queryParams["token"] != undefined && this.queryParams["token"] != null) {
      this.userService.confirmRegistration(this.queryParams["token"])
        .pipe(first())
        .subscribe(data => {

            let customResponse:CustomResponse = <CustomResponse><unknown>data;

            this.pageVisible = true;
            this.isVerificationSucceeded = customResponse.result;

            if (!this.isVerificationSucceeded) {
              this.reason = customResponse.additionalInformation.REASON;
            }

          },
          (error: HttpErrorResponse) => {
            if (error.status=== 400) {
              this.userService.resendConfirmationToken(this.queryParams["token"])
                .subscribe(()=>{});
              // this.toast.info("Please check your email and confirm registration");
              this.router.navigate(['/']);
            }
          });

      this.tokenResend = this.formBuilder.group({})
    } else {
      this.isWithoutToken = true;
    }
  }

  getRouteParams() {
    this.activatedRoute.params.subscribe(params=> {
      this.routeParams = params;
    });
    this.activatedRoute.queryParams.subscribe(params=> {
      this.queryParams = params;
    });
  }

  onSubmit() {
    this.userService.resendConfirmationToken(this.queryParams["token"])
      .subscribe(()=>{});
  }
}
