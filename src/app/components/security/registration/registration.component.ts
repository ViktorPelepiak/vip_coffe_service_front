import { Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {UserService} from "../../../services/user.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm : any;
  loading = false;
  submitted = false;
  returnUrl = '';
  error = '';

  constructor(
    // @Inject(APP_CONFIG) private config: IAppConfig,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // private toast: ToastService,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit() {

    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(4) ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8) ]],
      passwordConfirmation: ['', [Validators.required,Validators.minLength(8) ]]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.registrationForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }
    console.log(this.registrationForm.get("password").value);
    console.log(this.registrationForm.get("passwordConfirmation").value);
    console.log("password comparation result -> " + (this.registrationForm.get("password").value != this.registrationForm.get("passwordConfirmation").value));
    if (this.registrationForm.get("password").value != this.registrationForm.get("passwordConfirmation").value) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registrationForm.value)
      .pipe(first())
      .subscribe(
        data => {
          // this.toast.success("Please check your email and confrim registration");
          this.router.navigate(['/user/verification']);
        },
        error => {
          // this.toast.error(error.error);
          this.loading = false;
          this.router.navigate(['/']);

        });
  }
}
