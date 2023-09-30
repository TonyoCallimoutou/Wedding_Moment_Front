import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GenericDialogComponent} from "../generic-dialog/generic-dialog.component";

@Component({
  selector: 'app-cgu-dialog',
  templateUrl: './cgu-dialog.component.html',
  styleUrls: ['./cgu-dialog.component.scss']
})
export class CguDialogComponent extends GenericDialogComponent{

  public isConfidentiality: boolean = false;
  public switchAutorize: boolean = true;

  constructor(
    public override dialogRef: MatDialogRef<CguDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    super(dialogRef,data);
    if (data.isConfidentiality != undefined) {
      this.isConfidentiality = data.isConfidentiality;
    }
    if(data.switchAutorize != undefined){
      this.switchAutorize = data.switchAutorize;
    }
  }

  switch_doc() {
    this.isConfidentiality = !this.isConfidentiality;
  }

  override onNoClick(): void {
    this.dialogRef.close();
  }
}
