import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ResizeEvent} from "angular-resizable-element";
import {EventModelService} from "../../../viewModel/event-model.service";

@Component({
  selector: 'app-card-plan-table',
  templateUrl: './card-plan-table.component.html',
  styleUrls: ['./card-plan-table.component.scss']
})
export class CardPlanTableComponent implements OnInit, AfterViewInit {

  @Input() tableInviteMap: Map<any, Invite[]> = new Map<any, Invite[]>()
  @Input() isMaster: boolean = false;
  @Output() getDetail: EventEmitter<TableInfos> = new EventEmitter<TableInfos>();
  @Output() addPlanTable: EventEmitter<any> = new EventEmitter<any>();
  @Output() removePlanTable: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('card') card: ElementRef | undefined;

  height: number = 100;

  public style: object = {};
  public listOfNewTable: any [] = [];
  public isEdit = false;

  constructor(
    private eventModelService: EventModelService,
  ) {
  }

  ngOnInit() {
    this.tableInviteMap.forEach((value,key) => {
      key.position = { x:0, y:0};
    })
  }

  ngAfterViewInit() {
    if (this.card) {
      const cardRect = this.card.nativeElement.getBoundingClientRect();

      console.log(cardRect);
      // const cardTop = cardRect.top;
      // const cardLeft = cardRect.left;
      // const cardWidth = cardRect.width;
      // const cardHeight = cardRect.height;
      //
      // console.log('Zone - top:', cardTop, 'left:', cardLeft, 'width:', cardWidth, 'height:', cardHeight);

    }
  }

  onResizeEnd(event: ResizeEvent): void {
    if (this.isEdit) {
      console.log('Element was resized', event);
      if ((event.edges.top !== undefined && event.edges.top !== 0) ||
          (event.edges.bottom !== undefined && event.edges.bottom !== 0)) {

        let divHeight = Math.round(event.rectangle.height as number - 50);
        this.style = {
          height: `${divHeight}px`
        };
      }
      if ((event.edges.left !== undefined && event.edges.left !== 0) ||
          (event.edges.right !== undefined && event.edges.right !== 0)) {
        let divWidth = Math.round(event.rectangle.width as number - 50);
        this.style = {
          width: `${divWidth}px`
        };
      }
    }
  }

  checkPosition(item: any, event: any) {
    const elementRect = event.source.element.nativeElement.getBoundingClientRect();
    const elementTop = elementRect.top;
    const elementLeft = elementRect.left;

    console.log(elementRect);

    //item.position = {x: elementLeft, y: elementTop};
    //item.position = event.source.getFreeDragPosition();
    //console.log(item.position)
  }

  addTable() {
    // Replace ANY by PLANTABLE
    let newTable : any = {
      eventId: this.eventModelService.getActualEvent().eventId,
      tableName: 'newTable',
      position: { x:0, y:0},
    }

    this.listOfNewTable.push(newTable);
    this.tableInviteMap.set(newTable,[]);
  }

  save() {
    this.isEdit = ! this.isEdit;

    this.tableInviteMap.forEach((value,key) => {
      console.log(key.position);
    })

    this.listOfNewTable.forEach(table => {
      this.addPlanTable.emit(table);
    })


  }

  onClick(invites: TableInfos) {
    if (!this.isEdit) {
      this.getDetail.emit(invites);
    }
  }
}
