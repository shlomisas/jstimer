/**
 * Created by Shlomi
 */

import chai from 'chai';
import sinon from 'sinon';

import manager from '../src/manager';
import Ticker from '../src/ticker';

const assert = chai.assert;

describe('Manager', () => {

    it('should register one time ticker', done => {
        try {

            let maxLoops = 1;
            let interval = 750;

            let ticker = new Ticker(interval, maxLoops);

            let counter = [];

            let spy = sinon.spy(() => {
                try{
                    counter.push(new Date());
                }catch(e){
                    done(e);
                }
            });

            ticker.on('tick', spy);
            ticker.on('done', () => {
                try{
                    assert.deepEqual(spy.callCount, maxLoops, 'should be equal');
                    assert.deepEqual(counter.length, maxLoops, 'should be equal');

                    let expected = interval;
                    let delta = interval * 0.1;

                    for(let i=1;i<counter.length;i++){

                        let curr = counter[i-1];
                        let next = counter[i];

                        let actual = next.getTime() - curr.getTime();
                        assert.approximately(actual, expected, delta, 'should be approximately');

                    }

                    manager.dispose();
                    done();
                }catch (e){
                    done(e);
                }
            });

            manager.start();
            manager.add(ticker);

        }catch(e){
            done(e);
        }
    });

    it('should register multiple times ticker', done => {
        try {

            let maxLoops = 5;
            let interval = 200;

            let ticker = new Ticker(interval, maxLoops);

            let counter = [];

            let spy = sinon.spy(() => {
                try{
                    console.log(`tick: ${new Date().getTime()}`);
                    counter.push(new Date());
                }catch(e){
                    done(e);
                }
            });

            ticker.on('tick', spy);
            ticker.on('done', () => {
                try{
                    assert.deepEqual(spy.callCount, maxLoops, 'should be equal');
                    assert.deepEqual(counter.length, maxLoops, 'should be equal');

                    let expected = interval;
                    let delta = interval * 0.25;

                    for(let i=1;i<counter.length;i++){

                        let curr = counter[i-1];
                        let next = counter[i];

                        let actual = next.getTime() - curr.getTime();
                        assert.approximately(actual, expected, delta, 'should be approximately');

                    }

                    manager.dispose();
                    done();
                }catch (e){
                    done(e);
                }
            });

            manager.setInterval(15);
            manager.start();
            manager.add(ticker);

        }catch(e){
            done(e);
        }
    });

    it('should register multiple tickers', () => {
        let maxLoops = 5;
        let interval = 500;
        let numTickers = 100;


        setInterval = sinon.spy();
        clearInterval = sinon.spy();
        setTimeout = sinon.spy();

        let tickerIds = [];

        manager.start();

        for(let i=0;i<numTickers;i++){
            tickerIds.push(manager.add(new Ticker(interval, maxLoops)));
        }

        manager.remove(tickerIds[tickerIds.length - 1]);
        manager.remove(tickerIds[tickerIds.length - 2]);

        assert.deepEqual(setInterval.callCount, 1, 'should call once');
        assert.deepEqual(clearInterval.callCount, 0, 'should call once');
        assert.deepEqual(setTimeout.callCount, 0, 'should not call');
        assert.deepEqual(manager._tickers.length, numTickers - 2, 'should be equal');

        manager.dispose();
    });
});
