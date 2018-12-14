import { Lead } from '../../src/Lead/Lead';

export class MockLead implements Lead {

    private _measureVoltageValue: number = 0;

    set measureVoltageValue(measureVoltageValue: number) {
        this._measureVoltageValue = measureVoltageValue;
    }

    measureVoltage(): number {
        return this._measureVoltageValue;
    }
}
