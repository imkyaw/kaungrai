import { Component, OnInit } from '@angular/core';
import { Contact, ContactList } from '../../../model/contact'
import { ContactService } from '../../../service/contact.service'
import { EnumResponseStatus } from '../../../shared/app-helper'
import { Router } from '@angular/router'

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent implements OnInit {

  contact: ContactList
  constructor(
    private router: Router,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.contact = new ContactList()
    this.contact.title = ''
    this.contact.description = ''
  }
  submitContact() {
    this.contactService.createContact(this.contact.title, this.contact.description).subscribe(res => {
      if (res.status === EnumResponseStatus.Created) {
        alert("Contact is created.")
        this.router.navigate([`/contact`])
      } else {
        alert("Error when creating contact. Please try again later.")
      } 
    })
  }
}
