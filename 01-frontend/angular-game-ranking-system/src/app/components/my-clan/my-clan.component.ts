import {Component, OnInit} from '@angular/core';
import {User} from "../../common/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ClanService} from "../../services/clan.service";
import {ClanRankService} from "../../services/clan-rank.service";

@Component({
  selector: 'app-my-clan',
  templateUrl: './my-clan.component.html',
  styleUrl: './my-clan.component.css'
})
export class MyClanComponent implements OnInit{
  players: User[] = [];

  loginUser: User = new User();

  loginUserId: number = Number(sessionStorage.getItem('loginUserId'));

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 2;
  theTotalElements: number = 0;

  constructor(private userService: UserService,
              private clanService: ClanService,
              private clanRankService: ClanRankService,
              private router: Router) {}

  ngOnInit(): void {
    if(this.loginUserId == 0){
      this.router.navigate(['/login']);
    }

    this.setLoginInfo();


  }

  setLoginInfo(){
    this.userService.getUser(this.loginUserId).subscribe(data => {
      this.loginUser = data;

      this.userService.getClanByUserId(this.loginUser.id).subscribe({
        next: response => {
          this.loginUser.clan = response;
          if(this.loginUser.clan != null){
            this.clanService.getTotalMembersById(this.loginUser.clan.id).subscribe(
              data => this.loginUser.clan.totalMembers = data
            );
          }

          this.userService.getClanRankByUserId(this.loginUser.id).subscribe(
            clanRank =>
              {
                this.loginUser.clanRank = clanRank;

                this.listUsers();
              }
            );
        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      });
    });
  }

  listUsers() {
    if(this.loginUser.clan != null){
      let clanId: number = this.loginUser.clan.id;
      this.userService.getUserListByClanIdPaginate(
        clanId,
        this.thePageNumber - 1,
        this.thePageSize).subscribe(this.processResult());
    }

  }

  processResult() {
    return (data: any) => {
      this.players = data.content;
      console.log(this.players);
      this.thePageNumber = data.number + 1;
      this.thePageSize = data.size;
      this.theTotalElements = data.totalElements;
    };
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listUsers();
  }

  promoteToCoLeader(id: number): void {
    let user: User = new User();
    this.userService.getUser(id).subscribe(data => {
      user = data;

      this.userService.getRoleByUserId(id).subscribe( data => {
        user.role = data;

        this.userService.getClanByUserId(id).subscribe(clan => {
          user.clan = clan;

          if(user.clan != null) {
            this.clanRankService.getClanRank(2).subscribe(data => {
              user.clanRank = data;

              this.userService.updateUser(user).subscribe(
                {
                  next: response => {
                    alert(`Member has been promoted to Co-Leader successfully!`);
                    this.listUsers();
                  },
                  error: err => {
                    alert(`There was an error: ${err.message}`);
                  }
                }
              );
            });// 2 for Co-Leader
          }

        });
      })
    });


  }

  redirectToSearchClanPage() {
    this.router.navigate(['/search-clan']);
  }

  redirectToCreateNewClanPage() {
    this.router.navigate(['/create-new-clan']);
  }

  leaveClan() {
    let id : number = this.loginUserId;
    let user: User = new User();
    this.userService.getUser(id).subscribe({
      next: response => {
        user = response;
        this.userService.leaveClan(user).subscribe(
          {
            next: response => {
              alert(`Leaving the Clan successfully!`);
              this.setLoginInfo();
              this.listUsers();
            },
            error: err => {
              alert(`There was an error: ${err.message}`);
            }
          }
        );
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    });
  }
}
