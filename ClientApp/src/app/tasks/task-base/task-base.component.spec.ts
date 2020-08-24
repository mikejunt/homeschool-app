import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBaseComponent } from './task-base.component';

describe('TaskBaseComponent', () => {
  let component: TaskBaseComponent;
  let fixture: ComponentFixture<TaskBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
