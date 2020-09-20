import { Component, OnInit } from '@angular/core';
import { ImageSetService } from '../../../service/image-set.service'
import { ImgSet, ImgSetList } from '../../../model/image-set'
import { EnumResponseStatus } from '../../../shared/app-helper'
import { Router, ActivatedRoute } from '@angular/router'
import { MatTableDataSource } from '@angular/material/table'
 
@Component({
  selector: 'app-image-set-home',
  templateUrl: './image-set-home.component.html',
  styleUrls: ['./image-set-home.component.scss']
})
export class ImageSetHomeComponent implements OnInit {
  imageSet: ImgSetList[] = null
  displayedColumns: string[] = ['title', 'date', 'button']
  dataSource 
  constructor(
    private router: Router,
    private imageSetService: ImageSetService
  ) { }

  ngOnInit(): void {
    this.imageSetService.getImgSet().subscribe(res => {
      if (res.status == EnumResponseStatus.Success) {
        this.imageSet = res.payload  
        this.dataSource = new MatTableDataSource(this.imageSet)      
      }
    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  gotoDetail(id: string) {
    this.router.navigate([`/imageset/${id}`])
  }
  createImgSet() {
    this.router.navigate([`/imageset/create`])
  }
}
