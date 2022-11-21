import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Picture } from "../model/picture.model";
import { SocketIoService } from "./socket-io.service";

const baseUrl = environment.Back_Host + '/api/pictures';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(
    private http: HttpClient,
    private socketService: SocketIoService    
    ) { }

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
    this.socketService.refreshListPicture();
    return this.http.delete(`${baseUrl}/${id}`);
  }
}