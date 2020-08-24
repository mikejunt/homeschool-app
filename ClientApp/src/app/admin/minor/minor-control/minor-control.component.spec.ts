import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinorControlComponent } from './minor-control.component';

describe('MinorControlComponent', () => {
  let component: MinorControlComponent;
  let fixture: ComponentFixture<MinorControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinorControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinorControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
