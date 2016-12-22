import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ManagePagePage } from '../manage-page/manage-page';
import { ParametresPage } from '../parametres/parametres';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = ManagePagePage;
  tab3Root: any = ParametresPage;

  constructor() {

  }
}
