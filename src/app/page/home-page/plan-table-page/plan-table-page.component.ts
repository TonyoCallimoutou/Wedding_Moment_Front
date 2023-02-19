import {Component, Input} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";

@Component({
  selector: 'app-plan-table-page',
  templateUrl: './plan-table-page.component.html',
  styleUrls: ['./plan-table-page.component.scss']
})
export class PlanTablePageComponent {

  @Input() public isMaster: boolean = false;
  @Input() public planTableList: any[] = [];
  @Input() public planTableMap: Map<any, any[]> = new Map<any, any[]>();
  table: string = "";
  inviteTable: string = "";
  inviteName: string = "";

  constructor(
    private eventModelService: EventModelService
  ) {
  }

  addPlanTable() {
    this.eventModelService.createPlanTable(this.table);
  }

  removePlanTable(table: any) {
    this.eventModelService.deletePlanTable(table);
  }

  addInvite() {

    let plan = this.planTableList.filter(item => item.tableName == this.inviteTable);

    this.eventModelService.createInvite({
      planTableId: plan[0].planTableId,
      inviteName: this.inviteName
    });
  }

  removeInvite(invite: any) {
    this.eventModelService.deleteInvite(invite);
  }
}
