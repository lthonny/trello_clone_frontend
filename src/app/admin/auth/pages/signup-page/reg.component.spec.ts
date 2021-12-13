import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegComponent } from './reg.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";

describe('RegComponent', () => {
  let component: RegComponent;
  let fixture: ComponentFixture<RegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegComponent ],
      imports: [ HttpClientModule, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with to controls', () => {
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
    expect(component.form.contains('name')).toBeTruthy();
  });

  it('should mark email as invalid if empty value', () => {
    let email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();
  });

  it('should mark password as invalid if empty value', () => {
    let email = component.form.controls['password'];
    expect(email.valid).toBeFalsy();
  })

  it('should mark name as invalid if empty value', () => {
    let email = component.form.controls['name'];
    expect(email.valid).toBeFalsy();
  });
});
