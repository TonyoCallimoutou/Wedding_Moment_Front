import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {User} from 'src/app/model/user.model';
import {UserModelService} from 'src/app/viewModel/user-model.service';
import {EventModelService} from "../../../viewModel/event-model.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {


  @Input() public canAccess!: boolean;
  @Input() public currentUser!: User;


  constructor(
    private userModelService: UserModelService,
    private eventModelService: EventModelService,
    private router: Router
  ) {
  }

  /**
   * Change post
   */
  switchPost() {
    if (this.currentUser.photoUrl != "https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg") {
      this.userModelService.setPhotoUrl("https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg")
    } else {
      this.userModelService.setPhotoUrl("https://lh3.googleusercontent.com/a/ALm5wu0VgI6sRIEJezlrivPk95_aYMUEvzoHB_o0GRwA=s96-c")
    }
  }

  /**
   * Navigate to setting
   */
  goToSetting() {
    this.router.navigateByUrl('/setting', {state: this.currentUser});
  }

  /**
   * Navigate to home page
   */
  switchEvent() {
    this.eventModelService.resetActualEvent();
    this.router.navigateByUrl('/HomePage');
  }

}
