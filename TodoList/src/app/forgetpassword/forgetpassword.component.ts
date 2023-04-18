import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {
  constructor(
    private http:HttpClient,
    private router:Router,
    private toastr:ToastrService){}
  email:string='';
  password:string='';
  // errorFlag:boolean=false;
  // errorMessage:string=`No such user.Enter correct email`
  submitChangePassword(changePasswordForm:NgForm){
    if(changePasswordForm.invalid){
      this.toastr.warning('Enter all credentials properly','',{progressBar:true})
      return;
    }
    const body={email:this.email,password:this.password};
    const headers=new HttpHeaders({ 'Content-Type': 'application/json' })
    this.http.patch('api/v1/auth/forgetpassword',body,{headers,observe:'response'})
    .subscribe(
      (res)=>{
        if(res.status===200){
          console.log("password changed successfully");
          this.toastr.success("password changed successfully",'',{progressBar:true})
          this.router.navigateByUrl('/login');
        }
      },
      (err)=>{
        this.toastr.error(err.error.msg,'',{progressBar:true})
        // this.errorFlag = true;
        // this.errorMessage = err.error.msg;
      }
    )
    // .pipe(
    //   catchError(error=>{
    //     if(error.status!==200){
    //       return of(error.error)
    //     }
    //     else{
    //       throw error
    //     }
    //   })
    // )
    // .subscribe((res)=>{
    //   if(res.status===200){
        // console.log("password changed successfully");

        // this.router.navigateByUrl('/login');
    //   }

    // },(err)=>{
    //   console.log(err.error);
    //   this.errorFlag=true;
    //   this.errorMessage=err.error.msg;
    // })
  }
}
