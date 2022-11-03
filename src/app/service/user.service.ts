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

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}