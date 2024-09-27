import {Injector, NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AddNewUserComponent} from "./components/add-new-user/add-new-user.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {BattleLogComponent} from "./components/battle-log/battle-log.component";
import {CreateNewClanComponent} from "./components/create-new-clan/create-new-clan.component";
import {LeaderboardsComponent} from "./components/leaderboards/leaderboards.component";
import {MyClanComponent} from "./components/my-clan/my-clan.component";
import {NavigationBarComponent} from "./components/navigation-bar/navigation-bar.component";
import {PlayBattleComponent} from "./components/play-battle/play-battle.component";
import {SearchClanComponent} from "./components/search-clan/search-clan.component";
import {UpdateUserComponent} from "./components/update-user/update-user.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {OktaAuth} from "@okta/okta-auth-js";
import {OktaAuthGuard, OktaAuthModule, OktaCallbackComponent} from "@okta/okta-angular";
import {BrowserModule} from "@angular/platform-browser";

// function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
//   // Use injector to access any service available within your application
//   const router = injector.get(Router);
//
//   // Redirect the user to your custom login page
//   router.navigate(['/login']);
// }

const routes: Routes = [
  {path: 'add-new-user', component: AddNewUserComponent},
  {path: 'battle-log', component: BattleLogComponent},
  {path: 'create-new-clan', component: CreateNewClanComponent},
  {path: 'leaderboards', component: LeaderboardsComponent},

  {path: 'login/callback', component: LoginComponent},
  {path: 'login', component: LoginComponent},

  {path: 'my-clan', component: MyClanComponent},
  {path: 'navigation-bar', component: NavigationBarComponent},
  {path: 'play-battle', component: PlayBattleComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'search-clan', component: SearchClanComponent},
  {path: 'update-user/:id', component: UpdateUserComponent},
  // {path: 'user-list', component: UserListComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage} },

  {path: 'user-list', component: UserListComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: '', component: UserProfileComponent, canActivate: [OktaAuthGuard]},
  // {path: '', redirectTo: '/user-profile', pathMatch: 'full'},
  {path: '**', redirectTo: '/user-profile', pathMatch: 'full'}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    OktaAuthModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
