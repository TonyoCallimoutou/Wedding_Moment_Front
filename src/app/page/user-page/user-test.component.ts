import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  styleUrls: ['./user-test.component.scss']
})
export class UserTestComponent implements OnInit {

  user: any;

  constructor(
    private authService: AuthService) {}

  ngOnInit() {
    this.initUser()
  }

  /**
   * init data
   */
  initUser() {
    this.user = this.authService.getCurrentUser();
    console.log(this.user)
  }

  /**
   * Delete user
   */
  removeUser() {
    this.authService.removeUser();
  }

}
