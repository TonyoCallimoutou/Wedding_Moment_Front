import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { User } from '../model/user.model';
import { EventService } from '../service/event.service';
import { SocketIoService } from '../service/socket-io.service';
import { UserModelService } from './user-model.service';
import {Event} from "../model/event.model";


@Injectable({
    providedIn: 'root',
  })
export class EventModelService {

    userData: User;

    event: any;

    private listOfEvent : any[] = [];
    private listOfInvite : any[] = [];
    private listOfMenu : any[] = [];
    private listOfPlanTable : any[] = [];

    private listOfEventObs$ : BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    private listOfInviteObs$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    private listOfMenuObs$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    private listOfPlanTableObs$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    constructor(
        private userModelService: UserModelService,
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
        .subscribe((data:any) => {
          this.listOfEvent = data;
          this.listOfEventObs$.next(data);
        });
    }

    initListeningFromSocket() {

        this.socketService.socket.on('listeningSetInvite', (invite: any) => {
            this.listOfInvite.push(invite);
            this.listOfInviteObs$.next(this.listOfInvite);
        });

        this.socketService.socket.on('ListeningSetPlanTable', (planTable: any) => {
          this.listOfPlanTable.push(planTable);
          this.listOfPlanTableObs$.next(this.listOfPlanTable);
        });

        this.socketService.socket.on('ListeningSetMenu', (menu: any) => {
          this.listOfMenu.push(menu);
          this.listOfMenuObs$.next(this.listOfMenu);
        });
    }

    getAllEvent() {
      return this.listOfEventObs$;
    }

    goToEvent(event : Event) {
      this.event = event;
      this.eventService.goToEvent(event);
    }

    getActualEvent() {
      return this.event;
    }

    resetActualEvent() {
      this.event = null;
    }

    // Create Event
    createEvents(name: string) {
        const data = {
            userId: this.userData.userId,
            name: name
        }
        this.eventService.createEvent(data)
            .pipe(take(1))
            .subscribe( data => {
                this.socketService.setEvent(data)
        })
    }

    // Remove Event
    deleteEvent(event: any) {
        if (event.userId == this.userData.userId) {
            this.eventService.deleteEvent(event.eventId)
                .pipe(take(1))
                .subscribe( data => {
                    this.socketService.setEvent(data)
                })
        }
    }

  // Create PlanTable
  createPlanTable(name: string) {
    const data = {
      eventId: this.event.eventId,
      tableName: name
    }
    this.eventService.createPlanTable(data)
      .pipe(take(1))
      .subscribe( data => {
        this.socketService.setPlanTable(data)
      })
  }

  // Remove Plan Table
  deletePlanTable(planTable: any) {
    if (planTable.eventId == this.event.eventId && this.event.userId == this.userData.userId) {
      this.eventService.deletePlanTable(planTable.planTableId)
        .pipe(take(1))
        .subscribe( data => {
          this.socketService.setPlanTable(data)
        })
    }
  }

  // Create invite
  createInvite(invite: any) {
    const data = {
      planTableId: invite.eventId,
      inviteName: invite.inviteName
    }
    this.eventService.createInvite(data)
      .pipe(take(1))
      .subscribe( data => {
        this.socketService.setInvite(data)
      })
  }

  // Remove invite
  deleteInvite(invite: any) {
    if (invite.invite == this.event.eventId && this.event.userId == this.userData.userId) {
      this.eventService.deleteInvite(invite.inviteId)
        .pipe(take(1))
        .subscribe( data => {
          this.socketService.setInvite(data)
        })
    }
  }
}
