import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'sig-pad',
  template: `<ion-header>
  <ion-navbar color="primary">
    <ion-title>
      Devdactic Signature
    </ion-title>
  </ion-navbar>
</ion-header>
 
<ion-content>
  <div class="title">Please draw your Signature</div>
  <ion-row [ngClass]="{'drawing-active': isDrawing}">
    <ion-col></ion-col>
    <ion-col>
      <signature-pad [options]="signaturePadOptions" (onBeginEvent)="drawStart()" (onEndEvent)="drawComplete()"></signature-pad>
    </ion-col>
    <ion-col></ion-col>
 
  </ion-row>
  <button ion-button full color="danger" (click)="clearPad()">Clear</button>
  <button ion-button full color="secondary" (click)="savePad()">Save</button>
 
  <ion-row>
    <ion-col></ion-col>
    <ion-col width-80>
      <img [src]="signature"/>
    </ion-col>
    <ion-col></ion-col>
  </ion-row>
 
</ion-content>`
})
export class sigPadComponent {

  signature = '';
  isDrawing = false;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 400,
    'canvasHeight': 200,
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
    let toast = this.toastCtrl.create({
      message: 'New Signature saved.',
      duration: 3000
    });
    toast.present();
  }

  clearPad() {
    this.signaturePad.clear();
  }
}
