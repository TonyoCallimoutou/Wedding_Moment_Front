import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() public inviteList: Invite[] = [];
  @Output() private clickOnInvite: EventEmitter<Invite> = new EventEmitter<Invite>();
  searchResult : Invite[] = [];
  searchWord: any;

  searchInvite() {
    console.log(this.searchWord);

    if (this.searchWord) {
      this.searchResult = this.inviteList.filter(invite => invite.inviteName.toLowerCase().includes(this.searchWord.toLowerCase()));
    }
    else {
      this.searchResult = [];
    }
  }

  onClick(invite: Invite) {
    this.clickOnInvite.emit(invite);
    this.searchWord = "";
    this.searchResult = []
  }
}
