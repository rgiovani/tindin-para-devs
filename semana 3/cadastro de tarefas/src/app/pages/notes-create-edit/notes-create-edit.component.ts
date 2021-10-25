import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes-create-edit',
  templateUrl: './notes-create-edit.component.html',
  styleUrls: ['./notes-create-edit.component.css']
})
export class NotesCreateEditComponent implements OnInit {
  id: string | null
  editable: boolean = false
  form: FormGroup

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly notesService: NotesService,
    private readonly fb: FormBuilder
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) {
      this.editable = true
    }

    this.form = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    if (this.editable) {
      this.notesService.getNote(this.id).subscribe((res) => {
        this.form = this.fb.group({
          id: [res.id],
          title: [res.title, Validators.required],
          description: [res.description, Validators.required],
        })
      })
    }

  }

  save(): void {
    if (this.form.valid) {
      if (this.editable) {
        this.notesService.editNote(this.form.getRawValue()).subscribe(() => {
          alert('Note editada com sucesso')
          return this.router.navigate(['notes'])
        })
      } else {

        this.notesService.createNote(this.form.getRawValue()).subscribe(() => {
          alert('Note criada com sucesso')
          return this.router.navigate(['notes'])
        })
      }

    } else {
      alert('Complete o formulário')
    }

  }

}
