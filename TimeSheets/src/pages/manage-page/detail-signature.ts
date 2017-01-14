import { Component, NgZone } from '@angular/core';
import { ModalController, NavController, Platform, ViewController, NavParams, ToastController } from 'ionic-angular';
import { DetailRespoPage } from '../detail-respo/detail-respo';
import { TimeSheetService } from '../../providers/timeSheet-service';
import { ManagePagePage } from './manage-page';

@Component({
    selector: 'list-dropBox',
    template: `<ion-header>
                <ion-title>Detail Signature</ion-title>   
                   <ion-buttons end>
            <button ion-button (click)="deleteItem()">
          <ion-icon name="trash"></ion-icon>
      </button>
    </ion-buttons> 
            </ion-header>

<ion-content padding>
<ion-item>
  <ion-label>
    Date :  {{dateOfDay}}
  </ion-label>
    </ion-item>
  <ion-item>
  <ion-label>
    Heure d'arrivée :  {{arrivingTime}}
  </ion-label>
    </ion-item>
  <ion-item>
   <ion-label>
    Heure de départ :  {{departureTime}}
  </ion-label>
  </ion-item>
  <ion-item>
  <ion-label>
    Nom du responsable :  {{parentName}}
  </ion-label>
  </ion-item>
  <ion-item>
<ion-label>
    Signature du responsable :
  </ion-label>
  </ion-item>
    <ion-item>
   <img [src]="sigImg">
</ion-item>
<button ion-button (click)="fermer()">
         Fermer
      </button>
</ion-content>`,
    providers: [{ provide: DetailSignature, useClass: DetailSignature }, TimeSheetService]
})

export class DetailSignature {
    public respoList = [];
    public respo;
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
    public item;
    public img;
    public dataURIPrefix = 'data:image/png;base64,'

    constructor(private viewCtrl: ViewController,
        public navCtrl: NavController,
        private navParams: NavParams,
        private timeSheetService: TimeSheetService,
        public toastCtrl: ToastController) {
            let params = navParams.get('datas'); 
        if (params) {
            this.recordId = params.key;
            this.revisionId = params.rev;
            this.isEdited = true;
            this.selectItem(this.recordId);
            this.pageTitle = 'Amend entry';
        }
        else {
            this.recordId = '';
            this.revisionId = '';
            this.isEdited = false;
            this.pageTitle = 'Create entry';
        }
    }

    ionViewDidLoad() {
       /* let datas = this.navParams.get('datas');
        if (datas) {
            this.item = datas;
            //        this.img = this.formatAttach(datas);
        }
*/
    };

    formatAttach(datas) {
        return this.dataURIPrefix +
            datas._attachments["sigImg.png"].data
    }

    /* deleteItem() {
         console.log("Delete");
         this.timeSheetService.delete(this.item)
             .catch(console.error.bind(console));
 
         this.fermer();
     }*/

    deleteItem() {


        this.timeSheetService.retrieveItem(this.recordId)
            .then((doc) => {
                return this.timeSheetService.removeItem(this.recordId, this.revisionId);
            })
            .then((data) => {
                this.hideForm = true;
                this.sendNotification(`Feuille supprimée`);
            })
            .catch((err) => {
                console.log(err);
            });   

            this.fermer();     
    }

    selectItem(id) {
        this.timeSheetService.retrieveItem(id)
            .then((doc) => {
                console.log(doc);
                console.log(doc[0].parentName);
                this.dateOfDay = doc[0].dateOfDay;
                this.parentName = doc[0].parentName;
                this.arrivingTime = doc[0].arrivingTime;
                this.departureTime = doc[0].departureTime;
                this.sigImg = doc[0].sigImg;
                this.recordId = doc[0].id;
                this.revisionId = doc[0].rev;
            });
    }

    fermer() {
        this.viewCtrl.dismiss();
    }

    sendNotification(message): void {
        let notification = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        notification.present();
    }
}

