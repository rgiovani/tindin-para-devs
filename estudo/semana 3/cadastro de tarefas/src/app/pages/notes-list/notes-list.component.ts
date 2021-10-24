import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  notes: any[] = []

  constructor(
    private readonly notesService: NotesService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.notesService.listNote().subscribe(
      (res) => {
        this.notes = res
      },
      (err) => {
        alert(err.message)
      }
    )
  }

  goCreate() {
    this.router.navigate(['notes/create'])
  }

  edit(id: string) {
    this.router.navigate([`notes/edit/${id}`])
  }

}
