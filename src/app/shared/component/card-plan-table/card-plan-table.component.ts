import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {CdkDragEnd} from "@angular/cdk/drag-drop";
import {ResizeEvent} from "angular-resizable-element";

@Component({
  selector: 'app-card-plan-table',
  templateUrl: './card-plan-table.component.html',
  styleUrls: ['./card-plan-table.component.scss']
})
export class CardPlanTableComponent implements OnInit, AfterViewInit {

  @Input() tableInviteMap: Map<any, Invite[]> = new Map<any, Invite[]>()
  @Input() isMaster: boolean = false;

  @ViewChild('card') card: ElementRef | undefined;


  public style: object = {};

  isEdit = false;

  constructor() {
  }

  ngOnInit() {
    this.tableInviteMap.forEach((value,key) => {
      key.position = { x: 0, y:0};
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

  save() {
    this.isEdit = ! this.isEdit;

    this.tableInviteMap.forEach((value,key) => {
      console.log(key.position);
    })
  }

}
