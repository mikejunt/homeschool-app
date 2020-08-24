import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyBaseComponent } from './family-base.component';

describe('FamilyBaseComponent', () => {
  let component: FamilyBaseComponent;
  let fixture: ComponentFixture<FamilyBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
