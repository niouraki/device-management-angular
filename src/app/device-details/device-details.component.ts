import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DeviceManagementService } from '../device-management.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  successMessage:Boolean = false
  failureMessage:Boolean = false

  deviceId:string
  myDevice:any

  deleteDevice (id:string) {
    this.deviceManagement.deleteDevice(id, null)

    setTimeout(() => {
      this.router.navigate(['/home'])
    }, 2000)
  }
  updateDevice (id) {
    this.deviceManagement.getDevice(id)

    this.deviceManagement.getSingleDevice.subscribe((msg) => {
      if (msg) {
        this.router.navigate(['/add-device'], { queryParams: { update: id } })
      }
    })
  }
  constructor(private activatedroute:ActivatedRoute, private deviceManagement:DeviceManagementService, private router:Router) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(
      (param) => {
        this.deviceId = param.get('id')
        this.myDevice = this.deviceManagement.devices.filter((device) => {
          return device.id === this.deviceId
        })[0]
      }
    )

    if (!this.myDevice) {
      this.myDevice = JSON.parse(localStorage.getItem("device"))
    }

    this.deviceManagement.actionSuccess.subscribe((message) => {
      if (message) {
        this.successMessage = message
      }
    })

    this.deviceManagement.actionFailure.subscribe((message) => {
      if (message) {
        this.failureMessage = message
      }
    })
  }

}
