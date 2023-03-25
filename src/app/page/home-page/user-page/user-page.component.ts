import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {UserModelService} from 'src/app/viewModel/user-model.service';
import {EventModelService} from "../../../viewModel/event-model.service";
// @ts-ignore
import {User} from 'src/app/model/user.model';
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  @Input() public canAccess!: boolean;
  @Input() public currentUser: User;

  public viewContent1 : boolean = true;
  public viewContent2 : boolean = true;
  public viewContent3 : boolean = true;


  constructor(
    private userModelService: UserModelService,
    private eventModelService: EventModelService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  /**
   * Change post
   */
  switchPost(event: any) {
    const fileUpload = event.target.files[0];
    this.userModelService.setPhotoUrl(fileUpload);
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
    this.router.navigateByUrl('/home-page');
  }

  signOut() {
    this.authService.SignOut();
  }

  /**
   * Delete user
   */
  removeUser() {
    this.authService.RemoveUser();
  }

}
