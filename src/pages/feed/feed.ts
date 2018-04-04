import { FilmeDetalhesPage } from './../filme-detalhes/filme-detalhes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
public loader;
public lista_filmes = new Array<any>(); 
public refresher;
public isrefresher: boolean = false;

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
  fechando_carregamento(){
    this.loader.dismiss();
  }

  carregar_filme(){

    this.abrindo_carregamento();
    //chamado o metodo getlastMovie aonde vai te o json
    this.LastMovieProvider.getlastMovie().subscribe(
      data=>{
        this.lista_filmes = data["results"];

        this.fechando_carregamento();
        if(this.isrefresher){
          this.refresher.complete();
          this.isrefresher = false;
        }
      }, error=>{
        console.log(error);
        
        this.fechando_carregamento();
        if(this.isrefresher){
          this.refresher.complete();
          this.isrefresher = false;
        }
      }
    )
  }

  abrirDetalhes(filme){
    console.log(filme);
    this.navCtrl.push("FilmeDetalhesPage", {id: filme.id});
  }

  ionViewDidEnter() {
   
    this.carregar_filme();
  }
}
