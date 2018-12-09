import { expect } from 'chai';

import { FunctionGeneratorLead } from '../../src/Lead/FunctionGeneratorLead';
import { MockTimeKeeper } from '../TimeKeeper/MockTimeKeeper';

describe('FunctionGeneratorLead', () => {
    let timeKeeper: MockTimeKeeper;

    beforeEach(() => {
        timeKeeper = new MockTimeKeeper();
        timeKeeper.elapsedMsValue = 0;
    });

    it('should measure the correct voltages as time elapses', () => {
        const fn = Math.sin;
        const timeScale = 1;
        const recordedLead = new FunctionGeneratorLead(fn, timeScale, timeKeeper);

        timeKeeper.elapsedMsValue = Math.PI / 2;
        const voltage1 = recordedLead.measureVoltage();
        expect(voltage1).to.be.closeTo(1, 0.1);

        timeKeeper.elapsedMsValue = Math.PI;
        const voltage2 = recordedLead.measureVoltage();
        expect(voltage2).to.be.closeTo(0, 0.1);

        timeKeeper.elapsedMsValue = (3 / 2) * Math.PI;
        const voltage3 = recordedLead.measureVoltage();
        expect(voltage3).to.be.closeTo(-1, 0.1);
    });

    it('should measure the correct voltage when time is scaled', () => {
        const fn = (x: number) => x;
        const timeScale = 1 / 500;

        const recordedLead = new FunctionGeneratorLead(fn, timeScale, timeKeeper);

        timeKeeper.elapsedMsValue = 0;
        const voltage1 = recordedLead.measureVoltage();
        expect(voltage1).to.equal(0);

        timeKeeper.elapsedMsValue = 500;
        const voltage2 = recordedLead.measureVoltage();
        expect(voltage2).to.equal(1);

        timeKeeper.elapsedMsValue = 1000;
        const voltage3 = recordedLead.measureVoltage();
        expect(voltage3).to.equal(2);
    });
});
