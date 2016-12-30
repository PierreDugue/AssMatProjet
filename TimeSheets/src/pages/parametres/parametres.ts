import { Component, NgZone } from '@angular/core';
import { ModalController, NavController, Platform, ViewController } from 'ionic-angular';
import { ParentsService } from '../../providers/parents-service';
import { DetailRespoPage } from '../detail-respo/detail-respo';

@Component({
  selector: 'page-parametres',
  templateUrl: 'parametres.html',
  providers: [{ provide: ParametresPage, useClass: ParametresPage }, ParentsService]
})

export class ParametresPage {
  public respo = [];
  public neutre;
  constructor(private viewCtrl: ViewController,
    public navCtrl: NavController,
    private parentsService: ParentsService,
    private platform: Platform,
    private zone: NgZone,
    private modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.parentsService.initDB();

      this.parentsService.getAll()
        .then(data => {
          this.zone.run(() => {
            this.respo = data;
          });
        })
        .catch(console.error.bind(console));
    });
  }

  showDetail(datas = "") {
    let modal = this.modalCtrl.create(DetailRespoPage, { datas: datas });
    modal.present();
  }

}