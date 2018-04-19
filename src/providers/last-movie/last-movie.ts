import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the LastMovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LastMovieProvider {
  private caminhoApi = "https://api.themoviedb.org/3";
  private senha = "api_key=249cc1198bcb47518a280e1003b55904";
  constructor(public httpClient: HttpClient) {
    console.log('Hello LastMovieProvider Provider');
  }

  getlastMovie(page){
    return this.httpClient.get(this.caminhoApi +"/movie/popular?"+this.senha+`&page=${page}`);
  }

  getMovieDetalhe(filmeid){
    return this.httpClient.get(this.caminhoApi +`/movie/${filmeid}?`+ this.senha);
  }

  getMovieReviews(filmeidComentario){
    return this.httpClient.get(this.caminhoApi + `/movie/${filmeidComentario}/reviews?`+ this.senha);
  }

  getMovieVideos(filmeid){
    return this.httpClient.get(this.caminhoApi + `/movie/${filmeid}/videos?` + this.senha);
  }


}
