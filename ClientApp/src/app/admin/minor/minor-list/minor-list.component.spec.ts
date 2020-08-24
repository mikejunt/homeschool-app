import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinorListComponent } from './minor-list.component';

describe('MinorListComponent', () => {
  let component: MinorListComponent;
  let fixture: ComponentFixture<MinorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
