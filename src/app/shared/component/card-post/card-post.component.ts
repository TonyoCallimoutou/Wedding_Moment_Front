import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {OptionStringIcon} from "../../../model/option-string-icon.model";
import {TranslateService} from "@ngx-translate/core";
import {SnackbarService} from "../../service/snackbar.service";

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss']
})
export class CardPostComponent implements OnChanges{

  @Input() post! : Post;
  @Input() reactPostId : number[] = [];
  @Input() currentUser! : User;
  @Input() style : string = '';
  @Input() isActivate : boolean = false;
  @Output() reaction : EventEmitter<Post> = new EventEmitter<Post>();
  @Output() delete : EventEmitter<Post> = new EventEmitter<Post>();

  public dropdownOptions: OptionStringIcon[] = [];

  constructor(
    private translate: TranslateService,
    private snackbarService: SnackbarService,
  ) {
    console.log(this.post);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post']) {
      this.initDropDownOption();
    }
  }


  /**
   * Set dropdownOptions
   */
  initDropDownOption() {

    let option1 : OptionStringIcon = {
      optionText: "",
      icon: "report",
    }
    let option2: OptionStringIcon = {
      optionText: "",
      icon: "delete",
    }

    this.dropdownOptions = [option1,option2];

    this.translate.get("Posts.Option.report").subscribe((res: string) => {
      this.dropdownOptions[0].optionText = res;
    })
    this.translate.get("Posts.Option.delete").subscribe((res: string) => {
      this.dropdownOptions[1].optionText = res;
    })

    if (this.post.userId !== this.currentUser.userId) {
      this.dropdownOptions.splice(this.dropdownOptions.length - 1);
    }
  }

  /**
   * Select Option on burgerMenu
   * @param option
   */
  onOptionSelected(option: OptionStringIcon) {
    if (option === this.dropdownOptions[0]) {
      this.test();
    }
    else if (option === this.dropdownOptions[1]) {
      this.removePost(this.post);
    }
  }

  reactPost(post : Post) {
    this.reaction.emit(post);
  }

  removePost(post: Post) {
    this.delete.emit(post);
  }

  test() {
    this.snackbarService.showSnackbar();
  }

}
