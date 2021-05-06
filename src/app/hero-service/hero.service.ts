import {Injectable} from '@angular/core';
import {Hero} from "../model/hero";
import {Observable, of} from "rxjs";
import {MessageService} from "../message-service/message.service";
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  addHero(hero: Hero): Observable<any> {
    return this.http.post(this.heroesUrl, hero)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  getHeroes(): Observable<Hero[]> {
    this.log('fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(catchError(this.handleError<Hero[]>('getHeroes', [])));
  }

  findHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(`${this.heroesUrl}/${(hero.id)}`, hero)
      .pipe(
        tap(_ => this.log(`updated hero id=${(hero.id)}`)),
        catchError(this.handleError<Hero>(`updateHero id=${(hero.id)}`))
      );
  }

  deleteHero(id: number): Observable<any> {
    return this.http.delete<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
