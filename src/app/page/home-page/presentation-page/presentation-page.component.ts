import {Component, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";
import {MatDialog} from "@angular/material/dialog";
import {GenericDialogComponent} from "../../../shared/component/generic-dialog/generic-dialog.component";

@Component({
  selector: 'app-presentation-page',
  templateUrl: './presentation-page.component.html',
  styleUrls: ['./presentation-page.component.scss']
})
export class PresentationPageComponent {

  event: EventModel;

  @Output() sendTemporaryBackground: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendFinallyBackground: EventEmitter<any> = new EventEmitter<any>();

  dropdownOptions: OptionStringIcon[] = [];
  isSetPresentationText : boolean = false;
  fontSize : number;
  fontSizeString : string
  textAlign: string;

  backgroundSrc: any = '';

  background: any = '';

  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>;

  constructor(
    private eventModelService: EventModelService,
    private dialog: MatDialog,
  ) {

    this.event = this.eventModelService.getActualEvent();

    this.initDropDownOption();

    this.fontSize = this.event.presentationTextSize ? this.event.presentationTextSize : 96;
    this.fontSizeString = this.fontSize + 'px'
    this.textAlign = this.event.presentationTextAlign ? this.event.presentationTextAlign : 'center';

  }

  initDropDownOption() {
    let option1 : OptionStringIcon = {
      optionText: "Modifier le texte de presentation",
      icon: "icon 1",
    }
    let option2: OptionStringIcon = {
      optionText: "Importer une image",
      icon: "icon 2",
    }

    this.dropdownOptions = [option1,option2];
  }

  /**
   * Select Option on burgerMenu
   * @param option
   */
  onOptionSelected(option: OptionStringIcon) {
    if (option === this.dropdownOptions[1]) {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.png,.jpg';
      fileInput.addEventListener('change', (event: any) => {
        this.openDialog(event);
      });
      fileInput.click();
    }
    else if (option === this.dropdownOptions[0]) {
      this.isSetPresentationText = true;
    }
  }

  /**
   * Open dialog --> Change Background
   * @param event
   */
  openDialog(event: any) {
    this.backgroundSrc = event;

    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {contentTemplate: this.dialogContent },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sendFinallyBackground.emit(this.background);
      }
      this.backgroundSrc = null;
      this.background = null;
    });
  }

  /**
   * Set new Image to Background
   * @param image
   */
  setBackground(image : any) {
    this.sendTemporaryBackground.emit(image);
    this.background = image;
  }


  /**
   * When user change font size
   * @param size
   */
  onFontSizeChange(more: boolean) {
    more ? this.fontSize++ : this.fontSize--;
    this.fontSizeString = this.fontSize + 'px'
  }

  /**
   * When user change text align
   * @param align
   */
  onAlignChange(align: string) {
    this.textAlign = align;
  }

  save() {
    console.log(this.eventModelService.event)
    this.isSetPresentationText = false;
    var presentation : EventModelPresentation = {
      presentationText: this.event.presentationText,
      presentationTextSize: this.fontSize,
      presentationTextAlign: this.textAlign,
    }
    this.eventModelService.setPresentationText(presentation);
  }

}
