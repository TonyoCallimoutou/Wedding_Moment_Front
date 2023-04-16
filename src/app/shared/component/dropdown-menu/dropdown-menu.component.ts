import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {

  @Input() matIcon: string = 'more_vert'
  @Input() matIconColor: string = '';
  @Input() options: OptionStringIcon[] = [];
  @Output() optionSelected = new EventEmitter<OptionStringIcon>();

  /**
   * Function call on click
   * @param option
   */
  selectOption(option: OptionStringIcon) {
    this.optionSelected.emit(option);
  }
}
