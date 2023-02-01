import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {EventModelService} from "../../../viewModel/event-model.service";

@Component({
  selector: 'app-plan-table-page',
  templateUrl: './plan-table-page.component.html',
  styleUrls: ['./plan-table-page.component.scss']
})
export class PlanTablePageComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  isMaster: boolean = false;

  planTableList: any[] = [];

  inviteList: any[] = [];

  planTableMap: Map<any, any[]> = new Map<any, any[]>();

  table : string = "";
  inviteTable : string = "";
  inviteName : string = "";

  constructor(
    private eventModelService: EventModelService
  ) {
    this.isMaster = eventModelService.getIsMaster();
  }

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  initData() {
    this.eventModelService
      .getPlanTable()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data:any[]) => {

        this.planTableMap = new Map<any, any[]>();
        this.planTableList = [];
        this.inviteList = [];

        for (let i=0; i<data.length; i++) {
          let planTable = {
            eventId : data[i].eventId,
            planTableId : data[i].planTableId,
            tableName : data[i].tableName
          }

          let invite = {
            inviteId : data[i].inviteId,
            eventId : data[i].eventId,
            planTableId : data[i].planTableId,
            inviteName : data[i].inviteName
          }

          let planTableFilter = this.planTableList.filter(item => item.planTableId === planTable.planTableId);

          if ( planTableFilter.length > 0) {

            let list = this.planTableMap.get(planTableFilter[0]);
            // @ts-ignore
            list.push(invite);
            // @ts-ignore
            this.planTableMap.set(planTableFilter[0], list)
          }
          else {
            this.planTableMap.set(planTable,[invite]);
            this.planTableList.push(planTable);
            if (data[i].inviteId != null) {
              this.inviteList.push((invite));
            }
          }
        }
      })
  }

  addPlanTable() {
    this.eventModelService.createPlanTable(this.table);
  }

  removePlanTable(table: any) {
    this.eventModelService.deletePlanTable(table);
  }

  addInvite() {

    let plan = this.planTableList.filter(item => item.tableName == this.inviteTable);

    this.eventModelService.createInvite( {
      planTableId : plan[0].planTableId,
      inviteName : this.inviteName
    });
  }

  removeInvite(invite : any) {
    this.eventModelService.deleteInvite(invite);
  }
}
