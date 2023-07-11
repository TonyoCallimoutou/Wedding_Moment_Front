import {Component, Input} from '@angular/core';
import {LoaderModel} from "../../service/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  @Input() loader! : LoaderModel;

}
