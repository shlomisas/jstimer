/**
 * Created by Shlomi
 */

import chai from 'chai';
import sinon from 'sinon';

import Ticker from '../src/ticker';

const assert = chai.assert;

describe('Ticker', () => {

    it('should initiate and execute ticker', done => {

        (async () => {
            try{
                let interval = 1000;
                let spy = sinon.spy(ticker => {
                    assert.deepEqual(ticker._interval, interval, 'should be equal');
                    done();
                });

                let ticker = new Ticker(interval);
                ticker.on('tick', spy);
                await ticker.tick(interval+1);

                assert(spy.called, 'should be called');
            }catch(e){
                done(e);
            }
        })();

    });
});
