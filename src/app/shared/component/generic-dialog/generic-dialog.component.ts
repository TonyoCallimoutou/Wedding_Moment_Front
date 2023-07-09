import {Component, Inject, TemplateRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss']
})
export class GenericDialogComponent {
  public contentTemplate: TemplateRef<any>;
  public isDisplayButton: boolean = true;
  public isDisplayCloseButton: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<GenericDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    if (data.isDisplayButton != undefined) {
      this.isDisplayButton = data.isDisplayButton;
    }
    if (data.isDisplayCloseButton != undefined) {
      this.isDisplayCloseButton = data.isDisplayCloseButton;
    }
    this.contentTemplate = data.contentTemplate;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
