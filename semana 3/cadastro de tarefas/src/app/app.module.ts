import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { HttpModule } from '@angular/http';

import { HttpInterceptorDefault } from './services/login/http-interceptors/http-interceptor';

import { AppRoutingModule } from './app-routing.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from '@angular/material/snack-bar';
//import { MatSliderModule } from '@angular/material/slider';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { NotesCreateEditComponent } from './pages/notes-create-edit/notes-create-edit.component';
import { TasksComponent } from './pages/tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    NotesCreateEditComponent,
    LoginComponent,
    TasksComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorDefault,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
