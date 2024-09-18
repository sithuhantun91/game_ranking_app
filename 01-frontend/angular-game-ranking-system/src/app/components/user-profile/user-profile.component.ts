import {Component, OnInit} from '@angular/core';
import {User} from "../../common/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ClanService} from "../../services/clan.service";
import {BattleLogService} from "../../services/battle-log.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  loginUser: User = new User();

  loginUserId: number = Number(sessionStorage.getItem('loginUserId'));
  loginUserRoleId: number = Number(sessionStorage.getItem('loginUserRoleId'));

  battleWon: number = 0;

  constructor(private userService: UserService,
              private clanService: ClanService,
              private battleLogService: BattleLogService,
              private router: Router) {
  }

  ngOnInit(): void {
    if(this.loginUserId == 0){
      this.router.navigate(['/login']);
    }

    this.setLoginInfo();
  }

  setLoginInfo(){
    this.userService.getUser(this.loginUserId).subscribe(data => {
      this.loginUser = data;
      this.userService.getClanByUserId(this.loginUser.id).subscribe(
        data => {
          this.loginUser.clan = data
          this.userService.getClanRankByUserId(this.loginUser.id).subscribe(
            data => {
              this.loginUser.clanRank = data
              this.battleLogService.getBattleWonByUserId(this.loginUser.id).subscribe(
                data => {
                  this.battleWon = data
                });
            });
        });
    });
  }

  redirectToBattleLog() {
    this.router.navigate(['/battle-log']);
  }

  redirectToEditProfile() {
    this.router.navigate(['/update-user/' + this.loginUser.id]);
  }

}
