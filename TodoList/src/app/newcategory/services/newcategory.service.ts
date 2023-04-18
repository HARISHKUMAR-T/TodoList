import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewcategoryService {
  private createCategoryRefresh=new Subject<void>();
  createCategory_Refresh(){
    return this.createCategoryRefresh;
  }
  //if this is used in our logic paranthesis is not required in function call
  //like this.createCategory_Refresh.next() is enough
  // get createCategory_Refresh(){
  //   return this.createCategoryRefresh;
  // }
  constructor(private http:HttpClient) { }
  createCategory(category:string){
    return this.http.post<any>('/api/v1/categories',{category}).
      pipe(
        tap(
          ()=>{
            this.createCategory_Refresh().next();
          }
        ))
  }
}
