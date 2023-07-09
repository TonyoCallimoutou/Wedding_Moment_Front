import {Component, Input} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent {

  @Input() public isEditable: boolean = false;
  @Input() public menuList: Menu[] = [];
  @Input() public isEditMode: boolean = false;
  @Input() public event?: EventModel;

  constructor(
    private eventModelService: EventModelService
  ) {
  }

  /**
   * Add new Menu
   * @param menu
   */
  addMenu(menu : Menu) {

    menu.eventId = this.event?.eventId

    if (menu.menuId) {
      this.eventModelService.updateMenu(menu);
    }
    else {
      this.eventModelService.createMenu(menu);
    }

  }

  /**
   * Remove Menu
   * @param menu
   */
  removeMenu(menu: Menu) {
    if (this.isEditable) {
      this.eventModelService.deleteMenu(menu);
    }
  }

}
