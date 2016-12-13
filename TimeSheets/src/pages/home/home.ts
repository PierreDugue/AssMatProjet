import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CurrentTimeService } from '../../providers/get-current-time';
import { ParentsService } from '../../providers/parents-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [{ provide: HomePage, useClass: HomePage },
    CurrentTimeService, ParentsService]
})
export class HomePage {

  constructor(public navCtrl: NavController,
    private getCurrentTimeService: CurrentTimeService,
    private parentsService: ParentsService) {
  }

  currentTime = this.getCurrentTimeService.getTime();
  parentList = this.parentsService.getParentsList();
}
