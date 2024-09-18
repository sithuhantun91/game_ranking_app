import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyValidators} from "../../validators/my-validators";
import {User} from '../../common/user';
import {UserService} from "../../services/user.service";
import {Role} from "../../common/role";
import {RoleService} from "../../services/role.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registerFormGroup!: FormGroup;


  constructor(private userService: UserService,
              private roleService: RoleService,) {
  }

  ngOnInit(): void {

    this.registerFormGroup = new FormGroup({
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

  get firstname() { return this.registerFormGroup.controls['firstname']; }
  get lastname() { return this.registerFormGroup.controls['lastname']; }
  get email() { return this.registerFormGroup.controls['email']; }
  get password() { return this.registerFormGroup.controls['password']; }

  onSubmit() {
    if (this.registerFormGroup.invalid) {
      this.registerFormGroup.markAllAsTouched();
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

              // set up user
              let user: User = new User();
              user.firstName = this.firstname.value.toLowerCase().trim();
              user.lastName = this.lastname.value.toLowerCase().trim();
              user.email = this.email.value;
              user.password = this.password.value;
              user.role = role;

              // call REST API via the UserService
              this.userService.registerUser(user).subscribe(
                {
                  next: response => {
                    alert(`Your account has been registered successfully!`);

                    // reset cart
                    this.resetUser();

                  },
                  error: err => {
                    alert(`There was an error: ${err.message}`);
                  }
                }
              )
            },
            error: err => {
              alert(`There was an error: ${err.message}`);
            }
          }
        );
      }
    );
  }

  resetUser() {
    // reset the form
    this.registerFormGroup.reset();
  }

}
