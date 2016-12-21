import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DropboxService } from '../../providers/dropbox-service';

@Component({
    selector: 'list-dropBox',
    templateUrl: 'manage-page.html',
    providers: [{ provide: ManagePagePage, useClass: ManagePagePage },
        DropboxService]
})

export class ManagePagePage {
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
}

