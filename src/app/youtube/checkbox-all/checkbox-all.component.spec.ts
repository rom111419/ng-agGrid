import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxAllComponent } from './checkbox-all.component';

describe('CheckboxAllComponent', () => {
  let component: CheckboxAllComponent;
  let fixture: ComponentFixture<CheckboxAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
