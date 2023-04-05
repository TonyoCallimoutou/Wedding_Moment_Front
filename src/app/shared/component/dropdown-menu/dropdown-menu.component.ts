import {Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';

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
  public showDropdown = false;

  @ViewChild('menu') menu: ElementRef | undefined;


  constructor(
    private renderer : Renderer2
  ) {
    this.renderer.listen('window', 'click',(e:Event)=>{
      if (this.showDropdown) {
        if(!this.menu?.nativeElement.contains(e.target) && this.menu) {
          this.showDropdown = false;
        }
      }
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectOption(option: OptionStringIcon) {
    this.optionSelected.emit(option);
    this.toggleDropdown();
  }
}
