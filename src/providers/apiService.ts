import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Md5 } from 'ts-md5/dist/md5';

import 'rxjs/add/operator/map';

@Injectable()
export class apiService {
  private apiKey: string;
  private apiUrlTemplate: string;
  private privateAPI: string;
  private ts: any;
  private hashAPI: string;
  ListMarvel: Subject<any> = new Subject();

  constructor(public http: Http) {
    this.apiKey = '827f383cddc21c851b8a4dfbc827a29f';
    this.privateAPI = '23d17b44d9e27e1c110b8b034990809a0ba8f344';
    this.ts = 1;
    this.hashAPI = Md5.hashStr(this.ts + this.privateAPI + this.apiKey).toString();
    this.apiUrlTemplate = `https://gateway.marvel.com:443/v1/public/characters?ts=${this.ts}&apikey=${this.apiKey}&hash=${this.hashAPI}`;
  }

  getList(start, perpage): void {
    let url = `${this.apiUrlTemplate}&limit=${perpage}&offset=${start}`;

    this.http.get(url).map(response => response.json()).subscribe(
      response => this.ListMarvel.next(response),
      error => console.error('Marvel: error while getting data!\n', error)
    );
  }

}
