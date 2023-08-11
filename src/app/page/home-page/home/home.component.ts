import {Component, ViewChild} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";
import {take} from "rxjs";
import {AuthService} from "../../../service/auth/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatCalendar} from "@angular/material/datepicker";
import {ValidatorDateBeforeToday, ValidatorDatePattern} from "../../../shared/validator/DateValidor";
import {DatePipe} from "@angular/common";
import {SnackbarService} from "../../../shared/service/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {Share} from "../../../shared/component/share-button/share-button.component";
import {TranslateService} from "@ngx-translate/core";
import {DialogQrCodeComponent} from "../../../shared/component/dialog-qr-code/dialog-qr-code.component";
import {DialogLinkComponent} from "../../../shared/component/dialog-link/dialog-link.component";
import {LoaderService} from "../../../shared/service/loader.service";
import {UserModelService} from "../../../viewModel/user-model.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  public currentUser: User | null = null;
  public canAccess: boolean = false;
  public event: EventModel | null  = null ;
  public isEditable: boolean = false;
  public isCreateEvent: boolean = false;
  public formInvite: FormGroup;
  public formEvent: FormGroup;
  public selectedDate: Date = new Date();
  public eventLink: string = '';
  public shareLink: Share | undefined;
  public metaDataShareLink: any;
  public dialogGenerate: any;
  public qrCode: string = '';
  public selected : number = 0;
  public activeScanner: boolean = false;

  private touchStartXY: number[] = [0, 0];
  private touchEndXY: number[] = [0, 0];



  @ViewChild('calendar') calendar!: MatCalendar<any>;


  constructor(
    private authService: AuthService,
    private eventModelService: EventModelService,
    private userModelService: UserModelService,
    private router: Router,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private loaderService: LoaderService,
  ) {

    this.formInvite = this.fb.group({
      code: ['', Validators.required],
    });

    this.formEvent = this.fb.group({
      presentationText: ['', Validators.required],
      date: ['', [Validators.required, ValidatorDatePattern, ValidatorDateBeforeToday]],
    });

    this.eventModelService.initUserData();
    this.currentUser = this.eventModelService.userData;

    this.canAccess = this.userModelService.canAccess();

    this.currentUser = this.currentUser?.userId === "0" ? null : this.currentUser;

    if (!!this.currentUser && this.currentUser.userId !== "0") {
      this.eventModelService.getEventsByUser(this.currentUser.userId)
        .pipe(take(1))
        .subscribe((data: EventModel) => {

          if (!!data) {
            data.eventDate = new Date(data.eventDate);
            this.event = data;
            this.isEditable =( data.isActivate || data.eventDate.toLocaleDateString() >= new Date().toLocaleDateString());
          }
        });

    }
  }

  onDateChange(inputDate: any) {
    if (this.formEvent.controls['date'].valid) {
      const currentView = this.calendar.currentView;
      this.calendar._goToDateInView(inputDate.value, currentView);
    }
  }

  onDateChangeCalendar(event: any) {
    this.formEvent.controls['date'].markAsTouched();
  }

  goToEvent() {
    this.router.navigate(['dashboard', this.event?.eventCode]);

  }

  deconnexion() {
    this.authService.SignOut();
  }

  getErrorMessage(formName: string): string {
    const form = this.formEvent.controls[formName];
    switch (formName) {
      case 'presentationText':
        if (form.hasError('required')) {
          return 'Inscription.Errors.required'
        }
        break;
      case 'date':
        if (form.hasError('required')) {
          return 'Inscription.Errors.required'
        }
        else if (form.hasError('pattern')) {
          return 'Inscription.Errors.patternDate'
        }
        else if (form.hasError('inferieur_date_jour')) {
          return 'Inscription.Errors.superieur_date_jour'
        }
        break;
    }

    return '';
  }

  createEvent() {
    const event = {
      presentationText: this.formEvent.controls['presentationText'].value,
      eventDate: this.datepipe.transform(this.formEvent.controls['date'].value, 'yyyy-MM-dd'),
    }

    this.eventModelService.createEvents(event, this.router);
  }

  goToEventWithCode() {
    this.eventModelService.getEventByCode(this.formInvite.controls['code'].value)
      .pipe(take(1))
      .subscribe((data: EventModel) => {
        if (!!data) {
          this.loaderService.setLoader(true, 1000);
          this.router.navigate(['dashboard', data.eventCode ]);
          this.loaderService.setLoader(false);
        }
        else {
          this.snackbarService.showSnackbar('error','Aucun événement trouvé');
        }
      });
  }

  generateLink() {
    this.eventLink = window.location.href.replace(this.router.url, '/dashboard/' + this.event?.eventCode);

    this.translate.get("Home.title_share_link")
      .pipe(take(1))
      .subscribe((title: string) => {
      this.translate.get("Home.message_share_link")
        .pipe(take(1))
        .subscribe((message: string) => {
          this.shareLink = {
            title: title,
            text: message,
            url: this.eventLink,
          }

          this.metaDataShareLink = {
            code: this.event?.eventCode,
            date: this.event?.eventDate.toLocaleDateString(),
          }

          this.dialogGenerate = this.dialog.open(DialogLinkComponent, {
            data: {
              shareLink: this.shareLink,
              metaDataShareLink: this.metaDataShareLink,
              eventLink: this.eventLink,
            },
          })
      })
    });
  }
  generateQRCode() {
    this.eventLink = window.location.href.replace(this.router.url, '/dashboard/' + this.event?.eventCode);
    this.qrCode = this.eventLink;

    this.dialogGenerate = this.dialog.open(DialogQrCodeComponent, {
      data: {
        qrCode: this.qrCode,
        eventCode: this.event?.eventCode,
      },
    });
  }
  onTouchStart(event: TouchEvent): void {
    this.touchStartXY = [event.touches[0].clientX, event.touches[0].clientY];
    this.touchEndXY = [event.touches[0].clientX, event.touches[0].clientY];
  }

  onTouchMove(event: TouchEvent): void {
    this.touchEndXY = [event.touches[0].clientX, event.touches[0].clientY];
  }

  onTouchEnd(): void {
    if (Math.abs(this.touchEndXY[0] - this.touchStartXY[0]) > Math.abs(this.touchEndXY[1] - this.touchStartXY[1])) {
      const swipeDistance = this.touchEndXY[0] - this.touchStartXY[0];

      if (swipeDistance > 0 && this.selected > 0) {
        this.selected--;
      } else if (swipeDistance < 0 && this.selected < 1) {
        this.selected++
      }
    }
  }

  test() {
    this.activeScanner = true
    this.snackbarService.showSnackbar();
  }
}
