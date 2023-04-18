import { EditcategoryService } from './services/editcategory.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.scss']
})
export class EditcategoryComponent {
  editedCategory:string='';
  constructor(
    private dialogRef:MatDialogRef<EditcategoryComponent>,
    private editcategoryService:EditcategoryService,
    @Inject(MAT_DIALOG_DATA) private data:any, //inorder to get categoryId from parent component
    private router:Router
    ){}
  cancel(){
    this.dialogRef.close();
  }
  editCategory(){
    this.editcategoryService.updateCategory(this.editedCategory,this.data.selectedCategoryId).subscribe(
      (res)=>{
        console.log(res);
        //navigate to parent
        //optional
        // this.router.navigateByUrl(`/categories/${this.data.selectedCategoryId}/tasks`);
      }
    )
    //close modal
    this.dialogRef.close();
  }
}
