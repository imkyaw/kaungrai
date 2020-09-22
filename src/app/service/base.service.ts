import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Response, Http, Headers } from '@angular/http'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { EnumResponseStatus } from '../shared/app-helper'
import { Router } from '@angular/router'
import { throwError } from 'rxjs'

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
     router: Router,
     httpClient: HttpClient = null,
  ) {
    this.bHttpClient = httpClient
    this.bRouter = router
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

  protected handleError(response: any) {
    console.log(response)
    if(response.error.status === EnumResponseStatus.TokenExpiredError && response.error.message.name === "TokenExpiredError") {
      if (!this._sessionExpired) {
        this._sessionExpired = true
        if (!this.bRouter.url.startsWith('/login')) {
          this.bRouter.navigate(['/login'], { queryParams: { redirect: this.bRouter.url } })
        }
      }
    }
    return throwError(response)
  }

  protected getAPI(
    apiRoute: string,
    {
      headerConfig = { headers: this.authorizationHttpHeader() },
    } = {}) {
    let url = ''
    url = environment.apiUrl + apiRoute
    return this.bHttpClient.get(url, headerConfig)
    .pipe(
      catchError(error => this.handleError(error))
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
    .pipe(
      catchError(error => this.handleError(error))
    )
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
    .pipe(
      catchError(error => this.handleError(error))
    )
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
    .pipe(
      catchError(error => this.handleError(error))
    )
  }

  protected deleteAPI(
    apiRoute: string,
    {
      headerConfig = { headers: this.getPostHttpHeader() },
    } = {}) {
    let url = ''
    url = environment.apiUrl + apiRoute
    return this.bHttpClient.delete(url, headerConfig)
    .pipe(
      catchError(error => this.handleError(error))
    )
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
    .pipe(
      catchError(error => this.handleError(error))
    )
  }
}
