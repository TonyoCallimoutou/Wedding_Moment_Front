import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from "rxjs";
import {LocalModel} from "../../model/local.model";
import {CookieHelper} from "../cookie.helper";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cookieService = CookieHelper.getCookieService();

    const token = cookieService.get(LocalModel.TOKEN); // Récupérer le token stocké

    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      // Passer la nouvelle requête clonée à la prochaine étape de l'intercepteurs
      return next.handle(authReq);
    }

    // Si aucun token n'est présent, passer la requête telle quelle sans modification
    return next.handle(req);
  }
}
