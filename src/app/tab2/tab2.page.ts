import { Component, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { DataService } from '../services/data/data.service'; 
import { Status } from '../enum/status.enum';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  private testMessage:String;
  private deviceConnected:any;
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
      if(this.ds.getDevice() !== null){
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

}
