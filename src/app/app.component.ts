import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketIoService } from './service/socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FrontEnd';

  constructor(private socketService: SocketIoService) {}

  ngOnInit() {
  }


  ngOnDestroy() {
    this.socketService.disconnect();
  }
  
}
