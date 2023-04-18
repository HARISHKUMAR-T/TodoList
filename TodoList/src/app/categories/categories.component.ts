import { EdittaskService } from './../edittask/services/edittask.service';
import { EditcategoryService } from './../editcategory/services/editcategory.service';
import { NewtaskService } from './../newtask/services/newtask.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoriesService } from './services/categories.service';
import { Component,OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewcategoryComponent } from '../newcategory/newcategory.component';
import { NewtaskComponent } from '../newtask/newtask.component';
import { NewcategoryService } from '../newcategory/services/newcategory.service';
import { EditcategoryComponent } from '../editcategory/editcategory.component';
import { EdittaskComponent } from '../edittask/edittask.component';
import { shareReplay } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  categories!:any;
  tasks!:any;
  selectedCategoryId:string='';
  // deleteFlag=true; //bad practice
  constructor(
    private categoriesService:CategoriesService,
    private router:ActivatedRoute,
    private route:Router,
    private dialogRef:MatDialog,
    private newcategoryService:NewcategoryService,
    private newtaskService:NewtaskService,
    private editcategoryService:EditcategoryService,
    private edittaskService:EdittaskService,
    private toastr:ToastrService
    ){
      // console.log(this.deleteFlag);

    }
  ngOnInit(): void {
    console.log("categories called");
    //get all categories
    this.getAllCategories();
    //get all categories during adding a category
    this.newcategoryService.createCategory_Refresh().subscribe(
      (data)=>{
        this.getAllCategories();
      }
    )
    //get all categories during updating a category
    this.editcategoryService.editCategory_Refresh().subscribe(
      (data)=>{
        this.getAllCategories();
      }
    )
    //get all tasks in a particular category
    this.getAllTasks();
    // get all tasks in a particular category during adding a task
    this.newtaskService.createTask_Refresh().subscribe(
      (data)=>{
        console.log("yyyyyyyyyyyyyyyyyyyyyyyy");

        this.getAllTasks();
      }
    )
    //get all tasks in a particular category after updating a task
    this.edittaskService.editTask_Refresh().subscribe(
      (data)=>{
        this.getAllTasks();
      }
    )
  }
  //get all categories from backend function to be used in ngOnit
  getAllCategories(){
    // this.deleteFlag=!this.deleteFlag;
    console.log("get all categories called");

    this.categoriesService.getCategories().subscribe(
      (res)=>{
        const {categories}=res;
        this.categories=categories
        console.log(this.categories);
      // // subscribe to the newCategoryAdded$ observable to get the newly created category
      // this.createcategorysharedserviceService.newCategoryAdded$
      // .subscribe((category: string) => {
      //   console.log(category);
      //   this.categories=[...this.categories,category]
      //   // this.categories.push(category)
      //   console.log(this.categories);
      // });
      // // this.categories=[...this.categories,this.createcategorysharedserviceService.newCategoryAdded$]
      }
    )
  }
  //get all tasks in a particular category
  getAllTasks(){
    this.router.params.subscribe(
      (param:Params)=>{
        //deleteFLag is wrong practice
        //inorder to appear select a category we are doing this
        // if(this.deleteFlag && param['categoryId'])
        if(param['categoryId']){
          const {categoryId}=param;
          // Set categordId for tasks routes as we need :categoryId
          this.selectedCategoryId=categoryId;

          this.categoriesService.getTasks(param['categoryId']).subscribe(
            (res)=>{
              const {tasks}=res;
              this.tasks=tasks
              // // subscribe to the newTaskAdded$ observable to get the newly created task
              // this.createtasksharedserviceService.newTaskAdded$
              // .subscribe((task: string) => {
              //   console.log(task);
              //   this.tasks=[...this.tasks,task]
              //   // this.tasks.push(task)
              //   console.log(this.tasks);
              // });
            }
          )
        }
        else{
          this.tasks=undefined;
          console.log(this.tasks);
          // this.deleteFlag=!this.deleteFlag; //wrong practice
        }
      }
    )
  }
  //new Category addition
  openDialog(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width='700px';
    dialogConfig.height='200px';
    dialogConfig.disableClose = true;// prevent closing the dialog by clicking outside of it
    // this.dialogRef.open(NewcategoryComponent,dialogConfig)
    this.dialogRef.open(NewcategoryComponent)
  }
  createTask(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width='700px';
    dialogConfig.height='200px';
    dialogConfig.disableClose = true;// prevent closing the dialog by clicking outside of it
    // this.dialogRef.open(NewcategoryComponent,dialogConfig)
    const createModal=this.dialogRef.open(NewtaskComponent,{
      data:{selectedCategoryId:this.selectedCategoryId}
    })
    // createModal.afterClosed().subscribe(
    //   (result)=>{
    //     console.log("closed");

    //     console.log(result);

    //   }
    // )
  }
  //completed status sending to backend
  check(taskId:string,status:boolean){
    this.categoriesService.updateTask(this.selectedCategoryId,taskId,!status).subscribe(
      (res:any)=>{
        console.log(res);
      }
    )
  }

  //delete category
  deleteCategory(){
    this.categoriesService.deleteCategory(this.selectedCategoryId).subscribe(
      (res)=>{
        this.categories=this.categories.filter((e:any)=>e._id!==this.selectedCategoryId)
        this.tasks=undefined
      }
    )
  }

  //edit category
  editCategory(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width='700px';
    dialogConfig.height='200px';
    dialogConfig.disableClose = true;// prevent closing the dialog by clicking outside of it
    // this.dialogRef.open(NewcategoryComponent,dialogConfig)
    const createModal=this.dialogRef.open(EditcategoryComponent,{
      data:{selectedCategoryId:this.selectedCategoryId}
    })
  }
  //delete Task
  deleteTask(taskId:string){
    this.categoriesService.deleteTask(taskId,this.selectedCategoryId).subscribe(
      (res:any)=>{
        this.tasks=this.tasks.filter((e:any)=>e._id!==taskId)
      }
    )
  }

  //update Task
  updateTask(taskId:string){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width='700px';
    dialogConfig.height='200px';
    dialogConfig.disableClose = true;// prevent closing the dialog by clicking outside of it
    // this.dialogRef.open(NewcategoryComponent,dialogConfig)
    const createModal=this.dialogRef.open(EdittaskComponent,{
      data:{selectedCategoryId:this.selectedCategoryId,selectedTaskId:taskId}
    })
  }

  //logout
  logout(){
    localStorage.removeItem('token');
    this.toastr.success("Logged out successfully",'',{progressBar:true})
    this.route.navigateByUrl('/login');
  }
}
