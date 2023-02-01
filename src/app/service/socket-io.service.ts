import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { environment } from 'src/environments/environment';
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
   * Notify other when set Event
   * @param event
   */
  setEvent(event: any) {
    this.socket.emit('setEvent', event);
  }

  /**
   * Notify other when add invites
   * @param invite
   */
  addInvite(invite: any) {
    this.socket.emit('addInvite', invite);
  }

  /**
   * Notify other when remove invite
   * @param invite
   */
  removeInvite(invite: any) {
    this.socket.emit('removeInvite', invite);
  }

  /**
   * Notify other when set Event
   * @param invite
   */
  setInvite(invite: any) {
    this.socket.emit('setInvite', invite);
  }

  /**
   * Notify other when add Plan Table
   * @param planTable
   */
  addPlanTable(planTable: any) {
    this.socket.emit('addPlanTable', planTable);
  }

  /**
   * Notify other when remove Plan table
   * @param planTable
   */
  removePlanTable(planTable: any) {
    this.socket.emit('removePlanTable', planTable);
  }

  /**
   * Notify other when set Event
   * @param planTable
   */
  setPlanTable(planTable: any) {
    this.socket.emit('setPlanTable', planTable);
  }

  /**
   * Notify other when add Menu
   * @param menu
   */
  addMenu(menu: any) {
    this.socket.emit('addMenu', menu);
  }

  /**
   * Notify other when remove Menu
   * @param menu
   */
  removeMenu(menu: any) {
    this.socket.emit('removeMenu', menu);
  }

  /**
   * Notify other when set Menu
   * @param menu
   */
  setMenu(menu: any) {
    this.socket.emit('setMenu', menu);
  }

   /**
   * Notify other when you like comment
   * @param post
   */
  setUser(user: any) {
    this.socket.emit('setUser', user);
  }
}

