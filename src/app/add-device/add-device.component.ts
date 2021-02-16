import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeviceManagementService } from '../device-management.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  showSuccessMessage:Boolean = false
  showFailureMessage:Boolean = false

  successMessage:string
  failureMessage:string

  title:string
  subtitle:string
  btnMsg:string

  device:any

  myform = new FormGroup({
    type: new FormControl(null, [Validators.required]),
    serialNumber: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
    description: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
  })

  submitOnEnter (event:any) {
    if (event.keyCode === 13) {
      this.getdata()
    }
  }

  // resetMyForm () {
  //   this.myform.value.type = null
  //   this.myform.value.serialNumber = null
  //   this.myform.value.description = null
  // }

  getdata () {
    this.route.queryParams
    .subscribe((params) => {
      if (params.update) {
        this.deviceManagement.updateDevice(this.myform.value, params.update)
      } else {
        this.deviceManagement.addDevice(this.myform.value, null)
      }
    })

    this.myform.reset()
  }
  constructor(private deviceManagement:DeviceManagementService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe((params) => {
      if (params.update) {
        this.title = 'Update device'
        this.subtitle = 'Please update the following form'
        this.btnMsg = 'Update'

        this.device = this.deviceManagement.singleDevice

        this.myform.setValue({
          type: this.device.type,
          serialNumber: this.device.serialNumber,
          description: this.device.description
        })
      } else {
        this.title = 'Create a new device'
        this.subtitle = 'Please fill in the following form'
        this.btnMsg = 'Submit'
      }  
    })

    this.deviceManagement.actionSuccess.subscribe((message) => {
      if (message) {
        this.showSuccessMessage = true
        this.successMessage = message
        setTimeout(() => {
          this.showSuccessMessage = false
        }, 1000)
      }
    })
    
    this.deviceManagement.actionFailure.subscribe((message) => {
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
