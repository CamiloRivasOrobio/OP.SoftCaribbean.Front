import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataMaestra } from '../models/data-maestra';

@Injectable({
  providedIn: 'root'
})
export class DataMaestraService {

  constructor(private http: HttpClient) { }

  public Get(data?: any): Observable<any> {
    return this.http.get<any>('https://localhost:7259/api/v1/DataMaestra?PageNumber=' + data?.PageNumber + '&PageSize=' + data?.PageSize
      + (data?.nmdato != null ? '&nmdato=' + data?.nmdato : '') + (data?.nmmaestro != null ? '&nmmaestro=' + data?.nmmaestro : '')
      + (data?.cddato != null ? '&cddato=' + data?.cddato : '') + (data?.dsddato != null ? '&dsddato=' + data?.dsddato : '')
      + (data?.cddato1 != null ? '&cddato1=' + data?.cddato1 : '') + (data?.cddato2 != null ? '&cddato2=' + data?.cddato2 : '')
      + (data?.cddato3 != null ? '&cddato3=' + data?.cddato3 : '') + (data?.feregistro != null ? '&feregistro=' + data?.feregistro : '')
      + (data?.febaja != null ? '&febaja=' + data?.febaja : ''));
  }

  public GetById(id: string): Observable<any> {
    return this.http.get<any>('https://localhost:7259/api/v1/DataMaestra/' + id);
  }

  public Post(maestra: DataMaestra): Observable<DataMaestra[]> {
    return this.http.post<any>('https://localhost:7259/api/v1/DataMaestra', maestra);
  }

  public Put(maestra: DataMaestra): Observable<DataMaestra[]> {
    return this.http.put<any>('https://localhost:7259/api/v1/DataMaestra/' + maestra.nmdato, maestra);
  }

  public Delete(id: string): Observable<DataMaestra[]> {
    return this.http.delete<DataMaestra[]>('https://localhost:7259/api/v1/DataMaestra/' + id);
  }
}
