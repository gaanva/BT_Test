import { Injectable } from '@angular/core';
import { Status } from '../../enum/status.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private connStatus:any;
  private device: any;
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

  public getDeviceInfo(){
    return this.device;
  }

}
