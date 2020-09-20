import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Response, Http, Headers } from '@angular/http'
import { Observable } from 'rxjs';
import { BaseService } from './base.service'

const httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  authUrl: string = null
  constructor(
    private httpClient: HttpClient
  ) { 
    this.authUrl = environment.apiAuthUrl
  }

  

  loginUser(email: string, password: string): Observable<any> {
    const body = { email: email, password: password }
    const headerConfig = { headers: httpHeaders }
    return this.httpClient.post(this.authUrl, body, headerConfig)
  }
}
