import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Comment } from "../model/comment.model";

const baseUrl = environment.Back_Host + '/api/comments';

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

  getCommentsById(CommentId: number): Observable<Comment> {
    return this.http.get<Comment>(`${baseUrl}/${CommentId}`);
  }

  getCommentsByPictureId(pictureId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${baseUrl}/picture/${pictureId}`);
  }

  delete(data: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        commentId: data.commentId,
        pictureId: data.pictureId,
      },
    };
    return this.http.delete( baseUrl, options);
  }
}