import { LastMovieProvider } from './../../providers/last-movie/last-movie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Content } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
  providers: [
    LastMovieProvider
  ]
})
export class ReviewsPage {
  public loader;
  public filmeidComentario;
  public filmeComentario;
  public listar = new Array<any>();
  public you = "http://www.youtube.com/";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public LastMovieProvider: LastMovieProvider,
    public loadingCtrl: LoadingController){
  }

  carregarPagina(){
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.present();
  }

  fecharCarregamento(){
    this.loader.dismiss();
  }

  ComentarioFilme(){
    this.carregarPagina();
    this.filmeidComentario = this.navParams.get("id");
    this.LastMovieProvider.getMovieReviews(this.filmeidComentario).subscribe(
      data=>{
        this.fecharCarregamento();
        this.listar = data["results"];
        console.log(data["results"]);
      },error=>{
        this.fecharCarregamento();
        console.log(error);
      } 
    )
  }

  ionViewDidEnter(){

    this.ComentarioFilme();
   
  }
}
