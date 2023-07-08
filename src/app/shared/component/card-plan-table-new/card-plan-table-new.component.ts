import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card-plan-table-new',
  templateUrl: './card-plan-table-new.component.html',
  styleUrls: ['./card-plan-table-new.component.scss']
})
export class CardPlanTableNewComponent {

  @Input() tableName: string = "";
  @Input() invites: Invite[] = [];
  @Input() selected: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() editMode: boolean = false;

  constructor(
  ) {
  }

  onInputChange(test: any) {
    console.log(test)
  }


}
