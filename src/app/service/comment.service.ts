import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Comment } from "../model/comment.model";

const baseUrl = 'http://localhost:3000/api/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getAll(): Observable<Comment[]> {
    return this.http.get<Comment[]>(baseUrl);
  }

  getCommentsById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${baseUrl}/${id}`);
  }

  getCommentsByUserId(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${baseUrl}/user/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}