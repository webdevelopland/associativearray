# AssociativeArray
## v2.0.0 ( last update: 2 jun 2018 )
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
import { AssociativeArray, Dictionary } from 'associativearray';
```

Browser
```javascript
<script src='/node_modules/associativearray/dist/aa-min.js'></script>
<script>
  var arr = new dist.AssociativeArray();
</script>
```

## Dictionary and AssociativeArray

Difference between Dictionary and AssociativeArray
```typescript
const { AssociativeArray, Dictionary } = require('associativearray');

// AssociativeArray - Recursive, weakly typed container of data
var aa = new AssociativeArray();

// Dictionary - Linear, strongly typed container of data. 
// Dictionary doesn't support recursive methods ( details below )
var dict: Dictionary<string> = new Dictionary();
}
```

### How to use
```javascript
var arr = new AssociativeArray();
var dogid = arr.push(  'dog'  );
arr.add( 'garfield',   'cat'  );
arr.add( 'ara',        'bird' );
arr.push(              'fish' );
console.log(arr.toString());

arr.remove(dogid);
arr.remove('garfield');
arr.change('ara', 'parrot');
console.log(arr.toString());
```
### Looping
```javascript
var arr = new AssociativeArray();


arr.add('string name 1', 'string 1' );
arr.add('string name 2', 'string 2' );
arr.push(                'string 3' );
arr.push(                'string 4' );

// Classic
for (let i in arr.names) {
  console.log(arr.names[i] + ', ' + arr.values[i]);
  if (arr.values[i] === 'string 3') break;
}

// forEach
arr.forEach((name, value) => {
  console.log(name + ', ' + value);
  if (value === 'string 3') return 'break'; // Break loop
});
```
### search()
```javascript
var arr = new AssociativeArray();

arr.add('string name 1', 'string 1');
arr.add('string name 2', 'string 2');
arr.add('string name 3', 'string 3');

var name = arr.search('string 2'); // name = 'string name 2'
```
### copy() & share()
```javascript
var arr1 = new AssociativeArray();

var name1 = arr1.push('bob1');
var name2 = arr1.push('bob2');
var name3 = arr1.push('bob3');
var name4 = arr1.push('oleg');
var name5 = arr1.push('mike');

var arr2 = new AssociativeArray();
arr1.share(arr2, [name2, name3]); // arr1 -> arr2
console.log(arr2.toString());

var arr3 = new AssociativeArray();
arr3.copy(arr1); // arr3 <- arr1
console.log(arr3.toString());
```
### Two way binding
```javascript
var arr = new AssociativeArray();
arr.add('man1', 'Mike');
arr.add('man2', 'Sam');

arr.values[arr.keys['man2']] = 'Bob';
// But you can't do like that: arr.value('man2') = 'Bob';
```
### Shuffle
```javascript
var arr = new AssociativeArray();
for (let i = 0; i < 20; i++) {
  arr.add('name' + i, i);
}

console.log(arr.toString());
arr.shuffle();
console.log(arr.toString());
```
### Sort
```javascript
var arr = new AssociativeArray();
for (let i = 0; i < 20; i++) {
  arr.add('name' + i, Math.round(Math.random() * 200));
}

console.log(arr.toString());
arr.sort((a, b) => {
  // You are able to use a.name & a.value
  if (a.value < b.value) return -1;
  else if (a.value > b.value) return 1;
  else return 0;
});
console.log(arr.toString());
```
### AssociativeArray -> Array
```javascript
var aa = new AssociativeArray();
aa.add('name1', 'A');
aa.add('name2', 'B');
aa.add('name3', 'C');

var arrayForm = aa.array();
console.log(arrayForm);
```
### Array -> AssociativeArray
```javascript
var ClassicArray = ['A', 'B', 'C'];

var aa = new AssociativeArray();
aa.fromArray(ClassicArray);
console.log(aa.toString());

// array() and fromArray() aren't cyclical methods
```
### Other methods
```javascript
arr.rename(name1, name2); // Rename element
arr.reverse(); // Reverse AssociativeArray
arr.concat(arr1, arr2, arr3, ...); // Concat AssociativeArrays
```
### Typescript
Validation
```typescript
const { AssociativeArray, Dictionary } = require('associativearray');
const { isAssociativeArray } = require('associativearray');
const { isDictionary } = require('associativearray');

var arr = new AssociativeArray();

if (isAssociativeArray(arr)) {
  console.log("it's AssociativeArray");
} else {
  console.log('something else');
}

var dict: Dictionary<string> = new Dictionary();

if (isDictionary(dict)) {
  console.log("it's Dictionary");
} else {
  console.log('something else');
}
```

## AssociativeArray only ( recursive methods )

### Recursion method to output AssociativeArray
```javascript
console.log( arr.stringify() );
```

### AssociativeArray -> Array form -> AssociativeArray
```javascript
var aa = new AssociativeArray();
aa.add('parent 1', 'A');
aa.add('parent 2', 'B');
aa.add('parent 3', 'C');

var child = new AssociativeArray();
child.add('child 1', 'content 1');
child.add('child 2', 'content 2');
child.add('child 3', 'content 3');
aa.add('parent 4', child);

var array = aa.exportArray();

var aa2 = new AssociativeArray();
aa2.importArray(array);
console.log(aa2.stringify());
```

### object -> AssociativeArray
```javascript
var object = {
  name: 'Mike',
  age: 12
};

var aa = new AssociativeArray();
aa.fromObject(object);
console.log(aa.stringify());
```
### AssociativeArray -> object
```javascript
var aa = new AssociativeArray();
aa.add('name1', 'A');
aa.add('name2', 'B');
aa.add('name3', 'C');

console.log(aa.object());

// object() and fromObject() aren't cyclical methods
```
