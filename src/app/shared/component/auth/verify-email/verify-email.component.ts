import {Component} from '@angular/core';
import {AuthService} from "../../../../service/auth/auth.service";
import {UserModelService} from "../../../../viewModel/user-model.service";
import {User} from "../../../../model/user.model";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {

  public currentUser: User;

  constructor(
    public authService: AuthService,
    private userModelService: UserModelService)
  {
    this.currentUser =  userModelService.getCurrentUser();
  }
}
