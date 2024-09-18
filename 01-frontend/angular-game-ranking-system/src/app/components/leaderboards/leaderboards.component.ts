import {Component, OnInit} from '@angular/core';
import {Clan} from "../../common/clan";
import {User} from "../../common/user";
import {ClanService} from "../../services/clan.service";
import {ClanRankService} from "../../services/clan-rank.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {TopTenClan} from "../../common/top-ten-clan";

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrl: './leaderboards.component.css'
})
export class LeaderboardsComponent implements OnInit{

  topTenUsers: User[] = [];
  topTenClans: TopTenClan[] = [];

  selectedValue: any = 1;

  loginUserId: number = Number(sessionStorage.getItem('loginUserId'));

  constructor(private clanService: ClanService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    if(this.loginUserId == 0){
      this.router.navigate(['/login']);
    }

    this.userService.getUserListTopTen().subscribe(
      data => {
        this.topTenUsers = data;

        this.clanService.getClanListTopTen().subscribe(
          data => {
            this.topTenClans = data;
            this.topTenClans.forEach(topTenClan => {
              this.clanService.getTotalMembersById(topTenClan.clan.id).subscribe(data => topTenClan.clan.totalMembers = data);
            });
          });
      });
  }

  onSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedValue = target.value;
  }
}
