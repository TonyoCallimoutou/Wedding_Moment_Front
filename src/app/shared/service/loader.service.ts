import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

export interface LoaderModel {
  isStart : boolean,
  time: number,
  text: string,
  isMainLoader: boolean
}


@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private defaultLoader = {
    isStart: false,
    time: 2000,
    text: '',
    isMainLoader: false,
  }
  private loader : BehaviorSubject<LoaderModel> = new BehaviorSubject<LoaderModel>(this.defaultLoader);

  public setLoader(isStart: boolean, time : number = 2000, text: string = '', isMainLoader : boolean = false) {
    this.loader.next({
      isStart: isStart,
      time: time,
      text: text,
      isMainLoader : isMainLoader,
    });
  }

  public getLoader() : BehaviorSubject<LoaderModel> {
    return this.loader;
  }

}
