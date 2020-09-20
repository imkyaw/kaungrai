import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../service/content.service'
import { Content, ContentList } from '../../../model/content'
import { EnumResponseStatus } from '../../../shared/app-helper'
import { Router, ActivatedRoute } from '@angular/router'
import { LanguageService } from '../../../service/language.service'
import { MatTableDataSource } from '@angular/material/table'
 
@Component({
  selector: 'app-content-home',
  templateUrl: './content-home.component.html',
  styleUrls: ['./content-home.component.scss']
})
export class ContentHomeComponent implements OnInit {
  contentList: ContentList[] = null
  displayedColumns: string[] = ['title', 'language', 'date', 'button']
  dataSource
  constructor(
    private languageService: LanguageService,
    private contentService: ContentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.contentService.getContent().subscribe(res => {
      if (res.status === EnumResponseStatus.Success) {
        this.contentList = res.payload
        this.dataSource = new MatTableDataSource(this.contentList) 
        // this.contentList = this.contentList.filter(x => x.lang = )
      }
    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  // getLanguage(id: string) {
  //   this.languageService.getLanguageById(id).subscribe(res => {

  //   })
  // }
  gotoDetail(id: string) {
    this.router.navigate([`/content/${id}`])
  }
  deleteContent(id: string) {
    this.contentService.deleteContent(id).subscribe(res => {
      if (res.status === EnumResponseStatus.Accepted) {
        alert("successfully deleted")
      }
    })
  }
  createContent() {
    this.router.navigate([`/content/create`])
  }
}
