import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
  getHeros(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }

  getHero(id: Number): Promise<Hero> {
    return this.getHeros().then(heroes => heroes.find(hero => hero.id === id));
  }

}