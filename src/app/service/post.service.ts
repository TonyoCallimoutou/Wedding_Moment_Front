import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";

const baseUrl = environment.Back_Host + '/api/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) {
  }

  createPost(data: Post): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getTenPost(id: number, filter: any): Observable<Post[]> {
    return this.http.post<Post[]>(`${baseUrl}/event/${id}`, filter);
  }

  setPictureOfPost(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/setter`, data);
  }

  deletePost(post: Post): Observable<any> {
    return this.http.put(`${baseUrl}/Delete-Post/${post.postId}`,post);
  }
}
