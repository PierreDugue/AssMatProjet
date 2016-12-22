import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DatastorageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DatastorageService {

  constructor(public http: Http, public storage: Storage) {
  }

  getData() {
    return this.storage.get('timeDatas');
  }

  save(data) {
    let newData = JSON.stringify(data);
    this.storage.set('timeDatas', newData);
  }
}
