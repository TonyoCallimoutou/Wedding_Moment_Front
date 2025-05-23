import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserModelService} from 'src/app/viewModel/user-model.service';
import {EventModelService} from "../../../viewModel/event-model.service";
// @ts-ignore
import {User} from 'src/app/model/user.model';
import {AuthService} from "../../../service/auth/auth.service";
import {GenericDialogComponent} from "../../../shared/component/dialog/generic-dialog/generic-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {CookieHelper} from "../../../shared/service/cookie.helper";
import {CguDialogComponent} from "../../../shared/component/dialog/cgu-dialog/cgu-dialog.component";
import {DialogLinkComponent} from "../../../shared/component/dialog/dialog-link/dialog-link.component";
import {DialogQrCodeComponent} from "../../../shared/component/dialog/dialog-qr-code/dialog-qr-code.component";
import {take} from "rxjs";
import {Share} from "../../../shared/component/share-button/share-button.component";
import {SnackbarService} from "../../../shared/service/snackbar.service";
import {EventModel} from "../../../model/event.model";
import {LocalModel} from "../../../model/local.model";

interface Language {
  code: string;
  language: string;
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  @Input() public canAccess!: boolean;
  @Input() public currentUser!: User;
  @Input() public event?: EventModel;
  @Input() public isMaster: boolean = false;
  @Input() public isEditMode: boolean = false;
  @Input() public checked: boolean = false;

  public pictureSrc: any;
  private newUserPicture: any;

  public userName: string = '';

  public languages: Language[];

  public selectedLanguage: Language;

  @ViewChild('dialogChangePicture') dialogChangePicture!: TemplateRef<any>;
  @ViewChild('dialogChangeUserName') dialogChangeUserName!: TemplateRef<any>;
  @ViewChild('dialogChangeLanguage') dialogChangeLanguage!: TemplateRef<any>;
  @ViewChild('dialogAreYouSureExport') dialogAreYouSureExport!: TemplateRef<any>;
  @ViewChild('dialogAreYouSureLogout') dialogAreYouSureLogout!: TemplateRef<any>;
  @ViewChild('dialogAreYouSureDelete') dialogAreYouSureDelete!: TemplateRef<any>;


  constructor(
    private userModelService: UserModelService,
    private eventModelService: EventModelService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService,
    private snackbarService: SnackbarService,
  ) {

    this.languages = [
      {
        code: "en",
        language: ""
      },
      {
        code: "fr",
        language: ""
      }
    ];
    translate.get("Users.Languages.english").subscribe((res: string) => {
      this.languages[0].language = res;
    })
    translate.get("Users.Languages.french").subscribe((res: string) => {
      this.languages[1].language = res;
    })
    let defaultLanguageCode = CookieHelper.get(LocalModel.LANGUAGE);
    this.selectedLanguage = this.languages.filter(language => language.code == defaultLanguageCode)[0];
  }

  /**
   * Clique to change user picture
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

  /**
   * Open dialog for change user picture
   * @param event
   */
  switchPictureUrl(event: any) {
    this.pictureSrc = event;

    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {contentTemplate: this.dialogChangePicture },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.currentUser.photoUrl = this.newUserPicture;
        this.userModelService.setPhotoUrl(this.newUserPicture);
      }
      this.newUserPicture = null;
    });
  }

  /**
   * set cropped picture
   * @param picture
   */
  getNewPicture(picture: any) {
    this.newUserPicture = picture.picture;
  }

  /**
   * Open dialog to change User Name
   */
  changeUserName() {
    this.userName = this.currentUser.userName;
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {contentTemplate: this.dialogChangeUserName },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.currentUser.userName = this.userName;
        this.userModelService.setUserName(this.currentUser);
      }
      this.userName = '';
    });
  }

  /**
   * Open dialog to change language
   */
  changeLanguage() {
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {contentTemplate: this.dialogChangeLanguage },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.selectedLanguage.code !== CookieHelper.get(LocalModel.LANGUAGE)) {
          CookieHelper.set(LocalModel.LANGUAGE, this.selectedLanguage.code);
          window.location.reload();
        }
      }
    });
  }

  /**
   * Open dialog for confidentiality and CGU
   */
  goToCGUAndConfidentialite(isConfidentiality: boolean = false) {
    this.dialog.open(CguDialogComponent, {
      data: {
        isConfidentiality: isConfidentiality,
        switchAutorize: false,
      },
    });
  }

  /**
   * Sign out
   */
  signOut() {
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {contentTemplate: this.dialogAreYouSureLogout },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.SignOut();
      }
    });
  }

  /**
   * Delete user
   */
  removeUser() {
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {contentTemplate: this.dialogAreYouSureDelete },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.RemoveUser();
      }
    });

  }

  /**
   * L'admin peut exporter les Photos de l'evenement.
   */
  exportPicture() {
    this.test();
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {contentTemplate: this.dialogAreYouSureExport },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("export avec originaux:", this.checked);
        this.userModelService.exportPicture();
      }
    });

  }

  openDialogLink() {

    this.translate.get("Home.title_share_link")
      .pipe(take(1))
      .subscribe((title: string) => {
        this.translate.get("Home.message_share_link")
          .pipe(take(1))
          .subscribe((message: string) => {
            let shareLink : Share = {
              title: title,
              text: message,
              url: window.location.href,
            }

            let metaDataShareLink = {
              code: this.event?.eventCode,
              date: this.event?.eventDate.toLocaleDateString(),
            }

            this.dialog.open(DialogLinkComponent, {
              data: {
                shareLink: shareLink,
                metaDataShareLink: metaDataShareLink,
                eventLink: window.location.href,
              },
            })
          })
      });

  }

  openDialogQrCode() {
    this.dialog.open(DialogQrCodeComponent, {
      data: {
        qrCode: window.location.href,
        eventCode: this.event?.eventCode,
      }
    });
  }

  test() {
    this.snackbarService.showSnackbar();
  }

}
