import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserModelService } from 'src/app/viewModel/user-model.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  user: any;

  constructor(
    private userModelService: UserModelService) {}

  ngOnInit() {
    this.initUser()
  }

  /**
   * init data
   */
  initUser() {
    this.user = this.userModelService.getCurrentUser();
  }

  /**
   * Delete user
   */
  removeUser() {
    this.userModelService.removeUser();
  }

}
