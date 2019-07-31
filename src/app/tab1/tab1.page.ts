import { Component } from '@angular/core';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { Platform } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { DataService } from '../services/data/data.service'; 
import { Status } from '../enum/status.enum';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public devices:Array<any>;
  constructor(private ble:BluetoothLE, public plt:Platform, private changeRef: ChangeDetectorRef, private ds:DataService) {
    
    this.plt.ready().then((readySource) => {

      console.log('Platform ready from', readySource);
      //previous check if the Bluetooth was scanning.
      this.stop();
      this.ble.initialize().subscribe(ble => {
        console.log('ble', ble.status) // logs 'enabled'
        console.log('Scanning...');
        this.scan();
      });
   
     });
    
  }

  scan(){
    this.devices = [];
    let foundDevices = [];
    this.ble.startScan({}).subscribe(
      device => {
        if(device.status === "scanStarted"){
          console.log("Scanning for devices (will continue to scan until you select a device)...", "status");
          this.ds.setStatus(Status.scanning);
        }else if(device.status === "scanResult"){
          if (!foundDevices.some(function (foundDevice) {
            return foundDevice.address === device.address;
          })) {
            foundDevices.push(device);
            console.log("NEW BLUETOOTH LE FOUND!");
            this.devices.push(device);
            this.changeRef.detectChanges();
            console.log(JSON.stringify(device));
          }else{
            console.log("***BLUETOOTH REPEATED");
          }
        }
      },
      error => { 
        console.log('Error while scanning!: '+JSON.stringify(error)); 
        this.stop();
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

  connect(device){
    this.ble.connect(device.id).subscribe(
      deviceConnected=>{
        console.log('Device connected: ' + deviceConnected);
        this.ds.setStatus(Status.connected);
        this.ds.setDevice(device);
      },
      connectionError=>{
        //If a previous connection was successful, that connection will be still available...
        console.log('Connection error: ' + connectionError);
        alert('Connection error: ' + connectionError);
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
