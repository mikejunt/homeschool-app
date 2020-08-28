import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinorDialogComponent } from './minor-dialog.component';

describe('MinorDialogComponent', () => {
  let component: MinorDialogComponent;
  let fixture: ComponentFixture<MinorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
