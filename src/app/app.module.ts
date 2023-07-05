import {InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./components/header/header.component";
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/security/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import { RegistrationComponent } from './components/security/registration/registration.component';
import { ConfirmationComponent } from './components/security/confirmation/confirmation.component';
import { AdministrationComponent } from './components/administration/administration.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        LoginComponent,
        RegistrationComponent,
        ConfirmationComponent,
        AdministrationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
      HttpClient
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
