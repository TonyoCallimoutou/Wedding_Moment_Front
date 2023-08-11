import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";
import {PostModelService} from "../../../viewModel/post-model.service";
import {UserModelService} from "../../../viewModel/user-model.service";
import {Subject, take, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {LocalModel} from "../../../model/local.model";
// @ts-ignore
import {Post} from "../../../model/post.model";
// @ts-ignore
import {User} from "../../../model/user.model";
import {CookieHelper} from "../../../shared/service/cookie.helper";
import {MatDialog} from "@angular/material/dialog";
import {GenericDialogComponent} from "../../../shared/component/generic-dialog/generic-dialog.component";
import {SnackbarService} from "../../../shared/service/snackbar.service";
import {Utils} from "../../../utils/Utils";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public tabSelector: number = 0;
  public menuList: Menu[] = [];
  public posts: Post[] = [];
  public postsGridView : Post[] = [];
  public reactPostId: number[] = [];
  public tableInviteList: TableInvite[] = [];
  public inviteList: Invite[] = [];
  public tableInviteMap: Map<PlanTable, Invite[]> = new Map<PlanTable, Invite[]>();
  public currentUser: User;
  public canAccess: boolean = false;
  public isMaster: boolean = false;
  public isActivate: boolean = false;
  public isEditable: boolean = false;
  public isEditMode: boolean = false;
  public event!: EventModel;
  public decompteDateString: string= "";

  public isTakePicture: boolean = false;

  private touchStartXY: number[] = [0, 0];
  private touchEndXY: number[] = [0, 0];

  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  public background: any;

  @ViewChild('dialogEditMode') dialogEditMode!: TemplateRef<any>;

  constructor(
    private userModelService: UserModelService,
    private eventModelService: EventModelService,
    private postModelService: PostModelService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,

  ) {
    this.event = this.eventModelService.getActualEvent();
  }

  ngOnInit() {

    this.tabSelector = Number(CookieHelper.get(LocalModel.TAB));
    this.tabSelector = this.tabSelector ? this.tabSelector : 0;

    this.route.params
      .pipe(take(1))
      .subscribe(params => {

        // params null && event null
        if (!params['id']) {
          this.router.navigate(['home-page'])
        }
        else {
          this.eventModelService.goToEventWithCode(params['id'])
            .pipe(take(1))
            .subscribe(event => {
              if (event) {
                this.eventModelService.goToEvent(event);
                this.initAll();
              } else {
                this.router.navigate(['home-page'])
              }
            });
        }

    });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.eventModelService.reinitAllObservable();
    this.userModelService.reinitAllObservable();
    this.postModelService.reinitAllObservable();
    this.onDestroy$.unsubscribe();
  }

  initAll() {

    this.initData();

    this.initUser();

    this.initMenu();

    this.initPost();

    this.initPlanTable();
  }

  initData() {
    this.event = this.eventModelService.getActualEvent();
    this.canAccess = this.userModelService.canAccess();
    this.isMaster = this.eventModelService.getIsMaster();
    this.isActivate = this.eventModelService.getIsActivate();
    this.isEditable = this.eventModelService.getIsEditable();
    this.isEditMode = this.eventModelService.getIsEditMode();

    if (this.isEditMode) {
      this.calculDecompte();

      this.dialog.open(GenericDialogComponent, {
        data: {
          contentTemplate: this.dialogEditMode,
          isDisplayButton: false,
          isDisplayCloseButton: false,
        },
      });
    }
  }

  calculDecompte() {
    let today: Date = new Date();
    let eventDate: Date = new Date(this.event.eventDate);

    let day = (eventDate.getDate() - today.getDate());

    if (day < 0) {
      this.snackbarService.showSnackbar("error", "Un erreur est survenu");
      this.router.navigate(['home-page']);
    }

    this.decompteDateString = "J-" + day;
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
          if (!Utils.equals(this.posts, data)) {
            this.posts = data;
            this.arrangeImages();
            let postsOfUser = this.posts.filter((post) => post.userId === this.userModelService.getCurrentUser().userId)
            this.userModelService.setNbrOfPostUser(postsOfUser.length);
          }
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
   * Init postsGridView
   */
  arrangeImages() {
    this.postsGridView = [];
    let positionRow = 0; // Row
    let positionColumns = 0; // Columns 0 to 2
    let grid: number[][] = [[0,0,0]]; // Grille

    this.posts.forEach((value, index) => {

      while (true) {

        if (positionColumns == 3) {
          // New Row
          positionRow++;
          positionColumns = 0;
        }
        if (!grid[positionRow]) {
          grid.push([0, 0, 0]);
        }

        // Landscape
        if (value.pictureRatio === 2) {
          if (grid[positionRow][positionColumns] == 0 && grid[positionRow][positionColumns + 1] == 0) {
            this.postsGridView.push(value);

            grid[positionRow][positionColumns] = index +1;
            positionColumns++;
            grid[positionRow][positionColumns] = index +1;
            break;
          }
        }
        // Portrait
        else if (value.pictureRatio === 0.5) {
          if (!grid[positionRow + 1]) {
            grid.push([0, 0, 0]);
          }

          if (grid[positionRow][positionColumns] == 0 && grid[positionRow + 1][positionColumns] == 0) {
            this.postsGridView.push(value);

            grid[positionRow][positionColumns] = index +1;
            grid[positionRow + 1][positionColumns] = index +1;
            break;
          }
        }
        // Square
        else {

          let indexSquare;
          for (let indexRow = 0; indexRow < grid.length; indexRow++) {
            for (let indexColumns = 0; indexColumns <grid[indexRow].length; indexColumns++) {
              // Trouver une place libre
              if (grid[indexRow][indexColumns] === 0 ) {
                indexSquare = 0;
                // Comparer avec la ligne au dessus
                if (indexRow-1 >= 0) {
                  indexSquare = Math.max(...grid[indexRow - 1])
                }
                if (indexColumns === 1) {
                  indexSquare = Math.max(indexSquare, grid[indexRow][0]);
                }
                if (indexColumns === 2) {
                  indexSquare = Math.max(indexSquare, grid[indexRow][0], grid[indexRow][1]);
                }

                grid[indexRow][indexColumns] = index +1;
                this.postsGridView.splice(indexSquare, 0, value);

                // Replacer le curseur pour les image suivantes
                if( indexRow !== positionRow && indexColumns !== positionColumns) {
                  positionColumns--;
                }
                break;
              }
            }

            if (indexSquare != undefined) {
              break;
            }
          }
          break;
        }

        positionColumns++;
      }

      // Prochaine image
      positionColumns ++ ;
      if (positionColumns == 3) {
        // New Row
        positionRow++;
        positionColumns = 0;
      }
      if(!grid[positionRow]) {
        grid.push([0,0,0]);
      }
    })
  }

  /**
   * Function call when user change step
   * @param tabulation
   */
  tab(tabulation: number) {
    this.tabSelector = tabulation;
    CookieHelper.set(LocalModel.TAB, String(this.tabSelector));
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

      if (swipeDistance > 0 && this.tabSelector > 0) {
        this.tabSelector--;
      } else if (swipeDistance < 0 && this.tabSelector < 4) {
        this.tabSelector++
      }
    }
  }

}
