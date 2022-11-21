import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserModelService } from 'src/app/viewModel/user-model.service';

@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  styleUrls: ['./user-test.component.scss']
})
export class UserTestComponent implements OnInit {

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
    console.log(this.user)
  }

  /**
   * Delete user
   */
  removeUser() {
    this.userModelService.removeUser();
  }

}
