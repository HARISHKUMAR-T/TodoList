import { NewcategoryService } from './services/newcategory.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-newcategory',
  templateUrl: './newcategory.component.html',
  styleUrls: ['./newcategory.component.scss']
})
export class NewcategoryComponent {
  newCategory:string='';
  newCategoryId:string="";
  data:any;
  constructor(
    private dialogRef:MatDialogRef<NewcategoryComponent>,
    private router:Router,
    private newcategoryService:NewcategoryService,
  ){}
  //cancel the category
  cancel(){
    //closing the modal
    this.dialogRef.close();
    // this.router.navigate(['/categories'])
  }
  //creating new category
  createCategory(){
    //post request to backend to create a category
    this.newcategoryService.createCategory(this.newCategory).subscribe(
      (res:any)=>{
        const {_id,category}=res.category;
        this.data=res.category;
        console.log(res);
        this.newCategoryId=_id;
        console.log(this.newCategoryId);
        // navigate
        console.log(this.newCategoryId);
        // this.router.navigateByUrl(`/categories/${this.newCategoryId}/tasks`)
        // this.router.navigate(['/categories',this.newCategoryId,'tasks'])

        //send data to parent component that is received from backend
          this.dialogRef.close({data:res.category});
      }
    )

    //closing the modal
    // this.dialogRef.close({data:this.data});
  }
}
