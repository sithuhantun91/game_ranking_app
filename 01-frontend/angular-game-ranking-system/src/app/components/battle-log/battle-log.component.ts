import {Component, OnInit} from '@angular/core';
import {BattleLog} from "../../common/battle-log";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {BattleLogService} from "../../services/battle-log.service";
import {User} from "../../common/user";

@Component({
  selector: 'app-battle-log',
  templateUrl: './battle-log.component.html',
  styleUrl: './battle-log.component.css'
})
export class BattleLogComponent implements OnInit{

  battleLogs: BattleLog[] = [];

  loginUser: User = new User();

  loginUserId: number = Number(sessionStorage.getItem('loginUserId'));
  loginUserRoleId: number = Number(sessionStorage.getItem('loginUserRoleId'));

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 2;
  theTotalElements: number = 0;

  constructor(private battleLogService: BattleLogService,
              private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
    if(this.loginUserId == 0){
      this.router.navigate(['/login']);
    }

    this.userService.getUser(this.loginUserId).subscribe(data => {
      this.loginUser = data;
      this.listBattleLogs();
    });
  }

  listBattleLogs() {
    if(this.loginUserRoleId == 2 || this.loginUserRoleId == 3){
      this.battleLogService.getBattleLogsPaginate2(
        this.thePageNumber - 1,
        this.thePageSize).subscribe(this.processResult());
    }else{
      this.battleLogService.getBattleLogsPaginate(
        this.loginUser.id,
        this.thePageNumber - 1,
        this.thePageSize).subscribe(this.processResult());
    }
  }

  processResult() {
    return (data: any) => {
      this.battleLogs = data.content;
      console.log(this.battleLogs);
      this.thePageNumber = data.number + 1;
      this.thePageSize = data.size;
      this.theTotalElements = data.totalElements;
    };
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listBattleLogs();
  }
}
