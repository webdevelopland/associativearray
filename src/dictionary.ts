import { Pattern } from './pattern';

export class Dictionary<T> extends Pattern {
  public values: T[];

  add(name: string, value: T): void {
    super.add(name, value);
  }

  value(name: string): T {
    return this.values[this.keys[name]];
  }

  push(value: T): string {
    return super.push(value);
  }

  change(name: string, value: T): void {
    super.change(name, value);
  }

  search(value: T): string {
    return super.search(value);
  }

  copy(dictionary: Dictionary<T>): void {
    super.copy(dictionary);
  }

  share(dictionary: Dictionary<T>, names: string[]): void {
    super.share(dictionary, names);
  }

  concat(...dictionaries: Dictionary<T>[]): void {
    super.concat(...dictionaries);
  }

  array(): { name: string, value: T }[] {
    var complex: { name: string, value: T }[] = [];
    for (let i in this.names) {
      complex.push({
        name: this.names[i],
        value: this.values[i]
      });
    }
    return complex;
  }

  fromArray(array: T[]): void {
    super.fromArray(array);
  }

  forEach(callback: (value: T, index: string) => string | void): void {
    super.forEach(callback);
  }

  sort(handler: (
    a: { name: string, value: T },
    b: { name: string, value: T }
  ) => number): void {
    super.sort(handler);
  }
}
