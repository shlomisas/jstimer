/**
 * Created by Shlomi
 */

class Manager{

    _interval = 10;
    _nativeTimer;
    _timers = [];

    constructor(){
        this._nativeTimer = setInterval(() => {
            for(let i=0; i<this._timers.length; i++){

                let ticker = this._timers[i];

                ticker.tick(this._interval);

                if(ticker.finished()){
                    this._timers.splice(i, 1);
                    ticker.done();
                }
            }
        }, this._interval);
    }

    dispose(){

        if(this._nativeTimer){
            clearInterval(this._nativeTimer);
            this._nativeTimer = null;
        }

        this._timers = [];
    }

    /**
     * Register new TimerTicker to the helper to tick it follow by its interval
     * @param ticker TimerTicker
     */
    add(ticker){
        return this._timers.push(ticker) - 1;
    }

    remove(tickerId, event){
        let ticker = this._timers[tickerId];

        if(ticker){
            ticker.done(event);
        }

        this._timers.splice(tickerId, 1);
    }
}

// Singleton
export default new Manager();