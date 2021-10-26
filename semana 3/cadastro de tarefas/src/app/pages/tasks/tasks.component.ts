import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks = [
    {
      id: 0,
      name: 'Fazer a API',
      isOpen: false,
      cardCss: {
        'height': '8px',
        'align-items': 'center'
      },
      cardRadius: {
        'borderRadius': '9999px'
      },
      isChecked: false,
      isEditing: false,
    },
    {
      id: 1,
      name: 'Integrar a api com o front',
      isOpen: false,
      cardCss: {
        'height': '8px',
        'align-items': 'center'
      },
      cardRadius: {
        'borderRadius': '9999px'
      },
      isChecked: false,
      isEditing: false,
    },
    {
      id: 2,
      name: 'Criar um menu na esquerda',
      isOpen: false,
      cardCss: {
        'height': '8px',
        'align-items': 'center'
      },
      cardRadius: {
        'borderRadius': '9999px'
      },
      isChecked: false,
      isEditing: false,
    }
  ]

  form: FormGroup

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.loadCard()
    this.tasks.find(item => {
      if (item.isEditing) {
        // this.taskService.getTask(this.id).subscribe((res) => {
        this.form = this.fb.group({
          name: ['', Validators.required]
        })
        //})
      }
    })

    //ler todas as tasks e montar os cards
  }

  setDone(isDone: boolean, id: number) {
    this.tasks[id].isChecked = isDone
  }

  open(cardId: number) {
    this.tasks.find(item => {
      if (item.id === cardId) {
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

  taskAction(action: string, id: number) {
    if (action === "edit") {
      this.tasks[id].isEditing = true
    } else {
      this.tasks[id].isEditing = false
    }
  }

  save(id: number) {
    this.tasks[id].isEditing = false
    console.log("Salvando...")
  }

  remove(id: number) {
    console.log("Removendo...")
  }

}
