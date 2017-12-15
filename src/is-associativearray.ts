import { not } from 'existjs';

// Unfortunately 'object.constructor.name' may doesn't work
export function isAssociativeArray(object: any) {
  if (not(object)) return false;
  if (not(object.type)) return false;
  return (object.type === "AssociativeArray") ? true : false;
}
