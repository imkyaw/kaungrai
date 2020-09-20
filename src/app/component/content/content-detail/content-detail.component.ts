import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { ContentService } from '../../../service/content.service'
import { Content, ContentList } from '../../../model/content'
import { ImageSnippet } from '../../../model/image-snippet'
import { EnumResponseStatus } from '../../../shared/app-helper'
import { ConfirmDialog } from '../../../dialog/confirm.dialog'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit {
  selectedFile: ImageSnippet;
  contentId: string
  content: ContentList
  editHide: boolean = false
  constructor(
    private router: Router,
    private contentService: ContentService,
    
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.contentId = params.get('id')
    })
    if (this.contentId !== null) {
      this.contentService.getContentbyId(this.contentId).subscribe(res=>{
        if (res.status === EnumResponseStatus.Success)
          this.content = res.payload
      })
    }
  }
  getImageUrl() {
    return "https://vkadmin.thantzin.pro/images/medium/"
  }
  toggleEditMode() {
    this.editHide = !this.editHide
  }
  deleteContent() {
    this.contentService.deleteContent(this.contentId).subscribe(res => {
      if (res.status === EnumResponseStatus.Accepted) {
        alert("successfully deleted")
      }
    })
  }
  deleteContentImg() {

  }
}
