import {Component, Input, OnChanges, TemplateRef, ViewChild} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {GenericDialogComponent} from "../../../shared/component/generic-dialog/generic-dialog.component";
import {TranslateService} from "@ngx-translate/core";
import {SnackbarService} from "../../../shared/service/snackbar.service";
import {Invite, PlanTable, TableInfos, TableInvite} from "../../../model/table-invite.model";
import {EventModel} from "../../../model/event.model";

@Component({
  selector: 'app-plan-table-page',
  templateUrl: './plan-table-page.component.html',
  styleUrls: ['./plan-table-page.component.scss']
})
export class PlanTablePageComponent implements OnChanges {

  @Input() public isEditable: boolean = false;
  @Input() public tableInviteList: TableInvite[] = [];
  @Input() public inviteList: Invite[] = [];
  @Input() public tableInviteMap: Map<PlanTable, Invite[]> = new Map<PlanTable, Invite[]>();
  @Input() public isEditMode: boolean = false;
  @Input() public event?: EventModel;

  myControl = new FormControl('');
  inviteListFiltered: Observable<Invite[]>;

  tableInfos : TableInfos | null = null;

  @ViewChild('dialogPlanTableDetail') dialogPlanTableDetail!: TemplateRef<any>;

  constructor(
    private eventModelService: EventModelService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private snackbarService: SnackbarService,

  ) {
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

    if (!!planTable.planTableId) {
      this.eventModelService.updatePlanTable(planTable);
    }
    else {
      this.eventModelService.createPlanTable(planTable);
    }

  }

  /**
   * Function call to diplay infos
   * @param invites
   */
  getDetail(invites: TableInfos) {
    this.myControl.setValue('');
    this.tableInfos = invites;

    this.dialog.open(GenericDialogComponent, {
      data: {
        contentTemplate: this.dialogPlanTableDetail,
        isDisplayButton: false
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
