import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../service/auth/auth.service";
import {CguService} from "../../../service/cgu";

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
    public authService: AuthService,
    private cguService: CguService,
    private formBuilder: FormBuilder,

    )
  {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      verifyPassword: ['', Validators.required],
      cgu: [false, Validators.requiredTrue],
    });

    this.setValidator();

  }

  switchRegister() {
    this.isRegister = !this.isRegister;
    this.form.markAsUntouched();
    this.setValidator();
  }

  setValidator() {
    switch (this.isRegister) {
      case true:
        this.form.controls['name'].setValidators([Validators.required]);
        this.form.controls['email'].setValidators([Validators.required, Validators.email]);
        this.form.controls['password'].setValidators([Validators.required]);
        this.form.controls['verifyPassword'].setValidators([Validators.required]);
        this.form.controls['cgu'].setValidators([Validators.requiredTrue]);
        break;
      case false:
        this.form.controls['name'].clearValidators();
        this.form.controls['verifyPassword'].clearValidators();
        break;
    }
  }

  displayCGU() {
    this.cguService.displayCGU();
  }

  forgotPassword() {
    this.goToForgotPassword.emit(true)
  }

}
