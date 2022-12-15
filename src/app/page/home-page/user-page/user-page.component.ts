import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserModelService } from 'src/app/viewModel/user-model.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  public user: User;

  constructor(
    private userModelService: UserModelService,
    private router: Router
    ) {
      this.user = this.userModelService.getCurrentUser();
    }

  ngOnInit() {
  }

  /**
   * Change post
   */
  switchPost() {
    if (this.user.photoUrl != "https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg") {
      this.userModelService.setPhotoUrl("https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg")
    }
    else {
      this.userModelService.setPhotoUrl("https://lh3.googleusercontent.com/a/ALm5wu0VgI6sRIEJezlrivPk95_aYMUEvzoHB_o0GRwA=s96-c")
    }
  }

  /**
   * Navigate to setting
   */
  goToSetting() {
    this.router.navigateByUrl('/setting', { state: this.user });
  }

}
