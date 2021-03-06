import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { LoginPageComponent } from './components/login/login-page.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';

import { UsersService } from './services/users.service';
import { LessonsService } from './services/lessons.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LessonFormComponent } from './components/main/lesson-form/lesson-form/lesson-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    LoginPageComponent,
    MainComponent,
    LessonFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    UsersService,
    LessonsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
