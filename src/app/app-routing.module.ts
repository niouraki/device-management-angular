import { DeviceDetailsComponent } from './device-details/device-details.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { HomeComponent } from './home/home.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDeviceComponent } from './add-device/add-device.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'add-employee', component: AddEmployeeComponent},
  { path: 'add-device', component: AddDeviceComponent},
  { path: 'employee-details/:id', component: EmployeeDetailsComponent},
  { path: 'device-details/:id', component: DeviceDetailsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
