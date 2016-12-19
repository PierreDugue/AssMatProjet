import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SqlService } from '../../providers/sql-service';

/*
  Generated class for the ManagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-manage-page',
  templateUrl: 'manage-page.html',
  providers:[{ provide: ManagePagePage, useClass: ManagePagePage },
    SqlService]
  })
export class ManagePagePage {

  constructor(public navCtrl: NavController, private sqlService: SqlService) { }

  ionViewDidLoad() {
  }

  register(user) {

  }

}
