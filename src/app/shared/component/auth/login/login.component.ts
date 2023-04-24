import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


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

  ngOnInit(): void {
  }

}
