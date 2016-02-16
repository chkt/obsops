# ObjectTools

A library for set and equality operations on objects.

## Install

```sh
$ npm install obsops
```

## Use

```js
import * as obsops from 'obsops'

let copy = obsops.copy(source);
let json = obsops.copyJSON(source);
let union = obsops.union(...args);
let isect = obsops.intersection(...args);
let diff = obsops.difference(...args);
```
