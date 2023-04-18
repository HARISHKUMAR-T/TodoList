import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { CategoriesComponent } from './categories/categories.component';
import { ToastrModule } from 'ngx-toastr';
import { NewcategoryComponent } from './newcategory/newcategory.component';
import { NewtaskComponent } from './newtask/newtask.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { EdittaskComponent } from './edittask/edittask.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NotfoundComponent,
    ToolbarComponent,
    ForgetpasswordComponent,
    CategoriesComponent,
    NewcategoryComponent,
    NewtaskComponent,
    EditcategoryComponent,
    EdittaskComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
    MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:RequestInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
