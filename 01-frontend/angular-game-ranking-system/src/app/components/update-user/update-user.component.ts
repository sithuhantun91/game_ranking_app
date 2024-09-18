import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {MyValidators} from "../../validators/my-validators";
import {User} from "../../common/user";
import {RoleService} from "../../services/role.service";
import {Role} from "../../common/role";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {

  updateUserFormGroup!: FormGroup;

  loginUser: User = new User();

  loginUserId: number = Number(sessionStorage.getItem('loginUserId'));

  roles: Role[] = [];

  constructor(private userService: UserService,
              private roleService: RoleService,
              private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit(): void {
    if(this.loginUserId == 0){
      this.router.navigate(['/login']);
    }

    // get id from route
    const id = Number(this.route.snapshot.paramMap.get('id'));



    // populate role for select box
    this.roleService.getRoleList().subscribe(
      data => {
        this.roles = data;
      }
    );

    // get user info
    this.userService.getUser(id).subscribe(user => {
      this.loginUser = user;
      this.updateUserFormGroup.patchValue({
        firstname: this.toPascalCase(user.firstName),
        lastname: this.toPascalCase(user.lastName),
        email: user.email,
        password: user.password
      });
    })

    // get role by user id
    this.userService.getRoleByUserId(id).subscribe(
      role => {
        this.loginUser.role = role;
        this.updateUserFormGroup.patchValue({
          selectedRoleId: role.id
        });
      }
    );

    // set up form
    this.updateUserFormGroup = new FormGroup({
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
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
      selectedRoleId: new FormControl({value: '1', disabled: true}),
    });
  }

  get firstname() { return this.updateUserFormGroup.controls['firstname']; }
  get lastname() { return this.updateUserFormGroup.controls['lastname']; }
  get email() { return this.updateUserFormGroup.controls['email']; }
  get password() { return this.updateUserFormGroup.controls['password']; }
  get selectedRoleId() { return this.updateUserFormGroup.controls['selectedRoleId']; }

  redirectToUserListPage() {
    this.router.navigate(['/user-list']);
  }

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (this.updateUserFormGroup.invalid) {
      this.updateUserFormGroup.markAllAsTouched();
      return;
    }

    // this.userService.checkUserByEmail(this.email.value).subscribe(
    //   isEmailExist => {
    //     if(isEmailExist){
    //       alert("Email already exists");
    //       return;
    //     }

    let user: User = new User();

    this.userService.getUser(Number(id)).subscribe(
      data => {
        user = data;
        console.log(user);

        // set up user and role
        this.roleService.getRole(this.selectedRoleId.value).subscribe(
          data => {

            user.firstName = this.firstname.value.toLowerCase().trim();
            user.lastName = this.lastname.value.toLowerCase().trim();
            user.email = this.email.value;
            user.password = this.password.value;
            user.role = data;

            this.userService.getClanByUserId(user.id).subscribe( data => {
              user.clan = data;

              this.userService.getClanRankByUserId(user.id).subscribe( data => {
                user.clanRank = data;

                // call REST API via the CheckoutService
                this.userService.updateUser(user).subscribe(
                  {
                    next: response => {
                      alert(`User has been updated successfully!`);
                    },
                    error: err => {
                      alert(`There was an error: ${err.message}`);
                    }
                  }
                );
              });
            });
          }
        );
      }
    )

    // });
  }

  toPascalCase(str: string): string {
    return str.replace(/\w+/g,
      (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
  }
}
