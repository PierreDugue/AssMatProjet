import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import * as PouchDB from 'pouchdb';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the ParentsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class TimeSheetService {
  private _db;
  private _datas;
  public dataURIPrefix = 'data:image/png;base64,';
  private success: boolean = true;
  constructor(public http: Http, public storage: Storage, public alertCtrl: AlertController) {
    this.initDB();
  }

  initDB() {
    this._db = new PouchDB('pdfList', { adapter: 'websql' });
  }

  add(dateOfDay, parentName, arrivingTime,
        departureTime, sigImg) {
    let timeStamp = new Date().toISOString();
    let base64String = "";
    base64String = sigImg.substring(22);
    let signature = {
      _id: timeStamp,
      dateOfDay: dateOfDay,
      arrivingTime: arrivingTime,
      departureTime: departureTime,
      parentName: parentName,
      _attachments: {
        "sigImg.png": {
          content_type: 'image/png',
          data: base64String
        }
      }
    }
    return new Promise(resolve => {
      this._db.put(signature).catch((err) => {
        this.success = false;
      });

      resolve(true);

    });
  }

  update(dateOfDay, parentName, arrivingTime,
        departureTime, sigImg) {
    let timeStamp = new Date().toISOString();
    let base64String = "";
    base64String = sigImg.substring(22);
    let signature = {
      _id: timeStamp,
      dateOfDay: dateOfDay,
      arrivingTime: arrivingTime,
      departureTime: departureTime,
      parentName: parentName,
      _attachments: {
        "sigImg.png": {
          content_type: 'image/png',
          data: base64String
        }
      }
    };

    return new Promise(resolve => {
      this._db.put(signature)
        .catch((err) => {
          this.success = false;
        });

      if (this.success) {
        resolve(true);
      }
    });
  }

  retrieveAll() {
    return new Promise(resolve => {
      this._db.allDocs({ include_docs: true, descending: true, attachments: true }, function (err, doc) {
        let k,
          items = [],
          row = doc.rows;

        for (k in row) {
          var item = row[k].doc,
            dataURIPrefix = 'data:image/jpeg;base64,',
            attachment;

          if (item._attachments) {
            attachment = dataURIPrefix + item._attachments["sigImg.png"].data;
          }

          let formatDate = item.dateOfDay.toString().slice(0,10);

          items.push(
            {
              id: item._id,
              rev: item._rev,
              dateOfDay: formatDate,
              arrivingTime: item.arrivingTime,
              departureTime: item.departureTime,
              parentName: item.parentName,
              sigImg: attachment
            });
        }
        resolve(items);
      });
    });
  }

  retrieveItem(id) {
    return new Promise(resolve => {
      this._db.get(id, { attachments: true })
        .then((doc) => {
          var item = [],
            dataURIPrefix = 'data:image/jpeg;base64,',
            attachment;

          if (doc._attachments) {
            attachment = doc._attachments["sigImg.png"].data;
          }
          item.push(
            {
              id: id,
              rev: doc._rev,
              dateOfDay: doc.dateOfDay,
              parentName: doc.parentName,
              arrivingTime: doc.arrivingTime,
              departureTime: doc.departureTime,
              sigImg: dataURIPrefix + attachment
            });
          resolve(item);
        })
    });
  }


  removeItem(id, rev) {
    return new Promise(resolve => {
      var signature = { _id: id, _rev: rev };

      this._db.remove(signature)
        .catch((err) => {
          this.success = false;
        });

      if (this.success) {
        resolve(true);
      }
    });
  }



  errorHandler(err) {
    let headsUp = this.alertCtrl.create({
      title: 'Heads Up!',
      subTitle: err,
      buttons: ['Got It!']
    });

    headsUp.present();
  }
  /*
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
    */
}
