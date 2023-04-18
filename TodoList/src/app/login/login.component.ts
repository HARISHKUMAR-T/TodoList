import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService) {}
  email: string = '';
  password: string = '';
  // errorFlag:boolean=false;
  // errorMessage:string='';

  ngOnInit() {}
  submitLogin(loginForm:NgForm) {
    if(!loginForm.valid){
      this.toastr.warning("Enter all credentials properly!",'',{progressBar:true})
      return
    }
    const loginBody = { email: this.email, password: this.password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<any>('/api/v1/auth/login', loginBody, {
        headers,
        observe: 'response',
      })
      .subscribe(
        (res)=>{
          if(res.status===200){
            const {token}=res.body
            localStorage.setItem('token',token);
            console.log(res.body);
            this.toastr.success("Login successful",'',{progressBar:true})
            this.router.navigateByUrl('/categories');
          }
        },
        (err)=>{
          this.toastr.error(err.error.msg,'',{progressBar:true})
          // this.errorFlag = true;
          // this.errorMessage = err.error.msg;
        }
      )
    //     .pipe(
    //       catchError(error=>{
    //         console.log(error.st);

    //         if(error.status!==200){
    //           return of(error.error)
    //         }
    //         else{
    //           throw error
    //         }
    //       })
    //     )
    //     .subscribe((res) => {
    //       if(res.status===200){
            // const {token}=res.body
            // localStorage.setItem('token',token);
            // console.log(res.body);
            // this.router.navigateByUrl('/categories');
    //       }
    //     },
    //     (error)=>{
    //       console.log(error.error.msg);
    //       this.errorFlag=true;
    //       this.errorMessage=error.error.msg;
    //     });
    // }
    // else{
    //   console.log(1231231123123123);
    //   this.errorFlag=true;
    //   this.errorMessage='Enter all credentials';
  }
}
