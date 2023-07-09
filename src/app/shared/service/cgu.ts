import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {CguDialogComponent} from "../component/cgu-dialog/cgu-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class CguService {

  constructor(
    private dialog: MatDialog,
  ) {
  }

  displayCGU(isConfidentiality: boolean = false, switchAutorize: boolean = true) {
    this.dialog.open(CguDialogComponent, {
      data: {
        isConfidentiality: isConfidentiality,
        isSwitchAutorize: switchAutorize,
      }
    });
  }
}
