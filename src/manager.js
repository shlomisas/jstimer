/**
 * Created by Shlomi
 */

class Manager{

    _interval = 10;
    _timer;
    _tickers = [];

    setInterval(interval){
        this._interval = interval;
    }

    start(){

        this.stop();

        this._timer = setInterval(() => {
            for(let i=0;i<this._tickers.length;i++){

                let ticker = this._tickers[i];

                ticker.tick(this._interval);

                if(ticker.finished()){
                    this._tickers.splice(i, 1);
                    ticker.done();
                }
            }
        }, this._interval);
    }

    stop(){
        if(this._timer){
            clearInterval(this._timer);
            this._timer = null;
        }
    }

    dispose(){
        this.stop();
        this._tickers = [];
    }

    /**
     * Register new TimerTicker to the helper to tick it follow by its interval
     * @param ticker TimerTicker
     */
    add(ticker){
        return this._tickers.push(ticker) - 1;
    }

    remove(tickerId){
        this._tickers.splice(tickerId, 1);
    }
}

// Singleton
export default new Manager();