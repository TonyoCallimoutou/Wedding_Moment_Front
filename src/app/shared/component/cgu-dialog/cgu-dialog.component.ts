import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-cgu-dialog',
  templateUrl: './cgu-dialog.component.html',
  styleUrls: ['./cgu-dialog.component.scss']
})
export class CguDialogComponent {

  public isConfidentiality: boolean = false;
  public switchAutorize: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<CguDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
