import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LanguageService } from '../../../service/language.service'
import { Router } from '@angular/router'
import { EnumResponseStatus } from '../../../shared/app-helper'
@Component({
  selector: 'app-language-create',
  templateUrl: './language-create.component.html',
  styleUrls: ['./language-create.component.scss']
})
export class LanguageCreateComponent implements OnInit {

  constructor(
    private router: Router,
    private languageService: LanguageService
  ) { }

  language: string = ''
  submitted: boolean = false

  ngOnInit(): void {
  }

  submitLanguage() {
    this.languageService.createLanguage(this.language).subscribe(res => {
      if (res.status === EnumResponseStatus.Created) {
        alert("language is created")
        this.router.navigate([`/language`])
      } else {
        console.log(res.message)
      } 
    })
  }
}
