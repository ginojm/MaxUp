import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { InquiryRequest, Module } from './module.model';

@Injectable({ providedIn: 'root' })
export class MaxUpApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api';

  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.baseUrl}/modules`);
  }

  getModule(slug: string): Observable<Module> {
    return this.http.get<Module>(`${this.baseUrl}/modules/${encodeURIComponent(slug)}`);
  }

  sendInquiry(inquiry: InquiryRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.baseUrl}/inquiries`, inquiry);
  }
}
