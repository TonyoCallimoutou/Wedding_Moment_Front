import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, take, takeUntil} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {Post} from "../../../../model/post.model";
import {Report} from "../../../../model/report.model";

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent implements OnInit, OnDestroy {

  private destroy$ : Subject<boolean> = new Subject<boolean>();

  @Input() public post! : Post;
  @Output() public report: EventEmitter<Report> = new EventEmitter<Report>();
  @Output() public goBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isOther: boolean = false;
  public reportForm: FormGroup;

  public typeReport: string[] = []

  constructor(
    private fb : FormBuilder,
    private translateService: TranslateService,
    ) {

    this.initList();

    this.reportForm = this.fb.group({
      type: ['', Validators.required],
      reason: ['']
    })
  }

  ngOnInit(): void {
    this.reportForm.get('type')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value === "Autre") {
          this.isOther = true;
          this.reportForm.get('reason')?.setValidators([Validators.required]);
        }
        else {
          this.isOther = false;
          this.reportForm.get('reason')?.clearValidators();
        }

        this.reportForm.get('reason')?.updateValueAndValidity();
      });
  }

  ngOnDestroy() {
    this.reinit();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private initList() : void {
    this.translateService.get('Posts.Report.Report-type')
      .pipe(take(1))
      .subscribe((res: any) => {
        for (let key in res) {
          this.typeReport.push(res[key]);
        }
    });
  }

  private reinit(): void {
    this.reportForm.reset();
    this.typeReport = [];
  }

  returnPostPage() : void {
    this.reinit();
    this.goBack.emit(true)
  }

  sendReport() {
    let type = this.reportForm.get('type')?.value;
    let reason = this.reportForm.get('reason')?.value ? this.reportForm.get('reason')?.value : "";

    let report : Report = {
      postId: this.post.postId,
      userId: "",
      type: type,
      reason: reason,
    }

    this.report.emit(report);
    this.returnPostPage();

  }
}
