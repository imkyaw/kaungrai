import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { ImageSetService } from '../../../service/image-set.service'
import { ImgSet, ImgSetList } from '../../../model/image-set'
import { ImageSnippet } from '../../../model/image-snippet'
import { EnumResponseStatus } from '../../../shared/app-helper'
import { ConfirmDialog } from '../../../dialog/confirm.dialog'
import { MatDialog } from '@angular/material/dialog'

// class ImageSnippet {
//   pending: boolean = false;
//   status: string = 'init';

//   constructor(public src: string, public file: File) {}
// }

@Component({
  selector: 'app-image-set-detail',
  templateUrl: './image-set-detail.component.html',
  styleUrls: ['./image-set-detail.component.scss']
})
export class ImageSetDetailComponent implements OnInit {
  selectedFile: ImageSnippet;
  imgSetId: string
  imageSet: ImgSetList
  editHide: boolean = false
  constructor(
    private router: Router,
    private imageService: ImageSetService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) { }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.imgSetId = params.get('id')
    })
    if (this.imgSetId !== null) {
      this.imageService.getImageSetById(this.imgSetId).subscribe(res=>{
        if (res.status === EnumResponseStatus.Success)
          this.imageSet = res.payload
      })
    }
  }
  getImageUrl() {
    return "https://vkadmin.thantzin.pro/images/medium/"
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
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.imageService.uploadImage(this.imgSetId, this.selectedFile.file).subscribe(res => {
        this.onSuccess();
      }, (err) => {
        this.onError();
      })
    });

    reader.readAsDataURL(file);
  }
  toggleEditMode() {
    this.editHide = !this.editHide
  }
  deleteImgSet() {
    const title = "Delete confirm"
    const message = "Are you sure you want to delete the image content? By clicking Yes you will lost the images."
    this.dialog.open(ConfirmDialog, {
      maxWidth: "400px",
      data: {title: title, message: message}
    }).afterClosed().subscribe(res => {
      if (res) {
        this.imageService.deleteImageSet(this.imgSetId).subscribe(result => {
          if (result.status === EnumResponseStatus.Accepted) {
            alert("The image set is deleted")
            this.router.navigate([`/imageset/`])
          }
        })
      }
    })
  }
  deleteImage(img: string) {
    const title = "Delete confirm"
    const message = "Are you sure you want to delete the image?"
    this.dialog.open(ConfirmDialog, {
      maxWidth: "400px",
      data: {title: title, message: message}
    }).afterClosed().subscribe(res => {
      if (res) {
        this.imageService.deleteImage(this.imgSetId, img).subscribe(result => {
          if (result.status === EnumResponseStatus.Accepted) {
            alert("The image is deleted")
            this.populateImage(img)
          }
        })
      }
    })
  }
  populateImage(img: string) {
    this.imageSet.images = this.imageSet.images.filter(x => x !== img)
  }
  
}
