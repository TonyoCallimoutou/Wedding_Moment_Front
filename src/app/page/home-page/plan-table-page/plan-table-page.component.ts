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

  public event: EventModel;

  tableInfos : TableInfos | null = null;

  constructor(
    private eventModelService: EventModelService
  ) {
    this.event = eventModelService.getActualEvent();
  }

  addPlanTable(planTable: PlanTable) {
    this.eventModelService.createPlanTable(planTable);
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

  removePlanTable(table: PlanTable) {
    this.eventModelService.deletePlanTable(table);
  }

  addInvite(invite : Invite) {
    this.eventModelService.createInvite(invite);
  }

  removeInvite(invite: Invite) {
    this.eventModelService.deleteInvite(invite);
  }
}
