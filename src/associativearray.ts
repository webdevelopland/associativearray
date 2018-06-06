import { exist, isObject, isArray, isString } from 'existjs';

import { Pattern } from './pattern';
import { isAssociativeArray } from './validation';

export class AssociativeArray extends Pattern {
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
  importArray(array: any[]) {
    for (let v of array) {
      if (!exist(v.name) || !exist(v.value) || !exist(v.type)) {
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
}
