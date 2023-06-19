import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, take, tap} from "rxjs";
import {LocalModel} from "../../model/local.model";
import {UserModelService} from "../../viewModel/user-model.service";
import {CookieService} from "ngx-cookie-service";
import {CookieHelper} from "../cookie.helper";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  private cookieService: CookieService;

  constructor(
    private userModelService: UserModelService,
    ) {
    this.cookieService = CookieHelper.getCookieService();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (error) => {
          if (error.status === 403) {
            if (error.error.code === "auth/id-token-expired") {
              console.log(error.error);
              console.log("error on : " + req.url);

              this.userModelService.getUserFromDB("0")
                .pipe(take(1))
                .subscribe((user: User) => {
                  this.cookieService.set(LocalModel.TOKEN, '')
                  this.cookieService.set(LocalModel.USER, JSON.stringify(user));
                  window.location.reload();
                });
            }
          }
        }
      )
    );
  }
}
