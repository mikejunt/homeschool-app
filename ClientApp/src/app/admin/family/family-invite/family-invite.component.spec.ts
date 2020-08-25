import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyInviteComponent } from './family-invite.component';

describe('FamilyInviteComponent', () => {
  let component: FamilyInviteComponent;
  let fixture: ComponentFixture<FamilyInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
