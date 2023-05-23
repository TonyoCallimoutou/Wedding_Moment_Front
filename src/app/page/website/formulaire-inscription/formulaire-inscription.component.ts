import {Component, TemplateRef, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {GenericDialogComponent} from "../../../shared/component/generic-dialog/generic-dialog.component";

@Component({
  selector: 'app-formulaire-inscription',
  templateUrl: './formulaire-inscription.component.html',
  styleUrls: ['./formulaire-inscription.component.scss']
})
export class FormulaireInscriptionComponent {

  formulaire: FormGroup;

  public backgroundSrc: any = '';

  public background: any = '';

  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    ) {

    this.formulaire = this.fb.group({
      formPresentation : this.fb.group({
        picture: ['',Validators.required],
        text: ['', Validators.required]
      }),
      formMenu : this.fb.group({
        menus: this.fb.array([])
      }),
      formPlanTable: this.fb.group({
        nothing: ['']
      })
    });

  }

  get formPresentation() {
    return this.formulaire.controls["formPresentation"] as FormGroup;
  }

  get formMenu() {
    return this.formulaire.controls["formMenu"] as FormGroup;
  }

  get menus() {
    return this.formMenu.controls["menus"] as FormArray;
  }

  get formPlanTable() {
    return this.formulaire.controls["formPlanTable"] as FormGroup;
  }

  getFormGroup(control: AbstractControl) {
    return control as FormGroup;
  }


  addMenu() {
    const form = this.fb.group({
      menuCategorie: [''],
      menuDescription: ['']
    });

    this.menus.push(form);
  }

  deleteMenu(index: number) {
    this.menus.removeAt(index);
  }

  test() {
    console.log(this.formulaire);
  }

  getErrorMessage(formName: string): string {
    const form = this.formPresentation.controls[formName];
    switch (formName) {
      case 'picture':
        if (form.hasError('required')) {
          return 'Inscription.Errors.required'
        }
        break;
      case 'text':
        if (form.hasError('required')) {
          return 'Inscription.Errors.required'
        }
        break;
    }

    return '';
  }

  choosePicture() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.png,.jpg';
    fileInput.addEventListener('change', (event: any) => {
      this.openDialog(event);
    });
    fileInput.click();
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
        console.log("OKO")
      }
      else {
        this.backgroundSrc = null;
        this.background = null;
        this.formPresentation.controls['picture'].patchValue(``);
      }
    });
  }

  /**
   * Set new Image to Background
   * @param image
   */
  setBackground(image : any) {
    this.background = image.picture;
    this.formPresentation.controls['picture'].patchValue(`${image.picture.name}`);
  }
}
