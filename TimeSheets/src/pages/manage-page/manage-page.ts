import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ManagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-manage-page',
  templateUrl: 'manage-page.html'
})
export class ManagePagePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ManagePagePage Page');
  }

}