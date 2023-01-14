import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maestras } from '../models/maestras';

@Injectable({
  providedIn: 'root'
})
export class MaestrasService {

  constructor(private http: HttpClient) { }

  public Get(data?: any): Observable<any> {
    return this.http.get<any>('https://localhost:7259/api/v1/Maestras?PageNumber=' + data?.PageNumber + '&PageSize=' + data?.PageSize);
  }

  public GetById(id: number): Observable<any> {
    return this.http.get<any>('https://localhost:7259/api/v1/Maestras/' + id);
  }

  public Post(maestra: Maestras): Observable<Maestras[]> {
    return this.http.post<any>('https://localhost:7259/api/v1/Maestras', maestra);
  }

  public Put(maestra: Maestras): Observable<Maestras[]> {
    return this.http.put<any>('https://localhost:7259/api/v1/Maestras/' + maestra.nmmaestro, maestra);
  }

  public Delete(id: string): Observable<Maestras[]> {
    return this.http.delete<Maestras[]>('https://localhost:7259/api/v1/Maestras/' + id);
  }
}
