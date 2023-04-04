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

  getAllEvent(): Observable<any> {
    return this.http.get(baseUrl);
  }

  setEventPicture(data: EventModel): Observable<any> {
    return this.http.put(`${baseUrl}/setEventPicture`, data)
  }

  setPresentationText(data: EventModel): Observable<any> {
    return this.http.put(`${baseUrl}/setEventPresentation`, data)
  }

  createEvent(data: EventModel): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  createMenu(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/Menu`, data);
  }

  updateMenu(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/Menu`, data);
  }

  getMenu(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/Menu/${id}`);
  }

  deleteMenu(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/Menu/${id}`);
  }

  createPlanTable(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/PlanTable`, data);
  }

  getPlanTable(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/PlanTable/${id}`);
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
