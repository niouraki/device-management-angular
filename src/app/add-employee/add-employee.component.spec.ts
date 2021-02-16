import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddEmployeeComponent } from './add-employee.component';
import { RouterTestingModule } from "@angular/router/testing";

describe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;
    const nameInput = compiled.querySelector('input[id="name]')
    const emailInput = compiled.querySelector('input[id="email]')

    expect(nameInput).toBe(null);
    expect(emailInput).toBe(null);
  })

  it('should test form validity', () => {
    const form = component.myform;
    expect(form.valid).toBeFalsy();

    const nameInput = form.controls.name;
    nameInput.setValue('John Peter');

    const emailInput = form.controls.email;
    emailInput.setValue('test@gmail.com');

    expect(form.valid).toBeTruthy();
  })
});
