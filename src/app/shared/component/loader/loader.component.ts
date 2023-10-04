import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {LoaderModel} from "../../service/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  stars: any[] = [];

  @Input() loader! : LoaderModel;

  constructor() {
    this.generateStars();
  }

  ngOnInit(): void {
    this.generateStars();
  }

  generateStars() {
    const numStars = 50; // Nombre d'étoiles souhaité
    for (let i = 0; i < numStars; i++) {
      const star = {
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%'
      };
      this.stars.push(star);
    }
  }

}
