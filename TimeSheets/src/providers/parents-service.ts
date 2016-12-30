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
export class ParentsService {
  private _db;
  private _respo;

  constructor(public http: Http, public storage: Storage) {
      this.initDB();
  }


  initDB() {
    this._db = new PouchDB('respoList', { adapter: 'websql' });
  }

  add(respo) {
   return this._db.post(respo);
  }

  update(respo) {
    return this._db.put(respo);
  }

  delete(respo) {
    return this._db.remove(respo);
  }

  getAll() {

    if (!this._respo) {
      return this._db.allDocs({ include_docs: true })
        .then(docs => {

          this._respo = docs.rows.map(row => {
            return row.doc;
          });

          this._db.changes({ live: true, since: 'now', include_docs: true })
            .on('change', this.onDatabaseChange);

          return this._respo;
        });
    } else {
      return Promise.resolve(this._respo);
    }
  }

  private onDatabaseChange = (change) => {
    let index = this.findIndex(this._respo, change.id);
    let responsable = this._respo[index];

    if (change.deleted) {
      if (responsable) {
        this._respo.splice(index, 1); // delete
      }
    } else {
     // change.doc.Date = new Date(change.doc.Date);
      if (responsable && responsable._id === change.id) {
        this._respo[index] = change.doc; // update
      } else {
        this._respo.splice(index, 0, change.doc) // insert
      }
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
