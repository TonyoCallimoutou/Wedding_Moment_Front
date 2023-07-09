import {Component, Input} from '@angular/core';

export interface Share {
  title?: string;
  text?: string;
  url?: string;
}
interface ExtendNavigator extends Navigator {
  share: (share: Share) => Promise<void>;
}
interface ExtendWindow extends Window {
  navigator: ExtendNavigator;
}

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class ShareButtonComponent {
  @Input() share: Share | undefined;
  @Input() metaData: any;

  onClick() {
    if (!!this.metaData && !!this.share) {
      for (let key in this.metaData) {
        if (this.metaData.hasOwnProperty(key)) {
          this.share.text = this.share.text?.replace('{{'+key+'}}', this.metaData[key]);
          this.share.title = this.share.title?.replace('{{'+key+'}}', this.metaData[key]);
        }
      }
    }
    window.navigator.share(this.share);
  }
}
