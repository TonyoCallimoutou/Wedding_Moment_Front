import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class CookieHelper {
  private static cookieService: CookieService;
  private static expires = process.env['COOKIE_EXPIRE_DAYS'] as string;
  private static domain = process.env['DOMAIN'] as string;

  public static initialize(cookieService: CookieService): void {
    CookieHelper.cookieService = cookieService;
  }

  static set(name: string, value: string) {
    //CookieHelper.cookieService.set(name, value, Number(this.expires), '/', this.domain, false, 'Lax');
    localStorage.setItem(name, value);
  }

  static get(name: string) : string |null {
    //return CookieHelper.cookieService.get(name);
    let item = localStorage.getItem(name);
    if (!!item) {
      return item;
    }
    return null;
  }
}
