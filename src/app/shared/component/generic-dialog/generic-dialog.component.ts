import {Component, Inject, TemplateRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss']
})
export class GenericDialogComponent {
  contentTemplate: TemplateRef<any>;

  constructor(
    public dialogRef: MatDialogRef<GenericDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { contentTemplate: TemplateRef<any>,
    }) {
    this.contentTemplate = data.contentTemplate;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
