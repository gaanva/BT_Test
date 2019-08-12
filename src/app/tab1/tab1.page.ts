import { Component } from '@angular/core';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { Platform, Events } from '@ionic/angular';
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
  constructor(
    public events: Events,
    private ble:BluetoothLE, 
    public plt:Platform, 
    private changeRef: ChangeDetectorRef, 
    private ds:DataService
  ) {
    
    this.plt.ready().then((readySource) => {

      console.log('Platform ready from', readySource);
      //previous check if the Bluetooth was scanning.
      this.startScan();
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
      this.ble.startScan({services:[this.ds.getService()]}).subscribe( 
      //this.ble.startScan({}).subscribe( 
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
        this.startScan();
      }
    );
    
  }

  startScan(){
    if(this.ble.isScanning){
      this.ble.stopScan();
      this.ds.setStatus(Status.disconnected);
    }else{
      this.scan();
      this.ds.setStatus(Status.scanning);
      console.log('Scanning started again.');
    }
  }

  connect(device){
    //if(!this.ble.wasConnected){
      this.ble.connect({address:device.address, autoConnect:true}).subscribe(
        deviceConnected=>{
          console.log(deviceConnected);
          this.ds.setStatus(Status.connected);
          this.ds.setDevice(deviceConnected);
          /**TODO
           * ir al TAB2 y mostrar la info del dispositivo conectado.
           */
          this.events.publish('tab:clicked',{tab:2});

        },
        connectionError=>{
          //If a previous connection was successful, that connection will be still available...
          console.log(connectionError);
          alert(connectionError.error + ' -> ' + connectionError.message);
        }
      );
    //}else{
      //try to reconnect
      /*
      this.ble.reconnect({address:device.address}).subscribe(
        ok=>{console.log('reconnect ok')},
        error=>{
                console.log(error);
                this.ble.close({address:device.address}).then(
                  ok=>console.log('closed!'),
                  error=>console.log(error)
                );
              }
      );
        
    }*/
  }

  disconnect(d){
    this.ble.disconnect({address:d.address}).then(
      ok=>{alert(ok.toString())},
      error=>{console.log(error.error + '->' + error.message)}
    );
  }

  //me tira error al intentar conectar al BT
  close(d){
    this.ble.close({address:d.address}).then(
      ok=>console.log('closed!'),
      error=>console.log(error)
    );
  }

  reconnect(device){
    this.ble.reconnect({address:device.address}).subscribe(
      ok=>{console.log('reconnect ok')},
      error=>{console.log(error)}
    );
    
  }

  
  
}
