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
    }

  ngOnInit() {
    this.userService.getAll()
    .subscribe( (data) => {
      this.users = data;
    })
  }

  addUser() {
    const userData: User = new User(
      'user.displayName',
      'user.email',
      true,
      'user.uid',
      'user.photoURL'
  );
    this.userService.create(userData)
    .subscribe( data => {
        console.log(data);
    })
  }

  removeUser() {
    this.userService.delete(1)
    .subscribe( data => {
      console.log(data);
    })
  }

}
