import {Component, Input} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent {

  @Input() public isMaster: boolean = false;
  @Input() public menuList: any[] = [];

  cat: string = "";
  des: string = "";

  constructor(
    private eventModelService: EventModelService
  ) {
  }

  addMenu() {
    this.eventModelService.createMenu({
      eventId: this.eventModelService.getActualEvent().eventId,
      menuCategorie: this.cat,
      menuDescription: this.des
    });
  }

  removeMenu(index: number) {
    if (this.isMaster) {
      this.eventModelService.deleteMenu(this.menuList[index]);
    }
  }

}
