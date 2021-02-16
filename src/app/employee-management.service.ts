import { Injectable, EventEmitter, Output, } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeManagementService {
  @Output() actionSuccess=new EventEmitter();
  @Output() actionFailure=new EventEmitter();

  @Output() employeeAdded=new EventEmitter();
  @Output() employeeDeleted=new EventEmitter();
  @Output() getSingleEmployee=new EventEmitter();
  @Output() employeeUpdated=new EventEmitter();

  @Output() deviceAssigned=new EventEmitter();
  @Output() deviceUnassigned=new EventEmitter();

  employees = []
  singleEmployee:any

  addEmployee (form) {
    this.http.post('https://device-management-a17b0-default-rtdb.firebaseio.com/Employees.json', {
      name: form.name,
      email: form.email,
    }).subscribe(
      (response:any) => {
        // console.log(response)
        this.employeeAdded.emit({
          name: form.name,
          email: form.email,
          id: response.name
        })
        if (response) {
          this.actionSuccess.emit('Employee added successfully')
        }
      },
      (error) => {
        console.log(error)
        if (error) {
          this.actionFailure.emit('There has been an issue. Please try again')
        }
      }
    )
  }

  getEmployees() {
    this.http.get('https://device-management-a17b0-default-rtdb.firebaseio.com/Employees.json')
      .subscribe((response:any) => {
        for (const key in response) {
          this.employees.push({
            id: key,
            name: response[key].name,
            email: response[key].email,
            devices: response[key].devices
          })
        }
      })
  }

  getEmployee(id:string) {
    this.http.get(`https://device-management-a17b0-default-rtdb.firebaseio.com/Employees/${id}.json`)
      .subscribe((response:any) => {
        this.getSingleEmployee.emit('success')
        this.singleEmployee = response
      })
  }

  updateEmployee(form:any, id:string) {
    this.http.patch(`https://device-management-a17b0-default-rtdb.firebaseio.com/Employees/${id}.json`, {
      name: form.name,
      email: form.email
    })
      .subscribe(
        (response:any) => {
          console.log(response)
        this.employeeUpdated.emit({
          id: id,
          email: response.email,
          name: response.name
        })
        this.actionSuccess.emit('Employee updated successfully')
      }),
      (error:any) => {
        console.log(error)
        if (error) {
          this.actionFailure.emit('There has been an issue. Please try again')
        }
      }
  }

  assignDevice(device:any, employee:any, id:string) {
    let assignedDevices = []

    if (employee.devices) {
      assignedDevices = employee.devices
      assignedDevices.push(device)
    } else {
      assignedDevices.push(device)
    }

    this.http.put(`https://device-management-a17b0-default-rtdb.firebaseio.com/Employees/${id}.json`, {
      name: employee.name,
      email: employee.email,
      devices: assignedDevices
    })
      .subscribe(
        (response:any) => {
        this.deviceAssigned.emit(response)
        this.actionSuccess.emit('Device assigned successfully')
      }),
      (error:any) => {
        console.log(error)
        if (error) {
          this.actionFailure.emit('There has been an issue. Please try again')
        }
      }
  }

  unassignDevice(device:any, employee:any, id:string) {
    let unassignedDevices = []

    // check if last item in array so splice can remove it
    employee.devices.forEach((myDevice:any, index:number) => {
      if (myDevice.id === device.id) {
        if (employee.devices.length > 1) {
          unassignedDevices = employee.devices.splice(myDevice[index], 1)
        } else if (employee.devices.length === 1) {
          unassignedDevices = employee.devices.splice(myDevice[index], -1)
        }
        
      }
    })

    this.http.put(`https://device-management-a17b0-default-rtdb.firebaseio.com/Employees/${id}.json`, {
      name: employee.name,
      email: employee.email,
      devices: unassignedDevices
    })
      .subscribe(
        (response:any) => {
        this.deviceUnassigned.emit(response)
        this.actionSuccess.emit('Device unassigned successfully')
      }),
      (error:any) => {
        console.log(error)
        if (error) {
          this.actionFailure.emit('There has been an issue. Please try again')
        }
      }
  }

  deleteEmployee (id:string) {
    this.http.delete(`https://device-management-a17b0-default-rtdb.firebaseio.com/Employees/${id}.json`)
      .subscribe(
        () => {
          this.actionSuccess.emit('Employee deleted successfully. You will be redirected')

        for (let i = 0; i < this.employees.length; i++) {
          if (this.employees[i].id === id) {
            this.employees.splice(i, 1)
          }
        }
      }),
      (error:any) => {
        console.log(error)
        if (error) {
          this.actionFailure.emit('There has been an issue. Please try again')
        }
      }
  }
  
  constructor(private http:HttpClient) { }
}
