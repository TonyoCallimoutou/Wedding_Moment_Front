import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";
import {DeepCopy} from "../../../utils/deepCopy";
import {SnackbarService} from "../../service/snackbar.service";
import {TranslateService} from "@ngx-translate/core";
import {Invite, PlanTable, TableInfos} from "../../../model/table-invite.model";

@Component({
  selector: 'app-card-plan-table-new',
  templateUrl: './card-plan-table-new.component.html',
  styleUrls: ['./card-plan-table-new.component.scss']
})
export class CardPlanTableNewComponent implements OnInit, OnChanges {

  @Input() tableInviteMap: Map<PlanTable, Invite[]> = new Map<PlanTable, Invite[]>()
  @Input() isEditable = false;
  @Output() getDetail: EventEmitter<TableInfos> = new EventEmitter<TableInfos>();
  @Output() addPlanTable: EventEmitter<PlanTable> = new EventEmitter<PlanTable>();
  @Output() removePlanTable: EventEmitter<PlanTable> = new EventEmitter<PlanTable>();


  planTableIdChange : number[] = [];
  planTableRemove : any[] = [];
  editPlanTableMap :Map<PlanTable, Invite[]> = new Map<PlanTable, Invite[]>();
  public isEdit : boolean = false;
  public style: object = {};

  constructor(
    private eventModelService: EventModelService,
    private snackbarService: SnackbarService,
    private translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.editPlanTableMap = DeepCopy.ofMap(this.tableInviteMap);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableInviteMap']) {
      this.editPlanTableMap = DeepCopy.ofMap(this.tableInviteMap);
    }
  }

  edit() {
    this.translateService.get('Plan_table.tips').subscribe((res: string) => {
      this.snackbarService.showSnackbar(
        "tips",
        res,
        5000,
      );
    });

    this.isEdit = true;
  }

  addTable() {
    // Replace ANY by PLANTABLE
    let newTable : any = {
      eventId: this.eventModelService.getActualEvent().eventId,
      tableName: 'newTable',
    }

    this.editPlanTableMap.set(newTable,[]);
  }

  onInputChange(planTableId : number|undefined) {
    if (!!planTableId && !this.planTableIdChange.includes(planTableId) ) {
      this.planTableIdChange.push(planTableId);
    }
  }

  save() {
    this.isEdit = ! this.isEdit;

    for (let planTable of this.planTableRemove) {
      this.removePlanTable.emit(planTable);
    }

    for (let [planTable] of this.editPlanTableMap) {
      if (!planTable.planTableId) {
        this.addPlanTable.emit(planTable);
      }
      else if (this.planTableIdChange.includes(planTable.planTableId)) {
        this.addPlanTable.emit(planTable);
      }
    }
  }

  delete(planTable: PlanTable) {
    if (this.isEdit) {
      if (!!planTable.planTableId) {
        this.planTableRemove.push(planTable);
      }

      this.editPlanTableMap.delete(planTable);
    }
  }

  retour() {
    this.isEdit = false;
    this.editPlanTableMap = DeepCopy.ofMap(this.tableInviteMap);
  }

  onClick(invites: TableInfos) {
    if (!this.isEdit) {
      this.getDetail.emit(invites);
    }
  }
}
