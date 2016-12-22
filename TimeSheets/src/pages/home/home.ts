import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CurrentTimeService } from '../../providers/get-current-time';
import { ParentsService } from '../../providers/parents-service';
import jsPDF from 'jspdf'
import { sigPadComponent } from './sigPadComonent';
import { DatastorageService } from '../../providers/datastorage-service';

class TimeDatas {
  arrivingTime;
  departureTime;
  parentName;
  sigImg;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [{ provide: HomePage, useClass: HomePage },
    CurrentTimeService, ParentsService, DatastorageService]
})
export class HomePage {

  @ViewChild(sigPadComponent) childSigPad: sigPadComponent;
  timeDatas: TimeDatas = new TimeDatas();
  sigImg = '';
  pdfGenerate;
  listOfPdf;

  constructor(public navCtrl: NavController,
    private getCurrentTimeService: CurrentTimeService,
    private parentsService: ParentsService,
    private datastorageService: DatastorageService) {
    this.listOfPdf = this.datastorageService.getData();    
  }

  finalSignature = '';
  currentTime = this.getCurrentTimeService.getTime();
  parentList = this.parentsService.getParentsList();

  getSigImg(img) {
    this.sigImg = img;
  }

  register() {
    console.log(this.timeDatas);
    this.childSigPad.savePad();
    let doc = new jsPDF();
    doc.text(20, 20, 'Feuille de temps');
    doc.text(20, 30, 'Heyre d\'arrivée : ' + this.timeDatas.arrivingTime);
    doc.text(20, 40, 'Signature : ');
    doc.addImage(this.sigImg, 'JPEG', 20, 60);
    if (this.sigImg != "") {
      this.pdfGenerate = doc.save(this.currentTime.day + "-" + this.currentTime.time + '.pdf');
    }
    this.datastorageService.save(this.pdfGenerate);
  }
}
