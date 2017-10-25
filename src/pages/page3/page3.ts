import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';

//providers
import { apiService } from '../../providers/apiService';

@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html'
})
export class Page3 implements OnInit {
  private start: number = 0;
  private count: number = 20;

  public listHero: Array<Object> = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private apiService: apiService,
    public loadingCtrl: LoadingController) {

  }

  getListOfHeros(start, perpage): void {
    this.apiService.getList(start, perpage);
  }

  ngOnInit(): void {
    this.getListOfHeros(this.start, this.count);

    this.apiService.ListMarvel.subscribe(
      (res) => {
        for (let item of res.data.results) {
          this.listHero.push(item);
        }
      },
      (error) => {
        console.log('erro', error);
      }
    )
  }

  doInfinite(infiniteScroll: any) {
    this.start += 20;
    this.getListOfHeros(this.start, this.count);
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  };
}
