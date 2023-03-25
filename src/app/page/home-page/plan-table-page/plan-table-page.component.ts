import {Component, Input} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";

@Component({
  selector: 'app-plan-table-page',
  templateUrl: './plan-table-page.component.html',
  styleUrls: ['./plan-table-page.component.scss']
})
export class PlanTablePageComponent {

  @Input() public isMaster: boolean = false;
  @Input() public tableInviteList: TableInvite[] = [];
  @Input() public inviteList: Invite[] = [];
  @Input() public tableInviteMap: Map<PlanTable, Invite[]> = new Map<PlanTable, Invite[]>();

  table: string = "";
  tableInfos : TableInfos | null = null;
  searchWord: any;
  searchResult : Invite[] = [];


  constructor(
    private eventModelService: EventModelService
  ) {
  }

  addPlanTable() {
    this.eventModelService.createPlanTable({
      eventId: this.tableInviteList[0].eventId,
      tableName: this.table
    });
  }

  getDetail(invites: TableInfos) {
    if (this.tableInfos == invites) {
      this.tableInfos = null;
    }
    else {
      this.tableInfos = invites;
    }

    console.log(invites);
  }

  searchInvite() {
    console.log(this.searchWord);

    if (this.searchWord) {
      this.searchResult = this.inviteList.filter(invite => invite.inviteName.toLowerCase().includes(this.searchWord.toLowerCase()));
    }
    else {
      this.searchResult = this.inviteList;
    }
  }

  getSearchResult(invite: Invite) {
    this.tableInviteMap.forEach((value,key) => {
      if (key.planTableId === invite.planTableId) {
        this.tableInfos = {
          key: key,
          value: value,
        }
      }
    });
  }

  removePlanTable(table: any) {
    this.eventModelService.deletePlanTable(table);
  }

  addInvite(invite : Invite) {
    this.eventModelService.createInvite(invite);
  }

  removeInvite(invite: Invite) {
    this.eventModelService.deleteInvite(invite);
  }
}
