import { Component, OnInit } from '@angular/core';
import {HeroService} from "../hero-service/hero.service";
import {Hero} from "../model/hero";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[];
  searchText: string;

  constructor(private heroService: HeroService) {
    this.searchText = '';
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  private getHeroes() {
      this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
}
