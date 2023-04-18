import { EdittaskService } from './services/edittask.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.scss']
})
export class EdittaskComponent {
  editedTask:string='';
  constructor(
    private dialogRef:MatDialogRef<EdittaskComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any,
    private edittaskService:EdittaskService
  ){}
  cancel(){
    this.dialogRef.close();
  }
  editTask(){
    this.edittaskService.updateTask(this.data.selectedTaskId,this.data.selectedCategoryId,this.editedTask).subscribe(
      (res)=>{
        console.log(res);
      }
    )
    //close modal
    this.dialogRef.close();
  }
}
