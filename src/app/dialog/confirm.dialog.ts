import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  styles: [``],
  template: `
    <h1 mat-dialog-title>
        {{title}}
    </h1>

    <div mat-dialog-content>
        <p>{{message}}</p>
    </div>

    <div mat-dialog-actions>
        <button mat-button (click)="onDismiss()">No</button>
        <button mat-raised-button class="edit-btn" (click)="onConfirm()">Yes</button>
    </div>
    `
})

export class ConfirmDialog {
  title: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

export class ConfirmDialogModel {
    constructor(public title: string, public message: string) {
    }
}
