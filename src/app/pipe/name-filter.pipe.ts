import { Pipe, PipeTransform } from '@angular/core';
import {Hero} from "../model/hero";

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(heroes: Hero[], searchText: string): any[] {
    searchText.toLowerCase();
    return heroes.filter(hero => hero.name.toLowerCase().includes(searchText));
  }

}
