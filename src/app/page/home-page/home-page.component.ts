import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModelService} from "../../viewModel/user-model.service";
import {EventModelService} from "../../viewModel/event-model.service";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {LocalModel} from "../../model/local.model";
// @ts-ignore
import {User} from "../../model/user.model";
// @ts-ignore
import {Evenement} from "../../model/event.model";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  public listEvent: EventModel[] = [];
  private onDestroy$: Subject<boolean> = new Subject<boolean>();
  private user: User;

  constructor(
    private userModelService: UserModelService,
    private eventModelService: EventModelService,
    private router: Router
  ) {
    if (eventModelService.getActualEvent() != null) {
      this.goToEvent(eventModelService.getActualEvent());
    }
    this.user = this.userModelService.getCurrentUser();
  }

  ngOnInit(): void {
    localStorage.removeItem(LocalModel.EVENT)
    this.initData()
  }

  ngOnDestroy() {
    localStorage.setItem(LocalModel.EVENT, JSON.stringify(this.eventModelService.event));
  }

  /**
   * Go to event
   * @param event
   */
  public goToEvent(event: EventModel) {
    this.eventModelService.goToEvent(event);
    this.router.navigateByUrl("/dashboard")
  }

  /**
   * init list of post
   */
  private initData() {

    this.eventModelService.getAllEvent()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: any) => {
        this.listEvent = data;
      })
  }

}
