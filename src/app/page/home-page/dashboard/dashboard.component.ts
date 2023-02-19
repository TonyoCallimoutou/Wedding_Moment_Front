import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";
import {PostModelService} from "../../../viewModel/post-model.service";
import {UserModelService} from "../../../viewModel/user-model.service";
import {Subject, takeUntil} from "rxjs";
import {Post} from "../../../model/post.model";
import {Event} from "../../../model/event.model";
import {User} from "../../../model/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  public tabSelector: number = 1;


  public menuList : any[] = [];

  public posts: Post[] = [];
  public reactPostId: number[] = [];

  public planTableList: any[] = [];
  public inviteList: any[] = [];
  public planTableMap: Map<any, any[]> = new Map<any, any[]>();

  public currentUser: User;
  public canAccess : boolean;

  public isMaster : boolean;

  constructor(
    private userModelService: UserModelService,
    private eventModelService: EventModelService,
    private postModelService: PostModelService,
    private router : Router
  ) {

    this.currentUser = this.userModelService.getCurrentUser();
    this.canAccess = this.userModelService.canAccess();
    this.isMaster = eventModelService.getIsMaster();
  }

  ngOnInit() {

    if (!this.eventModelService.getActualEvent()) {
      this.router.navigate(['home-page'])
    }

    this.initMenu();

    this.initPost();

    this.initPlanTable();

  }

  initMenu() {
    this.eventModelService
      .getMenu()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data:any) => {
        this.menuList = data;
      })
  }

  initPost() {
    if (this.canAccess) {
      this.postModelService.getAll()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((data:any) => {
          this.posts = data;
        })

      this.postModelService.getObsListOfReactPost()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((data:any) => {
          this.reactPostId = data;
        })
    }
  }

  initPlanTable() {
    this.eventModelService
      .getPlanTable()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data:any[]) => {

        this.planTableMap = new Map<any, any[]>();
        this.planTableList = [];
        this.inviteList = [];

        for (let i=0; i<data.length; i++) {
          let planTable = {
            eventId : data[i].eventId,
            planTableId : data[i].planTableId,
            tableName : data[i].tableName
          }

          let invite = {
            inviteId : data[i].inviteId,
            eventId : data[i].eventId,
            planTableId : data[i].planTableId,
            inviteName : data[i].inviteName
          }

          let planTableFilter = this.planTableList.filter(item => item.planTableId === planTable.planTableId);

          if ( planTableFilter.length > 0) {

            let list = this.planTableMap.get(planTableFilter[0]);
            // @ts-ignore
            list.push(invite);
            // @ts-ignore
            this.planTableMap.set(planTableFilter[0], list)
          }
          else {
            this.planTableMap.set(planTable,[invite]);
            this.planTableList.push(planTable);
            if (data[i].inviteId != null) {
              this.inviteList.push((invite));
            }
          }
        }
      })
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  tab(tabulation: number) {
    this.tabSelector = tabulation;
  }

}
