import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService extends BaseService{

  constructor(
    http: Http,
    httpClient: HttpClient,
  ) { 
    super(http, httpClient)
  }
  getContent(): Observable<any> {
    const apiUrl = 'content/'
    return super.getAPI(apiUrl)
  }
  createConent(title: string, content: string, lang: string): Observable<any> {
    const apiUrl = 'content/'
    const body = {title: title, body: content, lang: lang}
    return super.postAPI(apiUrl, body)
  }
  addImageConent(id: string, image: File): Observable<any> {
    const apiUrl = 'content/img/' + id
    const body = new FormData()
    body.append('image', image)
    return super.postAPI(apiUrl, body)
  }
  deleteContent(id: string): Observable<any> {
    const apiUrl = 'content/' + id
    return super.deleteAPI(apiUrl)
  }
  getContentbyId(id: string): Observable<any> {
    const apiUrl = 'content/' + id
    return super.getAPI(apiUrl)
  }
}
