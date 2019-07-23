import { Component } from '@angular/core';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { Platform } from '@ionic/angular';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public devices:Array<any>;
  constructor(private ble:BluetoothLE, public plt:Platform) {
    this.plt.ready().then((readySource) => {

      console.log('Platform ready from', readySource);
   
      this.ble.initialize().subscribe(ble => {
        console.log('ble', ble.status) // logs 'enabled'
        console.log('Scanning...');
        this.scan();
      });
   
     });
    
  }


  scan(){
    this.devices = [];
    this.ble.startScan({}).subscribe(
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

  stop(){
    if(this.ble.isScanning){
      this.ble.stopScan();
    }else{
      console.log('is not scanning.');
    }
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
