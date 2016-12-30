import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ParentsService } from '../../providers/parents-service';

class Responsable {
  parentName: String;
  parentSurname: String;
  children: String;
}

@Component({
  selector: 'page-details',
  templateUrl: 'detail-respo.html',
  providers: [{ provide: DetailRespoPage, useClass: DetailRespoPage }, ParentsService]
})
export class DetailRespoPage {
  responsable: Responsable = new Responsable();
  public isNew = true;
  public action = 'Ajouter';

  constructor(private viewCtrl: ViewController,
    private navParams: NavParams,
    private parentsService: ParentsService) {
  }

  ionViewDidLoad() {
    let editRespo = this.navParams.get('datas');

    if (editRespo) {
      this.responsable = editRespo;
      this.isNew = false;
      this.action = 'Edit';
    }
  }

  save() {
    if (this.isNew) {
      this.parentsService.add(this.responsable)
       .catch(console.error.bind(console));
    } else {
      console.log(this.responsable);
      this.parentsService.update(this.responsable)
        .catch(console.error.bind(console));
    }

    this.dismiss();
  }

  delete() {
    console.log(this.responsable);
    this.parentsService.delete(this.responsable)
      .catch(console.error.bind(console));

    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss(this.responsable);
  }
}