import { Time } from '../../src/TimeKeeper/Time';

export class MockTime implements Time {
    private _nowValue: number = 0;

    set nowValue(nowValue: number) {
        this._nowValue = nowValue;
    }

    now(): number {
        return this._nowValue;
    }
}
