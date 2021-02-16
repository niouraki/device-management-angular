import { EmployeeManagementService } from './../employee-management.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  showSuccessMessage:Boolean = false
  showFailureMessage:Boolean = false
  
  successMessage:string
  failureMessage:string

  title:string
  subtitle:string
  btnMsg:string
  employee:any

  myform = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  })

  submitOnEnter (event:any) {
    if (event.keyCode === 13) {
      this.getdata()
    }
  }
  
  getdata () {   
    this.route.queryParams
      .subscribe((params) => {
        if (params.update) {
          // console.log(this.myform.value)
          this.employeeManagement.updateEmployee(this.myform.value, params.update)
        } else {
          this.employeeManagement.addEmployee(this.myform.value)
        }
      })
          
    this.myform.reset()
  }

  constructor(private employeeManagement:EmployeeManagementService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params) => {
        if (params.update) {
          this.title = 'Update employee'
          this.subtitle = 'Please update the following form'
          this.btnMsg = 'Update'

          this.employee = this.employeeManagement.singleEmployee

          setTimeout(() => {
            this.myform.setValue({
              name: this.employee.name,
              email: this.employee.email
            })
          }) 
        } else {
          this.title = 'Create a new employee'
          this.subtitle = 'Please fill in the following form'
          this.btnMsg = 'Submit'
        }  
      })

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
