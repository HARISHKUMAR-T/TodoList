import { Subject, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EdittaskService {
  private editTaskRefresh=new Subject<void>();
  editTask_Refresh(){
    return this.editTaskRefresh;
  }
  constructor(
    private http:HttpClient
  ) { }
  updateTask(taskId:string,categoryId:string,task:string){
    return this.http.patch<any>(`/api/v1/categories/${categoryId}/tasks/${taskId}`,{task}).
      pipe(
        tap(
          (data)=>{
            this.editTaskRefresh.next();
          }
        )
      )
  }
}
