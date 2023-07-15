import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OptionStringIcon} from "../../../../model/option-string-icon.model";

@Component({
  selector: 'app-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.scss']
})
export class SwitchButtonComponent {

  @Input() isFirstSelected : boolean = true;
  @Input() switchOptions : OptionStringIcon[]= [];

  @Output() selected : EventEmitter<boolean> = new EventEmitter<boolean>();

}
