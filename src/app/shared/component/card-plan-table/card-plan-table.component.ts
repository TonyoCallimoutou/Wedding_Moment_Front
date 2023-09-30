import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";
import {DeepCopy} from "../../../utils/deepCopy";
import {SnackbarService} from "../../service/snackbar.service";
import {TranslateService} from "@ngx-translate/core";
import {Invite, PlanTable, TableInfos} from "../../../model/table-invite.model";

@Component({
  selector: 'app-card-plan-table',
  templateUrl: './card-plan-table.component.html',
  styleUrls: ['./card-plan-table.component.scss']
})
export class CardPlanTableComponent implements OnInit, OnChanges {

  @Input() tableInviteMap: Map<PlanTable, Invite[]> = new Map<PlanTable, Invite[]>()
  @Input() isEditable = false;
  @Input() inEdition: boolean = false;
  @Output() getDetail: EventEmitter<TableInfos> = new EventEmitter<TableInfos>();
  @Output() addPlanTable: EventEmitter<PlanTable> = new EventEmitter<PlanTable>();
  @Output() removePlanTable: EventEmitter<PlanTable> = new EventEmitter<PlanTable>();
  @Output() beInEdition: EventEmitter<boolean> = new EventEmitter<boolean>();


  planTableIdChange : number[] = [];
  planTableRemove : any[] = [];
  editPlanTableMap :Map<PlanTable, Invite[]> = new Map<PlanTable, Invite[]>();
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

    this.beInEdition.emit(true);
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
    this.beInEdition.emit(!this.inEdition);

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
    if (this.inEdition) {
      if (!!planTable.planTableId) {
        this.planTableRemove.push(planTable);
      }

      this.editPlanTableMap.delete(planTable);
    }
  }

  retour() {
    this.beInEdition.emit(false);
    this.editPlanTableMap = DeepCopy.ofMap(this.tableInviteMap);
  }

  onClick(invites: TableInfos) {
    if (!this.inEdition) {
      this.getDetail.emit(invites);
    }
  }
}
