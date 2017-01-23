/**
 * Created by Shlomi
 */

import chai from 'chai';
import sinon from 'sinon';

import manager from '../src/manager';
import Timer from '../src/timer';

const assert = chai.assert;

describe('Manager', () => {

    it('should open one time timer', done => {
        try {

            let maxLoops = 1;
            let interval = 750;
            let deltaRatio = 0.25;
            let counter = [];

            let spy = sinon.spy(() => {
                try{
                    counter.push(new Date());
                }catch(e){
                    done(e);
                }
            });

            let timer = new Timer(interval, maxLoops);

            timer.on('tick', spy);
            timer.on('done', () => {
                try{
                    assert.deepEqual(spy.callCount, maxLoops, 'should be equal');
                    assert.deepEqual(counter.length, maxLoops, 'should be equal');

                    let expected = interval;
                    let delta = interval * deltaRatio;

                    for(let i=1;i<counter.length;i++){

                        let curr = counter[i-1];
                        let next = counter[i];

                        let actual = next.getTime() - curr.getTime();
                        assert.approximately(actual, expected, delta, 'should be approximately');

                    }

                    done();
                }catch (e){
                    done(e);
                }
            });

            timer.start();

        }catch(e){
            done(e);
        }
    });

    it('should open multiple time timer', done => {
        try {

            let maxLoops = 10;
            let interval = 150;
            let deltaRatio = 0.25;
            let counter = [];

            let spy = sinon.spy(() => {
                try{
                    counter.push(new Date());
                }catch(e){
                    done(e);
                }
            });

            let timer = new Timer(interval, maxLoops);

            timer.on('tick', spy);
            timer.on('done', () => {
                try{
                    assert.deepEqual(spy.callCount, maxLoops, 'should be equal');
                    assert.deepEqual(counter.length, maxLoops, 'should be equal');

                    let expected = interval;
                    let delta = interval * deltaRatio;

                    for(let i=1;i<counter.length;i++){

                        let curr = counter[i-1];
                        let next = counter[i];

                        let actual = next.getTime() - curr.getTime();
                        assert.approximately(actual, expected, delta, 'should be approximately');

                    }

                    done();
                }catch (e){
                    done(e);
                }
            });

            timer.start();

        }catch(e){
            done(e);
        }
    });


    it('should register multiple timers', () => {
        let maxLoops = 5;
        let interval = 500;
        let numTickers = 100;

        let tickerIds = [];

        for(let i=0;i<numTickers;i++){
            tickerIds.push(manager.add(new Timer(interval, maxLoops)));
        }

        manager.remove(tickerIds[tickerIds.length - 1]);
        manager.remove(tickerIds[tickerIds.length - 7]);

        assert.deepEqual(manager._timers.length, numTickers - 2, 'should be equal');
    });

    it('should stop an infinite timer', done => {

        try{
            let timer = new Timer(1000);

            timer.on('stopped', () => {
                assert(true);
                done();
            });

            timer.start();
            setImmediate(() => {
                timer.stop();
            });
        }catch(e){
            done(e);
        }

    });
});
