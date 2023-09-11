import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DeepCopy} from "../../../utils/deepCopy";
import {Menu} from "../../../model/menu.model";

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss']
})
export class CardMenuComponent implements OnInit, OnChanges {
  @Input() menuList : Menu[] = [];
  @Input() isEditable: boolean = false;
  @Output() addMenu: EventEmitter<Menu> = new EventEmitter<Menu>();
  @Output() removeMenu: EventEmitter<Menu> = new EventEmitter<Menu>();

  menuIdChange : number[] = [];
  menuRemove : Menu[] = [];

  editMenuList : Menu[] = [];

  isEdit : boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.editMenuList = DeepCopy.ofList(this.menuList);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['menuList']) {
      this.editMenuList = DeepCopy.ofList(this.menuList);
    }
  }

  retour() {
    this.isEdit = false;
    this.editMenuList = DeepCopy.ofList(this.menuList);
  }

  newCategories() {
    let menu : Menu = {
      menuCategorie : "",
      menuDescription : ""
    }
    this.editMenuList.push(menu);
  }

  onInputChange(menuId : number|undefined) {
    if (!!menuId && !this.menuIdChange.includes(menuId) ) {
      this.menuIdChange.push(menuId);
    }
  }

  save() {
    this.isEdit = !this.isEdit;

    for (let menu of this.menuRemove) {
      this.removeMenu.emit(menu);
    }

    for (let menu of this.editMenuList) {
      if (!menu.menuId) {
        this.addMenu.emit(menu);
      }
      else if (this.menuIdChange.includes(menu.menuId)) {
        this.addMenu.emit(menu);
      }
    }
  }

  delete(menu: Menu) {
    if (!!menu.menuId) {
      this.menuRemove.push(menu);
    }

    this.editMenuList = this.editMenuList.filter(m => m !== menu);
  }

}
