import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {HttpClientModule} from "@angular/common/http";
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
  providers: [UserService, SessionStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
