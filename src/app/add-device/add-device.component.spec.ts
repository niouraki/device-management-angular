import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddDeviceComponent } from './add-device.component';
import { RouterTestingModule } from "@angular/router/testing";

describe('AddDeviceComponent', () => {
  let component: AddDeviceComponent;
  let fixture: ComponentFixture<AddDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeviceComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test form validity', () => {
    const form = component.myform;
    expect(form.valid).toBeFalsy();

    const type = form.controls.type;
    type.setValue(0);

    const serialNumber = form.controls.serialNumber;
    serialNumber.setValue('test test test');

    const description = form.controls.description;
    description.setValue('test description');

    expect(form.valid).toBeTruthy();
  })
});
