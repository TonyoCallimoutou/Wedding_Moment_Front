import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";

const baseUrl = environment.Back_Host + '/api/events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  currentEventId: number = 0;

  constructor(private http: HttpClient) {
  }

  goToEvent(event: EventModel) {
    this.currentEventId = event.eventId;
  }

  getEventId() {
    return this.currentEventId;
  }

  getEventById(eventId: number): Observable<any> {
    return this.http.get(`${baseUrl}/${eventId}`);
  }

  getAllEvent(): Observable<any> {
    return this.http.get(baseUrl);
  }

  setEventPicture(data: EventModel): Observable<any> {
    return this.http.put(`${baseUrl}/setEventPicture/${this.currentEventId}`, data)
  }

  setPresentationText(data: EventModel): Observable<any> {
    return this.http.put(`${baseUrl}/setEventPresentation/${this.currentEventId}`, data)
  }

  createEvent(data: EventModel): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getEventsByUser(userId: string): Observable<any> {
    return this.http.get(`${baseUrl}/user/${userId}`);
  }

  getEventByCode(code: string): Observable<any> {
    return this.http.get(`${baseUrl}/code/${code}`);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  createMenu(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/Menu/${this.currentEventId}`, data);
  }

  updateMenu(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/Menu/${this.currentEventId}`, data);
  }

  getMenu(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/Menu/${id}`);
  }

  deleteMenu(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/Delete-Menu/${this.currentEventId}`, data);
  }

  createPlanTable(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/PlanTable/${this.currentEventId}`, data);
  }

  updatePlanTable(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/PlanTable/${this.currentEventId}`, data);
  }

  getPlanTable(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/PlanTable/${id}`);
  }

  deletePlanTable(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/Delete-PlanTable/${this.currentEventId}`, data);
  }

  createInvite(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/Invite/${this.currentEventId}`, data);
  }

  setInvite(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/setInvite/${this.currentEventId}`, data);
  }

  deleteInvite(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/Delete-Invite/${this.currentEventId}`, data);
  }
}
