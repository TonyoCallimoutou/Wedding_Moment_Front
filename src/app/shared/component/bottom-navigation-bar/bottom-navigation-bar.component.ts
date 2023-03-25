import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-bottom-navigation-bar',
  templateUrl: './bottom-navigation-bar.component.html',
  styleUrls: ['./bottom-navigation-bar.component.scss']
})
export class BottomNavigationBarComponent {

  @Input() tabSelector: number = 1;
  @Output() onclick: EventEmitter<number> = new EventEmitter<number>();

  tab(index : number) {
    this.onclick.emit(index);
  }
}
