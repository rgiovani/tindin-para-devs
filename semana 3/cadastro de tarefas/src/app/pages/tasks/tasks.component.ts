import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks = []

  isChecked: boolean = false
  isOpen: boolean = false
  isEditing: boolean = false

  form: FormGroup

  cardCss = {}

  cardRadius = {}

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.loadCard()

    if (this.isEditing) {
      // this.taskService.getTask(this.id).subscribe((res) => {
      this.form = this.fb.group({
        description: ['', Validators.required]
      })
      //})
    }
    //ler todas as tasks e montar os cards
  }

  setDone(isDone: boolean) {
    this.isChecked = isDone
  }

  open(cardId: number) {
    this.isOpen = !this.isOpen
    this.loadCard()
  }

  loadCard() {
    this.cardCss = {
      'height': (this.isOpen) ? '118px' : '8px',
      'align-items': (this.isOpen) ? 'flex-start' : 'center'
    }

    this.cardRadius = {
      'borderRadius': (this.isOpen) ? '0.375rem' : '9999px'
    }
  }

  taskAction(action: string) {
    if (action === "edit") {
      this.isEditing = true
    } else {
      this.isEditing = false
    }
  }

  save() {
    this.isEditing = false
    console.log("Editando...")
  }

  remove(id: string) {
    console.log("Removendo...")
  }

}
