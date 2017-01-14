import { Component, NgZone } from '@angular/core';
import { ModalController, NavController, Platform, ViewController, ToastController } from 'ionic-angular';
import { DetailRespoPage } from '../detail-respo/detail-respo';
import { TimeSheetService } from '../../providers/timeSheet-service';
import { DetailSignature } from './detail-signature';

@Component({
    selector: 'list-dropBox',
    templateUrl: 'manage-page.html',
    providers: [{ provide: ManagePagePage, useClass: ManagePagePage }, TimeSheetService]
})

export class ManagePagePage {
    public listFeuilles;
    public neutre;
    public dataURIPrefix = 'data:image/png;base64,';
    public recordId: any;
    public revisionId: any;
    constructor(private viewCtrl: ViewController,
        public navCtrl: NavController,
        private timeSheetService: TimeSheetService,
        private platform: Platform,
        private zone: NgZone,
        private modalCtrl: ModalController,
        public toastCtrl: ToastController) {

    }

    ionViewDidEnter() {    
    };

    ionViewWillEnter() {        
        this.displaySig();
    }

    displaySig() {
        this.timeSheetService.retrieveAll().then((data) => {
            let existingData = Object.keys(data).length;
            if (existingData !== 0) {
                this.listFeuilles = data;
            }
            else {
                console.log("we get nada!");
            }
        });
    }
    /*
        showDetail(datas) {
            let modal = this.modalCtrl.create(DetailSignature, { datas: datas });
            modal.present();
        }
    */
    viewCharacter(param) {
            let modal = this.modalCtrl.create(DetailSignature, { datas: param });
            modal.present();
       // this.navCtrl.push(DetailSignature, param);
    }
}
        /*
        TOKEN: string = "zjq9V6DllwAAAAAAAAACUQevaUIlMdO-RkPXDWNsV84oBykiuudgONPyF9NjN3T6";
    
        depth: number = 0;
        folders: any;
        constructor(public navCtrl: NavController, public dropbox: DropboxService, public loadingCtrl: LoadingController) {
        }
    
        ionViewDidLoad() {
            console.log(this.TOKEN);
    
            this.dropbox.setAccessToken(this.TOKEN);
            this.folders = [];
    
            let loading = this.loadingCtrl.create({
                content: 'Syncing from Dropbox...'
            });
    
            loading.present();
    
            this.dropbox.getFolders().subscribe(data => {
                this.folders = data.entries;
                loading.dismiss();
            }, (err) => {
                console.log(err);
            });
    
        }
    
        openFolder(path) {
    
            let loading = this.loadingCtrl.create({
                content: 'Syncing from Dropbox...'
            });
    
            loading.present(loading);
    
            this.dropbox.getFolders(path).subscribe(data => {
                this.folders = data.entries;
                this.depth++;
                loading.dismiss();
            }, err => {
                console.log(err);
            });
        }
    
        goBack() {
            let loading = this.loadingCtrl.create({
                content: 'Syncing from Dropbox...'
            });
    
            loading.present(loading);
    
            this.dropbox.goBackFolder().subscribe(data => {
                this.folders = data.entries;
                this.depth--;
                loading.dismiss();
            }, err => {
                console.log(err);
            });
        }
        */

