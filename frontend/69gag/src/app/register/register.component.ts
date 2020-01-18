import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms'
import { PasswordValidator } from './password-validator'
import { UserService } from '@app/_services/user.service'
import { User } from '@app/_models/user'
import { AuthenticationService } from '@app/_services/authentication.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  registryForm: FormGroup
  loading = false
  returnUrl: string
  error = ''

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private _registerUserService: UserService,
    private _authenticationService: AuthenticationService) {
    this.registryForm = _fb.group({
      'username': [null, Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      'email': [null, Validators.compose([
        Validators.required,
        Validators.maxLength(100),
        Validators.email
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])],
      'repeatPassword': [null, Validators.compose([
        Validators.required
      ])]
    }, {
      validator: PasswordValidator.MatchPassword
    })
  }

  ngOnInit() {
  }

  addUser(user: User) {
    if (this.registryForm.valid) {
      this.loading = true
      this._registerUserService.register(user).subscribe(response => {
        console.log("Succesful creation")
        this._authenticationService.login(user.username, user.password).subscribe(
          response => {
            console.log("Succesful login")
            this.loading = false
            this.router.navigate([''])
          })
      },
        error => {
          this.error = error
          this.loading = false
          console.log("Error: " + error)
        })
      console.log("Adding user...")
    }
  }

  private fieldRequired = 'Field required'
  private usernameTooLong = 'User name can not exceed 30 characters'
  private emailTooLong = 'Email can not exceed 30 characters'
  private wrongEmail = 'Wrong email address'
  private passwordNotMatch = 'Passwords do not match'

  getUserNameErrorMessage() {
    return this.registryForm.get('username').hasError('required') ? this.fieldRequired :
      this.registryForm.get('username').hasError('maxlength') ? this.usernameTooLong : ''
  }

  getEmailErrorMessage() {
    return this.registryForm.get('email').hasError('required') ? this.fieldRequired :
      this.registryForm.get('email').hasError('maxlength') ? this.emailTooLong :
        this.registryForm.get('email').hasError('email') ? this.wrongEmail : ''
  }

  getPasswordErrorMessage() {
    return this.registryForm.get('password').hasError('required') ? this.fieldRequired : ''
  }

  getRepeatPasswordErrorMessage() {
    return this.registryForm.get('repeatPassword').hasError('required') ? this.fieldRequired :
      this.registryForm.get('repeatPassword').hasError('matchpassword') ? this.passwordNotMatch : ''
  }
}
