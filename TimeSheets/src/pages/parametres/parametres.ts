import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ParentsService } from '../../providers/parents-service';

class Responsable {
  parentName: String;
  parentSurname: String;
  children: String;
}

@Component({
  selector: 'page-parametres',
  templateUrl: 'parametres.html',
  providers: [{ provide: ParametresPage, useClass: ParametresPage }, ParentsService]
})

export class ParametresPage {
  responsable: Responsable = new Responsable();
  public items = [];
  public item;
  constructor(public navCtrl: NavController,
    private parentService: ParentsService) {
    this.parentService.getData().then((responsablesList) => {
      if (responsablesList) {
        this.items = JSON.parse(responsablesList);
      }
    }), function (error) {
      console.log(error);
      return Promise.reject(error);
    };
  }

  ionViewDidLoad() {
    this.items.push("eee");
  }

  register() {
    console.log(this.responsable);
    this.item = this.responsable;
    this.saveDatas(this.item);
  }

  saveDatas(item) {
    this.parentService.save(this.items.push(item));
  }
}
