import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddDeviceComponent } from './add-device/add-device.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from './home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';

import { HttpClient, HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AddEmployeeComponent,
    AddDeviceComponent,
    HomeComponent,
    EmployeeDetailsComponent,
    DeviceDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
