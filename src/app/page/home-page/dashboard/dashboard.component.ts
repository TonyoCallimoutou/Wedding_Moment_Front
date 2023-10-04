import {AfterViewInit, Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";
import {PostModelService} from "../../../viewModel/post-model.service";
import {UserModelService} from "../../../viewModel/user-model.service";
import {Subject, take, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieHelper} from "../../../shared/service/cookie.helper";
import {MatDialog} from "@angular/material/dialog";
import {GenericDialogComponent} from "../../../shared/component/dialog/generic-dialog/generic-dialog.component";
import {SnackbarService} from "../../../shared/service/snackbar.service";
import {Utils} from "../../../utils/Utils";
import {DOCUMENT} from "@angular/common";
import {Menu} from "../../../model/menu.model";
import {Post} from "../../../model/post.model";
import {Invite, PlanTable, TableInvite} from "../../../model/table-invite.model";
import {User} from "../../../model/user.model";
import {EventModel} from "../../../model/event.model";
import {LocalModel} from "../../../model/local.model";
import {Report} from "../../../model/report.model";
import {LoaderService} from "../../../shared/service/loader.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy,  AfterViewInit {

  public previousTab: number = 0;
  public tabSelector: number = 0;
  public menuList: Menu[] = [];
  public posts: Post[] = [];
  public postsOffline: Post[] = [];
  public postsGridView : Post[] = [];
  public reactPostId: number[] = [];
  public tableInviteList: TableInvite[] = [];
  public inviteList: Invite[] = [];
  public tableInviteMap: Map<PlanTable, Invite[]> = new Map<PlanTable, Invite[]>();
  public currentUser!: User;
  public canAccess: boolean = false;
  public isMaster: boolean = false;
  public isActivate: boolean = false;
  public isEditable: boolean = false;
  public isEditMode: boolean = false;
  public event!: EventModel;
  public decompteDateString: string= "";

  public isTakePicture: boolean = false;
  public isReport : boolean = false;
  public postReport : Post = {} as Post;

  private touchStartXY: number[] = [0, 0];
  private touchEndXY: number[] = [0, 0];

  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  public background: any;

  public isTabDesactive: boolean = false;

  private installPrompt : any;
  public needInstallPWA: boolean = false;
  public needInstallPWAChrome: boolean = false;
  public needInstallPWASafari: boolean = false;
  public needInstallPWAOpera: boolean = false;
  public needInstallPWAFirefox: boolean = false;
  public needInstallPWADefault: boolean = false;

  @ViewChild('dialogEditMode') dialogEditMode!: TemplateRef<any>;

  constructor(
    private userModelService: UserModelService,
    private eventModelService: EventModelService,
    private postModelService: PostModelService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private loaderService: LoaderService,

    @Inject(DOCUMENT) private document: any,

  ) {
    this.event = this.eventModelService.getActualEvent();
  }

  ngOnInit() {

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

  ngAfterViewInit() {
    this.tabSelector = Number(CookieHelper.get(LocalModel.TAB));
    this.tabSelector = this.tabSelector ? this.tabSelector : 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.eventModelService.reinitAllObservable();
    this.userModelService.reinitAllObservable();
    this.postModelService.reinitAllObservable();
    this.onDestroy$.unsubscribe();
  }

  initAll() {

    this.loaderService.setLoader(false);

    if (!window.matchMedia('(display-mode: fullscreen)').matches) {
      this.initPWA();
    }

    this.initData();

    this.initUser();

    this.initMenu();

    this.initPost();

    this.initPlanTable();
  }


  initPWA() {
    // Récupérez les informations sur le navigateur
    const userAgent = navigator.userAgent;

    const isAndroid = /Android/i.test(userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
    const isFirefox = /Firefox/i.test(userAgent);
    const isOpera = /Opera|OPR/i.test(userAgent);
    const isChrome = /Chrome/i.test(userAgent);
    const isSafari = /Safari/i.test(userAgent);

    let deviceName = isAndroid ? "Android" : isIOS ? "iOS" : "Autre";

    let browserName;

    switch (true) {
      case isAndroid && isChrome:
        browserName = 'Google Chrome';
        this.beforeInstallPrompt();
        break;
      case isFirefox:
        browserName = 'Firefox';
        this.needInstallPWAFirefox = true;
        break;
      case isOpera:
        browserName = 'Opera';
        this.needInstallPWAOpera = true;
        break;
      case isChrome:
        browserName = 'Google Chrome';
        this.needInstallPWAChrome = true;
        break;
      case isSafari:
        browserName = 'Safari';
        this.needInstallPWASafari = true;
        break;
      default:
        browserName = 'Autre';
        this.needInstallPWADefault = true;
        break;
    }

    // Affichez le nom du navigateur dans la console
    console.log(`Vous utilisez ${browserName}, sur ${deviceName}`);
  }

  beforeInstallPrompt() {

    const newStartURL = window.location.href
    const baseUrl = window.location.origin + '/'
    const manifestLink = document.querySelector('link[rel="manifest"]');

    if (manifestLink instanceof HTMLLinkElement) {
      fetch(manifestLink.href)
        .then(response => response.json())
        .then(manifest => {
          manifest.start_url = newStartURL;
          manifest.scope = baseUrl;
          for (let icons of manifest.icons) {
            icons.src = baseUrl + icons.src;
          }
          const updatedManifest = JSON.stringify(manifest);
          const blob = new Blob([updatedManifest], { type: 'application/json' });
          manifestLink.href = URL.createObjectURL(blob);
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour du manifeste :', error);
        });
    }

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      this.installPrompt = event;
      this.needInstallPWA = true;
    });
  }

  async installPwa() {
    this.installPrompt.prompt();
    // Find out whether the user confirmed the installation or not
    const { outcome } = await this.installPrompt.userChoice;
    // The deferredPrompt can only be used once.
    this.installPrompt = null;
    // Act on the user's choice
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt.');
    } else if (outcome === 'dismissed') {
      console.log('User dismissed the install prompt');
    }
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

      //this.postModelService.updatePostWithFirebase();

      this.postModelService.getAllOffline()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((data: Post[]) => {
          this.postsOffline = data;
        });

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
            this.tableInviteMap.set(planTable, invite.inviteId ? [invite] : []);
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
  tab(tabulation: number): void {
    this.previousTab = this.tabSelector;
    this.tabSelector = tabulation;
    CookieHelper.set(LocalModel.TAB, String(this.tabSelector));
  }

  inEdition(desactiveTab: boolean) {
    this.isTabDesactive = desactiveTab;
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

  reportPost(post: Post) {
    this.isReport = true;
    this.postReport = post;
  }

  sendReport(report: Report) {
    this.postModelService.reportedPost(report, this.postReport).then(() => {
      this.snackbarService.showSnackbar("tips", "Le post a été signalé");
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
    if (Math.abs(this.touchEndXY[0] - this.touchStartXY[0]) > Math.abs(this.touchEndXY[1] - this.touchStartXY[1])
      && Math.abs(this.touchEndXY[0] - this.touchStartXY[0]) > window.innerWidth / 4
    ) {
      const swipeDistance = this.touchEndXY[0] - this.touchStartXY[0];

      if (swipeDistance > 0 && this.tabSelector > 0) {
        this.tab(this.tabSelector - 1);
      } else if (swipeDistance < 0 && this.tabSelector < 4) {
        this.tab(this.tabSelector + 1);
      }
    }
  }

}
