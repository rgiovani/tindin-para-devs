import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService } from './../../services/tasks/tasks.service';
import { AuthService } from '../../services/login/auth.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  loading = false
  isTaskFormVisible = false
  tasks: any[] = []
  form: FormGroup
  isLocal = true

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly taskService: TaskService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.loadCard()

    this.form = this.fb.group({
      name: ['', Validators.required]
    })

    this.initTasksStorage()
  }

  initTasksStorage() {
    if (this.isLocal) {
      let localStorageStr = localStorage.getItem('tasks');

      if (localStorageStr) {
        this.buildTasks(JSON.parse(localStorageStr))
      } else {
        this.isLocal = false
        this.initTasksStorage()
      }
    } else {
      this.taskService.listTasks().subscribe(this.buildTasks, (err: any) => { })
    }
  }

  buildTasks = (data: any[]) => {
    if (data.length > 0) {
      data.forEach((task: any, index: number) => {
        task.cardCss = {
          'height': '8px',
          'align-items': 'center'
        }

        task.cardRadius = {
          'borderRadius': '9999px'
        }

        task.isChecked = (!!task.isChecked) ? true : false
        task.isEditing = false
        task.isOpen = false

        this.tasks.push(task)

        if (this.isLocal) {
          this.taskService.editTask({
            id: task._id,
            name: task.name,
            isChecked: this.tasks[index].isChecked
          }).subscribe()
        }
      });

      if (!this.isLocal) {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    }
  }

  setDone(isDone: boolean, id: string) {
    this.tasks.find((item, index) => {
      if (item._id === id) {
        this.tasks[index].isChecked = isDone
      }
    })

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  open(cardId: string) {
    this.tasks.find(item => {
      if (item._id === cardId) {
        item.isOpen = !item.isOpen
      }
    })
    this.loadCard()
  }

  loadCard() {
    this.tasks.find(item => {
      item.cardCss = {
        'height': (item.isOpen) ? '118px' : '8px',
        'align-items': (item.isOpen) ? 'flex-start' : 'center'
      }

      item.cardRadius = {
        'borderRadius': (item.isOpen) ? '0.375rem' : '9999px'
      }
    })
  }

  taskAction(action: string, id: string) {
    this.tasks.find((item, index) => {
      if (item._id === id) {
        if (action === "edit") {
          this.form.setValue({
            name: item.name
          })
          this.tasks[index].isEditing = true
        } else {
          this.tasks[index].isEditing = false
        }
      }
    })

  }

  toggleTaskForm() {
    this.isTaskFormVisible = !this.isTaskFormVisible
    window.scrollTo(0, 0);
    this.form.reset()
  }

  logout() {
    this.isTaskFormVisible = false
    this.loading = true
    this.tasks.forEach((task: any, index: number) => {
      this.taskService.editTask({
        id: task._id,
        name: task.name,
        isChecked: this.tasks[index].isChecked
      }).subscribe(res => {
        this.loading = false
      })

    })

    localStorage.removeItem('tasks')
    this.authService.logout()
    this.router.navigate(['/auth'])
  }

  create() {
    if (this.form.value) {
      const { name } = this.form.value
      this.loading = true

      this.taskService.createTask({ name: name }).subscribe(res => {
        const task = {
          _id: res.taskId,
          user: res.userId,
          name: name,
          cardCss: {
            'height': '8px',
            'align-items': 'center'
          },
          cardRadius: {
            'borderRadius': '9999px'
          },
          isChecked: false,
          isEditing: false
        }
        this.tasks.push(task)

        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.toggleTaskForm()
        this.loadCard()
        this.form.reset()

        this.loading = false
      })
    }
  }

  update(id: string) {
    const { name } = this.form.getRawValue()
    this.loading = true
    this.taskService.editTask({ id: id, name: name }).subscribe(res => {
      this.tasks.find((item, index) => {
        if (item._id === id) {
          this.tasks[index].isOpen = false
          this.tasks[index].isEditing = false
          this.tasks[index].name = name
        }
      })
      this.loadCard()
      this.form.reset()
      this.loading = false
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    })
  }

  remove(id: string) {
    let taskPosition: number
    this.loading = true
    this.taskService.removeTask(id).subscribe(res => {
      this.tasks.find((item, index) => {
        taskPosition = (item._id === id) ? index : taskPosition
      })
      this.tasks.splice(taskPosition, 1)

      this.loadCard()
      this.form.reset()

      this.loading = false
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    })
  }

}
