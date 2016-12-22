import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/*
  Generated class for the ParentsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
class parent {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

@Injectable()
export class ParentsService {

  constructor(public http: Http, public storage: Storage) {
  }

  getParentsList() {

    let parent1: parent = new parent("Toto");
    let parent2: parent = new parent("Tata");
    let parent3: parent = new parent("Titi");

    let parentList: Array<parent> = [parent1, parent2, parent3];
    console.log(parentList);
    return parentList;
  }

  getData() {
    console.log("Getting Respo");
    let list = this.storage.get('responsablesList');
    console.log(list);
    return list;
  }

  save(data) {
    let newData = JSON.stringify(data);
    this.storage.set('responsablesList', newData);
  }

}
