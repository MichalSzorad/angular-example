import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';


@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})
export class HeroesComponent {
  title = 'Heroes';
  selectedHero: Hero;
  heroes: Hero[];

  constructor(private heroService: HeroService, private router: Router) {
  }

  add(name: string): void {
    name = name.trim();
    if (name.length === 0) {
      return;
    }

    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id).then(() => {
      this.heroes = this.heroes.filter(h => h.id !== hero.id);
      if (this.selectedHero && this.selectedHero.id === hero.id) {
        this.selectedHero = null;
      }
    });
  }

  goToDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeros().then(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
