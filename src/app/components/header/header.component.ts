import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent {
  isUserLoggedIn : Boolean
  isLoggedUserIsAdmin : Boolean


  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
    this.isLoggedUserIsAdmin = this.authService.isAdmin()
  }

  handleLogout() {
    this.authService.logout();
  }
}
