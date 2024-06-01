import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textShorter',
  standalone: true
})
export class TextShorterPipe implements PipeTransform {

  transform(value: string, count: number = 5) {
    const result = value.split(' ').slice(0, count);
    return result.join(' ')
  }

}
