import { Component, OnInit } from '@angular/core';
import { EnumResponseStatus } from '../../../shared/app-helper'
import { Language, LanguageList } from 'src/app/model/language';
import { ContentService } from '../../../service/content.service'
import { LanguageService } from '../../../service/language.service'
import { Content, ContentList } from '../../../model/content'
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.scss']
})
export class ContentCreateComponent implements OnInit {

  newContent: ContentList
  langList: LanguageList[] = null
  constructor(
    private contentService: ContentService,
    private languageService: LanguageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newContent = new ContentList()
    this.newContent.body = ''
    this.newContent.title = ''
    this.newContent.lang = ''
    this.languageService.getLanguage().subscribe(res => {
      if (res.status === 200) {
        this.langList = res.payload
      }
      this.langList = this.langList.filter(x => !x.deleted)
    })
  }
  updateLang(id: string) {
    this.newContent.lang = id
  }
  submitContent() {
    this.contentService.createConent(this.newContent.title, this.newContent.body, this.newContent.lang).subscribe(res => {
      if (res.status === EnumResponseStatus.Success) {
        alert("Successful created!")
        this.router.navigate([`/content/`])
      }
    })
  }
}
