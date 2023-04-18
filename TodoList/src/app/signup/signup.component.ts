import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  //form values
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorSignup: boolean = false;
  // errorMessage="Password does not match";

  constructor(
    private router: Router,
     private http: HttpClient,
     private toastr:ToastrService
     ) {}

  submitSignup(signupForm: NgForm) {
    //when fields are missing, warning is displayed to the user
    if(!signupForm.valid){
      this.toastr.warning("Enter all credentials properly!",'',{progressBar:true})
      return
    }

    //destructure
    const { username, password, email } = signupForm.value;
    const data = { username, password, email };

    // console.log(1111);

    //signupForm contains all values in the form object but all the form properties must be two way data binded to the variables in ts file
    // console.log(signupForm.value);
    // console.log(998);

    //checking password and confirmPassword
    if (this.password !== this.confirmPassword) {
      this.toastr.error("Password does not match",'',{progressBar:true});
      // this.errorSignup = true;
    } else {
      // this.errorSignup = false;
    }
    // console.log(signupForm.valid);
    //inorder to read the statusCode that is set in backend
    // as res.status(), we need to provide options that is
    // {headers,observe:'response'}-->this returns full http response
    //including statusCode set in backend
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //successful signUp
    if (signupForm.valid && !this.errorSignup) {
      this.http
        .post('/api/v1/auth/signup', data, { headers, observe: 'response' })
        .subscribe(
          (res)=>{
            if(res.status===200){
              this.toastr.success("Signup successful",'',{progressBar:true});
              this.router.navigateByUrl('/login');
            }
          },
          (err)=>{
            this.toastr.error(err.error.msg,'',{progressBar:true});
            // this.errorSignup = true;
            // this.errorMessage = err.error.msg;
          }
        )
      // //send signup details to backend
      // this.http
      //   .post('/api/v1/auth/signup', data, { headers, observe: 'response' })
      //   //since 400 statusCode is set in backend we need to handle that error in frontend
      //   //using catchError
      //   .pipe(
      //     catchError((err)=>{
      //         console.log(err.status);
      //         console.log(err.error);
      //         if(err.status!==200){
      //           return of(err.error); //error object to observable
      //         }else{
      //           throw err
      //         }
      //     })
      //   )
      //   .subscribe((res) => {
      //     if (res.status === 200) {
      //       this.router.navigateByUrl('/login');
      //       // signupForm.reset();
      //     }else if (res.status === 400) {
      //       this.errorSignup = true;
      //       this.errorMessage = res.error.msg;

      //     }
      //   },
      //   (err)=>{
      //     console.log(err.error.msg);
      //     this.errorSignup=true;
      //     this.errorMessage=err.error.msg;
      //   });
    }
  }
  ngOnInit(): void {
  }
}
