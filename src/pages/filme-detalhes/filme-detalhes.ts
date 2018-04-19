import { ReviewsPage } from './../reviews/reviews';
import { LastMovieProvider } from './../../providers/last-movie/last-movie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
  providers:[
    LastMovieProvider
  ]
})
export class FilmeDetalhesPage {
  public loader;
  public filme;
  public filmeid;
  public video;
  public refresher;
  public isrefresher: boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public LastMovieProvider: LastMovieProvider,
    public loadingCtrl: LoadingController)
    {
  }

  abrirDetalhesComentario(filmeComentario) {
    console.log(filmeComentario);
    this.navCtrl.push("ReviewsPage", { id: filmeComentario.id });
  }

  carregamentoPagina(){
    this.loader =this.loadingCtrl.create({
      content:"Carregando..."
    });
    this.loader.present();
  }

  FecharCarreganto(){
    this.loader.dismiss();
  }


  detalhesFilme(){
    this.carregamentoPagina();
    this.filmeid = this.navParams.get("id");
    this.LastMovieProvider.getMovieDetalhe(this.filmeid).subscribe
      (data =>{
        this.filme = data;
        this.FecharCarreganto();
      }), error=>{
        console.log(error);
        this.FecharCarreganto();
      }
  }

  videoFilme(){
    this.LastMovieProvider.getMovieVideos(this.filmeid).subscribe(
      data=>{
        this.video = data["results"];
      }, error=>{
        console.log(error);
      }
    )
  }

  ionViewDidEnter() {

    this.detalhesFilme();
    this.videoFilme();
  }


}
