import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {OptionStringIcon} from "../../../model/option-string-icon.model";
import {Post} from "../../../model/post.model";
import {User} from "../../../model/user.model";
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

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
  @Input() isOffline : boolean = false;
  @Output() reaction : EventEmitter<Post> = new EventEmitter<Post>();
  @Output() reported : EventEmitter<Post> = new EventEmitter<Post>();
  @Output() delete : EventEmitter<Post> = new EventEmitter<Post>();
  @Output() onClick : EventEmitter<Post> = new EventEmitter<Post>();

  animationItem!: AnimationItem;

  options: AnimationOptions = {
    path: '/assets/lottie/animation_1.json',
  };

  public dropdownOptions: OptionStringIcon[] = [];

  constructor(
    private translate: TranslateService,
  ) {
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
      this.reported.emit(this.post)
    }
    else if (option === this.dropdownOptions[1]) {
      this.removePost(this.post);
    }
  }

  reactPost(post : Post) {
    if (!this.reactPostId.includes(post.postId)) {
      this.animationItem.show();
      this.animationItem.play();
    }

    this.reaction.emit(post);
  }

  loopComplete() {
    this.animationItem.pause();
  }

  removePost(post: Post) {
    this.delete.emit(post);
  }

  updatePicture(post : Post) {
    this.onClick.emit(post);
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    this.animationItem.pause();
    this.animationItem.hide();
  }

}
