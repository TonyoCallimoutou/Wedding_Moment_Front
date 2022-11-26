import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
export class LikeButtonComponent implements OnChanges {

  @Input() isLike: boolean = false;
  @Input() countLike: any = null;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

}
