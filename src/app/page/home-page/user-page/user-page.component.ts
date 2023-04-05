import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserModelService} from 'src/app/viewModel/user-model.service';
import {EventModelService} from "../../../viewModel/event-model.service";
// @ts-ignore
import {User} from 'src/app/model/user.model';
import {AuthService} from "../../../service/auth.service";
import {GenericDialogComponent} from "../../../shared/component/generic-dialog/generic-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  @Input() public canAccess!: boolean;
  @Input() public currentUser: User;

  public pictureSrc: any;
  private newUserPicture: any;

  public viewContent1 : boolean = true;
  public viewContent2 : boolean = true;
  public viewContent3 : boolean = true;

  @ViewChild('dialogChangePicture') dialogChangePicture!: TemplateRef<any>;
  @ViewChild('dialogChangeUserName') dialogChangeUserName!: TemplateRef<any>;
  @ViewChild('dialogChangeLanguage') dialogChangeLanguage!: TemplateRef<any>;
  @ViewChild('dialogConfidentialite') dialogConfidentialite!: TemplateRef<any>;


  constructor(
    private userModelService: UserModelService,
    private eventModelService: EventModelService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
  }

  /**
   * Change picture Url
   */
  changePicture() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.png,.jpg';
    fileInput.addEventListener('change', (event: any) => {
      this.switchPictureUrl(event);
    });
    fileInput.click();
  }

  switchPictureUrl(event: any) {
    this.pictureSrc = event;

    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {contentTemplate: this.dialogChangePicture },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userModelService.setPhotoUrl(this.newUserPicture);
      }
      this.newUserPicture = null;
    });
  }

  getNewPicture(picture: any) {
    this.newUserPicture = picture;
  }

  /**
   * Navigate to home page
   */
  switchEvent() {
    this.eventModelService.resetActualEvent();
    this.router.navigateByUrl('/home-page');
  }

  changeUserName() {
    console.log("change user name")
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {contentTemplate: this.dialogChangeUserName },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userModelService.setUserName(this.currentUser);
      }
    });
  }

  changeLanguage() {
    console.log("change language")
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {contentTemplate: this.dialogChangeLanguage },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
      }
    });
  }

  goToConfidentialite() {
    console.log('confidentialité')
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {contentTemplate: this.dialogConfidentialite },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
      }
    });
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
