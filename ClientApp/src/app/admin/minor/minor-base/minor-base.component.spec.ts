import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinorBaseComponent } from './minor-base.component';

describe('MinorBaseComponent', () => {
  let component: MinorBaseComponent;
  let fixture: ComponentFixture<MinorBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinorBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinorBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
