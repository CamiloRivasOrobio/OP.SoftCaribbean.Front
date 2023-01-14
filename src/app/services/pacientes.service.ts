import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pacientes } from '../models/pacientes';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http: HttpClient) { }

  public Get(data?: any): Observable<any> {
    return this.http.get<any>('https://localhost:7259/api/v1/Pacientes?PageNumber=' + data?.PageNumber + '&PageSize=' + data?.PageSize
      + (data?.cdtipo != null ? '&cdtipo=' + data?.cdtipo : ''));
  }

  public GetById(id: number): Observable<any> {
    return this.http.get<any>('https://localhost:7259/api/v1/Pacientes/' + id);
  }

  public Post(maestra: Pacientes): Observable<Pacientes[]> {
    return this.http.post<any>('https://localhost:7259/api/v1/Pacientes', maestra);
  }

  public Put(maestra: Pacientes): Observable<Pacientes[]> {
    return this.http.put<any>('https://localhost:7259/api/v1/Pacientes/' + maestra.nmid, maestra);
  }

  public Delete(id: number): Observable<Pacientes[]> {
    return this.http.delete<Pacientes[]>('https://localhost:7259/api/v1/Pacientes/' + id);
  }
}
