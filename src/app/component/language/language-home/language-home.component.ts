import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../service/language.service'
import { Language, LanguageList } from 'src/app/model/language';
import { MatDialog } from '@angular/material/dialog'
import { ConfirmDialog } from '../../../dialog/confirm.dialog'
import { EnumResponseStatus } from '../../../shared/app-helper'
import { Router } from '@angular/router'

@Component({
  selector: 'app-language-home',
  templateUrl: './language-home.component.html',
  styleUrls: ['./language-home.component.scss']
})
export class LanguageHomeComponent implements OnInit {
  language: LanguageList[] = null
  displayedColumns: string[] = ['name', 'button'];
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private languageService: LanguageService,
  ) { }

  ngOnInit(): void {
    this.languageService.getLanguage().subscribe(res => {
      if (res.status === EnumResponseStatus.Success) {
        this.language = res.payload
      }
      this.language = this.language.filter(x => !x.deleted)
    })
  }
  deleteLang (id: string) {
    const title = "Delete confirm"
    const message = "Are you sure you want to delete the language?"
    this.dialog.open(ConfirmDialog, {
      maxWidth: "400px",
      data: {title: title, message: message}
    }).afterClosed().subscribe(res => {
      if (res) {
        this.languageService.deleteLanguage(id).subscribe(res => {
          if (res.status === EnumResponseStatus.Accepted) {
            alert("Language is Deleted")
            this.populateLanguage(id)
          }
        })
      }
    })
    
  }
  createLanguage() {
    this.router.navigate([`/language/create`])
  }
  populateLanguage(id: string) {
    this.language = this.language.filter(x => x._id !== id )
  }
}
