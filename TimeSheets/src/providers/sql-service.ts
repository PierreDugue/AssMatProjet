import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite } from 'ionic-native';
/*
  Generated class for the SqlService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SqlService {

  constructor(public http: Http) {
    let db = new SQLite();
    db.openDatabase({
      name: 'data.db',
      location: '../db' // the location field is required
    }).then(() => {
      db.executeSql('CREATE TABLE IF NOT EXISTS parents(name VARCHAR(32))', {}).then(() => {

      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }

}
