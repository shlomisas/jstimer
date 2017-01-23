# JS Timer - a JavaScript timer manager

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] 
<!--[![Coveralls Status][coveralls-image]][coveralls-url] -->
<!--[![OpenCollective Backers][backer-badge]][backer-url] [![OpenCollective Sponsors][sponsor-badge]][sponsor-url] -->

JavaScript timer have in background just one native timer (setInterval)

## Install 

`npm i jstimer -S`

or

`yarn add jstimer -S`

## Test

`npm test`

## Use

### Start one time timer (equal to `setTimeout`)

```javascript

import {Timer} from 'jstimer';

/* Will tick each 2 seconds, 4 times. */

let timer = new Timer(2000, 4);

timer.on('tick', () => {
    console.log('timer tick');
});

timer.on('done', () => {
     console.log('timer done');
});

timer.start();

```

### Start infinite timer (equal to `setInterval`)

```javascript

import {Timer} from 'jstimer';

/* TImer will tick each 1 second, forever. */

let timer = new Timer(1000);

timer.on('tick', () => {
    console.log('timer tick');
});

timer.start();

```

### Stop a timer

```javascript

import {Timer} from 'jstimer';

let timer = new Timer(1000);

timer.on('tick', () => {
    console.log('timer has ticked');
});

timer.on('stopped', () => {
    console.log(`timer has stopped`);
});

timer.start();

setImmediate(() => {
    timer.stop();  
});

```

[downloads-image]: https://img.shields.io/npm/dm/jstimer.svg
[npm-url]: https://www.npmjs.com/package/jstimer
[npm-image]: https://img.shields.io/npm/v/jstimer.svg

[travis-url]: https://travis-ci.org/shlomisas/jstimer
[travis-image]: https://img.shields.io/travis/shlomisas/jstimer/master.svg