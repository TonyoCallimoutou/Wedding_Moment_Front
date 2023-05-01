import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";
import {PostModelService} from "../../../viewModel/post-model.service";
import {UserModelService} from "../../../viewModel/user-model.service";
import {Observable, Subject, take, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {LocalModel} from "../../../model/local.model";
// @ts-ignore
import {Post} from "../../../model/post.model";
// @ts-ignore
import {User} from "../../../model/user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public tabSelector: number = 0;
  public menuList: Menu[] = [];
  public posts: Post[] = [];
  public reactPostId: number[] = [];
  public tableInviteList: TableInvite[] = [];
  public inviteList: Invite[] = [];
  public tableInviteMap: Map<PlanTable, Invite[]> = new Map<PlanTable, Invite[]>();
  public currentUser: User;
  public canAccess: boolean;
  public isMaster: boolean;
  public event: EventModel;

  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  public background: any;

  constructor(
    private userModelService: UserModelService,
    private eventModelService: EventModelService,
    private postModelService: PostModelService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.event = this.eventModelService.getActualEvent();
    this.canAccess = this.userModelService.canAccess();
    this.isMaster = this.eventModelService.getIsMaster();
  }

  ngOnInit() {

    this.tabSelector = Number(localStorage.getItem(LocalModel.TAB));
    this.tabSelector = this.tabSelector ? this.tabSelector : 0;

    this.route.params.subscribe(params => {

      if (!params['id'] && !this.event) {
        this.router.navigate(['home-page'])
      }
      else if (params['id'] && this.event.eventId != params['id']) {
        this.eventModelService.goToEventWithId(params['id'])
          .pipe(take(1))
          .subscribe(event => {
            if (event) {
              this.eventModelService.goToEvent(event);
              this.initUser();

              this.initMenu();

              this.initPost();

              this.initPlanTable();
            }
            else {
              this.router.navigate(['home-page'])
            }
          })
      }
      else {
        this.initUser();

        this.initMenu();

        this.initPost();

        this.initPlanTable();
      }



    });

  }


  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  /**
   * Set Current User
   */
  initUser() {
    this.currentUser = this.userModelService.getCurrentUser();
  }

  /**
   * set menuList
   */
  initMenu() {
    this.eventModelService
      .getMenu()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: any) => {
        this.menuList = data;
      })
  }

  /**
   * set posts && reactPostId
   */
  initPost() {
    if (this.canAccess) {
      this.postModelService.getAll()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((data: Post[]) => {
          this.posts = data;
          let postsOfUser = this.posts.filter((post) => post.userId === this.userModelService.getCurrentUser().userId)
          this.userModelService.setNbrOfPostUser(postsOfUser.length)
        })

      this.postModelService.getObsListOfReactPost()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((data: any) => {
          this.reactPostId = data;
        })
    }
  }

  /**
   * set tableInviteMap && tableInviteList && inviteList
   */
  initPlanTable() {
    this.eventModelService
      .getPlanTable()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: any[]) => {

        this.tableInviteMap = new Map<PlanTable, Invite[]>();
        this.tableInviteList = [];
        this.inviteList = [];

        for (let i = 0; i < data.length; i++) {
          let planTable: PlanTable = {
            eventId: data[i].eventId,
            planTableId: data[i].planTableId,
            tableName: data[i].tableName
          }

          let invite: Invite = {
            inviteId: data[i].inviteId,
            eventId: data[i].eventId,
            planTableId: data[i].planTableId,
            inviteName: data[i].inviteName
          }

          if (data[i].inviteId != null) {
            this.inviteList.push(invite);
          }

          let planTableFilter = this.tableInviteList.filter(item => item.planTableId === planTable.planTableId);

          if (planTableFilter.length > 0) {

            let list = this.tableInviteMap.get(planTableFilter[0]);
            // @ts-ignore
            list.push(invite);
            // @ts-ignore
            this.tableInviteMap.set(planTableFilter[0], list)
          } else {
            this.tableInviteMap.set(planTable, [invite]);
            this.tableInviteList.push(<TableInvite>planTable);
          }
        }
      })
  }

  /**
   * Function call when user change step
   * @param tabulation
   */
  tab(tabulation: number) {
    this.tabSelector = tabulation;
    localStorage.setItem(LocalModel.TAB, String(this.tabSelector));
  }

  /**
   * Set Background temporary
   * @param image
   */
  setTemporaryBackground(image: any) {
    this.background = image;
  }

  /**
   * Function call to change background of event
   * @param image
   */
  setFinallyBackground(image: any) {
    this.eventModelService.setEventPicture(image);
  }

}
