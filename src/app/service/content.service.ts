import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class ContentService extends BaseService{

  constructor(
    http: Http,
    router: Router,
    httpClient: HttpClient,
  ) { 
    super(http, router, httpClient)
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
  uploadImage(id: string, image: File): Observable<any> {
    const apiUrl = 'content/img/' + id
    const body = new FormData()
    body.append('image', image, image.name)
    return super.postImageAPI(apiUrl, body)
  }
  deleteContent(id: string): Observable<any> {
    const apiUrl = 'content/' + id
    return super.deleteAPI(apiUrl)
  }
  deleteContentImage(id: string, img: string): Observable<any> {
    const apiUrl = 'content/img/' + id 
    const body = { image: img }
    return super.deleteAPI2(apiUrl, body)
  }
  getContentbyId(id: string): Observable<any> {
    const apiUrl = 'content/' + id
    return super.getAPI(apiUrl)
  }
}
