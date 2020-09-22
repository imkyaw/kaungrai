import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService{

  constructor(
    http: Http,
    router: Router,
    httpClient: HttpClient,
  ) { 
    super(http,router,httpClient)
  }
  getContact(): Observable<any> {
    const apiUrl = 'contact/'
    return super.getAPI(apiUrl, {})
  }
  createContact (title: string, description: string): Observable<any> {
    const apiUrl = 'contact/'
    const body = { title: title, description: description }
    return super.postAPI(apiUrl, body)
  }
  deleteContact (id: string): Observable<any> {
    const apiUrl = 'contact/' + id
    return super.deleteAPI(apiUrl)
  }
}
