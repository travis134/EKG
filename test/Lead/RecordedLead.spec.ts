import { expect } from 'chai';

import { RecordedLead } from '../../src/Lead/RecordedLead';
import { MockTimeKeeper } from '../TimeKeeper/MockTimeKeeper';

describe('RecordedLead', () => {
    let timeKeeper: MockTimeKeeper;

    beforeEach(() => {
        timeKeeper = new MockTimeKeeper();
        timeKeeper.elapsedMsValue = 0;
    });

    it('should measure the correct voltages as time elapses', () => {
        const samples = [1, 2, 3];
        const sampleRateHz = 1;

        const recordedLead = new RecordedLead(samples, sampleRateHz, timeKeeper);

        timeKeeper.elapsedMsValue = 0;
        const voltage1 = recordedLead.measureVoltage();
        expect(voltage1).to.equal(1);

        timeKeeper.elapsedMsValue = 1000;
        const voltage2 = recordedLead.measureVoltage();
        expect(voltage2).to.equal(2);

        timeKeeper.elapsedMsValue = 2000;
        const voltage3 = recordedLead.measureVoltage();
        expect(voltage3).to.equal(3);
    });

    it('should measure the correct voltage when elapsed time is between samples', () => {
        const samples = [4, 5];
        const sampleRateHz = 1;

        const recordedLead = new RecordedLead(samples, sampleRateHz, timeKeeper);

        timeKeeper.elapsedMsValue = 1500;
        const voltage = recordedLead.measureVoltage();
        expect(voltage).to.equal(5);
    });

    it('should throw an error when there are no more samples', () => {
        const samples = [6, 7, 8];
        const sampleRateHz = 1;

        const recordedLead = new RecordedLead(samples, sampleRateHz, timeKeeper);

        timeKeeper.elapsedMsValue = 4000;
        expect(recordedLead.measureVoltage.bind(recordedLead)).to.throw(
            'End of recording reached.'
        );
    });
});
