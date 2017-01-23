/**
 * Created by Shlomi
 */

import EventEmitter from 'events';

export default class Ticker extends EventEmitter{

    _interval;
    _localInterval;
    _times;
    _ticks;

    constructor(interval, times = -1) {
        super();

        this._interval = interval;
        this._times = times;

        this._localInterval = 0;
        this._ticks = 0;
    }

    tick(portion){

        this._localInterval += portion;

        if(this._localInterval > this._interval){
            this._localInterval = 0;
            this._ticks++;
            this.emit('tick', this);
        }
    }

    finished(){
        return this._times !== -1 && this._ticks >= this._times;
    }

    done(){
        this.emit('done', this);
    }

}