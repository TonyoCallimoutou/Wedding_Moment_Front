import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {DeepCopy} from "../../../../utils/deepCopy";
import {Invite, TableInfos} from "../../../../model/table-invite.model";

@Component({
  selector: 'app-card-detail-plan-table',
  templateUrl: './card-detail-plan-table.component.html',
  styleUrls: ['./card-detail-plan-table.component.scss']
})
export class CardDetailPlanTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tableInfos!: TableInfos;
  @Input() isEditable = false;
  @Input() inEdition: boolean = false;
  @Output() addInvite: EventEmitter<Invite> = new EventEmitter<Invite>();
  @Output() removeInvite: EventEmitter<Invite> = new EventEmitter<Invite>();
  @Output() beInEdition: EventEmitter<boolean> = new EventEmitter<boolean>();


  invite: string = "";
  inviteIdChange : number[] = [];
  inviteRemove : Invite[] = [];
  editInviteList: Invite[] = [];

  ngOnInit(): void {
    this.editInviteList = DeepCopy.ofList(this.tableInfos.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableInfos']) {
      this.editInviteList = DeepCopy.ofList(this.tableInfos.value);
    }
  }

  ngOnDestroy() {
    this.beInEdition.emit(false);
  }

  onInputChange(inviteId : number|undefined) {
    if (!!inviteId && !this.inviteIdChange.includes(inviteId) ) {
      this.inviteIdChange.push(inviteId);
    }
  }

  newInvite() {
    let invite : Invite = {
      eventId : this.tableInfos.key.eventId,
      planTableId : this.tableInfos.key.planTableId ? this.tableInfos.key.planTableId : 0,
      inviteName : "name"
    }
    this.editInviteList.push(invite);
  }

  save() {
    this.beInEdition.emit(!this.inEdition);

    for (let invite of this.inviteRemove) {
      this.removeInvite.emit(invite);
    }

    for (let invite of this.editInviteList) {
      if (!invite.inviteId) {
        this.addInvite.emit(invite);
      }
      else if (this.inviteIdChange.includes(invite.inviteId)) {
        this.addInvite.emit(invite);
      }
    }
  }

  delete(invite: Invite) {
    if (!!invite.inviteId) {
      this.inviteRemove.push(invite);
    }

    this.editInviteList = this.editInviteList.filter(m => m !== invite);
  }

  retour() {
    this.beInEdition.emit(false);
    this.editInviteList = DeepCopy.ofList(this.tableInfos.value);
  }

}
