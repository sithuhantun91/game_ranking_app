import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../common/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})

export class UserListComponent implements OnInit {

  players: User[] = [];

  loginUserId: number = Number(sessionStorage.getItem('loginUserId'));

  loginUserRoleId : number = Number(sessionStorage.getItem('loginUserRoleId'));

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 2;
  theTotalElements: number = 0;

  constructor(private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
    if(this.loginUserId == 0){
      this.router.navigate(['/login']);
    }

    if(this.loginUserRoleId != 2 && this.loginUserRoleId != 3){
      this.router.navigate(['/user-profile']);
    }

    this.listUsers();
  }

  listUsers() {
    this.userService.getUserListPaginate(
      this.thePageNumber - 1,
      this.thePageSize).subscribe(this.processResult());
  }

  redirectToAddNewUserPage() {
    this.router.navigate(['/add-new-user']);
  }

  redirectToUpdateUserPage(id: number) {
    this.router.navigate([`/update-user/${id}`]);
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

  deleteUserClick(id: number): void {
    // call REST API via the UserService
    this.userService.deleteUser2(id).subscribe(
      {
        next: response => {
          this.userService.deleteUser(id).subscribe(
            data=>{
              alert(`Your account has been deleted successfully!`);
              this.listUsers();
            }
          );
        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      }
    )
  }

}
