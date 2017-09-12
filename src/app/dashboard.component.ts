import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: `./dashboard.component.html`,
  //providers: [HeroService]
})
export class DashboardComponent {
  heroes: Hero[] = [];
  limit = 5;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeros().then(heroes => this.heroes = heroes.slice(0, this.limit));
  }
}