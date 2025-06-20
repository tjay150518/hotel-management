import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ConfirmDialogComponent>){
  }

  ngOnInit(): void {
    console.log(this.data.from)
  }
  confirmDelete(){
    this.dialogRef.close(true);
  }

  cancelDelete(){
    this.dialogRef.close(false);
  }

}
