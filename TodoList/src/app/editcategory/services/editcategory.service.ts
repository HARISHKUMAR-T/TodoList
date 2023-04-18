import { Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditcategoryService {
  private editCategoryRefresh=new Subject<void>();
  // since private variable we can't access it outside of this class, hence getter function is used
  editCategory_Refresh(){
    return this.editCategoryRefresh;
  }
  constructor(
    private http:HttpClient
  ) { }

  //update the edited category to backend
  updateCategory(category:string,categoryId:String){
    return this.http.patch<any>(`/api/v1/categories/${categoryId}`,{category,_id:categoryId}).
    pipe(
      tap(
        ()=>{
          this.editCategoryRefresh.next(); //emits notification when a category is edited
        }
      )
    )
  }
}
