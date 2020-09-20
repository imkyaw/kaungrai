import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Response, Http, Headers } from '@angular/http'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private bHttpClient: HttpClient
  apiUrl: string = null
  private bHttp

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

  // logInUser(email: string, password: string): Promise<any> {
  //   const body = { email: email, password: password }
  //   const headerConfig = { headers: httpHeaders }
  //   return this.http.post(this.authUrl, body).toPromise().then(
  //     res => {
  //       if (res.status === 200) {
  //         const resBody = res.json()
  //         localStorage.setItem('access_token', resBody.payload.token)
  //       }
  //       return res
  //     })
  // }
}
