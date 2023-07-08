import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

    constructor(
      private snackBar: MatSnackBar,
    ) {
    }

    showSnackbar(
      type: 'error' | 'infos' = 'infos',
      message: string = 'En cours de développement',
      duration: number = 3000,
      action: string ='X',
    ) {
      this.snackBar.open(message, action, {
        duration: duration,
        panelClass: [type]
      });
    }

}
