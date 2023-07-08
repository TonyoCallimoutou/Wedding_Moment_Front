import {Component, OnInit, ViewChild} from '@angular/core';
import {UserModelService} from "../../../viewModel/user-model.service";
import {EventModelService} from "../../../viewModel/event-model.service";
import {take} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import firebase from "firebase/compat";
import auth = firebase.auth;
import {AuthService} from "../../../service/auth/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatCalendar, MatCalendarCellClassFunction} from "@angular/material/datepicker";
import {ValidatorDateBeforeToday, ValidatorDatePattern} from "../../../shared/validator/DateValidor";
import {DatePipe} from "@angular/common";
import {SnackbarService} from "../../../shared/service/snackbar.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  public currentUser: User | null = null;
  public event: EventModel | null  = null ;
  public isEditable: boolean = false;
  public isCreateEvent: boolean = false;
  public formInvite: FormGroup;
  public formEvent: FormGroup;
  public selectedDate: Date = new Date();


  @ViewChild('calendar') calendar!: MatCalendar<any>;

  constructor(
    private authService: AuthService,
    private eventModelService: EventModelService,
    private router: Router,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private snackbarService: SnackbarService,
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

          this.router.navigate(['dashboard', data.eventCode ]);
        }
        else {
          this.snackbarService.showSnackbar('error','Aucun événement trouvé');
        }
      });
  }

  test() {
    this.snackbarService.showSnackbar();
  }
}
