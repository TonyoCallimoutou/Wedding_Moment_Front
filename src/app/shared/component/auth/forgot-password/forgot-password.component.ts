import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  @Output() goBack : EventEmitter<boolean> = new EventEmitter<boolean>();

  public form : FormGroup;


  constructor(
    public authService: AuthService
  ) {

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
}
