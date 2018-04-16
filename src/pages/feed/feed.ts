import { ReviewsPage } from './../reviews/reviews';
import { LastMovieProvider } from './../../providers/last-movie/last-movie';
import { FilmeDetalhesPage } from './../filme-detalhes/filme-detalhes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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
  providers: [
    LastMovieProvider
  ]
})
export class FeedPage {
  public loader;
  public page = 1;
  public lista_filmes = new Array<any>();
  public refresher;
  public isrefresher: boolean = false;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private LastMovieProvider: LastMovieProvider,
    public loadingCtrl: LoadingController) {
  }
  //metodos de refresher da pagina
  doRefresh(refresher) {
    this.refresher = refresher;
    this.isrefresher = true;
    this.carregar_filme();
  }

  //metodo modal carregando
  abrindo_carregamento() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loader.present();
  }
  fechando_carregamento() {
    this.loader.dismiss();
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.page += 1;
    this.carregar_filme(true);
  }


  carregar_filme(newpage: boolean = false) {
    this.abrindo_carregamento();
    this.LastMovieProvider.getlastMovie(this.page).subscribe(
      data => {

        this.fechando_carregamento();
        if (this.isrefresher) {
          this.refresher.complete();
          this.isrefresher = false;
        }

        if (newpage) {
          this.lista_filmes = data["results"] = this.lista_filmes.concat(data["results"]);
          this.infiniteScroll.complete();
        } else {
          this.lista_filmes = data["results"];
        }

      }, error => {
        console.log(error);

        this.fechando_carregamento();
        if (this.isrefresher) {
          this.refresher.complete();
          this.isrefresher = false;
        }
      }
    )
    //chamado o metodo getlastMovie aonde vai te o json

  }

  abrirDetalhes(filme) {
    console.log(filme);
    this.navCtrl.push("FilmeDetalhesPage", { id: filme.id });
  }

  ionViewDidEnter() {

    this.carregar_filme();
  }
}
