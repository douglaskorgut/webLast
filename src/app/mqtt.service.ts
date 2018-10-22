
import { Component,OnInit } from '@angular/core';
import { MqttService , IMqttMessage} from '../../node_modules/ngx-mqtt';
import { Subscription } from '../../node_modules/rxjs';
import  {Injectable} from '@angular/core'
@Injectable()
export class Mqtt {

    private subscription: Subscription;
    public message: string;

    constructor (private _mqttService: MqttService){
        this.subscription = this._mqttService.observe('topico/douglao').subscribe((message: IMqttMessage) => {
          this.message = message.payload.toString();
          console.log(this.message)
        });
      }

}