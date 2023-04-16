import {AfterViewInit, Component, Input, OnChanges, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {GenericDialogComponent} from "../../../shared/component/generic-dialog/generic-dialog.component";

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

  @ViewChild('dialogPlanTableDetail') dialogPlanTableDetail!: TemplateRef<any>;

  constructor(
    private eventModelService: EventModelService,
    private dialog: MatDialog,
  ) {
    this.event = eventModelService.getActualEvent();
    this.inviteListFiltered = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.inviteName;
        return name ? this.filter(name as string) : this.inviteList.slice();
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

  /**
   * Filter list in SearchBar
   * @param value
   * return List of Invite
   */
  filter(value: string): Invite[] {
    const filterValue = value.toLowerCase();

    return this.inviteList.filter(invite => invite.inviteName.toLowerCase().includes(filterValue));
  }

  /**
   * Add new table
   * @param planTable
   */
  addPlanTable(planTable: PlanTable) {
    this.eventModelService.createPlanTable(planTable);
  }

  /**
   * Function call to diplay infos
   * @param invites
   */
  getDetail(invites: TableInfos) {
    this.tableInfos = invites;

    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {
        contentTemplate: this.dialogPlanTableDetail,
        isDisplayBouton: false
      },
    });

  }

  /**
   * Function call on click on result of searchBar
   * @param invite
   */
  getSearchResult(invite: Invite) {
    this.tableInviteMap.forEach((value,key) => {
      if (key.planTableId === invite.planTableId) {
        this.tableInfos = {
          key: key,
          value: value,
        }
        this.getDetail(this.tableInfos);
      }
    });
  }

  /**
   * Remove Table
   * @param table
   */
  removePlanTable(table: PlanTable) {
    this.eventModelService.deletePlanTable(table);
  }

  /**
   * Add new Invite
   * @param invite
   */
  addInvite(invite : Invite) {
    this.eventModelService.createInvite(invite);
  }

  /**
   * Remove Invite
   * @param invite
   */
  removeInvite(invite: Invite) {
    this.eventModelService.deleteInvite(invite);
  }
}
