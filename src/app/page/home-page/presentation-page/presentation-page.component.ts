import {Component, EventEmitter, Output, TemplateRef, ViewChild} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";
import {MatDialog} from "@angular/material/dialog";
import {GenericDialogComponent} from "../../../shared/component/generic-dialog/generic-dialog.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-presentation-page',
  templateUrl: './presentation-page.component.html',
  styleUrls: ['./presentation-page.component.scss']
})
export class PresentationPageComponent {

  public event: EventModel;

  @Output() sendTemporaryBackground: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendFinallyBackground: EventEmitter<any> = new EventEmitter<any>();

  public dropdownOptions: OptionStringIcon[] = [];
  public isSetPresentationText : boolean = false;
  public fontSize : number;
  public fontSizeString : string
  public textAlign: string;

  public backgroundSrc: any = '';

  public background: any = '';

  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>;

  constructor(
    private eventModelService: EventModelService,
    private dialog: MatDialog,
    private translate: TranslateService,
  ) {

    this.event = this.eventModelService.getActualEvent();

    this.initDropDownOption();

    this.fontSize = this.event.presentationTextSize ? this.event.presentationTextSize : 96;
    this.fontSizeString = this.fontSize + 'px'
    this.textAlign = this.event.presentationTextAlign ? this.event.presentationTextAlign : 'center';

  }

  /**
   * Set dropdownOptions
   */
  initDropDownOption() {
    let option1 : OptionStringIcon = {
      optionText: "",
      icon: "edit_note",
    }
    let option2: OptionStringIcon = {
      optionText: "",
      icon: "wallpaper",
    }

    this.dropdownOptions = [option1,option2];

    this.translate.get("Presentation.Option.modify_presentation_text").subscribe((res: string) => {
      this.dropdownOptions[0].optionText = res;
    })
    this.translate.get("Presentation.Option.import_picture").subscribe((res: string) => {
      this.dropdownOptions[1].optionText = res;
    })
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

  /**
   * Save presentation texte
   */
  save() {
    this.isSetPresentationText = false;
    var presentation : EventModelPresentation = {
      presentationText: this.event.presentationText,
      presentationTextSize: this.fontSize,
      presentationTextAlign: this.textAlign,
    }
    this.eventModelService.setPresentationText(presentation);
  }

}
