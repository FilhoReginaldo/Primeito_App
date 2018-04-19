import { LastMovieProvider } from './../../providers/last-movie/last-movie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
  providers: [
    LastMovieProvider
  ]
})
export class ReviewsPage {
  public filmeidComentario;
  public filmeComentario;
  public listar = new Array<any>();
  public you = "http://www.youtube.com/";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public LastMovieProvider: LastMovieProvider){
  }

  ComentarioFilme(){
    this.filmeidComentario = this.navParams.get("id");
    this.LastMovieProvider.getMovieReviews(this.filmeidComentario).subscribe(
      data=>{
        this.listar = data["results"];
        console.log(data["results"]);
      },error=>{
        console.log(error);
      } 
    )
  }

  ionViewDidEnter(){

    this.ComentarioFilme();
   
  }
}
