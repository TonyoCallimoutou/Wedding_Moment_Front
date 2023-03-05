import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketIoService} from './service/socket-io.service';
import {TranslateService} from "@ngx-translate/core";

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
    translate.setDefaultLang('fr');
    translate.use('fr');
  }

  ngOnInit() {
  }


  ngOnDestroy() {
    this.socketService.disconnect();
  }

}
