import {Injectable} from "@angular/core";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

    constructor(
      private snackBar: MatSnackBar,
    ) {
    }

    showSnackbar(
      type: 'error' | 'infos' | 'tips' = 'infos',
      message: string = 'En cours de développement',
      duration: number = 3000,
      action: string ='X',
      horizontalPosition: MatSnackBarHorizontalPosition  = "center",
      verticalPosition: MatSnackBarVerticalPosition = "bottom"
    ) {
      this.snackBar.open(message, action, {
        duration: duration,
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
        panelClass: [type]
      });
    }

    showSnackbarWhitoutDuration(
      type: 'error' | 'infos' = 'infos',
      message: string = 'En cours de développement',
      action: string ='X',
      horizontalPosition: MatSnackBarHorizontalPosition  = "center",
      verticalPosition: MatSnackBarVerticalPosition = "bottom"
    ) {
      return  this.snackBar.open(message, action, {
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
        panelClass: [type]
      });
    }

}
