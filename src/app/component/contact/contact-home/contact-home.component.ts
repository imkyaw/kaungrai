import { Component, OnInit } from '@angular/core'
import { ContactService } from '../../../service/contact.service'
import { Contact, ContactList } from '../../../model/contact'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmDialog } from '../../../dialog/confirm.dialog'
import { EnumResponseStatus } from '../../../shared/app-helper'
import { Router } from '@angular/router'

@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.scss']
})

export class ContactHomeComponent implements OnInit {
  contact: ContactList[] = null
  displayedColumns: string[] = ['name', 'description', 'date', 'button'];
  constructor(
    private router: Router,
    private contactService: ContactService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.contactService.getContact().subscribe(res => {
      if (res.status === 200) {
        this.contact = res.payload
      }
    })
  }

  deleteContact (id: string) {
    const title = "Delete confirm"
    const message = "Are you sure you want to delete the contact?"
    this.dialog.open(ConfirmDialog, {
      maxWidth: "400px",
      data: {title: title, message: message}
    }).afterClosed().subscribe(res => {
      if (res) {
        this.contactService.deleteContact(id).subscribe(res => {
          if(res.status === EnumResponseStatus.Accepted) {
            alert("Deleted")
            this.populateContact(id)
          }
        })
      }
    })
    
  }

  populateContact(id: string) {
    this.contact = this.contact.filter(x => x._id !== id )
  }
  
  createContact() {
    this.router.navigate([`/contact/create`])
  }
}
