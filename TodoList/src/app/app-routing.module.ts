import { CategoriesComponent } from './categories/categories.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent},
  //dynamic routes
  {path:'categories/:categoryId/tasks',component:CategoriesComponent},
  {path:'categories',component:CategoriesComponent},

  //default route
  {path:'',redirectTo:'/signup',pathMatch:'full'},
  //wildcard route
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
