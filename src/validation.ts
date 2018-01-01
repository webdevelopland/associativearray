import { AssociativeArray } from './associativearray';
import { Dictionary } from './dictionary';
import { not } from 'existjs';

export function isAssociativeArray(object: AssociativeArray) {
  if (not(object)) return false;
  return (object instanceof AssociativeArray) ? true : false;
}

export function isDictionary(object: any) {
  if (not(object)) return false;
  return (object instanceof Dictionary) ? true : false;
}
