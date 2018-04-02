import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the LastMovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LastMovieProvider {
  private CaminhoApi = "https://api.themoviedb.org/3";
  constructor(public http: Http) {
    console.log('Hello LastMovieProvider Provider');
  }

  getlastMovie(){
    return this.http.get(this.CaminhoApi +"/movie/popular?api_key=249cc1198bcb47518a280e1003b55904");
  }


}
