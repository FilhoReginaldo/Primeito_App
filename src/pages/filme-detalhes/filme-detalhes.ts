import { ReviewsPage } from './../reviews/reviews';
import { LastMovieProvider } from './../../providers/last-movie/last-movie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FilmeDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
  providers:[
    LastMovieProvider
  ]
})
export class FilmeDetalhesPage {
  public filme;
  public filmeid;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public LastMovieProvider: LastMovieProvider) {
  }

  abrirDetalhesVideo(filmeVideos) {
    console.log(filmeVideos);
    this.navCtrl.push("ReviewsPage", { id: filmeVideos.id });
  }

  detalhesFilme(){
    this.filmeid = this.navParams.get("id");
    this.LastMovieProvider.getMovieDetalhe(this.filmeid).subscribe
      (data =>{
        this.filme = data;
      }), error=>{
        console.log(error);
      }
  }



  ionViewDidEnter() {
    
    this.detalhesFilme();
  }


}
