import {Injectable} from '@angular/core';
import {BehaviorSubject, take} from 'rxjs';
import {User} from '../model/user.model';
import {EventService} from '../service/event.service';
import {SocketIoService} from '../service/socket-io.service';
import {UserModelService} from './user-model.service';
import {Event} from "../model/event.model";
import {PostModelService} from "./post-model.service";
import {LocalModel} from "../model/local.model";


@Injectable({
  providedIn: 'root',
})
export class EventModelService {

  userData: User;

  isMaster: boolean = false;

  event: any;

  private listOfEvent: any[] = [];
  private listOfMenu: any[] = [];
  private listOfPlanTable: any[] = [];

  private listOfEventObs$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private listOfMenuObs$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private listOfPlanTableObs$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    private userModelService: UserModelService,
    private postModelService: PostModelService,
    public eventService: EventService,
    public socketService: SocketIoService
  ) {
    this.userData = this.userModelService.getCurrentUser();

    this.initList();

    this.initListeningFromSocket();
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
      this.listOfPlanTable.push(invite);
      this.listOfPlanTableObs$.next(this.listOfPlanTable);
    });

    this.socketService.socket.on('listeningRemoveInvite', (invite: any) => {
      for (let i = 0; i < this.listOfPlanTable.length; i++) {
        if (this.listOfPlanTable[i].inviteId == invite.inviteId) {
          this.listOfPlanTable[i].inviteId = null;
          this.listOfPlanTable[i].inviteName = null;
        }
      }
      this.listOfPlanTableObs$.next(this.listOfPlanTable);
    });

    this.socketService.socket.on('listeningSetInvite', (invite: any) => {
      this.listOfPlanTable = this.listOfPlanTable.filter(item => item.inviteId !== invite.inviteId);
      this.listOfPlanTable.push(invite);
      this.listOfPlanTableObs$.next(this.listOfPlanTable);
    });

    this.socketService.socket.on('listeningAddPlanTable', (planTable: any) => {
      this.listOfPlanTable.push(planTable);
      this.listOfPlanTableObs$.next(this.listOfPlanTable);
    });

    this.socketService.socket.on('listeningRemovePlanTable', (planTable: any) => {
      this.listOfPlanTable = this.listOfPlanTable.filter(item => item.planTableId !== planTable.planTableId);
      this.listOfPlanTableObs$.next(this.listOfPlanTable);
    });

    this.socketService.socket.on('listeningSetPlanTable', (planTable: any) => {
      this.listOfPlanTable = this.listOfPlanTable.filter(item => item.planTableId !== planTable.planTableId);
      this.listOfPlanTable.push(planTable);
      this.listOfPlanTableObs$.next(this.listOfPlanTable);
    });
  }

  getAllEvent() {
    return this.listOfEventObs$;
  }

  goToEvent(event: Event) {
    this.event = event;
    this.eventService.goToEvent(event);

    this.isMaster = this.event.userId === this.userData.userId;

    this.initEventData();
  }

  getActualEvent() {
    return this.event;
  }

  getIsMaster() {
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
        this.listOfPlanTable = data;
        this.listOfPlanTableObs$.next(data);
      });

    this.postModelService.initPostModelService();
  }

  // Create Event
  createEvents(name: string) {
    const data = {
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
  deleteEvent(event: any) {
    if (this.isMaster) {
      this.eventService.deleteEvent(event.eventId)
        .pipe(take(1))
        .subscribe(data => {
          this.socketService.setEvent(data)
        })
    }
  }

  // Create Menu
  createMenu(menu: any) {
    if (this.isMaster) {
      this.eventService.createMenu(menu)
        .pipe(take(1))
        .subscribe(data => {
          this.socketService.addMenu(data)
        })
    }
  }

  getMenu() {
    return this.listOfMenuObs$
  }

  // Remove Menu
  deleteMenu(menu: any) {
    if (menu.eventId == this.event.eventId && this.isMaster) {
      this.eventService.deleteMenu(menu.menuId)
        .pipe(take(1))
        .subscribe(data => {
          this.socketService.removeMenu(menu)
        })
    }
  }

  getPlanTable() {
    return this.listOfPlanTableObs$
  }

  // Create PlanTable
  createPlanTable(name: string) {
    const data = {
      eventId: this.event.eventId,
      tableName: name
    }
    if (this.isMaster) {
      this.eventService.createPlanTable(data)
        .pipe(take(1))
        .subscribe(data => {
          this.socketService.addPlanTable(data)
        })
    }
  }


  // Remove Plan Table
  deletePlanTable(planTable: any) {
    if (planTable.eventId == this.event.eventId && this.isMaster) {
      this.eventService.deletePlanTable(planTable.planTableId)
        .pipe(take(1))
        .subscribe(data => {
          this.socketService.removePlanTable(planTable)
        })
    }
  }

  // Create invite
  createInvite(invite: any) {
    if (this.isMaster) {
      this.eventService.createInvite(invite)
        .pipe(take(1))
        .subscribe(data => {
          this.socketService.addInvite(data)
        })
    }
  }

  // Remove invite
  deleteInvite(invite: any) {
    if (invite.eventId == this.event.eventId && this.isMaster) {
      this.eventService.deleteInvite(invite.inviteId)
        .pipe(take(1))
        .subscribe(data => {
          this.socketService.removeInvite(invite)
        })
    }
  }
}
