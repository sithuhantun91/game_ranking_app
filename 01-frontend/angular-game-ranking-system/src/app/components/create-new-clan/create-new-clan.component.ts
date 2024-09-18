import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ClanService} from "../../services/clan.service";
import {MyValidators} from "../../validators/my-validators";
import {Clan} from "../../common/clan";
import {UserService} from "../../services/user.service";
import {User} from "../../common/user";
import {ClanRankService} from "../../services/clan-rank.service";

@Component({
  selector: 'app-create-new-clan',
  templateUrl: './create-new-clan.component.html',
  styleUrl: './create-new-clan.component.css'
})
export class CreateNewClanComponent implements OnInit{

  addNewClanFormGroup!: FormGroup;

  loginUserId: number = Number(sessionStorage.getItem('loginUserId'));

  constructor(private clanService: ClanService,
              private userService: UserService,
              private clanRankService: ClanRankService,
              private router: Router) {}

  ngOnInit(): void {
    if(this.loginUserId == 0){
      this.router.navigate(['/login']);
    }

    this.addNewClanFormGroup = new FormGroup({
      clanName: new FormControl('',
        [Validators.required,
          Validators.minLength(2),
          MyValidators.notOnlyWhitespace]) ,
      maxNoOfMembers: new FormControl(5,
        [Validators.required,
          Validators.min(5),
          Validators.max(50)]) ,
      requiredTrophies: new FormControl(0,
        [Validators.required,
          Validators.min(0),
          Validators.max(10000)]) ,
    });
  }

  get clanName() { return this.addNewClanFormGroup.controls['clanName']; }
  get maxNoOfMembers() { return this.addNewClanFormGroup.controls['maxNoOfMembers']; }
  get requiredTrophies() { return this.addNewClanFormGroup.controls['requiredTrophies']; }

  redirectToMyClanPage() {
    this.router.navigate(['/my-clan']);
  }

  onSubmit() {
    if (this.addNewClanFormGroup.invalid) {
      this.addNewClanFormGroup.markAllAsTouched();
      return;
    }

    // set up clan
    let clan: Clan = new Clan();
    clan.name = this.clanName.value.toLowerCase().trim();
    clan.maxNumOfMembers = this.maxNoOfMembers.value;
    clan.requiredTrophies = this.requiredTrophies.value;


    // call REST API
    this.clanService.checkClanName(clan.name).subscribe(

        response => {
          if (response == false) {
            alert(`Clan Name is already registered. Please try again!`);
            return;
          }

          this.clanService.registerClan(clan).subscribe(
            {
              next: response => {
                console.log(response);
                alert(`New Clan has been registered successfully!`);

                let user : User = new User();
                this.userService.getUser(this.loginUserId).subscribe(data => {
                  user = data;

                  this.userService.getRoleByUserId(this.loginUserId).subscribe( data => {
                    user.role = data;

                    this.clanService.getClan(response.id).subscribe(clan => {
                      user.clan = clan;

                      if(user.clan != null) {
                        this.clanRankService.getClanRank(1).subscribe(data => {
                          user.clanRank = data;

                          this.userService.updateUser(user).subscribe();
                        });// 1 for Leader
                      }

                    });
                  })
                });

                // reset cart
                this.resetForm();

              },
              error: err => {
                alert(`There was an error: ${err.message}`);
              }
            }
          )
        }
    );

  }

  resetForm() {
    // reset the form
    this.addNewClanFormGroup.reset();
  }
}
