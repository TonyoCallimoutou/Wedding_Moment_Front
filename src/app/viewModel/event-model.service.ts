import {Injectable} from '@angular/core';
import {BehaviorSubject, take} from 'rxjs';
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


@Injectable({
  providedIn: 'root',
})
export class EventModelService {

  userData: User;
  event: EventModel;
  isMaster: boolean = false;

  private listOfEvent: EventModel[] = [];
  private listOfMenu: Menu[] = [];
  private listOfTableInvite: TableInvite[] = [];

  private listOfEventObs$: BehaviorSubject<EventModel[]> = new BehaviorSubject<EventModel[]>([]);
  private listOfMenuObs$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);
  private listOfTableInviteObs$: BehaviorSubject<TableInvite[]> = new BehaviorSubject<TableInvite[]>([]);

  constructor(
    private userModelService: UserModelService,
    private postModelService: PostModelService,
    public eventService: EventService,
    public socketService: SocketIoService
  ) {
    this.initUserData()

    this.initList();

    this.initListeningFromSocket();
  }

  initUserData() {
    this.userData = this.userModelService.getCurrentUser();
    if (!!this.event && !!this.userData) {
      this.isMaster = this.event.userId === this.userData.userId;
    }
  }

  initList() {
    this.eventService.getAllEvent()
      .pipe(take(1))
      .subscribe((data: any) => {
        this.listOfEvent = data;
        this.listOfEventObs$.next(data);
      });

    if (this.event == null) {
      this.event = JSON.parse(localStorage.getItem(LocalModel.EVENT)!)
      if (this.event != null) {
        this.goToEvent(this.event);
      }
    }

    if (this.event != null) {
      this.initEventData();
    }
  }

  initListeningFromSocket() {

    this.socketService.socket.on('listeningAddMenu', (menu: any) => {
      this.listOfMenu.push(menu);
      this.listOfMenuObs$.next(this.listOfMenu);
    });

    this.socketService.socket.on('listeningRemoveMenu', (menu: any) => {
      this.listOfMenu = this.listOfMenu.filter(item => item.menuId !== menu.menuId);
      this.listOfMenuObs$.next(this.listOfMenu);
    });

    this.socketService.socket.on('listeningSetMenu', (menu: any) => {
      this.listOfMenu = this.listOfMenu.filter(item => item.postmenuId !== menu.menuId);
      this.listOfMenu.push(menu);
      this.listOfMenuObs$.next(this.listOfMenu);
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

  getAllEvent(): BehaviorSubject<EventModel[]> {
    return this.listOfEventObs$;
  }

  goToEvent(event: EventModel) {
    this.event = event;
    this.eventService.goToEvent(event);

    if(this.userData) {
      this.isMaster = this.event.userId === this.userData.userId;
    }
    this.initEventData();
  }

  getActualEvent(): EventModel {
    return this.event;
  }

  getIsMaster(): boolean {
    return this.isMaster;
  }

  resetActualEvent() {
    this.event = null;
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
