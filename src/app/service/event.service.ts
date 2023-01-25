import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {Event} from "../model/event.model";

const baseUrl = environment.Back_Host + '/api/events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  currentEventId : number = 0;

  constructor(private http: HttpClient) { }

  goToEvent(event : Event) {
    this.currentEventId = event.eventId;
  }

  getEventId() {
    return this.currentEventId;
  }

  getAllEvent() {
    return this.http.get(baseUrl);
  }

  createEvent(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  createPlanTable(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/PlanTable`, data);
  }

  deletePlanTable(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/PlanTable/${id}`);
  }

  createInvite(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/Invite`, data);
  }

  setInvite(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/setInvite`, data);
  }

  deleteInvite(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/Invite/${id}`);
  }
}
