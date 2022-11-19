import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  tabselector: number = 1;

  constructor() { }

  tab(tabulation: number) {
    this.tabselector = tabulation;
  }

}
