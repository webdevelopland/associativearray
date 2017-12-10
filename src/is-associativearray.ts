export function isAssociativeArray(object: any) {
  return (object.constructor.name === "AssociativeArray") ? true : false;
}
