import { Injectable } from '@angular/core';
import { BaseService } from './base.service'
import { Http, HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Language } from '../model/language'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LanguageService extends BaseService{

  constructor(
    http: Http,
    httpClient: HttpClient,
  ) {
    super(http,httpClient)
   }

  getLanguage(): Observable<any> {
    const apiUrl = 'language/'
    return super.getAPI(apiUrl, {})
  }
  createLanguage(lan: string): Observable<any> {
    const apiUrl = 'language/'
    const body = { lang: lan }
    return super.postAPI(apiUrl, body)
  }
  deleteLanguage(id: string): Observable<any> {
    const apiUrl = 'language/' + id
    return super.deleteAPI(apiUrl)
  }
  getLanguageById(id: string): Observable<any> {
    const apiUrl = 'language/' + id
    return super.getAPI(apiUrl)
  }
}
