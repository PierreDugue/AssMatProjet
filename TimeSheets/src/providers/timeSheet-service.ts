import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import * as PouchDB from 'pouchdb';
/*
  Generated class for the ParentsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class TimeSheetService {
  private _db;
  private _datas;

  constructor(public http: Http, public storage: Storage) {
    this.initDB();
  }

  initDB() {
    this._db = new PouchDB('pdfList', { adapter: 'websql' });
  }

  add(formDatas) {
    let timeStamp = new Date().toISOString();
    let base64String = "";
    base64String = formDatas.sigImg.substring(22);
    let signature = {
      _id: timeStamp,
      arrivingTime: formDatas.arrivingTime,
      departureTime: formDatas.departureTime,
      parentName: formDatas.parentName,
      _attachments: {
        "sigImg.png": {
          content_type: 'image/png',
          data: base64String
        }
      }
    }

    return this._db.put(signature);

    // return this._db.post(formDatas);
  }

  update(respo) {
    return this._db.put(respo);
  }

  delete(respo) {
    return this._db.remove(respo);
  }

  getAll() {

    if (!this._datas) {
      return this._db.allDocs({
        include_docs: true,
        descending: true,
        attachments: true
      })
        .then(docs => {

          this._datas = docs.rows.map(row => {
            return row.doc;
          });

          this._db.changes({ live: true, since: 'now', include_docs: true })
            .on('change', this.onDatabaseChange);
          return this._datas;
        });
    } else {
      return Promise.resolve(this._datas);
    }
  }

  private onDatabaseChange = (change) => {
    let index = this.findIndex(this._datas, change.id);
    let responsable = this._datas[index];

    if (change.deleted) {
      if (responsable) {
        this._datas.splice(index, 1); // delete
      }
    } else {
      // change.doc.Date = new Date(change.doc.Date);
      this._datas.splice(index, 0, change.doc) // insert
    }
  }

  // Binary search, the array is by default sorted by _id.
  private findIndex(array, id) {
    var low = 0, high = array.length, mid;
    while (low < high) {
      mid = (low + high) >>> 1;
      array[mid]._id < id ? low = mid + 1 : high = mid
    }
    return low;

  }
}
