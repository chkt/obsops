# ObjectTools

A library for set and equality operations on objects.

## Install

```sh
$ npm install setob
```

## Use

```js
import * as setob from 'setob'

let copy = setop.copy(source);
let json = setop.copyJSON(source);
let union = setop.union(...args);
let isect = setop.intersection(...args);
let diff = setop.difference(...args);
```