import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../model/user.model";

const baseUrl = 'http://localhost:3000/api/users';

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

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}