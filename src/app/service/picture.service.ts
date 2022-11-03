import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Picture } from "../model/picture.model";

const baseUrl = 'http://localhost:3000/api/pictures';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getAll(): Observable<Picture[]> {
    return this.http.get<Picture[]>(baseUrl);
  }

  getPictureById(id: number): Observable<Picture> {
    return this.http.get<Picture>(`${baseUrl}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}