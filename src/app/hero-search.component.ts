import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Hero } from './hero';
import { HeroSearchService } from './hero-search.service';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();


  constructor(private heroSearchService: HeroSearchService, private router: Router) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  goToDetail(hero: Hero): void {
    this.router.navigate(['/detail', hero.id]);
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms.
      debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]))
      .catch(error => {
        console.log('ngOnInit error', error);

        return Observable.of<Hero[]>([]);
      });

  }
}