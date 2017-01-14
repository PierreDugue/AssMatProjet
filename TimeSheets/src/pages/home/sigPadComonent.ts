import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';

@Component({
  selector: 'sig-pad',
  template: `
    <ion-title>

      <h4>Signez ici</h4>
    </ion-title>

  <ion-row [ngClass]="{'drawing-active': isDrawing}">
    <ion-col></ion-col>
    <ion-col>
      <signature-pad [options]="signaturePadOptions" (onBeginEvent)="drawStart()" (onEndEvent)="drawComplete()"></signature-pad>
    </ion-col>
    <ion-col></ion-col>
  </ion-row>
  <button ion-button full color="danger" (click)="clearPad()">Clear</button>
`
})
export class sigPadComponent {

  @Output() sigImg = new EventEmitter();

  signature = '';
  isDrawing = false;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  signaturePadOptions: Object = {
    'minWidth': 2,
 
    'backgroundColor': '#f6fbff',
    'penColor': '#444444',
  };

  constructor(public navController: NavController, public storage: Storage, public toastCtrl: ToastController) { }

  ionViewDidEnter() {
    this.signaturePad.clear()
    this.storage.get('savedSignature').then((data) => {
      this.signature = data;
    });


  }

  drawComplete() {
    this.isDrawing = false;
  }

  drawStart() {
    this.isDrawing = true;
  }

  savePad() {
    this.signature = this.signaturePad.toDataURL();
    this.storage.set('savedSignature', this.signature);
    this.signaturePad.clear();
    this.sigImg.emit(this.signature);
  }

  clearPad() {
    this.signaturePad.clear();
  }
}
