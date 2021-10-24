import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NotesCreateEditComponent } from './pages/notes-create-edit/notes-create-edit.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'notes',
    component: NotesListComponent
  },
  {
    path: 'notes/create',
    component: NotesCreateEditComponent
  },
  {
    path: 'notes/edit/:id',
    component: NotesCreateEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
