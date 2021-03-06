import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { HomeComponent } from './components/home/home.component';
import { PeopleModalComponent } from './components/search/people-card/people-modal/people-modal.component';
import { NavbarHomeComponent } from './reusables/navbar-home/navbar-home.component';
import { NavbarLogedComponent } from './reusables/navbar-loged/navbar-loged.component';
import { PeopleCardComponent } from './components/search/people-card/people-card.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    SearchComponent,
    NavbarHomeComponent,
    NavbarLogedComponent,
    AppLayoutComponent,
    HomeLayoutComponent,
    HomeComponent,
    PeopleModalComponent,
    NavbarHomeComponent,
    NavbarLogedComponent,
    PeopleCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
