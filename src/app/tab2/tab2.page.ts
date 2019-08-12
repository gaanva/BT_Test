import { Component, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  /**
   * Depending on the device type (light, motor, camera, etc.) 
   * Should be created a 'deviceConnected' class with its actions. 
   */
  private testMessage:String;
  private deviceConnected:any;
  //light status: on/off. true/false.
  private light:any = false; 
  
  constructor(
    private cd:ChangeDetectorRef, 
    private ds:DataService,
    private ble:BluetoothLE
  ) 
  {
    this.deviceConnected=ds.getDevice();
    console.log('Tab2 started!');
  }

  //each time this page will be showed
  ionViewDidEnter(){
    this.testMessage = this.ds.getStatus();
  }

  deviceInfo(){
    if(this.ble.isConnected){
      if(this.ds.getDevice()){
        this.ble.discover({address:this.ds.getDevice().address, clearCache:true}).then(
          data=>{ 
                  console.log(data);
                  this.ds.setDeviceInfo(data);
                  this.updateView();
                },
          error=>console.log(error)
        );
      }else{
        console.log('BLE status connected, but Data Service doesnt have a device object.');
      }
    }else{
      console.log('no device connected!');
    }
  }


  updateView(){
    this.cd.detectChanges();
  }

  setOnOff(){
    if(this.ble.isConnected){
      this.ble.write({service:this.ds.getService(), 
                      address:this.ds.getDevice().address, 
                      characteristic:this.ds.getCharacteristic(), 
                      value:"algo"})
      .then(
        ok => alert("information sent ok" + ok.toString()),
        error => console.log(error)
      );
    }
  }
  
  //Services and characteristic to HM-10
  addService(){
    if(this.ble.isConnected){
      this.ble.addService(this.ds.getServiceDefinition()).then(
        ok=> console.log(ok),
        error=> console.log(error)
      );
    }else{
      console.log('Bluetooth is not connected.');
    } 
  }

  stringToBytes(value){
    return this.ble.stringToBytes(value);
  }

  bytesToString(value){
    return this.ble.bytesToString
  }

}
