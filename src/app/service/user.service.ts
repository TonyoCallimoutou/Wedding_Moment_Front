import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";

const baseUrl = environment.Back_Host + '/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  createUser(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  setPhotoUrl(data: any): Observable<any> {
    return this.http.put<any>(`${baseUrl}/photoUrl`, data)
  }

  setUserName(data: any): Observable<any> {
    return this.http.put<any>(`${baseUrl}/userName`, data)
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${userId}`);
  }

  getReactPosts(userId: string): Observable<number[]> {
    return this.http.get<number[]>(`${baseUrl}/reactPost/${userId}`);
  }

  addReactPost(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/reactPost`, data);
  }

  unReactPost(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/unReactPost`, data);
  }

  getNotification(data: any): Observable<number[]> {
    return this.http.get<number[]>(`${baseUrl}/notification`);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${userId}`);
  }
}
