import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketIoService} from './service/socket-io.service';
import {TranslateService} from "@ngx-translate/core";
import {LocalModel} from "./model/local.model";
import {CookieHelper} from "./service/cookie.helper";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FrontEnd';

  constructor(
    private socketService: SocketIoService,
    private translate: TranslateService,
    private cookieService: CookieService,
    ) {
    CookieHelper.initialize(cookieService);
    let language = this.cookieService.get(LocalModel.LANGUAGE) ? this.cookieService.get(LocalModel.LANGUAGE) : translate.getBrowserLang();
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
