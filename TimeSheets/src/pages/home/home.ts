import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CurrentTimeService } from '../../providers/get-current-time';
import { ParentsService } from '../../providers/parents-service';
import { sigPadComponent } from './sigPadComonent';
import { TimeSheetService } from '../../providers/timeSheet-service';

class FinalDatas {
  dateOfDay;
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
  public respoList = [];
  public respo;
  public form: FormGroup;
  public dateOfDay: any;
  public parentName: any;
  public arrivingTime: any;
  public departureTime: any;
  public sigImg: any;
  public recordId: any;
  public revisionId: any;
  public isEdited: boolean = false;
  public hideForm: boolean = false;
  public pageTitle: string;

  constructor(public navCtrl: NavController,
    private getCurrentTimeService: CurrentTimeService,
    private parentsService: ParentsService,
    private timeSheetService: TimeSheetService,
    private platform: Platform,
    public fb: FormBuilder,
    public NP: NavParams,
    public toastCtrl: ToastController,
    private zone: NgZone, ) {
    this.form = fb.group({
      "dateOfDay": ["", Validators.required],
      "parentName": ["", Validators.required],
      "arrivingTime": ["", Validators.required],
      "departureTime": ["", Validators.required]
    });
    this.resetFields();
    if (NP.get("key") && NP.get("rev")) {
      this.recordId = NP.get("key");
      this.revisionId = NP.get("rev");
      this.isEdited = true;
      this.selectComic(this.recordId);
      this.pageTitle = 'Amend entry';
    }
    else {
      this.recordId = '';
      this.revisionId = '';
      this.isEdited = false;
      this.pageTitle = 'Create entry';
    }
  }

  finalSignature = '';
  currentTime = this.getCurrentTimeService.getTime();
  //parentList = this.parentsService.getParentsList();

  resetFields(): void {
    this.parentName = "";
  }

  selectComic(id) {
    this.timeSheetService.retrieveItem(id)
      .then((doc) => {
        this.dateOfDay = doc[0].dateOfDay;
        this.parentName = doc[0].parentName;
        this.arrivingTime = doc[0].arrivingTime;
        this.departureTime = doc[0].departureTimenote;
        this.sigImg = doc[0].sigImg;
        this.recordId = doc[0].id;
        this.revisionId = doc[0].rev;
      });
  }



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

    let date = new Date();
    this.timeDatas.dateOfDay = date.toISOString();
    this.timeDatas.departureTime = date.getHours() +
      ":" + date.getMinutes();
    this.timeDatas.arrivingTime = "07:30";
  }

  getSigImg(img) {
    this.sigImg = '';
    this.sigImg = img;
  }

  onChange(dataSelect) {
    this.respo = dataSelect
  }

  saveDatas(feuille) {
    //feuille.dateOfDay = feuille.dateOfDay.toString();
    /*  this.timeSheetService.add(feuille)
        .catch(console.error.bind(console));*/
  }

  saveComic() {

  }

  register() {
    this.childSigPad.savePad();
    this.timeDatas.parentName = this.respo;
    this.timeDatas.sigImg = '';
    this.timeDatas.sigImg = this.sigImg;


    let dateOfDay = this.form.controls["dateOfDay"].value,
      parentName = this.form.controls["parentName"].value,
      arrivingTime = this.form.controls["arrivingTime"].value,
      departureTime = this.form.controls["departureTime"].value,
      revisionId = this.revisionId,
      recordId = this.recordId,
      sigImg = this.sigImg;

    if (this.recordId !== '') {
      this.timeSheetService.update(dateOfDay, parentName, arrivingTime,
        departureTime, sigImg)
        .then((data) => {
          this.hideForm = true;
          this.sendNotification(`Mis a jour`);
        });
    }
    else {
      this.timeSheetService.add(dateOfDay, parentName, arrivingTime,
        departureTime, sigImg)
        .then((data) => {
          this.hideForm = true;
          this.resetFields();
          this.sendNotification(`Feuille enregistrée`);
        });
    }

    this.saveDatas(this.timeDatas);

  }

  sendNotification(message): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }
}
