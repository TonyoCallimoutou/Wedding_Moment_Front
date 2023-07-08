import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-card-detail-plan-table',
  templateUrl: './card-detail-plan-table.component.html',
  styleUrls: ['./card-detail-plan-table.component.scss']
})
export class CardDetailPlanTableComponent {
  @Input() tableInfos!: TableInfos;
  @Input() isMaster: boolean = false;
  @Output() addInvite: EventEmitter<Invite> = new EventEmitter<Invite>();
  @Output() removeInvite: EventEmitter<Invite> = new EventEmitter<Invite>();

  inviteIdChange : number[] = [];

  invite: string = "";

  isEdit : boolean = false;


  onInputChange(inviteId : number|undefined) {
    if (!!inviteId && !this.inviteIdChange.includes(inviteId) ) {
      this.inviteIdChange.push(inviteId);
    }
  }

  save() {

    this.isEdit = !this.isEdit;

    if (!!this.invite) {
      let invite : Invite = {
        eventId : this.tableInfos.value[0].eventId,
        planTableId: this.tableInfos.value[0].planTableId,
        inviteName : this.invite,
      }
      this.addInvite.emit(invite);
    }

    for (let id of this.inviteIdChange) {
      let invite = this.tableInfos.value.filter((item: Invite) => item.inviteId === id);
      this.addInvite.emit(invite[0]);
    }
  }

  delete(invite: Invite) {
    this.removeInvite.emit(invite);
  }

}
