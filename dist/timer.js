'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Shlomi
 */

class Timer extends _events2.default {

    constructor(interval, times = -1) {
        super();

        this._interval = interval;
        this._times = times;

        this._localInterval = 0;
        this._ticks = 0;
    }

    start() {
        this._timerId = _manager2.default.add(this);
    }

    tick(portion) {

        this._localInterval += portion;

        if (this._localInterval > this._interval) {
            this._localInterval = 0;
            this._ticks++;
            this.emit('tick', this);
        }
    }

    finished() {
        return this._times !== -1 && this._ticks >= this._times;
    }

    done(event = 'done') {
        this.emit(event, this);
    }

    stop() {
        if (this._timerId) {
            _manager2.default.remove(this._timerId, 'stopped');
        }
    }

}
exports.default = Timer;
module.exports = exports['default'];
//# sourceMappingURL=timer.js.map
