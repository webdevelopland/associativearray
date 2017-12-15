# AssociativeArray
## v1.2.1 ( last update: 15 dec 2017 )
Associative array. Typescript included.

### Install
npm
```javascript
npm install associativearray --save
```

Node.js
```javascript
const { AssociativeArray } = require('associativearray');
```

Typescript
```javascript
import { AssociativeArray } from 'associativearray';
```

Browser
```javascript
<script src='/node_modules/associativearray/dist/aa-min.js'></script>
<script>
  var arr = new dist.AssociativeArray();
</script>
```

### How to use
```javascript
var arr = new AssociativeArray();
var dogid = arr.push(  "dog"  );
arr.add( "garfield",   "cat"  );
arr.add( "ara",        "bird" );
arr.push(              "fish" );
console.log(arr.stringify());

arr.remove(dogid);
arr.remove("garfield");
arr.change("ara", "parrot");
console.log(arr.stringify());
```
### Looping
```javascript
var arr = new AssociativeArray();

arr.add("string name 1", "string 1" );
arr.add("string name 2", "string 2" );
arr.push(                "string 3" );
arr.push(                "string 4" );

for(let i in arr.names) {
  console.log(arr.names[i] + ", " + arr.values[i]);
  if (arr.values[i] === "string 3") break;
}
```
### forEach
```javascript
var arr = new AssociativeArray();

arr.add("string name 1", "string 1" );
arr.add("string name 2", "string 2" );
arr.push(                "string 3" );
arr.push(                "string 4" );

arr.forEach(( name, value ) => {
  console.log(name + ", " + value);
  if (value === "string 3") return "break"; // Break loop
});
```
### search()
```javascript
var arr = new AssociativeArray();

arr.add("string name 1", "string 1" );
arr.add("string name 2", "string 2" );
arr.add("string name 3", "string 3" );

var name = arr.search("string 2"); // name = "string name 2"
```
### import from simple array and object
```javascript
var array = [1,2,3,4,5,6];
var arr1 = new AssociativeArray();
arr1.importArray(array);

var object = {
  garfield: "cat",
  pluto: "dog"
};
var arr2 = new AssociativeArray();
arr2.importObject(object);

console.log(arr1.stringify());
console.log(arr2.stringify());
```
### AssociativeArray -> Array form -> AssociativeArray
```javascript
var aa = new AssociativeArray();
aa.add("parent 1", "A");
aa.add("parent 2", "B");
aa.add("parent 3", "C");

var child = new AssociativeArray();
child.add("child 1", "content 1");
child.add("child 2", "content 2");
child.add("child 3", "content 3");
aa.add("parent 4", child);

var array = aa.exportArray();

var aa2 = new AssociativeArray();
aa2.importArray(array);
console.log(aa2.stringify());
```
### copy() & share()
```javascript
var arr1 = new AssociativeArray();

name1 = arr1.push("bob1");
name2 = arr1.push("bob2");
name3 = arr1.push("bob3");
name4 = arr1.push("oleg");
name5 = arr1.push("mike");

var arr2 = new AssociativeArray();
arr1.share(arr2, [ name2, name3 ]); // arr1 -> arr2
console.log(arr2.stringify());

var arr3 = new AssociativeArray();
arr3.copy(arr1); // arr3 <- arr1
console.log(arr3.stringify());
```
### Two way binding
```javascript
var arr = new AssociativeArray();
arr.add("man1", "Mike");
arr.add("man2", "Sam");

arr.values[ arr.keys["man2"] ] = "Bob";
// But you can't do like that: arr.value("man2") = "Bob";
```
### How to output AssociativeArray
```javascript
console.log( arr.toString() ); // Without recursion
console.log( arr.stringify() ); // With recursion
```
### Sort
```javascript
var arr = new AssociativeArray();
for(let i=0; i<20; i++) {
  arr.add( "name"+i, Math.round( Math.random() * 200 ));
}

console.log(arr.stringify());
arr.sort((a, b) => {
  // You are able to use a.name & a.value
  if (a.value < b.value) return -1;
  else if (a.value > b.value) return 1;
  else return 0;
});
console.log(arr.stringify());
```
### is that AssociativeArray?
```javascript
const { AssociativeArray } = require('associativearray');
const { isAssociativeArray } = require('associativearray');

var arr = new AssociativeArray();

if (isAssociativeArray(arr)) {
  console.log("it's AssociativeArray");
} else {
  console.log("something else");
}
```
### Other methods
```javascript
arr.rename(name1, name2); // Rename element
arr.reverse(); // Reverse AssociativeArray
arr.shuffle(); // Shuffle AssociativeArray
arr.object(); // Return object form
arr.array(); // Return Array form
arr.concat(arr1, arr2, arr3, ...); // Concat AssociativeArrays
```
