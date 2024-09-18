import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent implements OnInit{
  loginUserId : number = Number(sessionStorage.getItem('loginUserId'));
  loginUserRoleId : number = 0;

  constructor(private router: Router,
              private userService: UserService,){
  }

  ngOnInit(): void {
    if(this.loginUserId == 0){
      this.router.navigate(['/login']);
    }

    this.userService.getRoleByUserId(this.loginUserId).subscribe(data => {
      this.loginUserRoleId = data.id;

      sessionStorage.setItem('loginUserRoleId', this.loginUserRoleId.toString());
    })
  }

  logout(){
    sessionStorage.clear();
    this.ngOnInit();
    this.router.navigate(['/login']);
  }
}
