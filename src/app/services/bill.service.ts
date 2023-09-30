import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private url ='https://localhost:7134/api/Bills';
  
  constructor(private http:HttpClient) { }

  uploadFile(file: File):Observable<any> {
    const formData = new FormData();
    formData.append('file',file,file.name);
    const apiurl =`${this.url}/upload`;
    return this.http.post<any>(apiurl, formData);
  }
  downloadFile(id:number)
  {
    const apiurl = `${this.url}/download/1`;
    return this.http.get(`${this.url}/download/${id}`, { responseType: 'blob' });
  }

  getBills()
  {
    return this.http.get<any[]>(`${this.url}`);
  }
}
