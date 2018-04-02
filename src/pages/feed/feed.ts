import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LastMovieProvider } from '../../providers/last-movie/last-movie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers:[
    LastMovieProvider
  ]
})
export class FeedPage {

public lista_filmes = new Array<any>(); 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private LastMovieProvider: LastMovieProvider) {
  }

  ionViewDidLoad() {
    this.LastMovieProvider.getlastMovie().subscribe(
      data=>{
        const resposta = (data as any);
        const objeto_resposta = JSON.parse(resposta._body);
        this.lista_filmes = objeto_resposta.results;
        console.log(objeto_resposta);
      }, error=>{
        console.log(error);
      }
    )
  }

}
