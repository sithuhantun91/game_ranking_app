import {Component, OnInit, ViewChild} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Role} from "../../common/role";
import {User} from "../../common/user";
import {UserService} from "../../services/user.service";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import { OktaAuthStateService } from '@okta/okta-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginFormGroup!: FormGroup;
  loginError: boolean = false;

  constructor(private router: Router,
              private userService: UserService,
              private oktaAuth: OktaAuthStateService ) {
  }

  ngOnInit(): void {

    this.loginFormGroup = new FormGroup({
      email: new FormControl('',
        [Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('',
        [Validators.required,
          //Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
        ])
    });
  }

  get email() { return this.loginFormGroup.controls['email']; }
  get password() { return this.loginFormGroup.controls['password']; }

  onSubmit() {
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }

    let loginUserId = 0;
    this.userService.getUserIdByEmailAndPassword(this.email.value, this.password.value).subscribe(data => {
      loginUserId = data;

      if(loginUserId > 0) {
        sessionStorage.setItem('loginUserId', loginUserId.toString());

        this.userService.getRoleByUserId(loginUserId).subscribe(data => {
          sessionStorage.setItem('loginUserRoleId', data.id.toString());

          this.router.navigate(['/user-profile']);
        });

      }

      this.loginError = true;
    });
  }

}
