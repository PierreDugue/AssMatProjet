import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DropboxService } from '../../providers/dropbox-service';

/*
  Generated class for the TestPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-test-page',
  templateUrl: 'test-page.html',
  providers: [{ provide: TestPage, useClass: TestPage },
    DropboxService]
})
export class TestPage {

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    console.log('Hello TestPagePage Page');
  }

}
