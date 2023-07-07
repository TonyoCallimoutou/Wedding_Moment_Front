import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss']
})
export class CardPostComponent {

  @Input() post! : Post;
  @Input() reactPostId : number[] = [];
  @Input() currentUser! : User;
  @Input() style : string = '';
  @Input() isActivate : boolean = false;

  @Output() reaction : EventEmitter<Post> = new EventEmitter<Post>();
  @Output() delete : EventEmitter<Post> = new EventEmitter<Post>();

  constructor() {
  }

  reactPost(post : Post) {
    this.reaction.emit(post);
  }

  removePost(post: Post) {
    this.delete.emit(post);
  }



}
