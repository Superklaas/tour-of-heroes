import {Component, OnInit} from '@angular/core';
import {Hero} from "../model/hero";
import {HEROES} from "../model/mock-heroes";
import {HeroService} from "../hero-service/hero.service";
import {MessageService} from "../message-service/message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  private getHeroes() {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

}
