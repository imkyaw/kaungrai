import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { ImageSetService } from '../../../service/image-set.service'
import { LanguageService } from '../../../service/language.service'
import { ImgSet, ImgSetList } from '../../../model/image-set'
import { EnumResponseStatus } from '../../../shared/app-helper'
import { Language, LanguageList } from 'src/app/model/language'

@Component({
  selector: 'app-image-set-create',
  templateUrl: './image-set-create.component.html',
  styleUrls: ['./image-set-create.component.scss']
})
export class ImageSetCreateComponent implements OnInit {

  imageSet: ImgSetList
  langList: LanguageList[] = null
  constructor(
    private imageSetService: ImageSetService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.imageSet = new ImgSetList()
    this.imageSet.title = ''
    this.imageSet.lang = ''
    this.languageService.getLanguage().subscribe(res => {
      if (res.status === 200) {
        this.langList = res.payload
      }
      this.langList = this.langList.filter(x => !x.deleted)
    })
  }
  updateLang(id: string) {
    this.imageSet.lang = id
  }
  imageSetCreate() {
    if (this.imageSet.lang !== '' && this.imageSet.title !== '') {
      this.imageSetService.createImageSet(this.imageSet.title, this.imageSet.lang).subscribe(res => {
        if (res.status === EnumResponseStatus.Created) {
          alert("Image set is successfully created")
        }
      })
    }
  }
}
