import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModelService} from "../../viewModel/user-model.service";
import {User} from "../../model/user.model";
import {EventModelService} from "../../viewModel/event-model.service";
import {Event} from "../../model/event.model";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  private user : User;
  public listEvent : Event[] = [];

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
    this.initData()
  }

  /**
   * init list of post
   */
  private initData() {

    this.eventModelService.getAllEvent()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data:any) => {
        this.listEvent = data;
      })
  }

  public goToEvent(event : Event) {
    this.eventModelService.goToEvent(event);
    this.router.navigateByUrl("/dashboard")
  }

}
