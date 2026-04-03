import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Ocr {
  constructor(
    private http: HttpClient,
    @Inject('API_BASE_URL') private baseUrl: string,
  ) {}

  analyzeImageUrl(url: string, version: string = 'v4.0'): Observable<any> {
    return this.http.post(`${this.baseUrl}/ocr/url`, { url, version });
  }

  analyzeImageUpload(imageBase64: string, version: string = 'v4.0'): Observable<any> {
    return this.http.post(`${this.baseUrl}/ocr/upload`, { image: imageBase64, version });
  }
}
