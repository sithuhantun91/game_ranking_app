import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyValidators} from "../../validators/my-validators";
import {User} from "../../common/user";
import {Role} from "../../common/role";
import {RoleService} from "../../services/role.service";

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrl: './add-new-user.component.css'
})
export class AddNewUserComponent implements OnInit {

  addNewUserFormGroup!: FormGroup;

  loginUserId: number = Number(sessionStorage.getItem('loginUserId'));
  loginUserRoleId: number = Number(sessionStorage.getItem('loginUserRoleId'));

  constructor(private userService: UserService,
              private roleService: RoleService,
              private router: Router) {}

  ngOnInit(): void {
    if(this.loginUserId == 0){
      this.router.navigate(['/login']);
    }

    if(this.loginUserRoleId != 2 && this.loginUserRoleId != 3){
      this.router.navigate(['/user-profile']);
    }

    this.addNewUserFormGroup = new FormGroup({
      firstname: new FormControl('',
        [Validators.required,
          Validators.minLength(2),
          MyValidators.notOnlyWhitespace]) ,
      lastname: new FormControl('',
        [Validators.required,
          Validators.minLength(2),
          MyValidators.notOnlyWhitespace]) ,
      email: new FormControl('',
        [Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('',
        [Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')])
    });
  }

  get firstname() { return this.addNewUserFormGroup.controls['firstname']; }
  get lastname() { return this.addNewUserFormGroup.controls['lastname']; }
  get email() { return this.addNewUserFormGroup.controls['email']; }
  get password() { return this.addNewUserFormGroup.controls['password']; }

  redirectToUserListPage() {
    this.router.navigate(['/user-list']);
  }

  onSubmit() {
    if (this.addNewUserFormGroup.invalid) {
      this.addNewUserFormGroup.markAllAsTouched();
      return;
    }

    this.userService.checkUserByEmail(this.email.value).subscribe(
      isEmailExist => {
        if(isEmailExist){
          alert("Email already exists");
          return;
        }

        // set up role
        let role: Role = new Role();
        // get ROLE_PLAYER role
        this.roleService.getRole(1).subscribe(
          {
            next: response => {
              role = response;
              console.log(role);
            },
            error: err => {
              alert(`There was an error: ${err.message}`);
            }
          }
        );

        // set up user
        let user: User = new User();
        user.firstName = this.firstname.value.toLowerCase().trim();
        user.lastName = this.lastname.value.toLowerCase().trim();
        user.email = this.email.value;
        user.password = this.password.value;
        user.role = role;

        // call REST API via the CheckoutService
        this.userService.registerUser(user).subscribe(
          {
            next: response => {
              alert(`New User has been added successfully!`);

              // reset cart
              this.resetUser();

            },
            error: err => {
              alert(`There was an error: ${err.message}`);
            }
          }
        )
    });
  }

  resetUser() {
    // reset the form
    this.addNewUserFormGroup.reset();
  }

}
