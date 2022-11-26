import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-button',
  templateUrl: './comment-button.component.html',
  styleUrls: ['./comment-button.component.scss']
})
export class CommentButtonComponent implements OnInit {

  @Input() countComment:any;

  constructor() { }

  ngOnInit(): void {
  }

}
