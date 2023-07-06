import {Component, Input, OnChanges, TemplateRef, ViewChild} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {GenericDialogComponent} from "../../../shared/component/generic-dialog/generic-dialog.component";
import {TranslateService} from "@ngx-translate/core";
import {CookieHelper} from "../../../service/cookie.helper";
import {LocalModel} from "../../../model/local.model";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  public isEdit: boolean = false;

  public tableEdit: TableInfos | null = null;

  public dropdownOptions: OptionStringIcon[] = [];

  myControl = new FormControl('');
  inviteListFiltered: Observable<Invite[]>;
  public event: EventModel;

  tableInfos : TableInfos | null = null;

  @ViewChild('dialogEditPlanTable') dialogEditPlanTable!: TemplateRef<any>;

  constructor(
    private eventModelService: EventModelService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
  ) {
    this.event = eventModelService.getActualEvent();
    this.inviteListFiltered = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.inviteName;
        return name ? this.filter(name as string) : this.inviteList.slice();
      }),
    );

    this.initDropDownOption();
  }

  /**
   * Set dropdownOptions
   */
  initDropDownOption() {
    let option1 : OptionStringIcon = {
      optionText: "",
      icon: "add_circle",
    }
    let option2: OptionStringIcon = {
      optionText: "",
      icon: "edit",
    }

    this.dropdownOptions = [option1,option2];

    this.translate.get("Plan_table.Option.add_table").subscribe((res: string) => {
      this.dropdownOptions[0].optionText = res;
    })
    this.translate.get("Plan_table.Option.set_table").subscribe((res: string) => {
      this.dropdownOptions[1].optionText = res;
    })
  }

  /**
   * Select Option on burgerMenu
   * @param option
   */
  onOptionSelected(option: OptionStringIcon) {
    if (option === this.dropdownOptions[0]) {
      this.openSnackBar()
    }
    else if (option === this.dropdownOptions[1]) {
      this.openSnackBar()
      //this.isEdit = true;
    }
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

  editTable(table: TableInfos) {
    this.isEdit = false;
    this.tableEdit = table;

    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {contentTemplate: this.dialogEditPlanTable },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
      }
    });
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
    this.myControl.setValue('');
    this.tableInfos = invites;

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

  openSnackBar() {
    this.snackBar.open('En cours de développement', 'X', {
      duration: 3000,
    });
  }
}
