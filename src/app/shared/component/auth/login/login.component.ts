import {AfterViewInit, Component, EventEmitter, OnChanges, Output, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../service/auth/auth.service";
import {CguService} from "../../../service/cgu";
import {ValidatorPassword} from "../../../validator/PasswordValidator";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit, OnChanges {

  @Output() goToForgotPassword: EventEmitter<boolean> = new EventEmitter<boolean>()

  public isRegister: boolean = false;
  public viewPassword : boolean = false;
  public viewVerifyPassword: boolean = false;
  public form : FormGroup;
  public isDividerVertical: boolean = false;

  constructor(
    public authService: AuthService,
    private cguService: CguService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,

    )
  {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      verifyPassword: ['', Validators.required],
      cgu: [false, Validators.requiredTrue],
    }, {
      validator: ValidatorPassword
    });

    this.setValidator();

  }

  ngOnChanges() {
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      let formWidth = document.getElementById('form')?.offsetWidth;
      let inputWidth = document.getElementById('input')?.offsetWidth;
      let buttonsWidth = document.getElementById('buttons')?.offsetWidth;
      formWidth = formWidth !== undefined ? formWidth : 0;
      inputWidth = inputWidth !== undefined ? inputWidth : 0;
      buttonsWidth = buttonsWidth !== undefined ? buttonsWidth : 0;

      let gap = 2*2*16 +1; // Gap 2rem + divider 1px + gap 2rem
      let paddingForm = 16*2;

      const totalWidth = ((inputWidth + buttonsWidth + gap) / (formWidth - paddingForm)) * 100;

      const divider = document.getElementById('divider');
      if (totalWidth > 100) {
        this.isDividerVertical = false;
        this.renderer.addClass(divider, 'horizontal');
      } else {
        this.isDividerVertical = true;
        this.renderer.addClass(divider, 'vertical');
      }
    }, 0);

  }

  switchRegister() {
    this.isRegister = !this.isRegister;
    Object.values(this.form.controls).forEach(control => {
      control.updateValueAndValidity();
      control.markAsUntouched();
    });
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

  signIn(email: string, password: string) {
    Object.values(this.form.controls).forEach(control => {
      control.updateValueAndValidity();
    });

    if (this.form.valid) {
      this.authService.SignIn(email, password).then((result) => {
        if (result) {
          window.location.reload();
        } else {
          Object.values(this.form.controls).forEach(control => {
            control.markAsTouched();
          });
          this.form.controls['password'].setErrors({'incorrect': true});
          this.form.controls['email'].setErrors({'incorrect': true});
        }
      });
    }
    else {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  signInWithGoogle() {
    this.form.updateValueAndValidity();
    if (this.form.get('cgu')?.valid) {
      this.authService.GoogleAuth();
    }
    else {
      Object.values(this.form.controls).forEach(control => {
        control.markAsPending();
      });

      this.form.get('cgu')?.markAsTouched()
    }
  }

  createAccount(name: string, email: string, password: string) {
    Object.values(this.form.controls).forEach(control => {
      control.updateValueAndValidity();
    });

    if (this.form.valid) {
      this.authService.SignUp(name, email, password).then((error) => {
        if (error.message.toString().includes('auth/email-already-in-use')) {
          this.form.controls['email'].markAsTouched();
          this.form.controls['email'].setErrors({'alreadyInUse': true});
        }
        else {
          window.alert(error.message);
        }
      });
    }
    else {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  displayCGU() {
    this.cguService.displayCGU();
  }

  forgotPassword() {
    this.goToForgotPassword.emit(true)
  }

}
