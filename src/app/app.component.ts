import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketIoService} from './service/socket-io.service';
import {TranslateService} from "@ngx-translate/core";
import {LocalModel} from "./model/local.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FrontEnd';

  constructor(
    private socketService: SocketIoService,
    private translate: TranslateService) {
    let language = localStorage.getItem(LocalModel.LANGUAGE) ? localStorage.getItem(LocalModel.LANGUAGE) : translate.getBrowserLang();
    language = language ? language : 'fr';
    translate.setDefaultLang(language);
    translate.use(language);
  }

  ngOnInit() {
  }


  ngOnDestroy() {
    this.socketService.disconnect();
  }

}
