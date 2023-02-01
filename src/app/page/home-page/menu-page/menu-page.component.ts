import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  isMaster: boolean = false;

  menuList : any[] = [];

  cat : string = "";
  des : string = "";

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
      .getMenu()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data:any) => {
        this.menuList = data;
      })
  }

  addMenu() {

    this.eventModelService.createMenu({
      eventId : this.eventModelService.getActualEvent().eventId,
      menuCategorie : this.cat,
      menuDescription : this.des
    });
  }

  removeMenu(index : number) {
    this.eventModelService.deleteMenu(this.menuList[index]);
  }

}
