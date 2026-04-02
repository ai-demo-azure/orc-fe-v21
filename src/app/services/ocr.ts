import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Ocr {
  private baseUrl = 'http://localhost:5046/api/ocr'; // backend URL

  constructor(private http: HttpClient) {}

  analyzeImageUrl(url: string, version: string = 'v4.0'): Observable<any> {
    return this.http.post(`${this.baseUrl}/url`, { url, version });
  }

  analyzeImageUpload(imageBase64: string, version: string = 'v4.0'): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, { image: imageBase64, version });
  }
}
