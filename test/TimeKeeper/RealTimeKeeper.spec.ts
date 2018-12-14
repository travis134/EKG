import { expect } from 'chai';

import { RealTimeKeeper } from '../../src/TimeKeeper/RealTimeKeeper';

describe('RealTimeKeeper', () => {
    let realTimeKeeper: RealTimeKeeper;
    let nowMsValue: number;
    const nowMs = () => nowMsValue;

    beforeEach(() => {
        nowMsValue = 0;
        realTimeKeeper = new RealTimeKeeper(nowMs);
    });

    it('should not be running by default', () => {
        nowMsValue = 1;
        const elapsedMs1 = realTimeKeeper.getElapsedMs();

        nowMsValue = 2;
        const elapsedMs2 = realTimeKeeper.getElapsedMs();

        expect(elapsedMs1).to.equal(elapsedMs2);
    });

    it('should get elapsed time when running', () => {
        realTimeKeeper.start();
        nowMsValue = 3;

        const elapsedMs = realTimeKeeper.getElapsedMs();

        expect(elapsedMs).to.equal(3);
    });

    it('should get the same elapsed time when not running', () => {
        realTimeKeeper.start();
        nowMsValue = 4;

        const elapsedMs1 = realTimeKeeper.getElapsedMs();
        realTimeKeeper.stop();

        nowMsValue = 5;
        const elapsedMs2 = realTimeKeeper.getElapsedMs();

        expect(elapsedMs1).to.equal(elapsedMs2);
    });

    it('should return elapsed time 0 after reset', () => {
        realTimeKeeper.start();
        nowMsValue = 6

        realTimeKeeper.getElapsedMs();
        realTimeKeeper.reset();

        const elapsedMs = realTimeKeeper.getElapsedMs();

        expect(elapsedMs).to.equal(0);
    });
});
