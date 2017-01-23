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

### Start timers

```javascript

import {Timer} from 'jstimer';

/* Infinite timer (aka: setInterval), will tick forever.. */

let timer1 = new Timer(1000);

timer1.on('tick', () => {
     console.log('timer 1 has ticked'); // This will print each minute, forever..
});

timer1.start();

/* Limited timer (aka: setTimeout), will tick 4 times */

let timer2 = new Timer(2000, 4);

timer2.on('tick', () => {
     console.log('timer 2 has ticked'); // This will print each 2 minutes 4 times..
});

timer2.on('done', () => {
     console.log('timer 2 has ended'); // This will print when timer 2 will end - after 4 ticks
});

timer2.start();

```

### Stop a timer

```javascript

import {Timer} from 'jstimer';

let timer = new Timer(1000);

timer.on('tick', () => {
     console.log('timer has ticked'); // This will print each minute, forever..
});

timer.on('stopped', () => {
     console.log(`timer has stopped`); // The reason will be `stopped`
});

timer.start();
timer.stop();

```

[downloads-image]: https://img.shields.io/npm/dm/jstimer.svg
[npm-url]: https://www.npmjs.com/package/jstimer
[npm-image]: https://img.shields.io/npm/v/jstimer.svg

[travis-url]: https://travis-ci.org/shlomisas/jstimer
[travis-image]: https://img.shields.io/travis/shlomisas/jstimer/master.svg