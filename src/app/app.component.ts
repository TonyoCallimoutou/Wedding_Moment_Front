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

  public loader : LoaderModel = {
    isStart: false,
    time: 2000,
    text: '',
    isMainLoader: false,
  };
  private isLoadingFinish: boolean = false;
  private isLoadingTimeout: boolean = false;

  constructor(
    private socketService: SocketIoService,
    private translate: TranslateService,
    private cookieService: CookieService,
    private loaderService: LoaderService,
    private snackbarService: SnackbarService,
    ) {
    CookieHelper.initialize(cookieService);
    let language = CookieHelper.get(LocalModel.LANGUAGE) ? CookieHelper.get(LocalModel.LANGUAGE) : translate.getBrowserLang();
    language = language ? language : 'fr';
    translate.setDefaultLang(language);
    translate.use(language);

    CookieHelper.set(LocalModel.LANGUAGE, language);
  }

  ngOnInit() {
    this.listenLoader();
    this.listenRefreshPage();
  }


  ngOnDestroy() {
    this.socketService.disconnect();
  }


  listenRefreshPage() {
    window.addEventListener('beforeunload', () => {
      this.loaderService.setLoader(true);
    });

    // Attendez que la page soit complètement chargée
    window.addEventListener('load', () => {
      this.loaderService.setLoader(false);
    });
  }

  listenLoader() {
    this.loaderService.getLoader().subscribe((value : LoaderModel) => {

      //Start loader
      if (value.isStart && value.isStart !== this.loader.isStart) {
        this.showSnackBar(value);
        this.loader = value;
        setTimeout(() => {
          if (this.isLoadingFinish) {
            this.loader.isStart = false;
            this.isLoadingFinish = false
            this.isLoadingTimeout = false;
          }
          else {
            this.isLoadingTimeout = true;
            console.log('Loading more than ', value.time/1000, 'sec for... ', value.text);
          }
        }, value.time);
      }
      // Finish loader Before Timout
      else if (!value.isStart && this.loader.isStart && !this.isLoadingTimeout) {
        this.isLoadingFinish = true;
      }
      // Finish loader After Timout
      else if (!value.isStart && this.loader.isStart && this.isLoadingTimeout) {
        this.loader.isStart = false;
        this.isLoadingFinish = false
        this.isLoadingTimeout = false;
      }
      // Error loader
      else if (value.isStart != this.loader.isStart) {
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
