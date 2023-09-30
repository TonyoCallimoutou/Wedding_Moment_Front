import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../service/snackbar.service";
import {Share} from "../../share-button/share-button.component";
import {GenericDialogComponent} from "../generic-dialog/generic-dialog.component";

@Component({
  selector: 'app-dialog-link',
  templateUrl: './dialog-link.component.html',
  styleUrls: ['./dialog-link.component.scss']
})
export class DialogLinkComponent extends GenericDialogComponent{

  public eventLink: string = '';
  public shareLink: Share | undefined;
  public metaDataShareLink: any;

  constructor(
    public override dialogRef: MatDialogRef<DialogLinkComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private snackbarService: SnackbarService,
  ) {
    super(dialogRef, data);
    this.shareLink = data.shareLink;
    this.eventLink = data.eventLink;
    if (data.metaDataShareLink != undefined) {
      this.metaDataShareLink = data.metaDataShareLink;
    }
  }

  override onNoClick(): void {
    this.dialogRef.close();
  }

  copyCheck(message: string) {
    this.dialogRef.close();
    this.snackbarService.showSnackbar('infos',message);
  }
}
