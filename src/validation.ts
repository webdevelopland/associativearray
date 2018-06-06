import { exist } from 'existjs';

import { AssociativeArray } from './associativearray';
import { Dictionary } from './dictionary';

export function isAssociativeArray(object: AssociativeArray) {
  if (!exist(object)) return false;
  return (object instanceof AssociativeArray) ? true : false;
}

export function isDictionary(object: any) {
  if (!exist(object)) return false;
  return (object instanceof Dictionary) ? true : false;
}
