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
  getOriginalImageUrl() {
    return "https://vkadmin.thantzin.pro/images/original/"
  }
  toggleEditMode() {
    this.editHide = !this.editHide
  }
  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }
  processFile(event) {
    const file: File = event.target.files[0]
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.contentService.uploadImage(this.contentId, file).subscribe(res => {
        this.onSuccess();
      }, (err) => {
        this.onError();
      })
    });

    reader.readAsDataURL(file);
  }
  deleteContent() {
    const title = "Delete confirm"
    const message = "Are you sure you want to delete the post? By clicking Yes you will lost the images."
    this.dialog.open(ConfirmDialog, {
      maxWidth: "400px",
      data: {title: title, message: message}
    }).afterClosed().subscribe(res => {
      if (res) {
        this.contentService.deleteContent(this.contentId).subscribe(res => {
          if (res.status === EnumResponseStatus.Accepted) {
            alert("successfully deleted")
            this.router.navigate([`/content`])
          }
        })
      }
    })
  }
  deleteContentImg(img: string) {
    const title = "Delete confirm"
    const message = "Are you sure you want to delete the image?"
    this.dialog.open(ConfirmDialog, {
      maxWidth: "400px",
      data: {title: title, message: message}
    }).afterClosed().subscribe(res => {
      if (res) {
        this.contentService.deleteContentImage(this.contentId, img).subscribe(result => {
          if (result.status === EnumResponseStatus.Accepted) {
            alert("The image is deleted")
            this.populateImage(img)
          }
        })
      }
    })
  }
  populateImage(img: string) {
    this.content.images = this.content.images.filter(x => x !== img)
  }
}
