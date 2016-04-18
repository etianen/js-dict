# @etianen/dict

Helpers for treating dicts as maps.


## Installing

``` bash
npm install '@etianen/dict'
```

**TypeScript:** To take advantage of typings, be sure to set `moduleResolution` to `"node"` in your `tsconfig.json`.


## Overview

Treating dicts as maps in Javascript is needlessly difficult.

@etianen/dict provides a minimal set of helpers of interacting with dicts.


``` ts
import * as dict from "@etianen/dict";

dict.has({foo: "bar"}, "foo");  // => true
dict.mapValues({foo: "bar"}, v => v.toUpperCase());  // => {foo: "BAR"}
```


## API

In all the functions below:

* Only own, enumerable properties are considered.
* The source arguments are never mutated.


### Dict

An object containing values of type `V`.

``` ts
type Dict<V> = {[key: string]: V};
```


### count()

Returns the number of entries in `dict`.

**Note:** This is an O(n) operation. Use `isEmpty()` if you just want to check if the dict is empty.

``` ts
function count(dict: Dict<Object>): number;
```


### empty()

Returns a new empty `dict`.

``` ts
function empty<V>(): Dict<V>;
```


### entries()

Returns an `Array` of `[key, value]` entries in `dict`.

``` ts
function entries<V>(dict: Dict<V>): Array<[string, V]>;
```


### every()

Returns `true` if all entries in `dict` satisfy `predicate`.

``` ts
function every<V>(dict: Dict<V>, predicate: (value?: V, key?: string, dict?: Dict<V>) => boolean, context?: Object): boolean;
```


### filter()

Returns a new dict containing entries from `dict` that satisfy `predicate`.

``` ts
function filter<V>(dict: Dict<V>, predicate: predicate: (value?: V, key?: string, dict?: Dict<V>) => boolean, context?: Object): Dict<V>
```


### forEach()

Runs `sideEffect` for each entry in `dict`.

``` ts
function forEach<V>(dict: Dict<V>, sideEffect: (value?: V, key?: string, dict?: Dict<V>) => void, context?: Object): void;
```


### fromEntries()

Creates a new dict from an array of `[key, value]` entries.

``` ts
function fromEntries<V>(entries: Array<[string, V]>): Dict<V>;
```


### fromKeys()

Creates a new dict from an array of keys, obtaining the values by passing each key through `mapper`.

``` ts
function fromKeys<V>(keys: Array<string>, mapper: (key?: string) => V, context?: Object): Dict<V>
```


### get()

Returns the value at `key` in `dict`, or `defaultValue` if the key is not set.

``` ts
function get<V>(dict: Dict<V>, key: string, defaultValue?: V): V;
```


### has()

Returns `true` if `key` is in `dict`.

``` ts
function has(dict: Dict<Object>, key: string): boolean;
```


### isEmpty()

Returns `true` if `dict` contains no entries.

``` ts
function isEmpty(dict: Dict<Object>): boolean;
```


### keys()

Returns an `Array` of all keys in `dict`.

``` ts
function keys(dict: Dict<Object>): Array<string>;
```


### map()

Returns a new `Array` with all entries passed through `mapper`.

``` ts
function map<V, R>(dict: Dict<V>, mapper: (value?: V, key: string, dict?: Dict<V>) => R, context?: Object): Array<R>
```


### mapEntries()

Returns a new dict with all entries passed through `mapper`.

``` ts
function mapEntries<V, R>(dict: Dict<V>, mapper: (value?: V, key: string, dict?: Dict<V>) => [string, R], context?: Object): Dict<R>
```


### mapKeys()

Returns a new dict with all keys passed through `mapper`.

``` ts
function mapKeys<V>(dict: Dict<V>, mapper: (key?: string, value? V, dict?: Dict<V>) => string, context?: Object): Dict<V>;
```


### mapValues()

Returns a new dict with all values passed through `mapper`.

``` ts
map<V, R>(dict: Dict<V>, mapper: (value?: V, key?: string, dict?: Dict<V>) => R, context?: Object): Dict<R>;
```


### reduce()

Reduces `dict` to a single value using `reducer`.

``` ts
function reduce<V>(dict: Dict<V>, reducer: (reduction?: V, value?: V, key?: string, dict?: Dict<V>) => V): V;
function reduce<V, R>(dict: Dict<V>, reducer: (reduction?: R, value?: V, key?: string, dict?: Dict<V>) => R, initialReduction: R, context?: V;
```


### remove()

Returns a new dict with `key` removed.

``` ts
function remove<V>(dict: Dict<V>, key: string): Dict<V>;
```


### set()

Returns a new dict with `key` set to `value`.

``` ts
function set<V>(dict: Dict<V>, key: string, value: V): Dict<V>;
```


### some()

Returns `true` if one or more entries in `dict` satisfy `predicate`.

``` ts
function some<V>(dict: Dict<V>, predicate: (value?: V, key?: string, dict?: Dict<V>) => boolean, context?: Object): boolean;
```


### update()

Returns a copy of `dict` updated with all entries in `other`.

``` ts
function update<V>(dict: Dict<V>, other: Dict<V>): Dict<V>;
```


### values()

Returns an `Array` of all values in `dict`.

``` ts
function values<V>(dict: Dict<V>): Array<V>;
```


## Build status

This project is built on every push using the Travis-CI service.

[![Build Status](https://travis-ci.org/etianen/js-dict.svg?branch=master)](https://travis-ci.org/etianen/js-dict)


## Support and announcements

Downloads and bug tracking can be found at the [main project website](http://github.com/etianen/js-dict).


## More information

This project was developed by Dave Hall. You can get the code
from the [project site](http://github.com/etianen/js-dict).

Dave Hall is a freelance web developer, based in Cambridge, UK. You can usually
find him on the Internet:

- [Website](http://www.etianen.com/)
- [Google Profile](http://www.google.com/profiles/david.etianen)
