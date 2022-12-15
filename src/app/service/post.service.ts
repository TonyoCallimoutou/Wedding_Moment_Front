import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Post } from "../model/post.model";
import { SocketIoService } from "./socket-io.service";

const baseUrl = environment.Back_Host + '/api/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
    private socketService: SocketIoService    
    ) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(baseUrl);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${baseUrl}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}