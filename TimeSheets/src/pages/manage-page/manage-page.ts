import { Component, NgZone } from '@angular/core';
import { ModalController, NavController, Platform, ViewController } from 'ionic-angular';
import { DetailRespoPage } from '../detail-respo/detail-respo';

//import { DropboxService } from '../../providers/dropbox-service';
import { TimeSheetService } from '../../providers/timeSheet-service';

@Component({
    selector: 'list-dropBox',
    templateUrl: 'manage-page.html',
    providers: [{ provide: ManagePagePage, useClass: ManagePagePage }, TimeSheetService]
})

export class ManagePagePage {
    public listFeuilles: any
    public neutre;
    public dataURIPrefix = 'data:image/png;base64,'
    constructor(private viewCtrl: ViewController,
        public navCtrl: NavController,
        private timeSheetService: TimeSheetService,
        private platform: Platform,
        private zone: NgZone,
        private modalCtrl: ModalController) {

    }

    ionViewDidLoad() {

        this.platform.ready().then(() => {
            this.timeSheetService.initDB();

            this.timeSheetService.getAll()
                .then(data => {
                    this.zone.run(() => {
                        this.listFeuilles = data;
                        for (let i in this.listFeuilles) {
                            let attachment = this.dataURIPrefix +
                                this.listFeuilles[i]._attachments["sigImg.png"].data
                            this.listFeuilles[i].attachment = attachment;                    
                        }
                        console.log(this.listFeuilles);
                    });                   
                })
                .catch(console.error.bind(console));
        });

    };
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

