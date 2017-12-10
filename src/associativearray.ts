import { is, not, isObject, isArray, isString } from 'existjs';
import { isAssociativeArray } from './is-associativearray';
import { randstr } from './randstr';

// Dictinary
export class AssociativeArray {
  public names: any[];
  public values: any[];
  public length: number = 0;
  public keys: any;

  private id: number;

  constructor() {
    this.names = [];
    this.values = [];
    this.id = 0;
    this.keys = {};
  }

  // Add new element with name
  add(name: string, value: any) {
    if (is(this.keys[name])) {
      this.change(name, value);
      return;
    }
    this.names.push(name);
    this.values.push(value);
    this.length = this.names.length;
    this.keys[name] = this.length - 1;
  }

  // Get value by name
  value(name: string) {
    return this.values[this.keys[name]];
  }

  // Add new unnamed element
  push(value: any) {
    var id: string = "unicid" + randstr(20) + this.id++;
    this.add(id, value);
    return id;
  }

  // Change value by name
  change(name: string, value: any) {
    if (not(this.keys[name])) {
      return;
    }
    this.values[this.keys[name]] = value;
  }

  // Remote element by name
  remove(name: string) {
    if (not(this.keys[name])) {
      return;
    }
    this.names.splice(this.keys[name], 1);
    this.values.splice(this.keys[name], 1);
    this.length = this.names.length;

    delete this.keys[name];
  }

  // Get name by value. Only first occurrence. 
  search(value: any) {
    const i = this.values.indexOf(value);
    if (i === -1) {
      return undefined;
    }
    return this.names[i];
  }

  // Functional for
  forEach(callback: Function) {
    for (let i in this.names) {
      let breakPoint = callback(this.names[i], this.values[i]);
      if (breakPoint === "break") {
        break;
      }
    }
  }

  // Copy AssociativeArray
  copy(associativeArray: AssociativeArray) {
    this.values = associativeArray.values.slice();
    this.names = associativeArray.names.slice();
    this.length = associativeArray.length;
    this.id = Math.max(this.id, associativeArray.id);
    this.updateKeys();
  }

  // Share values
  share(associativeArray: AssociativeArray, names: Array<any>) {
    for (let name of names) {
      associativeArray.add(name, this.values[this.keys[name]]);
    }
    associativeArray.id = Math.max(associativeArray.id, this.id);
  }

  // Get string form of all elements
  toString() {
    var trace: string = "";
    for (let i in this.names) {
      trace += `[${this.names[i]}] ${this.values[i]}\n`;
    };
    return trace;
  }

  // Recursive output
  stringify(tab: string = "") {
    var trace: string = "";
    for (let i in this.names) {
      trace += `${tab}[${this.names[i]}] `;
      if (isObject(this.values[i])) {
        if (isAssociativeArray(this.values[i])) {
          trace += "\n" + this.values[i].stringify(tab + "__ ");
        } else {
          trace += JSON.stringify(this.values[i]) + "\n";
        }
      } else if (isArray(this.values[i])) {
        trace += JSON.stringify(this.values[i]) + "\n";
      } else if (isString(this.values[i])) {
        trace += `"${this.values[i]}"\n`;
      } else {
        trace += this.values[i] + "\n";
      }
    };
    return trace;
  }

  // Change name of element
  rename(name: string, newname: string) {
    this.add(newname, this.value(name));
    this.remove(name);
  }

  // Reverse AssociativeArray
  reverse() {
    this.values.reverse();
    this.names.reverse();
  }

  // Get object (no recursion)
  object() {
    var object: any = {};
    for (let i in this.names) {
      object[this.names[i]] = this.values[i];
    }
    return object;
  }

  // Import from object (no recursion)
  fromObject(object: any) {
    for (let name in object) {
      this.add(name, object[name]);
    }
  }

  // Get simple array
  array() {
    var complex = [];
    for (let i in this.names) {
      complex.push({
        name: this.names[i],
        value: this.values[i]
      });
    }
    return complex;
  }

  // Import from simple array
  fromArray(array: Array<any>) {
    for (let v of array) {
      this.push(v);
    }
  }

  // Export as array form (recursive)
  exportArray() {
    var complex = [];
    for (let i in this.names) {

      if (isAssociativeArray(this.values[i])) {
        var value = this.values[i].exportArray();
        var type = "AssociativeArray";
      } else {
        var value = this.values[i];
        var type = "Object";
      }

      complex.push({
        name: this.names[i],
        value: value,
        type: type
      });
    }
    return complex;
  }

  // Import from array form (recursive)
  importArray(array: Array<any>) {
    for (let v of array) {
      if (not(v.name) || not(v.value) || not(v.type)) {
        throw "Invalid Array";
      }

      if (v.type === "AssociativeArray") {
        var associativeArray = new AssociativeArray();
        associativeArray.importArray(v.value);
        this.add(v.name, associativeArray);
      } else {
        this.add(v.name, v.value);
      }

    }
  }

  private updateKeys() {
    var keys: any = {};
    for (let i in this.names) {
      keys[this.names[i]] = i;
    }
    this.keys = keys;
  }

  // Sort AssociativeArray
  sort(handler: any) {
    var array = this.array();
    array.sort(handler);
    for (let i in array) {
      this.names[i] = array[i].name;
      this.values[i] = array[i].value;
    }
    this.updateKeys();
  }

  // Shuffle AssociativeArray
  shuffle() {
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

  // Concat AssociativeArrays
  concat(...associativeArrays: AssociativeArray[]) {
    for (let associativeArray of associativeArrays) {
      this.names = this.names.concat(associativeArray.names);
      this.values = this.values.concat(associativeArray.values);
      this.id = Math.max(this.id, associativeArray.id);
    }
    this.length = this.names.length;
    this.updateKeys();
  }

}
