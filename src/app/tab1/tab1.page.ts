import { Component } from '@angular/core';
import { BLE } from '@ionic-native/ble';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public devices:Array<any>;
  constructor(private ble:BLE) {
    console.log('Scanning for 10 seconds.');
    this.scan(10);
  }


  scan(seconds:number){
    this.devices = [];
    this.ble.scan([], seconds).subscribe(
      device => {
        this.devices.push(device);
        console.log(JSON.stringify(device));
      },
      error => { 
        this.ble.stopScan();
        console.log('Error while scanning!: '+JSON.stringify(error)); 
      }
    );
  }

  connect(deviceId){
    this.ble.connect(deviceId).subscribe(
      deviceConnected=>{
        console.log('Device connected: ' + deviceConnected);
      },
      connectionError=>{
        console.log('Connection error: ' + connectionError);
      }
    );
  }

  disconnect(deviceId){
    this.ble.disconnect(deviceId).then(
      ok=>{console.log('Disconnected: ' + ok)},
      error=>{console.log('Some error: ' + error)}
    );
  }

  onOff(on:boolean){
    //llamar a la característica/property de light del BT.
  }
}
