# ObjectTools

A library for set and equality operations on objects.

## Install

```sh
$ npm install obsops
```

## Use

```js
import * as obsops from 'obsops'

// a deep copy of object
let copy = obsops.copy(object);

// a frozen
// deep copy of object
let frozen = obsops.freezeCopy(object);

// a union of multiple objects
let union =
 obsops.union(...objects);

// an intersection of multiple objects, intersected by key
let isectKey = intersectionByKey(...objects);

// an intersection of multiple objects, intersected by value
let isectValue = instersectionByValue(...objects);

// the difference between multiple objects, resolved from right to left by key
let diffKey = differenceByKey(...objects);

// the difference between multiple objects, resolved from right to left by value
let diffValue = differenceByValue(...objects);
```
