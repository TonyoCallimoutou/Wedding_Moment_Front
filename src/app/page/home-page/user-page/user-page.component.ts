import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserModelService} from 'src/app/viewModel/user-model.service';
import {EventModelService} from "../../../viewModel/event-model.service";
// @ts-ignore
import {User} from 'src/app/model/user.model';
import {AuthService} from "../../../service/auth/auth.service";
import {GenericDialogComponent} from "../../../shared/component/generic-dialog/generic-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {LocalModel} from "../../../model/local.model";
import {TranslateService} from "@ngx-translate/core";
import {take} from "rxjs";

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
  @Input() public currentUser: User;
  @Input() public isMaster: boolean = false;

  public pictureSrc: any;
  private newUserPicture: any;

  public languages: Language[];

  public selectedLanguage: Language;

  @ViewChild('dialogChangePicture') dialogChangePicture!: TemplateRef<any>;
  @ViewChild('dialogChangeUserName') dialogChangeUserName!: TemplateRef<any>;
  @ViewChild('dialogChangeLanguage') dialogChangeLanguage!: TemplateRef<any>;
  @ViewChild('dialogConfidentialite') dialogConfidentialite!: TemplateRef<any>;


  constructor(
    private userModelService: UserModelService,
    private eventModelService: EventModelService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService,
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
    let defaultLanguageCode = localStorage.getItem(LocalModel.LANGUAGE);
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
    this.newUserPicture = picture;
  }

  /**
   * Navigate to home page
   */
  switchEvent() {
    this.eventModelService.resetActualEvent();
    this.router.navigateByUrl('/home-page');
  }

  /**
   * Open dialog to change User Name
   */
  changeUserName() {
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {contentTemplate: this.dialogChangeUserName },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userModelService.setUserName(this.currentUser);
      }
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
        if (this.selectedLanguage.code !== localStorage.getItem(LocalModel.LANGUAGE)) {
          localStorage.setItem(LocalModel.LANGUAGE, this.selectedLanguage.code);
          window.location.reload();
        }
      }
    });
  }

  /**
   * Open dialog for confidentiality
   */
  goToConfidentiality() {
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {contentTemplate: this.dialogConfidentialite },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
      }
    });
  }

  /**
   * Sign out
   */
  signOut() {
    this.authService.SignOut();
  }

  /**
   * Delete user
   */
  removeUser() {
    this.authService.RemoveUser();
  }

  /**
   * L'admin peut exporter les Photos de l'evenement.
   */
  exportPicture() {
    this.userModelService.exportPicture()
      .subscribe(value => {
        console.log(value)
      }, (error) => {
        console.log("error", error)
        // Gérer les erreurs
      }, () => {
        // Le téléchargement est terminé
        console.log("ok")
      });
  }

}
