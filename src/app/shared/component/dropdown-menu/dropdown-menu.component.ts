import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {

  @Input() matIcon: string = 'more_vert'
  @Input() matIconColor: string = '';
  @Input() options: string[] = [];
  @Output() optionSelected = new EventEmitter<string>();
  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectOption(option: string) {
    console.log(option)
    this.optionSelected.emit(option);
    this.toggleDropdown();
  }
}
