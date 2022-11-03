import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  styleUrls: ['./user-test.component.scss']
})
export class UserTestComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userService: UserService) {
      this.ngOnInit()
    }

  ngOnInit() {
    this.userService.getAll()
    .subscribe( (data) => {
      this.users = data;
    })
  }

}
