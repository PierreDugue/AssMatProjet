import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DropboxService } from '../../providers/dropbox-service';

@Component({
    selector: 'list-dropBox',
    templateUrl: 'manage-page.html',
    providers: [{ provide: listDropBoxComponent, useClass: listDropBoxComponent },
        DropboxService]
})

export class listDropBoxComponent {
    TOKEN: string = "zjq9V6DllwAAAAAAAAACUHG3sQWe3Ti32vNYce5iOj6L49KnMr4kXaQNLAertgxl";

    depth: number = 0;
    folders: any;
    constructor(public navCtrl: NavController, public dropbox: DropboxService, public loadingCtrl: LoadingController) {
        console.log(this.TOKEN);
    }

    ionViewDidLoad() {

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
