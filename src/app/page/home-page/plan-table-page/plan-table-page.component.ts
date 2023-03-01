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
  @Input() public tableInviteMap: Map<PlanTable, Invite[]> = new Map<PlanTable, Invite[]>();
  table: string = "";
  inviteTable: string = "";
  inviteName: string = "";

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

  removePlanTable(table: any) {
    this.eventModelService.deletePlanTable(table);
  }

  addInvite() {

    let plan = this.tableInviteList.filter(item => item.tableName == this.inviteTable);

    this.eventModelService.createInvite({
      eventId: plan[0].eventId,
      planTableId: plan[0].planTableId,
      inviteName: this.inviteName
    });
  }

  removeInvite(invite: Invite) {
    this.eventModelService.deleteInvite(invite);
  }
}
