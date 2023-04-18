import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap,shareReplay} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private deleteCategoryRefresh=new Subject<void>();
  deleteCategory_Refresh(){
    return this.deleteCategoryRefresh;
  }
  constructor(private http:HttpClient) { }
  //get all categories
  getCategories(){
    return this.http.get<any>('/api/v1/categories') //error occurs if forwardslash is missed infront of api

  }
  //get all tasks
  getTasks(categoryId:string){
    return this.http.get<any>(`/api/v1/categories/${categoryId}/tasks`)
  }
  //update completed status of task
  updateTask(categoryId:string,taskId:string,completed:boolean){
    return this.http.patch<any>(`/api/v1/categories/${categoryId}/tasks/${taskId}`,{completed})
      // very important
      //actually we don't need to notify and trigger get request on all tasks
      // pipe(
      //   tap(
      //     ()=>{
      //       this.deleteCategoryRefresh.next();
      //     }
      //   )
      // )
  }

  //delete category
  deleteCategory(categoryId:string){
    return this.http.delete<any>(`/api/v1/categories/${categoryId}`)
  }

  //delete Task
  deleteTask(taskId:string,categoryId:string){
    return this.http.delete<any>(`/api/v1/categories/${categoryId}/tasks/${taskId}`)
  }
}
