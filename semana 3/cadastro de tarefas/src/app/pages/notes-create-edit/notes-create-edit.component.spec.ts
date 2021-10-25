import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesCreateEditComponent } from './notes-create-edit.component';

describe('NotesCreateEditComponent', () => {
  let component: NotesCreateEditComponent;
  let fixture: ComponentFixture<NotesCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
