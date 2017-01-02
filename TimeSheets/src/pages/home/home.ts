import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { CurrentTimeService } from '../../providers/get-current-time';
import { ParentsService } from '../../providers/parents-service';
import jsPDF from 'jspdf'
import { sigPadComponent } from './sigPadComonent';
import { TimeSheetService } from '../../providers/timeSheet-service';

class FinalDatas {
  arrivingTime;
  departureTime;
  parentName;
  sigImg;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [{ provide: HomePage, useClass: HomePage },
    CurrentTimeService, ParentsService, TimeSheetService]
})
export class HomePage {

  @ViewChild(sigPadComponent) childSigPad: sigPadComponent;
  timeDatas: FinalDatas = new FinalDatas();
  sigImg = '';
  pdfGenerate;
  public respoList = [];
  public respo;

  constructor(public navCtrl: NavController,
    private getCurrentTimeService: CurrentTimeService,
    private parentsService: ParentsService,
    private timeSheetService: TimeSheetService,
    private platform: Platform,
    private zone: NgZone, ) {
  }

  finalSignature = '';
  currentTime = this.getCurrentTimeService.getTime();
  //parentList = this.parentsService.getParentsList();

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.parentsService.initDB();
      this.timeSheetService.initDB();

      this.parentsService.getAll()
        .then(data => {
          this.zone.run(() => {
            this.respoList = data;
          });
        })
        .catch(console.error.bind(console));
    });
  }

  getSigImg(img) {
    this.sigImg = img;
  }

  onChange(dataSelect) {
    this.respo = dataSelect
  }

  saveDatas(feuille) {
    this.timeSheetService.add(feuille)
      .catch(console.error.bind(console));
  }

  register() {
    this.timeDatas.parentName = this.respo;
    this.timeDatas.sigImg = this.sigImg;
    this.saveDatas(this.timeDatas);

    /*
    this.childSigPad.savePad();
    let doc = new jsPDF();
    doc.text(20, 20, 'Feuille de temps');
    doc.text(20, 30, 'Heure d\'arrivée : ' + this.timeDatas.arrivingTime);
    doc.text(20, 40, 'Responsable : ' + this.respo);
    doc.text(20, 50, 'Signature : ');
    doc.addImage(this.sigImg, 'JPEG', 20, 60);
    if (this.sigImg != "") {
      this.pdfGenerate = doc.save(this.currentTime.day + "-" + this.currentTime.time + '.pdf');
    }
*/
  }
}
