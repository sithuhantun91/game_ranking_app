import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UserService} from "./services/user.service";
import { UserListComponent } from './components/user-list/user-list.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { PascalCasePipe } from './common/pascal-case.pipe';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AddNewUserComponent } from './components/add-new-user/add-new-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { MyClanComponent } from './components/my-clan/my-clan.component';
import { SearchClanComponent } from './components/search-clan/search-clan.component';
import { CreateNewClanComponent } from './components/create-new-clan/create-new-clan.component';
import { PlayBattleComponent } from './components/play-battle/play-battle.component';
import { BattleLogComponent } from './components/battle-log/battle-log.component';
import { LeaderboardsComponent } from './components/leaderboards/leaderboards.component';
import {NgOptimizedImage} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from 'ngx-webstorage';

import {AuthInterceptorService} from "./services/auth-interceptor.service";

import {OktaAuthModule, OKTA_CONFIG, OKTA_AUTH, OktaAuthStateService} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import {oktaAuth} from './config/okta-config';

// import {
//   OktaAuthGuard,
//   OktaAuthModule,
//   OktaCallbackComponent,
//   OKTA_CONFIG, OKTA_AUTH
// } from '@okta/okta-angular';

// import {OktaAuth} from "@okta/okta-auth-js";
// import {Router} from "@angular/router";

// const oktaConfig = myAppConfig.oidc;
//
// const oktaAuth = new OktaAuth(oktaConfig);

// function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
//   // Use injector to access any service available within your application
//   const router = injector.get(Router);
//
//   // Redirect the user to your custom login page
//   router.navigate(['/login']);
// }

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UserListComponent,
    NavigationBarComponent,
    PascalCasePipe,
    UserProfileComponent,
    AddNewUserComponent,
    UpdateUserComponent,
    MyClanComponent,
    SearchClanComponent,
    CreateNewClanComponent,
    PlayBattleComponent,
    BattleLogComponent,
    LeaderboardsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoginComponent,
    NgOptimizedImage,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [UserService, SessionStorageService,
              // { provide: OKTA_CONFIG, useValue: { oktaAuth }},
              // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
    { provide: OKTA_AUTH, useValue: oktaAuth },
    OktaAuthStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
