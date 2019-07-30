import { Component, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { DataService } from '../services/data/data.service'; 
import { Status } from '../enum/status.enum';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  private testMessage:any;
  
  constructor(private cd:ChangeDetectorRef, private ds:DataService) {
    console.log('Tab2 started!');
  }

  //each time this page will be showed
  ionViewDidEnter(){
    if(this.ds.getStatus() === Status.connected){
      this.testMessage = 'Reading data from Dataservice: ' + this.ds.getStatus();
    }else{
      this.testMessage = 'Reading data from Dataservice: ' + this.ds.getStatus();
    }
    this.cd.detectChanges();
  }

 
}
