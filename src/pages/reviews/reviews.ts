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
  public filmeidVideo;
  public filmeVideo;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public LastMovieProvider: LastMovieProvider){
  }

  videoFilme(){
    this.filmeidVideo = this.navParams.get("id");
    this.LastMovieProvider.getMovieReviews(this.filmeidVideo).subscribe(
      data=>{
        this.filmeVideo = data;
      },error=>{
        console.log(error);
      } 
    )
  }

  ionViewDidEnter(){

    this.videoFilme();
   
  }
}
