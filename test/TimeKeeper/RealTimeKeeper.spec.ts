import { expect } from 'chai';

import { RealTimeKeeper } from '../../src/TimeKeeper/RealTimeKeeper';
import { MockTime } from './MockTime';

describe('RealTimeKeeper', () => {
    let time: MockTime;

    beforeEach(() => {
        time = new MockTime();
        time.nowValue = 0;
    });

    it('should not be running by default', () => {
        const realTimeKeeper = new RealTimeKeeper(time);

        time.nowValue = 1;
        const elapsedMs1 = realTimeKeeper.getElapsedMs();

        time.nowValue = 2;
        const elapsedMs2 = realTimeKeeper.getElapsedMs();

        expect(elapsedMs1).to.equal(elapsedMs2);
    });

    it('should get elapsed time when running', () => {
        const realTimeKeeper = new RealTimeKeeper(time);

        realTimeKeeper.start();
        time.nowValue = 3;

        const elapsedMs = realTimeKeeper.getElapsedMs();

        expect(elapsedMs).to.equal(3);
    });

    it('should get the same elapsed time when not running', () => {
        const realTimeKeeper = new RealTimeKeeper(time);

        realTimeKeeper.start();
        time.nowValue = 4;

        const elapsedMs1 = realTimeKeeper.getElapsedMs();
        realTimeKeeper.stop();

        time.nowValue = 5;
        const elapsedMs2 = realTimeKeeper.getElapsedMs();

        expect(elapsedMs1).to.equal(elapsedMs2);
    });

    it('should return elapsed time 0 after reset', () => {
        const realTimeKeeper = new RealTimeKeeper(time);

        realTimeKeeper.start();
        time.nowValue = 6;

        realTimeKeeper.getElapsedMs();
        realTimeKeeper.reset();

        const elapsedMs = realTimeKeeper.getElapsedMs();

        expect(elapsedMs).to.equal(0);
    });
});
