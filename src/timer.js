/**
 * Created by Shlomi
 */

import EventEmitter from 'events';

import manager from './manager';

export default class Timer extends EventEmitter{

    _interval;
    _localInterval;
    _times;
    _ticks;
    _timerId;

    constructor(interval, times = -1) {
        super();

        this._interval = interval;
        this._times = times;

        this._localInterval = 0;
        this._ticks = 0;
    }

    start(){
        this._timerId = manager.add(this);
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

    done(event = 'done'){
        this.emit(event, this);
    }

    stop(){
        if(this._timerId){
            manager.remove(this._timerId, 'stopped');
        }
    }

}