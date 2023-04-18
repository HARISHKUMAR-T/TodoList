import { NewtaskService } from './services/newtask.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.scss']
})
export class NewtaskComponent{
  constructor(
    private matDialogRef:MatDialogRef<NewtaskComponent>,
    private router:Router,
    private newtaskService:NewtaskService,
    private dialogRef:MatDialogRef<NewtaskComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any //inorder to get categoryId from parent component
    ){
      console.log(data);

    }
  newTask:string='';
  //exit modal
  cancel(){
    this.matDialogRef.close();
  }
  //addd task to backend and navigate to parent
  createTask(){
    //add data to backend
    this.newtaskService.createTask(this.newTask,this.data.selectedCategoryId).subscribe(
      (res)=>{
        console.log(res);
        //navigation to parent
        // this.router.navigateByUrl(`/categories/${this.data.selectedCategoryId}/tasks`);
      }
    )

    //close modal
    this.dialogRef.close();
  }
}
