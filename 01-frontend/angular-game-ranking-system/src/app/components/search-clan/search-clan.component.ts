import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Clan} from "../../common/clan";
import {ClanService} from "../../services/clan.service";
import {User} from "../../common/user";
import {UserService} from "../../services/user.service";
import {ClanRankService} from "../../services/clan-rank.service";

@Component({
  selector: 'app-search-clan',
  templateUrl: './search-clan.component.html',
  styleUrl: './search-clan.component.css'
})
export class SearchClanComponent implements OnInit{

  clans: Clan[] = [];

  searchValue: string = '';

  loginUser: User = new User();

  loginUserId: number = Number(sessionStorage.getItem('loginUserId'));
  loginUserRoleId: number = Number(sessionStorage.getItem('loginUserRoleId'));

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 2;
  theTotalElements: number = 0;

  constructor(private clanService: ClanService,
              private clanRankService: ClanRankService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    if(this.loginUserId == 0){
      this.router.navigate(['/login']);
    }

    this.userService.getUser(this.loginUserId).subscribe(data => {
      this.loginUser = data;

      this.userService.getClanByUserId(this.loginUser.id).subscribe(data => {
        this.loginUser.clan = data;

        this.listClans('');
      })
    })
  }

  doSearch(searchValue: string) {
    this.listClans(searchValue);
    this.searchValue = searchValue;
  }

  listClans(searchValue: string) {
    this.clanService.getClanListPaginate(
      searchValue,
      this.thePageNumber - 1,
      this.thePageSize
    ).subscribe(this.processResult());
  }

  processResult() {
    return (data: any) => {
      this.clans = data.content;
      this.thePageNumber = data.number + 1;
      this.thePageSize = data.size;
      this.theTotalElements = data.totalElements;
      this.clans.forEach(clan => {
        this.clanService.getTotalMembersById(clan.id).subscribe(data => clan.totalMembers = data);
        this.clanService.getTotalTrophiesById(clan.id).subscribe(data => clan.totalTrophies = data);
      });
    };
  }

  joinClan(clanId: number): void {
    let user: User = new User();
    let id : number = this.loginUserId;
    this.userService.getUser(id).subscribe(data => {
      user = data;
      this.clanService.getClan(clanId).subscribe(data => {
        user.clan = data;

        if(user.trophies < user.clan.requiredTrophies) {
          alert('You need ' + user.clan.requiredTrophies + 'trophies to join this clan.');
          return;
        }

        this.clanRankService.getClanRank(3).subscribe(data => {// 3 => Member
          user.clanRank = data;

          this.userService.joinClan(user).subscribe(
            {
              next: response => {
                alert(`Your account has been joined the clan successfully!`);
                this.loginUser.clan = user.clan;
                this.listClans(this.searchValue);
              },
              error: err => {
                alert(`There was an error: ${err.message}`);
              }
            }
          );
        });// 3 for Member
      });

    });
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listClans(this.searchValue);
  }

  redirectToMyClanPage(){
    this.router.navigate(['/my-clan']);
  }
}
