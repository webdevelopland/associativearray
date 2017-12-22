import { AssociativeArray } from './associativearray';
import { not } from 'existjs';

export function isAssociativeArray(object: AssociativeArray) {
  if (not(object)) return false;
  return (object instanceof AssociativeArray) ? true : false;
}
