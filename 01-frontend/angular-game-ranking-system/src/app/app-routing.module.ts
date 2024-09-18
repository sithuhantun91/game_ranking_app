import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {path: 'add-new-user', component: AddNewUserComponent},
  {path: 'battle-log', component: BattleLogComponent},
  {path: 'create-new-clan', component: CreateNewClanComponent},
  {path: 'leaderboards', component: LeaderboardsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'my-clan', component: MyClanComponent},
  {path: 'navigation-bar', component: NavigationBarComponent},
  {path: 'play-battle', component: PlayBattleComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'search-clan', component: SearchClanComponent},
  {path: 'update-user/:id', component: UpdateUserComponent},
  {path: 'user-list', component: UserListComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: '', redirectTo: '/user-profile', pathMatch: 'full'},
  {path: '**', redirectTo: '/user-profile', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
