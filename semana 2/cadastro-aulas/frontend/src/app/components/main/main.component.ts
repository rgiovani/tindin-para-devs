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
  isFormOpen: boolean = false
  currentEditLesson: any

  constructor(
    private readonly router: Router,
    private readonly usersService: UsersService,
    private readonly lessonsService: LessonsService,
  ) { }

  ngOnInit(): void {
    this.lessonsLength = this.lessons.length
    this.lessons = []
    this.listLessons()
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

  edit(lesson: any) {
    this.currentEditLesson = lesson
    this.isFormOpen = true
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

  openForm() {
    this.currentEditLesson = undefined
    this.isFormOpen = true
  }

}
