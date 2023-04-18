import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap ,pipe} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewtaskService {
  private createTaskRefresh=new Subject<void>();
  // since private variable we can't access it outside of this class, hence getter function is used
  createTask_Refresh(){
    return this.createTaskRefresh;
  }
  constructor(private http:HttpClient) { }
  createTask(task:string,categoryId:string){
    return this.http.post<any>(`/api/v1/categories/${categoryId}/tasks`,{task}).
      pipe(
        tap(
          ()=>{
            this.createTaskRefresh.next(); //emits notification when a task is created
          }
        )
      )
  }
}
