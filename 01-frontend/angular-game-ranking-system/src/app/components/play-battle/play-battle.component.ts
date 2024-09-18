import {Component, OnInit} from '@angular/core';
import {User} from "../../common/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {BattleLogService} from "../../services/battle-log.service";
import {BattleLog} from "../../common/battle-log";

@Component({
  selector: 'app-play-battle',
  templateUrl: './play-battle.component.html',
  styleUrl: './play-battle.component.css'
})
export class PlayBattleComponent implements OnInit{
  loginUser: User = new User();

  loginUserId: number = Number(sessionStorage.getItem('loginUserId'));

  otherPlayer: User = new User();

  winnerId: number = 0;

  constructor(private userService: UserService,
              private battleLogService: BattleLogService,
              private router: Router) {}

  ngOnInit(): void {
    this.setLoginInfo();

  }

  setLoginInfo(){
    if(this.loginUserId == 0){
      this.router.navigate(['/login']);
    }
    this.userService.getUser(this.loginUserId).subscribe(data => this.loginUser = data);
  }

  playBattle() {
    this.userService.getOtherPlayer(this.loginUserId).subscribe(data => {
      this.otherPlayer = data;
      this.userService.getUser(this.loginUserId).subscribe(data => {
        this.loginUser = data;
        let result : boolean = this.getRandomBoolean();


        this.userService.getClanByUserId(this.otherPlayer.id).subscribe(data => {
          this.otherPlayer.clan = data;

          this.userService.getClanByUserId(this.loginUserId).subscribe(data => {
            this.loginUser.clan = data;

            this.userService.getClanRankByUserId(this.otherPlayer.id).subscribe(data => {
              this.otherPlayer.clanRank = data;

              this.userService.getClanRankByUserId(this.loginUserId).subscribe(data => {
                this.loginUser.clanRank = data;

                this.userService.getRoleByUserId(this.otherPlayer.id).subscribe(data => {
                  this.otherPlayer.role = data;

                  this.userService.getRoleByUserId(this.loginUserId).subscribe(data => {
                    this.loginUser.role = data;

                    let battleLog: BattleLog = new BattleLog();
                    battleLog.player1 = this.loginUser;
                    battleLog.player2 = this.otherPlayer;

                    if(result){
                      this.winnerId = this.loginUser.id;

                      // add Trophies Point
                      this.loginUser.trophies += 30;
                      this.userService.updateUser(this.loginUser).subscribe(data => {

                        // subtract Trophies Point
                        this.otherPlayer.trophies -= 30;
                        if(this.otherPlayer.trophies < 0) this.otherPlayer.trophies = 0;
                        this.userService.updateUser(this.otherPlayer).subscribe(data => data);
                      });

                    }else{
                      this.winnerId = this.otherPlayer.id;

                      // add Trophies Point
                      this.otherPlayer.trophies += 30;
                      this.userService.updateUser(this.otherPlayer).subscribe(data => {
                        // this.otherPlayer = data;

                        // subtract Trophies Point
                        this.loginUser.trophies -= 30;
                        if(this.loginUser.trophies < 0) this.loginUser.trophies = 0;
                        this.userService.updateUser(this.loginUser).subscribe(data => data);
                      });
                    }

                    // add battle log
                    battleLog.winner = this.winnerId;
                    this.battleLogService.addBattleLog(battleLog).subscribe(data => battleLog = data);
                    console.log("battleLog", battleLog);
                  })
                })
              })
            })
          })
        })


      });
    });


  }

  getRandomBoolean(): boolean{
    return Math.random() > 0.5;
  }
}
