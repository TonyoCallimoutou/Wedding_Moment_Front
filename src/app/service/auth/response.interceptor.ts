import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, take, tap} from "rxjs";
import {LocalModel} from "../../model/local.model";
import {UserModelService} from "../../viewModel/user-model.service";
import {CookieHelper} from "../../shared/service/cookie.helper";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(
    private userModelService: UserModelService,
    ) {
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
                  CookieHelper.set(LocalModel.TOKEN, '')
                  CookieHelper.set(LocalModel.USER, JSON.stringify(user));
                  window.location.reload();
                });
            }
          }
        }
      )
    );
  }
}
