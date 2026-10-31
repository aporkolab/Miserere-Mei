import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sorter' })
export class SorterPipe implements PipeTransform {
  transform(value: any[] | null, key: string, dir: number = 1): any[] | null {
    if (!Array.isArray(value) || !key || ![1, -1].includes(dir)) {
      return value;
    }

    return value.sort((a, b) => {
      let first = a[key];
      let second = b[key];

      // Handle null or undefined values
      if (first == null) first = '';
      if (second == null) second = '';

      if (typeof first === 'number' && typeof second === 'number') {
        return (first - second) * dir;
      } else {
        if (typeof first === 'object' && typeof second === 'object') {
          first = Object.values(first).join('');
          second = Object.values(second).join('');
        }

        return first.toString().toLowerCase().localeCompare(second.toString().toLowerCase()) * dir;
      }
    });
  }
}
