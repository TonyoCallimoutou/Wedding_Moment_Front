import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, AfterViewInit, OnChanges{

  @Input() isDisabled: boolean = false;
  @Input() tabSelector: number = 0;
  @Output() changeTab: EventEmitter<number> = new EventEmitter<any>();
  menuItems : any;
  menuBorder : any;
  activeItem: any;

  @ViewChild('menu') menu!: any;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tabSelector']) {
      let index = changes['tabSelector'].currentValue;
      this.switchTab(this.menuItems[index], index);
    }
  }

  ngAfterViewInit() {
    this.menuItems = this.menu.nativeElement.querySelectorAll(".menu__item");
    this.menuBorder = this.menu.nativeElement.querySelector(".menu__border");
    this.activeItem = this.menu.nativeElement.querySelector(".active");

    window.addEventListener("resize", () => {
      this.offsetMenuBorder(this.activeItem, this.menuBorder);
      this.menu.nativeElement.style.setProperty("--timeOut", "none");
    });

    this.menuItems.forEach((item : any, index: number) => {
      item.addEventListener("click", () => this.clickItem(index));
    })
  }


  clickItem(index: number) {
    this.changeTab.emit(index);
  }

  switchTab(item : any, index: number) {
    this.menu.nativeElement.style.removeProperty("--timeOut");

    if (this.activeItem == item) return;

    if (this.activeItem) {
      this.activeItem.classList.remove("active");
    }

    item.classList.add("active");
    this.activeItem = item;
    this.offsetMenuBorder(this.activeItem, this.menuBorder);
  }

  offsetMenuBorder(element: any, menuBorder: any) {

    const offsetActiveItem = element.getBoundingClientRect();
    const left = Math.floor(offsetActiveItem.left - this.menu.nativeElement.offsetLeft - (menuBorder.offsetWidth  - offsetActiveItem.width) / 2) +  "px";
    menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;

  }
}
