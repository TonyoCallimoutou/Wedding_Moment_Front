import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../service/auth/auth.service";
import {UserModelService} from "../../../../viewModel/user-model.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Output() goToForgotPassword: EventEmitter<boolean> = new EventEmitter<boolean>()

  public isRegister: boolean = false;
  public viewPassword : boolean = false;
  public viewVerifyPassword: boolean = false;

  public form : FormGroup;
  public nameControl: any;

  constructor(
    public authService: AuthService)
  {
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      verifyPassword: new FormControl('')
    });
    this.nameControl = this.form.get('name');

  }

  forgotPassword() {
    this.goToForgotPassword.emit(true)
  }

}
