import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ManagePagePage } from '../pages/manage-page/manage-page';
import { ParametresPage } from '../pages/parametres/parametres';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage = TabsPage;

  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform) {
    this.initializeApp();

    this.pages = [
      { title: 'Accueil', component: HomePage },
      { title: 'Liste des feuilles', component: ManagePagePage },
      { title: 'Administration', component: ParametresPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
