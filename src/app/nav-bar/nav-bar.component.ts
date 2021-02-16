import { EmployeeManagementService } from './../employee-management.service';
import { Component, OnInit } from '@angular/core';
import { DeviceManagementService } from '../device-management.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  myEmployees = []
  myDevices = []
  showSidebar:boolean = false

  openSidebar() {
    this.showSidebar = true
  }

  closeSidebar() {
    this.showSidebar = false
  }

  passToLocalStorageEmployee(employee) {
    localStorage.setItem("employee", JSON.stringify(employee))
  }

  passToLocalStorageDevice(device) {
    localStorage.setItem("device", JSON.stringify(device))
  }
  constructor(private employeeManagement:EmployeeManagementService, private deviceManagement:DeviceManagementService) { }

  ngOnInit(): void {
    this.employeeManagement.getEmployees()
    this.deviceManagement.getDevices()

    this.myEmployees = this.employeeManagement.employees
    this.myDevices = this.deviceManagement.devices
    
    this.employeeManagement.employeeAdded.subscribe((employee) => {
      this.myEmployees.push(employee)
    })

    this.deviceManagement.deviceAdded.subscribe((device) => {
      this.myDevices.push(device)
    })

    this.employeeManagement.employeeUpdated.subscribe((employee) => {
      this.myEmployees.forEach((myEmployee, index) => {
        if (myEmployee.id === employee.id ) {
          this.myEmployees.splice(index, 1, employee)
        }
      })
    })

    this.deviceManagement.deviceUpdated.subscribe((device) => {
      this.myDevices.forEach((myDevice, index) => {
        if (myDevice.id === device.id ) {
          this.myDevices.splice(index, 1, device)
        }
      })
    })
  }
}
