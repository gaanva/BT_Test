import { Injectable } from '@angular/core';
import { Status } from '../../enum/status.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private connStatus:any;
  private device: any;
  private deviceInfo: any;
  private serviceDefinition:any;
  
  private SERVICE:string="FFE0";
  private CHARACTERISTIC:string="FFE1";
  
  constructor() { 
    this.connStatus = Status.disconnected;
    this.serviceDefinition = this.createService();
    console.log("Data provider created!");
  }

  private createService(){
    this.serviceDefinition = {
      service: this.SERVICE,
      characteristics: [
        {
          uuid: "light",
          permissions: {
            read: true,
            write: true,
            //readEncryptionRequired: true,
            //writeEncryptionRequired: true,
          },
          properties : {
            read: true,
            writeWithoutResponse: true,
            write: true,
            notify: true,
            indicate: true,
            //authenticatedSignedWrites: true,
            //notifyEncryptionRequired: true,
            //indicateEncryptionRequired: true,
          }
        }
      ]
    };
  }

  public setStatus(value){
    this.connStatus = value;
  }

  public setDevice(device){
    this.device = device;
  }

  public getStatus(){
    return this.connStatus;
  }

  public getDevice(){
    return this.device;
  }

  public setDeviceInfo(deviceInfo){
    this.deviceInfo = deviceInfo; 
  }

  public getService(){
    return this.SERVICE;
  }

  public getCharacteristic(){
    return this.CHARACTERISTIC;
  }

  public getServiceDefinition(){
    if(!this.serviceDefinition){
      this.createService();
    }
    return this.serviceDefinition;
  }

  

}
