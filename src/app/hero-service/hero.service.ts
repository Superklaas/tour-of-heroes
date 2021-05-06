import {Injectable} from '@angular/core';
import {Hero} from "../model/hero";
import {HEROES} from "../model/mock-heroes";
import {Observable, of} from "rxjs";
import {MessageService} from "../message-service/message.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) {
  }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  findHeroById(id: number): Observable<Hero> {
    return of(HEROES.find(hero => hero.id === id) as Hero);
  }

}
