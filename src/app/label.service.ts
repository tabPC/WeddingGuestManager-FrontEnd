import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Label } from './label';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class LabelService {

  private apiServerURL = environment.apiBaseURL;

  constructor(private http: HttpClient) { }

  public getLabels(): Observable<Label[]> {
    return this.http.get<Label[]>(`${this.apiServerURL}/label/all`);
  }
  
  public addLabel(label: Label): Observable<Label> {
    return this.http.post<Label>(`${this.apiServerURL}/label/add`, label);
  }
  
  public updateLabel(label: Label): Observable<Label> {
    return this.http.put<Label>(`${this.apiServerURL}/label/update`, label);
  }

  public deleteLabel(labelId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerURL}/label/delete/${labelId}`);
  }
}
