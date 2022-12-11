import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Comment } from '../model/comment.model';
import { Picture } from '../model/picture.model';

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

  /**
   * Notify other when you add picture
   * @param picture 
   */
  addPicture(picture: Picture) {
    this.socket.emit('addPicture', picture);
  }

  /**
   * Notify other when you remove picture
   * @param picture 
   */
  removePicture(picture: Picture) {
    this.socket.emit('removePicture', picture);
  }

    /**
   * Notify other when you like or comment picture
   * @param picture 
   */
  setPicture(picture: Picture) {
    this.socket.emit('setPicture', picture);
  }

  /**
   * Notify other when you add comment
   * @param picture 
   */
   addComment(picture: Picture, comment: Comment) {
    this.socket.emit('addComment', picture, comment);
  }

  /**
   * Notify other when you remove comment
   * @param picture 
   */
  removeComment(picture: Picture, comment: Comment) {
    this.socket.emit('removeComment', picture, comment);
  }

    /**
   * Notify other when you like comment
   * @param picture 
   */
  setComment(comment: Comment) {
    this.socket.emit('setComment', comment);
  }

   /**
   * Notify other when you like comment
   * @param picture 
   */
  setUser(user: any) {
    this.socket.emit('setUser', user);
  }
}

