import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageSetService extends BaseService{

  constructor(
    http: Http,
    httpClient: HttpClient,
  ) {
    super(http, httpClient)
  }

  getImgSet(): Observable<any> {
    const apiUrl = 'imgSet/'
    return super.getAPI(apiUrl, {})
  }

  createImageSet(title: string, lang: string): Observable<any> {
    const apiUrl = 'imgSet/'
    const body = { title: title, lang: lang }
    return super.postAPI(apiUrl, body)
  }

  uploadImage(id: string, image: File): Observable<any> {
    const apiUrl = 'imgSet/img/' + id
    const body = new FormData()
    console.log(image)
    body.append('image', image, image.name)
    return super.postImageAPI(apiUrl, body)
  }

  deleteImageSet(id: string): Observable<any> {
    const apiUrl = 'imgSet/' + id
    return super.deleteAPI(apiUrl)
  }

  deleteImage(id: string, img: string): Observable<any> {
    const apiUrl = 'imgSet/img/' + id 
    const body = { image: img }
    return super.deleteAPI2(apiUrl, body)
  }

  getImageSetById (id: string): Observable<any> {
    const apiUrl = 'imgSet/' + id
    return super.getAPI(apiUrl)
  }
}
