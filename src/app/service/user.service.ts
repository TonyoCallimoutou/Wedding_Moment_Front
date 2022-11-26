import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../model/user.model";

const baseUrl = environment.Back_Host + '/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }

  getlikePicture(id: string): Observable<number[]> {
    return this.http.get<number[]>(`${baseUrl}/likesPicture/${id}`);
  }

  likePicture(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/likesPicture`,data);
  }

  dislikePicture(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/dislikesPicture`,data);
  }

  getlikeComment(id: string): Observable<number[]> {
    return this.http.get<number[]>(`${baseUrl}/likesComment/${id}`);
  }

  likeComment(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/likesComment`,data);
  }

  dislikeComment(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/dislikesComment`,data);
  }

  setPhotoUrl(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/photoUrl`,data)
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}