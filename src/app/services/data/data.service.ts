import { Injectable } from '@angular/core';
import { Status } from '../../enum/status.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private connStatus:any;
  private device: any;
  private deviceInfo: any;
  
  private SERVICE:string='0xFFE0';
  private CHARACTERISTIC:string='0xFFE1';
  
  constructor() { 
    this.connStatus = Status.disconnected;
    console.log("Data provider created!");
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

}
