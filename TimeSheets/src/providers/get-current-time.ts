import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GetCurrentTime provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

class currentDate {
  day: string;
  time: string

  constructor(day: string, time: string) {
    this.day = day;
    this.time = time;
  }
}

@Injectable()
export class CurrentTimeService {

  constructor(public http: Http) {
  }

  getTime() {
    let currentDayHour: currentDate;
    let time = new Date();
    let currentMonth: Number = time.getMonth() + 1;
    let currentTime = time.getHours() + ":" +
      time.getMinutes();
    let currentDayMonthYear = time.getUTCDate() + "/" +
      currentMonth + "/" +
      time.getFullYear();

    currentDayHour = new currentDate(currentDayMonthYear, currentTime);
    return currentDayHour;
  }

}
