import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe<T extends { [key: string]: any }> implements PipeTransform {
  transform(value: T[] | null, phrase: string = '', key: string = ''): T[] | null {
    if (!Array.isArray(value) || !phrase.trim()) {
      return value;
    }

    phrase = phrase.toLowerCase();

    if (!key.trim()) {
      return value.filter(item => this.valuesToString(item).includes(phrase));
    }

    return value.filter(item => {
      const itemValue = String(item[key] || '').toLowerCase(); // Null-ellenőrzés
      return itemValue.includes(phrase);
    });
  }

  private valuesToString(item: T): string {
    return Object.values(item)
      .map(value => String(value).toLowerCase())
      .join(' ');
  }
}
