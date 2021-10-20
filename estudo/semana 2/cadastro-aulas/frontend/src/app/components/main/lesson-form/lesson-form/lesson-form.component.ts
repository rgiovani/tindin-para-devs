import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faArrowAltCircleLeft, faTrashAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { LessonsService } from './../../../../services/lessons.service';
import { MainComponent } from '../../main.component';

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.css']
})
export class LessonFormComponent implements OnInit {
  formLesson: FormGroup = new FormGroup({})
  isEditing: boolean = false
  isDelete: boolean = false
  objEdtting = { id: undefined }

  backToMainIcon = faArrowAltCircleLeft
  deleteLessonIcon = faTrashAlt
  confirmLessonIcon = faCheckCircle

  constructor(
    private readonly router: Router,
    private readonly lessonsService: LessonsService,
    private formBuilder: FormBuilder,
    private mainComponent: MainComponent
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    let title = ""
    let description = ""
    if (this.mainComponent.currentEditLesson !== undefined) {
      title = this.mainComponent.currentEditLesson.title
      description = this.mainComponent.currentEditLesson.description
      this.objEdtting = this.mainComponent.currentEditLesson.id
      this.isEditing = true
    }

    this.formLesson = this.formBuilder.group({
      title: [title],
      description: [description]
    })
  }

  onSubmit() {
    if (!this.isEditing) {
      this.createLesson(this.formLesson.value)
    } else {
      this.editLesson()
    }
  }

  createLesson(inputs: any) {
    this.lessonsService.createLesson(inputs).subscribe((data: any) => {
      this.mainComponent.isFormOpen = false;
      this.router.navigateByUrl('/main', { skipLocationChange: true }).then(() => {
        this.router.navigate(['login']);
      });
      this.isEditing = false
    }, (apiError: any) => {
      let message = ""
      if (apiError.error?.message) {
        message = apiError.error?.message
      }
      window.alert(message);
    })

    this.formLesson.reset()
  }

  cancel() {
    this.mainComponent.isFormOpen = false
    this.isEditing = false
    this.router.navigate([
      'main'
    ])
  }

  delete() {
    this.lessonsService.deleteLesson(this.objEdtting).subscribe((data: any) => {
      this.mainComponent.isFormOpen = false
      this.router.navigateByUrl('/main', { skipLocationChange: true }).then(() => {
        this.router.navigate(['login']);
      });
    }, (apiError: any) => {
      let message = ""
      if (apiError.error?.message) {
        message = apiError.error?.message
      }
      window.alert(message);
    })
  }

  editLesson() {
    this.lessonsService.editLesson(this.mainComponent.currentEditLesson, this.formLesson.value).subscribe((data: any) => {
      this.mainComponent.isFormOpen = false;
      this.router.navigateByUrl('/main', { skipLocationChange: true }).then(() => {
        this.router.navigate(['login']);
      });
      this.isEditing = false
    }, (apiError: any) => {
      let message = ""
      if (apiError.error?.message) {
        message = apiError.error?.message
      }
      window.alert(message);
    })
  }

}
