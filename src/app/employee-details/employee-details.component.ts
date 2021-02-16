import { EmployeeManagementService } from './../employee-management.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DeviceManagementService } from '../device-management.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  successMessage:string
  failureMessage:string

  showSuccessMessage:Boolean = false
  showFailureMessage:Boolean = false

  employeeId:string
  myEmployee:any
  availableDevices = []

  deleteEmployee (id:string) {
    // if employee has devices, push them to available
    if (this.myEmployee.devices) {
      this.myEmployee.devices.forEach((device) => {
        this.deviceManagement.addDevice(null, device)
      })
    }
    this.employeeManagement.deleteEmployee(id)

    setTimeout(() => {
      this.router.navigate(['/home'])
    }, 3000)
  }

  updateEmployee (id:string) {
    this.employeeManagement.getEmployee(this.employeeId)
    this.employeeManagement.getSingleEmployee.subscribe((msg) => {
      if (msg) {
        this.router.navigate(['/add-employee'], { queryParams: { update: this.employeeId } })
      }
    })
  }

  assignDevice (device:any, employee:any) {
    let assigned = true
    this.employeeManagement.assignDevice(device, employee, this.employeeId)
    this.deviceManagement.deleteDevice(device.id, assigned)

    this.employeeManagement.deviceAssigned.subscribe((response) => {
      this.myEmployee = response
    })
  }

  unassignDevice (device:any, employee:any) {
    this.deviceManagement.addDevice(null, device)
    this.employeeManagement.unassignDevice(device, employee, this.employeeId)
    
    this.employeeManagement.deviceUnassigned.subscribe((response) => {
      this.myEmployee = response
    })
  }

  constructor(private activatedroute:ActivatedRoute,
              private employeeManagement:EmployeeManagementService,
              private deviceManagement:DeviceManagementService,
              private router:Router
             ) {}

  ngOnInit(): void {
    this.availableDevices = this.deviceManagement.devices

    this.activatedroute.paramMap.subscribe(
      (param) => {
        this.employeeId = param.get('id')

        
        this.myEmployee = this.employeeManagement.employees.filter((employee) => {
          return employee.id === this.employeeId
        })[0]
      }
    )


    if (!this.myEmployee) {
      this.myEmployee = JSON.parse(localStorage.getItem("employee"))
    }

    this.employeeManagement.actionSuccess.subscribe((message) => {
      if (message) {
        this.showSuccessMessage = true
        this.successMessage = message
        setTimeout(() => {
          this.showSuccessMessage = false
        }, 1000)
      }
    })

    this.employeeManagement.actionFailure.subscribe((message) => {
      if (message) {
        this.showFailureMessage = true
        this.failureMessage = message

        setTimeout(() => {
          this.showSuccessMessage = false
        }, 1000)
      }
    })
  }
}
