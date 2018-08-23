import { exist } from 'existjs';
import { randstr } from 'rndmjs';

export class Pattern {
  public names: string[];
  public values: any[];
  public length: number = 0;
  public keys: any;

  protected id: number;

  constructor() {
    this.names = [];
    this.values = [];
    this.id = 0;
    this.keys = {};
  }

  protected updateKeys(): void {
    var keys: any = {};
    for (let i in this.names) {
      keys[this.names[i]] = i;
    }
    this.keys = keys;
  }

  // Add new element with name
  add(name: string, value: any): void {
    if (exist(this.keys[name])) {
      this.change(name, value);
      return;
    }
    this.names.push(name);
    this.values.push(value);
    this.length = this.names.length;
    this.keys[name] = this.length - 1;
  }

  // Get value by name
  value(name: string): any {
    return this.values[this.keys[name]];
  }

  // Add new unnamed element
  push(value: any): string {
    var id: string = "id" + randstr(5) + this.id++;
    this.add(id, value);
    return id;
  }

  // Change value by name
  change(name: string, value: any): void {
    if (!exist(this.keys[name])) {
      return;
    }
    this.values[this.keys[name]] = value;
  }

  // Remote element by name
  remove(name: string): void {
    if (!exist(this.keys[name])) {
      return;
    }
    
    if (this.length === 1) {
      this.names = [];
      this.values = [];
    } else {
      this.names.splice(this.keys[name], 1);
      this.values.splice(this.keys[name], 1);
    }
    
    this.length = this.names.length;

    delete this.keys[name];
  }

  // Get name by value. Only first occurrence. 
  search(value: any): string {
    const i = this.values.indexOf(value);
    if (i === -1) {
      return undefined;
    }
    return this.names[i];
  }

  forEach(callback: Function): void {
    for (let i in this.names) {
      let breakPoint = callback(this.values[i], this.names[i]);
      if (breakPoint === "break") {
        break;
      }
    }
  }

  // Get string form of all elements
  toString(): string {
    var trace: string = "";
    for (let i in this.names) {
      trace += `[${this.names[i]}] ${this.values[i]}\n`;
    };
    return trace;
  }

  // Change name of element
  rename(name: string, newname: string): void {
    this.add(newname, this.value(name));
    this.remove(name);
  }

  // Reverse Pattern
  reverse(): void {
    this.values.reverse();
    this.names.reverse();
  }

  // Copy Pattern
  copy(pattern: Pattern): void {
    this.values = pattern.values.slice();
    this.names = pattern.names.slice();
    this.length = pattern.length;
    this.id = Math.max(this.id, pattern.id);
    this.updateKeys();
  }

  // Share values
  share(pattern: Pattern, names: string[]): void {
    for (let name of names) {
      pattern.add(name, this.values[this.keys[name]]);
    }
    pattern.id = Math.max(pattern.id, this.id);
  }

  // Get array
  array(): { name: string, value: any }[] {
    var complex: { name: string, value: any }[] = [];
    for (let i in this.names) {
      complex.push({
        name: this.names[i],
        value: this.values[i]
      });
    }
    return complex;
  }

  // Import from array
  fromArray(array: any[]): void {
    for (let v of array) {
      this.push(v);
    }
  }

  // Sort Pattern
  sort(handler: (
    a: { name: string, value: any },
    b: { name: string, value: any }
  ) => number): void {
    var array = this.array();
    array.sort(handler);
    for (let i in array) {
      this.names[i] = array[i].name;
      this.values[i] = array[i].value;
    }
    this.updateKeys();
  }

  // Shuffle Pattern
  shuffle(): void {
    var array = this.array();
    for (let i = array.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
    for (let i in array) {
      this.names[i] = array[i].name;
      this.values[i] = array[i].value;
    }
    this.updateKeys();
  }

  // Concat Pattern
  concat(...patterns: Pattern[]): void {
    for (let pattern of patterns) {
      this.names = this.names.concat(pattern.names);
      this.values = this.values.concat(pattern.values);
      this.id = Math.max(this.id, pattern.id);
    }
    this.length = this.names.length;
    this.updateKeys();
  }
}
