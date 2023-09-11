import {Component, OnInit} from '@angular/core';
import {UserModelService} from "../../../viewModel/user-model.service";
import {User} from "../../../model/user.model";

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
