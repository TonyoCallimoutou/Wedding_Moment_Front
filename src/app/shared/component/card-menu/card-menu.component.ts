import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss']
})
export class CardMenuComponent implements OnInit {
  @Input() menuList : Menu[] = [];
  @Input() isMaster: boolean = false;
  @Output() addMenu: EventEmitter<Menu> = new EventEmitter<Menu>();
  @Output() removeMenu: EventEmitter<Menu> = new EventEmitter<Menu>();

  menuIdChange : number[] = [];

  categorie: string = "";
  description: string = "";

  isEdit : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onInputChange(menuId : number|undefined) {
    if (!!menuId && !this.menuIdChange.includes(menuId) ) {
      this.menuIdChange.push(menuId);
    }
  }

  save() {

    this.isEdit = !this.isEdit;

    if (!!this.categorie && !!this.description) {
      let menu : Menu = {
        menuCategorie : this.categorie,
        menuDescription : this.description
      }
      this.addMenu.emit(menu);
    }

    for (let id of this.menuIdChange) {
      let menu = this.menuList.filter(item => item.menuId === id);
      console.log(menu[0])
      this.addMenu.emit(menu[0]);
    }
  }

  delete(menu: Menu) {
    this.removeMenu.emit(menu);
  }

}
