import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';

  constructor(private http: Http) {
  }

  getHeroUrl(heroId: Number): string {
    return `${this.heroesUrl}/${heroId}`;
  }

  // TODO: check if this.handleError function works good
  getHeros(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl).toPromise().
      then(response => response.json().data as Hero[])
      .catch(this.handleError)
  }

  handleError(error: any): Promise<any> {
    console.log('An error occured when fetching heroes', error);
    return Promise.reject(error.message || error);
  }

  getHero(id: Number): Promise<Hero> {
    const url = this.getHeroUrl(id);
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

}