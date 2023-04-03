import {Component, EventEmitter, Output, TemplateRef, ViewChild} from '@angular/core';
import {EventModelService} from "../../../viewModel/event-model.service";
import {MatDialog} from "@angular/material/dialog";
import {GenericDialogComponent} from "../../../shared/component/generic-dialog/generic-dialog.component";

@Component({
  selector: 'app-presentation-page',
  templateUrl: './presentation-page.component.html',
  styleUrls: ['./presentation-page.component.scss']
})
export class PresentationPageComponent {

  @Output() sendTemporaryBackground: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendFinallyBackground: EventEmitter<any> = new EventEmitter<any>();

  dropdownOptions: DropdownOption[];

  backgroundSrc: any = '';

  background: any = '';

  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>;

  constructor(
    private eventModelService: EventModelService,
    private dialog: MatDialog,
  ) {
    let option1 : DropdownOption = {
      optionText: "Option 1",
      icon: "icon 1",
    }
    let option2: DropdownOption = {
      optionText: "Importer une image",
      icon: "icon 2",
    }

    this.dropdownOptions = [option1,option2];
  }


  onOptionSelected(option: DropdownOption) {
    if (option === this.dropdownOptions[1]) {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.png,.jpg';
      fileInput.addEventListener('change', (event: any) => {
        this.changeBackground(event);
      });
      fileInput.click();
    }
  }

  changeBackground(event: any) {
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

  setBackground(image : any) {
    this.sendTemporaryBackground.emit(image);
    this.background = image;
  }

}
