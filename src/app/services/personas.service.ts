import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personas } from '../models/personas';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http: HttpClient) { }

  public Get(data?: any): Observable<any> {
    return this.http.get<any>('https://localhost:7259/api/v1/Personas?PageNumber=' + data?.PageNumber + '&PageSize=' + data?.PageSize
      + (data?.cdtipo != null ? '&cdtipo=' + data?.cdtipo : ''));
  }

  public GetById(id: number): Observable<any> {
    return this.http.get<any>('https://localhost:7259/api/v1/Personas/' + id);
  }

  public Post(maestra: Personas): Observable<Personas[]> {
    return this.http.post<any>('https://localhost:7259/api/v1/Personas', maestra);
  }

  public Put(maestra: Personas): Observable<Personas[]> {
    return this.http.put<any>('https://localhost:7259/api/v1/Personas/' + maestra.nmid, maestra);
  }

  public Delete(id: number): Observable<Personas[]> {
    return this.http.delete<Personas[]>('https://localhost:7259/api/v1/Personas/' + id);
  }
}
