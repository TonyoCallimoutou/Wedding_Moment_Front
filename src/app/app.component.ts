import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketIoService} from './service/socket-io.service';
import {TranslateService} from "@ngx-translate/core";
import {LocalModel} from "./model/local.model";
import {CookieHelper} from "./shared/service/cookie.helper";
import {CookieService} from "ngx-cookie-service";
import {LoaderModel, LoaderService} from "./shared/service/loader.service";
import {SnackbarService} from "./shared/service/snackbar.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'WeddingMoment';

  public loader : LoaderModel = {
    isStart: false,
    time: 2000,
    text: '',
    isMainLoader: false,
  };
  private isLoadingFinish: boolean = false;

  constructor(
    private socketService: SocketIoService,
    private translate: TranslateService,
    private cookieService: CookieService,
    private loaderService: LoaderService,
    private snackbarService: SnackbarService,
    ) {
    CookieHelper.initialize(cookieService);
    let language = this.cookieService.get(LocalModel.LANGUAGE) ? this.cookieService.get(LocalModel.LANGUAGE) : translate.getBrowserLang();
    language = language ? language : 'fr';
    translate.setDefaultLang(language);
    translate.use(language);

    this.cookieService.set(LocalModel.LANGUAGE, language);

    this.listenLoader();
  }

  ngOnInit() {
  }


  ngOnDestroy() {
    this.socketService.disconnect();
  }

  listenLoader() {
    this.loaderService.getLoader().subscribe((value : LoaderModel) => {
      if (value.isStart && value.isStart !== this.loader.isStart) {
        this.showSnackBar(value);
        this.loader = value;
        setTimeout(() => {
          if (this.isLoadingFinish) {
            this.loader.isStart = false;
            this.isLoadingFinish = false
          }
          else {
            console.log('Loading more than ', value.time/1000, 'sec for... ', value.text);
          }
        }, value.time);
      }
      else if (this.loader.isStart) {
        this.isLoadingFinish = true;
      }
      else if (!this.loader.isStart) {
        this.isLoadingFinish = false;
        this.loader.isStart = false;
      }
      else {
        console.log("error loading !! ")
      }
    });
  }


  private showSnackBar(value: LoaderModel) {
    if (!value.isMainLoader && !!value.text) {
      this.snackbarService.showSnackbar("infos",value.text,value.time);
    }
  }


}
