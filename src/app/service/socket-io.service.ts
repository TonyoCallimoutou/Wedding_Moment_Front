import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Comment } from '../model/comment.model';
import { Post } from '../model/post.model';

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
   * Notify other when you add post
   * @param post 
   */
  addPost(post: Post) {
    this.socket.emit('addPost', post);
  }

  /**
   * Notify other when you remove post
   * @param post 
   */
  removePost(post: Post) {
    this.socket.emit('removePost', post);
  }

    /**
   * Notify other when you like or comment post
   * @param post 
   */
  setPost(post: Post) {
    this.socket.emit('setPost', post);
  }

  /**
   * Notify other when you add comment
   * @param post 
   */
   addComment(post: Post, comment: Comment) {
    this.socket.emit('addComment', post, comment);
  }

  /**
   * Notify other when you remove comment
   * @param post 
   */
  removeComment(post: Post, comment: Comment) {
    this.socket.emit('removeComment', post, comment);
  }

    /**
   * Notify other when you like comment
   * @param post 
   */
  setComment(comment: Comment) {
    this.socket.emit('setComment', comment);
  }

   /**
   * Notify other when you like comment
   * @param post 
   */
  setUser(user: any) {
    this.socket.emit('setUser', user);
  }
}

