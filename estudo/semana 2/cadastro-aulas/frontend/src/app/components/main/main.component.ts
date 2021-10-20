import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LessonsService } from './../../services/lessons.service';
import { UsersService } from './../../services/users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  lessons: any[] = []

  lessonsLength: number = 0
  constructor(
    private readonly router: Router,
    private readonly usersService: UsersService,
    private readonly lessonsService: LessonsService,
  ) { }

  ngOnInit(): void {
    this.listLessons()
    this.lessonsLength = this.lessons.length
  }

  //Essa regra de negócio deve estar dentro do forms de criação de aulas
  createLesson(lesson: any) {
    this.lessonsService.createLesson(lesson).subscribe((data: any) => {
      console.log(data)
    }, (apiError: any) => {
      let message = ""
      if (apiError.error?.message) {
        message = apiError.error?.message
      }
      window.alert(message);
    })
  }

  listLessons() {
    this.lessonsLength = this.lessons.length
    this.lessonsService.getAllLessons().subscribe((data: any) => {
      if (data.length > 0) {
        data.forEach((lesson: any) => {
          this.lessons.push(lesson)
        });
      }
    }, (apiError: any) => {
    })
  }

  logout(): any {
    this.usersService.logout().subscribe((data: any) => {
      if (!!data.success) {
        this.usersService.setCurrentUserInfo(null)
        localStorage.clear();
        this.router.navigate([
          'login'
        ])
      }
    }, (apiError: any) => {
      console.log(apiError)
    })

    this.router.navigate([
      'login'
    ])
  }

}
