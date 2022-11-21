import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { PictureModelService } from '../viewModel/picture-model.service';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  
  public socket;

  constructor(
  ) {
    this.socket = socketIo.connect(environment.Back_Host)
  }

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
  }

  refreshListPicture() {
    this.socket.emit('Pictures');
  }

  refreshListComment(pictureId: number) {
    this.socket.emit('Comments', pictureId);
  }
}

