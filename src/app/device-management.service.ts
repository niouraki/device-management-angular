import { Injectable, EventEmitter, Output, } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceManagementService {
  @Output() actionSuccess=new EventEmitter();
  @Output() actionFailure=new EventEmitter();

  @Output() deviceAdded=new EventEmitter();
  @Output() deviceDeleted=new EventEmitter();
  @Output() getSingleDevice=new EventEmitter();
  @Output() deviceUpdated=new EventEmitter();

  
  devices = []
  singleDevice:any

  changeTypeToString (type) {
    let deviceType:string
    switch (type) {
      case 0:
        deviceType = 'mobile'
        break;
      case 1:
        deviceType = 'laptop'
        break;
      case 2:
        deviceType = 'notebook'
        break;
      case 3:
        deviceType = 'tablet'
        break;
    }
    return deviceType
  }

  changeTypeToNumber (type) {
    let typeNumber:Number = 0
    switch (type) {
      case 'mobile':
        typeNumber = 0
        break;
      case 'laptop':
        typeNumber = 1
        break;
      case 'notebook':
        typeNumber = 2
        break;
      case 'tablet':
        typeNumber = 3
        break;
    }
    return typeNumber
  }

  addDevice (form:any, device:any) {
    let typeNumber:Number = 0
    let serialNumberString:string
    let descriptionString:string

    if (form) {
      typeNumber = this.changeTypeToNumber(form.type)
      serialNumberString = form.serialNumber
      descriptionString = form.description
    } else if (device) {
      typeNumber = this.changeTypeToNumber(device.type)
      serialNumberString = device.serialNumber
      descriptionString = device.description
    }

    this.http.post('https://device-management-a17b0-default-rtdb.firebaseio.com/Devices.json', {
      type: typeNumber,
      serialNumber: serialNumberString,
      description: descriptionString
    }).subscribe(
      (response:any) => {
        let deviceType = this.changeTypeToString(typeNumber)

        this.deviceAdded.emit({
          type: deviceType,
          serialNumber: serialNumberString,
          description: descriptionString,
          id: response.name
        })
        if (response) {
          this.actionSuccess.emit('Device added successfully')
        }
      }),
      (error:any) => {
        console.log(error)
        if (error) {
          this.actionFailure.emit('There has been an issue. Please try again')
        }
      }
  }

  getDevices() {
    this.http.get('https://device-management-a17b0-default-rtdb.firebaseio.com/Devices.json')
    .subscribe((response:any) => {
      for (const key in response) {
        let deviceType = this.changeTypeToString(response[key].type)
        this.devices.push({
          id: key,
          type: deviceType,
          serialNumber: response[key].serialNumber,
          description: response[key].description
        })
      }
    })
  }

  getDevice(id:string) {
    this.http.get(`https://device-management-a17b0-default-rtdb.firebaseio.com/Devices/${id}.json`)
    .subscribe((response:any) => {
      this.getSingleDevice.emit('success')
      let changedType = this.changeTypeToString(response.type)
      this.singleDevice = {
        type: changedType,
        serialNumber: response.serialNumber,
        description: response.description
      }
    })
  }

  updateDevice(form:any, id:string) {
    let typeNumber = this.changeTypeToNumber(form.type)

    this.http.put(`https://device-management-a17b0-default-rtdb.firebaseio.com/Devices/${id}.json`, {
      type: typeNumber,
      serialNumber: form.serialNumber,
      description: form.description
    })
      .subscribe(
        (response:any) => {
          let typeString = this.changeTypeToString(response.type)

        this.deviceUpdated.emit({
          id: id,
          type: typeString,
          serialNumber: response.serialNumber,
          description: response.description
        })
        this.actionSuccess.emit('Device updated successfully')
      }),
      (error:any) => {
        console.log(error)
        if (error) {
          this.actionFailure.emit('There has been an issue. Please try again')
        }
      }
  }

  deleteDevice (id:string, assigned:Boolean) {
    this.http.delete(`https://device-management-a17b0-default-rtdb.firebaseio.com/Devices/${id}.json`)
      .subscribe(
        () => {
          if (assigned === true) {
            this.actionSuccess.emit('Device assigned successfully')
          } else {
            this.actionSuccess.emit('Device deleted successfully. You will be redirected')
          }
          

        for (let i = 0; i < this.devices.length; i++) {
          if (this.devices[i].id === id) {
            this.devices.splice(i, 1)
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
