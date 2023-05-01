import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserModelService} from "../../../viewModel/user-model.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public currentUser: User;

  public forgotPassword : boolean = false;

  constructor(
    private userModelService: UserModelService)
  {
    this.currentUser =  userModelService.getCurrentUser();
  }

  ngOnInit(): void {
  }

}
