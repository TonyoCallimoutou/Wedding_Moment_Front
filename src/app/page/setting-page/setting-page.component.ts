import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.scss']
})
export class SettingPageComponent implements OnInit {

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  /**
  * Delete user
  */
  signOut() {
    this.authService.SignOut();
  }

  /**
 * Delete user
 */
  removeUser() {
    this.authService.RemoveUser();
  }

}
