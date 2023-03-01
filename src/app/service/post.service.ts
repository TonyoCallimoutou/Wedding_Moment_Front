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

  getAllPost(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${baseUrl}/event/${id}`);
  }

  setPictureOfPost(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/setter`, data);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
