import { Person } from './Ipage3';
import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';

//services
import { ApiService } from '../../services/ApiService';

//models
import { MarvelHero } from '../../models/MarvelHero'

@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html'
})
export class Page3 implements OnInit {
  gaming: string = "n64";
  gender: string = "f";
  fullName: string;
  listHero: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ApiService: ApiService, public loadingCtrl: LoadingController) {
    // // If we navigated to this page, we will have an item available as a nav param
    // this.selectedItem = navParams.get('item');

    // // Let's populate this page with some filler content for funzies
    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];

    // this.items = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

  // presentLoading() {
  //   let loader = this.loadingCtrl.create();
  //   loader.present();
  // }

  ngOnInit(): void {
    this.ApiService.getList();

    this.ApiService.ListMarvel.subscribe(
      (res) => {
        //loading.dismiss();
        console.log('wee', res);
        this.listHero = res.data.results;
      },
      (error) => {
        // loading.dismiss();
        console.log('erro', error);
      }
    )
  };


}
