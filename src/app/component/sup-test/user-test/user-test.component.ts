import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  styleUrls: ['./user-test.component.scss']
})
export class UserTestComponent implements OnInit {

  user: any;

  constructor(
    private authService: AuthService) {
      this.user = this.authService.getCurrentUser();
      console.log(this.user)
    }

  ngOnInit() {
  }

  removeUser() {
    this.authService.removeUser();
  }

}
