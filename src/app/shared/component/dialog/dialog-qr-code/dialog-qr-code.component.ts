import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


import {MatSnackBar} from "@angular/material/snack-bar"
import {NgxQrcodeElementTypes} from "@techiediaries/ngx-qrcode";
import html2canvas from "html2canvas";
import {GenericDialogComponent} from "../generic-dialog/generic-dialog.component";


@Component({
  selector: 'app-dialog-qr-code',
  templateUrl: './dialog-qr-code.component.html',
  styleUrls: ['./dialog-qr-code.component.scss']
})
export class DialogQrCodeComponent extends GenericDialogComponent {

  public elementType: NgxQrcodeElementTypes = "canvas" as NgxQrcodeElementTypes
  public qrCode: string = '';
  public eventCode: string = '';
  public qrCodeColorDark: string = '';
  public isMenuAfficher: boolean = false;


  constructor(
    private _snackBar: MatSnackBar,
    public override dialogRef: MatDialogRef<DialogQrCodeComponent>,
  @Inject(MAT_DIALOG_DATA) data: any
  ) {
    super(dialogRef, data);
    const styles = getComputedStyle(document.documentElement);
    this.qrCodeColorDark = styles.getPropertyValue('--primary-dark').trim();

    this.qrCode = data.qrCode;
    this.eventCode = data.eventCode;
  }

  override onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Sauvagerarde uniquement le QR code
   * Tres bonne qualité
   * @param parent
   */
  saveAsImage(parent: any) {
    this.isMenuAfficher = false;
    let parentElement = null

    if (this.elementType === "canvas") {
      // fetches base 64 data from canvas
      parentElement = parent.qrcElement.nativeElement
        .querySelector("canvas")
        .toDataURL("image/png")
    } else if (this.elementType === "img" || this.elementType === "url") {
      // fetches base 64 data from image
      // parentElement contains the base64 encoded image src
      // you might use to store somewhere
      parentElement = parent.qrcElement.nativeElement.querySelector("img").src
    } else {
      alert("Set elementType to 'canvas', 'img' or 'url'.")
    }

    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement)
      // saves as image
      const blob = new Blob([blobData], { type: "image/png" })
      const url = window.URL.createObjectURL(blob)

      this.downloadImage(url);

    }
  }

  private convertBase64ToBlob(Base64Image: string) {
    // split into two parts
    const parts = Base64Image.split(";base64,")
    // hold the content type
    const imageType = parts[0].split(":")[1]
    // decode base64 string
    const decodedData = window.atob(parts[1])
    // create unit8array of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length)
    // insert all character code into uint8array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    // return blob image after conversion
    return new Blob([uInt8Array], { type: imageType })
  }


  downloadQRCode() {
    const qrCodeElement = document.getElementById('qr_code_download');

    if (qrCodeElement) {
      qrCodeElement.style.display = 'flex';
      html2canvas(<HTMLElement>qrCodeElement).then((canvas) => {
        qrCodeElement.style.display = 'none';
        // Convert canvas to image data URL
        const imageDataUrl = canvas.toDataURL('image/png');
        this.downloadImage(imageDataUrl);
      });
    }
  }

  downloadImage(imageDataUrl: string) {
    const link = document.createElement('a');
    link.href = imageDataUrl;
    link.download = 'qr_code.png';
    link.click();
    this.onNoClick();
  }


}
