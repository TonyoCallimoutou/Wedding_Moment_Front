import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-plan-table-page',
  templateUrl: './plan-table-page.component.html',
  styleUrls: ['./plan-table-page.component.scss']
})
export class PlanTablePageComponent implements OnChanges {

  @Input() public isMaster: boolean = false;
  @Input() public tableInviteList: TableInvite[] = [];
  @Input() public inviteList: Invite[] = [];
  @Input() public tableInviteMap: Map<PlanTable, Invite[]> = new Map<PlanTable, Invite[]>();

  myControl = new FormControl('');
  inviteListFiltered: Observable<Invite[]>;
  public event: EventModel;

  tableInfos : TableInfos | null = null;

  constructor(
    private eventModelService: EventModelService
  ) {
    this.event = eventModelService.getActualEvent();
    this.inviteListFiltered = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.inviteName;
        return name ? this._filter(name as string) : this.inviteList.slice();
      }),
    );
  }

  displayFn(invite: Invite): string {
    return invite && invite.inviteName ? invite.inviteName : '';
  }

  ngOnChanges() {
    if (this.inviteList.length > 0) {
      this.myControl.setValue('');
    }
  }

  private _filter(value: string): Invite[] {
    const filterValue = value.toLowerCase();

    return this.inviteList.filter(invite => invite.inviteName.toLowerCase().includes(filterValue));
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
