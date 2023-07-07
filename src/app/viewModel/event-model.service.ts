import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, take, tap} from 'rxjs';
import {EventService} from '../service/event.service';
import {SocketIoService} from '../service/socket-io.service';
import {UserModelService} from './user-model.service';
import {PostModelService} from "./post-model.service";
import {LocalModel} from "../model/local.model";
// @ts-ignore
import {User} from '../model/user.model';
// @ts-ignore
import {EventModel} from "../model/event.model";
// @ts-ignore
import {Menu} from "../model/menu.model";
// @ts-ignore
import {TableInvite} from "../model/table-invite.model";
import {StorageModelService} from "./storage-model.service";
import {CookieService} from "ngx-cookie-service";
import {CookieHelper} from "../service/cookie.helper";


@Injectable({
  providedIn: 'root',
})
export class EventModelService {

  userData: User;
  event: EventModel;
  private listOfMenu: Menu[] = [];
  private listOfTableInvite: TableInvite[] = [];
  private listOfMenuObs$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);
  private listOfTableInviteObs$: BehaviorSubject<TableInvite[]> = new BehaviorSubject<TableInvite[]>([]);

  private isActivate: boolean = false;
  private isMaster: boolean = false;
  private isEditable: boolean = false;
  private isEditMode: boolean = false;

  constructor(
    private userModelService: UserModelService,
    private postModelService: PostModelService,
    public eventService: EventService,

    private storageModelService: StorageModelService,
    public socketService: SocketIoService
  ) {

    this.initListeningFromSocket();

    this.initList();

    this.initUserData()
  }

  initUserData() {
    this.userData = this.userModelService.getCurrentUser();
    if (!!this.event && !!this.userData) {
      this.isMaster = this.event.userId === this.userData.userId;
    }
  }

  initList() {

    if (this.event == null) {
      let eventString = CookieHelper.get(LocalModel.EVENT);
      if (!!eventString) {
        this.event = JSON.parse(eventString);
        this.goToEvent(this.event);
      }
    }
    else {
      this.initEventData();
    }
  }

  initListeningFromSocket() {

    this.socketService.socket.on('listeningSetEvent', (event: EventModel) => {
      if (this.event.eventId == event.eventId) {
        this.event = event;
        CookieHelper.set(LocalModel.EVENT, JSON.stringify(this.event));
      }
    })

    this.socketService.socket.on('listeningAddMenu', (menu: any) => {
      this.listOfMenu.push(menu);
      this.listOfMenuObs$.next(this.listOfMenu);
    });

    this.socketService.socket.on('listeningRemoveMenu', (menu: any) => {
      this.listOfMenu = this.listOfMenu.filter(item => item.menuId !== menu.menuId);
      this.listOfMenuObs$.next(this.listOfMenu);
    });

    this.socketService.socket.on('listeningSetMenu', (menu: any) => {
      const index = this.listOfMenu.findIndex((obj) => obj.menuId === menu.menuId);
      if (index !== -1) {
        this.listOfMenu.splice(index, 1, menu);
        this.listOfMenuObs$.next(this.listOfMenu);
      }
    });

    this.socketService.socket.on('listeningAddInvite', (invite: any) => {
      this.listOfTableInvite.push(invite);
      this.listOfTableInviteObs$.next(this.listOfTableInvite);
    });

    this.socketService.socket.on('listeningRemoveInvite', (invite: any) => {
      for (let i = 0; i < this.listOfTableInvite.length; i++) {
        if (this.listOfTableInvite[i].inviteId == invite.inviteId) {
          this.listOfTableInvite[i].inviteId = null;
          this.listOfTableInvite[i].inviteName = null;
        }
      }
      this.listOfTableInviteObs$.next(this.listOfTableInvite);
    });

    this.socketService.socket.on('listeningSetInvite', (invite: any) => {
      this.listOfTableInvite = this.listOfTableInvite.filter(item => item.inviteId !== invite.inviteId);
      this.listOfTableInvite.push(invite);
      this.listOfTableInviteObs$.next(this.listOfTableInvite);
    });

    this.socketService.socket.on('listeningAddPlanTable', (tableInvite: any) => {
      this.listOfTableInvite.push(tableInvite);
      this.listOfTableInviteObs$.next(this.listOfTableInvite);
    });

    this.socketService.socket.on('listeningRemovePlanTable', (tableInvite: any) => {
      this.listOfTableInvite = this.listOfTableInvite.filter(item => item.planTableId !== tableInvite.planTableId);
      this.listOfTableInviteObs$.next(this.listOfTableInvite);
    });

    this.socketService.socket.on('listeningSetPlanTable', (tableInvite: any) => {
      this.listOfTableInvite = this.listOfTableInvite.filter(item => item.planTableId !== tableInvite.planTableId);
      this.listOfTableInvite.push(tableInvite);
      this.listOfTableInviteObs$.next(this.listOfTableInvite);
    });
  }

  goToEvent(event: EventModel) {
    this.event = event;
    this.eventService.goToEvent(event);

    if(this.userData) {
      this.isMaster = this.event.userId === this.userData.userId;
    }
    this.initEventData();
  }

  goToEventWithId(eventId: number): Observable<any> {
    return this.eventService.getEventById(eventId)
      .pipe(
        tap((event: EventModel) => {
          if (!!event) {
            if (event.isActivate || event.userId === this.userData.userId) {
              if (this.userData) {
                this.isMaster = event.userId === this.userData.userId;
              }
              this.isActivate = event.isActivate;
              this.isEditable = this.isMaster && (this.isActivate || event.eventDate > new Date().toISOString());

              this.isEditMode = this.isEditable && !this.isActivate;
            }
            else {
              event.property = null;
            }
          }
        }
      ));
  }

  getActualEvent(): EventModel {
    return this.event;
  }

  getIsMaster(): boolean {
    return this.isMaster;
  }

  getIsActivate(): boolean {
    return this.isActivate;
  }

  getIsEditable(): boolean {
    return this.isEditable;
  }

  getIsEditMode(): boolean {
    return this.isEditMode;
  }

  initEventData() {
    this.eventService.getMenu(this.event.eventId)
      .pipe(take(1))
      .subscribe((data: any) => {
        this.listOfMenu = data;
        this.listOfMenuObs$.next(data);
      });

    this.eventService.getPlanTable(this.event.eventId)
      .pipe(take(1))
      .subscribe((data: any) => {
        this.listOfTableInvite = data;
        this.listOfTableInviteObs$.next(data);
      });

    this.postModelService.initPostModelService();
  }

  // Create Event
  createEvents(name: string) {
    const data: EventModel = {
      userId: this.userData.userId,
      name: name
    }
    this.eventService.createEvent(data)
      .pipe(take(1))
      .subscribe(data => {
        this.socketService.setEvent(data)
      })
  }

  setEventPicture(pictureUrl: any) {
    this.storageModelService.uploadEventPictureAndGetUrl(pictureUrl).then(url => {
      this.event.pictureUrl = url;
      this.eventService.setEventPicture(this.event)
        .pipe(take(1))
        .subscribe(() => {
          this.socketService.setEvent(this.event);
        });
    });
  }

  setPresentationText(presentation: EventModelPresentation) {
    this.event.presentationText = presentation.presentationText;
    this.event.presentationTextSize = presentation.presentationTextSize;
    this.event.presentationTextAlign = presentation.presentationTextAlign;
    this.eventService.setPresentationText(this.event)
      .pipe(take(1))
      .subscribe(() => {
        this.socketService.setEvent(this.event);
      })
  }

  // Remove Event
  deleteEvent(event: EventModel) {
    if (this.isMaster) {
      this.eventService.deleteEvent(event.eventId)
        .pipe(take(1))
        .subscribe(data => {
          this.socketService.setEvent(data)
        })
    }
  }

  // Create Menu
  createMenu(menu: Menu) {
    if (this.isMaster) {
      this.eventService.createMenu(menu)
        .pipe(take(1))
        .subscribe(data => {
          this.socketService.addMenu(data)
        })
    }
  }

  updateMenu(menu: Menu) {
    if (this.isMaster) {
      this.eventService.updateMenu(menu)
        .pipe(take(1))
        .subscribe(data => {
          this.socketService.setMenu(data)
        })
    }
  }

  getMenu(): BehaviorSubject<Menu[]>  {
    return this.listOfMenuObs$
  }

  // Remove Menu
  deleteMenu(menu: Menu) {
    if (menu.eventId == this.event.eventId && this.isMaster) {
      this.eventService.deleteMenu(menu.menuId)
        .pipe(take(1))
        .subscribe(data => {
          this.socketService.removeMenu(menu)
        })
    }
  }

  getPlanTable(): BehaviorSubject<TableInvite[]> {
    return this.listOfTableInviteObs$
  }

  // Create PlanTable
  createPlanTable(planTable: PlanTable) {
    if (this.isMaster) {
      this.eventService.createPlanTable(planTable)
        .pipe(take(1))
        .subscribe(data => {
          this.socketService.addPlanTable(data)
        })
    }
  }


  // Remove Plan Table
  deletePlanTable(tableInvite: PlanTable) {
    if (tableInvite.planTableId && tableInvite.eventId == this.event.eventId && this.isMaster) {
      this.eventService.deletePlanTable(tableInvite.planTableId)
        .pipe(take(1))
        .subscribe(data => {
          this.socketService.removePlanTable(tableInvite)
        })
    }
  }

  // Create invite
  createInvite(invite: Invite) {
    if (this.isMaster) {
      this.eventService.createInvite(invite)
        .pipe(take(1))
        .subscribe(data => {
          this.socketService.addInvite(data)
        })
    }
  }

  // Remove invite
  deleteInvite(invite: Invite) {
    if (!!invite.inviteId && invite.eventId == this.event.eventId && this.isMaster) {
      this.eventService.deleteInvite(invite.inviteId)
        .pipe(take(1))
        .subscribe(data => {
          this.socketService.removeInvite(invite)
        })
    }
  }
}
