import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Response, Http, Headers } from '@angular/http'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { EnumResponseStatus } from '../shared/app-helper'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private bHttpClient: HttpClient
  apiUrl: string = null
  private bHttp
  private _sessionExpired = false
  private bRouter: Router
  constructor(
     http: Http,
     httpClient: HttpClient = null,
  ) {
    this.bHttpClient = httpClient
    this.apiUrl = environment.apiUrl
    this.bHttp = http
  }

  authorizationHttpHeader(): HttpHeaders {
    return new HttpHeaders({ 'x-auth-token': localStorage.getItem('token') })
  }

  getPostHttpHeader(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type':'application/json', 'x-auth-token': localStorage.getItem('token') })
  }

  getPostImageHttpHeader(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type':'multipart/form-data', 'x-auth-token': localStorage.getItem('token') })
  }

  protected handledError(response: any) {
    if(response.status === EnumResponseStatus.TokenExpiredError && response.message.name === "TokenExpiredError") {
      if (!this._sessionExpired) {
        this._sessionExpired = true
        if (!this.bRouter.url.startsWith('/login')) {
          this.bRouter.navigate(['/login'], { queryParams: { redirect: this.bRouter.url } })
        }
      }
    }
  }

  protected getAPI(
    apiRoute: string,
    {
      headerConfig = { headers: this.authorizationHttpHeader() },
    } = {}) {
    let url = ''
    url = environment.apiUrl + apiRoute
    return this.bHttpClient.get(url, headerConfig).pipe( 
    )
  }

  protected postAPI(
    apiRoute: string,
    body: any,
    {
      headerConfig = { headers: this.getPostHttpHeader() },
    } = {}) {
    let url = ''
    url = environment.apiUrl + apiRoute
    return this.bHttpClient.post(url, body, headerConfig)
  }

  protected postImageAPI(
    apiRoute: string,
    body: any,
    {
      headerConfig = { headers: this.authorizationHttpHeader() },
    } = {}) {
    let url = ''
    url = environment.apiUrl + apiRoute
    return this.bHttpClient.post(url, body, headerConfig)
  }

  protected patchAPI(
    apiRoute: string,
    body: any,
    {
      headerConfig = { headers: this.getPostHttpHeader() },
    } = {}) {
    let url = ''
    url = environment.apiUrl + apiRoute
    return this.bHttpClient.patch(url, body, headerConfig)
  }

  protected deleteAPI(
    apiRoute: string,
    {
      headerConfig = { headers: this.getPostHttpHeader() },
    } = {}) {
    let url = ''
    url = environment.apiUrl + apiRoute
    return this.bHttpClient.delete(url, headerConfig)
  }

  protected deleteAPI2(
    apiRoute: string,
    body: any,
    {
      headerConfig = { headers: this.getPostHttpHeader() },
    } = {}) {
    let url = ''
    url = environment.apiUrl + apiRoute
    const t = new HttpRequest("DELETE", url, body, headerConfig)
    return this.bHttpClient.request(t)
  }
}
