import {Component, Inject, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss']
})
export class GenericDialogComponent implements OnInit, OnDestroy{
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

  ngOnInit(): void {
    history.pushState({ action: 'customAction' }, '', window.location.href);
    window.addEventListener('popstate', this.handlePopState.bind(this));
  }

  handlePopState(event: PopStateEvent) {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    window.removeEventListener('popstate', this.handlePopState);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
